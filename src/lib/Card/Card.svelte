<script lang="ts">
  import { store } from '../../store'
  import { Transaction } from '../../utils/transaction'
  import { peopleRepository } from '../../utils/transaction/repositories'
  export let transaction: Transaction
  
  let receiverPhoto = peopleRepository.getPhotoUrl(transaction?.to);
  let donorPhoto = peopleRepository.getPhotoUrl(transaction?.from);
  const replaceAfterWinnersCount = $store.replaceCards ? $store.prizes[0]?.total ?? 3 : 999;
</script>

{#if $store.winnerIndex === transaction.index}
  <div class="card card__tada" class:card--winner={$store.isLastPrize}>
    <h2 class="card__title">
      Clara <strong>Coin</strong>
    </h2>
    <figure class="card__figure">
      <img
        src={receiverPhoto}
        class="card__figure__receiver"
        alt=""
      />
      <img
        src={donorPhoto}
        class="card__figure__donor"
        alt=""
      />
    </figure>
  </div>
{:else}
    <div class="card__sphere">
      <figure class="card_list__item__figure">
        <img
          src={$store.replaceCards && $store.prizes[0]?.winners?.length === replaceAfterWinnersCount ? peopleRepository.getPhotoUrl($store.prizes[0]?.winners[transaction.index % replaceAfterWinnersCount]?.to) : receiverPhoto}
          class={`card_list__item__figure__receiver ${!!transaction ? '' : 'empty'}`}
          alt=""
        />
        <img
          src={$store.replaceCards && $store.prizes[0]?.winners?.length === replaceAfterWinnersCount ? peopleRepository.getPhotoUrl($store.prizes[0]?.winners[transaction.index % replaceAfterWinnersCount]?.from) : donorPhoto}
          class={`card_list__item__figure__donor ${!!transaction ? '' : 'empty'}`}
          alt=""
        />
      </figure>
    </div>
{/if}
