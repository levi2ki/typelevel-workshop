export {};

interface User {
    id: number;
    name: string;
    secondName: string;
    patronymic: string;
}

/**
 * У нас уже есть тип, меняющий все свойства объекта на опциональные.
 * А что если необходимо указать только выбранные свойства?
 * Например, отчество для пользователя сделали обязательным.
 */



type PartialSome<Type, Keys extends keyof Type> = {
    [Req in Keys]+?: Type[Req];
} & Omit<Type, Keys>;

type GoodUser = PartialSome<User, 'patronymic'>;

interface GU extends GoodUser {}

const Alexey: GU = {
    id: 12,
    name: 'Alexey',
    secondName: 'Programmer',
}