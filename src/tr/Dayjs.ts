import { Dayjs as DayjsClass, isDayjs } from 'dayjs'
import { t } from '..'

export const Dayjs = new t.Type<DayjsClass, DayjsClass, t.mixed>(
    'Dayjs',
    isDayjs,
    (u, c) => (isDayjs(u) ? t.success(u) : t.failure(u, c)),
    t.identity,
)
