<script lang="ts">
  import { v4 } from 'uuid'

  export let title: string;
  export let value: number;
  export let onChange: (newVal: number) => void

  const id = v4()

  let inputEl: HTMLInputElement
  let edit = false
  let amount = ''

  $: if (edit && inputEl) {
    inputEl.focus()
  }

  const handleToggleEdit = () => {
    edit = !edit
  }

  const handleSubmit = (op: 'add' | 'sub') => {
    const asNum = parseInt(amount)
    if (asNum === null || Number.isNaN((asNum))) {
      return
    }

    if (op === 'add') {
      onChange(value + asNum)
    } else if (op === 'sub') {
      onChange(value - asNum)
    }

    handleToggleEdit()
    amount = ''
  }
</script>

<div class="flex flex-col gap-1">
  <label for={id}>{title}</label>
  {#if !edit}
    <button class="w-24" id={id} on:click={handleToggleEdit}>{value.toString()}</button>
  {:else}
    <div id={id}>
      <input bind:this={inputEl} placeholder="0" type="number" bind:value={amount} />
      <button on:click={() => handleSubmit('add')}>Add</button>
      <button on:click={() => handleSubmit('sub')}>Sub</button>
      <button on:click={handleToggleEdit}>Cancel</button>
    </div>
  {/if}
</div>