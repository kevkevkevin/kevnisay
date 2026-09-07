import type { ReactNode } from "react";

type IconProps = { size?: number; className?: string };

function Svg({ size = 32, className, children }: IconProps & { children: ReactNode }) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {children}
    </svg>
  );
}

export function IconComputer({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="4" y="4" width="24" height="16" fill="#808080" />
      <rect x="5" y="5" width="22" height="14" fill="#000" />
      <rect x="6" y="6" width="20" height="12" fill="#008080" />
      <rect x="8" y="8" width="6" height="2" fill="#00ffff" />
      <rect x="12" y="20" width="8" height="2" fill="#c0c0c0" />
      <rect x="6" y="22" width="20" height="4" fill="#c0c0c0" />
      <rect x="6" y="22" width="20" height="1" fill="#fff" />
      <rect x="8" y="23" width="4" height="2" fill="#000080" />
    </Svg>
  );
}

export function IconFolder({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="10" width="26" height="16" fill="#ffcc40" />
      <rect x="3" y="8" width="12" height="4" fill="#ffcc40" />
      <rect x="4" y="9" width="10" height="2" fill="#ffe27a" />
      <rect x="4" y="11" width="24" height="2" fill="#ffe27a" />
      <rect x="3" y="24" width="26" height="2" fill="#c90" />
    </Svg>
  );
}

export function IconDocuments({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="7" y="3" width="16" height="22" fill="#fff" stroke="#000" />
      <rect x="9" y="7" width="12" height="1" fill="#000080" />
      <rect x="9" y="10" width="12" height="1" fill="#808080" />
      <rect x="9" y="13" width="10" height="1" fill="#808080" />
      <rect x="9" y="16" width="11" height="1" fill="#808080" />
      <rect x="5" y="8" width="16" height="20" fill="#ffffcc" stroke="#000" />
      <rect x="7" y="12" width="12" height="1" fill="#000" />
      <rect x="7" y="15" width="10" height="1" fill="#000" />
      <rect x="7" y="18" width="11" height="1" fill="#000" />
    </Svg>
  );
}

export function IconRecycle({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="10" y="4" width="12" height="3" fill="#c0c0c0" />
      <rect x="14" y="2" width="4" height="3" fill="#c0c0c0" />
      <rect x="8" y="7" width="16" height="18" fill="#9fd89f" />
      <rect x="8" y="7" width="16" height="2" fill="#c0c0c0" />
      <rect x="9" y="11" width="2" height="10" fill="#fff" />
      <rect x="13" y="11" width="2" height="10" fill="#fff" />
      <rect x="17" y="11" width="2" height="10" fill="#fff" />
      <rect x="21" y="11" width="2" height="10" fill="#fff" />
      <rect x="7" y="25" width="18" height="3" fill="#6aa86a" />
    </Svg>
  );
}

export function IconUser({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="6" y="4" width="20" height="24" fill="#fff" stroke="#000" />
      <rect x="11" y="7" width="10" height="10" fill="#f4c7a1" />
      <rect x="13" y="9" width="2" height="2" fill="#000" />
      <rect x="17" y="9" width="2" height="2" fill="#000" />
      <rect x="14" y="13" width="4" height="1" fill="#c00" />
      <rect x="10" y="18" width="12" height="7" fill="#000080" />
    </Svg>
  );
}

export function IconMail({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="8" width="26" height="16" fill="#fff" />
      <rect x="3" y="8" width="26" height="16" stroke="#000" fill="none" />
      <path d="M3 8 L16 18 L29 8" stroke="#000080" fill="none" />
      <rect x="3" y="8" width="26" height="2" fill="#000080" />
    </Svg>
  );
}

export function IconIe({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="6" y="6" width="20" height="20" rx="10" fill="#00a1e0" />
      <rect x="10" y="8" width="12" height="16" fill="#fff" />
      <rect x="8" y="14" width="16" height="4" fill="#f60" />
      <rect x="14" y="6" width="4" height="20" fill="#00a1e0" />
    </Svg>
  );
}

export function IconNetwork({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="4" y="6" width="10" height="8" fill="#808080" />
      <rect x="5" y="7" width="8" height="5" fill="#008080" />
      <rect x="18" y="6" width="10" height="8" fill="#808080" />
      <rect x="19" y="7" width="8" height="5" fill="#008080" />
      <rect x="11" y="18" width="10" height="8" fill="#c0c0c0" />
      <rect x="15" y="14" width="2" height="5" fill="#000" />
      <rect x="8" y="14" width="16" height="2" fill="#000" />
      <rect x="8" y="10" width="2" height="5" fill="#000" />
      <rect x="22" y="10" width="2" height="5" fill="#000" />
    </Svg>
  );
}

