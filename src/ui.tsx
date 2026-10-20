"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import {
  ArrowUpRight, BarChart3, ChevronDown, CircleHelp, Copy, ExternalLink,
  Globe, Home, LayoutDashboard, List, Menu, MoreHorizontal, Palette,
  Plus, QrCode, Search, Settings2, X, type LucideIcon
} from "lucide-react";
import { navItems, business } from "./data";

const icons: Record<string, LucideIcon> = {
  LayoutDashboard, List, Palette, QrCode, ChartNoAxesCombined: BarChart3, Globe
};

export function Brand({ small = false }: {small?: boolean}) {
  return <Link className={"brand" + (small ? " brand-sm" : "")} href="/dashboard" aria-label="EasyQR home">
    <span className="brand-symbol" aria-hidden="true"><span /><span /><span /><span /></span>
    {!small && <span>easyqr<span className="brand-mark">.</span></span>}
  </Link>;
}

export function Button({variant="primary", size="md", children, className="", ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary"|"secondary"|"ghost"|"danger"|"accent"; size?: "sm"|"md"|"lg"
}) {
  return <button {...props} className={`btn btn-${variant} btn-${size} ${className}`}>{children}</button>;
}
export function IconButton({label,children,className="",...props}: ButtonHTMLAttributes<HTMLButtonElement>&{label:string}) {
  return <button {...props} className={`icon-btn ${className}`} aria-label={label} title={label}>{children}</button>;
}
export function Badge({tone="neutral",children}: {tone?:"neutral"|"accent"|"success"|"warning"|"danger";children:ReactNode}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function StatusBadge({status}: {status:"Live"|"Available"|"Sold out"|"Not connected"|"Ready"|"Connected"|"Draft"}) {
  const good=["Live","Available","Ready","Connected"].includes(status);
  return <span className={`status ${good?"status-good":status==="Sold out"?"status-warn":"status-muted"}`}><span className="status-dot" />{status}</span>;
}
export function PageHeader({eyebrow,title,subtitle,actions}: {eyebrow?:string;title:string;subtitle?:string;actions?:ReactNode}) {
  return <header className="page-header"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{subtitle&&<p className="page-subtitle">{subtitle}</p>}</div>{actions&&<div className="header-actions">{actions}</div>}</header>;
}
export function SectionHeader({title,description,action}: {title:string;description?:string;action?:ReactNode}) {
  return <div className="section-header"><div><h2>{title}</h2>{description&&<p className="muted">{description}</p>}</div>{action}</div>;
}
export function Input({label,id,help,...props}:InputHTMLAttributes<HTMLInputElement>&{label?:string;help?:string}) {
  const generated=useId();const fieldId=id||generated;
  return <div className="field">{label&&<label htmlFor={fieldId}>{label}</label>}<input {...props} id={fieldId} className="input" />{help&&<p className="field-help">{help}</p>}</div>;
}
export function Select({label,id,children,...props}:SelectHTMLAttributes<HTMLSelectElement>&{label?:string;children:ReactNode}) {
  const generated=useId();const fieldId=id||generated;
  return <div className="field">{label&&<label htmlFor={fieldId}>{label}</label>}<select {...props} id={fieldId} className="input select">{children}</select></div>;
}
export function Textarea({label,id,...props}:TextareaHTMLAttributes<HTMLTextAreaElement>&{label?:string}) {
  const generated=useId();const fieldId=id||generated;
  return <div className="field">{label&&<label htmlFor={fieldId}>{label}</label>}<textarea {...props} id={fieldId} className="input textarea" /></div>;
}
export function Checkbox({label,checked,onChange}:{label:string;checked:boolean;onChange:(value:boolean)=>void}) {
  return <label className="check-line"><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)}/><span>{label}</span></label>;
}
export function Toggle({label,checked,onChange}:{label:string;checked:boolean;onChange:(value:boolean)=>void}) {
  return <label className="toggle-line"><span>{label}</span><input type="checkbox" role="switch" checked={checked} onChange={e=>onChange(e.target.checked)} /><span className="toggle-track" aria-hidden="true"><span /></span></label>;
}
export function Tabs({options,value,onChange}:{options:{id:string;label:string}[];value:string;onChange:(value:string)=>void}) {
  return <div className="tabs" role="tablist" aria-label="Page sections">{options.map(opt=><button role="tab" aria-selected={value===opt.id} key={opt.id} onClick={()=>onChange(opt.id)} className={value===opt.id?"active":""}>{opt.label}</button>)}</div>;
}
export function SegmentedControl({options,value,onChange,label}:{options:{id:string;label:string}[];value:string;onChange:(value:string)=>void;label:string}) {
  return <div className="segments" role="group" aria-label={label}>{options.map(opt=><button key={opt.id} aria-pressed={value===opt.id} className={value===opt.id?"selected":""} onClick={()=>onChange(opt.id)}>{opt.label}</button>)}</div>;
}
export function InlineNotice({children,tone="info"}:{children:ReactNode;tone?:"info"|"warning"}) {
  return <div className={`notice notice-${tone}`} role="note"><CircleHelp size={17}/><div>{children}</div></div>;
}
export function EmptyState({icon,title,description,action}:{icon?:ReactNode;title:string;description:string;action?:ReactNode}) {
  return <div className="empty-state"><div className="empty-icon">{icon||<Search size={22}/>}</div><h3>{title}</h3><p>{description}</p>{action}</div>;
}
export function Skeleton({width="100%"}:{width?:string}) {return <div className="skeleton" style={{width}} aria-hidden="true"/>;}
export function Metric({value,label}:{value:string|number;label:string}) {return <div className="metric"><strong>{typeof value==="number"?value.toLocaleString("en-US"):value}</strong><span>{label}</span></div>;}
export function ChartShell({children}:{children:ReactNode}) {return <div className="chart-shell">{children}</div>;}
export function CopyField({value,onCopy}:{value:string;onCopy:(value:string)=>void}) {
  return <div className="copy-field"><span title={value}>{value}</span><IconButton label={`Copy ${value}`} onClick={()=>onCopy(value)}><Copy size={16}/></IconButton></div>;
}
export function ResourceList({children}:{children:ReactNode}) {return <div className="resource-list">{children}</div>;}
export function ResourceRow({children,onClick}:{children:ReactNode;onClick?:()=>void}) {
  return <div className={`resource-row ${onClick?"resource-clickable":""}`} onClick={onClick} onKeyDown={onClick?e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onClick();}}:undefined} tabIndex={onClick?0:undefined} role={onClick?"button":undefined}>{children}</div>;
}

