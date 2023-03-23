import { FullLayout } from '@/ui/app/layout/full';
import '@/style/globals.css';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <FullLayout>{children}</FullLayout>;
}
