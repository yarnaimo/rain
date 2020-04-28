import { Rarray } from '../Rarray'

test('first and last', () => {
    expect(Rarray([0, 1, 2]).firstAndLast()).toEqual([0, 2])
    expect(Rarray([0]).firstAndLast()).toEqual([0])
    expect(Rarray([]).firstAndLast()).toEqual([])
})
