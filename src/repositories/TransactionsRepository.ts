import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(el => el.type === 'income')
      .map(el => el.value);

    const outcome = this.transactions
      .filter(el => el.type === 'outcome')
      .map(el => el.value);

    const incomeValue = income.reduce((accum, curr) => accum + curr, 0);
    const outcomeValue = outcome.reduce((accum, curr) => accum + curr, 0);

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionCreateDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
