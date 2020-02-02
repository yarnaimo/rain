import { PlainObject } from './types'

export const toError = (e: unknown) => {
    if (e instanceof Error) {
        return e
    } else {
        return new Error(String(e))
    }
}

export const pickObjectFields = (
    fieldNames: Set<string>,
    from: PlainObject,
) => {
    return [...fieldNames].reduce((to, k) => {
        to[k] = from[k]
        return to
    }, {} as PlainObject)
}
