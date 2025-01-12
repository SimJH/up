import { createElement, type ComponentPropsWithoutRef } from 'react';
import { Text } from 'dripsy';
import { match, P } from 'ts-pattern';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H2Props extends ComponentPropsWithoutRef<typeof Text> {}

export function H2({
  children,
  variant,
  variants,
  ...restProps
}: H2Props): React.ReactElement {
  return createElement(
    Text,
    {
      ...restProps,
      variants: [
        'h2',
        ...match([variant, variants])
          .with([P.string, P.array(P.string)], ([variant, variants]) => [
            variant,
            ...variants,
          ])
          .with([P.select(P.string), undefined], (variant) => [variant])
          .with(
            [undefined, P.select(P.array(P.string))],
            (variants) => variants,
          )
          .otherwise(() => []),
      ],
    },
    children,
  );
}
