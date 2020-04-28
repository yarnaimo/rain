import { expectType } from 'tsd'
import { swltch } from '..'

test('swltch - literal - matched', () => {
    const value = 'b' as 'a' | 'b'

    const result = swltch(value)(
        {
            a: () => 'string A',
            b: () => 'string B',
        },
        () => null,
    )
    expectType<string | null>(result)
    expect(result).toBe('string B')
})

test('swltch - literal - default', () => {
    const value = 'c' as 'a' | 'b'

    const result = swltch(value)(
        {
            a: () => 'string A',
            b: () => 'string B',
        },
        () => null,
    )
    expectType<string | null>(result)
    expect(result).toBe(null)
})

test('swltch - number - matched', () => {
    const value = 1 as number

    const result = swltch(value)(
        {
            [0]: () => 'string 0',
            [1]: () => 'string 1',
        },
        () => null,
    )
    expectType<string | null>(result)
    expect(result).toBe('string 1')
})
