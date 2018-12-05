import { validate } from 'class-validator'
import { FieldBase, pickObjectFields, PlainObject, ValidationErrors } from '..'

export const CREATED_AT = 'createdAt'
export const UPDATED_AT = 'updatedAt'

export interface ITimeMetadata {
    [CREATED_AT]?: Date
    [UPDATED_AT]?: Date
}

export class ModelBase<I> implements ITimeMetadata {
    fieldNames!: Set<string>

    fieldClassMap!: Map<string, typeof FieldBase>

    protected pickValidFields(data: { [key: string]: any }) {
        return Object.entries(data).filter(([k]) => this.fieldNames.has(k))
    }

    protected changedFieldNames = new Set<string>()

    resetChangedFieldNames() {
        this.changedFieldNames = new Set()
    }

    protected _docData: PlainObject = {}

    get docData() {
        return this._docData
    }

    get changedDocData(): PlainObject {
        return pickObjectFields(this.changedFieldNames, this._docData)
    }

    protected prepareValue(key: string, value: unknown) {
        if (value instanceof FieldBase && this.fieldClassMap.has(key)) return value.value()

        return value
    }

    protected restoreValue(key: string, value: unknown) {
        const FieldClass = this.fieldClassMap.get(key)
        if (FieldClass && !(value instanceof FieldBase)) {
            return new FieldClass().set(value as any)
        }

        return value
    }

    protected defineField(key: string) {
        let _value: any

        const descriptor: PropertyDescriptor = {
            enumerable: true,
            configurable: true,
            get: () => {
                return _value
            },
            set: newValue => {
                if (newValue == null) return

                _value = this.restoreValue(key, newValue)
                this._docData[key] = this.prepareValue(key, newValue)

                this.changedFieldNames.add(key)
            },
        }
        Object.defineProperty(this, key, descriptor)
    }

    createdAt?: Date

    updatedAt?: Date

    constructor() {
        if (!this.fieldNames) this.fieldNames = new Set()
        if (!this.fieldClassMap) this.fieldClassMap = new Map()

        this.fieldNames.forEach(name => this.defineField(name))
    }

    set(data: Partial<I>) {
        this.pickValidFields(data).forEach(([k, v]) => ((this as any)[k] = v))
    }

    async validate() {
        const errors = await validate(this)
        if (errors.length) {
            throw new ValidationErrors(errors)
        }
        return this
    }
}

interface IField {
    <T extends ModelBase<any>>(target: T, key: string): void

    (FieldClass: typeof FieldBase): <T extends ModelBase<any>>(target: T, key: string) => void
}

const _Field = (FieldClass?: typeof FieldBase) => <T extends ModelBase<any>>(
    target: T,
    key: string
) => {
    if (!target.fieldNames) target.fieldNames = new Set([CREATED_AT, UPDATED_AT])
    target.fieldNames.add(key)

    if (!FieldClass) return

    if (!target.fieldClassMap) target.fieldClassMap = new Map()
    target.fieldClassMap.set(key, FieldClass)
}

export const Field = ((...args: any[]) => {
    if (args[0].prototype instanceof FieldBase) {
        return _Field(args[0])
    }
    return _Field()(args[0], args[1])
}) as IField
