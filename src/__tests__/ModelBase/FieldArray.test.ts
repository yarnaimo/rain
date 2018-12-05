import { FieldArray } from '../..'

interface ITag {
    name: string
}

test('set(), value()', () => {
    const array = [{ name: 'one' }]
    const tags = new FieldArray<ITag>().set([{ name: 'one' }])

    expect(tags.array).toEqual(array)
    expect(tags.value()).toEqual(array)
})
