import React from "react";
import * as stream from "stream";

export {};

interface Props {
    foo: string;
    bar: string;
}

const Component: React.VFC<Props> = () => null;

/**
 * Не всегда библиотеки компонентов - та же конста - экспортируют наружу пропсы компонента.
 * Но необходимо получить эти пропсы
 */

type ExtractReactProps<T> = T extends
    | React.ComponentType<infer Props>
    | React.Component<infer Props> ?
    Props :
    never;


type ExtractedProps = ExtractReactProps<typeof Component>;

type Foo = ExtractedProps['bar'];
