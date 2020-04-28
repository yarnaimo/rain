import is from '@sindresorhus/is'
import pmap from 'p-map'

type OptionsWrapped = pmap.Options & {
    onError?: (error: unknown, index: number) => void
}

const pmapWrapped = async <Element, NewElement>(
    input: Iterable<Element>,
    mapper: pmap.Mapper<Element, NewElement>,
    options?: OptionsWrapped,
) => {
    const wrappedMapper: pmap.Mapper<Element, NewElement | Error> = async (
        input,
        i,
    ) => {
        try {
            return await mapper(input, i)
        } catch (error) {
            options?.onError?.(error, i)
            return new Error()
        }
    }

    const result = await pmap(input, wrappedMapper, options)
    return result.filter((r): r is NewElement => !(r instanceof Error))
}

export interface $map<O extends pmap.Options> {
    <Element, NewElement>(
        input: Iterable<Element>,
        mapper: pmap.Mapper<Element, NewElement>,
        options?: O,
    ): Promise<NewElement[]>

    <Element, NewElement>(
        mapper: pmap.Mapper<Element, NewElement>,
        options?: O,
    ): (input: Iterable<Element>) => Promise<NewElement[]>
}

const createMap = <O extends pmap.Options>(fn: typeof pmap): $map<O> => (
    arg1: any,
    arg2: any,
    arg3?: any,
) => {
    if (is.function_(arg1)) {
        return (arg0: any) => fn(arg0, arg1, arg2)
    }
    return fn(arg1, arg2, arg3) as any
}

export const map = createMap<pmap.Options>(pmap)
export const mapWrapped = createMap<OptionsWrapped>(pmapWrapped)
