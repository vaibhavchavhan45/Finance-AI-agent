import Groq from "groq-sdk";
import { tools, executeTool } from "./tools.js";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function createAgent(messages) {
  while (true) {
    const response = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages,
      tools,
    });

    // console.log(res.choices[0].message);
    // console.log(res.choices[0].message.tool_calls?.[0]);

    const assistantMessage = response.choices[0].message;
    messages.push(assistantMessage);

    const toolCalls = assistantMessage.tool_calls;

    if (!toolCalls || toolCalls.length === 0) {
      return assistantMessage.content ?? "";
    }

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(
        toolCall.function.arguments || "{}"
      );

      const result = executeTool(functionName, functionArgs);

      messages.push({
        role: "tool",
        content: String(result),
        tool_call_id: toolCall.id,
      });

      // console.log(JSON.stringify(res.choices[0]), null, 2);
      // console.log("===============");
      // console.log("messages", messages);
    }
  }
}