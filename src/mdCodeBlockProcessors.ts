import { parse, stringify } from "yaml"
import { CounterSchema, SurveyJournalSchema, type SurveyAnswer } from "./types"
import { Notice, type App } from "obsidian"
import { isSameDay } from "date-fns"
import Counter from './components/Counter.svelte'
import SurveyJournal from './components/SurveyJournal.svelte'
import type { SurveyJournal as TJournal } from "./types"


export async function counterBlock(source: string, sourcePath: string, app: App, el: HTMLElement) {
  try {
    const obj = parse(source)
    const counter = CounterSchema.parse(obj)
    
    const onUpdateCount = async (newCount: number) => {
      const content = await app.vault.adapter.read(sourcePath)
      const counterCopy = structuredClone(counter)
      counterCopy.value = newCount
      const counterYaml = stringify(counterCopy)
      const newContent = content.replace(source, counterYaml)

      await app.vault.adapter.write(sourcePath, newContent)
    }

    new Counter({
      target: el,
      props: {
        title: counter.title,
        value: counter.value,
        onChange: async (e: number) => onUpdateCount(e)
      }
    })

  } catch (error) {
    new Notice('Failed to parse counter')
  }
}

export async function surveyJournalBlock(source: string, sourcePath: string, app: App, el: HTMLElement) {
  try {
    const obj = JSON.parse(source)
    const surveyJournal = SurveyJournalSchema.parse(obj)

    const updateAnswer = async (answer: SurveyAnswer) => {
      const now = new Date()
      const daysClone = structuredClone(surveyJournal.days)
      const currentDayIndex = daysClone.findIndex(d => isSameDay(now, new Date(d.date)))
      
      if (currentDayIndex === -1) {
        daysClone.push({ date: now.toISOString(), answers: [answer] })
      } else {
        const existingDay = daysClone[currentDayIndex]
        const existingAnswerIndex = existingDay.answers.findIndex(a => a.question.type === answer.question.type)
        
        if (existingAnswerIndex === -1) {
          daysClone[currentDayIndex].answers.push(answer)
        } else {
          daysClone[currentDayIndex].date = now.toISOString()
          daysClone[currentDayIndex].answers[existingAnswerIndex] = answer
        }
      }

      const updatedJournal: TJournal = {
        ...surveyJournal,
        days: daysClone
      }

      const content = await app.vault.adapter.read(sourcePath)
      const newContent = content.replace(source, JSON.stringify(updatedJournal, null, 4))

      await app.vault.adapter.write(sourcePath, newContent)
    }

    new SurveyJournal({
      target: el,
      props: {
        surveyJournal,
        updateAnswer
      }
    })

  } catch (error) {
    console.log({ error })
    new Notice('Failed to parse survey journal')
  }
}