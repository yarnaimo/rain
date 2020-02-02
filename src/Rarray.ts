const rejected = Symbol('rejected')

export const Rarray = <T>(array: T[]) => ({
    firstAndLast: () =>
        array.filter((_, i, a) => [0, a.length - 1].includes(i)),

    waitAll: async <U>(fn: (el: T) => Promise<U>) => {
        const results = await Promise.all(array.map(el => fn(el)))
        return results
    },

    onlyResolved: async <U>(fn: (el: T) => Promise<U>) => {
        const results = await Promise.all(
            array.map(el =>
                fn(el).catch(e => {
                    console.error(e)
                    return rejected
                }),
            ),
        )
        return results.filter((r): r is U => r !== rejected)
    },
})
