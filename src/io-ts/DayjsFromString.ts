import day, { Dayjs, isDayjs } from 'dayjs'
import { t } from '..'

export class DayjsFromStringType extends t.Type<Dayjs, string, t.mixed> {
    readonly _tag: 'DayjsFromStringType' = 'DayjsFromStringType'
    constructor() {
        super(
            'DayjsFromString',
            isDayjs,
            (u, c) => {
                const validation = t.string.validate(u, c)
                if (validation.isLeft()) {
                    return validation as any
                } else {
                    const s = validation.value
                    const d = day(s)
                    return !d.isValid() ? t.failure(s, c) : t.success(d)
                }
            },
            a => a.toISOString(),
        )
    }
}

export interface DayjsFromStringC extends DayjsFromStringType {}

export const dayjsFromString: DayjsFromStringC = new DayjsFromStringType()
