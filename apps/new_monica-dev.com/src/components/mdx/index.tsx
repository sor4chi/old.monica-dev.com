import type { ComponentPropsWithoutRef } from 'react';

import { Checkbox } from './Checkbox';
import { Codeblock } from './Codeblock';
import { MDXImage } from './Image';
import { Link } from './Link';

export const replacingMDXComponents = {
  a: Link,
  img: MDXImage,
  input: ({ type, ...props }: ComponentPropsWithoutRef<'input'>) =>
    type === 'checkbox' ? <Checkbox {...props} /> : <input type={type} {...props} />,
  pre: Codeblock,
};
