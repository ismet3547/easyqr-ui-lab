"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  List,
  Palette,
  QrCode,
  Check,
  Coffee,
  ChartNoAxesCombined,
} from "lucide-react";
import { useLab } from "@/lib/lab-context";
import { business } from "@/lib/mock-data";
import { PublicPreview } from "./public-preview";
import {
  Badge,
  ButtonLink,
  PageHeader,
  SectionHeader,
  StatusBadge,
  Metric,
} from "./ui";
export default function Overview() {
  const { items, savedDesign, domain, live, zero, businessName } = useLab();
  return (
    <>
      <PageHeader
        title="Overview"
        description="A little overview. Everything in a good place."
      />
      <section className="overview-surface">
        <header className="business-heading">
          <div className="inline">
            <span className="business-avatar business-avatar-large">
              <Coffee size={23} />
            </span>
            <div>
              <h2>{businessName}</h2>
              <div className="business-meta">
                <StatusBadge live={live} />
                <span className="meta-dot">·</span>
                <span>{business.url}</span>
              </div>
            </div>
          </div>
          <ButtonLink href="/create/preview">
            Open page
            <ArrowUpRight size={15} />
          </ButtonLink>
        </header>
        <div className="overview-grid">
          <div className="overview-preview">
            <div className="preview-topline">
              <span className="label">Your page, at a glance</span>
              <span className="meta muted">
                Customer view
                <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="overview-preview-crop">
              <PublicPreview compact design={savedDesign} />
            </div>
            <div className="preview-caption">
              <span className="status-dot live-dot" />
              {live
                ? "Your page is live and ready to welcome customers."
                : "Your page is ready when you are."}
            </div>
          </div>
          <div className="page-summary">
            <div>
              <span className="eyebrow">Ready for the everyday</span>
              <h3>Your page is all set.</h3>
              <p>
                The essentials, in one place.
                <br />A great first impression, every time.
              </p>
            </div>
            <dl className="summary-list">
              <div>
                <dt>
                  <List size={16} />
                  Content
                </dt>
                <dd>{items.length} menu items</dd>
              </div>
              <div>
                <dt>
                  <Palette size={16} />
                  Design
                </dt>
                <dd>{savedDesign}</dd>
              </div>
              <div>
                <dt>
                  <QrCode size={16} />
                  QR
                </dt>
                <dd>
                  <span className="status-dot live-dot" />
                  Ready
                </dd>
              </div>
              <div>
                <dt>
                  <ArrowUpRight size={16} />
                  Domain
                </dt>
                <dd>
                  <Link href="/dashboard/domain">
                    {domain === "Connected" ? "Connected" : "Not connected"}
                    {domain !== "Connected" && <ArrowUpRight size={12} />}
                  </Link>
                </dd>
              </div>
            </dl>
            <div className="summary-tip">
              <span className="tip-icon">
                <QrCode size={18} />
              </span>
              <div>
                <strong>A small square. A warm welcome.</strong>
                <p>Your QR always leads to your latest page.</p>
                <Link href="/dashboard/share">
                  Get your QR
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="performance-section">
        <SectionHeader
          title="Performance"
          meta="Last 30 days"
          actions={
            <Link href="/dashboard/analytics" className="text-link">
              View analytics
              <ArrowUpRight size={14} />
            </Link>
          }
        />
        <div className="overview-metrics">
          <Metric value={zero ? "0" : "1,284"} label="Page views" />
          <Metric value={zero ? "0" : "492"} label="QR opens" />
          <Metric value={zero ? "0" : "137"} label="Customer actions" />
          <div className="performance-note">
            <ChartNoAxesCombined size={24} />
            <p>
              A clearer picture of how
              <br />
              customers find you.
            </p>
          </div>
        </div>
      </section>
      <section className="quick-actions">
        <SectionHeader title="Quick actions" />
        <div className="quick-action-grid">
          {[
            {
              href: "/dashboard/content",
              title: "Edit content",
              text: "Fresh additions, same familiar page.",
              icon: List,
            },
            {
              href: "/dashboard/design",
              title: "Change design",
              text: "Make it feel a little more like you.",
              icon: Palette,
            },
            {
              href: "/dashboard/share",
              title: "Share your QR",
              text: "Bring your page into the real world.",
              icon: QrCode,
            },
          ].map(({ href, title, text, icon: Icon }) => (
            <Link href={href} className="quick-action" key={href}>
              <span className="quick-action-icon">
                <Icon size={19} />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
