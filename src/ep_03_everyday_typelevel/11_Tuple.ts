export {};

type AwesomeTuple = ['foo', 'bar', 'baz'];

type Tail<Type extends unknown[]> = Type extends [unknown, ...infer Rest] ? Rest : never;

type Init<Type extends unknown[]> = Type extends [...infer Rest, unknown] ? Rest : never;

type Head<Type extends unknown[]> = Type extends [infer A, ...unknown[]] ? A : never;

type Last<Type extends unknown[]> = Type extends [...unknown[], infer A] ? A : never;


const tail: Tail<AwesomeTuple> = ['bar', 'baz'];

const init: Init<AwesomeTuple> = ['foo', 'bar'];

const head: Head<AwesomeTuple> = 'foo';

const last: Last<AwesomeTuple> = 'baz';