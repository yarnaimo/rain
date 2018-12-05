import { FieldBase } from './FieldBase'

export class FieldArray<I> extends FieldBase {
    array: I[] = []

    value() {
        return this.array
    }

    set(array: I[]) {
        this.array = array
        return this
    }
}
