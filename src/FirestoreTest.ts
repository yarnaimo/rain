import {
    apps,
    initializeAdminApp,
    initializeTestApp,
    loadFirestoreRules,
} from '@firebase/testing'
import { readFileSync } from 'fs'

export class FirestoreTest {
    protected testNumber: number = 0
    protected projectName: string
    protected rules: string

    constructor(
        projectName: string,
        rulesFilePath: string = 'firestore.rules'
    ) {
        this.projectName = projectName + '-' + Date.now()
        this.rules = readFileSync(rulesFilePath, 'utf8')
    }

    async create() {
        this.next()
        await this.loadRules()
    }

    next() {
        this.testNumber++
    }

    protected get projectId() {
        return `${this.projectName}-${this.testNumber}`
    }

    async loadRules() {
        return loadFirestoreRules({
            projectId: this.projectId,
            rules: this.rules,
        })
    }

    getFirestoreWithAuth(auth?: { [key in 'uid' | 'email']?: string }) {
        return initializeTestApp({
            projectId: this.projectId,
            auth: auth,
        }).firestore()
    }

    getAdminFirestore() {
        return initializeAdminApp({
            projectId: this.projectId,
        }).firestore()
    }

    async cleanup() {
        return Promise.all(apps().map(app => app.delete()))
    }
}
