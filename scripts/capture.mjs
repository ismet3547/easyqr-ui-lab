import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const output = process.env.CAPTURE_DIR || "screenshots";
await mkdir(output,{recursive:true});
const browser = await chromium.launch({headless:true});
const routes = [
  "/dashboard","/dashboard/content","/dashboard/design","/dashboard/share",
  "/dashboard/analytics","/dashboard/domain","/create","/create/content",
  "/create/design","/create/preview","/login"
];
const files = [];
const errorLog = [];
for(const [name,width,height] of [["desktop",1440,900],["wide",1100,900],["tablet",768,900],["mobile",390,844],["small",320,720]]) {
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  page.on("pageerror",error=>errorLog.push(name+": "+error.message));
  const take=async (path,label)=>{
    await page.goto(base+path,{waitUntil:"domcontentloaded"});
    await page.locator("h1").first().waitFor({timeout:20000});
    await page.waitForTimeout(350);
    const bounds=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    assert(bounds.scroll<=bounds.client+1,`Horizontal overflow at ${name} ${path}: ${JSON.stringify(bounds)}`);
    if(label){
      const file=`${output}/${name}-${label}.png`;
      await page.screenshot({path:file,fullPage:true,animations:"disabled"});
      files.push(file);
    }
  };
  for(const route of routes)await take(route,null);
  if(name==="desktop"){
    for(const [path,label] of [
      ["/dashboard","overview"],["/dashboard/content","content"],["/dashboard/design","design"],
      ["/dashboard/share","share"],["/dashboard/analytics","analytics"],
      ["/create","onboarding-business"],["/create/design","onboarding-design"],
      ["/create/preview","final-preview"],["/login","login"]
    ])await take(path,label);
    await take("/dashboard/content",null);
    await page.locator(".resource-row").first().click();
    await page.getByRole("dialog",{name:"Edit menu item"}).waitFor();
    await page.screenshot({path:`${output}/desktop-content-drawer.png`,fullPage:false});
    files.push(`${output}/desktop-content-drawer.png`);
    await take("/dashboard/domain",null);
    await page.getByRole("group",{name:"Domain demo state"}).getByRole("button",{name:"Waiting"}).click();
    await page.screenshot({path:`${output}/desktop-domain-waiting.png`,fullPage:true});
    files.push(`${output}/desktop-domain-waiting.png`);
    await page.getByRole("group",{name:"Domain demo state"}).getByRole("button",{name:"Connected"}).click();
    await page.screenshot({path:`${output}/desktop-domain-connected.png`,fullPage:true});
    files.push(`${output}/desktop-domain-connected.png`);
  }
  if(name==="tablet"){
    for(const [path,label] of [["/dashboard","overview"],["/dashboard/content","content"],["/dashboard/design","design"]])await take(path,label);
  }
  if(name==="mobile"){
    for(const [path,label] of [
      ["/dashboard","overview"],["/dashboard/content","content"],["/dashboard/design","design"],
      ["/dashboard/share","share"],["/dashboard/domain","domain"],["/create/design","onboarding-design"]
    ])await take(path,label);
    await take("/dashboard/content",null);
    await page.locator(".resource-row").first().click();
    await page.getByRole("dialog",{name:"Edit menu item"}).waitFor();
    await page.screenshot({path:`${output}/mobile-content-editor.png`,fullPage:false});
    files.push(`${output}/mobile-content-editor.png`);
  }
  await page.close();
}
assert.equal(errorLog.length,0,"Browser errors: "+errorLog.join("; "));
console.log("PASS: "+routes.length+" routes checked at 320/390/768/1100/1440px");
console.log("PASS: no horizontal overflow, "+files.length+" screenshots captured");
await browser.close();
