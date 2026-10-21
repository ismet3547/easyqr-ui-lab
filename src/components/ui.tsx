"use client";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Check, X, Copy, ChevronRight, AlertCircle, Inbox } from "lucide-react";
import { useLab } from "@/lib/lab-context";
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  children: ReactNode;
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
    </Link>
  );
}
export function IconButton({
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button className="icon-button" aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function StatusBadge({ live = true }: { live?: boolean }) {
  return (
    <Badge tone={live ? "success" : "neutral"}>
      <span className="status-dot" />
      {live ? "Live" : "Unpublished"}
    </Badge>
  );
}
export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  );
}
export function SectionHeader({
  title,
  meta,
  actions,
}: {
  title: string;
  meta?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div className="inline">
        <h2>{title}</h2>
        {meta && <span className="muted meta">{meta}</span>}
      </div>
      {actions}
    </div>
  );
}
export function Input({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      {label && <label htmlFor={props.id || id}>{label}</label>}
      <input id={id} {...props} />
    </div>
  );
}
export function Select({
  label,
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      {label && <label htmlFor={props.id || id}>{label}</label>}
      <select id={id} {...props}>
        {children}
      </select>
    </div>
  );
}
export function Textarea({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={props.id || id}>{label}</label>
      <textarea id={id} {...props} />
    </div>
  );
}
export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="checkbox-label">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}
export function Toggle({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="toggle-row">
      <div>
        <span className="body-strong">{label}</span>
        {description && <p className="meta muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`toggle ${checked ? "is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          className={value === option ? "selected" : ""}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export function Tabs({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {options.map((option, index) => (
        <button
          role="tab"
          key={option}
          aria-selected={value === option}
          tabIndex={value === option ? 0 : -1}
          onClick={() => onChange(option)}
          onKeyDown={(e) => {
            if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
              e.preventDefault();
              const next =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? options.length - 1
                    : (index +
                        (e.key === "ArrowRight" ? 1 : -1) +
                        options.length) %
                      options.length;
              onChange(options[next]);
              (
                e.currentTarget.parentElement?.children[
                  next
                ] as HTMLButtonElement
              )?.focus();
            }
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  drawer = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const previous = document.activeElement as HTMLElement | null;
    if (open) {
      el.showModal();
    }
    return () => {
      if (el.open) el.close();
      previous?.focus();
    };
  }, [open]);
  useEffect(() => {
    const el = ref.current;
    const onCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    el?.addEventListener("cancel", onCancel);
    return () => el?.removeEventListener("cancel", onCancel);
  }, []);
  return (
    <dialog
      ref={ref}
      className={drawer ? "drawer" : "dialog"}
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-header">
        <h2 id={titleId}>{title}</h2>
        <IconButton label="Close dialog" onClick={onClose}>
          <X size={19} />
        </IconButton>
      </div>
      <div className="dialog-body">{open && children}</div>
      {footer && <footer className="dialog-footer">{footer}</footer>}
    </dialog>
  );
}
export function Drawer(props: Omit<Parameters<typeof Dialog>[0], "drawer">) {
  return <Dialog {...props} drawer />;
}
export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete item",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="confirm-symbol">
        <AlertCircle size={24} />
      </div>
      <p className="muted">{description}</p>
    </Dialog>
  );
}
export function InlineNotice({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <div className={`inline-notice notice-${tone}`}>
      <AlertCircle size={16} />
      <div>{children}</div>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Inbox size={24} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function Toast() {
  const { toast, dismissToast } = useLab();
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 4000);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);
  return toast ? (
    <div className="toast" role="status">
      <span className="toast-check">
        <Check size={15} />
      </span>
      {toast}
      <IconButton label="Dismiss notification" onClick={dismissToast}>
        <X size={16} />
      </IconButton>
    </div>
  ) : null;
}
export function Metric({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="metric">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {detail && <div className="metric-detail">{detail}</div>}
    </div>
  );
}
export function ChartShell({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="chart-shell" role="img" aria-label={label}>
      {children}
    </div>
  );
}
export function CopyField({ label, value }: { label?: string; value: string }) {
  const { notify } = useLab();
  return (
    <div className="copy-field-wrap">
      {label && <div className="label muted">{label}</div>}
      <div className="copy-field">
        <code>{value}</code>
        <IconButton
          label={`Copy ${label || value}`}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              notify("Copied to clipboard");
            } catch {
              notify("Copy is unavailable in this browser");
            }
          }}
        >
          <Copy size={15} />
        </IconButton>
      </div>
    </div>
  );
}
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}
export function ResourceList({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="resource-list" aria-label={label}>
      {children}
    </div>
  );
}
export function ResourceRow({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className="resource-row"
      onClick={onClick}
      aria-label={label}
    >
      {children}
      <ChevronRight className="row-chevron" size={16} />
    </button>
  );
}
