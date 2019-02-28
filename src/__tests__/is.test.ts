import { is } from '..'
import { isnot } from '../is'

const expected = [true, false, false, true]

const value = (fnName: keyof typeof is, a: any, b: any) => [
    (is as any)[fnName](a),
    (isnot as any)[fnName](a),
    (is as any)[fnName](b),
    (isnot as any)[fnName](b),
]

test('nullish', () => {
    expect(value('nullish', undefined, '')).toEqual(expected)
})

test('string', () => {
    expect(value('string', '', 0)).toEqual(expected)
})

test('number', () => {
    expect(value('number', 0, '')).toEqual(expected)
})

test('boolean', () => {
    expect(value('boolean', true, 'true')).toEqual(expected)
})

test('undefined', () => {
    expect(value('undefined', undefined, null)).toEqual(expected)
})

test('symbol', () => {
    expect(value('symbol', Symbol(), {})).toEqual(expected)
})

test('object', () => {
    expect(value('object', {}, '')).toEqual(expected)
})

test('function', () => {
    expect(value('function', () => {}, {})).toEqual(expected)
})

test('array', () => {
    expect([is.array([]), is.array({})]).toEqual([true, false])
})
