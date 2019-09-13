import { Rstring } from '../Rstring'

test('joinOnlyStrings with separator', () => {
    expect(
        Rstring.joinOnlyStrings('_')(['soko', null, ' pick', 'up', undefined]),
    ).toBe('soko_pick_up')
})

test('joinOnlyStrings', () => {
    expect(
        Rstring.joinOnlyStrings()(['soko', null, ' pick', 'up', undefined]),
    ).toBe('soko\npick\nup')
})

test('joinOnlyStrings returns null', () => {
    expect(Rstring.joinOnlyStrings()([null, undefined])).toBeNull()
})

test('globalMatch', () => {
    const matches = Rstring.globalMatch(
        '1.yamaimo 2.taroimo 3.satsumaimo',
        /(\d+)\.(\S+)imo/g,
    )
    expect(matches).toEqual([
        ['1.yamaimo', '1', 'yama'],
        ['2.taroimo', '2', 'taro'],
        ['3.satsumaimo', '3', 'satsuma'],
    ])
})

test('trim template string', () => {
    expect(
        Rstring.trimTemplateString(`
            one
             two
            three
        `),
    ).toBe('one\ntwo\nthree')
})

test('stringify', () => {
    expect(
        Rstring.stringify(
            { name: 'imo', id: 3 },
            { id: (id: number) => id + '' },
        ),
    ).toBe(
        JSON.stringify(
            {
                id: '3',
                name: 'imo',
            },
            undefined,
            2,
        ),
    )
})
