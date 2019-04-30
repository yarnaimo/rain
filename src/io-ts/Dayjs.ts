import { Dayjs, isDayjs } from 'dayjs'
import { t } from '..'

export class DayjsType extends t.Type<Dayjs, Dayjs, t.mixed> {
    readonly _tag: 'DayjsType' = 'DayjsType'
    constructor() {
        super('Dayjs', isDayjs, (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity)
    }
}

export interface DayjsC extends DayjsType {}

export const dayjs: DayjsC = new DayjsType()
