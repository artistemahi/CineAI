export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 },
      );
    }

    try {
      const body = await request.json();
      const query = body?.query;

      if (!query || typeof query !== "string") {
        return Response.json({ error: "Query is required." }, { status: 400 });
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
        return Response.json(
          { error: data?.error?.message || "Groq request failed." },
          { status: response.status },
        );
      }

      return Response.json({
        content: data?.choices?.[0]?.message?.content || "",
      });
    } catch (error) {
      console.error("Groq server error:", error);
      return Response.json(
        { error: "Unable to contact Groq." },
        { status: 500 },
      );
    }
  },
};
