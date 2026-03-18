import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.get("/api/github/search", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    if (!q) return HttpResponse.json({ message: "bad" }, { status: 400 });

    return HttpResponse.json({
      total_count: 1,
      items: [
        {
          id: 1,
          full_name: "vercel/next.js",
          html_url: "https://github.com/vercel/next.js",
          description: "The React Framework",
          stargazers_count: 123,
          owner: { login: "vercel", avatar_url: "https://example.com/a.png" },
        },
      ],
    });
  }),
);