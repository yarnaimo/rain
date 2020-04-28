import { doo } from '..'

test('doo - string', () => {
    const value = 'a' as string | number

    const result1 = doo(() => {
        if (typeof value === 'string') {
            return value.toUpperCase()
        } else {
            return value
        }
    })

    expect(result1).toBe('A')
})

test('doo - number', () => {
    const value = 0 as string | number

    const result1 = doo(() => {
        if (typeof value === 'string') {
            return value.toUpperCase()
        } else {
            return value
        }
    })

    expect(result1).toBe(0)
})
