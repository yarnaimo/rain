import { ValidationError } from 'class-validator'
import { PlainObject } from '.'
import { is } from './is'

export class ValidationErrors {
    errors: ValidationError[] = []

    constructor(errors: ValidationError[]) {
        this.errors = errors
    }

    toString() {
        return '🚫 Validation Error\n\n' + this.errors.map(e => e.toString()).join('\n')
    }
}

export const pickObjectFields = (fieldNames: Set<string>, from: PlainObject) => {
    return [...fieldNames].reduce(
        (to, k) => {
            to[k] = from[k]
            return to
        },
        {} as PlainObject
    )
}

export const asError = (v: any) => (is.error(v) ? v : new Error(v))
