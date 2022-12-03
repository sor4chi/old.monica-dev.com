interface Props {
  htmlFor: string;
  label: string;
}

export const Label = ({ htmlFor, label }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
  );
};
