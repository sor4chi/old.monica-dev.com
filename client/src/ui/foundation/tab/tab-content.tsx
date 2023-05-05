import * as styles from './tab-content.css';
import type { TabItem } from './types';

interface Props {
  tabs: (TabItem & { content: React.ReactNode })[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const TabContent = ({ activeTab, setActiveTab, tabs }: Props) => {
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const prevTab = tabs[activeTabIndex - 1] || tabs[tabs.length - 1];
  const nextTab = tabs[activeTabIndex + 1] || tabs[0];

  return (
    <div className={styles.tabContentWrapper}>
      <div className={styles.tabContent}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={styles.tabContentItem}
            style={{
              height: tab.id === activeTab ? 'auto' : 0,
              opacity: tab.id === activeTab ? 1 : 0,
              pointerEvents: tab.id === activeTab ? 'auto' : 'none',
            }}
            aria-hidden={tab.id !== activeTab}
            role="tabpanel"
            tabIndex={tab.id === activeTab ? 0 : undefined}
            data-tab-id={tab.id}
            id={`${tab.id}-panel`}
            aria-labelledby={`${tab.id}-tab`}
            onFocus={(e) => {
              // when focus move to next tab, set active tab to next tab
              if (e.currentTarget.dataset.tabId === nextTab.id) {
                setActiveTab(nextTab.id);
                return;
              }
              // when focus move to prev tab, set active tab to prev tab
              if (e.currentTarget.dataset.tabId === prevTab.id) {
                setActiveTab(prevTab.id);
                return;
              }
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
