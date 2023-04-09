import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import * as styles from './login.css';

import { clientEnv } from '@/env/client';
import { useSession } from '@/hooks';
import { Button } from '@/ui/foundation/button';
import { TextInput } from '@/ui/foundation/textInput';

const schema = z.object({
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
});

type Schema = z.infer<typeof schema>;

export const LoginForm = () => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const authState = useSession();

  if (authState === 'authenticated') {
    router.push('/dashboard');
    return null;
  }

  const onSubmit = async (data: Schema) => {
    const res = await fetch(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT.replace('/query', '/login'), {
      body: JSON.stringify({
        password: data.password,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (res.ok) {
      setRequestError(null);
      router.push('/dashboard');
    } else {
      setRequestError('パスワードが違います');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextInput
        type="password"
        label="Password"
        id="password"
        placeholder="パスワード"
        error={errors.password?.message}
        {...register('password')}
      />
      {requestError && <p className={styles.error}>{requestError}</p>}
      <Button type="submit">Login</Button>
    </form>
  );
};
