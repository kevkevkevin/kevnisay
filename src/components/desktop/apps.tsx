import { useMemo, useState, type ReactNode } from "react";
import {
  ARTICLES,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILLS,
  SOCIALS,
  projectById,
  type Project,
} from "@/data/portfolio";
import { useDesktop, type AppId, type WinInst } from "@/lib/desktop-store";
import {
  IconComputer,
  IconDocuments,
  IconDrive,
  IconFolder,
  IconHtml,
  IconMail,
  IconNetwork,
  IconNotepad,
  IconRecycle,
  IconUser,
  WindowsFlag,
} from "@/components/win98/icons";
import { MenuBar, WindowFrame } from "./window-frame";

function FileMenu() {
  return <MenuBar items={["File", "Edit", "View", "Help"]} />;
}

function ProjectThumb({ project, tall }: { project: Project; tall?: boolean }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.name}
        className={tall ? "project-hero" : "h-24 w-full object-cover"}
        style={tall ? undefined : { height: 96, width: "100%", objectFit: "cover" }}
      />
    );
  }
  return <div className="placeholder-shot">{project.name}</div>;
}

function WelcomeBody() {
  const { closeWin, openApp, windows } = useDesktop();
  const self = windows.find((w) => w.app === "welcome");
  return (
    <div style={{ padding: 16, display: "flex", gap: 16 }}>
      <div>
        <WindowsFlag size={48} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>
          Welcome to Kevin OS 98
        </p>
        <p style={{ margin: "0 0 12px", lineHeight: 1.45 }}>
          {PROFILE.tagline}
        </p>
        <p style={{ margin: "0 0 16px" }}>
          Double-click an icon, or use the Start menu. This desktop is a
          portfolio — everything opens in a window, like 1998 never ended.
        </p>
        <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <input type="checkbox" defaultChecked />
          Show this Welcome Screen next time you start Windows
        </label>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" className="w98-btn" onClick={() => openApp("about")}>
            About Kevin
          </button>
          <button
            type="button"
            className="w98-btn is-default"
            onClick={() => self && closeWin(self.id)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutBody() {
  const { openApp } = useDesktop();
  const [play, setPlay] = useState(false);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 280 }}>
        <div className="w98-sunken" style={{ margin: 8, overflow: "hidden", background: "#111", height: 280, display: "flex", alignItems: "flex-start" }}>
          <img
            src={PROFILE.portrait}
            alt={PROFILE.name}
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top" }}
          />
        </div>
        <div style={{ padding: 12 }}>
          <p style={{ fontSize: 11, letterSpacing: 1, margin: 0 }}>HELLO, I'M</p>
          <h2 style={{ fontSize: 22, margin: "4px 0 8px" }}>{PROFILE.name}</h2>
          <p style={{ margin: "0 0 8px", fontWeight: 700 }}>{PROFILE.title}</p>
          <p style={{ margin: "0 0 8px", lineHeight: 1.45 }}>{PROFILE.aboutLead}</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>{PROFILE.aboutBody}</p>
        </div>
      </div>
      {play ? (
        <div className="media-stage">
          <video src={PROFILE.video} controls autoPlay preload="metadata" poster={PROFILE.portrait} />
        </div>
      ) : (
        <div style={{ padding: "8px 12px" }}>
          <button type="button" className="w98-btn" onClick={() => setPlay(true)}>
            Want to know more? Play intro
          </button>
        </div>
      )}
      <div style={{ padding: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button type="button" className="w98-btn" onClick={() => openApp("resume")}>
          Open Resume.txt
        </button>
        <button type="button" className="w98-btn is-default" onClick={() => openApp("contact")}>
          Contact
        </button>
      </div>
    </div>
  );
}

function ProjectsBody() {
  const { openApp } = useDesktop();
  const [tab, setTab] = useState<"latest" | "archive" | "games">("latest");
  const rows = PROJECTS.filter((p) => p.category === tab);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="explorer-toolbar">
        {(["latest", "archive", "games"] as const).map((t) => (
          <button
            key={t}
            type="button"
            className="w98-btn"
            onClick={() => setTab(t)}
            style={tab === t ? { boxShadow: "var(--shadow-sunken)" } : undefined}
          >
            {t === "latest" ? "Latest" : t === "archive" ? "Previous Works" : "Games"}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11 }}>{rows.length} object(s)</span>
      </div>
      <div className="w98-sunken" style={{ margin: 6, flex: 1, overflow: "auto", background: "#fff" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20px 1.6fr 1.2fr 90px",
            gap: 8,
            padding: "4px 8px",
            background: "#c0c0c0",
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          <span />
          <span>Name</span>
          <span>Type</span>
          <span>Action</span>
        </div>
        {rows.map((p) => (
          <button
            key={p.id}
            type="button"
            className="list-row"
            onDoubleClick={() => openApp("project", p.id)}
            onClick={() => openApp("project", p.id)}
          >
            <IconHtml size={16} />
            <span>{p.name}</span>
            <span>{p.tags.join(" · ")}</span>
            <span>Open</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectBody({ id }: { id?: string }) {
  const project = id ? projectById(id) : undefined;
  if (!project) {
    return <p style={{ padding: 16 }}>File not found.</p>;
  }
  return (
    <div>
      <ProjectThumb project={project} tall />
      <div style={{ padding: 14 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>{project.name}</h3>
        <p style={{ margin: "0 0 8px", fontSize: 11 }}>
          {project.tags.join("  •  ")}
        </p>
        <p style={{ margin: "0 0 14px", lineHeight: 1.45 }}>{project.blurb}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <a href={project.url} target="_blank" rel="noreferrer" className="w98-btn" style={{ display: "inline-flex", alignItems: "center" }}>
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactBody() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div style={{ padding: 16 }}>
      <p style={{ margin: "0 0 12px" }}>
        New Message to {PROFILE.email}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <span>Name</span>
        <input className="w98-field" value={name} onChange={(e) => setName(e.target.value)} />
        <span>E-mail</span>
        <input className="w98-field" value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>
      <textarea
        className="w98-field"
        rows={7}
        placeholder="What's up?"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        style={{ resize: "vertical" }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <a className="w98-btn is-default" href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Hello Kevin")}&body=${encodeURIComponent(`${msg}\n\n— ${name} ${from}`)}`}>
          Send
        </a>
        <a className="w98-btn" href={PROFILE.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <button type="button" className="w98-btn" onClick={() => setSent(true)}>
          Save Draft
        </button>
      </div>
      {sent ? <p style={{ marginTop: 10 }}>Draft saved to C:\My Documents\unsent.msg</p> : null}
      <hr className="w98-hr" />
      <p style={{ margin: 0, fontSize: 12 }}>
        {PROFILE.phone}  ·  {PROFILE.location}
      </p>
    </div>
  );
}

function ResumeBody() {
  const text = useMemo(
    () =>
      [
        `${PROFILE.name.toUpperCase()}`,
        PROFILE.title,
        `${PROFILE.location}  |  ${PROFILE.email}  |  ${PROFILE.phone}`,
        "",
        "SUMMARY",
        PROFILE.aboutBody,
        "",
        "EXPERIENCE",
        ...EXPERIENCE.flatMap((e) => [
          `${e.role}  —  ${e.org}  (${e.dates})`,
          `  ${e.detail}`,
          "",
        ]),
        "SKILLS",
        "  " + SKILLS.map((s) => s.name).join(", "),
        "",
        "SELECTED WORK",
        ...PROJECTS.filter((p) => p.category !== "games").map(
          (p) => `  - ${p.name}  [${p.tags.join(", ")}]  ${p.url}`,
        ),
        "",
        "NOTES",
        ...PROFILE.funFacts.map((f) => `  * ${f}`),
      ].join("\n"),
    [],
  );
  return <pre className="notepad-body">{text}</pre>;
}

function NewsBody() {
  return (
    <div>
      <div className="ie-addr">
        <span>Address</span>
        <input className="w98-field" readOnly value="https://kevnisay.local/journals" />
        <button type="button" className="w98-btn">Go</button>
      </div>
      <div className="w98-sunken" style={{ margin: 6, background: "#fff", padding: 12 }}>
        <p style={{ fontSize: 11, margin: "0 0 8px" }}>News — Latest Creative Thinking Journals</p>
        {ARTICLES.map((a) => (
          <a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noreferrer"
            style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, marginBottom: 14, color: "inherit", textDecoration: "none" }}
          >
            <img src={a.image} alt="" style={{ width: 120, height: 72, objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                {a.category} | {a.date}
              </div>
              <div style={{ fontWeight: 700, color: "#00c" }}>{a.title}</div>
              <div>{a.summary}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function RecycleBody() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <IconRecycle size={48} />
      <p style={{ marginTop: 12 }}>This folder is empty.</p>
      <p style={{ fontSize: 11, color: "#444" }}>
        Deleted drafts, old splash screens, and one Comic Sans experiment
        have been permanently removed.
      </p>
    </div>
  );
}

function ComputerBody() {
  const { openApp } = useDesktop();
  const groups = ["Core", "Frameworks", "CMS", "Motion", "Web3", "Design"] as const;
  return (
    <div style={{ padding: 8 }}>
      <p style={{ margin: "4px 8px 10px" }}>Drives and folders on this computer:</p>
      <div className="icon-grid">
        <button type="button" onClick={() => openApp("about")}>
          <IconUser size={32} />
          About Kevin
        </button>
        <button type="button" onClick={() => openApp("projects")}>
          <IconDocuments size={32} />
          Projects
        </button>
        <button type="button" onClick={() => openApp("resume")}>
          <IconNotepad size={32} />
          Resume.txt
        </button>
        <button type="button" onClick={() => openApp("network")}>
          <IconNetwork size={32} />
          Network
        </button>
      </div>
      <hr className="w98-hr" />
      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 700, padding: "0 8px 4px" }}>
            {`C:\\SKILLS\\${g.toUpperCase()}`}
          </div>
          {SKILLS.filter((s) => s.group === g).map((s) => (
            <div key={s.file} className="list-row" style={{ gridTemplateColumns: "20px 1fr 80px" }}>
              <IconDrive size={16} />
              <span>{s.file}</span>
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function GamesBody() {
  const { openApp } = useDesktop();
  const games = PROJECTS.filter((p) => p.category === "games");
  return (
    <div className="icon-grid">
      {games.map((g) => (
        <button key={g.id} type="button" onClick={() => openApp("project", g.id)}>
          {g.image ? (
            <img src={g.image} alt="" style={{ width: 72, height: 54, objectFit: "cover" }} />
          ) : (
            <IconFolder size={32} />
          )}
          {g.name}
        </button>
      ))}
    </div>
  );
}

function NetworkBody() {
  return (
    <div className="icon-grid">
      {SOCIALS.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "inherit", textDecoration: "none", fontFamily: "var(--font-w98)", fontSize: 11, padding: 6 }}
        >
          {s.id === "mail" ? <IconMail size={32} /> : <IconNetwork size={32} />}
          {s.label}
          <span style={{ color: "#444" }}>{s.user}</span>
        </a>
      ))}
    </div>
  );
}

function HelpBody() {
  const [tab, setTab] = useState("welcome");
  const pages: Record<string, { title: string; body: string }> = {
    welcome: {
      title: "Getting started",
      body: "Kevin OS 98 is a Windows 98-style desktop of Kevin Nisay’s portfolio. Open icons on the desktop, or click Start. On a phone, the same content is served as an MS-DOS prompt — tap a command instead of typing.",
    },
    windows: {
      title: "Using windows",
      body: "Drag a title bar to move. The three buttons minimize, maximize, and close. Open windows also appear on the taskbar. Right-click the desktop for Display Properties.",
    },
    about: {
      title: "Who is Kevin?",
      body: `${PROFILE.aboutBody} Based in ${PROFILE.location}.`,
    },
  };
  return (
    <div className="help-split">
      <nav className="help-nav w98-sunken" style={{ background: "#fff", margin: 4 }}>
        {Object.entries(pages).map(([k, v]) => (
          <button key={k} type="button" className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>
            {v.title}
          </button>
        ))}
      </nav>
      <div style={{ padding: 12, background: "#fff", margin: 4 }} className="w98-sunken">
        <h3 style={{ marginTop: 0 }}>{pages[tab]?.title}</h3>
        <p style={{ lineHeight: 1.5 }}>{pages[tab]?.body}</p>
      </div>
    </div>
  );
}

function RunBody() {
  const [cmd, setCmd] = useState("");
  const { openApp, windows, closeWin } = useDesktop();
  const self = windows.find((w) => w.app === "run");
  const go = () => {
    const c = cmd.trim().toLowerCase();
    const map: Record<string, AppId> = {
      about: "about",
      "kevin.exe": "about",
      projects: "projects",
      contact: "contact",
      resume: "resume",
      notepad: "notepad",
      iexplore: "news",
      help: "help",
    };
    const app = map[c];
    if (app) openApp(app);
    else openApp("error", "badcmd");
    if (self) closeWin(self.id);
  };
  return (
    <div style={{ padding: 16, display: "flex", gap: 12 }}>
      <IconComputer size={32} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: "0 0 8px" }}>Type the name of a program, folder, or document:</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Open:</span>
          <input
            className="w98-field"
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
            autoFocus
          />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
          <button type="button" className="w98-btn is-default" onClick={go}>
            OK
          </button>
          <button type="button" className="w98-btn" onClick={() => self && closeWin(self.id)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ShutdownBody() {
  const { closeAll, setBooted, windows, closeWin } = useDesktop();
  const self = windows.find((w) => w.app === "shutdown");
  return (
    <div style={{ padding: 16, display: "flex", gap: 12 }}>
      <WindowsFlag size={32} />
      <div>
        <p style={{ fontWeight: 700 }}>What do you want the computer to do?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "10px 0 16px" }}>
          <label>
            <input type="radio" name="sd" defaultChecked /> Shut down
          </label>
          <label>
            <input type="radio" name="sd" /> Restart
          </label>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            type="button"
            className="w98-btn is-default"
            onClick={() => {
              closeAll();
              setBooted(false);
              window.setTimeout(() => setBooted(true), 1600);
            }}
          >
            OK
          </button>
          <button type="button" className="w98-btn" onClick={() => self && closeWin(self.id)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function DisplayBody() {
  const { wallpaper, setWallpaper } = useDesktop();
  return (
    <div style={{ padding: 16 }}>
      <p style={{ fontWeight: 700, marginTop: 0 }}>Background</p>
      <div
        className={`w98-sunken ${wallpaper === "clouds" ? "is-clouds" : ""}`}
        style={{
          height: 90,
          marginBottom: 12,
          background:
            wallpaper === "teal" ? "#008080" : wallpaper === "night" ? "#000040" : undefined,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {([
          ["teal", "Teal (Windows Standard)"],
          ["night", "Navy Night"],
          ["clouds", "Clouds"],
        ] as const).map(([id, label]) => (
          <label key={id}>
            <input
              type="radio"
              name="wp"
              checked={wallpaper === id}
              onChange={() => setWallpaper(id)}
            />{" "}
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

function ErrorBody({ payload }: { payload?: string }) {
  return (
    <div style={{ padding: 16, display: "flex", gap: 12 }}>
      <span style={{ fontSize: 28 }}>!</span>
      <div>
        <p style={{ marginTop: 0 }}>
          {payload === "badcmd"
            ? "Windows cannot find that file. Make sure you typed the name correctly."
            : "Internet Explorer cannot open that page."}
        </p>
      </div>
    </div>
  );
}

function IeBody({ payload }: { payload?: string }) {
  const project = payload ? projectById(payload) : undefined;
  const url = project?.url ?? PROFILE.site;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="ie-addr">
        <span>Address</span>
        <input className="w98-field" readOnly value={url} />
        <a className="w98-btn" href={url} target="_blank" rel="noreferrer">
          Go
        </a>
      </div>
      <div className="w98-sunken" style={{ margin: 6, flex: 1, background: "#fff", overflow: "auto" }}>
        {project ? (
          <>
            <ProjectThumb project={project} tall />
            <div style={{ padding: 12 }}>
              <h3>{project.name}</h3>
              <p>{project.blurb}</p>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </div>
          </>
        ) : (
          <div style={{ padding: 16 }}>
            <h3>Kevin Nisay</h3>
            <p>{PROFILE.tagline}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function AppWindow({ win, active }: { win: WinInst; active: boolean }) {
  const menu =
    win.app === "notepad" || win.app === "resume" ? (
      <MenuBar items={["File", "Edit", "Search", "Help"]} />
    ) : win.app === "projects" || win.app === "computer" ? (
      <FileMenu />
    ) : win.app === "ie" || win.app === "news" ? (
      <MenuBar items={["File", "Edit", "View", "Go", "Favorites", "Help"]} />
    ) : undefined;

  const status =
    win.app === "projects"
      ? `${PROJECTS.length} file(s)`
      : win.app === "computer"
        ? "My Computer"
        : undefined;

  const doc = win.app === "resume" || win.app === "notepad";

  let body: ReactNode;
  switch (win.app) {
    case "welcome":
      body = <WelcomeBody />;
      break;
    case "about":
      body = <AboutBody />;
      break;
    case "projects":
      body = <ProjectsBody />;
      break;
    case "project":
      body = <ProjectBody id={win.payload} />;
      break;
    case "contact":
      body = <ContactBody />;
      break;
    case "resume":
    case "notepad":
      body = <ResumeBody />;
      break;
    case "news":
      body = <NewsBody />;
      break;
    case "recycle":
      body = <RecycleBody />;
      break;
    case "computer":
      body = <ComputerBody />;
      break;
    case "games":
      body = <GamesBody />;
      break;
    case "network":
      body = <NetworkBody />;
      break;
    case "help":
      body = <HelpBody />;
      break;
    case "run":
      body = <RunBody />;
      break;
    case "shutdown":
      body = <ShutdownBody />;
      break;
    case "display":
      body = <DisplayBody />;
      break;
    case "ie":
      body = <IeBody payload={win.payload} />;
      break;
    default:
      body = <ErrorBody payload={win.payload} />;
  }

  return (
    <WindowFrame win={win} active={active} menu={menu} status={status} doc={doc}>
      {body}
    </WindowFrame>
  );
}
