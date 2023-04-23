import * as styles from './tab-content.css';
import type { TabItem } from './types';

interface Props {
  tabs: (TabItem & { content: React.ReactNode })[];
  activeTab: string;
}

export const TabContent = ({ activeTab, tabs }: Props) => {
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className={styles.tabContentWrapper}>
      <div
        className={styles.tabContent}
        style={{
          transform: `translateX(calc(-1 * (100% / ${tabs.length} * ${activeTabIndex} + ${styles.TAB_CONTENT_GAP} / ${tabs.length} * ${activeTabIndex})))`,
          width: `calc(${tabs.length * 100}% + ${styles.TAB_CONTENT_GAP} * ${tabs.length - 1})`,
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={styles.tabContentItem}
            style={{
              opacity: tab.id === activeTab ? 1 : 0,
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
