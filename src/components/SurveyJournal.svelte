<script lang="ts">
	import type { SurveyAnswer, SurveyJournal } from "src/types";
   import { format } from 'date-fns'

  export let surveyJournal: SurveyJournal
  export let updateAnswer: (answer: SurveyAnswer) => Promise<void>
</script>

<h3>{surveyJournal.name}</h3>
{#each surveyJournal.questions as question, i}
   <h4>{i + 1}: {question.text}</h4>
   <div class="flex flex-row gap-2">
      {#each question.options as option}
         <button on:click={() => updateAnswer({ question, answer: option })}>{option.text}</button>
      {/each}
   </div>
{/each}

<h3>History</h3>

{#each surveyJournal.days as { date, answers }}
   <h4>{format(date, 'dd.mm.yyyy, HH:mm')}</h4>
   <ul>
      {#each answers as answer}
         <li>{answer.question.text} - "{answer.answer.text}"</li>
      {/each}
   </ul>
{/each}