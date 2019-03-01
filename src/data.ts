import { got } from './got'
import { asError } from './utils'

export const isDataUrl = (v: string) => v.trim().startsWith('data:') && v.includes(',')

export async function bufferFromUrlOrDataUrl(url: string) {
    try {
        if (isDataUrl(url)) {
            const [prelude, base64] = url.split(',')
            const m = /data:([\w\/\+]*)/.exec(prelude)
            const mimetype = m ? m[1] : undefined

            return { mimetype, buffer: Buffer.from(base64, 'base64') }
        }

        const {
            headers: { 'content-type': mimetype },
            body,
        } = await got.get(url, { encoding: null })

        return { mimetype, buffer: body }
    } catch (error) {
        return asError(error)
    }
}
