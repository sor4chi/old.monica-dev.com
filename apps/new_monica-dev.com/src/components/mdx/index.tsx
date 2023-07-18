import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { ComponentPropsWithoutRef } from 'react';

import { Checkbox } from './Checkbox';
import { Codeblock } from './Codeblock';
import { Icon } from './Icon';
import { MDXImage } from './Image';
import { Link } from './Link';

export const replacingMDXComponents = {
  a: Link,
  i: Icon,
  img: MDXImage,
  input: ({ type, ...props }: ComponentPropsWithoutRef<'input'>) =>
    type === 'checkbox' ? <Checkbox {...props} /> : <input type={type} {...props} />,
  pre: Codeblock,
} satisfies MDXRemoteProps['components'];
