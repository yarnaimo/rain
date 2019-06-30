import { PlainObject } from './types'

export const pickObjectFields = (
    fieldNames: Set<string>,
    from: PlainObject,
) => {
    return [...fieldNames].reduce(
        (to, k) => {
            to[k] = from[k]
            return to
        },
        {} as PlainObject,
    )
}
