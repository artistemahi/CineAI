export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Prefer the server-only variable. The REACT_APP fallback keeps existing
  // CineAI deployments working if they already have the old variable set.
  const apiKey =
    process.env.GROQ_API_KEY || process.env.REACT_APP_GROQ_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        "Groq API key is not configured. Add GROQ_API_KEY in Vercel Environment Variables.",
    });
  }

  try {
    const { query } = req.body || {};

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required." });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: query }],
          temperature: 0.3,
          max_tokens: 200,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "Groq request failed.",
      });
    }

    return res.status(200).json({
      content: data?.choices?.[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Groq server error:", error);
    return res.status(500).json({ error: "Unable to contact Groq." });
  }
}
