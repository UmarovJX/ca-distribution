<script setup>
const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="wallet_panel">
    <div>
      <div class="typo600_12 hint_text">{{ props.entry.created_at }}</div>
      <div class="typo700_14 mt-5">{{ props.entry.text }}</div>
      <div class="mt-5 flex">
        <svg
          class="mr-12"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_497_673)">
            <circle cx="7.5" cy="7.5" r="6.25" stroke="#42C6A5" />
            <path
              d="M5.3125 7.8125L6.5625 9.0625L9.6875 5.9375"
              stroke="#42C6A5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_497_673">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <!-- <svg
          class="mr-12"
          v-else
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_497_701)">
            <circle cx="7.5" cy="7.5" r="6.25" stroke="#E22C4E" />
            <path
              d="M9.06249 5.93751L5.9375 9.0625M5.93749 5.9375L9.06247 9.06249"
              stroke="#E22C4E"
              stroke-linecap="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_497_701">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg> -->
        <span class="typo400_12"> Оплачено</span>
      </div>
    </div>
    <div class="badge typo600_12">{{ $t('wallet.ball') }}: {{ props.entry.amount }}</div>
  </div>
</template>

<style>
.wallet_panel {
  background-color: var(--panel-bg-color);
  border-radius: 20px;
  padding: 15px 15px 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .wallet_panel {
  border: 1px solid var(--ocean-green);
}
@media (prefers-color-scheme: dark) {
  .wallet_panel {
    border: 1px solid var(--ocean-green);
  }
}

.wallet_panel.panel_disabled {
  padding: 14px 14px 14px 19px;
  border: 1px solid var(--red);
}
.badge {
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--badge-bg-color);
}
.panel_disabled .badge {
  background: var(--badge-bg-color-disabled);
  border: 1px solid var(--violet);
  padding: 7px 9px;
}

.lock_container {
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
}
.lesson_details {
  align-items: center;
  flex-grow: 1;
}
.hint_text {
  color: #fc8d2d;
  display: flex;
  align-items: center;
}

.hint_text svg {
  margin-right: 5px;
}

.black {
  color: #1a1a1a;
}
.mw_170 {
  width: 170px;
}
.color_disabled {
  color: var(--placeholder-color);
}
</style>
