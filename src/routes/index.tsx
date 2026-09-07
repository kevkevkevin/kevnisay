import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { DosShell } from "@/components/terminal/dos-shell";
import { useDesktop } from "@/lib/desktop-store";
import { WindowsFlag } from "@/components/win98/icons";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [phase, setPhase] = useState<"bios" | "splash" | "os">("bios");
  const [mobile, setMobile] = useState(false);
  const { booted, setBooted, openApp, windows } = useDesktop();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (booted) {
      setPhase("os");
      return;
    }
    setPhase("bios");
    const t1 = window.setTimeout(() => setPhase(mobile ? "os" : "splash"), 900);
    const t2 = window.setTimeout(() => {
      setPhase("os");
      setBooted(true);
    }, mobile ? 900 : 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [booted, mobile, setBooted]);

  useEffect(() => {
    if (phase !== "os" || mobile) return;
    if (windows.length === 0) openApp("welcome");
  }, [phase, mobile, openApp, windows.length]);

  if (phase === "bios") {
    return (
      <div className="boot-screen" style={{ padding: 24 }}>
        <p>Kevin BIOS v4.90</p>
        <p>Copyright (C) 1998-2026 Kevin Nisay</p>
        <p style={{ marginTop: 16 }}>Detecting IDE drives . . . OK</p>
        <p>Memory Test: 32768K OK</p>
        <p style={{ marginTop: 16 }}>Starting Windows 98...</p>
      </div>
    );
  }

  if (phase === "splash") {
    return (
      <div className="boot-screen">
        <div className="boot-banner">
          <WindowsFlag size={72} />
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 42,
              margin: "18px 0 6px",
              color: "#000080",
            }}
          >
            Windows <span style={{ fontSize: 22 }}>98</span>
          </p>
          <p style={{ letterSpacing: 6, fontSize: 12, color: "#003" }}>KEVIN NISAY EDITION</p>
        </div>
        <div
          style={{
            height: 28,
            background: "#c0c0c0",
            boxShadow: "inset 0 1px #fff",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            color: "#000",
            fontFamily: "var(--font-w98)",
          }}
        >
          Loading kevin.exe...
        </div>
      </div>
    );
  }

  return mobile ? <DosShell /> : <DesktopShell />;
}
