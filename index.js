import Groq from "groq-sdk";
import "dotenv/config";
import readline from "node:readline/promises";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let expenseDB = [];
let incomeDB = [];

async function main() {
  const terminalReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [
    {
      role: "system",
      content: `Your name is Jarv45, a personal finance AI assistant. Your task is to assist user
                with their expenses, balances and financial planning.
                Current Date: ${new Date().toUTCString()}
                You have access to following tools:
            1. getExpenses({from, to}): string // Get total expense for a time period.
            2. addExpense({expenseName, amount}): string // Add new expense to the expenseDB.
            3. addIncome({incomeName, amount}): string // Add new income to the incomeDB.
            4. getMoneyBalance(): string // Get remaining money balance from database.
            
            If you are not sure about which tool to call, ask user that information with more clarity
            E.g. user says salary 120000
            Then ask user salary got credited or an user paid salary to someone means it's expense`
    },
  ];

  while (true) {
    const question = await terminalReadline.question("User : ");
    
    if (question === "bye") {
      break;
    }

    try {
      messages.push({
        role: "user",
        content: question,
      });

      while (true) {
        const res = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: messages,
          tools: [
            {
              type: "function",
              function: {
                name: "getExpenses",
                description: `Retrieves all expense records within a specified date range. Returns detailed information about each expense including amount, category, date, and description.`,
                parameters: {
                  type: "object",
                  properties: {
                    from: {
                      type: "string",
                      description: `Start date for the expense query in YYYY-MM-DD format (e.g., '2024-01-01')`,
                    },
                    to: {
                      type: "string",
                      description: `End date for the expense query in YYYY-MM-DD format (e.g., '2024-12-31')`,
                    },
                  },
                  //required: ["from", "to"],
                },
              },
            },
            {
              type: "function",
              function: {
                name: "addExpense",
                description: `Add the expenses in expenseDB`,
                parameters: {
                  type: "object",
                  properties: {
                    expenseName: {
                      type: "string",
                      description: `Name or description of the expense (e.g., 'Bought a MacBook', 'Grocery shopping', 'Uber ride')`,
                    },
                    amount: {
                      type: "string",
                      description: `Amount spent in INR (e.g., 5000, 150.50)`,
                    },
                  },
                },
              },
            },
            {
              type: "function",
              function: {
                name: "addIncome",
                description: `Add the income in incomeDB`,
                parameters: {
                  type: "object",
                  properties: {
                    incomeName: {
                      type: "string",
                      description: `Name or description of the income (e.g., 'Got salary')`,
                    },
                    amount: {
                      type: "string",
                      description: `Amount got as income in INR (e.g., 500000)`,
                    },
                  },
                },
              },
            },
            {
              type: 'function',
              function: {
                name: 'getTotalBalance',
                description: "Get the remaining total balance from the database"
              }
            }
          ],
        });
        // console.log(res.choices[0].message)
        // console.log(res.choices[0].message.tool_calls[0]);
        messages.push(res.choices[0].message);

        const toolCalls = res.choices[0].message.tool_calls;
        if (!toolCalls) {
          console.log("Assistant : ", res.choices[0].message.content);
          break;
        }

        for (const tool of toolCalls) {
          const functionName = tool.function.name;
          const functionArgs = tool.function.arguments;

          let result = "";
          if (functionName == 'getExpenses') {
            result = getExpenses(JSON.parse(functionArgs));
          } else if (functionName == 'addExpense') {
            result = addExpense(JSON.parse(functionArgs));
          } else if (functionName == 'addIncome') {
            result = addIncome(JSON.parse(functionArgs))
          } else if (functionName == 'getTotalBalance'){
            result = getTotalBalance(JSON.parse(functionArgs))
          }

          messages.push({
            role: "tool",
            content: result,
            tool_call_id: tool.id,
          });

          // console.log(JSON.stringify(res.choices[0]), null, 2);
          // console.log("===============");
          // console.log("messages", messages);

          // console.log("===============");
          // console.log("Expense DB", expenseDB);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      console.log("Assistant: Sorry, something went wrong. Please try again.\n");
    }
  }
  terminalReadline.close();
}
main();

function getExpenses({ from, to }) {
  //console.log("Calling get expense tool");
  const totalExpense = expenseDB.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);
  return `${totalExpense} INR`;
}

function addExpense({ expenseName, amount }) {
  //console.log(`Adding expense in the db`);
  expenseDB.push({ expenseName, amount });
  return "Added expense to the expenseDB";
}

function addIncome({incomeName, amount}){
  incomeDB.push({incomeName, amount})
  return "Income added to the incomeDB"
}

function getTotalBalance(){
  let income = incomeDB.reduce((acc, item) => (acc + item.amount), 0)
  let expense = expenseDB.reduce((acc, item) => (acc + item.amount), 0)

  return `${income - expense} INR`
}