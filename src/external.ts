import is from '@sindresorhus/is'
import * as dayjs from 'dayjs'
import * as got from 'got'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import * as tr from './tr'
export * from 'fp-ts/lib/Either'
export { PathReporter } from 'io-ts/lib/PathReporter'
export { ThrowReporter } from 'io-ts/lib/ThrowReporter'
export { _got as got }
export { is }
export { t, tt, tr, dayjs }

type gotType = got.GotFn &
    Record<'get' | 'post' | 'put' | 'patch' | 'head' | 'delete', got.GotFn>

const _got = (got as any) as (gotType & { extend(options: any): gotType })
