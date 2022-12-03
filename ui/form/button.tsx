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
        'main-gradient hover:main-gradient-hover active:main-gradient-active justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
        loading && 'opacity-50 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {loading ? '🚀 Loading...' : label}
    </button>
  );
};
