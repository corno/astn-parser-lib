
import * as lib from "../../../../lib"
import * as api from "astn-parser-api"

import * as pr from "pareto-runtime"

import * as fslib from "pareto-filesystem-lib"
import * as toklib from "astn-tokenizer-lib"
import * as testlib from "pareto-test-lib"
import * as asyncLib from "pareto-async-lib"
import * as diffLib from "pareto-diff-lib"
import { getTests } from "../../imp/getTests"


pr.runProgram(
    ($) => {
        if ($.argument === undefined) {
            throw new Error("missing path")
        }
        const path = $.argument

        const parser = lib.init()

        const async = asyncLib.init()
        const diff = diffLib.init()


        const tok = toklib.init()

        const fs = fslib.init()

        const hfs = fs.createHandledFilesystem(
            ($) => {
                throw new Error(`FS ERROR: ${$.path}`)
            }
        )


        getTests(
            path,
            async,
            hfs,
            tok.createTokenizer,
            parser.createTreeParser,
        ).execute(($ => {
            testlib.init(
                fs,
                diff,
                async
            ).serializeTestResult(
                {
                    testResult: $,
                    showSummary: true,

                },
                (str) => {
                    pr.log(str)
                }
            )
        }))

    }
)
