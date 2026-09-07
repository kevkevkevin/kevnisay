import { useRef, useState } from "react";
import {
  ARTICLES,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILLS,
  SOCIALS,
  projectById,
} from "@/data/portfolio";

type Line = { kind: "in" | "out" | "html"; text: string };

const COMMANDS = [
  { cmd: "about", hint: "who is kevin" },
  { cmd: "projects", hint: "latest work" },
  { cmd: "archive", hint: "previous works" },
  { cmd: "games", hint: "experiments" },
  { cmd: "skills", hint: "tech stack" },
  { cmd: "resume", hint: "experience" },
  { cmd: "news", hint: "journals" },
  { cmd: "contact", hint: "email / phone" },
  { cmd: "social", hint: "github / linkedin" },
  { cmd: "help", hint: "command list" },
  { cmd: "cls", hint: "clear screen" },
] as const;

function banner(): Line[] {
  return [
    { kind: "out", text: "Kevin OS  [Version 98.0.2026]" },
    { kind: "out", text: "(C) Copyright Kevin Nisay 1998-2026." },
    { kind: "out", text: "" },
    { kind: "out", text: "Starting MS-DOS Prompt..." },
    { kind: "out", text: "Mobile shell loaded. Tap a command — or type if you have a keyboard." },
    { kind: "out", text: "" },
  ];
}

function run(raw: string): Line[] {
  const input = raw.trim();
  const [cmd, ...rest] = input.split(/\s+/);
  const arg = rest.join(" ").toLowerCase();
  const c = (cmd ?? "").toLowerCase();

  if (!c) return [];
  if (c === "help" || c === "?" || c === "man") {
    return [
      { kind: "out", text: "Available commands:" },
      ...COMMANDS.map((x) => ({
        kind: "out" as const,
        text: `  ${x.cmd.padEnd(12)} ${x.hint}`,
      })),
      { kind: "out", text: "  open <id>    open a project (example: open ecodroids)" },
      { kind: "out", text: "  ver          version" },
      { kind: "out", text: "  dir          list files" },
    ];
  }
  if (c === "ver") {
    return [{ kind: "out", text: "Kevin OS 98.0  [Build 2608]  Web Designer Edition" }];
  }
  if (c === "whoami" || c === "about" || c === "cat") {
    return [
      { kind: "out", text: `${PROFILE.name}  —  ${PROFILE.title}` },
      { kind: "out", text: PROFILE.location },
      { kind: "out", text: "" },
      { kind: "out", text: PROFILE.aboutLead },
      { kind: "out", text: PROFILE.aboutBody },
      { kind: "out", text: "" },
      ...PROFILE.funFacts.map((f) => ({ kind: "out" as const, text: ` * ${f}` })),
    ];
  }
  if (c === "projects" || (c === "dir" && !arg) || c === "ls") {
    const latest = PROJECTS.filter((p) => p.category === "latest");
    return [
      { kind: "out", text: "C:\\PORTFOLIO\\LATEST" },
      { kind: "out", text: "" },
      ...latest.map((p) => ({
        kind: "out" as const,
        text: ` ${p.id.padEnd(14)} ${p.name}  [${p.tags.join(", ")}]`,
      })),
      { kind: "out", text: "" },
      { kind: "out", text: "Tap OPEN + id, or run: open ecodroids" },
    ];
  }
  if (c === "archive") {
    return [
      { kind: "out", text: "C:\\PORTFOLIO\\ARCHIVE" },
      { kind: "out", text: "" },
      ...PROJECTS.filter((p) => p.category === "archive").map((p) => ({
        kind: "out" as const,
        text: ` ${p.id.padEnd(14)} ${p.name}  [${p.tags.join(", ")}]`,
      })),
    ];
  }
  if (c === "games") {
    return [
      { kind: "out", text: "C:\\GAMES" },
      { kind: "out", text: "Test your patience." },
      { kind: "out", text: "" },
      ...PROJECTS.filter((p) => p.category === "games").map((p) => ({
        kind: "out" as const,
        text: ` ${p.id.padEnd(14)} ${p.name}  ${p.url}`,
      })),
    ];
  }
  if (c === "open") {
    const p = projectById(arg) ?? PROJECTS.find((x) => x.name.toLowerCase().includes(arg));
    if (!p) return [{ kind: "out", text: `File not found: ${arg || "(missing id)"}` }];
    return [
      { kind: "out", text: `Opening ${p.name}...` },
      { kind: "out", text: p.blurb },
      { kind: "out", text: p.tags.join(" · ") },
      { kind: "html", text: p.url },
    ];
  }
  if (c === "skills") {
    return [
      { kind: "out", text: "C:\\SKILLS" },
      ...SKILLS.map((s) => ({
        kind: "out" as const,
        text: ` ${s.file.padEnd(12)} ${s.name}  (${s.group})`,
      })),
    ];
  }
  if (c === "resume" || c === "cv" || c === "exp") {
    return EXPERIENCE.flatMap((e) => [
      { kind: "out" as const, text: `${e.role}` },
      { kind: "out" as const, text: `  ${e.org}  —  ${e.dates}` },
      { kind: "out" as const, text: `  ${e.detail}` },
      { kind: "out" as const, text: "" },
    ]);
  }
  if (c === "news" || c === "blog") {
    return ARTICLES.flatMap((a) => [
      { kind: "out" as const, text: `${a.date}  ${a.category}` },
      { kind: "out" as const, text: a.title },
      { kind: "html" as const, text: a.url },
      { kind: "out" as const, text: "" },
    ]);
  }
  if (c === "contact" || c === "mail") {
    return [
      { kind: "out", text: `E-mail    ${PROFILE.email}` },
      { kind: "out", text: `Alt       ${PROFILE.emailAlt}` },
      { kind: "out", text: `Phone     ${PROFILE.phone}` },
      { kind: "out", text: `WhatsApp  ${PROFILE.whatsapp}` },
      { kind: "out", text: `Location  ${PROFILE.location}` },
    ];
  }
  if (c === "social") {
    return SOCIALS.map((s) => ({ kind: "html" as const, text: `${s.label}: ${s.url}` }));
  }
  if (c === "dir") {
    return [{ kind: "out", text: "ABOUT.TXT  PROJECTS.DIR  RESUME.TXT  CONTACT.SYS  NEWS.HTM" }];
  }
  if (c === "echo") {
    return [{ kind: "out", text: rest.join(" ") || "ECHO is on." }];
  }
  if (c === "date") {
    return [{ kind: "out", text: new Date().toString() }];
  }
  return [
    { kind: "out", text: `Bad command or file name: ${c}` },
    { kind: "out", text: "Type HELP for a list of commands." },
  ];
}

