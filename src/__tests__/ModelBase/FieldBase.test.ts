import { FieldBase } from '../..'

let base: FieldBase

beforeEach(() => {
    base = new FieldBase()
})

test('set()', () => {
    expect(base.set({})).toBeInstanceOf(FieldBase)
})

test('value()', () => {
    expect(base.value()).toBeUndefined()
})
