# Jarv45 - AI-Powered Personal Finance Agent

Jarv45 is a conversational AI finance agent that transforms natural-language requests into financial operations. Users can record income, track expenses, retrieve expense totals, and calculate their remaining balance without manually structuring transactions or performing calculations.

Built with **JavaScript**, **Node.js**, **Groq-SDK**, and LLM-driven **tool calling**, Jarv45 connects conversational requests to dedicated financial functions. Its multi-turn conversation loop preserves context, processes tool results, and continues tool calls until the model generates a final response.

## Features

- **Natural-Language Transactions:** Record income and expenses using everyday language.
- **LLM Tool Calling:** Extract transaction details and route requests to appropriate financial functions.
- **Expense Tracking:** Retrieve expense totals through the expense retrieval tool.
- **Balance Calculation:** Calculate the remaining balance from recorded income and expenses.
- **Context-Aware Conversations:** Maintain conversation history across successive user messages.
- **Multi-Turn Agent Loop:** Feed tool results back to the model and support successive tool calls.
- **Ambiguity Handling:** Request clarification when a transaction could represent either income or an expense.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript (ES Modules) | Application logic |
| Node.js | Runtime and CLI interaction |
| Groq SDK | Model API integration |
| Qwen via Groq | Natural-language understanding and tool calling |
| dotenv | Environment variable configuration |

## Available Financial Tools

| Tool | Responsibility |
|---|---|
| `addExpense()` | Records an expense name and amount. |
| `addIncome()` | Records an income name and amount. |
| `getExpenses()` | Retrieves the total recorded expenses. |
| `getTotalBalance()` | Calculates total income minus total expenses. |

The model selects tools based on the user's request. The application executes the corresponding JavaScript functions, returns their results to the conversation history, and lets the model continue processing.

## Example Interactions

### Record an Expense

```text
User: I spent 450 INR on groceries.
Assistant: Expense recorded successfully.
```

### Record Income

```text
User: I received my salary of 50000 INR.
Assistant: Income recorded successfully.
```

### Calculate Balance

```text
User: How much money do I have left?
Assistant: Your remaining balance is 49550 INR.
```

### Clarify an Ambiguous Request

```text
User: Salary 50000.
Assistant: Was this salary received as income
or paid to someone as an expense?
```

These examples illustrate intended interactions. Actual responses depend on the model and current application state.

## Getting Started

### Prerequisites

- Node.js 18 or later and npm installed.
- A valid Groq API key.

### 1. Clone the Repository

```bash
git clone https://github.com/vaibhavchavhan45/Finance-AI-agent.git
cd Finance-AI-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` in the project root and add your key:

```env
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the Application

```bash
node index.js
```
Enter your requests in the terminal. Type `done` to exit.

## Project Structure

```text
Finance-AI-Agent/
├── index.js
├── src/
│   ├── prompt.js
│   ├── agent.js
│   ├── tools.js
│   └── finance.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

- `index.js` — Handles terminal input and application execution.
- `prompt.js` — Defines the agent's system instructions.
- `agent.js` — Manages Groq requests and the multi-turn conversation loop.
- `tools.js` — Defines financial tools and dispatches tool calls.
- `finance.js` — Implements income, expense, and balance operations.

## Project Goal

Jarv45 explores how LLM tool calling and multi-turn agent orchestration can convert natural-language instructions into executable financial operations. Its goal is to make everyday money tracking more intuitive while keeping financial calculations in dedicated application functions.

## Future Improvements

- **Persistent storage:** Store transactions in PostgreSQL.
- **Categories and analytics:** Tag transactions by category(e.g. Food, Travel etc.) and show spending summaries.

## Author

Built by **Vaibhav Chavhan**
- Portfolio: [vaibhav-chavhan.vercel.app](https://vaibhav-chavhan.vercel.app)
- Email: [chavhanvaibhav708@gmail.com](mailto:chavhanvaibhav708@gmail.com)
- LinkedIn: [vaibhavchavhan](https://www.linkedin.com/in/vaibhavchavhan/)
- GitHub: [vaibhavchavhan45](https://github.com/vaibhavchavhan45)

