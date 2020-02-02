import { $ } from '../fp'
import { Rarray } from '../Rarray'

const arr = [1, 2]
const arrStr = ['1', '2']

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
    const ps = [$.map(arr, stringifyResolve), $.map(stringifyResolve)(arr)]

    for (const p of ps) {
        await expect(p).resolves.toEqual(arrStr)
    }
})

test('map - reject', async () => {
    const ps = [$.map(arr, stringifyReject), $.map(stringifyReject)(arr)]

    for (const p of ps) {
        await expect(p).rejects.toThrowError()
    }
})

test('map resolved', async () => {
    const ps = [
        $.mapResolved(arr, stringifyReject),
        $.mapResolved(stringifyReject)(arr),
    ]

    for (const p of ps) {
        await expect(p).resolves.toEqual(['2'])
    }
})

test('p', async () => {
    const r1 = await $.p(
        arr,
        $.map((n: number) => n * 3),
        $.map(stringifyResolve),
    )
    expect(r1).toEqual(['3', '6'])

    const p2 = $.p(
        arr,
        $.map((n: number) => n * 3),
        $.map(stringifyReject),
    )
    await expect(p2).rejects.toThrowError()

    const r3 = await $.p(
        arr,
        $.map((n: number) => n * 3),
        $.mapResolved(stringifyReject),
    )
    expect(r3).toEqual(['6'])
})

test('opThrow', async () => {
    const r1 = await $.p(
        [null, undefined, ...arr],
        $.mapResolved($.opThrow(n => n)),
        $.map(stringifyResolve),
    )
    expect(r1).toEqual(['1', '2'])
})
