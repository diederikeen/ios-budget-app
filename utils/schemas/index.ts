import z from 'zod';

export const transactionSchema = z.array(
  z.object({
    id: z.number(),
    amount: z.number(),
    note: z.string().optional(),
    created_at: z.string(),
    category: z.object({
      name: z.string(),
      id: z.number(),
      icon_name: z.string(),
    })
  })
)

export type Transactions = z.infer<typeof transactionSchema>
