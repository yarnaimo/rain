import is from '@sindresorhus/is'
import preduce from 'p-reduce'
import { $map, $mapResolved } from './map'
import { $p } from './p'

export const opThrow = <I, O>(op: (input: I) => O) => (
    input: I | null | undefined,
) => {
    if (is.nullOrUndefined(input)) {
        throw new Error()
    }
    return op(input)
}

export const $ = {
    p: $p,
    map: $map,
    mapResolved: $mapResolved,
    reduce: preduce,
    opThrow,
}
