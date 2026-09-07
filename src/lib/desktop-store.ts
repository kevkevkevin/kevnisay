import { create } from "zustand";
import { projectById } from "@/data/portfolio";

export type AppId =
  | "welcome"
  | "about"
  | "projects"
  | "project"
  | "contact"
  | "resume"
  | "news"
  | "recycle"
  | "computer"
  | "ie"
  | "notepad"
  | "games"
  | "help"
  | "run"
  | "shutdown"
  | "display"
  | "network"
  | "error";

export type WinInst = {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  payload?: string;
};

type DesktopState = {
  windows: WinInst[];
  zTop: number;
  startOpen: boolean;
  selectedIcon: string | null;
  contextMenu: { x: number; y: number } | null;
  booted: boolean;
  wallpaper: "teal" | "night" | "clouds";
  openApp: (app: AppId, payload?: string) => void;
  closeWin: (id: string) => void;
  focusWin: (id: string) => void;
  minimizeWin: (id: string) => void;
  restoreWin: (id: string) => void;
  toggleMax: (id: string) => void;
  moveWin: (id: string, x: number, y: number) => void;
  resizeWin: (id: string, w: number, h: number) => void;
  setStartOpen: (open: boolean) => void;
  setSelectedIcon: (id: string | null) => void;
  setContextMenu: (pos: { x: number; y: number } | null) => void;
  setBooted: (v: boolean) => void;
  setWallpaper: (w: DesktopState["wallpaper"]) => void;
  closeAll: () => void;
};

const TITLES: Record<AppId, string> = {
  welcome: "Welcome to Kevin OS 98",
  about: "About Kevin — kevin.exe",
  projects: "My Projects",
  project: "Project Properties",
  contact: "Inbox — Contact Kevin",
  resume: "Resume.txt — Notepad",
  news: "Internet Explorer — Journals",
  recycle: "Recycle Bin",
  computer: "My Computer",
  ie: "Internet Explorer",
  notepad: "Untitled — Notepad",
  games: "Games",
  help: "Windows Help",
  run: "Run",
  shutdown: "Shut Down Windows",
  display: "Display Properties",
  network: "Network Neighborhood",
  error: "Internet Explorer",
};

const SIZES: Record<AppId, { w: number; h: number; x: number; y: number }> = {
  welcome: { w: 460, h: 340, x: 220, y: 80 },
  about: { w: 620, h: 520, x: 70, y: 24 },
  projects: { w: 680, h: 500, x: 140, y: 28 },
  project: { w: 520, h: 460, x: 240, y: 50 },
  contact: { w: 480, h: 420, x: 200, y: 60 },
  resume: { w: 520, h: 480, x: 180, y: 36 },
  news: { w: 640, h: 480, x: 120, y: 40 },
  recycle: { w: 420, h: 280, x: 260, y: 120 },
  computer: { w: 520, h: 380, x: 160, y: 70 },
  ie: { w: 720, h: 520, x: 80, y: 24 },
  notepad: { w: 480, h: 360, x: 200, y: 80 },
  games: { w: 560, h: 400, x: 170, y: 70 },
  help: { w: 560, h: 400, x: 150, y: 60 },
  run: { w: 380, h: 160, x: 260, y: 200 },
  shutdown: { w: 360, h: 200, x: 280, y: 180 },
  display: { w: 420, h: 360, x: 240, y: 90 },
  network: { w: 480, h: 340, x: 200, y: 80 },
  error: { w: 420, h: 180, x: 260, y: 160 },
};

const SINGLETON: AppId[] = [
  "welcome",
  "about",
  "projects",
  "contact",
  "resume",
  "news",
  "recycle",
  "computer",
  "notepad",
  "games",
  "help",
  "run",
  "shutdown",
  "display",
  "network",
];

let seq = 1;

function clampPos(x: number, y: number, w: number, h: number) {
  const maxX = Math.max(0, (typeof window !== "undefined" ? window.innerWidth : 1280) - 80);
  const maxY = Math.max(0, (typeof window !== "undefined" ? window.innerHeight : 800) - 80);
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
    w,
    h,
  };
}

export const useDesktop = create<DesktopState>((set, get) => ({
  windows: [],
  zTop: 10,
  startOpen: false,
  selectedIcon: null,
  contextMenu: null,
  booted: false,
  wallpaper: "teal",

  openApp: (app, payload) => {
    const { windows, zTop } = get();
    if (SINGLETON.includes(app)) {
      const existing = windows.find((w) => w.app === app);
      if (existing) {
        set({
          windows: windows.map((w) =>
            w.id === existing.id
              ? { ...w, minimized: false, z: zTop + 1, payload: payload ?? w.payload }
              : w,
          ),
          zTop: zTop + 1,
          startOpen: false,
          contextMenu: null,
        });
        return;
      }
    }
    if (app === "project") {
      const existing = windows.find((w) => w.app === "project" && w.payload === payload);
      if (existing) {
        set({
          windows: windows.map((w) =>
            w.id === existing.id ? { ...w, minimized: false, z: zTop + 1 } : w,
          ),
          zTop: zTop + 1,
          startOpen: false,
        });
        return;
      }
    }
    const size = SIZES[app];
    const offset = (windows.length % 8) * 18;
    const pos = clampPos(size.x + offset, size.y + offset, size.w, size.h);
    const pretty =
      app === "project" && payload
        ? `${projectById(payload)?.name ?? payload} Properties`
        : TITLES[app];
    const inst: WinInst = {
      id: `${app}-${seq++}`,
      app,
      title: pretty,
      ...pos,
      z: zTop + 1,
      minimized: false,
      maximized: false,
      payload,
    };
    set({
      windows: [...windows, inst],
      zTop: zTop + 1,
      startOpen: false,
      contextMenu: null,
    });
  },

  closeWin: (id) =>
    set({ windows: get().windows.filter((w) => w.id !== id) }),

  focusWin: (id) => {
    const { windows, zTop } = get();
    const target = windows.find((w) => w.id === id);
    if (!target || target.z === zTop) return;
    set({
      windows: windows.map((w) => (w.id === id ? { ...w, z: zTop + 1 } : w)),
      zTop: zTop + 1,
      startOpen: false,
      contextMenu: null,
    });
  },

  minimizeWin: (id) =>
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w,
      ),
    }),

  restoreWin: (id) => {
    const { windows, zTop } = get();
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, minimized: false, z: zTop + 1 } : w,
      ),
      zTop: zTop + 1,
      startOpen: false,
    });
  },

  toggleMax: (id) =>
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w,
      ),
    }),

  moveWin: (id, x, y) =>
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    }),

  resizeWin: (id, w, h) =>
    set({
      windows: get().windows.map((win) =>
        win.id === id
          ? { ...win, w: Math.max(280, w), h: Math.max(160, h) }
          : win,
      ),
    }),

  setStartOpen: (open) => set({ startOpen: open, contextMenu: null }),
  setSelectedIcon: (id) => set({ selectedIcon: id }),
  setContextMenu: (pos) => set({ contextMenu: pos, startOpen: false }),
  setBooted: (v) => set({ booted: v }),
  setWallpaper: (w) => set({ wallpaper: w }),
  closeAll: () => set({ windows: [], startOpen: false }),
}));
