import clsx from 'clsx';

import { Error } from '#/ui/form/error';
import { Label } from '#/ui/form/label';

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  rows: number;
  errors?: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  label,
  name,
  value,
  placeholder,
  rows,
  errors,
  onChange,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} label={label} />
      <textarea
        id={name}
        value={value}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        onChange={onChange}
        rows={rows}
        className={clsx(
          'w-full p-2 text-neutral-700 focus:outline-none dark:text-neutral-300',
          'cursor-pointer focus:cursor-text focus:ring-1 focus:ring-orange-500 dark:focus:ring-orange-500',
          'common-card',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
        )}
      />
      <Error errors={errors} />
    </div>
  );
};
