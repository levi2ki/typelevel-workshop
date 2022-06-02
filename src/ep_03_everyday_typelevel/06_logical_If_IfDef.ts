export {};

/**
 * Бывают случаи, когда необходимо динамически определить тип в зависимости от условий.
 * Отдельно тип не показательный, позже будут хорошие примеры.
 */

export type If<LEFT, RIGHT, True, False> = [LEFT] extends [RIGHT] ? True : False;

export type IfDef<LEFT, True, False> = [LEFT] extends [never] ? False : True;


type Whatever = If<{ foo: string; bar: string}, { foo: string }, string, never>;
type Whatever2 = If<{ foo: string; bar: string }, { baz: string }, string, never>;
type Whatever3 = If<keyof { foo: string; bar: string }, 'bar' | 'baz', string, never>;