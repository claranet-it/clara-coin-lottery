import { get } from 'svelte/store'
import { Price } from '../lib'
import { Transaction } from '../utils/transaction'
import { store } from './store'

const getTransaction = (): ReadonlyArray<Transaction> => get(store).transactions

const shouldChangePrize = () => {
  const _currentPrize = currentPrize()
  return _currentPrize.winners.length === _currentPrize.total
}

const lastWinner = (): Transaction | undefined => {
  const winners = currentPrize().winners
  return winners[winners.length - 1]
}

const currentPrize = (): Price => {
  const _store = get(store)
  return _store.prizes[_store.currentPrizeIndex]
}

export const storeSelectors = {
  getTransaction,
  shouldChangePrize,
  lastWinner
}
