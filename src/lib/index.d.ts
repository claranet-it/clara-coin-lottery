import { Transaction } from '../utils/transaction'

export type Price = {
  title: string
  total: number
  winners: Transaction[]
}
