"use client";
import { useEffect, useState } from "react";
// Lab-only responsive review fixture. Each iframe has a real CSS viewport.
export default function Review() {
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(1000);
  const [route, setRoute] = useState("/dashboard");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const w = Number(p.get("width") || 1440);
    const h = Number(p.get("height") || 1000);
    const r = p.get("route") || "/dashboard";
    setWidth([320, 390, 768, 1100, 1440].includes(w) ? w : 1440);
    setHeight(Math.min(1800, Math.max(600, h)));
    setRoute(
      r.startsWith("/dashboard") || r.startsWith("/create") || r === "/login"
        ? r
        : "/dashboard",
    );
    setReady(true);
  }, []);
  return (
    <div className="review-page" style={{ width }}>
      {ready && (
        <iframe
          title={`EasyQR review — ${width}px`}
          src={route}
          width={width}
          height={height}
        />
      )}
      <div className="review-toolbar">
        <span>UI Lab · Responsive review</span>
        <label>
          Viewport{" "}
          <select
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          >
            {[320, 390, 768, 1100, 1440].map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </label>
        <label>
          Screen{" "}
          <select value={route} onChange={(e) => setRoute(e.target.value)}>
            {[
              "/dashboard",
              "/dashboard/content",
              "/dashboard/design",
              "/dashboard/share",
              "/dashboard/analytics",
              "/dashboard/domain",
              "/create",
              "/create/content",
              "/create/setup",
              "/create/design",
              "/create/preview",
              "/login",
            ].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
