<script lang="ts">
  import { Transaction } from '../utils/transaction'
  import { peopleRepository } from '../utils/transaction/repositories'
  export let transaction: Transaction
</script>

<figure class="card_list__item__figure">
  <img
    src={peopleRepository.getPhotoUrl(transaction?.to)}
    class={`card_list__item__figure__receiver ${!!transaction ? '' : 'empty'}`}
    alt=""
  />
  <img
    src={peopleRepository.getPhotoUrl(transaction?.from)}
    class={`card_list__item__figure__donor ${!!transaction ? '' : 'empty'}`}
    alt=""
  />
</figure>
<div class="card_list__item__surfers">
  <p class="card_list__item__surfers__role">Ricevente</p>
  <p class="card_list__item__surfers__name">
    {!!transaction ? peopleRepository.find(transaction.to)?.name : '???'}
  </p>
  <p class="card_list__item__surfers__role">Donatore</p>
  <p class="card_list__item__surfers__name">
    {!!transaction ? peopleRepository.find(transaction.from)?.name : '???'}
  </p>
</div>
