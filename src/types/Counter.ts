import { REQUIRED_PROPERTY } from "src/constants/errorMessage";
import { z } from "zod";

export const CounterSchema = z.object({
  title: z.string().min(1, { message: REQUIRED_PROPERTY }),
  value: z.number()
})

export type Counter = z.infer<typeof CounterSchema>