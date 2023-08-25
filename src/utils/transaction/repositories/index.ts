import { ITransactionRepository, TransactionRepository } from './transaction-repository'
export const transactionRepository: ITransactionRepository = new TransactionRepository()
import { IPeopleRepository, PeopleRepository } from './people-repository'
export const peopleRepository: IPeopleRepository = new PeopleRepository()