import { IsString, IsUrl } from 'class-validator'
import { FieldObject, FieldObjectProp } from '..'

interface IFile {
    mimeType: string
    name: string
    url: string
}

export class MFile extends FieldObject<IFile> implements IFile {
    @FieldObjectProp @IsString() mimeType!: string
    @FieldObjectProp @IsString() name!: string
    @FieldObjectProp @IsUrl() url!: string
}
