import { Rarray } from '..'

test('first and last', () => {
    expect(Rarray.firstAndLast([0, 1, 2])).toEqual([0, 2])
    expect(Rarray.firstAndLast([0])).toEqual([0])
    expect(Rarray.firstAndLast([])).toEqual([])
})

test('wait all - resolve', async () => {
    const results = await Rarray.waitAll(['test1', 'test2'], async el => {
        return el
    })
    expect(results).toEqual(['test1', 'test2'])
})

test('wait all - reject', async () => {
    const promises = Rarray.waitAll(['test1', 'test2'], async el => {
        if (el === 'test1') throw new Error()
        return el
    })
    await expect(promises).rejects.toThrowError()
})

test('only resolved', async () => {
    const results = await Rarray.onlyResolved(['test1', 'test2'], async el => {
        if (el === 'test1') throw new Error()
        return el
    })
    expect(results).toEqual(['test2'])
})
