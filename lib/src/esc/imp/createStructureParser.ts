import * as pl from "pareto-lib-core"

import * as astn from "astn-parser-api"
import * as papi from "astn-tokenconsumer-api"
import * as h from "astn-handlers-api"

import { createTreeParser } from "./createTreeParser"

import * as ap from "astn-tokenconsumer-api"

export function createStructureParser<EventAnnotation>(
    $p: {
        handler: h.IStructureHandler<EventAnnotation>
        onError: astn.IStructureErrorHandler<EventAnnotation>
    }
): ap.IStructureTokenConsumer<EventAnnotation> {

    type RootContext = {
        state:
        | ["expecting header or body", {}]
        | ["expecting schema reference or embedded schema", {
            headerAnnotation: EventAnnotation
        }]
        | ["expecting schema schema reference", {
            headerAnnotation: EventAnnotation
            embeddedSchemaAnnotation: EventAnnotation
        }]
        | ["processing embedded schema", {
            schemaParser: papi.IContentTokenConsumer<EventAnnotation>
        }]
        | ["processing body", {
            bodyParser: papi.IContentTokenConsumer<EventAnnotation>
        }]
    }

    const rootContext: RootContext = { state: ["expecting header or body", {}] }

    return {
        onEnd: (annotation) => {
            function raiseError(error: astn.StructureError) {
                $p.onError({
                    error: ["structure", error],
                    annotation: annotation,
                })
            }
            switch (rootContext.state[0]) {
                case "expecting header or body": {
                    //const $ = rootContext.state[1]
                    raiseError(["expected the schema start (!) or root value", {}])
                    break
                }
                case "expecting schema reference or embedded schema": {
                    raiseError(["expected a schema reference or an embedded schema", {}])
                    break
                }
                case "expecting schema schema reference": {
                    raiseError(["expected a schema schema reference", {}])
                    break
                }
                case "processing embedded schema": {
                    const $$ = rootContext.state[1]
                    $$.schemaParser.onEnd(annotation)
                    break
                }
                case "processing body": {
                    const $ = rootContext.state[1]
                    $.bodyParser.onEnd(annotation)
                    break
                }
                default:
                    pl.au(rootContext.state[0])
            }
        },
        onToken: ($) => {
            const data = $
            function raiseError(error: astn.StructureError) {
                $p.onError({
                    error: ["structure", error],
                    annotation: $.annotation,
                })
            }
            switch (rootContext.state[0]) {
                case "expecting header or body": {
                    switch ($.token[0]) {
                        case "header start": {
                            rootContext.state = ["expecting schema reference or embedded schema", {
                                headerAnnotation: $.annotation,
                            }]
                            break
                        }
                        case "content": {
                            pl.cc($.token[1], ($) => {
                                $p.handler.onNoInternalSchema({})
                                const bp = $p.handler.onBody()
                                rootContext.state = ["processing body", {
                                    bodyParser: bp,
                                }]
                                bp.onToken({
                                    annotation: data.annotation,
                                    token: $,
                                })
                            })
                            break
                        }
                        default:
                            pl.au($.token[0])
                    }
                    break
                }
                case "expecting schema reference or embedded schema": {
                    const headerAnnotation = rootContext.state[1].headerAnnotation
                    switch ($.token[0]) {
                        case "header start": {
                            rootContext.state = ["expecting schema schema reference", {
                                headerAnnotation: headerAnnotation,
                                embeddedSchemaAnnotation: $.annotation,
                            }]
                            break
                        }
                        case "content": {
                            pl.cc($.token[1], ($) => {
                                switch ($[0]) {
                                    case "structural": {
                                        pl.cc($[1], ($) => {
                                            raiseError(["expected a schema reference or an embedded schema", {}])
                                        })
                                        break
                                    }
                                    case "simple string": {
                                        pl.cc($[1], ($) => {
                                            $p.handler.onSchemaReference({
                                                headerAnnotation: headerAnnotation,
                                                token: {
                                                    token: $,
                                                    annotation: data.annotation,
                                                },
                                            })
                                            rootContext.state = ["processing body", {
                                                bodyParser: $p.handler.onBody(),
                                            }]
                                        })
                                        break
                                    }
                                    case "multiline string": {
                                        pl.cc($[1], ($) => {
                                            raiseError(["expected an embedded schema", {}])
                                        })
                                        break
                                    }
                                    default:
                                        pl.au($[0])
                                }
                            })
                            break
                        }

                        default:
                            pl.au($.token[0])
                    }
                    break
                }
                case "expecting schema schema reference": {
                    const headerAnnotation = rootContext.state[1].headerAnnotation
                    const embeddedSchemaAnnotation = rootContext.state[1].embeddedSchemaAnnotation
                    if ($.token[0] !== "content" || $.token[1][0] !== "simple string") {
                        raiseError(["expected a schema schema reference", {}])
                    } else {
                        const x = $p.handler.onEmbeddedSchema({
                            headerAnnotation: headerAnnotation,
                            embeddedSchemaAnnotation: embeddedSchemaAnnotation,
                            schemaSchemaReferenceToken: {
                                token: $.token[1][1],
                                annotation: $.annotation,
                            },
                        })
                        rootContext.state = ["processing embedded schema", {
                            schemaParser: createTreeParser({
                                handler: {
                                    onEnd: ($) => {
                                        x.onEnd($)
                                        rootContext.state = ["processing body", {
                                            bodyParser: $p.handler.onBody(),
                                        }]
                                    },
                                    root: x.root,
                                },
                                onError: $p.onError,
                            }),
                        }]
                    }
                    break
                }
                case "processing embedded schema": {
                    const $ = rootContext.state[1]
                    if (data.token[0] !== "content") {
                        throw new Error("IMPLEMENT ME")
                    }
                    $.schemaParser.onToken({
                        annotation: data.annotation,
                        token: data.token[1],
                    })
                    break
                }
                case "processing body": {
                    if (data.token[0] !== "content") {
                        throw new Error("IMPLEMENT ME")
                    }
                    const $ = rootContext.state[1]
                    $.bodyParser.onToken({
                        annotation: data.annotation,
                        token: data.token[1],
                    })
                    break
                }
                default:
                    pl.au(rootContext.state[0])
            }
        },
    }
}
