'use client';

import { clsx } from 'clsx';
import { memo, useCallback, useMemo, useState } from 'react';

import { Card } from '../card';
import { IconButton } from '../icon-button';

import * as styles from './calendar.css';

import { ChevronLeft, ChevronRight } from '@/ui/icons';

interface Props {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  label: string;
  error?: string;
}

type CalenderDate = {
  key: string;
  date: {
    label: string;
    isToday: boolean;
    value: Date;
  } | null;
};

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
};

const isToday = (date: Date) => {
  return isSameDate(new Date(), date);
};

const getCalendarDates = (date: Date): CalenderDate[] => {
  const targetYear = date.getUTCFullYear();
  const targetMonth = date.getUTCMonth();
  const firstDate = new Date(Date.UTC(targetYear, targetMonth, 1));
  const lastDate = new Date(Date.UTC(targetYear, targetMonth + 1, 0));
  const firstDay = firstDate.getUTCDay();
  const lastDay = lastDate.getUTCDay();
  const dates = [];
  for (let i = 0; i < firstDay; i++) {
    dates.push({ date: null, key: `${targetYear}-${targetMonth}_before_${i}` });
  }
  for (let i = 1; i <= lastDate.getUTCDate(); i++) {
    const date = new Date(Date.UTC(firstDate.getUTCFullYear(), firstDate.getUTCMonth(), i));
    dates.push({
      date: {
        isToday: isToday(date),
        label: i.toString(),
        value: date,
      },
      key: `${targetYear}-${targetMonth}_${i}`,
    });
  }
  for (let i = lastDay + 1; i < 7; i++) {
    dates.push({ date: null, key: `${targetYear}-${targetMonth}_after_${i}` });
  }
  return dates;
};

const _Calendar = ({ error, label, selectedDate, setSelectedDate }: Props) => {
  const [date, setDate] = useState(new Date());
  const dates = useMemo(() => getCalendarDates(date), [date]);
  const handlePrevMonth = useCallback(() => {
    setDate((prevDate) => new Date(Date.UTC(prevDate.getUTCFullYear(), prevDate.getUTCMonth() - 1, 1)));
  }, []);
  const handleNextMonth = useCallback(() => {
    setDate((prevDate) => new Date(Date.UTC(prevDate.getUTCFullYear(), prevDate.getUTCMonth() + 1, 1)));
  }, []);
  const handleDateClick = useCallback(
    (date: Date) => () => {
      setSelectedDate(date);
    },
    [setSelectedDate],
  );

  const weeklyDates = useMemo(() => {
    const tmp = [];
    for (let i = 0; i < dates.length; i += 7) {
      tmp.push(dates.slice(i, i + 7));
    }
    return tmp;
  }, [dates]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <Card fit>
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <IconButton onClick={handlePrevMonth} label="Previous month" type="button">
              <ChevronLeft className={styles.arrowIcon} />
            </IconButton>
            <div className={styles.calendarHeaderTitle}>
              {date.getUTCFullYear()} - {date.getUTCMonth() + 1}
            </div>
            <IconButton onClick={handleNextMonth} label="Next month" type="button">
              <ChevronRight className={styles.arrowIcon} />
            </IconButton>
          </div>
          <table className={styles.calendarBody}>
            <thead>
              <tr>
                {WEEKDAY_LABELS.map((label) => (
                  <th key={label} className={styles.calendarWeekday}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyDates.map((weeklyDate, i) => (
                <tr key={i}>
                  {weeklyDate.map(({ date, key }) => (
                    <td key={key}>
                      {date && (
                        <button
                          className={clsx(
                            styles.calendarDate,
                            date.isToday && styles.calendarDateToday,
                            selectedDate && isSameDate(date.value, selectedDate) && styles.calendarDateSelected,
                          )}
                          onClick={handleDateClick(date.value)}
                          type="button"
                        >
                          {date.label}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export const Calendar = memo(_Calendar);
