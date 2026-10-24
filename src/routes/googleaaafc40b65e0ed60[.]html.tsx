// Google Search Console site verification.
// Serves the exact content of the uploaded verification file at
// /googleaaafc40b65e0ed60.html as required by Google's file verification.
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/googleaaafc40b65e0ed60[.]html")({
  server: {
    handlers: {
      GET: async () =>
        new Response("google-site-verification: googleaaafc40b65e0ed60.html", {
          headers: { "Content-Type": "text/html" },
        }),
    },
  },
});
