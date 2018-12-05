import { Field, ModelBase } from '../..'

export interface ITag {
    name: string
}

export class _Tag extends ModelBase<ITag> implements ITag {
    @Field name = 'music'
}
