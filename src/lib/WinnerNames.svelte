<script lang="ts">
  import { Transaction } from '../utils/transaction'
  import { peopleRepository } from '../utils/transaction/repositories'

  export let transaction: Transaction | undefined
</script>

{#if !!transaction}
  <p class="main_article__winners">
    {peopleRepository.find(transaction.to)?.name}<br />
    {peopleRepository.find(transaction.from)?.name}
  </p>
{/if}
