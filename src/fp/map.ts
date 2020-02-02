import is from '@sindresorhus/is'
import pmap from 'p-map'

const pmapResolved: typeof pmap = async <Element, NewElement>(
    input: Iterable<Element>,
    mapper: pmap.Mapper<Element, NewElement>,
    options?: pmap.Options,
) => {
    const wrappedMapper: pmap.Mapper<Element, NewElement | Error> = async (
        input,
        i,
    ) => {
        try {
            return await mapper(input, i)
        } catch (error) {
            console.error(error)
            return new Error()
        }
    }

    const result = await pmap(input, wrappedMapper, options)
    return result.filter((r): r is NewElement => !(r instanceof Error))
}

export interface $map {
    <Element, NewElement>(
        input: Iterable<Element>,
        mapper: pmap.Mapper<Element, NewElement>,
        options?: pmap.Options,
    ): Promise<NewElement[]>

    <Element, NewElement>(
        mapper: pmap.Mapper<Element, NewElement>,
        options?: pmap.Options,
    ): (input: Iterable<Element>) => Promise<NewElement[]>
}

const createMap = (fn: typeof pmap): $map => (
    arg1: any,
    arg2: any,
    arg3?: any,
) => {
    if (is.function_(arg1)) {
        return (arg0: any) => fn(arg0, arg1, arg2)
    }
    return fn(arg1, arg2, arg3) as any
}

export const $map = createMap(pmap)
export const $mapResolved = createMap(pmapResolved)
