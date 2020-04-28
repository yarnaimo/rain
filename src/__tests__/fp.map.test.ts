import { $ } from '../fp'

const arr = [0, 1]
const arrStr = ['0', '1']

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
