import is from '@sindresorhus/is'
import preduce from 'p-reduce'
import { map, mapWrapped } from './map'
import { p, _ } from './pipe'

export const opThrow = <I, O>(op: (input: I) => O) => (
    input: I | null | undefined,
) => {
    if (is.nullOrUndefined(input)) {
        throw new Error()
    }
    return op(input)
}

export { doo } from './doo'
export { swltch } from './swltch'

export const $ = {
    _,
    p,
    map,
    mapWrapped,
    reduce: preduce,
    opThrow,
}
