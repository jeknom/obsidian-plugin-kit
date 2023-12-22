<script lang="ts">
	import type { SurveyAnswer, SurveyJournal } from "src/types";
	import { format, isToday } from "date-fns";
	import Card from "./Card.svelte";

	export let surveyJournal: SurveyJournal;
	export let updateAnswer: (answer: SurveyAnswer) => Promise<void>;

	let view: "survey" | "history" = "survey";

   $: answeredToday = surveyJournal.days.some(d => isToday(d.date))
</script>

<button
	class="absolute right-2 top-2"
	on:click={() =>
		view === "history" ? (view = "survey") : (view = "history")}
	>{view === "survey" ? "Show History" : "Show Survey"}</button
>

{#if view === "survey"}
	<h3>{surveyJournal.name}</h3>
   <h5><span class={answeredToday ? 'text-green-500' : 'text-yellow-500'}>{answeredToday ? 'Survey has been answered for today' : 'Survey has not been answered today'}</span></h5>
	{#each surveyJournal.questions as question, i}
		<h4>{i + 1}: {question.text}</h4>
		<div class="flex flex-row gap-2">
			{#each question.options as option}
				<button
					on:click={() => updateAnswer({ question, answer: option })}
					>{option.text}</button
				>
			{/each}
		</div>
	{/each}
{:else if view === "history"}
	<h3>History</h3>
	<div class="flex flex-col gap-2 overflow-x-auto">
		{#each structuredClone(surveyJournal.days).reverse() as { date, answers }}
         <h4>{format(date, "PPPP")}</h4>
			<Card classes="gap-2 min-w-[500px]">
				<ul class="list-disc">
					{#each answers as answer}
						<li>{answer.question.text} - "{answer.answer.text}"</li>
					{/each}
				</ul>
			</Card>
		{/each}
	</div>
{/if}
