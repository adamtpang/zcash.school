/* global React */
const { useState, Fragment } = React;

// ============================================================
// PRIMITIVES
// ============================================================

const Button = ({ variant = "primary", children, icon, onClick, href, style = {} }) => {
  const base = {
    fontFamily: "var(--font-sans)",
    fontWeight: 650,
    fontSize: "0.95rem",
    padding: "0.65rem 1.1rem",
    borderRadius: 6,
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 120ms ease, transform 120ms ease, border-color 120ms ease",
    ...style,
  };
  const variants = {
    primary: { background: "var(--zs-red)", borderColor: "var(--zs-red)", color: "#fff" },
    secondary: { background: "transparent", borderColor: "var(--zs-gray-4)", color: "var(--zs-ink)" },
    minimal: { background: "transparent", borderColor: "transparent", color: "var(--zs-ink)", padding: "0.65rem 0.4rem" },
  };
  const cls = `zs-btn zs-btn-${variant}`;
  return (
    <a className={cls} href={href || "#"} onClick={onClick} style={{ ...base, ...variants[variant] }}>
      {children}
      {icon && <span className="zs-btn-icon" aria-hidden="true">{icon}</span>}
    </a>
  );
};

const Pill = ({ children, tone = "muted" }) => {
  const tones = {
    muted:    { background: "var(--zs-gray-6)", color: "var(--zs-gray-3)" },
    red:      { background: "#FFE3E1",          color: "var(--zs-red-hover)" },
    identity: { background: "var(--zs-black)",  color: "var(--zs-yellow)" },
  };
  return (
    <span style={{
      display: "inline-block",
      padding: ".18rem .6rem",
      borderRadius: 999,
      fontSize: ".75rem",
      letterSpacing: ".04em",
      textTransform: "uppercase",
      fontWeight: 600,
      ...tones[tone],
    }}>{children}</span>
  );
};

// Identity dots — yellow then red, used inline in the wordmark
const IdentityDots = ({ size = ".62rem" }) => (
  <span style={{
    display: "inline-block",
    width: size,
    height: size,
    borderRadius: 3,
    background: "var(--zs-yellow)",
    boxShadow: `calc(${size} * 0.55) 0 0 var(--zs-red)`,
    marginRight: `calc(${size} * 1.4)`,
    verticalAlign: "middle",
  }} aria-hidden="true" />
);

const Wordmark = ({ size = "1.05rem" }) => (
  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em", fontSize: size, color: "var(--zs-ink)" }}>
    <IdentityDots />
    zcash.school
  </span>
);

// ============================================================
// HEADER + SIDEBAR + RIGHT RAIL
// ============================================================

