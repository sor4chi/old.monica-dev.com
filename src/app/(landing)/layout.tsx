import '@/style/globals.css';
import { VanillaLayout } from '@/ui/app/layout/vanilla';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <VanillaLayout>{children}</VanillaLayout>;
}
