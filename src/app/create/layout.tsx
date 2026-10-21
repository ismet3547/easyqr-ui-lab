import { OnboardingShell } from "@/components/app-shell";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <OnboardingShell>{children}</OnboardingShell>;
}
