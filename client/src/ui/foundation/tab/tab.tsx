import { memo, useEffect, useRef, useState } from 'react';

import { Divider } from '../divider';

import * as styles from './tab.css';
import type { TabItem } from './types';

interface Props {
  tabs: TabItem[];
  name: string;
  onChange: (id: string) => void;
}

const _Tab = ({ name, onChange, tabs }: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeMarkerRef = useRef<HTMLDivElement>(null);
  const [activeMarker, setActiveMarker] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const setActiveMarkerByEl = (el: HTMLElement, withAnimate: boolean) => {
    if (withAnimate) {
      activeMarkerRef.current?.classList.add(styles.activeMarkerAnimation);
    } else {
      activeMarkerRef.current?.classList.remove(styles.activeMarkerAnimation);
    }
    const { width } = el.getBoundingClientRect();
    const left = el.offsetLeft;
    setActiveMarker({
      left,
      width,
    });
    setTimeout(() => {
      activeMarkerRef.current?.classList.add(styles.activeMarkerAnimation);
    }, styles.ACTIVE_MARKER_ANIMATION_DELAY * 1000);
  };

  useEffect(() => {
    if (tabListRef.current) {
      setActiveMarkerByEl(tabListRef.current.children[0] as HTMLElement, false);
    }
  }, []);

  return (
    <div>
      <div className={styles.tabList} ref={tabListRef}>
        {tabs.map((tab) => (
          <label
            key={tab.id}
            className={styles.tabItem}
            onMouseEnter={(e) => {
              if (e.currentTarget) {
                setActiveMarkerByEl(e.currentTarget, activeMarker !== null);
              }
            }}
            onMouseLeave={() => {
              setActiveMarker(null);
            }}
          >
            <input
              type="radio"
              name={name}
              value={tab.id}
              checked={activeTab === tab.id}
              onChange={() => {
                setActiveTab(tab.id);
                onChange(tab.id);
              }}
              className={styles.tabInput}
            />
            <span className={styles.tabLabel}>{tab.label}</span>
          </label>
        ))}
        <div
          ref={activeMarkerRef}
          className={styles.activeMarker}
          style={{
            left: activeMarker?.left,
            width: activeMarker?.width,
          }}
        />
      </div>
      <Divider />
    </div>
  );
};

export const Tab = memo(_Tab);
