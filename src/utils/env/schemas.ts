import { z } from 'zod'

export const Env = z.object({
  apiUrl: z.string(),
  authToken: z.string()
})

export type Env = z.infer<typeof Env>
