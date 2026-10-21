"use client";
import { useId, useState } from "react";
import {
  ArrowDownToLine,
  QrCode,
  MousePointer2,
  Hand,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { analytics, type AnalyticsRange } from "@/lib/mock-data";
import { useLab } from "@/lib/lab-context";
import {
  PageHeader,
  SegmentedControl,
  Metric,
  ChartShell,
  EmptyState,
  ButtonLink,
  SectionHeader,
  Badge,
} from "./ui";
function ActivityChart({
  points,
  labels,
}: {
  points: number[];
  labels: string[];
}) {
  const w = 880,
    h = 190;
  const line = points
    .map(
      (p, i) => `${(i / (points.length - 1)) * w},${h - (p / 80) * (h - 15)}`,
    )
    .join(" ");
  return (
    <ChartShell
      label={`Page views over the selected period, from ${labels[0]} to ${labels.at(-1)}`}
    >
      <div className="chart-axis">
        <span>80</span>
        <span>60</span>
        <span>40</span>
        <span>20</span>
        <span>0</span>
      </div>
      <div className="chart-plot">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((v) => (
            <line
              key={v}
              x1="0"
              x2={w}
              y1={(v * h) / 4}
              y2={(v * h) / 4}
              stroke="var(--border-subtle)"
              strokeDasharray="3 5"
            />
          ))}
          <polygon
            points={`0,${h} ${line} ${w},${h}`}
            fill="var(--accent)"
            opacity=".045"
          />
          <polyline
            points={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.3"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div className="chart-x-labels">
          {labels.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}
export default function AnalyticsPage() {
  const { zero, setZero } = useLab();
  const [range, setRange] = useState<AnalyticsRange>("30 days");
  const data = analytics[range];
  return (
    <>
      <PageHeader
        title="Analytics"
        description="See how customers find their way to you."
        actions={
          <SegmentedControl
            options={["7 days", "30 days", "90 days"] as const}
            value={range}
            onChange={setRange}
            label="Analytics date range"
          />
        }
      />
      <section className="analytics-surface">
        {zero ? (
          <EmptyState
            title="No activity yet"
            description="Share your page or QR. Activity will appear here once people start using it."
            action={
              <ButtonLink href="/dashboard/share">
                Share your QR
                <ArrowUpRight size={15} />
              </ButtonLink>
            }
          />
        ) : (
          <>
            <div className="analytics-chart-header">
              <div>
                <span className="eyebrow">A view of your page</span>
                <div className="analytics-primary">
                  {data.views.toLocaleString("en-US")}
                </div>
                <div className="inline">
                  <strong>Page views</strong>
                  <span className="muted">Last {range}</span>
                </div>
              </div>
              <span className="date-label">
                <CalendarDays size={14} />
                {data.period}
              </span>
            </div>
            <ActivityChart points={data.points} labels={data.labels} />
            <div className="analytics-secondary">
              {[
                { value: data.qr, label: "QR opens", icon: QrCode },
                {
                  value: data.actions,
                  label: "Customer actions",
                  icon: MousePointer2,
                },
                {
                  value: data.interactions,
                  label: "Content interactions",
                  icon: Hand,
                },
              ].map(({ value, label, icon: Icon }) => (
                <div className="secondary-metric" key={label}>
                  <Icon size={17} />
                  <Metric value={value.toLocaleString("en-US")} label={label} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <div className="analytics-bottom">
        <section className="traffic-section">
          <SectionHeader title="Traffic source" meta="How they found you" />
          {zero ? (
            <p className="muted">Your traffic sources will appear here.</p>
          ) : (
            <>
              <div className="traffic-bar">
                <span />
                <span />
              </div>
              <div className="traffic-source">
                <span>
                  <i className="source-dot source-qr" />
                  QR
                </span>
                <strong>38%</strong>
              </div>
              <div className="traffic-source">
                <span>
                  <i className="source-dot source-direct" />
                  Direct
                </span>
                <strong>62%</strong>
              </div>
              <p className="meta muted traffic-note">
                Every route leads to the same welcome.
              </p>
            </>
          )}
        </section>
        <section className="top-content-section">
          <SectionHeader title="Top content" meta="Most explored" />
          {zero ? (
            <p className="muted">
              Popular items will appear as customers explore your page.
            </p>
          ) : (
            <div className="top-content-list">
              {[
                { name: "Cappuccino", count: 73, img: "coffee" },
                { name: "Breakfast Menu", count: 51, img: "toast" },
                { name: "Iced Latte", count: 43, img: "iced" },
              ].map((item, i) => (
                <div key={item.name}>
                  <span className="content-rank">{i + 1}</span>
                  <img src={`/images/${item.img}.jpg`} alt="" />
                  <strong>{item.name}</strong>
                  <span>
                    {Math.round(
                      item.count *
                        (range === "7 days"
                          ? 0.25
                          : range === "90 days"
                            ? 2.6
                            : 1),
                    )}
                    <small>interactions</small>
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <div className="analytics-footer">
        <span className="meta muted">
          A simple picture of your page’s activity.
        </span>
        <button className="lab-inline" onClick={() => setZero(!zero)}>
          UI Lab: {zero ? "show sample data" : "preview zero activity"}
        </button>
      </div>
    </>
  );
}
