import { $ } from '../fp'

const arr = [0, 1]

const stringifyResolve = async (n: number) => String(n)

const stringifyReject = async (n: number) => {
    if (n % 2) {
        throw new Error()
    }
    return String(n)
}

test('$_', () => {
    const r1 = $._(1, (n) => n * 3)
    expect(r1).toBe(3)
})

test('$p', async () => {
    const r1 = await $.p(
        arr,
        $.map((n: number) => n * 3),
        $.map(stringifyResolve),
    )
    expect(r1).toEqual(['0', '3'])

    const p2 = $.p(
        arr,
        $.map((n: number) => n * 3),
        $.map(stringifyReject),
    )
    await expect(p2).rejects.toThrowError()

    const r3 = await $.p(
        arr,
        $.map((n: number) => n * 3),
        $.mapWrapped(stringifyReject),
    )
    expect(r3).toEqual(['0'])
})

test('opThrow', async () => {
    const r1 = await $.p(
        [null, undefined, ...arr],
        $.mapWrapped($.opThrow((n) => n)),
        $.map(stringifyResolve),
    )
    expect(r1).toEqual(['0', '1'])
})
