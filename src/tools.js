import {
  getExpenses,
  addExpense,
  addIncome,
  getTotalBalance,
} from "./finance.js";


export const tools = [
  {
    type: "function",
    function: {
      name: "getExpenses",
      description: "Retrieve expense records within a date range.",
      parameters: {
        type: "object",
        properties: {
          from: {
            type: "string",
            description: "Start date in YYYY-MM-DD format.",
          },
          to: {
            type: "string",
            description: "End date in YYYY-MM-DD format.",
          },
        },
        required: ["from", "to"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "addExpense",
      description: "Record a new expense in INR.",
      parameters: {
        type: "object",
        properties: {
          expenseName: {
            type: "string",
            description: "Name or description of the expense.",
          },
          amount: {
            type: "number",
            description: "Expense amount in INR.",
          },
        },
        required: ["expenseName", "amount"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "addIncome",
      description: "Record new income in INR.",
      parameters: {
        type: "object",
        properties: {
          incomeName: {
            type: "string",
            description: "Name or description of the income.",
          },
          amount: {
            type: "number",
            description: "Income amount in INR.",
          },
        },
        required: ["incomeName", "amount"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getTotalBalance",
      description: "Calculate the remaining balance from recorded income and expenses.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];


export function executeTool(functionName, args) {
  // console.log("Executing tool:", functionName);
  // console.log("Arguments:", args);
  
  switch (functionName) {
    case "getExpenses":
      return getExpenses(args);

    case "addExpense":
      return addExpense(args);

    case "addIncome":
      return addIncome(args);

    case "getTotalBalance":
      return getTotalBalance();

    default:
      throw new Error(`Unknown tool: ${functionName}`);
  }
}