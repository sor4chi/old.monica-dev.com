import * as styles from './contact.css';

import { ContactForm } from '@/ui/feature/contact/form';

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
