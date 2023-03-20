<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none">
    <path
      d="M19.25 11.724a8.25 8.25 0 01-5.412 7 8.25 8.25 0 01-8.636-1.926 8.25 8.25 0 01-1.926-8.636 8.25 8.25 0 017-5.412 6.416 6.416 0 008.974 8.974z"
      stroke="#4e4e4e"
      stroke-width="1.833"
      stroke-linejoin="round"
    ></path>
  </svg>
</template>

<style scoped>
.light svg {
  fill: var(--light) !important;
}

.dark svg {
  fill: var(--dark) !important;
}

.dark svg path {
  stroke: var(--color-active);
}
</style>
