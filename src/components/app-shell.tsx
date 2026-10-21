"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useId } from "react";
import {
  LayoutDashboard,
  List,
  Palette,
  QrCode,
  ChartNoAxesCombined,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronsUpDown,
  Plus,
  Check,
  Coffee,
  MoreHorizontal,
  Home,
  SlidersHorizontal,
  ArrowRight,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useLab } from "@/lib/lab-context";
import type { DomainState } from "@/lib/mock-data";
import { Badge, ButtonLink, Dialog, Select, Toast } from "./ui";
const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/content", label: "Content", icon: List },
  { href: "/dashboard/design", label: "Design", icon: Palette },
  { href: "/dashboard/share", label: "QR & Share", icon: QrCode },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
  },
  { href: "/dashboard/domain", label: "Domain", icon: Globe },
];
export function Logo() {
  return (
    <Link href="/dashboard" className="brand" aria-label="EasyQR home">
      <span className="brand-mark">
        <QrCode size={20} strokeWidth={2.25} />
      </span>
      <span>
        EasyQR<span className="brand-period">.</span>
      </span>
    </Link>
  );
}
export function BusinessSwitcher({ compact = false }: { compact?: boolean }) {
  const { businessName } = useLab();
  const id = useId();
  return (
    <div className={`business-switcher ${compact ? "compact-switcher" : ""}`}>
      <button
        className="switcher-button"
        aria-label={`Switch business: ${businessName}`}
        popoverTarget={id}
      >
        <span className="business-avatar">
          <Coffee size={18} />
        </span>
        <span className="switcher-text">
          <strong>{businessName}</strong>
          <small>Menu · Cafe</small>
        </span>
        <ChevronsUpDown size={14} />
      </button>
      <div id={id} popover="auto" className="switcher-menu">
        <p className="eyebrow">Your workspace</p>
        <button
          onClick={(e) =>
            e.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover()
          }
        >
          <span className="business-avatar">
            <Coffee size={17} />
          </span>
          <span>
            {businessName}
            <small>Menu · Cafe</small>
          </span>
          <Check size={16} />
        </button>
        <Link
          href="/create"
          onClick={(e) =>
            e.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover()
          }
        >
          <Plus size={17} />
          Create another page
        </Link>
      </div>
    </div>
  );
}
export function Sidebar() {
  const path = usePathname();
  const { plan } = useLab();
  const [account, setAccount] = useState(false);
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Logo />
        <BusinessSwitcher />
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={path === href ? "page" : undefined}
            className={path === href ? "active" : ""}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="plan-note">
          <span className="tiny-star">✧</span>
          <span>{plan}</span>
          <Badge tone="accent">{plan === "Free" ? "Plan" : "Active"}</Badge>
        </div>
        <Link
          href="/create/preview"
          aria-label="Open page"
          className="open-page-link"
        >
          <ArrowUpRight size={17} />
          <span>Open page</span>
          <ArrowUpRight size={14} />
        </Link>
        <button
          className="account-button"
          aria-label="Your account"
          onClick={() => setAccount(true)}
        >
          <span className="avatar">AE</span>
          <span>
            <strong>Acme workspace</strong>
            <small>Personal account</small>
          </span>
          <ChevronDown size={14} />
        </button>
      </div>
      <Dialog
        open={account}
        onClose={() => setAccount(false)}
        title="Your account"
      >
        <div className="account-dialog">
          <span className="avatar large">AE</span>
          <h3>Acme workspace</h3>
          <p className="muted">You’re exploring the EasyQR visual lab.</p>
          <ButtonLink href="/login">
            <LogOut size={16} />
            Back to sign in
          </ButtonLink>
        </div>
      </Dialog>
    </aside>
  );
}
export function MobileNavigation() {
  const path = usePathname();
  const [more, setMore] = useState(false);
  const links = [
    { href: "/dashboard", label: "Home", icon: Home },
    ...navigation.slice(1, 4).map((n) => ({
      ...n,
      label: n.label === "QR & Share" ? "Share" : n.label,
    })),
  ];
  return (
    <>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            href={href}
            key={href}
            aria-current={path === href ? "page" : undefined}
            className={path === href ? "active" : ""}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
        <button
          className={
            path.endsWith("analytics") || path.endsWith("domain")
              ? "active"
              : ""
          }
          onClick={() => setMore(true)}
          aria-expanded={more}
        >
          <MoreHorizontal size={21} />
          <span>More</span>
        </button>
      </nav>
      <Dialog open={more} onClose={() => setMore(false)} title="More" drawer>
        <nav className="more-links" aria-label="More navigation">
          {navigation.slice(4).map(({ href, label, icon: Icon }) => (
            <Link href={href} key={href} onClick={() => setMore(false)}>
              <Icon size={20} />
              {label}
              <ChevronRight size={17} />
            </Link>
          ))}
          <Link href="/create/preview" onClick={() => setMore(false)}>
            <ArrowUpRight size={20} />
            Open page
            <ChevronRight size={17} />
          </Link>
          <Link href="/login" onClick={() => setMore(false)}>
            <LogOut size={20} />
            Account
            <ChevronRight size={17} />
          </Link>
        </nav>
      </Dialog>
    </>
  );
}
export function LabControls() {
  const { plan, setPlan, live, setLive, zero, setZero, domain, setDomain } =
    useLab();
  return (
    <details className="lab-controls">
      <summary>
        <SlidersHorizontal size={13} />
        <span>UI Lab controls</span>
      </summary>
      <div className="lab-panel">
        <div className="inline space-between">
          <strong>Visual states</strong>
          <Badge>Lab only</Badge>
        </div>
        <Select
          label="Business plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option>Free</option>
          <option>Pilot Premium</option>
        </Select>
        <Select
          label="Page status"
          value={live ? "Live" : "Unpublished"}
          onChange={(e) => setLive(e.target.value === "Live")}
        >
          <option>Live</option>
          <option>Unpublished</option>
        </Select>
        <Select
          label="Analytics"
          value={zero ? "Zero" : "Data"}
          onChange={(e) => setZero(e.target.value === "Zero")}
        >
          <option>Data</option>
          <option>Zero</option>
        </Select>
        <Select
          label="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value as DomainState)}
        >
          {["Empty", "Waiting", "Securing", "Connected"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <Link href="/review" className="text-link">
          Responsive review
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </details>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const title = navigation.find((n) => n.href === path)?.label || "Overview";
  const { businessName, live } = useLab();
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Sidebar />
      <div className="app-main">
        <div className="topbar">
          <div className="breadcrumbs">
            <span>{businessName}</span>
            <span className="breadcrumb-slash">/</span>
            <span>{title}</span>
          </div>
          <span className="topbar-status">
            <span className={`status-dot ${live ? "live-dot" : ""}`} />
            {live ? "All changes saved" : "Unpublished page"}
          </span>
          <div className="mobile-brand">
            <Logo />
          </div>
          <div className="mobile-switcher">
            <BusinessSwitcher compact />
          </div>
        </div>
        <main id="main" className="main-content">
          {children}
          <footer className="workspace-footer">
            <span>Made for your everyday.</span>
            <span>EasyQR</span>
          </footer>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
const steps = [
  ["Business", "/create"],
  ["Content", "/create/content"],
  ["Setup", "/create/setup"],
  ["Design", "/create/design"],
  ["Preview", "/create/preview"],
];
export function OnboardingShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const current = steps.findIndex(([, href]) => href === path);
  return (
    <div className="onboarding-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="onboarding-top">
        <Logo />
        <Link href="/dashboard" className="text-link">
          Back to workspace
          <ArrowUpRight size={14} />
        </Link>
      </header>
      <nav className="onboarding-progress" aria-label="Page creation progress">
        {steps.map(([label, href], i) => (
          <div
            key={label}
            className={`onboarding-step ${i === current ? "current" : ""} ${i < current ? "complete" : ""}`}
          >
            <Link href={href} aria-current={i === current ? "step" : undefined}>
              <span className="step-number">
                {i < current ? <Check size={12} /> : i + 1}
              </span>
              <span className="step-label">{label}</span>
            </Link>
            {i < steps.length - 1 && <span className="step-line" />}
          </div>
        ))}
      </nav>
      <main id="main" className="onboarding-content">
        {children}
      </main>
      <footer className="onboarding-footer">
        <span>A small page. A big welcome.</span>
        <span>EasyQR</span>
      </footer>
    </div>
  );
}
export function GlobalUI() {
  return (
    <>
      <LabControls />
      <Toast />
    </>
  );
}
