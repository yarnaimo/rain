import { t } from '..'

export const nonEmptyArray = <A, O>(
    codec: t.Type<A, O, unknown>,
    name: string = `multiElementArray(${codec.name})`,
) => {
    const arr = t.array(codec)

    const is = (u: unknown): u is [A, ...A[]] => arr.is(u) && u.length >= 1

    return new t.Type<[A, ...A[]], [O, ...O[]], unknown>(
        name,
        is,
        (u, c) => arr.validate(u, c).chain(a => (is(a) ? t.success(a) : t.failure(u, c))),
        a => a.map(codec.encode) as [O, ...O[]],
    )
}
