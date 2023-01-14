import { createElement } from 'react';
import { H1 as DripsyH1 } from 'dripsy';
import { overrideHeadingStyle } from 'src/themes';

import type { ComponentPropsWithRef } from 'react';
 
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H1Props extends ComponentPropsWithRef<typeof DripsyH1> {}

export function H1 ({ children, style, ...restProps }: H1Props): JSX.Element {
  return createElement(
    DripsyH1,
    {
      ...restProps,
      style: [overrideHeadingStyle, style],
    },
    children
  );
}