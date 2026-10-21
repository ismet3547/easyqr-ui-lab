"use client";
import { useState } from "react";
import {
  Copy,
  ArrowUpRight,
  Download,
  Sparkles,
  ArrowRight,
  ScanLine,
  Check,
  Coffee,
  Palette,
  Frame,
  ImagePlus,
} from "lucide-react";
import { business } from "@/lib/mock-data";
import { useLab } from "@/lib/lab-context";
import {
  PageHeader,
  Button,
  ButtonLink,
  Badge,
  SegmentedControl,
  Dialog,
  Select,
  Checkbox,
} from "./ui";
export default function SharePage() {
  const { notify, plan } = useLab();
  const [size, setSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [customize, setCustomize] = useState(false);
  const [color, setColor] = useState("Charcoal");
  const [frame, setFrame] = useState("None");
  const [logo, setLogo] = useState(false);
  const download = () => {
    const image = new Image();
    image.onload = () => {
      const dimension = { Small: 512, Medium: 1024, Large: 2048 }[size];
      const canvas = document.createElement("canvas");
      canvas.width = dimension;
      canvas.height = dimension;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, dimension, dimension);
      const link = document.createElement("a");
      link.download = `acme-coffee-qr-${dimension}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      notify(`${dimension}px QR downloaded`);
    };
    image.src = "/images/acme-qr.png";
  };
  return (
    <>
      <PageHeader
        title="QR & Share"
        description="One little square. So many ways to be found."
      />
      <div className="share-layout">
        <section className="qr-hero">
          <div className="qr-heading">
            <span className="eyebrow">Always the right destination</span>
            <h2>Your permanent QR</h2>
            <p>Print it once. Keep your page fresh.</p>
          </div>
          <div className="qr-art">
            <div className="scan-corner corner-tl" />
            <div className="scan-corner corner-tr" />
            <div className="scan-corner corner-bl" />
            <div className="scan-corner corner-br" />
            <img
              src="/images/acme-qr.png"
              alt="QR code for Acme Coffee’s EasyQR page"
            />
          </div>
          <div className="qr-link">
            <span>{business.url}</span>
            <div className="inline">
              <Button
                variant="ghost"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `https://${business.url}`,
                    );
                    notify("Page link copied");
                  } catch {
                    notify("Copy is unavailable in this browser");
                  }
                }}
              >
                <Copy size={14} />
                Copy
              </Button>
              <ButtonLink href="/create/preview" variant="ghost">
                Open
                <ArrowUpRight size={14} />
              </ButtonLink>
            </div>
          </div>
          <div className="qr-download">
            <label>Download size</label>
            <SegmentedControl
              options={["Small", "Medium", "Large"] as const}
              value={size}
              onChange={setSize}
              label="QR download size"
            />
            <Button onClick={download}>
              <Download size={16} />
              Download PNG
            </Button>
            <span className="meta muted">
              {
                {
                  Small: "512 × 512",
                  Medium: "1,024 × 1,024",
                  Large: "2,048 × 2,048",
                }[size]
              }{" "}
              px · Ready to print
            </span>
          </div>
          <div className="qr-reassurance">
            <Check size={14} />
            Your QR stays the same when your content changes.
          </div>
        </section>
        <div className="share-aside">
          <section className="qr-use">
            <span className="mini-icon">
              <ScanLine size={20} />
            </span>
            <h2>A place for every scan.</h2>
            <p>Put your QR where your customers already are.</p>
            <div className="qr-print-example">
              <div className="qr-table-card">
                <Coffee size={20} />
                <span>
                  Something good
                  <br />
                  is on the menu.
                </span>
                <img src="/images/acme-qr.png" alt="" />
                <small>SCAN. SIP. STAY A WHILE.</small>
                <i>Acme Coffee</i>
              </div>
              <div className="table-card-caption">
                YOUR NEXT COFFEE BREAK ↗
              </div>
            </div>
            <h3>Use your QR</h3>
            <p className="use-copy">
              On tables, menus, signs or social profiles. A simple way to turn a
              moment into a visit.
            </p>
            <div className="use-tags">
              <span>Table cards</span>
              <span>Window signs</span>
              <span>Social profiles</span>
            </div>
          </section>
          <button
            className="qr-custom-entry"
            onClick={() => setCustomize(true)}
          >
            <span className="studio-symbol">
              <Sparkles size={18} />
            </span>
            <div>
              <div className="inline">
                <strong>Customize your QR</strong>
                <Badge tone="accent">Premium</Badge>
              </div>
              <p>Your logo, colors and a finishing touch.</p>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <Dialog
        open={customize}
        onClose={() => setCustomize(false)}
        title="Customize your QR"
        footer={
          <Button
            onClick={() => {
              setCustomize(false);
              notify("QR customization preview closed");
            }}
          >
            Done
          </Button>
        }
      >
        <div className="qr-custom-dialog">
          <Badge tone="accent">
            {plan === "Free"
              ? "Available with Premium"
              : "Included in Pilot Premium"}
          </Badge>
          <p className="muted">Give every scan a little personality.</p>
          <div
            className={`custom-qr-preview qr-color-${color.toLowerCase()} ${frame !== "None" ? "qr-framed" : ""}`}
          >
            <img
              src="/images/acme-qr.png"
              alt="QR customization visual preview"
            />
            {logo && (
              <span className="qr-logo">
                <Coffee size={20} />
              </span>
            )}
            {frame === "Scan me" && <span>SCAN ME</span>}
          </div>
          <Select
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option>Charcoal</option>
            <option>Indigo</option>
            <option>Forest</option>
          </Select>
          <Select
            label="Frame"
            value={frame}
            onChange={(e) => setFrame(e.target.value)}
          >
            <option>None</option>
            <option>Simple border</option>
            <option>Scan me</option>
          </Select>
          <Checkbox
            label="Preview with Acme Coffee logo"
            checked={logo}
            onChange={(e) => setLogo(e.target.checked)}
          />
          <p className="meta muted">
            Visual preview only. Downloads use the original permanent QR.
          </p>
        </div>
      </Dialog>
    </>
  );
}
