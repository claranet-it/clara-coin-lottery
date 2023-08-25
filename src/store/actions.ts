import { get } from 'svelte/store'
import { Transaction } from '../utils/transaction'
import { State, store } from './store'

const setIsLastPrizeIfNeeded = () =>
  store.update(state => ({ ...state, isLastPrize: isLastPrize(state) }))

const setWinnerIndex = (winnerIndex: number) =>
  store.update(state => ({ ...state, winnerIndex }))

const resetWinnerIndex = () => store.update(state => ({ ...state, winnerIndex: -1 }))

const isLastPrize = (state: State) => state.currentPrizeIndex === state.prizes.length - 1

const moveToNextPrize = () =>
  store.update(state => ({ ...state, currentPrizeIndex: state.currentPrizeIndex + 1 }))

const addWinnerAtCurrentPrize = (winner: Transaction) => {
  store.update(state => {
    const prizes = state.prizes.map((p, index) => {
      if (state.currentPrizeIndex === index) {
        p.winners = [...p.winners, winner]
      }
      return p
    })
    return { ...state, prizes }
  })
}

const setIsLotting = (isLotting: boolean) =>
  store.update(state => ({ ...state, isLotting }))

const extractWinner = () => {
  const _store = get(store)
  const [winner] = _store.transactions.splice(random(_store.transactions.length), 1)
  setWinnerIndex(winner.index)
  addWinnerAtCurrentPrize(winner)
}

const random = (num: number) => {
  return Math.floor(Math.random() * num)
}

const setTransactionsWithLastCurrentPrizeWinners = () => {
  store.update(state => ({
    ...state,
    transactions: [...state.prizes[state.currentPrizeIndex].winners].sort(
      () => 0.5 - Math.random()
    )
  }))
}

export const storeActions = {
  setIsLastPrizeIfNeeded,
  resetWinnerIndex,
  moveToNextPrize,
  setIsLotting,
  extractWinner,
  setTransactionsWithLastCurrentPrizeWinners
}
