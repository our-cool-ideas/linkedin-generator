import { z } from 'zod'

export const GenerateRequestSchema = z.object({
  brief: z
    .string({ error: 'Brief is required.' })
    .min(1, { message: 'Brief is required.' })
    .max(500, { message: 'Brief must be 500 characters or fewer.' }),
  tone: z.enum(['Analytical', 'Actionable', 'Inspirational'], {
    error: 'Tone must be Analytical, Actionable, or Inspirational.',
  }),
  toneValue: z
    .number()
    .min(0)
    .max(100),
})

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>
