import { useEffect, useRef, type ReactNode } from "react";
import { APP_ICONS } from "@/components/win98/icons";
import { useDesktop, type WinInst } from "@/lib/desktop-store";

type Props = {
  win: WinInst;
  active: boolean;
  children: ReactNode;
  menu?: ReactNode;
  status?: string;
  doc?: boolean;
};

export function WindowFrame({ win, active, children, menu, status, doc }: Props) {
  const { focusWin, closeWin, minimizeWin, toggleMax, moveWin, resizeWin } =
    useDesktop();
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{ x: number; y: number; w: number; h: number } | null>(
    null,
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (drag.current) {
        moveWin(win.id, e.clientX - drag.current.dx, Math.max(0, e.clientY - drag.current.dy));
      } else if (resize.current) {
        resizeWin(
          win.id,
          resize.current.w + (e.clientX - resize.current.x),
          resize.current.h + (e.clientY - resize.current.y),
        );
      }
    };
    const onUp = () => {
      drag.current = null;
      resize.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [win.id, moveWin, resizeWin]);

  const Icon = APP_ICONS[win.app];
  const style = win.maximized
    ? undefined
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };
  const z = win.maximized ? win.z : win.z;

  return (
    <div
      className={`win-frame ${win.maximized ? "is-max" : ""}`}
      style={{ ...style, zIndex: z, display: win.minimized ? "none" : undefined }}
      onPointerDown={() => focusWin(win.id)}
    >
      <section className="w98-window" style={{ width: "100%", height: "100%" }}>
        <header
          className={`w98-title ${active ? "" : "is-inactive"}`}
          onPointerDown={(e) => {
            if (win.maximized) return;
            if ((e.target as HTMLElement).closest("button")) return;
            drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
          }}
          onDoubleClick={() => toggleMax(win.id)}
        >
          {Icon ? <span>{Icon({ size: 16 })}</span> : null}
          <span className="w98-title-label">{win.title}</span>
          <span className="w98-title-btns">
            <button
              type="button"
              className="w98-tb"
              aria-label="Minimize"
              onClick={() => minimizeWin(win.id)}
            >
              _
            </button>
            <button
              type="button"
              className="w98-tb"
              aria-label={win.maximized ? "Restore" : "Maximize"}
              onClick={() => toggleMax(win.id)}
            >
              {win.maximized ? "❐" : "□"}
            </button>
            <button
              type="button"
              className="w98-tb"
              aria-label="Close"
              onClick={() => closeWin(win.id)}
            >
              ×
            </button>
          </span>
        </header>
        {menu}
        <div className={`win-body ${doc ? "is-doc" : ""}`}>{children}</div>
        {status ? <footer className="w98-status">{status}</footer> : null}
        {!win.maximized ? (
          <div
            className="resize-handle"
            onPointerDown={(e) => {
              e.stopPropagation();
              resize.current = { x: e.clientX, y: e.clientY, w: win.w, h: win.h };
            }}
          />
        ) : null}
      </section>
    </div>
  );
}

export function MenuBar({ items }: { items: string[] }) {
  return (
    <div className="w98-menubar">
      {items.map((item) => (
        <button type="button" key={item}>
          {item}
        </button>
      ))}
    </div>
  );
}
