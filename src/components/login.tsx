"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { Logo } from "./app-shell";
import { Button, ButtonLink, Input, IconButton, Dialog } from "./ui";
export default function Login() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className="login-page">
      <div className="login-brand">
        <Logo />
      </div>
      <main className="login-form-wrap">
        <span className="eyebrow">Your business, a little closer</span>
        <h1>Welcome back.</h1>
        <p>Sign in to manage your page.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@yourbusiness.com"
            required
            autoComplete="off"
          />
          <div className="password-field">
            <Input
              label="Password"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
            <IconButton
              type="button"
              label={show ? "Hide password" : "Show password"}
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </IconButton>
          </div>
          <Button type="submit">
            Sign in
            <ArrowRight size={15} />
          </Button>
        </form>
        <div className="login-create">
          <span>New to EasyQR?</span>
          <Link href="/create">
            Create a page
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="login-lab-note">
          Visual prototype · No real account needed
        </div>
      </main>
      <footer className="login-footer">A small page. A big welcome.</footer>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Welcome to the visual lab"
        footer={
          <ButtonLink href="/dashboard" variant="primary">
            Explore the workspace
            <ArrowRight size={15} />
          </ButtonLink>
        }
      >
        <p className="muted">
          Sign-in is a visual demo. Your details haven’t been sent or saved.
        </p>
      </Dialog>
    </div>
  );
}
