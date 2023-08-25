import { writable } from 'svelte/store'
import { Price } from '../lib'
import { Transaction, transactionRepository } from '../utils/transaction'
import { peopleRepository } from '../utils/transaction/repositories'

export type State = {
  isLotting: boolean
  winnerIndex: number
  isLastPrize: boolean
  currentPrizeIndex: number
  prizes: Price[]
  transactions: Transaction[]
  replaceCards: boolean
}

const initTransactions = async () => {
  const [transactions] = await Promise.all([
    transactionRepository.get(),
    peopleRepository.get()
  ])
  const invalid = new Set<string>()
  const filteredTransactions = transactions
    //.concat(transactions).map((t, index) => ({ ...t, index }))
    .filter(t => {
      const isFromValid = !!peopleRepository.find(t.from)
      const isToValid = !!peopleRepository.find(t.to)
      if (!isFromValid) invalid.add(t.from)
      if (!isToValid) invalid.add(t.to)
      return isFromValid && isToValid
    })
    .sort(() => 0.5 - Math.random())
  // console.log('Excluded:', Array.from(invalid.values()).sort())
  console.log('Valid coins:', filteredTransactions.length)
  return filteredTransactions
}

export const store = writable<State>({
  isLotting: false,
  winnerIndex: -1,
  isLastPrize: false,
  currentPrizeIndex: 0,
  prizes: [
    { title: 'Round & semifinalisti', total: 3, winners: [] },
    { title: 'Round & finale', total: 1, winners: [] }
  ],
  transactions: await initTransactions(),
  replaceCards: true
})
