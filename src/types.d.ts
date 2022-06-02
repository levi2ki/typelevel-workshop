// logical
export declare type If<LEFT, RIGHT, True, False> = [LEFT] extends [RIGHT] ? True : False;
export declare type IfDef<LEFT, True, False> = [LEFT] extends [never] ? False : True;

// manipulation types
export declare type DeepPartial<Type> = {
    [Key in keyof Type]+?: DeepPartial<Type[Key]>;
};

export declare type DeepRequired<Type> = {
    [Key in keyof Type]-?: DeepRequired<Type[Key]>;
};

export declare type RequiredSome<Type, Keys extends keyof Type> = {
    [Req in Keys]-?: Type[Req];
} & Omit<Type, Keys>;

export declare type PartialSome<Type, Keys extends keyof Type> = {
    [Req in Keys]+?: Type[Req];
} & Omit<Type, Keys>;

export declare type GraphQLRequireSome<Type, Keys extends keyof Type> = {
    [Req in Keys]-?: NonNullable<Type[Req]>;
} & Omit<Type, Keys>;

export declare type GraphQLPartialSome<Type, Keys extends keyof Type> = {
    [Req in Keys]+?: Nullable<Type[Req]>;
} & Omit<Type, Keys>;

export declare type ReplaceDeep<Type, Path extends string, Replacer> =
    Path extends `${infer Key}.${infer RestPath}` ?
        { [K in keyof Type]: Key extends K ? ReplaceDeep<Type[K], RestPath, Replacer> : Type[K] } :
        { [K in keyof Type]: K extends Path ? Replacer : Type[K] }
    ;

export declare type Overwrite<T, U> = Omit<T, keyof T & keyof U> & U;

export declare type Intersect<A extends {}, B extends {}> =
    Pick<A, Exclude<keyof A, Exclude<keyof A, keyof B>>> extends { [x: string]: never } ?
        never :
        Pick<A, Exclude<keyof A, Exclude<keyof A, keyof B>>>
    ;

export declare type AtLeastOne<Type, Keys extends keyof Type = keyof Type> =
    Partial<Type> & { [K in Keys]: Required<Pick<Type, K>>}[Keys];

// tuple operations
export declare type Tail<Type extends unknown[]> = Type extends [unknown, ...infer Rest] ? Rest : never;
export declare type Init<Type extends unknown[]> = Type extends [...infer Rest, unknown] ? Rest : never;
export declare type Head<Type extends unknown[]> = Type extends [infer A, ...unknown[]] ? A : never;
export declare type Last<Type extends unknown[]> = Type extends [...unknown[], infer A] ? A : never;

// React
export declare type ExtractReactProps<T> = T extends
    | React.ComponentType<infer Props>
    | React.Component<infer Props> ?
    Props :
    never;