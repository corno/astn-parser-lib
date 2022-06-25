import { AnnotatedToken, ContentToken } from "astn-parser-api"

type AnnotatedContentToken<Annotation> = AnnotatedToken<ContentToken, Annotation>

export type IContentParser<EventAnnotation> = {
    onToken(token: AnnotatedContentToken<EventAnnotation>): void
    onEnd(annotation: EventAnnotation): void
}
