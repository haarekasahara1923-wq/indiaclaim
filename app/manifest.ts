import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "India Claim — Insurance Claim & Legal Law Adviser",
    short_name: "India Claim",
    description:
      "All in One Insurance Solution Platform. Expert claim recovery and legal advisory for delayed, rejected, short-settled, and mis-sold insurance policies.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
