import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error('Insufficient founds for make this transaction');
    } else {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    }
  }
}

export default CreateTransactionService;
