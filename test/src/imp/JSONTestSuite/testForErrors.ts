import * as pl from "pareto-lang-lib"
import * as tok from "astn-tokenizer-api"
import * as pa from "astn-parser-api"
import { createDummyRequiredValueHandler, createDummyTreeHandler } from "../dummyHandlers"


export function testForErrors(
    data: string,
    onError: () => void,
    createTokenizer: tok.CreateTokenizer,
    //createTreeParser: pa.,
) {
    //     const parser = createTreeParser({
    //         handler: {
    //             root: createDummyRequiredValueHandler(),
    //             onEnd: () => {

    //             }
    //         },
    //         onError: () => {
    //             onError()
    //         }
    //     })
    //     const spt = createTokenizer({
    //         parser: {
    //             onToken: ($) => {
    //                 const ann = $.annotation
    //                 switch ($.token[0]) {
    //                     case "header start":
    //                         pl.cc($.token[1], ($) => {
    //                             onError()
    //                         })
    //                         break
    //                     case "content":
    //                         pl.cc($.token[1], ($) => {
    //                             parser.onToken({
    //                                 annotation: ann,
    //                                 token: $,
    //                             })
    //                         })
    //                         break
    //                     default: pl.au($.token[0])
    //                 }
    //             },
    //             onEnd: ($) => {
    //                 parser.onEnd($)
    //             }
    //         },
    //         onError: onError,
    //     })
    //     spt.onData(data)
    //     spt.onEnd(null)
}
