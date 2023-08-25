import { Env } from './schemas'

export type { Env } from './schemas'

function getEnv(): Env | never {
  const obj = {
    apiUrl: import.meta.env.VITE_API_URL,
    authToken: import.meta.env.VITE_AUTH_TOKEN
  }
  const parse = Env.safeParse(obj)
  if (!parse.success) throw new Error(`Env invalid: ${JSON.stringify(obj)}`)
  return parse.data
}

const ENV = getEnv()

export default ENV
