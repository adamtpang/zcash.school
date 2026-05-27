/* ui_kits/zcash-school/screens.jsx — page-level screens */
/* global React, Frame, Header, Sidebar, RightRail, Hero, CardGrid, LinkCard,
          Card, Aside, Epigraph, Button, TeamGrid, TeamTile, Icon, Wordmark */

const SplashScreen = ({ onNav }) => (
  <Frame
    header={<Header active="splash" onNav={onNav} />}
    splash
  >
    <Hero
      title="zcash"
      accent="."
      after="school"
      tagline="Private money, explained from scratch. Enrollment is open, attendance is anonymous."
    >
      <Button variant="primary" icon={<Icon name="arrow-right" size={14} />}
              onClick={() => onNav("lesson")}>Start Learning</Button>
      <Button variant="minimal" icon={<Icon name="external" size={14} />}
              onClick={() => onNav("lesson")}>Skip to Using Zcash</Button>
    </Hero>

    <CardGrid cta>
      <LinkCard
        title="🛡️ At Network School? Start here"
        description="Scanned a banner QR? Get a wallet in 60s, find the next event, meet the team."
        onClick={() => onNav("ns")}
      />
      <LinkCard
        title="🪙 Claim $5 in ZEC + the newsletter"
        description="One short form: your u1 address and your email. ZEC within 24h. We email when the shielded newsletter ships."
        onClick={() => onNav("ns")}
      />
    </CardGrid>

    <CardGrid stagger>
      <Card title="Why Privacy" icon="lock">
        <p>Cash was always private. A public ledger flipped that default. If your money has a leaderboard, it isn't yours.</p>
        <p><a href="#" onClick={(e) => { e.preventDefault(); onNav("lesson"); }}>Read the chapter →</a></p>
      </Card>
      <Card title="How ZK Works" icon="puzzle">
        <p>Zero-knowledge proofs let you prove a statement is true without revealing why. Chainalysis hates this one weird trick.</p>
        <p><a href="#" onClick={(e) => e.preventDefault()}>Read the chapter →</a></p>
      </Card>
      <Card title="Your First Shielded Tx" icon="rocket">
        <p>Pick a wallet, get a unified address, and shield every last ZEC. Concrete steps, no jargon.</p>
        <p><a href="#" onClick={(e) => e.preventDefault()}>Read the chapter →</a></p>
      </Card>
    </CardGrid>

    <h2>Syllabus</h2>
    <p style={{ color: "var(--zs-gray-2)", fontStyle: "italic", marginTop: "-.25rem" }}>
      Completeness. Soundness. Zero-knowledge. Vibes.
    </p>
    <p>
      This is a free, opinionated, end-to-end course in <strong>Zcash</strong>: the
      privacy-preserving cryptocurrency that uses zero-knowledge proofs to keep
      transaction amounts and parties private by default. We assume nothing.
      By the end you'll understand:
    </p>
    <ul>
      <li>Why financial privacy matters and what Bitcoin gave up</li>
      <li>How zero-knowledge proofs work, including zk-SNARKs and the trustless <strong>Halo 2</strong> system</li>
      <li>How Zcash structures addresses, pools, notes, and nullifiers, and where it's headed with <strong>Project Tachyon</strong></li>
      <li>How to actually use Zcash, wallets, shielded transactions, selective disclosure, and accepting it in your business</li>
      <li>The orgs, governance process, and economics of the network</li>
    </ul>

    <h2>Who this is for</h2>
    <p>
      Curious newcomers, Bitcoin holders who looked at their public balance and felt
      weird, developers who want a solid mental model before reading the spec,
      journalists or policy folks who need accurate primary-source material on
      how shielded money works, and anyone who has ever typed the words
      "encrypted Bitcoin" in a chat and meant it as a compliment.
    </p>

    <Aside type="tip" title="Homework">
      <p>Shield every last ZEC.</p>
    </Aside>

    <div className="zs-site-footer-note">
      An independent educational project, supported by a Zcash Foundation community
      grant under the <strong>Zcash Network School</strong>. Not affiliated with the
      Electric Coin Company or the Zcash Foundation. Content links to primary
      sources where possible. Tuition free, knowledge zero.
    </div>
  </Frame>
);

