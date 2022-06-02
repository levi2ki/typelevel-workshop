export {};

interface User {
    id?: number | null;
    name: string;
    secondName: string;
    patronymic?: string | null;
}

/**
 * Известная фича graphQL генератора в том, что опциональный тип он выводит как Type | null | undefined.
 * Задача - объявить выбранные поля обязательными.
 */


type GraphQLRequireSome<Type, Keys extends keyof Type> = {
    [Req in Keys]-?: NonNullable<Type[Req]>;
} & Omit<Type, Keys>;


type GoodUser = GraphQLRequireSome<User, 'id'>;

interface GU extends GoodUser {}

const Alexey: GU = {
    id: 12,
    name: 'Alexey',
    secondName: 'Programmer'
};