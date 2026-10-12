import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: Building Futures, Brightening Smiles`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-transparent.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#EEF5FB",
          position: "relative",
          padding: "70px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", right: -80, top: -80, width: 360, height: 360, borderRadius: 9999, background: "#FED072" }} />
        <div style={{ position: "absolute", left: -60, bottom: -90, width: 260, height: 260, borderRadius: 9999, background: "rgba(113,70,211,0.15)" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
          <div style={{ fontSize: 30, color: "#5B34B8", fontWeight: 700 }}>{SITE.name}</div>
          <div style={{ fontSize: 76, color: "#14202B", fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>Building Futures,</div>
          <div style={{ fontSize: 76, color: "#7146D3", fontWeight: 800, lineHeight: 1.05 }}>Brightening Smiles</div>
          <div style={{ fontSize: 30, color: "#475467", marginTop: 28 }}>2,000+ children reached through 7 outreaches</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={330} height={337} alt="" style={{ position: "relative" }} />
      </div>
    ),
    size,
  );
}
