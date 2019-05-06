import dayjs from 'dayjs'
import { t, tr } from '..'

it('Dayjs', () => {
    expect(tr.Dayjs.decode(dayjs(0)).value).toEqual(dayjs(0))

    expect(tr.Dayjs.decode(1).isLeft()).toBeTruthy()
})

it('DayjsFromString', () => {
    const d = dayjs(new Date(1973, 10, 30))
    const s = d.toISOString()

    expect(tr.DayjsFromString.decode(s).value).toEqual(d)
    expect(tr.DayjsFromString.decode(s).map(d => d.millisecond()).value).toBe(d.millisecond())

    expect(tr.DayjsFromString.decode('foo').isLeft()).toBeTruthy()
})

it('nonEmptyArray', () => {
    const s = tr.nonEmptyArray(t.string)

    expect(s.decode(['a', 'b']).value).toEqual(['a', 'b'])

    expect(s.decode([]).isLeft()).toBeTruthy()
})
