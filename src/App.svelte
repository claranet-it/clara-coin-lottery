<script lang="ts">
  import { onMount } from 'svelte'
  import { Route, Router } from 'svelte-routing'
  import Design from './lib/Design.svelte'
  import LotteryButton from './lib/LotteryButton.svelte'
  import PrizeList from './lib/WinnerList.svelte'
  import WinnerNames from './lib/WinnerNames.svelte'
  import { store, storeActions, storeSelectors } from './store'
  import { formatDate } from './utils/date'
  import { Lottery } from './utils/Lottery'
  const logo = '/images/logo_claranet.svg'

  let today = formatDate(new Date())

  let lottery: Lottery

  onMount(async () => {
    if (window.location.pathname === '/') {
      const element = window.document.getElementById('lottery-ball')
      if (!element) throw new Error('lottery-ball not found')

      lottery = new Lottery(element)
    }
  })

  const handleStartExtraction = async () => {
    if ($store.isLotting) {
      return
    }
    await lottery.resetCard(storeSelectors.lastWinner()?.index)
    storeActions.resetWinnerIndex()
    if (storeSelectors.shouldChangePrize()) {
      storeActions.setTransactionsWithLastCurrentPrizeWinners()
      storeActions.moveToNextPrize()
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    storeActions.setIsLotting(true)
    await lottery.rotateBall()
    storeActions.extractWinner()
    await lottery.selectCard(storeSelectors.lastWinner()?.index)
    storeActions.setIsLotting(false)
    storeActions.setIsLastPrizeIfNeeded()

    setTimeout(async () => {
      if ($store.isLastPrize) return

      await lottery.resetCard(storeSelectors.lastWinner()?.index)
      storeActions.resetWinnerIndex()
    }, 10000)
  }
</script>

<main>
  <Router>
    <Route path="/">
      <section class="main_page">
        <aside class="main_aside">
          <header class="main_aside__header">
            <div class="main_aside__header__row">
              <img src={logo} class="main_aside__header__img" alt="Claranet Italia" />
              <p class="main_aside__header__text">presenta</p>
            </div>
            <div class="main_aside__header__row">
              <h1 class="main_aside__header__title">ClaraCoin</h1>
            </div>
            <div class="main_aside__header__row">
              <h2 class="main_aside__header__subtitle">Summer Edition - {today}</h2>
            </div>
          </header>

          <PrizeList />
        </aside>
        <hr />
        <article class="main_article">
          <div class="main_article__lottery">
            <div id="lottery-ball" />
          </div>
          <div class="main_article__cta_wrapper">
            {#if !$store.isLastPrize}
              <LotteryButton on:startExtraction={handleStartExtraction} />
            {:else}
              <WinnerNames transaction={storeSelectors.lastWinner()} />
            {/if}
          </div>
        </article>
        <hr />
      </section>
    </Route>
    <Route path="/design">
      <Design />
    </Route>
  </Router>
</main>
