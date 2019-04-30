import dayjs from 'dayjs'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { tr } from '..'

describe('Date', () => {
    describe('Date', () => {
        it('should decode Dayjs values', () => {
            expect(tr.dayjs.decode(dayjs(0))).toEqual(right(dayjs(0)))
        })

        it('should not decode non-DateTime values', () => {
            expect(PathReporter.report(tr.dayjs.decode(1))).toEqual([
                'Invalid value 1 supplied to : Dayjs',
            ])
        })
    })

    it('DateFromISOString', () => {
        const d = dayjs(new Date(1973, 10, 30))
        const s = d.toISOString()
        expect(tr.dayjsFromString.decode(s)).toEqual(right(d))
        expect(tr.dayjsFromString.decode(s).map(d => d.millisecond())).toEqual(
            right(d.millisecond()),
        )
        expect(PathReporter.report(tr.dayjsFromString.decode('foo'))).toEqual([
            'Invalid value "foo" supplied to : DayjsFromString',
        ])
    })
})
