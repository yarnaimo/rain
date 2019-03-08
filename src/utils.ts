import { PlainObject } from '.'
import { is } from './is'

export const pickObjectFields = (fieldNames: Set<string>, from: PlainObject) => {
    return [...fieldNames].reduce(
        (to, k) => {
            to[k] = from[k]
            return to
        },
        {} as PlainObject
    )
}

export const asError = (v: any) => (is.error(v) ? v : new Error(v))
