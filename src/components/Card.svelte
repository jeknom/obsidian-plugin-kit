<script lang="ts">
  export let classes: string = '';
</script>

<div class={`p-2 border border-neutral-600 shadow-md rounded-md ${classes}`}>
  <slot />
</div>