import type { Metadata } from 'next';

import * as styles from './contact.css';

import { ContactForm } from '@/ui/feature/contact/form';

export const metadata = {
  title: 'Contact',
} satisfies Metadata;

export default function Contact() {
  return (
    <>
      <h1 className={styles.title}>Contact</h1>
      <section className={styles.formContainer}>
        <ContactForm />
      </section>
    </>
  );
}
