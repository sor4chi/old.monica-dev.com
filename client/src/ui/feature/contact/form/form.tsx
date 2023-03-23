import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTwitter } from 'react-icons/fa';
import twemoji from 'twemoji';
import { z } from 'zod';

import * as styles from './form.css';

import type { PostContactResponse } from '@/app/api/contact/route';
import { vars } from '@/style/theme.css';
import { Button } from '@/ui/foundation/button';
import { Text } from '@/ui/foundation/text';
import { TextInput } from '@/ui/foundation/textInput';
import { Textarea } from '@/ui/foundation/textarea';
import { customFetch } from '@/util/fetcher';

const scheme = z.object({
  email: z.string().email({ message: 'Please enter a valid email address, 正しいメールアドレスを入力してください' }),
  message: z.string().min(1, { message: 'Please enter a message, メッセージを入力してください' }),
  name: z.string().min(1, { message: 'Please enter your name, 名前を入力してください' }),
});

type Scheme = z.infer<typeof scheme>;

const postContact = async (params: Scheme) => {
  return customFetch<PostContactResponse>('/api/contact', {
    body: JSON.stringify(params),
    method: 'POST',
  });
};

export const ContactForm = () => {
  const [phase, setPhase] = useState<'form' | 'success'>('form');
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });
  const formData = watch();

  const onSubmit = (d: Scheme) => {
    postContact(d);
    setPhase('success');
    setValue('email', '');
    setValue('message', '');
    setValue('name', '');
    localStorage.removeItem('contactForm');
  };

  const handleChange = () => {
    localStorage.setItem('contactForm', JSON.stringify(formData));
  };

  useEffect(() => {
    const form = localStorage.getItem('contactForm');
    if (form) {
      const parsed = JSON.parse(form);
      setValue('email', parsed.email);
      setValue('message', parsed.message);
      setValue('name', parsed.name);
    }
  }, []);

  if (phase === 'success') {
    return (
      <div className={styles.success}>
        <p
          className={styles.successMessageEn}
          dangerouslySetInnerHTML={{
            __html: twemoji.parse('Thank you for your message 🚀', {
              className: 'twemoji',
              ext: '.svg',
              folder: 'svg',
            }),
          }}
        />
        <p className={styles.successMessageAnnotation}>
          <Text value={'返信が遅れる場合がありますが'} normal />
          <Text value={'しばらくお待ちください。'} normal />
          <br />
          <Text value={'またTwitterのDMもお待ちしております'} />
          <br />
          <a href="https://twitter.com/monica18_pr" target="_blank" rel="noreferrer" className={styles.twitterLink}>
            <FaTwitter color={vars.color.text.tertiary} />
            <span>@monica18_pr</span>
          </a>
        </p>

        <button className={styles.backButton} onClick={() => setPhase('form')}>
          Back
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <TextInput label="Name" id="name" placeholder="Taro Yamada" {...register('name')} error={errors.name?.message} />
      <TextInput
        label="Email"
        id="email"
        placeholder="taro.yamada@example.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <Textarea
        label="Message"
        id="message"
        placeholder="I would like to ask you about ... (EN) 〇〇の件でお伺いしたいです (JP)"
        style={{ resize: 'none' }}
        rows={5}
        {...register('message')}
        error={errors.message?.message}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
