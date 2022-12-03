import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z
    .string()
    .email('メールアドレスの形式が正しくありません')
    .min(1, 'メールアドレスは必須です'),
  message: z.string().min(1, 'メッセージは必須です'),
});

type Contact = z.infer<typeof schema>;

type ContactError = { [K in keyof Contact]?: string[] };

export function useContact() {
  const [contact, setContact] = useState<Contact>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactError>({});

  const validate = () => {
    const result = schema.safeParse(contact);
    if (result.success) {
      setErrors({});
      return true;
    }
    setErrors(result.error.formErrors.fieldErrors);
    return false;
  };

  const update = (field: keyof Contact) => (value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  return {
    contact,
    errors,
    validate,
    update,
  };
}
