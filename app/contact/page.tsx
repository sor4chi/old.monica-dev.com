'use client';

import { useState } from 'react';

import { useContact } from '#/app/contact/use-contact';
import { postContact } from '#/pages/api/contact';
import { Button } from '#/ui/form/button';
import { TextArea } from '#/ui/form/text-area';
import { TextInput } from '#/ui/form/text-input';

export default function Page() {
  const { contact, errors, validate, update } = useContact();
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus('sending');
    try {
      await postContact(contact);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="m-auto max-w-3xl space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-700 dark:text-neutral-200">
        Contact
      </h1>
      <p className="text-gray-500 dark:text-neutral-400">
        都合上返事をお返しできるまでに時間がかかる場合があります。あらかじめご了承ください。
      </p>

      <div className="space-y-6">
        <TextInput
          label="Name"
          name="name"
          value={contact.name}
          placeholder="Your name"
          errors={errors.name}
          onChange={(e) => update('name')(e.target.value)}
        />
        <TextInput
          label="Email"
          name="email"
          value={contact.email}
          placeholder="Your email"
          errors={errors.email}
          onChange={(e) => update('email')(e.target.value)}
        />
        <TextArea
          label="Message"
          name="message"
          value={contact.message}
          placeholder="Your message"
          rows={5}
          errors={errors.message}
          onChange={(e) => update('message')(e.target.value)}
        />
        <div className="text-center">
          <Button
            label={status === 'sending' ? 'Sending...' : 'Send'}
            loading={status === 'sending'}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
