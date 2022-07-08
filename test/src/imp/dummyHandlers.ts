import * as grammar from "astn-handlers-api"

export function createDummyRequiredValueHandler<EventAnnotation>(
): grammar.IRequiredValueHandler<EventAnnotation> {
    return {
        exists: createDummyValueHandler(),
        missing: () => { },
    }
}

export function createDummyValueHandler<EventAnnotation>(
): grammar.IValueHandler<EventAnnotation> {
    return {
        array: () => createDummyArrayHandler(),
        object: () => createDummyObjectHandler(),
        simpleString: () => { },
        multilineString: () => { },
        taggedUnion: () => createDummyTaggedUnionHandler(),
    }
}

export function createDummyTaggedUnionHandler<EventAnnotation>(
): grammar.ITaggedUnionHandler<EventAnnotation> {
    return {
        option: () => createDummyRequiredValueHandler(),
        missingOption: () => { },
        end: () => { },
    }
}

export function createDummyArrayHandler<EventAnnotation>(
): grammar.IArrayHandler<EventAnnotation> {
    return {
        element: () => createDummyValueHandler(),
        onEnd: () => { },
    }
}

export function createDummyObjectHandler<EventAnnotation>(
): grammar.IObjectHandler<EventAnnotation> {
    return {
        property: () => {
            return createDummyRequiredValueHandler()
        },
        onEnd: () => { },
    }
}

export function createDummyTreeHandler<EventAnnotation>(
): grammar.ITreeHandler<EventAnnotation> {
    return {
        root: createDummyRequiredValueHandler(),
        onEnd: () => { },
    }
}
