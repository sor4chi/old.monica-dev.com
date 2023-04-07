import Link from 'next/link';

import * as styles from './login.css';

import { LoginForm } from '@/ui/feature/account/login';

export default async function Login() {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Monica Portfolio</h1>
      <LoginForm />
      <Link href="/" passHref className={styles.backLink}>
        Back to top
      </Link>
    </div>
  );
}
