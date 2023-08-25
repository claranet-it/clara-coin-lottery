<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  const startExtraction = () => {
    dispatch('startExtraction', {})
  }
</script>

<button class="button_cta" on:click={startExtraction}>
  <span>Play Now</span>
</button>
