import * as h from "astn-handlers-api"

import * as ap from "astn-tokenconsumer-api"
import { IStructureErrorHandler } from "./interface/interfaces/IStructureErrorHandler"
import { ParsingError, TreeParserError } from "./interface/types/ParsingError"
import { StructureError } from "./interface/types/StructureError"

export type CreateTreeHandlerAndHandleErrorsParams<EventAnnotation> = {
    handler: h.ITreeHandler<EventAnnotation> | null
    onError: ($: {
        error: ParsingError
        annotation: EventAnnotation
    }) => void
}

export type CreateStructureParser = <EventAnnotation>(
    $p: {
        handler: h.IStructureHandler<EventAnnotation>
        onError: IStructureErrorHandler<EventAnnotation>
    }
) => ap.IStructureTokenConsumer<EventAnnotation>

export type CreateTreeParser = <EventAnnotation>(
    $p: CreateTreeHandlerAndHandleErrorsParams<EventAnnotation>
) => ap.IContentTokenConsumer<EventAnnotation>

export type CreateStructureErrorMessage = ($$: StructureError) => string


export type CreateTreeParserErrorMessage =  (error: TreeParserError) => string

export type CreateParsingErrorMessage = ($: ParsingError) => string

export type API = {
    createStructureParser: CreateStructureParser
    createTreeParser: CreateTreeParser
    createStructureErrorMessage: CreateStructureErrorMessage
    createTreeParserErrorMessage: CreateTreeParserErrorMessage
    createParsingErrorMessage: CreateParsingErrorMessage
}
