import * as pl from "pareto-lang-lib"

import * as astn from "astn-parser-api"

import { printStructureError } from "./printStructureError"
import { printTreeParserError } from "./printTreeParserError"

export function printParsingError(error: astn.ParsingError): string {

    switch (error[0]) {
        case "tree": {
            const $ = error[1]
            return printTreeParserError($)
        }
        case "structure": {
            const $ = error[1]
            return printStructureError($)
        }
        default:
            return pl.au(error[0])
    }
}