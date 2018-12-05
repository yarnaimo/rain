import { pickObjectFields } from '../utils'
import { FieldBase } from './FieldBase'

export class FieldObject<I> extends FieldBase {
    fieldNames!: Set<string>

    value() {
        return pickObjectFields(this.fieldNames, this)
    }

    set(data: Partial<I>) {
        Object.assign(this, data)
        return this
    }
}

export const FieldObjectProp = (target: FieldObject<any>, key: string) => {
    if (!target.fieldNames) target.fieldNames = new Set()
    target.fieldNames.add(key)
}
