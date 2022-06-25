import { ParsingError } from "../types/ParsingError"

export type IStructureErrorHandler<EventAnnotation> = ($: {
    error: ParsingError
    annotation: EventAnnotation
}) => void