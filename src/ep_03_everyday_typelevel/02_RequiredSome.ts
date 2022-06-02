export {};

interface User {
    id?: number;
    name?: string;
    secondName: string;
    patronymic?: string;
}

/**
 * У нас есть тип Required, который все свойства объекта делает обязательными.
 * А что, если нам необходимо сделать обязательными только выбранные свойства объекта?
 * Например, по ошибке id и name пользователя сделали опциональным.
 */

type RequiredSome<Type, Keys extends keyof Type> = {
    [Req in Keys]-?: Type[Req];
} & Omit<Type, Keys>;


type GoodUser = RequiredSome<User, 'id' | 'name'>;

interface GU extends GoodUser {}

const Alexey: GU = {
    id: 1,
    name: 'Alexey',
    secondName: 'Programmer',
}