import { is, PlainObject } from '.'

interface Union {
    (array: any[]): string | null
    (separator: string, array: any[]): string | null
}

export const Rstring = {
    union: ((a1: string | any[], a2?: any[]) => {
        const [separator, array] = is.array(a1) ? ['\n', a1] : [a1, a2!]

        const filtered = array.filter(e => is.string(e)).map(e => e.trim())
        return filtered.length ? filtered.join(separator) : null
    }) as Union,

    globalMatch: (str: string, pattern: RegExp) => {
        const matches = [] as string[][]
        let m = [] as string[] | null

        while ((m = pattern.exec(str))) {
            matches.push([...m])
        }
        return matches
    },

    trimTemplateString: (str: string) => {
        return str
            .trim()
            .split('\n')
            .map(l => l.trim())
            .join('\n')
    },

    stringify: (data: PlainObject, replace: { [key: string]: (value: any) => any }) => {
        const target = {} as PlainObject
        Object.keys(data)
            .sort()
            .forEach(key => {
                const fn = replace[key]
                target[key] = fn ? fn(data[key]) : data[key]
            })
        return JSON.stringify(target, undefined, 2)
    },
}
