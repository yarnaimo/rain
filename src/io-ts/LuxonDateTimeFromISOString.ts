import { DateTime } from 'luxon'
import { t } from '..'

export class LuxonDateTimeFromISOStringType extends t.Type<DateTime, string, t.mixed> {
    readonly _tag: 'LuxonDateTimeFromISOStringType' = 'LuxonDateTimeFromISOStringType'
    constructor() {
        super(
            'LuxonDateTimeFromISOString',
            (u): u is DateTime => u instanceof DateTime,
            (u, c) => {
                const validation = t.string.validate(u, c)
                if (validation.isLeft()) {
                    return validation as any
                } else {
                    const s = validation.value
                    const d = DateTime.fromISO(s)
                    return !d.isValid ? t.failure(s, c) : t.success(d)
                }
            },
            a => a.toISO()
        )
    }
}

export interface LuxonDateTimeFromISOStringC extends LuxonDateTimeFromISOStringType {}

export const LuxonDateTimeFromISOString: LuxonDateTimeFromISOStringC = new LuxonDateTimeFromISOStringType()
