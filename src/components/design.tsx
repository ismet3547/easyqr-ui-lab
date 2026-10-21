"use client";
import { useState } from "react";
import {
  Check,
  ArrowRight,
  Monitor,
  Smartphone,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useLab } from "@/lib/lab-context";
import { designs } from "@/lib/mock-data";
import {
  PageHeader,
  Button,
  Badge,
  SegmentedControl,
  Dialog,
  Toggle,
  Select,
} from "./ui";
import { PreviewWorkspace, DesignThumbnail } from "./public-preview";
export function DesignBrowser({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (v: string) => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} title="Find your page’s look">
      <p className="muted design-browser-copy">
        Three considered designs. Every one is ready to make yours.
      </p>
      <div className="design-browser-grid">
        {designs.map((d) => (
          <button
            className="browse-design"
            key={d.name}
            onClick={() => {
              onSelect(d.name);
              onClose();
            }}
          >
            <DesignThumbnail design={d.name} />
            <strong>{d.name}</strong>
            <span>{d.description}</span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
export default function DesignPage() {
  const { savedDesign, setSavedDesign, notify, plan, live } = useLab();
  const [selected, setSelected] = useState(savedDesign);
  const [mode, setMode] = useState<"Mobile" | "Desktop">("Mobile");
  const [browse, setBrowse] = useState(false);
  const [studio, setStudio] = useState(false);
  const [accent, setAccent] = useState("Indigo");
  const [showAddress, setShowAddress] = useState(true);
  const dirty = selected !== savedDesign;
  return (
    <>
      <PageHeader
        title="Design"
        description="Your page. Your kind of welcome."
      />
      <div className="design-layout">
        <section className="design-controls">
          <div className="current-design">
            <div className="inline space-between">
              <span className="eyebrow">Current design</span>
              <Badge tone={live ? "success" : "neutral"}>
                <span className="status-dot" />
                {live ? "Live" : "Unpublished"}
              </Badge>
            </div>
            <div className="inline current-design-name">
              <PaletteSwatch />
              <div>
                <h2>{savedDesign}</h2>
                <span className="meta muted">Simple. Clear. Yours.</span>
              </div>
            </div>
          </div>
          <div className="design-options">
            <div className="section-header">
              <h2>A fresh perspective</h2>
              <span className="meta muted">Curated for you</span>
            </div>
            {["Clean", "Bold"].map((name) => (
              <button
                key={name}
                className={`design-choice ${selected === name ? "selected" : ""}`}
                onClick={() => setSelected(name)}
              >
                <div className="design-choice-thumb">
                  <DesignThumbnail design={name} />
                </div>
                <span className="design-choice-info">
                  <strong>{name}</strong>
                  <span>
                    {name === "Clean"
                      ? "Let the good stuff speak."
                      : "A little more presence."}
                  </span>
                  {name === "Clean" && (
                    <span className="recommend-label">Recommended</span>
                  )}
                </span>
                <span className="choice-radio">
                  {selected === name && <Check size={12} />}
                </span>
              </button>
            ))}
            <button className="browse-link" onClick={() => setBrowse(true)}>
              Browse all designs
              <ArrowRight size={15} />
            </button>
          </div>
          <button className="studio-entry" onClick={() => setStudio(true)}>
            <span className="studio-symbol">
              <Sparkles size={18} />
            </span>
            <div>
              <strong>Premium Studio</strong>
              <p>A few more ways to make it yours.</p>
            </div>
            <ArrowUpRight size={15} />
          </button>
          <p className="design-hint">
            Try a look before you commit.
            <br />
            Your live page stays as it is until you save.
          </p>
        </section>
        <section className="design-workspace">
          <header className="workspace-toolbar">
            <div className="inline">
              <span className="preview-label">Page preview</span>
              <Badge>{selected}</Badge>
            </div>
            <SegmentedControl
              options={["Mobile", "Desktop"] as const}
              value={mode}
              onChange={setMode}
              label="Preview viewport"
            />
          </header>
          <PreviewWorkspace design={selected} mode={mode} />
          <div className="workspace-caption">
            <span>Looking good on every screen.</span>
            <span>
              <Smartphone size={12} />
              <Monitor size={13} />
            </span>
          </div>
        </section>
      </div>
      {dirty && (
        <div className="dirty-bar" role="status">
          <div className="inline">
            <span className="unsaved-dot" />
            <span>
              You’re previewing <strong>{selected}</strong>
            </span>
          </div>
          <div className="inline">
            <Button
              variant="secondary"
              onClick={() => setSelected(savedDesign)}
            >
              Discard
            </Button>
            <Button
              onClick={() => {
                setSavedDesign(selected);
                notify("Design saved. Your page has a fresh look.");
              }}
            >
              Save design
            </Button>
          </div>
        </div>
      )}
      <DesignBrowser
        open={browse}
        onClose={() => setBrowse(false)}
        onSelect={setSelected}
      />
      <Dialog
        open={studio}
        onClose={() => setStudio(false)}
        title="Premium Studio"
        footer={
          <Button
            onClick={() => {
              setStudio(false);
              notify(
                plan === "Free"
                  ? "Premium Studio preview closed"
                  : "Studio preferences saved in this demo",
              );
            }}
          >
            Done
          </Button>
        }
      >
        <div className="studio-dialog">
          <Badge tone="accent">
            {plan === "Free" ? "Premium feature" : "Included in Pilot Premium"}
          </Badge>
          <h3>A little more you.</h3>
          <p className="muted">Explore the finishing touches for your page.</p>
          <Select
            label="Accent color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
          >
            <option>Indigo</option>
            <option>Forest</option>
            <option>Charcoal</option>
          </Select>
          <div className={`studio-sample studio-${accent.toLowerCase()}`}>
            Acme Coffee<span>Good coffee. Your style.</span>
          </div>
          <Toggle
            label="Show address"
            checked={showAddress}
            onChange={setShowAddress}
            description="Studio controls are a visual demo."
          />
        </div>
      </Dialog>
    </>
  );
}
function PaletteSwatch() {
  return (
    <span className="palette-swatch">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