function useOverlayKeyboard(open:boolean,onClose:()=>void,root:React.RefObject<HTMLDivElement|null>) {
  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement|null;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const focusable=()=>Array.from(root.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')||[]);
    (root.current?.querySelector<HTMLElement>("[data-autofocus]")||focusable()[0]||root.current)?.focus();
    const keydown=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){e.preventDefault();onClose();}
      if(e.key==="Tab"){const els=focusable();if(!els.length){e.preventDefault();return;}const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    };
    document.addEventListener("keydown",keydown);
    return ()=>{document.removeEventListener("keydown",keydown);document.body.style.overflow=oldOverflow;previous?.focus();};
  },[open,onClose,root]);
}
export function Drawer({open,onClose,title,children,footer}:{open:boolean;onClose:()=>void;title:string;children:ReactNode;footer?:ReactNode}) {
  const ref=useRef<HTMLDivElement>(null);useOverlayKeyboard(open,onClose,ref);
  if(!open)return null;
  return <div className="overlay-layer"><div className="overlay-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}/><div ref={ref} className="drawer" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
    <div className="drawer-head"><h2>{title}</h2><IconButton label="Close editor" onClick={onClose}><X size={20}/></IconButton></div>
    <div className="drawer-body">{children}</div>{footer&&<div className="drawer-foot">{footer}</div>}</div></div>;
}
export function Dialog({open,onClose,title,children,footer}:{open:boolean;onClose:()=>void;title:string;children:ReactNode;footer?:ReactNode}) {
  const ref=useRef<HTMLDivElement>(null);useOverlayKeyboard(open,onClose,ref);
  if(!open)return null;
  return <div className="overlay-layer dialog-layer"><div className="overlay-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}/><div className="dialog" ref={ref} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}><div className="dialog-head"><h2>{title}</h2><IconButton label="Close dialog" onClick={onClose}><X size={18}/></IconButton></div><div className="dialog-content">{children}</div>{footer&&<div className="dialog-foot">{footer}</div>}</div></div>;
}
export function ConfirmationDialog({open,onClose,onConfirm,title,description}:{open:boolean;onClose:()=>void;onConfirm:()=>void;title:string;description:string}) {
  return <Dialog open={open} onClose={onClose} title={title} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm} data-autofocus>Delete item</Button></>}><p className="muted">{description}</p></Dialog>;
}
export function Toast({message,onDismiss}:{message:string;onDismiss:()=>void}) {
  useEffect(()=>{if(!message)return;const timer=setTimeout(onDismiss,3200);return ()=>clearTimeout(timer);},[message,onDismiss]);
  return message?<div className="toast" role="status"><span className="toast-mark">✓</span>{message}<IconButton label="Dismiss notification" onClick={onDismiss}><X size={16}/></IconButton></div>:null;
}

