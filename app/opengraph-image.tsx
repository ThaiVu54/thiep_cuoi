import { siteConfig } from "@/config/site.config";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ffe4ec, #fff5f8)",
          color: "#9f1239",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        <div>{siteConfig.groom.name} &amp; {siteConfig.bride.name}</div>
        <div style={{ marginTop: 16, fontSize: 28 }}>Trân trọng kính mời</div>
      </div>
    ),
    { ...size },
  );
}
