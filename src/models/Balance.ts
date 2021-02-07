class Balance {
  income: number;

  outcome: number;

  total: number;

  constructor({ income, outcome, total }: Balance) {
    this.income = income;
    this.outcome = outcome;
    this.total = total;
  }
}

export default Balance;
