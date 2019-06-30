import { dayjs, t } from '../external'

export const Dayjs = new t.Type<dayjs.Dayjs, dayjs.Dayjs, t.mixed>(
    'Dayjs',
    dayjs.isDayjs,
    (u, c) => (dayjs.isDayjs(u) ? t.success(u) : t.failure(u, c)),
    t.identity,
)
