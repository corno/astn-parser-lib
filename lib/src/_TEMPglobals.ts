interface Array<T> {
    pop: () => T
    push(v: T): void
}

interface ErrorConstructor {
    new(message?: string): Error
}

declare let Error: ErrorConstructor;
