"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Check, CheckCircle2,
  ChevronRight, Circle, ClipboardCheck, Coffee, Copy, ExternalLink, FileImage, Globe,
  GripVertical, ImagePlus, LayoutGrid, Link2, Menu as MenuIcon, Monitor, MoreHorizontal,
  Palette, Plus, QrCode, Search, ShieldCheck, Smartphone, Sparkles, Trash2, X
} from "lucide-react";
import { analytics, business, initialMenu, topContent, type AnalyticsRange, type DesignName, type DomainState, type MenuItem } from "./data";
import {
  AppShell, Badge, Brand, Button, Checkbox, ConfirmationDialog, CopyField, Dialog, Drawer,
  EmptyState, IconButton, InlineNotice, Input, Metric, PageHeader, ResourceList, ResourceRow,
  SectionHeader, SegmentedControl, Select, StatusBadge, Textarea, Toast, Toggle
} from "./ui";

const previewItems = initialMenu.slice(0,4);
const pageTypes = [
  {id:"MENU", label:"Menu", description:"Restaurants, cafés, bakeries", icon:Coffee},
  {id:"SERVICES", label:"Services", description:"Barbers, salons, local services", icon:ClipboardCheck},
  {id:"SHOP", label:"Products", description:"Simple product catalog", icon:LayoutGrid},
  {id:"PORTFOLIO", label:"Portfolio", description:"Work, packages and pricing", icon:FileImage}
] as const;
const designNames: DesignName[]=["Clean","Bold","Warm"];
const fmt=(n:number)=>n.toLocaleString("en-US");

