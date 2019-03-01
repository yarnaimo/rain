import got from 'got'

type gotType = got.GotFn & Record<'get' | 'post' | 'put' | 'patch' | 'head' | 'delete', got.GotFn>

const _got = (got as any) as (gotType & { extend(options: any): gotType })

export { _got as got }
