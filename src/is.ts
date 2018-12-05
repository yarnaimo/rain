export const is = {
    nullish: <T>(v: T | null): v is null => v == null,

    string: <T>(v: T | string): v is string => typeof v === 'string',
    number: <T>(v: T | number): v is number => typeof v === 'number',
    boolean: <T>(v: T | boolean): v is boolean => typeof v === 'boolean',
    undefined: <T>(v: T | undefined): v is undefined => typeof v === 'undefined',
    symbol: <T>(v: T | symbol): v is symbol => typeof v === 'symbol',
    object: <T>(v: T | object): v is object => typeof v === 'object',
    function: <T>(v: T | Function): v is Function => typeof v === 'function',

    array: <T>(v: T | any[]): v is any[] => Array.isArray(v),
}

export const isNot = {
    nullish: <T>(v: T | null): v is T => v != null,

    string: <T>(v: T | string): v is T => typeof v !== 'string',
    number: <T>(v: T | number): v is T => typeof v !== 'number',
    boolean: <T>(v: T | boolean): v is T => typeof v !== 'boolean',
    undefined: <T>(v: T | undefined): v is T => typeof v !== 'undefined',
    symbol: <T>(v: T | symbol): v is T => typeof v !== 'symbol',
    object: <T>(v: T | object): v is T => typeof v !== 'object',
    function: <T>(v: T | Function): v is T => typeof v !== 'function',

    array: <T>(v: T | any[]): v is T => !Array.isArray(v),
}
