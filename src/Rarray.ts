import { isNot } from '.'

export const Rarray = {
    firstAndLast: <T>(array: T[]) => array.filter((_, i, a) => [0, a.length - 1].includes(i)),

    waitAll: async <T, U>(array: T[], fn: (el: T) => Promise<U>) => {
        const results = await Promise.all(array.map(el => fn(el)))
        return results
    },

    onlyResolved: async <T, U>(array: T[], fn: (el: T) => Promise<U>) => {
        const results = await Promise.all(array.map(el => fn(el).catch(() => null)))
        return results.filter(isNot.nullish)
    },
}
