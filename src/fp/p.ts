type Fn<In, Out> = (input: In) => Out | PromiseLike<Out>

export interface $p {
    <A, B>(input0: A, op1: Fn<A, B>): Promise<B>

    <A, B, C>(input0: A, op1: Fn<A, B>, op2: Fn<B, C>): Promise<C>

    <A, B, C, D>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
    ): Promise<D>

    <A, B, C, D, E>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
        op4: Fn<D, E>,
    ): Promise<E>

    <A, B, C, D, E, F>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
        op4: Fn<D, E>,
        op5: Fn<E, F>,
    ): Promise<F>

    <A, B, C, D, E, F, G>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
        op4: Fn<D, E>,
        op5: Fn<E, F>,
        op6: Fn<F, G>,
    ): Promise<G>

    <A, B, C, D, E, F, G, H>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
        op4: Fn<D, E>,
        op5: Fn<E, F>,
        op6: Fn<F, G>,
        op7: Fn<G, H>,
    ): Promise<H>

    <A, B, C, D, E, F, G, H, I>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
        op4: Fn<D, E>,
        op5: Fn<E, F>,
        op6: Fn<F, G>,
        op7: Fn<G, H>,
        op8: Fn<H, I>,
    ): Promise<I>

    <A, B, C, D, E, F, G, H, I, J>(
        input0: A,
        op1: Fn<A, B>,
        op2: Fn<B, C>,
        op3: Fn<C, D>,
        op4: Fn<D, E>,
        op5: Fn<E, F>,
        op6: Fn<F, G>,
        op7: Fn<G, H>,
        op8: Fn<H, I>,
        op9: Fn<I, J>,
    ): Promise<J>
}

export const $p: $p = async (input: any, ...functions: any[]) => {
    let currentValue = input

    for (const fn of functions) {
        currentValue = await fn(currentValue)
    }

    return currentValue
}
