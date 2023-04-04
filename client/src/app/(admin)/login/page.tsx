import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import * as styles from './login.css';

import { LoginForm } from '@/ui/feature/account/login';

export default async function Login() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('session_id');

  if (sessionId) {
    redirect('/dashboard');
  }

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
