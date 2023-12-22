import { REQUIRED_PROPERTY } from "src/constants/errorMessage";
import { z } from "zod";
import { SURVEY_JOURNAL } from "./constants/dataType";

export const YamlTypeSchema = z.object({
  type: z.string().min(1, { message: REQUIRED_PROPERTY })
})

export type YamlType = z.infer<typeof YamlTypeSchema>

export const CounterSchema = z.object({
  id: z.string().min(1, { message: REQUIRED_PROPERTY }),
  title: z.string().min(1, { message: REQUIRED_PROPERTY }),
  value: z.number()
})

export type Counter = z.infer<typeof CounterSchema>

export const QuestionOptionSchema = z.object({
  type: z.string().min(1, { message: REQUIRED_PROPERTY }),
  text: z.string().min(1, { message: REQUIRED_PROPERTY }),
})

export type QuestionOption = z.infer<typeof QuestionOptionSchema>

export const SurveyQuestionSchema = z.object({
  type: z.string().min(1, { message: REQUIRED_PROPERTY }),
  text: z.string().min(1, { message: REQUIRED_PROPERTY }),
  options: z.array(QuestionOptionSchema)
})

export type SurveyQuestion = z.infer<typeof SurveyQuestionSchema>

export const SurveyAnswerSchema = z.object({
  question: SurveyQuestionSchema,
  answer: QuestionOptionSchema
})

export type SurveyAnswer = z.infer<typeof SurveyAnswerSchema>

export const SurveyJournalDays = z.object({
  date: z.string().datetime(),
  answers: z.array(SurveyAnswerSchema)
})

export const SurveyJournalSchema = z.object({
  version: z.number().min(1, { message: REQUIRED_PROPERTY }),
  type: z.literal(SURVEY_JOURNAL),
  id: z.string().min(1, { message: REQUIRED_PROPERTY }),
  name: z.string().min(1, { message: REQUIRED_PROPERTY }),
  questions: z.array(SurveyQuestionSchema),
  days: z.array(SurveyJournalDays)
})

export type SurveyJournal = z.infer<typeof SurveyJournalSchema>