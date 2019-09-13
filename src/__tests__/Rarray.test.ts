import { Rarray } from '../Rarray'

test('first and last', () => {
    expect(Rarray([0, 1, 2]).firstAndLast()).toEqual([0, 2])
    expect(Rarray([0]).firstAndLast()).toEqual([0])
    expect(Rarray([]).firstAndLast()).toEqual([])
})

test('wait all - resolve', async () => {
    const results = await Rarray(['test1', 'test2']).waitAll(async el => {
        return el
    })
    expect(results).toEqual(['test1', 'test2'])
})

test('wait all - reject', async () => {
    const promises = Rarray(['test1', 'test2']).waitAll(async el => {
        if (el === 'test1') throw new Error()
        return el
    })
    await expect(promises).rejects.toThrowError()
})

test('only resolved', async () => {
    const results = await Rarray(['test1', 'test2']).onlyResolved(async el => {
        if (el === 'test1') throw new Error()
        return el
    })
    expect(results).toEqual(['test2'])
})
