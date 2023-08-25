import ENV from '../../env'
import { Transaction } from '../entities'

export interface ITransactionRepository {
  get(): Promise<Transaction[]>
}

export class TransactionRepository implements ITransactionRepository {
  get(): Promise<Transaction[]> {
    return fetch(`${ENV.apiUrl}/csv`, {
      headers: {
        Authorization: `${ENV.authToken}`
      }
    })
      .then(res => res.text())
      .then(res => res.split('\n'))
      .then(res =>
        res.map((r, index) => {
          const [from, to] = r.split('-->')
          return {
            index,
            from: from.trim(),
            to: to.trim()
          }
        })
      )
  }
}
