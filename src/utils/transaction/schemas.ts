import { z } from 'zod';

export const TransactionDto = z.tuple([z.string(), z.string()]);

export type TransactionDto = z.infer<typeof TransactionDto>