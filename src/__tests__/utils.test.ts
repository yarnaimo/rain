import { bufferFromUrlOrDataUrl } from '../data'

test('bufferFromUrlOrDataUrl', async () => {
    expect(await bufferFromUrlOrDataUrl('data:image/png;base64,A')).toEqual({
        mimetype: 'image/png',
        buffer: expect.any(Buffer),
    })
})
