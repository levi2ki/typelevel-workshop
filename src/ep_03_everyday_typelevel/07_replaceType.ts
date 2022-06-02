export {};

interface User {
    id: number;
    name: string;
    secondName: string;
    patronymic?: string;
    office?: {
        id: string;
        serialNumber: number;
        floor: {
            schema: {
                way?: {
                    left?: number;
                }
            };
            serialNumber?: string;
        };
    }
}

/**
 * Если тип высокой вложенности и где-то в глубине необходимо изменить тип одного свойства, не стоит
 * вручную писать новый тип - с помощью типа шаблонных строк и рекурсии можно создать утилиту замены.
 */

export type ReplaceDeep<Type, Path extends string, Replacer> =
    Path extends `${infer Key}.${infer RestPath}` ?
        { [K in keyof Type]: Key extends K ? ReplaceDeep<Type[K], RestPath, Replacer> : Type[K] } :
        { [K in keyof Type]: K extends Path ? Replacer : Type[K] }
;




const Alexey: ReplaceDeep<User, 'id', string> = {
    id: '',
    name: 'Alexey',
    secondName: 'Programmer',
}

const Viktor: ReplaceDeep<User, 'office.floor.schema.way', string[]> = {
    id: 22,
    name: 'Viktor',
    secondName: 'AnotherProgrammer',
    office: {
        id: '0004',
        serialNumber: 4,
        floor: {
            serialNumber: 'G4',
            schema: {
                way: ['left', 'right', 'left', 'forward']
            }
        }
    }
}




// BONUS: множественная перезапись
type Overwrite<T, U> = Omit<T, keyof T & keyof U> & U;

type UserWithStringIdAndOffceString = Overwrite<User, { id: string; office: string }>;

const OverUser: UserWithStringIdAndOffceString = {
    id: '12',
    name: '12',
    secondName: '12',
    office: '12'
}
