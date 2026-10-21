"use client";
import { MapPin, Clock3, Coffee, ArrowUpRight, Leaf } from "lucide-react";
import { useLab } from "@/lib/lab-context";
import { formatMoney } from "@/lib/mock-data";
import { useState } from "react";
export function PublicPreview({
  design = "Clean",
  compact = false,
  desktop = false,
  interactive = true,
}: {
  design?: string;
  compact?: boolean;
  desktop?: boolean;
  interactive?: boolean;
}) {
  const { items, businessName, businessAddress } = useLab();
  const [category, setCategory] = useState("Our favorites");
  const visible = items.filter((i) => i.visible);
  const selected =
    category === "Our favorites"
      ? visible.slice(0, 3)
      : visible.filter((i) => i.category === category).slice(0, 5);
  return (
    <div
      className={`public-preview preview-${design.toLowerCase()} ${compact ? "compact-preview" : ""} ${desktop ? "desktop-preview" : ""}`}
    >
      <div className="cafe-cover">
        <img
          src="/images/interior.jpg"
          alt="Sunlit café with greenery and warm wooden tables"
        />
        <div className="cover-shade" />
        <span className="cafe-cover-label">
          <span />
          Your neighborhood, one cup at a time.
        </span>
        <span className="cafe-cover-mark">
          ac<span>me</span>
        </span>
      </div>
      <div className="cafe-intro">
        <div className="cafe-wordmark">
          <Coffee size={23} />
        </div>
        <div className="cafe-name-line">
          <h2>{businessName}</h2>
          <span className="cafe-open">
            <span />
            Open today
          </span>
        </div>
        <p>Good coffee. Slow mornings. A place to stay a while.</p>
        <div className="cafe-details">
          {businessAddress && (
            <span>
              <MapPin size={12} />
              {businessAddress}
            </span>
          )}
          <span>
            <Clock3 size={12} />
            7:30 am – 6:00 pm
          </span>
        </div>
      </div>
      <div className="cafe-menu">
        <div
          className="cafe-tabs"
          role={interactive ? "group" : undefined}
          aria-label={interactive ? "Menu categories" : undefined}
        >
          {["Our favorites", "Coffee", "Freshly baked"].map((c) => (
            <button
              type="button"
              key={c}
              tabIndex={interactive ? 0 : -1}
              onClick={() => interactive && setCategory(c)}
              className={category === c ? "active" : ""}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="cafe-section">
          <h3>{category}</h3>
          <span>Made with a little extra care.</span>
        </div>
        <div className="cafe-items">
          {selected.map((item) => (
            <div className="cafe-item" key={item.id}>
              <div>
                <h4>
                  {item.name}
                  {!item.available && (
                    <span className="cafe-sold">Sold out</span>
                  )}
                </h4>
                <p>{item.description}</p>
                <strong>{formatMoney(item.price)}</strong>
              </div>
              {item.image && <img src={item.image} alt={item.name} />}
            </div>
          ))}
        </div>
        <div className="cafe-footnote">
          <Leaf size={12} />
          <span>Oat milk? Always. Just ask.</span>
        </div>
      </div>
      <div className="cafe-footer">
        <span>Made with EasyQR</span>
        <ArrowUpRight size={11} />
      </div>
    </div>
  );
}
export function PreviewWorkspace({
  design = "Clean",
  mode = "Mobile",
  className = "",
}: {
  design?: string;
  mode?: string;
  className?: string;
}) {
  return (
    <div
      className={`preview-workspace ${mode === "Desktop" ? "wide-preview" : ""} ${className}`}
    >
      <div className="preview-viewport">
        <div className="viewport-toolbar">
          <span className="viewport-dot" />
          <span>easyqrservice.com/acme-coffee</span>
          <span className="viewport-lock">↗</span>
        </div>
        <PublicPreview design={design} desktop={mode === "Desktop"} />
      </div>
    </div>
  );
}
export function DesignThumbnail({ design }: { design: string }) {
  return (
    <div
      className={`design-thumbnail thumbnail-${design.toLowerCase()}`}
      aria-label={`${design} menu design preview`}
    >
      <div className="thumbnail-cover">
        <span>acme.</span>
      </div>
      <div className="thumbnail-body">
        <strong>Acme Coffee</strong>
        <span>A good day starts here.</span>
        <div className="thumbnail-tabs">
          <i />
          <i />
          <i />
        </div>
        <div className="thumbnail-row">
          <div>
            <b>Cappuccino</b>
            <span>Espresso, steamed milk</span>
            <i>$4.50</i>
          </div>
          <img src="/images/coffee.jpg" alt="" />
        </div>
        <div className="thumbnail-row">
          <div>
            <b>Butter Croissant</b>
            <span>Freshly baked every day</span>
            <i>$3.20</i>
          </div>
          <img src="/images/croissant.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
