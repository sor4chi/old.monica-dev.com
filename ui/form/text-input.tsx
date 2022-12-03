import clsx from 'clsx';

import { Error } from '#/ui/form/error';

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  errors?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  label,
  name,
  value,
  placeholder,
  errors,
  onChange,
}: Props) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
      <input
        id={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          'w-full p-2 focus:outline-none',
          'cursor-pointer focus:cursor-text focus:ring-1 focus:ring-orange-500 dark:focus:ring-orange-500',
          'common-card',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
        )}
      />
      <Error errors={errors} />
    </div>
  );
};
