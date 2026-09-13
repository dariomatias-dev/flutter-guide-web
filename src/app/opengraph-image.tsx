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
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.25), transparent 60%)",
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
          color: "#a1a1aa",
        }}
      >
        The essential companion for Flutter developers
      </div>
    </div>,
    size,
  );
}
