import { useEffect, useState, type ReactNode } from "react";
import { AppWindow } from "@/components/desktop/apps";
import {
  IconComputer,
  IconDocuments,
  IconIe,
  IconMail,
  IconNetwork,
  IconNotepad,
  IconRecycle,
  IconUser,
  IconGame,
  WindowsFlag,
} from "@/components/win98/icons";
import { useDesktop, type AppId } from "@/lib/desktop-store";

const ICONS: { id: string; app: AppId; label: string; icon: ReactNode }[] = [
  { id: "computer", app: "computer", label: "My Computer", icon: <IconComputer /> },
  { id: "network", app: "network", label: "Network Neighborhood", icon: <IconNetwork /> },
  { id: "projects", app: "projects", label: "My Documents", icon: <IconDocuments /> },
  { id: "recycle", app: "recycle", label: "Recycle Bin", icon: <IconRecycle /> },
  { id: "about", app: "about", label: "Kevin.exe", icon: <IconUser /> },
  { id: "resume", app: "resume", label: "Resume.txt", icon: <IconNotepad /> },
  { id: "contact", app: "contact", label: "Inbox", icon: <IconMail /> },
  { id: "news", app: "news", label: "Internet Explorer", icon: <IconIe /> },
  { id: "games", app: "games", label: "Games", icon: <IconGame /> },
];

function Clock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time dateTime={t.toISOString()}>
      {t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
    </time>
  );
}

function StartMenu() {
  const { openApp, setStartOpen } = useDesktop();
  const go = (app: AppId) => {
    openApp(app);
    setStartOpen(false);
  };
  return (
    <div className="start-menu" role="menu" aria-label="Start" style={{ zIndex: 50000 }}>
      <div className="start-banner">Kevin OS 98</div>
      <div className="start-list">
        <button type="button" className="start-item" onClick={() => go("about")}>
          <IconUser size={24} /> Kevin.exe
        </button>
        <button type="button" className="start-item" onClick={() => go("projects")}>
          <IconDocuments size={24} /> Programs
        </button>
        <button type="button" className="start-item" onClick={() => go("resume")}>
          <IconNotepad size={24} /> Documents
        </button>
        <button type="button" className="start-item" onClick={() => go("display")}>
          <IconComputer size={24} /> Settings
        </button>
        <button type="button" className="start-item" onClick={() => go("help")}>
          Windows Help
        </button>
        <button type="button" className="start-item" onClick={() => go("run")}>
          Run...
        </button>
        <hr className="w98-hr" />
        <button type="button" className="start-item" onClick={() => go("shutdown")}>
          Shut Down...
        </button>
      </div>
    </div>
  );
}

export function DesktopShell() {
  const {
    windows,
    startOpen,
    selectedIcon,
    contextMenu,
    wallpaper,
    openApp,
    restoreWin,
    focusWin,
    setStartOpen,
    setSelectedIcon,
    setContextMenu,
  } = useDesktop();

  const activeId = windows.reduce<string | null>((best, w) => {
    if (w.minimized) return best;
    const cur = windows.find((x) => x.id === best);
    if (!cur) return w.id;
    return w.z >= cur.z ? w.id : best;
  }, null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStartOpen(false);
        setContextMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setStartOpen, setContextMenu]);

  return (
    <div
      className={`desktop-root ${wallpaper === "night" ? "is-night" : ""} ${wallpaper === "clouds" ? "is-clouds" : ""}`}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          setStartOpen(false);
          setContextMenu(null);
          setSelectedIcon(null);
        }
      }}
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).closest(".win-frame, .taskbar, .start-menu, .ctx-menu")) return;
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
        setStartOpen(false);
      }}
    >
      <div className="desktop-icons">
        {ICONS.map((icon) => (
          <button
            key={icon.id}
            type="button"
            className={`desk-icon ${selectedIcon === icon.id ? "is-selected" : ""}`}
            onClick={() => {
              setSelectedIcon(icon.id);
              openApp(icon.app);
            }}
          >
            {icon.icon}
            <span className="desk-icon-label">{icon.label}</span>
          </button>
        ))}
      </div>

      {windows.map((w) => (
        <AppWindow key={w.id} win={w} active={w.id === activeId} />
      ))}

      {startOpen ? <StartMenu /> : null}

      {contextMenu ? (
        <div
          className="ctx-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button type="button" className="ctx-item" disabled>
            Arrange Icons
          </button>
          <button
            type="button"
            className="ctx-item"
            onClick={() => {
              setContextMenu(null);
              openApp("welcome");
            }}
          >
            Refresh
          </button>
          <hr className="w98-hr" />
          <button
            type="button"
            className="ctx-item"
            onClick={() => {
              setContextMenu(null);
              openApp("display");
            }}
          >
            Properties
          </button>
        </div>
      ) : null}

      <footer className="taskbar">
        <button
          type="button"
          className={`start-btn ${startOpen ? "is-open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen(!startOpen);
            setContextMenu(null);
          }}
        >
          <WindowsFlag size={16} />
          Start
        </button>
        <div style={{ width: 2, height: 22, boxShadow: "var(--shadow-sunken)", flex: "0 0 auto" }} />
        <div className="task-btns">
          {windows.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`task-btn ${w.id === activeId && !w.minimized ? "is-active" : ""}`}
              onClick={() => {
                if (w.minimized) restoreWin(w.id);
                else if (w.id === activeId) useDesktop.getState().minimizeWin(w.id);
                else focusWin(w.id);
              }}
            >
              {w.title}
            </button>
          ))}
        </div>
        <div className="tray">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
