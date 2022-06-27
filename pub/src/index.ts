import { API } from "astn-parser-api"

import { createStructureParser } from "./esc/imp/createStructureParser"
import { createTreeParser } from "./esc/imp/createTreeParser"
import { printStructureError } from "./esc/imp/printStructureError"
import { printTreeParserError } from "./esc/imp/printTreeParserError"
import { printParsingError } from "./esc/imp/printParsingError"

export const $/*: API*/ = {
    createStructureParser: createStructureParser,
    createTreeParser: createTreeParser,
    createStructureErrorMessage: printStructureError,
    createTreeParserErrorMessage: printTreeParserError,
    createParsingErrorMessage: printParsingError,
}