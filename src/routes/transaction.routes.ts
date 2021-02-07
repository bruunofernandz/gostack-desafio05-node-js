import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionRepository = new TransactionsRepository();

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionResult = transactionRepository.all();

    const balanceResult = transactionRepository.getBalance();

    return response
      .status(200)
      .json({ transactions: transactionResult, balance: balanceResult });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
