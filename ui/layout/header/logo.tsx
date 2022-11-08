import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link href="/" className="h-min">
    <div className="flex items-center space-x-2">
      <Image src="/original.svg" alt="logo" width={40} height={40} />
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
        Monica
      </h1>
    </div>
  </Link>
);
