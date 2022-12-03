interface Props {
  errors?: string[];
}

export const Error = ({ errors }: Props) => {
  if (!errors) return null;
  if (errors.length === 0) return null;

  const errorText = errors.join('、');

  return (
    <div className="text-sm text-red-600 dark:text-red-400">{errorText}</div>
  );
};