export function IconNotepad({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="7" y="3" width="18" height="26" fill="#fffbe6" stroke="#000" />
      <rect x="7" y="3" width="18" height="4" fill="#000080" />
      <rect x="10" y="10" width="12" height="1" fill="#00f" />
      <rect x="10" y="13" width="12" height="1" fill="#00f" />
      <rect x="10" y="16" width="10" height="1" fill="#00f" />
      <rect x="10" y="19" width="11" height="1" fill="#00f" />
    </Svg>
  );
}

export function IconGame({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="4" y="12" width="24" height="12" fill="#c0c0c0" />
      <rect x="6" y="14" width="6" height="6" fill="#000" />
      <rect x="8" y="12" width="2" height="10" fill="#fff" />
      <rect x="4" y="16" width="10" height="2" fill="#fff" />
      <rect x="20" y="15" width="3" height="3" fill="#c00" />
      <rect x="24" y="15" width="3" height="3" fill="#00c" />
      <rect x="22" y="18" width="3" height="3" fill="#cc0" />
    </Svg>
  );
}

export function IconHelp({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="6" y="4" width="20" height="24" fill="#fff" stroke="#000" />
      <rect x="12" y="8" width="8" height="8" fill="#000080" />
      <rect x="14" y="10" width="4" height="4" fill="#fff" />
      <rect x="14" y="18" width="4" height="2" fill="#000080" />
      <rect x="14" y="22" width="4" height="3" fill="#000080" />
    </Svg>
  );
}

export function IconBriefcase({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="12" y="6" width="8" height="4" fill="#7a4a12" />
      <rect x="4" y="10" width="24" height="16" fill="#c4a574" />
      <rect x="4" y="16" width="24" height="3" fill="#7a4a12" />
      <rect x="14" y="16" width="4" height="4" fill="#ffcc40" />
    </Svg>
  );
}

export function IconDrive({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="4" y="10" width="24" height="12" fill="#c0c0c0" />
      <rect x="4" y="10" width="24" height="2" fill="#fff" />
      <rect x="6" y="14" width="14" height="2" fill="#000" />
      <rect x="22" y="14" width="3" height="3" fill="#0c0" />
    </Svg>
  );
}

export function IconHtml({ size, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="7" y="3" width="18" height="26" fill="#fff" stroke="#000" />
      <rect x="9" y="6" width="4" height="3" fill="#e44" />
      <rect x="10" y="12" width="12" height="1" fill="#000" />
      <rect x="10" y="16" width="12" height="1" fill="#000" />
      <rect x="10" y="20" width="8" height="1" fill="#000" />
    </Svg>
  );
}

export function IconShortcut({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="20" width="10" height="10" fill="#000080" />
      <path d="M4 27 L10 22 L10 25 L12 25 L12 28 L10 28 L10 27 Z" fill="#fff" />
    </svg>
  );
}

export function WindowsFlag({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className="win-flag">
      <rect x="1" y="2" width="6" height="5" fill="#f44" />
      <rect x="8" y="3" width="7" height="5" fill="#6c3" />
      <rect x="1" y="8" width="6" height="5" fill="#48f" />
      <rect x="8" y="9" width="7" height="5" fill="#fc0" />
    </svg>
  );
}

export const APP_ICONS: Record<string, (p: IconProps) => ReactNode> = {
  welcome: (p) => <WindowsFlag size={p.size ?? 16} />,
  about: (p) => <IconUser {...p} />,
  projects: (p) => <IconDocuments {...p} />,
  project: (p) => <IconHtml {...p} />,
  contact: (p) => <IconMail {...p} />,
  resume: (p) => <IconNotepad {...p} />,
  news: (p) => <IconIe {...p} />,
  recycle: (p) => <IconRecycle {...p} />,
  computer: (p) => <IconComputer {...p} />,
  ie: (p) => <IconIe {...p} />,
  notepad: (p) => <IconNotepad {...p} />,
  games: (p) => <IconGame {...p} />,
  help: (p) => <IconHelp {...p} />,
  run: (p) => <IconComputer {...p} />,
  shutdown: (p) => <IconComputer {...p} />,
  display: (p) => <IconComputer {...p} />,
  network: (p) => <IconNetwork {...p} />,
  error: (p) => <IconIe {...p} />,
};
