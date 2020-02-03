import { $ } from '../fp'
import { Rarray } from '../Rarray'

const arr = [0, 1]
const arrStr = ['0', '1']

test('first and last', () => {
    expect(Rarray([0, 1, 2]).firstAndLast()).toEqual([0, 2])
    expect(Rarray([0]).firstAndLast()).toEqual([0])
    expect(Rarray([]).firstAndLast()).toEqual([])
})

const stringifyResolve = async (n: number) => String(n)

const stringifyReject = async (n: number) => {
    if (n % 2) {
        throw new Error()
    }
    return String(n)
}

test('map - resolve', async () => {
    const fs = [
        () => $.map(arr, stringifyResolve),
        () => $.map(stringifyResolve)(arr),
    ]

    for (const f of fs) {
        await expect(f()).resolves.toEqual(arrStr)
    }
})

test('map - reject', async () => {
    const fs = [
        () => $.map(arr, stringifyReject),
        () => $.map(stringifyReject)(arr),
    ]

    for (const f of fs) {
        await expect(f()).rejects.toThrowError()
    }
})

test('mapWrapped', async () => {
    const onError = jest.fn()

    const fs = [
        () => $.mapWrapped(arr, stringifyReject, { onError }),
        () => $.mapWrapped(stringifyReject, { onError })(arr),
    ]

    for (const f of fs) {
        await expect(f()).resolves.toEqual(['0'])
        expect(onError).lastCalledWith(expect.any(Error), 1)
    }
})

test('p', async () => {
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
        $.mapWrapped($.opThrow(n => n)),
        $.map(stringifyResolve),
    )
    expect(r1).toEqual(['0', '1'])
})
