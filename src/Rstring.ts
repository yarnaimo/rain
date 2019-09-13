import is from '@sindresorhus/is'
import { PlainObject } from './types'

export const Rstring = {
    joinOnlyStrings: (separator = '\n') => (array: unknown[]) => {
        const filtered = array.filter(is.string).map(e => e.trim())
        return filtered.length ? filtered.join(separator) : null
    },

    globalMatch: (str: string, pattern: RegExp) => {
        const matches = [] as (string | undefined)[][]
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

    stringify: (
        data: PlainObject,
        replace: { [key: string]: (value: any) => any },
    ) => {
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
