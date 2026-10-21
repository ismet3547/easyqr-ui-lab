"use client";
import { useState } from "react";
import {
  Globe,
  ArrowUpRight,
  Check,
  Clock3,
  ShieldCheck,
  ArrowRight,
  Link2,
  Copy,
  RefreshCw,
  Circle,
} from "lucide-react";
import { useLab } from "@/lib/lab-context";
import { business, type DomainState } from "@/lib/mock-data";
import {
  PageHeader,
  Button,
  ButtonLink,
  Badge,
  Input,
  Select,
  CopyField,
  InlineNotice,
  ConfirmationDialog,
} from "./ui";
export default function DomainPage() {
  const { domain, setDomain, domainName, setDomainName, notify } = useLab();
  const [input, setInput] = useState(domainName);
  const [disconnect, setDisconnect] = useState(false);
  return (
    <>
      <PageHeader
        title="Custom domain"
        description="A familiar address. A page that’s yours."
      />
      <div className="domain-container">
        <div className="domain-demo-control">
          <span className="lab-label">UI LAB</span>
          <Select
            aria-label="Domain visual state"
            value={domain}
            onChange={(e) => setDomain(e.target.value as DomainState)}
          >
            {["Empty", "Waiting", "Securing", "Connected"].map((v) => (
              <option key={v} value={v}>
                {v === "Waiting" ? "Waiting for DNS" : v}
              </option>
            ))}
          </Select>
          <span className="meta muted">Preview only · no DNS checks</span>
        </div>
        {domain === "Empty" ? (
          <section className="domain-empty">
            <div className="domain-illustration">
              <div className="domain-globe">
                <Globe size={40} strokeWidth={1} />
              </div>
              <div className="domain-address">
                <span className="status-dot live-dot" />
                menu.yourbusiness.com
                <span className="address-cursor" />
              </div>
            </div>
            <span className="eyebrow">Your name on the door</span>
            <h2>A little more your own.</h2>
            <p>
              Use a domain you already own.
              <br />
              Your EasyQRService link will always continue to work.
            </p>
            <form
              className="domain-form"
              onSubmit={(e) => {
                e.preventDefault();
                setDomainName(input.toLowerCase().trim());
                setDomain("Waiting");
                notify("Domain setup preview started");
              }}
            >
              <Input
                label="Your domain"
                placeholder="menu.example.com"
                required
                pattern="[a-zA-Z0-9]([a-zA-Z0-9]|-|[.])*[.][a-zA-Z]{2,}"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              />
              <Button type="submit">
                Connect
                <ArrowRight size={15} />
              </Button>
            </form>
            <span className="meta muted">
              Already own a domain? A subdomain like menu.yourbusiness.com works
              well.
            </span>
          </section>
        ) : (
          <section className="domain-surface">
            <header className="domain-status-header">
              <div className="inline">
                <span
                  className={`domain-status-icon ${domain === "Connected" ? "connected" : ""}`}
                >
                  {domain === "Connected" ? (
                    <ShieldCheck size={23} />
                  ) : (
                    <Globe size={23} />
                  )}
                </span>
                <div>
                  <h2>{domainName}</h2>
                  <p>
                    {domain === "Waiting"
                      ? "Let’s get your address connected."
                      : domain === "Securing"
                        ? "The final touch. A secure connection."
                        : "Your page has a place of its own."}
                  </p>
                </div>
              </div>
              <Badge
                tone={
                  domain === "Waiting"
                    ? "warning"
                    : domain === "Connected"
                      ? "success"
                      : "accent"
                }
              >
                {domain === "Waiting" ? (
                  <Clock3 size={12} />
                ) : domain === "Connected" ? (
                  <Check size={12} />
                ) : (
                  <Circle size={12} />
                )}{" "}
                {domain === "Waiting"
                  ? "Waiting for DNS"
                  : domain === "Securing"
                    ? "Securing"
                    : "Connected"}
              </Badge>
            </header>
            {domain === "Waiting" ? (
              <>
                <div className="dns-intro">
                  <h3>Complete these two DNS records.</h3>
                  <p>
                    Add these records where you manage your domain. Then come
                    back here to check.
                  </p>
                </div>
                <div className="dns-record">
                  <div className="dns-record-header">
                    <span className="number-label">1</span>
                    <h3>Verify ownership</h3>
                    <Badge>TXT</Badge>
                  </div>
                  <p className="meta muted">
                    This lets us know this domain belongs to you.
                  </p>
                  <CopyField
                    label="Name"
                    value={`_easyqr-verification.${domainName}`}
                  />
                  <CopyField label="Value" value="easyqr=mock-long-token" />
                </div>
                <div className="dns-record">
                  <div className="dns-record-header">
                    <span className="number-label">2</span>
                    <h3>Point the domain</h3>
                    <Badge>CNAME</Badge>
                  </div>
                  <p className="meta muted">
                    Send customers to your EasyQR page.
                  </p>
                  <CopyField label="Name" value={domainName.split(".")[0]} />
                  <CopyField label="Value" value="domains.easyqrservice.com" />
                </div>
                <div className="domain-check-row">
                  <span className="meta muted">
                    Changes can take a little while to appear.
                  </span>
                  <Button
                    onClick={() => {
                      setDomain("Securing");
                      notify("Preview: ownership verified and DNS connected");
                    }}
                  >
                    <RefreshCw size={14} />
                    Check again
                  </Button>
                </div>
              </>
            ) : domain === "Securing" ? (
              <div className="securing-body">
                <div className="connection-progress">
                  <div>
                    <span className="progress-check">
                      <Check size={15} />
                    </span>
                    <strong>Domain ownership verified</strong>
                    <span>Done</span>
                  </div>
                  <div>
                    <span className="progress-check">
                      <Check size={15} />
                    </span>
                    <strong>DNS connected</strong>
                    <span>Done</span>
                  </div>
                  <div>
                    <span className="progress-pending">
                      <Circle size={14} />
                    </span>
                    <strong>Securing connection</strong>
                    <span>In progress</span>
                  </div>
                </div>
                <InlineNotice>
                  Usually takes a few minutes. You can keep working on your
                  page.
                </InlineNotice>
                <Button
                  onClick={() => {
                    setDomain("Connected");
                    notify("Preview: domain connected securely");
                  }}
                  variant="secondary"
                >
                  Check status
                  <RefreshCw size={14} />
                </Button>
              </div>
            ) : (
              <div className="connected-body">
                <div className="connected-check">
                  <Check size={30} />
                </div>
                <h3>Connected securely</h3>
                <p>
                  Your customers can now find you at{" "}
                  <strong>{domainName}</strong>.
                </p>
                <div className="inline">
                  <ButtonLink href="/create/preview">
                    Open domain
                    <ArrowUpRight size={14} />
                  </ButtonLink>
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `https://${domainName}`,
                        );
                        notify("Domain copied");
                      } catch {
                        notify("Copy is unavailable in this browser");
                      }
                    }}
                  >
                    <Copy size={14} />
                    Copy
                  </Button>
                </div>
              </div>
            )}
            <footer className="domain-surface-footer">
              <span className="meta muted">
                {domain === "Connected"
                  ? "Your EasyQR link stays active too."
                  : "Your EasyQR page stays live during setup."}
              </span>
              <button className="text-link" onClick={() => setDisconnect(true)}>
                Remove domain
              </button>
            </footer>
          </section>
        )}
        <div className="platform-fallback">
          <span className="mini-icon">
            <Link2 size={17} />
          </span>
          <div>
            <strong>Your EasyQRService link</strong>
            <p>{business.url}</p>
          </div>
          <Badge>Always available</Badge>
        </div>
      </div>
      <ConfirmationDialog
        open={disconnect}
        onClose={() => setDisconnect(false)}
        onConfirm={() => {
          setDomain("Empty");
          setDisconnect(false);
          notify("Domain removed from this preview");
        }}
        title="Remove this domain?"
        description="Your EasyQRService link will keep working. You can reconnect a domain any time."
        confirmLabel="Remove domain"
      />
    </>
  );
}
