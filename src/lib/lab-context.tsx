"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { initialItems, type MenuItem, type DomainState } from "./mock-data";
type LabContextValue = {
  items: MenuItem[];
  setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  savedDesign: string;
  setSavedDesign: (v: string) => void;
  plan: string;
  setPlan: (v: string) => void;
  live: boolean;
  setLive: (v: boolean) => void;
  zero: boolean;
  setZero: (v: boolean) => void;
  domain: DomainState;
  setDomain: (v: DomainState) => void;
  domainName: string;
  setDomainName: (v: string) => void;
  pageType: string;
  setPageType: (v: string) => void;
  businessName: string;
  setBusinessName: (v: string) => void;
  businessAddress: string;
  setBusinessAddress: (v: string) => void;
  toast: string;
  notify: (message: string) => void;
  dismissToast: () => void;
};
const LabContext = createContext<LabContextValue | null>(null);
export function LabProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState(initialItems);
  const [savedDesign, setSavedDesign] = useState("Clean");
  const [plan, setPlan] = useState("Pilot Premium");
  const [live, setLive] = useState(true);
  const [zero, setZero] = useState(false);
  const [domain, setDomain] = useState<DomainState>("Empty");
  const [domainName, setDomainName] = useState("menu.example.com");
  const [pageType, setPageType] = useState("Menu");
  const [businessName, setBusinessName] = useState("Acme Coffee");
  const [businessAddress, setBusinessAddress] = useState("24 Willow Street");
  const [toast, setToast] = useState("");
  const notify = useCallback((message: string) => setToast(message), []);
  return (
    <LabContext.Provider
      value={{
        items,
        setItems,
        savedDesign,
        setSavedDesign,
        plan,
        setPlan,
        live,
        setLive,
        zero,
        setZero,
        domain,
        setDomain,
        domainName,
        setDomainName,
        pageType,
        setPageType,
        businessName,
        setBusinessName,
        businessAddress,
        setBusinessAddress,
        toast,
        notify,
        dismissToast: () => setToast(""),
      }}
    >
      {children}
    </LabContext.Provider>
  );
}
export function useLab() {
  const context = useContext(LabContext);
  if (!context) throw new Error("LabProvider is required");
  return context;
}
