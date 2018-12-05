import { IsArray, IsIn, IsInstance, Max, MaxDate, Min, ValidateNested } from 'class-validator'
import { Field, MFile, ModelBase } from '../..'

export interface IEntity {
    number: number
    string: string
    date: Date
    array: string[]
    object: object
    file: MFile
}

export interface IChild {
    name: string
}

export class _Child extends ModelBase<IChild> implements IChild {
    @Field name: string = 'rain'
}

export class _Entity extends ModelBase<IEntity> implements IEntity {
    @Field @Min(3) @Max(30) number: number = 3

    @Field @IsIn(['major', 'minor', 'aug', 'dim']) string: string = 'aug'

    @Field @MaxDate(new Date(100)) date: Date = new Date(81)

    @Field @IsArray() array: string[] = ['item']

    @Field object: object = { key: 'value' }

    @Field(MFile)
    @IsInstance(MFile)
    @ValidateNested()
    file = new MFile().set({
        name: 'file',
        url: 'file.png',
        mimeType: 'image/png',
    })

    @Field(MFile)
    @IsInstance(MFile)
    @ValidateNested()
    file2 = new MFile().set({
        name: 'file2',
        url: 'file2.png',
        mimeType: 'image/png',
    })
}

export const EntityDocData = (doc: _Entity) => ({
    number: doc.number,
    string: doc.string,
    date: doc.date,
    array: doc.array,
    object: doc.object,
    file: doc.file.value(),
    file2: doc.file2.value(),
})
