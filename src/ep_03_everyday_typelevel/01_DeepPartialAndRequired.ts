export {};

interface User {
    id: number;
    name: string;
    secondName: string;
    patronymic?: string;
    office: {
        id?: string;
        serialNumber?: number;
        floor?: number;
    };
}

/**
 * Задача - сделать все объекты и свойства и все вложенные объекты и их свойства опциональными
 */



type DeepPartial<Type> = {
    [Key in keyof Type]+?: DeepPartial<Type[Key]>;
};

type PartialUser = DeepPartial<User>;

const partialUser: PartialUser = {};


/**
 * Задача - сделать все объекты и свойства и все вложенные объекты и их свойства обязательными.
 */

type DeepRequired<Type> = {
    [Key in keyof Type]-?: DeepRequired<Type[Key]>;
};

type RequiredUser = DeepRequired<PartialUser>;

// @ts-expect-error
const reqUser: RequiredUser = { office: {} };