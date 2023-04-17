<script setup></script>

<template>
  <div class="stats_panel mt-20">
    <h2 class="typo700_16">{{ $t('wallet.stats.header') }}</h2>
    <div class="flex mt-20">
      <span class="typo400_12">{{ $t('wallet.stats.balls') }}</span>
      <span class="typo700_12">12</span>
    </div>
    <hr />
    <div class="flex">
      <span class="typo400_12">{{ $t('wallet.stats.finished') }}</span>
      <span class="typo700_12">4</span>
    </div>
  </div>
</template>

<style>
.stats_panel {
  background-color: var(--panel-bg-color);
  border-radius: 20px;
  padding: 15px 15px 15px 20px;
}
.dark .stats_panel {
  border: 1px solid var(--violet);
}
@media (prefers-color-scheme: dark) {
  .stats_panel {
    border: 1px solid var(--violet);
  }
}
.stats_panel .flex {
  justify-content: space-between;
}
.stats_panel hr {
  margin: 10px 0;
}
</style>
