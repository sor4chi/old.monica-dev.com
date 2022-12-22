import clsx from 'clsx';

interface Props {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({ label, onClick, loading, disabled }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        'main-gradient hover:main-gradient-hover active:main-gradient-active justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm',
        loading && 'cursor-not-allowed opacity-50',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      {loading ? '🚀 Loading...' : label}
    </button>
  );
};
