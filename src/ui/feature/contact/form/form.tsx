import type { ChangeEvent } from 'react';
import { useEffect, useReducer, useState } from 'react';
import twemoji from 'twemoji';
import { z } from 'zod';

import * as styles from './form.css';

import type { PostContactResponse } from '@/app/api/contact/route';
import { Button } from '@/ui/foundation/button';
import { Text } from '@/ui/foundation/text';
import { TextInput } from '@/ui/foundation/textInput';
import { Textarea } from '@/ui/foundation/textarea';
import { customFetch } from '@/util/fetcher';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address, 正しいメールアドレスを入力してください' }),
  message: z.string().min(1, { message: 'Please enter a message, メッセージを入力してください' }),
  name: z.string().min(1, { message: 'Please enter your name, 名前を入力してください' }),
});

const initialForm = {
  email: '',
  message: '',
  name: '',
} satisfies z.infer<typeof formSchema>;

const initialFormError = {
  email: '',
  message: '',
  name: '',
} satisfies z.infer<typeof formSchema>;

type ReducerAction =
  | {
      type: 'change';
      payload: {
        name: keyof typeof initialForm;
        value: string | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;
      };
    }
  | {
      type: 'reset';
    }
  | {
      type: 'load';
    };

const reducer = (state: typeof initialForm, action: ReducerAction) => {
  switch (action.type) {
    case 'change':
      localStorage.setItem('contactForm', JSON.stringify({ ...state, [action.payload.name]: action.payload.value }));
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'reset':
      localStorage.removeItem('contactForm');
      return initialForm;
    case 'load':
      const form = localStorage.getItem('contactForm');
      if (form) {
        return JSON.parse(form);
      }
      return state;
    default:
      return state;
  }
};

type ErrorReducerAction =
  | {
      type: 'update';
      payload: {
        name: keyof typeof initialFormError;
        value: string;
      };
    }
  | {
      type: 'reset';
    };

const errorReducer = (state: typeof initialFormError, action: ErrorReducerAction) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'reset':
      return initialFormError;
    default:
      return state;
  }
};

const postContact = async (params: z.infer<typeof formSchema>) => {
  return customFetch<PostContactResponse>('/api/contact', {
    body: JSON.stringify(params),
    method: 'POST',
  });
};

export const ContactForm = () => {
  const [phase, setPhase] = useState<'form' | 'success'>('form');
  const [form, dispatch] = useReducer(reducer, initialForm);
  const [formError, dispatchError] = useReducer(errorReducer, initialFormError);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = formSchema.safeParse(form);
    if (formData.success) {
      postContact(formData.data);
      setPhase('success');
      dispatch({ type: 'reset' });
      dispatchError({ type: 'reset' });
    } else {
      const error = formData.error.flatten();
      dispatchError({ payload: { name: 'name', value: (error.fieldErrors.name || []).join(', ') }, type: 'update' });
      dispatchError({ payload: { name: 'email', value: (error.fieldErrors.email || []).join(', ') }, type: 'update' });
      dispatchError({
        payload: { name: 'message', value: (error.fieldErrors.message || []).join(', ') },
        type: 'update',
      });
    }
  };

  useEffect(() => {
    dispatch({ type: 'load' });
  }, []);

  if (phase === 'success') {
    return (
      <div className={styles.success}>
        <p
          className={styles.successMessage}
          dangerouslySetInnerHTML={{
            __html: twemoji.parse('Thank you for your message 🚀', {
              className: 'twemoji',
              ext: '.svg',
              folder: 'svg',
            }),
          }}
        />
        <p className={styles.successMessage}>
          <Text value={'お問い合わせありがとうございます。'} normal />
          <Text value={'返信が遅れる場合がありますが、'} normal />
          <Text value={'しばらくお待ちください。'} normal />
        </p>
        <p className={styles.successMessage}>
          <Text value={'また、TwitterのDMもお待ちしております。'} />
          <a href="https://twitter.com/monica18_pr">@monica18_pr</a>
        </p>

        <button className={styles.backButton} onClick={() => setPhase('form')}>
          Back
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextInput
        label="Name"
        id="name"
        value={form.name}
        onChange={(value) => dispatch({ payload: { name: 'name', value }, type: 'change' })}
        placeholder="Taro Yamada"
        error={formError.name}
      />
      <TextInput
        label="Email"
        id="email"
        value={form.email}
        onChange={(value) => dispatch({ payload: { name: 'email', value }, type: 'change' })}
        placeholder="hoge@example.com"
        error={formError.email}
      />
      <Textarea
        label="Message"
        id="message"
        value={form.message}
        onChange={(value) => dispatch({ payload: { name: 'message', value }, type: 'change' })}
        placeholder="I would like to ask you about ... (EN) 〇〇の件でお伺いしたいです (JP)"
        style={{ resize: 'none' }}
        rows={5}
        error={formError.message}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
