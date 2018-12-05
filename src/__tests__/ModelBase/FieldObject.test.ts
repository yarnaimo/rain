import { MFile } from '../..'

class _FileObject extends MFile {
    invalidProp: string = 'value'
}

let file: _FileObject

const data = {
    mimeType: 'image/png',
    url: 'https://t.co',
}

beforeEach(() => {
    file = new _FileObject()
})

test('set()', () => {
    expect(file.set(data)).toMatchObject(data)
})

test('value()', () => {
    file.set(data)
    expect(file.value()).toEqual(data)
})
