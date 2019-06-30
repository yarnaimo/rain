import { dayjs, t } from '../external'

export const DayjsFromString = new t.Type<dayjs.Dayjs, string, t.mixed>(
    'DayjsFromString',
    dayjs.isDayjs,
    (u, c) => {
        const validation = t.string.validate(u, c)
        if (validation.isLeft()) {
            return validation as any
        } else {
            const s = validation.value
            const d = dayjs(s)
            return !d.isValid() ? t.failure(s, c) : t.success(d)
        }
    },
    a => a.toISOString(),
)