const LessonScreen = ({ onNav }) => {
  const toc = [
    { label: "Privacy is the historical default", level: 2, active: true },
    { label: "What a transparent ledger exposes", level: 2 },
    { label: "Salary visibility",                 level: 3 },
    { label: "Donations as opposition research",  level: 3 },
    { label: "The Cypherpunk framing",            level: 2 },
    { label: "The lineage from PGP to Zcash",     level: 2 },
    { label: "Privacy ≠ illicit",                 level: 2 },
    { label: "Where this leaves us",              level: 2 },
  ];
  return (
    <Frame
      header={<Header active="lesson" onNav={onNav} />}
      sidebar={<Sidebar activeSlug="intro/why-privacy" onNav={(s) => { if (s === "team") onNav("team"); if (s === "ns") onNav("ns"); }} />}
      rightRail={<RightRail items={toc} />}
    >
      <span className="zs-last-reviewed">Last reviewed: 2026-05-11</span>
      <h1 style={{ marginTop: 0, fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em", fontFamily: "var(--font-display)", lineHeight: 1.1 }}>
        Why Privacy Matters
      </h1>

      <Epigraph>"Transparent chains are just public diaries with extra steps."</Epigraph>

      <p>
        For most of human history, money was private by default. You handed someone
        a coin and the transaction left no public record. Cash, in this sense, is
        the single best privacy technology we ever invented for value transfer,
        and Bitcoin, despite its many virtues, accidentally rolled that property
        back.
      </p>
      <p>
        This chapter is about why getting privacy back is worth the engineering
        effort the rest of this course will explain.
      </p>

      <h2>Privacy is the historical default</h2>
      <p>
        Before talking about cryptocurrency, take a moment to notice what financial
        privacy used to feel like. When you bought groceries with cash, the cashier
        didn't know your name, your bank balance, or what you bought last week. The
        store didn't either. Neither did your employer, your ex, your government,
        or the person standing behind you in line.
      </p>
      <p>That privacy wasn't a special feature. It was just how money worked.</p>

      <h2>What a transparent ledger actually exposes</h2>
      <p>
        On a transparent chain like Bitcoin's, anyone with an internet connection
        can see every transaction that ever happened, amounts, timestamps, and
        the addresses involved. "Pseudonymous" sounds reassuring, but in practice
        pseudonyms collapse into identities the moment you cash out, post a
        donation address, or reuse the same wallet twice.
      </p>
      <p>Some concrete chilling effects of a transparent ledger:</p>
      <ul>
        <li><strong>Salary visibility.</strong> If your employer pays you in BTC
          and you ever spend any of it, your employer learns approximately how
          much you've saved, what you spend on, and when you sold.</li>
        <li><strong>Asymmetric knowledge in relationships.</strong> A partner, ex,
          family member, or stalker who learns <em>one</em> of your addresses can
          watch your spending forever. They don't need a warrant.</li>
        <li><strong>Donations as opposition research.</strong> Activists,
          journalists, and whistleblowers who accept public donations broadcast
          every contributor's wallet.</li>
        <li><strong>Permanent retroactive exposure.</strong> Privacy you "had"
          today can evaporate tomorrow if a future deanonymization tool links
          yesterday's transactions to your name. The ledger is forever.</li>
      </ul>
      <p>
        None of this requires illegal behavior. None of it requires you to be
        "interesting." The ledger doesn't care.
      </p>

      <Aside type="tip" title="Key takeaways">
        <ul>
          <li><strong>Cash was the original privacy technology.</strong> Public blockchains are a historical anomaly, not a baseline.</li>
          <li><strong>A transparent ledger is forever.</strong> Privacy you have today can be undone by a future tool that links your wallet to your identity.</li>
          <li><strong>Privacy ≠ secrecy ≠ crime.</strong> Privacy is the power to selectively reveal yourself.</li>
          <li><strong>Privacy is normal.</strong> The weird part is that we ever let it become optional.</li>
        </ul>
      </Aside>

      <Aside type="caution" title="Whoever has the seed has the money">
        <p>There is no support line, no "forgot password," no recovery email. The
        seed is the wallet. If you skip the backup step to save 30 seconds,
        you're going to lose money. Don't.</p>
      </Aside>
    </Frame>
  );
};

const NSScreen = ({ onNav }) => (
  <Frame
    header={<Header active="ns" onNav={onNav} />}
    splash
  >
    <Hero
      title="Zcash at "
      accent="Network School"
      tagline="Private money, on campus. Scan a banner, get a wallet, get $5."
    >
      <Button variant="primary" icon={<Icon name="arrow-right" size={14} />}>Claim $5 in ZEC + newsletter</Button>
      <Button variant="secondary" icon={<Icon name="external" size={14} />}>Get a wallet in 60s</Button>
      <Button variant="minimal" icon={<Icon name="external" size={14} />}>Accept Zcash at your business</Button>
    </Hero>

    <Epigraph>"Enrollment is open. Attendance is anonymous."</Epigraph>

    <h2>What this is</h2>
    <p>
      <strong>Zcash Network School (ZNS)</strong> is a 90-day Zcash Foundation–funded
      program running at <a href="#">Network School</a> in Malaysia, May through
      July 2026. The deliverables: 6 educational events, 12 office hours,
      100 wallet activations, 4 merchant POS installs, and 3 monthly forum
      reports back to the foundation.
    </p>

    <h2>Get started</h2>
    <CardGrid>
      <LinkCard
        title="🪙 Get $5 in ZEC at the next event"
        description="Install Zashi/Zodl, generate a shielded address, show up to an event or office hours, claim your $5."
      />
      <LinkCard
        title="📱 Get a private wallet in 60 seconds"
        description="Step-by-step: install Zashi/Zodl, back up your seed, find your u1... address. That's it."
      />
      <LinkCard
        title="🛍️ I run a business at NS"
        description="Accept Zcash at your café, food stall, or service business. Free 15-min setup with Adam."
      />
      <LinkCard
        title="🎓 I want the full course"
        description="Why privacy matters, how zero-knowledge proofs work, how Zcash actually works under the hood."
        onClick={() => onNav("lesson")}
      />
    </CardGrid>

    <h2>Schedule</h2>
    <div className="zs-schedule">
      {[
        { date: "May 14",  title: "Kickoff: Why privacy matters",         loc: "Black Box, NS Forest City" },
        { date: "May 21",  title: "ZK proofs from scratch",                loc: "Black Box, NS Forest City" },
        { date: "May 28",  title: "Office hours · wallet debugging",       loc: "Library, NS Forest City" },
        { date: "Jun 04",  title: "Your first shielded transaction (lab)", loc: "Black Box, NS Forest City" },
        { date: "Jun 18",  title: "Merchant onboarding workshop",          loc: "F&B corridor, NS Forest City" },
      ].map((row) => (
        <div className="zs-schedule-row" key={row.title}>
          <span className="zs-schedule-date">{row.date}</span>
          <div>
            <div className="zs-schedule-title">{row.title}</div>
            <div className="zs-schedule-loc">{row.loc}</div>
          </div>
          <Button variant="secondary" style={{ padding: ".4rem .75rem", fontSize: ".82rem" }}>RSVP</Button>
        </div>
      ))}
    </div>

    <Aside type="tip" title="Can't make an event?">
      <p>Office hours are drop-in. If neither time works, message the team
      through the grant forum thread and we'll find another window.</p>
    </Aside>
  </Frame>
);

const TeamScreen = ({ onNav }) => (
  <Frame
    header={<Header active="team" onNav={onNav} />}
    sidebar={<Sidebar activeSlug="team" onNav={(s) => { if (s === "ns") onNav("ns"); if (s.startsWith("intro/")) onNav("lesson"); }} />}
  >
    <h1 style={{ marginTop: 0, fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em", fontFamily: "var(--font-display)" }}>
      Team & Sister Projects
    </h1>
    <Epigraph>"Not anonymous. Accountability matters for a grant-funded program."</Epigraph>

    <p>
      This site is one piece of the <strong>Zcash Network School (ZNS)</strong>:
      a 90-day Zcash Foundation–funded program at Network School in Malaysia.
      Privacy is for your money, not for who's spending the grant. Here's the
      team and the sibling projects we build alongside.
    </p>

    <h2>The team</h2>
    <TeamGrid>
      <TeamTile initials="AF" name="Andre Froes"   role="Program lead, ZNS structure & foundation reporting" />
      <TeamTile initials="JJ" name="James Joseph"  role="Direction" />
      <TeamTile initials="KD" name="Keiara Desouza" role="Execution" />
      <TeamTile initials="SM" name="Souvik Mishra" role="Execution" />
      <TeamTile initials="A"  name="Adam"           role="Events, vendor onboarding & this site (zcash.school)" />
    </TeamGrid>

    <Aside type="tip" title="Where to go next">
      <ul>
        <li>New to Zcash entirely? Start at <a href="#">/start</a>.</li>
        <li>Want the full picture? Work through <a href="#" onClick={(e) => { e.preventDefault(); onNav("lesson"); }}>Module 1 →</a></li>
        <li>At Network School in person? <a href="#" onClick={(e) => { e.preventDefault(); onNav("ns"); }}>/ns</a> has the schedule and the $5 ZEC claim.</li>
      </ul>
    </Aside>
  </Frame>
);

Object.assign(window, { SplashScreen, LessonScreen, NSScreen, TeamScreen });
