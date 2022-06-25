import { IContentParser } from "./IContentParser";
import { ITreeHandler, SimpleStringToken } from "astn-treehandler-api";


export type IStructureHandler<EventAnnotation> = {
    onEmbeddedSchema: ($: {
        headerAnnotation: EventAnnotation
        embeddedSchemaAnnotation: EventAnnotation
        schemaSchemaReferenceToken: SimpleStringToken<EventAnnotation>
    }) => ITreeHandler<EventAnnotation>
    onSchemaReference: ($: {
        headerAnnotation: EventAnnotation
        token: SimpleStringToken<EventAnnotation>
    }) => void
    onNoInternalSchema: ($: { }) => void
    onBody: (
    ) => IContentParser<EventAnnotation>
}