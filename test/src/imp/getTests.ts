
import * as api from "astn-parser-api"

import * as pl from "pareto-lang-lib"
import * as tok from "astn-tokenizer-api"

import * as pr from "pareto-runtime"


import { IHandledFilesystem } from "pareto-handledfilesystem-api"
import * as ta from "pareto-test-api"
import * as asyncAPI from "pareto-async-api"
import * as afAPI from "pareto-async-functions-api"
import { createDummyRequiredValueHandler } from "./dummyHandlers"
import { testJSONTestSuite, TestSet } from "./JSONTestSuite/JSONTestSuite"


export function getTests(
    path: string,
    af: afAPI.API,
    fs: IHandledFilesystem,
    createTokenizer: tok.CreateTokenizer,
    createTreeParser: api.CreateTreeParser,
): asyncAPI.IAsync<ta.TTestResult> {

    return af.rewrite(

        testJSONTestSuite(
            `${path}/JSONTestSuite`,
            fs,
            af,
        ),
        ($) => {

            function testSet(
                set: TestSet,
                expectErrors: boolean,
            ): ta.TTestSet {
                return {
                    elements: set.tests.map<ta.TTestElement>(($) => {
                        let foundErrors = false

                        const parser = createTreeParser({
                            handler: {
                                root: createDummyRequiredValueHandler(),
                                onEnd: () => {

                                }
                            },
                            onError: ($) => {
                                if (!expectErrors) {
                                    pl.logDebugMessage(`>>> ${pr.JSONstringify($)}`)
                                }
                                foundErrors = true
                            }
                        })
                        const spt = createTokenizer({
                            parser: {
                                onToken: ($) => {
                                    const ann = $.annotation
                                    switch ($.token[0]) {
                                        case "header start":
                                            pl.cc($.token[1], ($) => {
                                                if (!expectErrors) {
                                                    pl.logDebugMessage(`unexpected header start`)
                                                }
                                                foundErrors = true
                                            })
                                            break
                                        case "content":
                                            pl.cc($.token[1], ($) => {
                                                parser.onToken({
                                                    annotation: ann,
                                                    token: $,
                                                })
                                            })
                                            break
                                        default: pl.au($.token[0])
                                    }
                                },
                                onEnd: ($) => {
                                    parser.onEnd($)
                                }
                            },
                            onError: () => {
                                if (!expectErrors) {
                                    pl.logDebugMessage(`YYYY`)
                                }
                                foundErrors = true
                            },
                        })
                        spt.onData($)
                        spt.onEnd(null)
                        // if (foundErrors !== expectErrors) {
                        //     pl.logDebugMessage(`error in ${$.key} (${set.path}/${$.key})`)
                        // }
                        return {
                            type: ["test", {
                                success: foundErrors === expectErrors,
                                type: ["boolean", {}]
                            }]
                        }
                    })
                }
            }
            const jsonTests: ta.TTestResult = {
                root: {
                    elements: pl.createDictionary({
                        "parsing_i": {
                            type: ["subset", testSet(
                                $.test_parsing.i,
                                false,
                            )]
                        },
                        "parsing_n": {
                            type: ["subset", testSet(
                                $.test_parsing.n,
                                true,
                            )]
                        },
                        "parsing_y": {
                            type: ["subset", testSet(
                                $.test_parsing.y,
                                false,
                            )]
                        },
                        "transform": {
                            type: ["subset", testSet(
                                $.test_transform,
                                false,
                            )]
                        }
                    })
                }
            }
            return jsonTests
        }
    )
}