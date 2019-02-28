import { DateTime } from 'luxon'
import { t } from '..'

export class LuxonDateTimeType extends t.Type<DateTime, DateTime, t.mixed> {
    readonly _tag: 'LuxonDateTimeType' = 'LuxonDateTimeType'
    constructor() {
        super(
            'LuxonDateTime',
            (u): u is DateTime => u instanceof DateTime,
            (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
            t.identity
        )
    }
}

export interface LuxonDateTimeC extends LuxonDateTimeType {}

export const LuxonDateTime: LuxonDateTimeC = new LuxonDateTimeType()
