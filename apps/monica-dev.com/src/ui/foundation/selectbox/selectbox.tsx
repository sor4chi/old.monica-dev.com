'use client';
import { clsx } from 'clsx';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { TextInput } from '../textInput';

import * as styles from './selectbox.css';

import { ChevronRight } from '@/ui/icons';

type Option = {
  label: string;
  value: string;
};

type Mode = 'input' | 'search';

interface Props {
  id: string;
  placeholder?: string;
  label: string;
  options: Option[];
  onChange?: (value: string) => void;
  mode?: Mode;
  error?: string;
  value?: string;
}

const _Selectbox = ({ error, id, label, mode = 'search', onChange, options, placeholder, value }: Props) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (mode === 'input') return options;
    const lowerCasedSearch = input.toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(lowerCasedSearch));
  }, [input, options, mode]);

  useEffect(() => {
    setInput(options.find((option) => option.value === value)?.label ?? '');
  }, [value, options]);

  const handleFocus = () => {
    setIsFocused(true);
    mode === 'search' && setInput('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (popupRef.current?.contains(e.relatedTarget as Node)) return;
    setIsFocused(false);
    mode === 'search' && setInput('');
  };

  const handleSelect = (option: Option) => {
    onChange?.(option.value);
    setInput(option.label);
    setIsFocused(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    mode === 'input' && onChange?.(e.target.value);
    setInput(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <TextInput
        id={id}
        label={label}
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleInput(e)}
        onFocus={() => handleFocus()}
        onBlur={(e) => handleBlur(e)}
        error={error}
        icon={<ChevronRight className={clsx(styles.openIcon, isFocused && styles.openIconActive)} />}
        autoComplete="off"
      />
      {isFocused && !!filteredOptions.length && (
        <div className={styles.options} ref={popupRef}>
          {filteredOptions.map((option) => (
            <button key={option.value} className={styles.option} onClick={() => handleSelect(option)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Selectbox = memo(_Selectbox);
