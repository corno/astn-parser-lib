import * as pl from "pareto-lang-lib"

import * as astn from "astn-parser-api"

export function printTreeParserError(error: astn.TreeParserError): string {
    switch (error[0]) {
        case "missing array close": {
            return error[0]
        }
        case "missing object close": {
            return error[0]
        }
        case "missing key": {
            return error[0]
        }
        case "missing option": {
            return error[0]
        }
        case "missing property value": {
            return error[0]
        }
        case "missing tagged union option and value": {
            return error[0]
        }
        case "missing tagged union value": {
            return error[0]
        }
        case "unexpected end of array": {
            return error[0]
        }
        case "unexpected end of text": {
            const $ = error[1]
            return `unexpected end of text, still in ${$["still in"][0]}`
        }
        case "unexpected end of object": {
            return error[0]
        }
        case "unexpected data after end": {
            return error[0]
        }
        default:
            return pl.au(error[0])
    }
}