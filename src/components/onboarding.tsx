"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UtensilsCrossed,
  Scissors,
  ShoppingBag,
  BriefcaseBusiness,
  Check,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Coffee,
  MapPin,
  Clock3,
  Globe,
  CheckCheck,
} from "lucide-react";
import { useLab } from "@/lib/lab-context";
import { designs } from "@/lib/mock-data";
import {
  Button,
  ButtonLink,
  Input,
  Textarea,
  Select,
  PageHeader,
  Badge,
  SegmentedControl,
  Dialog,
  InlineNotice,
} from "./ui";
import {
  PublicPreview,
  PreviewWorkspace,
  DesignThumbnail,
} from "./public-preview";
import { DesignBrowser } from "./design";
export function CreateBusiness() {
  const { pageType, setPageType } = useLab();
  return (
    <div className="create-business">
      <div className="onboarding-intro">
        <span className="eyebrow">A good place to begin</span>
        <h1>
          What kind of page
          <br className="desktop-break" /> are you creating?
        </h1>
        <p>Choose the closest match. You can edit everything later.</p>
      </div>
      <div className="business-type-grid">
        {[
          {
            name: "Menu",
            description: "Restaurants, cafés, bakeries",
            icon: UtensilsCrossed,
            note: "Good things, on the menu.",
          },
          {
            name: "Services",
            description: "Barbers, salons, local services",
            icon: Scissors,
            note: "Make your expertise easy to find.",
          },
          {
            name: "Products",
            description: "Simple product catalog",
            icon: ShoppingBag,
            note: "Give every detail its place.",
          },
          {
            name: "Portfolio",
            description: "Work, packages and pricing",
            icon: BriefcaseBusiness,
            note: "A home for your best work.",
          },
        ].map(({ name, description, icon: Icon, note }) => (
          <button
            key={name}
            className={`business-type ${pageType === name ? "selected" : ""}`}
            onClick={() => setPageType(name)}
            aria-pressed={pageType === name}
          >
            <div className="inline space-between">
              <span className="business-type-icon">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <span className="choice-radio">
                {pageType === name && <Check size={12} />}
              </span>
            </div>
            <h2>{name}</h2>
            <p>{description}</p>
            <span className="type-note">{note}</span>
          </button>
        ))}
      </div>
      <div className="onboarding-action-row">
        <span className="meta muted">Your page starts with you.</span>
        <ButtonLink href="/create/content" variant="primary">
          Continue
          <ArrowRight size={15} />
        </ButtonLink>
      </div>
      <p className="existing-account">
        Already have a page?{" "}
        <Link href="/login">
          Sign in
          <ArrowUpRight size={12} />
        </Link>
      </p>
    </div>
  );
}
export function CreateContent() {
  const { items, setItems, notify } = useLab();
  const router = useRouter();
  const [name, setName] = useState(items[0]?.name || "Cappuccino");
  const [description, setDescription] = useState(
    items[0]?.description || "Espresso with silky steamed milk",
  );
  const [price, setPrice] = useState(items[0]?.price || 4.5);
  const [category, setCategory] = useState("Breakfast");
  return (
    <>
      <div className="onboarding-page-heading">
        <span className="eyebrow">Start with a favorite</span>
        <h1>Put something good on the menu.</h1>
        <p>
          One item is all it takes to get started. Add the rest whenever you’re
          ready.
        </p>
      </div>
      <div className="onboarding-editor-layout">
        <form
          className="first-content-form"
          onSubmit={(e) => {
            e.preventDefault();
            setItems((prev) => [
              {
                ...prev[0],
                id: prev[0]?.id || "first-item",
                name,
                description,
                price,
                category,
                visible: true,
                available: true,
              },
              ...prev.slice(1),
            ]);
            notify("Your first menu item is ready");
            router.push("/create/setup");
          }}
        >
          <div className="inline space-between">
            <h2>Your first menu item</h2>
            <Badge>Menu</Badge>
          </div>
          <Input
            label="Item name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            label="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="field-pair">
            <Input
              label="Price ($)"
              type="number"
              min="0"
              max="99999"
              step=".01"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Breakfast</option>
              <option>Coffee</option>
              <option>Iced drinks</option>
              <option>Freshly baked</option>
            </Select>
          </div>
          <div className="first-content-photo">
            <img src="/images/coffee.jpg" alt="A cup of cappuccino" />
            <div>
              <strong>A little preview of something good.</strong>
              <p>
                This sample photo is here to help you get a feel for your page.
              </p>
            </div>
          </div>
          <div className="onboarding-form-footer">
            <ButtonLink href="/create" variant="ghost">
              <ArrowLeft size={15} />
              Back
            </ButtonLink>
            <Button type="submit">
              Continue
              <ArrowRight size={15} />
            </Button>
          </div>
        </form>
        <aside className="first-item-preview">
          <div className="eyebrow">A first look</div>
          <div className="first-item-preview-card">
            <Coffee size={25} />
            <h2>
              Good mornings
              <br />
              start here.
            </h2>
            <span>ACME COFFEE</span>
            <img src="/images/coffee.jpg" alt="Cappuccino sample" />
            <div>
              <h3>{name || "Your first item"}</h3>
              <p>{description || "A little something to look forward to."}</p>
              <strong>${price.toFixed(2)}</strong>
            </div>
            <div className="inline meta muted">
              <Check size={13} />
              Made for a warm welcome.
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
export function CreateSetup() {
  const {
    businessName,
    setBusinessName,
    businessAddress,
    setBusinessAddress,
    notify,
  } = useLab();
  const router = useRouter();
  const [name, setName] = useState(businessName);
  const [address, setAddress] = useState(businessAddress);
  return (
    <div className="setup-page">
      <span className="eyebrow">Make yourself at home</span>
      <h1>A few familiar details.</h1>
      <p>Let customers know who’s behind the good coffee.</p>
      <form
        className="setup-form"
        onSubmit={(e) => {
          e.preventDefault();
          setBusinessName(name.trim());
          setBusinessAddress(address.trim());
          notify("Page details saved in this preview");
          router.push("/create/design");
        }}
      >
        <Input
          label="Business name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
        />
        <Input
          label="Address (optional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="setup-link-preview">
          <Globe size={18} />
          <div>
            <strong>Your EasyQRService address</strong>
            <p>
              easyqrservice.com/
              {name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "") || "your-business"}
            </p>
          </div>
        </div>
        <p className="meta muted">
          The address above is a preview. No page is created yet.
        </p>
        <div className="onboarding-form-footer">
          <ButtonLink href="/create/content" variant="ghost">
            <ArrowLeft size={15} />
            Back
          </ButtonLink>
          <Button type="submit">
            Choose a design
            <ArrowRight size={15} />
          </Button>
        </div>
      </form>
    </div>
  );
}
export function CreateDesign() {
  const { savedDesign, setSavedDesign } = useLab();
  const [selected, setSelected] = useState(savedDesign);
  const [browse, setBrowse] = useState(false);
  return (
    <>
      <div className="onboarding-page-heading">
        <span className="eyebrow">Find your kind of welcome</span>
        <h1>Good taste, in every detail.</h1>
        <p>Pick a starting point. Your content will feel right at home.</p>
      </div>
      <div className="onboarding-design-layout">
        <div className="onboarding-design-controls">
          <div className="onboarding-design-choices">
            {designs.map((d) => (
              <button
                key={d.name}
                onClick={() => setSelected(d.name)}
                aria-pressed={selected === d.name}
                className={`onboarding-design-choice ${selected === d.name ? "selected" : ""}`}
              >
                <DesignThumbnail design={d.name} />
                <div>
                  <div className="inline space-between">
                    <strong>{d.name}</strong>
                    <span className="choice-radio">
                      {selected === d.name && <Check size={12} />}
                    </span>
                  </div>
                  <p>{d.description}</p>
                </div>
              </button>
            ))}
          </div>
          <button className="browse-link" onClick={() => setBrowse(true)}>
            Browse all designs
            <ArrowRight size={15} />
          </button>
          <div className="onboarding-form-footer">
            <ButtonLink href="/create/setup" variant="ghost">
              <ArrowLeft size={15} />
              Back
            </ButtonLink>
            <Link
              href="/create/preview"
              className="button button-primary"
              onClick={() => setSavedDesign(selected)}
            >
              Continue
              <ArrowRight size={15} />
            </Link>
          </div>
          <p className="meta muted centered">
            You can always change your design later.
          </p>
        </div>
        <div className="onboarding-design-preview">
          <div className="preview-label inline space-between">
            Your page, coming together<Badge>{selected}</Badge>
          </div>
          <PreviewWorkspace design={selected} />
        </div>
      </div>
      <DesignBrowser
        open={browse}
        onClose={() => setBrowse(false)}
        onSelect={setSelected}
      />
    </>
  );
}
export function CreatePreview() {
  const { savedDesign, setLive, notify } = useLab();
  const [mode, setMode] = useState<"Mobile" | "Desktop">("Mobile");
  const [published, setPublished] = useState(false);
  return (
    <div className="final-preview-page">
      <div className="onboarding-page-heading centered">
        <div className="ready-icon">
          <Check size={20} />
        </div>
        <h1>Your page is ready.</h1>
        <p>This is how customers will see your page.</p>
      </div>
      <div className="final-preview-toolbar">
        <span className="preview-label">
          A warm welcome, wherever they find you.
        </span>
        <SegmentedControl
          options={["Mobile", "Desktop"] as const}
          value={mode}
          onChange={setMode}
          label="Preview viewport"
        />
      </div>
      <PreviewWorkspace
        design={savedDesign}
        mode={mode}
        className="final-workspace"
      />
      <div className="final-preview-actions">
        <Button onClick={() => setPublished(true)}>
          Publish this page
          <ArrowUpRight size={15} />
        </Button>
        <div className="inline">
          <ButtonLink href="/create/content" variant="ghost">
            Edit content
          </ButtonLink>
          <span className="muted">·</span>
          <ButtonLink href="/create/design" variant="ghost">
            Change design
          </ButtonLink>
        </div>
      </div>
      <Dialog
        open={published}
        onClose={() => setPublished(false)}
        title="Ready for your next chapter"
        footer={
          <Link
            className="button button-primary"
            href="/dashboard"
            onClick={() => {
              setLive(true);
              setPublished(false);
              notify("You’re back in the visual lab workspace");
            }}
          >
            Go to overview
            <ArrowRight size={15} />
          </Link>
        }
      >
        <div className="publish-confirm">
          <div className="ready-icon">
            <CheckCheck size={24} />
          </div>
          <h3>Everything looks good.</h3>
          <p className="muted">
            This is a visual prototype. Publishing is simulated, and no real
            page or account has been created.
          </p>
          <Badge>UI Lab · Preview only</Badge>
        </div>
      </Dialog>
    </div>
  );
}
