import React from "react";
import "@rhds/elements/rh-footer/rh-footer-lightdom.css";
import { FooterCopyright } from "@rhds/elements/react/rh-footer/rh-footer-copyright.js";
import { FooterUniversal } from "@rhds/elements/react/rh-footer/rh-footer-universal.js";

const LINKS = [
  { label: "Link A", href: "#" },
  { label: "Link B", href: "#" },
];

export function UniversalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hb-universal-footer">
      <FooterUniversal slot="universal">
        <FooterCopyright slot="links-secondary">
          © {year} Demo Co.
        </FooterCopyright>
        <ul slot="links-primary">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </FooterUniversal>
    </footer>
  );
}
