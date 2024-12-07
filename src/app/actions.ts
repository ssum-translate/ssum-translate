"use server";

export const sendChatGPT = async (context: string, userInput: string) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: context },
        { role: "user", content: userInput },
      ],
    }),
  });
  const data = await response.json();

  return JSON.parse(data.choices[0].message.content);
};
