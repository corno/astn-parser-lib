
import * as lib from "../../../../lib"

import * as pb from "pareto-bin-core"

import * as fslib from "pareto-filesystem-res"
import * as toklib from "astn-tokenizer-lib"
import * as testlib from "pareto-test-lib"
import * as diffLib from "pareto-diff-lib"
import * as asyncLib from "pareto-async-functions-lib"
import { getTests } from "../../imp/getTests"


pb.runProgram(
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
                    const out = pb.createStdOut()
                    out.write(str)
                    out.write(`\n`)
                }
            )
        }))

    }
)
