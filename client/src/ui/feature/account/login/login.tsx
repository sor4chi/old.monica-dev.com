import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import * as styles from './login.css';

import { client, gql } from '@/lib/graphql';
import { Button } from '@/ui/foundation/button';
import { TextInput } from '@/ui/foundation/textInput';

const schema = z.object({
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
});

type Schema = z.infer<typeof schema>;

const LoginMutation = gql`
  mutation Login($password: String!) {
    login(password: $password) {
      token
    }
  }
`;

type LoginMutationResponse = {
  login: {
    token: string;
  };
};

type LoginMutationVariables = {
  password: string;
};

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

  const onSubmit = async (data: Schema) => {
    try {
      const res = await client.request<LoginMutationResponse, LoginMutationVariables>(LoginMutation, {
        password: data.password,
      });

      setRequestError(null);
      document.cookie = `token=${res.login.token}; path=/`;
      router.push('/dashboard');
    } catch (e: any) {
      setRequestError(e.response.errors[0].message);
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
