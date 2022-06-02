export {};

const noop = (...arg: any) => {};

type Noop<A = any, B = any, C = any, D = any, E = any, F = any> = never;

namespace LearnExclude {
    export type Exclude_<Type, Excluded> = Type extends Excluded ? never : Type;

    let WithExcludeUnion: Exclude<'foo' | 'bar' | undefined, 'foo' | undefined> = 'bar';
    let AssertExcludeUnion: Exclude_<'foo' | 'bar' | undefined, 'foo' | undefined> = WithExcludeUnion;

    /** Такие конструкции выводят тип never */
    let ExcludeOops: Exclude_<{ foo: string } & { bar: string }, { foo: string }> = undefined as never;


    //
    // @ts-ignore
    noop(AssertExcludeUnion, ExcludeOops)
}

namespace LearnExtract {
    type Extract_<Type, Extractor> = Type extends Extractor ? Type : never;

    let WithExtractUnion: Extract<'foo' | 'bar' | undefined, 'bar' | undefined> = 'bar';
    let AsserExtractUnion: Extract_<'foo' | 'bar' | undefined, 'bar' | undefined> = WithExtractUnion;

    type ExampleObjects = Extract_<{ kind: 'FOO' } | { kind: 'BAR', id: 12 }, { kind: 'BAR' }>;


    //
    noop(AsserExtractUnion);
    type n = Noop<ExampleObjects>;
}

namespace LearnPick {
    export type Pick_<Type, Keys extends keyof Type> = {
        [P in Keys]: Type[P];
    } & {};

    let WithPick: Pick<{ foo: string; bar: string; baz: string }, 'bar' | 'baz'> = { bar: '', baz: '' };
    let AsserPick: Pick_<{ foo?: string; bar?: string; baz: string }, 'bar' | 'baz'> = WithPick;


    //
    noop(AsserPick);
}

export namespace LearnOmit {
    export type Omit_<Type, Keys extends keyof any> = Pick<Type, Exclude<keyof Type, Keys>> & {};

    let WithOmit: Omit<{ foo: string; bar: string; baz: string }, 'bar' | 'foo'> = { baz: '' };
    let AssertOmit: Omit_<{ foo: string; bar: string; baz: string }, 'bar' | 'foo'> = WithOmit;


    //
    noop(AssertOmit);
}

namespace LearnPartialAndRequired {
    type Partial_<Type> = {
        [Key in keyof Type]+?: Type[Key];
    };

    let WithPartial: Partial<{ foo: string; bar: string }> = {};
    let AssertPartial: Partial_<{ foo: string; bar: string }> = WithPartial;


    type Required_<Type> = {
        [Key in keyof Type]-?: Type[Key];
    };

    let WithRequired: Required<{ foo?: string; bar?: string }> = { foo: '', bar: '' };
    let AssertRequired: Required_<{ foo?: string; bar?: string }> = WithRequired;


    //
    noop(AssertRequired, AssertPartial);
}


namespace LearnReadonlyAndMutable {
    type Readonly_<Type> = {
        +readonly [Key in keyof Type]: Type[Key];
    };

    type RO = Readonly_<{ foo: string; bar: string }>;

    const ro: RO = { foo: 'foo', bar: 'bar' };
    // @ts-expect-error
    ro.foo = 'baz';


    type Mutable_<Type> = {
        -readonly [Key in keyof Type]: Type[Key];
    };

    type MU = Mutable_<{ readonly foo: string, readonly bar: string }>;

    const mu: MU = { foo: 'foo', bar: 'bar' };
    mu.foo = 'baz';


    //
    type n = RO & MU;
}

export namespace LearnNullableNonNullable {
    type NonNullable_<Type> = Type extends null | undefined ? never : Type;
    type NonNullable__<Type> = Exclude<Type, null | undefined>;

    type NU = NonNullable_<string | null | undefined>;
    type NU2 = NonNullable__<string | null | undefined>;

    const nu1: NU = '';
    const nu2: NU2 = '';


    type Nullable_<Type> = (Type | null | undefined);

    const n: Nullable_<string> = undefined;


    //
    type n = NU & NU2;
    noop(nu1,nu2, n)
}


namespace LearnFunctionExtractors {
    type Parameters_<Type extends (...args: any) => any> = Type extends (...args: infer Arg) => any ? Arg : never;

    type Par1 = Parameters_<() => void>;
    type Par2 = Parameters_<(foo: string) => void>;
    type Par3 = Parameters_<(foo: string, bar: string, baz: {}) => void>;


    type ReturnType_<Type extends (...args: any) => any> = Type extends (...args: any) => infer Return ? Return : never;

    type Re1 = ReturnType_<() => void>;
    type Re2 = ReturnType_<() => string>;
    type Re3 = ReturnType_<() => never>;

    //
    type n = Par1 | Par2 | Par3 | Re1 | Re2 | Re3;
}
