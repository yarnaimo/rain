export type PlainObject = { [key: string]: any }

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