export function BusinessSwitcher() {
  const[open,setOpen]=useState(false);const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false);};const onPointer=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setOpen(false);};document.addEventListener("keydown",onKey);document.addEventListener("mousedown",onPointer);return()=>{document.removeEventListener("keydown",onKey);document.removeEventListener("mousedown",onPointer);};},[open]);
  return <div className="business-switcher" ref={ref}><button className="business-trigger" aria-expanded={open} aria-haspopup="menu" onClick={()=>setOpen(!open)}><span className="business-avatar">a</span><span className="business-label"><strong>{business.name}</strong><small>Cafe · Menu</small></span><ChevronDown size={15}/></button>{open&&<div className="business-popover" role="menu"><span className="menu-eyebrow">YOUR BUSINESS</span><button role="menuitem" className="business-option" onClick={()=>setOpen(false)}><span className="business-avatar">a</span><span><strong>Acme Coffee</strong><small>Current business</small></span><span className="menu-check">✓</span></button><div className="popover-divider"/><Link href="/create" role="menuitem" onClick={()=>setOpen(false)}><Plus size={15}/> Create a page</Link></div>}</div>;
}

export function Sidebar({pathname}:{pathname:string}) {
  return <aside className="sidebar"><div className="sidebar-top"><Brand/><BusinessSwitcher/></div><nav className="sidebar-nav" aria-label="Main navigation"><span className="nav-eyebrow">WORKSPACE</span>{navItems.map(item=>{const Icon=icons[item.icon];const active=pathname===item.href;return <Link key={item.href} className={`sidebar-link ${active?"is-active":""}`} aria-current={active?"page":undefined} href={item.href}><Icon size={18} strokeWidth={1.9}/><span>{item.label}</span></Link>;})}</nav><div className="sidebar-bottom"><Link href="/create/preview" className="sidebar-open"><ExternalLink size={16}/> Open page <ArrowUpRight size={14}/></Link><Link href="/login" className="sidebar-account"><span className="account-avatar">AC</span><span><strong>Acme workspace</strong><small>Pilot Premium</small></span><MoreHorizontal size={17}/></Link></div></aside>;
}
export function MobileNavigation({pathname}:{pathname:string}) {
  const [more,setMore]=useState(false);
  useEffect(()=>setMore(false),[pathname]);
  const bottom=[
    {href:"/dashboard",label:"Home",icon:Home},
    {href:"/dashboard/content",label:"Content",icon:List},
    {href:"/dashboard/design",label:"Design",icon:Palette},
    {href:"/dashboard/share",label:"Share",icon:QrCode},
  ];
  return <><header className="mobile-top"><Brand/><span className="mobile-business">Acme Coffee</span><Link className="mobile-top-action" href="/create/preview" aria-label="Open page"><ArrowUpRight size={19}/></Link></header><nav className="bottom-nav" aria-label="Mobile navigation">{bottom.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={pathname===href?"page":undefined} className={pathname===href?"is-active":""}><Icon size={21}/><span>{label}</span></Link>)}<button className={more||["/dashboard/analytics","/dashboard/domain"].includes(pathname)?"is-active":""} onClick={()=>setMore(!more)} aria-expanded={more} aria-controls="more-navigation"><Menu size={21}/><span>More</span></button></nav>{more&&<><button className="mobile-menu-backdrop" aria-label="Close more menu" onClick={()=>setMore(false)}/><div className="mobile-more" id="more-navigation"><span className="menu-eyebrow">MORE</span><Link href="/dashboard/analytics"><BarChart3 size={18}/> Analytics</Link><Link href="/dashboard/domain"><Globe size={18}/> Domain</Link><Link href="/login"><Settings2 size={18}/> Account</Link></div></>}</>;
}
export function AppShell({pathname,children}:{pathname:string;children:ReactNode}) {
  return <div className="app-shell"><Sidebar pathname={pathname}/><MobileNavigation pathname={pathname}/><main className="app-main"><div className="work-area">{children}</div></main></div>;
}
