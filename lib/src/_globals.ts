interface Array<T> {
    pop: () => T
    push(v: T): void
    forEach(callback: (e: T, i: number) => void): void
    map<RT>(callback: (e: T, i: number) => RT): RT[]
    includes(v: T): boolean
    length: number
    join(separator: string): string
    //pop(): undefined | T
    concat(array: T[]): T[]
    //slice(position: number): T[]
    sort(): T[]
    [n: number]: T

}
interface Boolean { }
interface CallableFunction { }
interface Function { }
interface IArguments { }
interface NewableFunction { }
interface Number {
    //toString(radix: number): string
}
interface Object { }
interface RegExp { }
interface String {
    //readonly length: number
    //substring(begin: number, end: number): string
    //substr(begin: number): string
    //charCodeAt(index: number): number
    //split(splitter: string): string[]
    startsWith(str: string): boolean
    replace(str: RegExp, rv: string): string
    //toUpperCase(): string
    //padStart():
}

interface Error {

}
//export const x = 5

declare function isNaN(v: any): boolean

interface ErrorConstructor {
    new(message?: string): Error
}

declare let Error: ErrorConstructor;



/**
 * au means 'assert unreachable'. Used in the 'default' clause of switch statements to ensure that
 * all possible cases have been handled
 * @param _x 
 */
function au<RT>(_x: never): RT {
    throw new Error("unreachable")
}

/**
 * cc means 'change context'. It creates a new scope in which a variable name can be used again
 * (usually '$', a variable name that indicates the current context in pareto)
 * 
 * @param input 
 * @param callback 
 * @returns 
 */
function cc<T, RT>(input: T, callback: (output: T) => RT): RT {
    return callback(input)
}

function logError(message: string) {
    // @ts-ignore: Unreachable code error
    console.log(error)
}