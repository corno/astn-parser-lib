import * as h from "astn-handlers-api"

import * as ap from "astn-tokenconsumer-api"
import { IStructureErrorHandler } from "./interfaces/IStructureErrorHandler"
import { ParsingError, TreeParserError } from "./types/ParsingError"
import { StructureError } from "./types/StructureError"

export type CreateTreeHandlerAndHandleErrorsParams<EventAnnotation> = {
    handler: h.ITreeHandler<EventAnnotation> | null
    onError: ($: {
        error: ParsingError
        annotation: EventAnnotation
    }) => void
}

export type API = {
    createStructureParser: <EventAnnotation>(
        $p: {
            handler: h.IStructureHandler<EventAnnotation>
            onError: IStructureErrorHandler<EventAnnotation>
        }
    ) => ap.IStructureTokenConsumer<EventAnnotation>
    createTreeParser: <EventAnnotation>(
        $p: CreateTreeHandlerAndHandleErrorsParams<EventAnnotation>
    ) => ap.IContentTokenConsumer<EventAnnotation>
    createStructureErrorMessage: ($$: StructureError) => string
    createTreeParserErrorMessage: (error: TreeParserError) => string
    createParsingErrorMessage: ($: ParsingError) => string
}
