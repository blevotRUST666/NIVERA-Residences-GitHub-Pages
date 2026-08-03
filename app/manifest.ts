import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    name: "NIVERA Residences",
    short_name: "NIVERA",
    description:
      "A fictional premium real-estate experience by NEIVUM WEB.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f4f0e7",
    theme_color: "#153b32",
    icons: [
      {
        src: `${basePath}/favicon.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
