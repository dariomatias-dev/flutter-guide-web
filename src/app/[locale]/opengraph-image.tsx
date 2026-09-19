import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050a17",
        backgroundImage:
          "radial-gradient(circle at 50% 20%, rgba(47, 108, 246, 0.35), transparent 60%), radial-gradient(circle at 85% 90%, rgba(138, 125, 255, 0.25), transparent 50%)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 80,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.02em",
        }}
      >
        FlutterGuide
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 32,
          color: "#8db4ff",
        }}
      >
        Learn Flutter by example
      </div>
    </div>,
    size,
  );
}
