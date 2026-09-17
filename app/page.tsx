import AuthDemo from "./ui/AuthDemo";

export default function Home() {
  return (
    <main>
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />

      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Pulse Chat home">
          <span className="brandMark" aria-hidden="true">P</span>
          <span>PULSE CHAT</span>
        </a>
        <span className="liveBadge"><i /> Local workspace</span>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span>24</span> Messages that move with you</div>
        <h1>Your people.<br /><em>One conversation.</em></h1>
        <p className="intro">
          A focused space for quick messages, shared ideas, and conversations that stay
          in sync from hello to done.
        </p>
      </section>

      <section className="workspace" aria-label="Pulse Chat local preview">
        <div className="lessonPanel">
          <div className="panelLabel">ACTIVE CHANNEL</div>
          <h2>Welcome to #general</h2>
          <ol className="steps">
            <li><span>1</span><div><strong>Start together</strong><p>Bring the whole group into one calm, shared conversation.</p></div></li>
            <li><span>2</span><div><strong>Stay in context</strong><p>Keep replies, decisions, and updates easy to follow.</p></div></li>
            <li><span>3</span><div><strong>Move forward</strong><p>Turn quick messages into clear next steps for everyone.</p></div></li>
          </ol>
          <div className="takeaway">
            <span aria-hidden="true">#</span>
            <p><strong>Workspace note</strong> This is a local interface preview. Enter test details to open the demo conversation.</p>
          </div>
        </div>

        <AuthDemo />
      </section>

      <section className="facts" aria-label="Chat platform features">
        <article><span>24</span><div><strong>Always connected</strong><p>Keep conversations flowing across your workspace.</p></div></article>
        <article><span>##</span><div><strong>Focused channels</strong><p>Give every topic a clear place to live.</p></div></article>
        <article><span>@</span><div><strong>Fast replies</strong><p>Share an update and keep the whole team moving.</p></div></article>
      </section>

      <footer>
        <p>PULSE CHAT / LOCAL INTERFACE PREVIEW</p>
        <p>Generic demonstration platform / Not affiliated with any messaging provider</p>
      </footer>
    </main>
  );
}
