import * as astn from "astn-parser-api"

export function printStructureError($$: astn.StructureError): string {
    switch ($$[0]) {
        case "expected an embedded schema": {
            return `expected an embedded schema`
        }
        case "expected a schema schema reference": {
            return `expected a schema schema reference`
        }
        case "expected the schema start (!) or root value": {
            return `expected the schema start (!) or root value`
        }
        case "expected a schema reference or an embedded schema": {
            return `expected a schema reference or an embedded schema`
        }
        case "unexpected data after end": {
            return `unexpected data after end`
        }
        default:
            return au($$[0])
    }
}
