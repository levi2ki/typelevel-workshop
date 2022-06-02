export {};

interface UserObj {
    id: string;
    name: string;
    age: number;
    toString(): string;
}

type MakeGetters<X> = {
    +readonly [
    K in keyof X as
        (X[K] extends (...args: any) => any ? K : `get${Capitalize<string & K>}`)
    ]: X[K] extends (...args: any) => any ?
        X[K] :
        () => X[K];
} & {}

interface Classe<X> {
    new (arg: X): MakeGetters<X>
}

const capitalize = <M extends string>(str: M) => {
    return (str.slice(0, 1).toUpperCase() + str.slice(1)) as Capitalize<M & string>
}

function objectFabric<X extends object>() {
    return class {
        [K: string]: unknown;
        constructor(ctor: X) {
            for (let [k, v] of Object.entries(ctor)) {
                const key = `get${capitalize((k as Exclude<keyof X, symbol | number>))}`;
                if (typeof v != 'function') {
                    this[k] = v;
                    this[key] = function () {
                        return this[k];
                    }
                }
            }
        }
    } as Classe<X>
}

const UserFabric = objectFabric<UserObj>();

const U = new UserFabric({ name: 'Yra', age: 24, id: '0000001' });

alert (U.getAge())