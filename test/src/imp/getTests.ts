
import * as lib from "../../../lib"
import * as api from "../../../api"

import * as pr from "pareto-runtime"
import * as pl from "pareto-lang-lib"
import * as tc from "astn-tokenconsumer-api"
import * as tok from "astn-tokenizer-api"

import * as fsAPI from "pareto-filesystem-api"

import {  IHandledFilesystem } from "pareto-handledfilesystem-api"
import * as ta from "pareto-test-api"
import * as asyncAPI from "pareto-async-api"
import * as afAPI from "pareto-async-functions-api"
import { createDummyRequiredValueHandler } from "./dummyHandlers"
import { testJSONTestSuite } from "./JSONTestSuite/JSONTestSuite"


export function getTests(
    path: string,
    af: afAPI.API,
    fs: IHandledFilesystem,
    parserLib: api.API,
    createTokenizer: tok.CreateTokenizer,
    validateFile: ta.ValidateFile,
): asyncAPI.IAsync<ta.TTestResult> {

    testJSONTestSuite(
        `${path}/JSONTestSuite`,
        fs,
        af,
    ).execute(($) => {
        $.test_parsing.i.toArray().forEach(($) => {
            pl.logDebugMessage(`FIXME ${$.key}`)
        })
    })
    return af.value({
        root: {
            elements: pl.createDictionary({})
        }
    })

}

