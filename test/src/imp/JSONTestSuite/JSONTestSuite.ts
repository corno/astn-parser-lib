import * as pa from "pareto-lang-api"
import * as asyncAPI from "pareto-async-api"
import * as afAPI from "pareto-async-functions-api"

import { IHandledFilesystem } from "pareto-handledfilesystem-api"

export type TestSet = {
    path: string
    tests: pa.IReadonlyDictionary<string>
}

export type JSONTestSuite = {
    test_parsing: {
        i: TestSet,
        n: TestSet,
        y: TestSet,
    }
    test_transform: TestSet
}

export function testJSONTestSuite(
    path: string,
    fs: IHandledFilesystem,
    af: afAPI.API,
): asyncAPI.IAsync<JSONTestSuite> {

    function readDir(
        relativePath: string,
    ): asyncAPI.IAsync<TestSet> {
        return af.rewrite(
            fs.directory(
                [path, relativePath],
                (data) => {
                    return fs.file(
                        [data.path],
                        (fileData) => {
                            return af.value(fileData)
                        }
                    )
                }
            ),
            ($) => {
                return {
                    path: `${path}/${relativePath}`,
                    tests: $,
                }
            }
        )
    }
    return af.tuple2(
        af.tuple3(
            readDir("test_parsing/i"),
            readDir("test_parsing/n"),
            readDir("test_parsing/y"),
            ($) => {
                return {
                    i: $.first,
                    n: $.second,
                    y: $.third,
                }
            }
        ),
        readDir("test_transform"),
        ($) => {
            return {
                test_parsing: $.first,
                test_transform: $.second,
            }
        },
    )
}