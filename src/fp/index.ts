import is from '@sindresorhus/is'
import preduce from 'p-reduce'
import { $map, $mapWrapped } from './map'
import { $p, $_ } from './p'

export const opThrow = <I, O>(op: (input: I) => O) => (
    input: I | null | undefined,
) => {
    if (is.nullOrUndefined(input)) {
        throw new Error()
    }
    return op(input)
}

export const $ = {
    _: $_,
    p: $p,
    map: $map,
    mapWrapped: $mapWrapped,
    reduce: preduce,
    opThrow,
}
