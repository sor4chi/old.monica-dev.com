import * as React from 'react';
import type { SVGProps } from 'react';

const SvgArrowTrendingUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="arrow-trending-up_svg__w-6 arrow-trending-up_svg__h-6"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M15.22 6.268a.75.75 0 0 1 .968-.432l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.941a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 0 0-5.45 5.174.75.75 0 0 1-1.199.19L9 12.31l-6.22 6.22a.75.75 0 1 1-1.06-1.06l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.605a12.694 12.694 0 0 1 5.68-4.973l1.086-.484-4.251-1.631a.75.75 0 0 1-.432-.97z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowTrendingUp;
