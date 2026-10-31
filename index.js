import "dotenv/config";
import readline from "node:readline/promises";
import { createAgent } from "./src/agent.js";
import { systemPrompt } from "./src/prompt.js";


async function main() {
  const terminalReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
  ];

  try {
    while (true) {
      const question = await terminalReadline.question("User: ");

      if (question.trim().toLowerCase() === "done") break;

      messages.push({
        role: "user",
        content: question,
      });

      try {
        const response = await createAgent(messages);
        console.log("Assistant:", response);
      } 
      catch (error) {
        console.error("Error:", error.message);
        console.log("Assistant: Sorry, something went wrong. Please try again.");
      }
    }
  } 
  finally {
    terminalReadline.close();
  }
}

main();