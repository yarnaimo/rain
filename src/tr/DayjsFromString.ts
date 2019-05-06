import day, { Dayjs, isDayjs } from 'dayjs'
import { t } from '..'

export const DayjsFromString = new t.Type<Dayjs, string, t.mixed>(
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
