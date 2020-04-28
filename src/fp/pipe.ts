type Fn<Pr extends boolean, In, Out> = (
    input: In,
) => Pr extends true ? Out | PromiseLike<Out> : Out

export type MightPromise<Pr extends boolean, T> = Pr extends true
    ? Promise<T>
    : T

export interface Pipe<Pr extends boolean> {
    <A, B>(input0: A, op1: Fn<Pr, A, B>): MightPromise<Pr, B>

    <A, B, C>(input0: A, op1: Fn<Pr, A, B>, op2: Fn<Pr, B, C>): MightPromise<
        Pr,
        C
    >

    <A, B, C, D>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
    ): MightPromise<Pr, D>

    <A, B, C, D, E>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
        op4: Fn<Pr, D, E>,
    ): MightPromise<Pr, E>

    <A, B, C, D, E, F>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
        op4: Fn<Pr, D, E>,
        op5: Fn<Pr, E, F>,
    ): MightPromise<Pr, F>

    <A, B, C, D, E, F, G>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
        op4: Fn<Pr, D, E>,
        op5: Fn<Pr, E, F>,
        op6: Fn<Pr, F, G>,
    ): MightPromise<Pr, G>

    <A, B, C, D, E, F, G, H>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
        op4: Fn<Pr, D, E>,
        op5: Fn<Pr, E, F>,
        op6: Fn<Pr, F, G>,
        op7: Fn<Pr, G, H>,
    ): MightPromise<Pr, H>

    <A, B, C, D, E, F, G, H, I>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
        op4: Fn<Pr, D, E>,
        op5: Fn<Pr, E, F>,
        op6: Fn<Pr, F, G>,
        op7: Fn<Pr, G, H>,
        op8: Fn<Pr, H, I>,
    ): MightPromise<Pr, I>

    <A, B, C, D, E, F, G, H, I, J>(
        input0: A,
        op1: Fn<Pr, A, B>,
        op2: Fn<Pr, B, C>,
        op3: Fn<Pr, C, D>,
        op4: Fn<Pr, D, E>,
        op5: Fn<Pr, E, F>,
        op6: Fn<Pr, F, G>,
        op7: Fn<Pr, G, H>,
        op8: Fn<Pr, H, I>,
        op9: Fn<Pr, I, J>,
    ): MightPromise<Pr, J>
}

export const _: Pipe<false> = (input: any, ...functions: any[]) => {
    let currentValue = input

    for (const fn of functions) {
        currentValue = fn(currentValue)
    }

    return currentValue
}

export const p: Pipe<true> = async (input: any, ...functions: any[]) => {
    let currentValue = input

    for (const fn of functions) {
        currentValue = await fn(currentValue)
    }

    return currentValue
}
