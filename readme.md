# Jarv45 – Personal Finance AI Agent

Jarv45 is an AI agent that helps manage expenses, income, and balance using tool calling.

## System Prompt
Your name is Jarv45, a personal finance AI assistant. Your task is to assist user
with their expenses, balances and financial planning.
Current Date: <dynamic-date>
You have access to the following tools:
1. getExpenses({from, to}) – Get total expense for a time period.
2. addExpense({expenseName, amount}) – Add new expense.
3. addIncome({incomeName, amount}) – Add new income.
4. getMoneyBalance() – Get remaining money balance.

## Project Structure
- index.js
- package.json
- package-lock.json
- .env
- .gitignore
- README.md

## Environment Variables
API_KEY=your_api_key_here

## Initialisation, Install & Run
npm init -y
npm install groq-sdk
npm install dotenv
npm install
node index.js

## Tools Overview
- getExpenses: returns total expenses between dates
- addExpense: adds a new expense
- addIncome: adds income record
- getMoneyBalance: returns current balance

## Usage
Run the project and chat with Jarv45 to manage expenses and income.
