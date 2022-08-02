interface Array<T> {
    //push(v: T): void
    //pop: () => T
    //includes(v: T): boolean
    //length: number
    //join(separator: string): string
    //pop(): undefined | T
    //concat(array: T[]): T[]
    //slice(position: number): T[]
    //sort(): T[]
    [n: number]: T

}

interface ErrorConstructor {
    new(message?: string): Error
}

declare let Error: ErrorConstructor;

interface JSON {
    stringify(data: any, x: undefined, indent: string): string
}

declare let JSON: JSON