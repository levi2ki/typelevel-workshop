export {};

/**
 * Предположим, что вы пишете некоторый обработчик - функцию, вызывающую api метод PATCH на CRUD узле.
 * Вы не хотите посылать пустые апдейты.
 * применим подвид mapped types - lookup types
 */


interface Entity {
    foo: string;
    bar: string;
    baz: string;
    spam: {
        egg: string;
    }
}

type AtLeastOne<Type, Keys extends keyof Type = keyof Type> = 
    Partial<Type> & { [K in Keys]: Required<Pick<Type, K>>}[Keys];


function badUpdate(id: string, entity: Partial<Entity>): Promise<Partial<Entity>> {
    return Promise.resolve(entity);
}
badUpdate('1', {});


function goodUpdate(id: string, entity: AtLeastOne<Entity>): Promise<Partial<Entity>> {
    return Promise.resolve(entity);
}

// @ts-expect-error
goodUpdate('1', {});
goodUpdate('1', { foo: '' })
