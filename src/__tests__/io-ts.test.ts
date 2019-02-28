import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { DateTime } from 'luxon'
import { LuxonDateTime } from '../io-ts/LuxonDateTime'
import { LuxonDateTimeFromISOString } from '../io-ts/LuxonDateTimeFromISOString'

describe('Date', () => {
    describe('Date', () => {
        it('should decode DateTime values', () => {
            expect(LuxonDateTime.decode(DateTime.fromMillis(0))).toEqual(
                right(DateTime.fromMillis(0))
            )
        })

        it('should not decode non-DateTime values', () => {
            expect(PathReporter.report(LuxonDateTime.decode(1))).toEqual([
                'Invalid value 1 supplied to : LuxonDateTime',
            ])
        })
    })

    it('DateFromISOString', () => {
        const T = LuxonDateTimeFromISOString
        const d = DateTime.fromJSDate(new Date(1973, 10, 30))
        const s = d.toISO()
        expect(T.decode(s)).toEqual(right(d))
        expect(T.decode(s).map(d => d.toMillis())).toEqual(right(d.toMillis()))
        expect(PathReporter.report(T.decode('foo'))).toEqual([
            'Invalid value "foo" supplied to : LuxonDateTimeFromISOString',
        ])
    })
})
