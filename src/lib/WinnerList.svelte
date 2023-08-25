<script lang="ts">
  import { store } from '../store'
  import Winner from './Winner.svelte'

  $: prize = $store.prizes[0]
</script>

<section class="main_aside__section">
  <h3 class="main_aside__section__title">{prize.title}</h3>
  <ul class="card_list">
    {#each new Array(prize.total) as _, i}
      <li class="card_list__item">
        <p class="card_list__item__ranking">{i + 1}°</p>
        <Winner transaction={prize.winners[i]} />
      </li>
    {/each}
  </ul>
</section>
