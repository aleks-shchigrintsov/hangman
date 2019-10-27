<template>
  <div class="word-container">
    <div
      class="letter"
      v-for="(letter, index) in wordDisplayLetters"
      v-bind:key="index"
    >
      {{ letter }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Word',
    data: function () {
      return {}
    },
    props: {
      wordDisplayLetters: Array,
    }
  }
</script>

<style lang="scss">
  @import '../styles/typography.scss';

  .letter {
    display: inline-block;
    border-bottom: 1px solid;
    margin: 0 3px;
    font-size: $font-size-title;
    min-width: 30px;
    vertical-align: bottom;
  }

  .word-container {
    margin-bottom: 20px;
  }
</style>