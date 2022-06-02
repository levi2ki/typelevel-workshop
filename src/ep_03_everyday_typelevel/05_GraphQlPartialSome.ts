export {};

interface User {
    id: number;
    name: string;
    secondName: string;
    patronymic: string;
}

/**
 * Известная фича graphQL генератора в том, что опциональный тип он выводит как Type | null | undefined.
 * Задача - объявить выбранные поля опциональными.
 */


type Nullable_<Type> = (Type | null | undefined);

type GraphQLPartialSome<Type, Keys extends keyof Type> = {
    [Req in Keys]+?: Nullable_<Type[Req]>;
} & Omit<Type, Keys>;


type GoodUser = GraphQLPartialSome<User, 'patronymic' | 'secondName'>;

interface GU extends GoodUser {}

const Alexey: GU = {
    id: 12,
    name: 'Alexey',
};