function PublicPreview({design="Clean",device="mobile",compact=false}:{design?:DesignName;device?:"mobile"|"desktop";compact?:boolean}) {
  return <div className={`public-preview design-${design.toLowerCase()} device-${device} ${compact?"preview-compact":""}`}>
    <div className="public-bar"><span className="public-brand">acme<span>✳</span></span><span className="public-bar-right">MENU <MenuIcon size={15}/></span></div>
    <div className="public-hero">
      <div className="public-hero-image" role="img" aria-label="Freshly poured coffee on a cafe table"/>
      <div className="public-hero-text"><span>YOUR NEIGHBORHOOD COFFEE SPOT</span><h3>Good coffee.<br/>Good company.</h3><p>Thoughtfully made, every day.</p></div>
    </div>
    <div className="public-menu">
      <div className="public-menu-head"><div><span className="preview-eyebrow">EXPLORE THE MENU</span><h4>Something good awaits.</h4></div><span className="open-pill">Open today</span></div>
      <div className="public-category-row"><span className="selected">Coffee</span><span>Breakfast</span><span>Pastries</span></div>
      <div className="public-list">{previewItems.map(item=><div key={item.id} className="public-item"><div><strong>{item.name}</strong><small>{item.description}</small><b>${item.price}</b></div>{item.photo&&<img src={item.photo} alt="" loading="lazy" />}</div>)}</div>
      <div className="public-powered">Made with easyqr</div>
    </div>
  </div>;
}
function PreviewStage({design,device,compact=false}:{design:DesignName;device:"mobile"|"desktop";compact?:boolean}) {
  return <div className={`preview-stage stage-${device} ${compact?"stage-compact":""}`}><PublicPreview design={design} device={device} compact={compact}/></div>;
}
function DesignThumbnail({name}:{name:DesignName}) {
  return <div className={`design-thumb thumb-${name.toLowerCase()}`} aria-hidden="true">
    <div className="thumb-top"><span>acme✳</span><span>≡</span></div><div className="thumb-hero"><i/><span>Good coffee.<br/>Good company.</span></div>
    <div className="thumb-cats"><span/><span/><span/></div><div className="thumb-lines"><span/><span/><span/></div>
  </div>;
}
function DesignChoice({name,selected,onSelect,recommended=false}:{name:DesignName;selected:boolean;onSelect:()=>void;recommended?:boolean}) {
  return <button className={`design-choice ${selected?"design-choice-selected":""}`} aria-pressed={selected} onClick={onSelect}>
    <DesignThumbnail name={name}/><span className="design-choice-meta"><span><strong>{name}</strong>{recommended&&<small>Recommended</small>}</span>{selected?<span className="choice-check"><Check size={14}/></span>:<Circle size={18} className="choice-circle"/>}</span>
  </button>;
}
function QRArt({scale=1}:{scale?:number}) {
  const size=29;const rects=[];
  function inFinder(x:number,y:number,cx:number,cy:number){return x>=cx&&x<cx+7&&y>=cy&&y<cy+7;}
  function finderDot(x:number,y:number,cx:number,cy:number) {
    const a=x-cx,b=y-cy;return a===0||b===0||a===6||b===6||(a>=2&&a<=4&&b>=2&&b<=4);
  }
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const finders:[[number,number],[number,number],[number,number]]=[[0,0],[22,0],[0,22]];
    let reserved=false,draw=false;
    for(const [cx,cy] of finders){if(x>=cx-1&&x<=cx+7&&y>=cy-1&&y<=cy+7){reserved=true;if(inFinder(x,y,cx,cy))draw=finderDot(x,y,cx,cy);break;}}
    if(!reserved)draw=(((x*37+y*19+x*y*11)%13)<6)||((x*7+y*3)%17===0);
    if(draw)rects.push(<rect key={x+"-"+y} x={x} y={y} width="1" height="1"/>);
  }
  return <svg className="qr-art" style={{maxWidth:scale===1?260:scale===2?320:390}} viewBox="0 0 29 29" shapeRendering="crispEdges" role="img" aria-label="Visual demo QR pattern, not a scannable code"><rect width="29" height="29" fill="white"/><g fill="#202328">{rects}</g></svg>;
}
function AnalyticsChart({range}:{range:AnalyticsRange}) {
  const values=[...analytics[range].values];const width=820,height=210,pad=12;
  const min=Math.min(...values)-10,max=Math.max(...values)+8;
  const points=values.map((v,i)=>({x:pad+(i/(values.length-1))*(width-pad*2),y:height-pad-((v-min)/(max-min))*(height-pad*2)}));
  const path=points.map((p,i)=>`${i?"L":"M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area=path+` L ${points[points.length-1].x} ${height} L ${points[0].x} ${height} Z`;
  return <div className="chart-wrap"><div className="chart-grid"><span>{max}</span><span>{Math.round((max+min)/2)}</span><span>{min}</span></div><svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={`Mock page views trend over ${range} days`}><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5865E0" stopOpacity=".16"/><stop offset="100%" stopColor="#5865E0" stopOpacity="0"/></linearGradient></defs>{[.25,.5,.75].map(t=><line key={t} x1="0" x2={width} y1={height*t} y2={height*t} stroke="#ECEEF1" strokeDasharray="3 6"/>)}<path d={area} fill="url(#areaFill)"/><path d={path} stroke="#5865E0" strokeWidth="2.8" fill="none" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"/></svg><div className="chart-axis"><span>{range==="7"?"7 days ago":range==="30"?"30 days ago":"90 days ago"}</span><span>Today</span></div></div>;
}

function Overview({design}:{design:DesignName}) {
  return <><PageHeader title="Overview" eyebrow="WORKSPACE"/><div className="overview-intro"><div><h2>{business.name}</h2><div className="live-line"><StatusBadge status="Live"/><span className="separator">·</span><span className="url-text">{business.url}</span></div></div><Link className="text-link" href="/create/preview">Open page <ArrowUpRight size={16}/></Link></div>
    <div className="overview-feature"><div className="overview-preview"><PreviewStage design={design} device="desktop" compact/></div><div className="overview-summary"><span className="eyebrow">YOUR PAGE</span><h3>Everything in its place.</h3><p className="muted">A quick look at your page and what you can manage.</p><dl className="summary-list"><div><dt>Content</dt><dd>24 menu items <ChevronRight size={15}/></dd></div><div><dt>Design</dt><dd>{design} <ChevronRight size={15}/></dd></div><div><dt>QR</dt><dd><StatusBadge status="Ready"/></dd></div><div><dt>Domain</dt><dd>Not connected</dd></div></dl><Link className="subtle-link" href="/dashboard/content">Manage your page <ArrowRight size={15}/></Link></div></div>
    <section className="section-block"><SectionHeader title="Performance" description="Last 30 days" action={<Link className="subtle-link" href="/dashboard/analytics">View analytics <ArrowRight size={15}/></Link>}/><div className="metrics-strip"><Metric value={1284} label="Page views"/><Metric value={492} label="QR opens"/><Metric value={137} label="Customer actions"/></div></section>
    <section className="section-block"><SectionHeader title="Quick actions"/><div className="quick-actions"><Link href="/dashboard/content"><span className="action-icon"><MenuIcon size={20}/></span><span>Edit content<small>Update items and pricing</small></span><ArrowUpRight size={17}/></Link><Link href="/dashboard/design"><span className="action-icon"><Palette size={20}/></span><span>Change design<small>Refresh your look</small></span><ArrowUpRight size={17}/></Link><Link href="/dashboard/share"><span className="action-icon"><QrCode size={20}/></span><span>Share QR<small>Ready for your customers</small></span><ArrowUpRight size={17}/></Link></div></section>
  </>;
}

function ContentPage({notify}:{notify:(s:string)=>void}) {
  const [items,setItems]=useState(initialMenu);
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState("all");
  const [editor,setEditor]=useState<MenuItem|null>(null);
  const [isNew,setIsNew]=useState(false);
  const [confirm,setConfirm]=useState(false);
  const filtered=useMemo(()=>items.filter(item=>(item.name+" "+item.description+" "+item.category).toLowerCase().includes(query.trim().toLowerCase()) && (filter==="all"||(filter==="available"?item.available:!item.available))),[items,query,filter]);
  const openEdit=(item:MenuItem)=>{setEditor({...item});setIsNew(false);};
  const openAdd=()=>{setEditor({id:"new",name:"",description:"",price:"",category:"Coffee",available:true,visible:true});setIsNew(true);};
  const save=()=>{if(!editor)return;if(!editor.name.trim()){notify("Add an item name before saving");return;}if(isNew)setItems(current=>[{...editor,id:String(Date.now())},...current]);else setItems(current=>current.map(item=>item.id===editor.id?editor:item));setEditor(null);notify(isNew?"Menu item added":"Changes saved");};
  const remove=()=>{if(!editor)return;setItems(current=>current.filter(item=>item.id!==editor.id));setConfirm(false);setEditor(null);notify("Menu item deleted");};
  return <><PageHeader title="Content" subtitle="Manage what customers see on your menu." actions={<Button onClick={openAdd}><Plus size={17}/> Add item</Button>}/>
    <section className="content-panel"><div className="content-toolbar"><div className="search-field"><Search size={17}/><input aria-label="Search menu items" placeholder="Search menu items" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="filter-field"><label htmlFor="status-filter">Status</label><select id="status-filter" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All items</option><option value="available">Available</option><option value="sold">Sold out</option></select></div><span className="toolbar-count">{filtered.length} items</span></div>
    {filtered.length===0?<EmptyState title="No matching items" description="Try a different search or status filter." action={<Button variant="secondary" onClick={()=>{setQuery("");setFilter("all");}}>Clear filters</Button>}/>:["Coffee","Breakfast","Pastries","Seasonal"].map(category=>{const rows=filtered.filter(item=>item.category===category);if(!rows.length)return null;return <div className="resource-group" key={category}><div className="resource-group-head"><h2>{category}</h2><span>{rows.length} items</span><MoreHorizontal size={18}/></div><ResourceList>{rows.map(item=><ResourceRow key={item.id} onClick={()=>openEdit(item)}><GripVertical className="drag-icon" size={17}/>{item.photo?<img className="row-photo" alt="" src={item.photo} loading="lazy" />:<span className="row-photo photo-fallback"><Coffee size={18}/></span>}<div className="row-text"><strong>{item.name}</strong><span>{item.description}</span></div><span className="row-price">${item.price}</span><span className="row-status"><StatusBadge status={item.available?"Available":"Sold out"}/></span><IconButton label={`Edit ${item.name}`} onClick={e=>{e.stopPropagation();openEdit(item);}}><MoreHorizontal size={18}/></IconButton></ResourceRow>)}</ResourceList></div>;})}</section>
    <Drawer open={Boolean(editor)&&!confirm} onClose={()=>setEditor(null)} title={isNew?"Add menu item":"Edit menu item"} footer={<>{!isNew&&<Button variant="ghost" className="delete-action" onClick={()=>setConfirm(true)}><Trash2 size={16}/> Delete</Button>}<div className="drawer-foot-right"><Button variant="secondary" onClick={()=>setEditor(null)}>Cancel</Button><Button onClick={save}>Save item</Button></div></>}>
      {editor&&<div className="editor-fields"><Input label="Name" value={editor.name} onChange={e=>setEditor({...editor,name:e.target.value})} placeholder="Menu item name" data-autofocus/><Textarea label="Description" value={editor.description} rows={3} onChange={e=>setEditor({...editor,description:e.target.value})} placeholder="What makes this item special?"/><div className="two-fields"><Input label="Price ($)" type="number" min="0" step=".01" value={editor.price} onChange={e=>setEditor({...editor,price:e.target.value})} placeholder="0.00"/><Select label="Availability" value={editor.available?"available":"sold"} onChange={e=>setEditor({...editor,available:e.target.value==="available"})}><option value="available">Available</option><option value="sold">Sold out</option></Select></div><Select label="Category" value={editor.category} onChange={e=>setEditor({...editor,category:e.target.value as MenuItem["category"]})}>{["Coffee","Breakfast","Pastries","Seasonal"].map(cat=><option key={cat}>{cat}</option>)}</Select><div className="field"><label>Photo</label><div className="photo-editor">{editor.photo?<img src={editor.photo} alt={editor.name||"Menu item"} />:<div className="photo-placeholder"><ImagePlus size={22}/></div>}<div><strong>{editor.photo?"Menu photo":"No photo added"}</strong><p className="field-help">Visual preview only. Uploads are not connected.</p><Button variant="secondary" size="sm" onClick={()=>{setEditor({...editor,photo:editor.photo?undefined:initialMenu[0].photo});}}>{editor.photo?"Remove photo":"Use sample photo"}</Button></div></div></div><div className="editor-toggle"><Toggle label="Visible on page" checked={editor.visible} onChange={visible=>setEditor({...editor,visible})}/><p className="field-help">Hide this item without deleting it.</p></div></div>}
    </Drawer><ConfirmationDialog open={confirm} onClose={()=>setConfirm(false)} onConfirm={remove} title="Delete menu item?" description={`“${editor?.name||"This item"}” will be removed from the demo menu. This cannot be undone in this session.`}/>
  </>;
}

function DesignPage({saved,setSaved,notify}:{saved:DesignName;setSaved:(v:DesignName)=>void;notify:(v:string)=>void}) {
  const [draft,setDraft]=useState<DesignName>(saved);const [device,setDevice]=useState<"mobile"|"desktop">("mobile");const [browse,setBrowse]=useState(false);
  const dirty=draft!==saved;
  return <><PageHeader title="Design" subtitle="Give your page a look that feels like you."/><div className="design-workspace"><aside className="design-settings"><div className="design-current"><span className="eyebrow">CURRENT DESIGN</span><div className="current-line"><strong>{saved}</strong><StatusBadge status="Live"/></div></div><div className="design-options"><h2>Choose a design</h2><p>Preview a new look before saving it.</p><div className="design-option-list">{designNames.slice(0,2).map((name,i)=><DesignChoice key={name} name={name} selected={draft===name} onSelect={()=>setDraft(name)} recommended={i===0}/>)}</div><Button variant="ghost" className="browse-button" onClick={()=>setBrowse(true)}>Browse all designs <ArrowRight size={15}/></Button></div><div className="premium-studio"><span className="small-glyph"><Sparkles size={18}/></span><strong>Premium Studio</strong><p>More ways to make your page your own.</p><button onClick={()=>notify("Premium Studio is a visual preview only")}>Explore features <ArrowRight size={14}/></button></div></aside><div className="design-preview-workspace"><div className="preview-workspace-toolbar"><div><strong>Live preview</strong><span>Changes are not public until you save.</span></div><SegmentedControl label="Preview device" value={device} onChange={value=>setDevice(value as "mobile"|"desktop")} options={[{id:"mobile",label:"Mobile"},{id:"desktop",label:"Desktop"}]}/></div><PreviewStage design={draft} device={device}/></div></div>
    {dirty&&<div className="dirty-bar"><span><span className="dirty-indicator"/>You’re previewing <strong>{draft}</strong></span><div><Button variant="secondary" onClick={()=>setDraft(saved)}>Discard</Button><Button onClick={()=>{setSaved(draft);notify(`${draft} design saved`);}}>Save design</Button></div></div>}
    <Dialog open={browse} onClose={()=>setBrowse(false)} title="Explore designs" footer={<Button variant="secondary" onClick={()=>setBrowse(false)}>Done</Button>}><div className="design-modal-grid">{designNames.map(name=><DesignChoice key={name} name={name} selected={draft===name} onSelect={()=>{setDraft(name);setBrowse(false);}}/>)}</div></Dialog>
  </>;
}

function SharePage({notify}:{notify:(s:string)=>void}) {
  const[size,setSize]=useState("Medium");const[customize,setCustomize]=useState(false);
  const download=()=>{notify(`${size} PNG is a mock download in the UI lab`);};
  const copy=(v:string)=>{void navigator.clipboard?.writeText(v).then(()=>notify("Link copied")).catch(()=>notify("Copy not available in this browser"));};
  return <><PageHeader title="QR & Share" subtitle="One permanent QR code for your business."/><section className="qr-hero"><div className="qr-hero-text"><Badge tone="accent">PERMANENT LINK</Badge><h2>Your QR, ready to go.</h2><p>Print it once. Your customers always reach your latest page, even when the content changes.</p></div><div className="qr-center"><div className="qr-paper"><QRArt scale={size==="Large"?3:size==="Medium"?2:1}/></div><span className="qr-demo-caption">Visual demo · not scannable</span></div><div className="qr-controls"><div className="share-url"><span>{business.url}</span><div><IconButton label="Copy page URL" onClick={()=>copy("https://"+business.url)}><Copy size={17}/></IconButton><Link href="/create/preview" aria-label="Open page preview"><ArrowUpRight size={18}/></Link></div></div><div className="download-controls"><span className="field-label">Download size</span><SegmentedControl label="QR download size" value={size} onChange={setSize} options={["Small","Medium","Large"].map(s=>({id:s,label:s}))}/><Button size="lg" onClick={download}><ArrowDownToLine size={18}/> Download PNG</Button></div></div></section>
    <section className="section-block share-use"><SectionHeader title="Use your QR" description="On tables, printed menus, shop signs or social profiles."/><div className="share-use-examples"><div><span className="use-icon"><QrCode size={22}/></span><strong>On your tables</strong><small>A quick scan to browse the menu</small></div><div><span className="use-icon"><ExternalLink size={22}/></span><strong>In your bio</strong><small>One link for all the essentials</small></div><div><span className="use-icon"><FileImage size={22}/></span><strong>On your signs</strong><small>Make finding your page effortless</small></div></div></section><section className="qr-premium"><div><span className="small-glyph"><Palette size={19}/></span><div><h2>Customize your QR</h2><p>Add a logo, change colors, or choose a frame with Premium customization.</p></div></div><Button variant="secondary" onClick={()=>setCustomize(true)}>Explore options <ArrowRight size={16}/></Button></section><Dialog title="QR customization preview" open={customize} onClose={()=>setCustomize(false)} footer={<Button onClick={()=>setCustomize(false)}>Got it</Button>}><InlineNotice>Custom QR colors, logos and frames are not connected in this visual prototype.</InlineNotice></Dialog>
  </>;
}

function AnalyticsPage({empty,setEmpty}:{empty:boolean;setEmpty:(v:boolean)=>void}) {
  const[range,setRange]=useState<AnalyticsRange>("30");const data=analytics[range];
  return <><PageHeader title="Analytics" subtitle="Understand how people are using your page." actions={<SegmentedControl label="Analytics date range" value={range} onChange={v=>setRange(v as AnalyticsRange)} options={[{id:"7",label:"7 days"},{id:"30",label:"30 days"},{id:"90",label:"90 days"}]}/>}/>
    {empty?<div className="analytics-empty"><EmptyState icon={<BarChart3 size={26}/>} title="No activity yet" description="Share your page or QR. Activity will appear here once people start using it." action={<Link className="btn btn-primary btn-md" href="/dashboard/share">Share your page <ArrowRight size={16}/></Link>}/></div>:<><div className="analytics-primary"><div className="analytics-heading"><div><span className="eyebrow">PAGE VIEWS</span><strong className="big-number">{fmt(data.views)}</strong><span className="muted">Last {range} days</span></div><Badge tone="neutral">Demo data</Badge></div><AnalyticsChart range={range}/></div><div className="metrics-strip analytics-metrics"><Metric value={data.qr} label="QR opens"/><Metric value={data.actions} label="Customer actions"/><Metric value={data.interactions} label="Content interactions"/></div><div className="analytics-bottom"><section><SectionHeader title="Traffic source"/><div className="traffic-bar"><span style={{width:"38%"}}/><span style={{width:"62%"}}/></div><div className="traffic-key"><span><i className="traffic-dot qr-dot"/>QR <strong>38%</strong></span><span><i className="traffic-dot direct-dot"/>Direct <strong>62%</strong></span></div></section><section><SectionHeader title="Top content"/><div className="top-content-list">{topContent.map((item,i)=><div key={item.title}><span className="rank">{i+1}</span><strong>{item.title}</strong><span>{item.interactions} interactions</span></div>)}</div></section></div></>}
    <div className="lab-inline-control"><span>UI Lab controls</span><label><input type="checkbox" checked={empty} onChange={e=>setEmpty(e.target.checked)}/> Show zero-activity state</label></div>
  </>;
}

function DomainPage({domain,setDomain,notify}:{domain:DomainState;setDomain:(s:DomainState)=>void;notify:(s:string)=>void}) {
  const [value,setValue]=useState("menu.example.com");const copy=(s:string)=>{void navigator.clipboard?.writeText(s).then(()=>notify("Copied to clipboard")).catch(()=>notify("Copy not available"));};
  return <><PageHeader title="Custom domain" subtitle="Make your page feel even more like your brand."/><div className="domain-content"><div className="domain-lead"><div className="domain-symbol"><Globe size={25}/></div><div><h2>Use a domain you already own.</h2><p>Your EasyQRService link will always continue to work.</p></div></div>
    {domain==="empty"&&<div className="domain-panel"><label className="field-label" htmlFor="domain-input">Your domain</label><div className="domain-connect"><input id="domain-input" className="input" value={value} onChange={e=>setValue(e.target.value)} placeholder="menu.example.com"/><Button onClick={()=>{if(value.includes(".")){setDomain("waiting");notify("Demo domain added");}else notify("Enter a valid domain");}}>Connect domain</Button></div><p className="field-help">For example, menu.yourbusiness.com</p></div>}
    {domain==="waiting"&&<div className="domain-panel"><div className="domain-status-line"><Globe size={20}/><strong>{value||"menu.example.com"}</strong><Badge tone="warning">Waiting for DNS</Badge></div><p className="muted">Add these two records at your domain provider. This is a demonstration—no DNS checks are performed.</p><div className="dns-step"><div className="step-counter">1</div><div className="dns-step-content"><h3>Verify ownership</h3><p>Let us know this domain belongs to you.</p><Badge>TXT record</Badge><div className="dns-field"><label>Name</label><CopyField value="_easyqr-verification.menu.example.com" onCopy={copy}/></div><div className="dns-field"><label>Value</label><CopyField value="easyqr=mock-long-token" onCopy={copy}/></div></div></div><div className="dns-step"><div className="step-counter">2</div><div className="dns-step-content"><h3>Point your domain</h3><p>Connect your domain to your page.</p><Badge>CNAME record</Badge><div className="dns-field"><label>Name</label><CopyField value="menu" onCopy={copy}/></div><div className="dns-field"><label>Value</label><CopyField value="domains.easyqrservice.com" onCopy={copy}/></div></div></div><Button onClick={()=>{setDomain("securing");notify("Mock verification advanced to securing");}}>Check again <ArrowRight size={16}/></Button></div>}
    {domain==="securing"&&<div className="domain-panel"><div className="domain-status-line"><Globe size={20}/><strong>{value}</strong><Badge tone="accent">Securing</Badge></div><div className="domain-checklist"><div><CheckCircle2 size={20}/>Domain ownership verified</div><div><CheckCircle2 size={20}/>DNS connected</div><div><span className="pending-ring"/>Securing connection</div></div><InlineNotice>Usually takes a few minutes. In the UI lab, choose Connected from the controls below.</InlineNotice></div>}
    {domain==="connected"&&<div className="domain-panel"><div className="domain-connected-icon"><ShieldCheck size={28}/></div><h2 className="connected-title">{value}</h2><Badge tone="success">Connected securely</Badge><p className="muted domain-success-text">Your custom domain is ready to share.</p><div className="domain-buttons"><Link className="btn btn-primary btn-md" href="/create/preview">Open domain preview <ArrowUpRight size={16}/></Link><Button variant="secondary" onClick={()=>copy(value)}><Copy size={16}/> Copy domain</Button></div></div>}
    <div className="domain-fallback"><span>YOUR EASYQR LINK</span><CopyField value={business.url} onCopy={copy}/><p>Always available, with or without a custom domain.</p></div>
    <div className="lab-inline-control"><span>UI Lab controls · Domain state</span><SegmentedControl label="Domain demo state" value={domain} onChange={v=>setDomain(v as DomainState)} options={[{id:"empty",label:"Empty"},{id:"waiting",label:"Waiting"},{id:"securing",label:"Securing"},{id:"connected",label:"Connected"}]}/></div></div>
  </>;
}

function OnboardingShell({step,children}:{step:number;children:React.ReactNode}) {
  const steps=["Business","Content","Setup","Design","Preview"];
  return <div className="onboarding-shell"><header className="onboarding-top"><Brand/><Link className="exit-link" href="/dashboard">Exit setup <X size={16}/></Link></header><div className="onboarding-progress"><div className="onboarding-steps">{steps.map((name,i)=><div key={name} className={i===step?"step-current":i<step?"step-complete":""}><span>{i<step?<Check size={13}/>:i+1}</span><span>{name}</span></div>)}</div><div className="progress-track"><div style={{width:`${(step/4)*100}%`}}/></div></div><main className="onboarding-main">{children}</main><footer className="onboarding-footer">EasyQR Product UI V2 · Visual prototype only</footer></div>;
}
function OnboardingBusiness() {
  const [selected,setSelected]=useState("MENU");
  return <OnboardingShell step={0}><div className="onboarding-heading"><div className="eyebrow">STEP 1 OF 5</div><h1>What kind of page are you creating?</h1><p>Choose the closest match. You can edit everything later.</p></div><div className="type-grid">{pageTypes.map(({id,label,description,icon:Icon})=><button key={id} className={`type-card ${selected===id?"is-selected":""}`} aria-pressed={selected===id} onClick={()=>setSelected(id)}><span className="type-icon"><Icon size={24}/></span><strong>{label}</strong><small>{description}</small><span className="type-check">{selected===id?<Check size={14}/>:null}</span></button>)}</div><div className="onboarding-actions"><span>Using <strong>{selected==="SHOP"?"Products":selected[0]+selected.slice(1).toLowerCase()}</strong> as your page type</span><Link className="btn btn-primary btn-lg" href="/create/content">Continue <ArrowRight size={16}/></Link></div></OnboardingShell>;
}
function OnboardingContent() {
  const[name,setName]=useState("Acme Coffee");const[itemName,setItemName]=useState("Cappuccino");const[description,setDescription]=useState("Espresso with silky steamed milk");const[price,setPrice]=useState("4.50");
  return <OnboardingShell step={1}><div className="onboarding-heading"><div className="eyebrow">STEP 2 OF 5</div><h1>Add the good stuff.</h1><p>Start with your business and one menu item. You can add more later.</p></div><div className="onboarding-editor-grid"><div className="onboarding-form"><div className="form-block"><h2>Business details</h2><Input label="Business name" value={name} onChange={e=>setName(e.target.value)}/><Input label="Short description" defaultValue="Your neighborhood coffee spot."/></div><div className="form-block"><h2>First menu item</h2><Input label="Item name" value={itemName} onChange={e=>setItemName(e.target.value)}/><Textarea label="Description" rows={3} value={description} onChange={e=>setDescription(e.target.value)}/><Input label="Price ($)" type="number" min="0" step=".01" value={price} onChange={e=>setPrice(e.target.value)}/></div></div><div className="onboarding-live-example"><div className="preview-eyebrow">LIVE EXAMPLE</div><h3>{name||"Your business"}</h3><span className="preview-item-label">MENU</span><div className="sample-item"><strong>{itemName||"Your first item"}</strong><span>{description||"A short description of your item"}</span><b>${price||"0.00"}</b></div><p>Every great page starts somewhere.</p></div></div><div className="onboarding-actions"><Link href="/create" className="back-link"><ArrowLeft size={17}/> Back</Link><Link href="/create/design" className="btn btn-primary btn-lg">Continue to design <ArrowRight size={16}/></Link></div></OnboardingShell>;
}
function OnboardingDesign() {
  const[selected,setSelected]=useState<DesignName>("Clean");const[device,setDevice]=useState<"mobile"|"desktop">("mobile");const[browse,setBrowse]=useState(false);
  return <OnboardingShell step={3}><div className="onboarding-heading"><div className="eyebrow">STEP 4 OF 5</div><h1>Make it yours.</h1><p>Choose a design that fits. Your content stays the same.</p></div><div className="onboarding-design-grid"><div><div className="onboarding-design-choices">{designNames.map((name,i)=><DesignChoice key={name} name={name} recommended={i===0} selected={selected===name} onSelect={()=>setSelected(name)}/>)}</div><Button variant="ghost" className="browse-button" onClick={()=>setBrowse(true)}>Browse all designs <ArrowRight size={16}/></Button></div><div className="onboarding-design-preview"><div className="preview-workspace-toolbar"><strong>Your page preview</strong><SegmentedControl label="Preview layout" value={device} onChange={v=>setDevice(v as "mobile"|"desktop")} options={[{id:"mobile",label:"Mobile"},{id:"desktop",label:"Desktop"}]}/></div><PreviewStage design={selected} device={device}/></div></div><div className="onboarding-actions"><Link href="/create/content" className="back-link"><ArrowLeft size={17}/> Back</Link><Link href="/create/preview" className="btn btn-primary btn-lg">Continue <ArrowRight size={16}/></Link></div><Dialog open={browse} onClose={()=>setBrowse(false)} title="All designs"><div className="design-modal-grid">{designNames.map(name=><DesignChoice key={name} name={name} selected={selected===name} onSelect={()=>{setSelected(name);setBrowse(false);}}/>)}</div></Dialog></OnboardingShell>;
}
function OnboardingPreview({notify}:{notify:(s:string)=>void}) {
  const[device,setDevice]=useState<"mobile"|"desktop">("mobile");const[published,setPublished]=useState(false);
  return <OnboardingShell step={4}><div className="onboarding-heading preview-heading"><div className="eyebrow">FINAL STEP</div><h1>Your page is ready.</h1><p>This is how customers will see your page.</p></div><div className="final-preview-toolbar"><span>Acme Coffee · Menu page</span><SegmentedControl label="Preview device" value={device} onChange={v=>setDevice(v as "mobile"|"desktop")} options={[{id:"mobile",label:"Mobile"},{id:"desktop",label:"Desktop"}]}/></div><div className="final-preview-stage"><PreviewStage design="Clean" device={device}/></div><div className="final-actions"><div><Link href="/create/content" className="subtle-link">Edit content</Link><Link href="/create/design" className="subtle-link">Change design</Link></div><Button size="lg" onClick={()=>{setPublished(true);notify("Demo only — no page was published");}}>{published?"Preview complete":"Publish this page"} <ArrowRight size={17}/></Button></div>{published&&<InlineNotice>This is a mock publish interaction. No account or public page was created.</InlineNotice>}</OnboardingShell>;
}
function LoginPage() {
  const router=useRouter();const[email,setEmail]=useState("");const[password,setPassword]=useState("");const[hint,setHint]=useState("");
  return <div className="login-shell"><header><Brand/></header><main className="login-main"><div className="login-card"><span className="login-symbol"><span className="brand-symbol"><span/><span/><span/><span/></span></span><h1>Welcome back.</h1><p>Sign in to manage your page.</p><form onSubmit={e=>{e.preventDefault();if(!email||!password){setHint("Enter any email and password to explore the demo.");return;}router.push("/dashboard");}}><Input label="Email" type="email" autoComplete="email" placeholder="you@business.com" value={email} onChange={e=>setEmail(e.target.value)} required/><Input label="Password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required/>{hint&&<p className="login-hint">{hint}</p>}<Button className="login-submit" type="submit" size="lg">Sign in <ArrowRight size={17}/></Button></form><div className="login-signup">New to EasyQR? <Link href="/create">Create a page</Link></div><p className="demo-login-note">Demo sign-in only. No authentication occurs.</p></div></main></div>;
}
function NotFound() {
  return <div className="unknown-route"><h1>Page not found</h1><p>This path is not part of the UI lab.</p><Link href="/dashboard" className="btn btn-primary btn-md">Go to overview <ArrowRight size={16}/></Link></div>;
}

export function LabApp() {
  const pathname=usePathname()||"/dashboard";
  const [saved,setSaved]=useState<DesignName>("Clean");
  const [domain,setDomain]=useState<DomainState>("empty");
  const [empty,setEmpty]=useState(false);
  const [toast,setToast]=useState("");
  const notify=(message:string)=>setToast(message);
  let content:React.ReactNode;
  if(pathname==="/"||pathname==="/dashboard")content=<Overview design={saved}/>;
  else if(pathname==="/dashboard/content")content=<ContentPage notify={notify}/>;
  else if(pathname==="/dashboard/design")content=<DesignPage saved={saved} setSaved={setSaved} notify={notify}/>;
  else if(pathname==="/dashboard/share")content=<SharePage notify={notify}/>;
  else if(pathname==="/dashboard/analytics")content=<AnalyticsPage empty={empty} setEmpty={setEmpty}/>;
  else if(pathname==="/dashboard/domain")content=<DomainPage domain={domain} setDomain={setDomain} notify={notify}/>;
  else if(pathname==="/create")content=<OnboardingBusiness/>;
  else if(pathname==="/create/content")content=<OnboardingContent/>;
  else if(pathname==="/create/design")content=<OnboardingDesign/>;
  else if(pathname==="/create/preview")content=<OnboardingPreview notify={notify}/>;
  else if(pathname==="/login")content=<LoginPage/>;
  else content=<NotFound/>;
  const dashboard=pathname==="/"||pathname.startsWith("/dashboard");
  return <>{dashboard?<AppShell pathname={pathname==="/"?"/dashboard":pathname}>{content}</AppShell>:content}<Toast message={toast} onDismiss={()=>setToast("")}/></>;
}