export function DosShell() {
  const [lines, setLines] = useState<Line[]>(() => banner());
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  const exec = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.toLowerCase() === "cls" || trimmed.toLowerCase() === "clear") {
      setLines(banner());
      setDraft("");
      return;
    }
    const next: Line[] = [
      ...lines,
      { kind: "in", text: `C:\\PORTFOLIO> ${trimmed}` },
      ...run(trimmed),
      { kind: "out", text: "" },
    ];
    setLines(next);
    setDraft("");
    requestAnimationFrame(() => {
      const el = scroller.current;
      if (!el) return;
      const cmds = el.querySelectorAll(".dos-cmd-line");
      const last = cmds[cmds.length - 1];
      if (last) last.scrollIntoView({ block: "start" });
      else el.scrollTo({ top: el.scrollHeight });
    });
  };

  return (
    <div className="dos-root">
      <div className="dos-scroll" ref={scroller} role="log" aria-live="polite">
        {lines.map((ln, i) => {
          if (ln.kind === "html") {
            const url = ln.text.match(/https?:\/\/\S+/)?.[0];
            if (url) {
              return (
                <div key={i}>
                  <a className="dos-link" href={url} target="_blank" rel="noreferrer">
                    {ln.text}
                  </a>
                </div>
              );
            }
          }
          return (
            <div key={i} className={ln.kind === "in" ? "dos-prompt dos-cmd-line" : "dos-out"}>
              {ln.text}
            </div>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            exec(draft || "help");
          }}
          style={{ display: "flex", gap: 6, alignItems: "baseline" }}
        >
          <label htmlFor="dos-in" className="dos-prompt">
            C:\PORTFOLIO{">"}
          </label>
          <input
            id="dos-in"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            style={{
              flex: 1,
              background: "transparent",
              border: 0,
              color: "#fff",
              font: "inherit",
              outline: "none",
              minHeight: 32,
            }}
          />
          <span className="blink dos-bright">_</span>
        </form>
      </div>
      <div className="dos-cmds" aria-label="Commands">
        {COMMANDS.map((c) => (
          <button key={c.cmd} type="button" className="dos-cmd" onClick={() => exec(c.cmd)}>
            <kbd>{c.cmd}</kbd>
            <div style={{ color: "#888", fontSize: 11 }}>{c.hint}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
