const expenseDB = [];
const incomeDB = [];


export function getExpenses({ from, to }) {
  // console.log("Calling get expense tool");
  // console.log("Expense DB:", expenseDB);
  // console.log("Requested date range:", { from, to });
  // Date filtering requires transaction dates to be stored.
  const totalExpense = expenseDB.reduce(
    (total, item) => total + item.amount,
    0
  );

  return `Total expenses: ${totalExpense} INR`;
}


export function addExpense({ expenseName, amount }) {
  // console.log("Adding expense to the database");
  // console.log("Expense details:", { expenseName, amount });

  expenseDB.push({
    expenseName,
    amount: Number(amount),
  });

  // console.log("Updated Income DB:", incomeDB);
  return `Added expense: ${expenseName}, ${Number(amount)} INR`;
}


export function addIncome({ incomeName, amount }) {
  incomeDB.push({
    incomeName,
    amount: Number(amount),
  });

  return `Added income: ${incomeName}, ${Number(amount)} INR`;
}


export function getTotalBalance() {
  const totalIncome = incomeDB.reduce(
    (total, item) => total + item.amount,
    0
  );

  const totalExpense = expenseDB.reduce(
    (total, item) => total + item.amount,
    0
  );

  // console.log("Total income:", totalIncome);
  // console.log("Total expenses:", totalExpense);
  // console.log("Calculated balance:", totalIncome - totalExpense);

  return `Remaining balance: ${totalIncome - totalExpense} INR`;
}