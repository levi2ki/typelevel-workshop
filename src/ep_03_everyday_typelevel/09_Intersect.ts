import { IfDef } from "./06_logical_If_IfDef";

export {};

interface Module1Store {
    currentUser: string;
    isLoggedIn: boolean;
}

interface Module2Store {
    basket: string[];
    currentUser: { id: string };
}

interface Module3Store {
    pointsOfInterest: {x: number, y: number}[];
}

/**
 * Представьте кейс - вы имеете некий общий DI контейнер и туда из модулей импортируете некоторые обьъекты.
 * Например, надо скрестить два объекта стора редакса из разных модулей (каждый модуль предоставляет свой редюсер
 * самостоятельно). Вам никак нельзя допустить, что бы пересечение свойств этих двух объектов были похожи.
 */


export type Intersect<A extends {}, B extends {}> = 
    Pick<A, Exclude<keyof A, Exclude<keyof A, keyof B>>> extends { [x: string]: never } ?
    never :
    Pick<A, Exclude<keyof A, Exclude<keyof A, keyof B>>>
;




function mergeStores<A,B>(a: A, b: B): A & B {
    return { ...a, ...b };
}
const a = mergeStores<Module1Store, Module2Store>(
    { currentUser: 's', isLoggedIn: true} as Module1Store,
    { basket: [], currentUser: { id: ''} } as Module2Store
);
type WrongAndBroken = typeof a.currentUser;


function accurateMergeStore<A,B>(a: A, b: B): Omit<A, keyof B> & B {
    return { ...a, ...b };
}

const aa = accurateMergeStore(
    { currentUser: 's', isLoggedIn: true} as Module1Store,
    { basket: [], currentUser: { id: ''} } as Module2Store
)
type TrueButBroken = typeof aa.currentUser;

function strictMergeStore<A extends {}, B extends {}>(a: A, b: B): IfDef<Intersect<A, B>, void, A & B> {
    return { ...a, ...b } as never;
}

const aaa = strictMergeStore(
    { currentUser: 's', isLoggedIn: true } as Module1Store,
    { basket: [], currentUser: { id: ''} } as Module2Store
);

const bbb = strictMergeStore(
    // @ts-expect-error
    aaa,
    { pointsOfInterest: [{ x: 12, y: 55 }]} as Module3Store
);


function ms<A extends {}, B extends {}>(a: A, b: B) {
    // @ts-expect-error
    interface X extends A, B {}

    return {...a, ...b } as X & {};
}

const msNotWorking = ms(
    { currentUser: 's', isLoggedIn: true } as Module1Store,
    { basket: [], currentUser: { id: ''} } as Module2Store
);
const cu = msNotWorking.currentUser;





// BONUS: union of intersection
type Inter2<A, B> = keyof A & keyof B;

type D = Inter2<{ foo: string; doo: { bar: string; } }, { bar: string; foo: number }>