import { MFile, ValidationErrors } from '../..'
import { _Empty } from './Empty'
import { EntityDocData, _Entity } from './Entity'
import { _Tag } from './Tag'

describe('Tag', () => {
    test('fieldClassMap', () => {
        expect(new _Tag().fieldClassMap).toEqual(new Map())
    })
})

describe('Empty', () => {
    test('fieldNames', () => {
        expect(new _Empty().fieldNames).toEqual(new Set())
    })
})

describe('Entity', () => {
    let doc: _Entity
    let docData: any

    beforeEach(async () => {
        doc = new _Entity()
        docData = EntityDocData(doc)
    })

    test('field setter not setting undefined', () => {
        doc.number = undefined!
        expect(doc.number).toEqual(docData.number)
    })

    test('docData', () => {
        expect(doc.docData).toEqual(docData)
    })

    test('changedDocData', () => {
        doc.resetChangedFieldNames()
        doc.number = 7
        expect(doc.changedDocData).toEqual({ number: 7 })
    })

    test('value restored', () => {
        ;(doc as any).file = {
            name: 'file',
        }
        expect(doc.file).toBeInstanceOf(MFile)
    })

    test('set()', () => {
        doc.set({ string: 'newString' })
        expect(doc.string).toBe('newString')
    })

    test('set() not adding invalid field', () => {
        doc.set({ name: 'value' } as any)
        expect((doc as any).name).toBeUndefined()
    })

    test('validate() passes', async () => {
        await expect(doc.validate()).resolves.toEqual(doc)
    })

    test('validate() fails', async () => {
        expect.assertions(2)

        doc.number = 81
        doc.date = new Date(117)

        await doc.validate().catch((error: ValidationErrors) => {
            expect(error.errors).toHaveLength(2)
            expect(error.toString().startsWith('🚫')).toBeTruthy()
        })
    })
})