const Header = ({ active, onNav }) => {
  const nav = [
    { id: "splash",  label: "Course" },
    { id: "lesson",  label: "Module 1" },
    { id: "ns",      label: "Network School" },
    { id: "team",    label: "Team" },
  ];
  return (
    <header className="zs-header">
      <div className="zs-header-inner">
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("splash"); }} className="zs-wordmark-link">
          <Wordmark />
        </a>
        <nav className="zs-topnav">
          {nav.map((n) => (
            <a key={n.id} href="#" onClick={(e) => { e.preventDefault(); onNav(n.id); }}
               className={active === n.id ? "active" : ""}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="zs-header-right">
          <button className="zs-search">
            <Icon name="search" size={14} /> <span>Search</span>
            <kbd>⌘ K</kbd>
          </button>
          <a href="#" className="zs-icon-link" aria-label="GitHub"><Icon name="github" size={16} /></a>
          <a href="#" className="zs-icon-link" aria-label="Discord"><Icon name="message-circle" size={16} /></a>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ activeSlug = "intro/why-privacy", onNav }) => {
  const groups = [
    { label: "Start Here", items: [{ label: "Welcome", slug: "home" }] },
    { label: "Network School", items: [
      { label: "ZNS landing", slug: "ns" },
      { label: "Get a wallet in 60s", slug: "start" },
      { label: "Claim airdrop ($5 ZEC + newsletter)", slug: "airdrops" },
      { label: "Accept Zcash (merchants)", slug: "merchants" },
      { label: "Team & sister projects", slug: "team" },
    ]},
    { label: "1. Why Privacy Matters", items: [
      { label: "Why privacy matters", slug: "intro/why-privacy" },
      { label: "Bitcoin transparency problem", slug: "intro/bitcoin-transparency-problem" },
      { label: "The Zcash thesis", slug: "intro/the-zcash-thesis" },
    ]},
    { label: "2. Zero-Knowledge Proofs", items: [
      { label: "Intuition", slug: "zk/intuition" },
      { label: "zk-SNARKs", slug: "zk/zk-snarks" },
      { label: "Trusted setups & Halo 2", slug: "zk/trusted-setups-and-halo" },
    ]},
    { label: "3. How Zcash Works", items: [
      { label: "Addresses", slug: "protocol/addresses" },
      { label: "Pools and shielding", slug: "protocol/pools-and-shielding" },
      { label: "Notes and nullifiers", slug: "protocol/notes-and-nullifiers" },
      { label: "Orchard and Halo 2", slug: "protocol/orchard-and-halo2" },
      { label: "Project Tachyon", slug: "protocol/project-tachyon" },
    ]},
    { label: "4. Using Zcash", items: [
      { label: "Wallets", slug: "using/wallets" },
      { label: "Your first shielded tx", slug: "using/your-first-shielded-tx" },
      { label: "Selective disclosure", slug: "using/selective-disclosure" },
      { label: "Merchants", slug: "using/merchants" },
    ]},
    { label: "5. Ecosystem & Economics", items: [
      { label: "The three orgs", slug: "ecosystem/the-three-orgs" },
      { label: "ZIPs and upgrades", slug: "ecosystem/zips-and-upgrades" },
      { label: "Supply and halvings", slug: "ecosystem/supply-and-halvings" },
    ]},
  ];
  return (
    <aside className="zs-sidebar">
      {groups.map((g) => (
        <div key={g.label} className="zs-sidebar-group">
          <div className="zs-sidebar-label">{g.label}</div>
          <ul>
            {g.items.map((it) => (
              <li key={it.slug}>
                <a href="#" onClick={(e) => { e.preventDefault(); onNav && onNav(it.slug); }}
                   aria-current={activeSlug === it.slug ? "page" : undefined}>
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

const RightRail = ({ items = [] }) => (
  <aside className="zs-right-rail">
    <div className="zs-right-rail-panel">
      <div className="zs-rr-heading">On this page</div>
      <ul>
        {items.map((it, i) => (
          <li key={i} className={`level-${it.level || 2} ${it.active ? "active" : ""}`}>
            <a href="#">{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

// ============================================================
// CONTENT BLOCKS
// ============================================================

const Hero = ({ title, accent, after, tagline, children, big = true }) => (
  <section className="zs-hero">
    <h1 className={big ? "zs-hero-display" : "zs-hero-h1"}>
      {title}
      {accent && <span className="accent">{accent}</span>}
      {after}
    </h1>
    {tagline && <p className="zs-hero-tagline">{tagline}</p>}
    {children && <div className="zs-hero-actions">{children}</div>}
  </section>
);

const CardGrid = ({ children, stagger = false, cta = false }) => (
  <div className={`zs-cardgrid ${stagger ? "stagger" : ""} ${cta ? "cta-grid" : ""}`}>
    {children}
  </div>
);

const LinkCard = ({ title, description, onClick }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} className="zs-linkcard">
    <div className="zs-linkcard-title">{title} <span className="zs-linkcard-arrow">→</span></div>
    <div className="zs-linkcard-desc">{description}</div>
  </a>
);

const Card = ({ title, icon, children }) => (
  <div className="zs-card">
    {icon && <div className="zs-card-icon"><Icon name={icon} size={22} /></div>}
    <div className="zs-card-title">{title}</div>
    <div className="zs-card-body">{children}</div>
  </div>
);

const Aside = ({ type = "tip", title, children }) => {
  const palettes = {
    tip:     { bg: "#FBF3E4", border: "#FFE39A", color: "var(--zs-ink)",       icon: "lightbulb",    iconColor: "#B8870B" },
    note:    { bg: "#F6F7FA", border: "#D4D7DF", color: "var(--zs-ink)",       icon: "info",         iconColor: "var(--zs-gray-2)" },
    caution: { bg: "#FFEDEB", border: "#FFD1CF", color: "var(--zs-red-hover)", icon: "alert-triangle", iconColor: "var(--zs-red)" },
  };
  const p = palettes[type] || palettes.tip;
  return (
    <div className="zs-aside" style={{ background: p.bg, borderColor: p.border }}>
      <div className="zs-aside-title" style={{ color: p.color }}>
        <span style={{ color: p.iconColor }}><Icon name={p.icon} size={16} /></span> {title}
      </div>
      <div className="zs-aside-body">{children}</div>
    </div>
  );
};

const Epigraph = ({ children }) => (
  <blockquote className="zs-epigraph">{children}</blockquote>
);

// ============================================================
// TEAM
// ============================================================

const TeamTile = ({ initials, name, role }) => (
  <li className="zs-team-tile">
    <div className="zs-team-avatar">{initials}</div>
    <span className="zs-team-name">{name}</span>
    <span className="zs-team-role">{role}</span>
  </li>
);

const TeamGrid = ({ children }) => <ul className="zs-team-grid">{children}</ul>;

// ============================================================
// ICONS — Lucide via CDN (substituted for Starlight's set; see README)
// ============================================================
const ICONS = {
  "shield-check":   '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  "puzzle":         '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.851-.953a1.95 1.95 0 0 0-1.939-1.738 1.95 1.95 0 0 0-1.738 1.938c.001.473-.331.886-.802.952a.98.98 0 0 1-.837-.276L10.18 13.7a.95.95 0 0 0-.879-.288 1.95 1.95 0 0 1-1.738-1.938 1.95 1.95 0 0 1 1.738-1.938.95.95 0 0 0 .879-.288l1.5-1.5a.95.95 0 0 0 .276-.836A1.95 1.95 0 0 1 13.85 5.16a1.95 1.95 0 0 1 1.938 1.738c.067.471.48.804.953.802a1.95 1.95 0 0 1 1.938 1.938c.001.473.332.886.802.953z"/>',
  "rocket":         '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  "lock":           '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  "search":         '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "github":         '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  "lightbulb":      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  "info":           '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  "alert-triangle": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  "arrow-right":    '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "external":       '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  "qr-code":        '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
  "wallet":         '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  "calendar":       '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  "graduation-cap": '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  "store":          '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>',
  "coins":          '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  "smartphone":     '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
};

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 2 }) => {
  const path = ICONS[name];
  if (!path) return <span style={{ display: "inline-block", width: size, height: size, background: "#eee", borderRadius: 3 }} title={`missing icon: ${name}`} />;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         dangerouslySetInnerHTML={{ __html: path }} />
  );
};

// ============================================================
// FRAME — the zebra-bg + white editorial card scaffold
// ============================================================

const Frame = ({ header, sidebar, rightRail, children, splash = false }) => (
  <div className="zs-frame">
    <div className="zs-frame-bg" aria-hidden="true"></div>
    {header}
    <div className={`zs-frame-layout ${splash ? "splash" : ""}`}>
      {sidebar && <div className="zs-sidebar-wrap">{sidebar}</div>}
      <main className="zs-main-pane">{children}</main>
      {rightRail && <div className="zs-right-rail-wrap">{rightRail}</div>}
    </div>
  </div>
);

// Export to window
Object.assign(window, {
  Button, Pill, IdentityDots, Wordmark,
  Header, Sidebar, RightRail,
  Hero, CardGrid, LinkCard, Card, Aside, Epigraph,
  TeamTile, TeamGrid,
  Icon, Frame,
});
