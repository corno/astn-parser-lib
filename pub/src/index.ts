import * as astn from "astn-parser-api"
import * as h from "astn-handlers-api"

import * as ap from "astn-tokenconsumer-api"

import { createStructureParser } from "./esc/imp/createStructureParser"
import { createTreeParser } from "./esc/imp/createTreeParser"
import { printStructureError } from "./esc/imp/printStructureError"
import { printTreeParserError } from "./esc/imp/printTreeParserError"
import { API } from "astn-parser-api"

export const $: API = {
    createStructureParser: createStructureParser,
    createTreeParser: createTreeParser,
    createStructureErrorMessage: printStructureError,
    createTreeParserErrorMessage: printTreeParserError,
}