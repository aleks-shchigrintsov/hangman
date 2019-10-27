 <template>
  <div>
    <div class="letters-container">
      <div
        class="letter"
        v-bind:class="getLetterStatusClass(letter)"
        v-for="(letter, index) in letters"
        v-bind:key="index"
        @click="tryLetter(letter)"        
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Letters',
    data: function () {
      return {}
    },
    props: {
      initialized: Boolean,
      tryLetter: Function,
      letters: Array,
      getLetterStatusClass: Function
    },
  }
</script>

<style lang="scss">
  @import '../styles/typography.scss';
  @import '../styles/responsive.scss';

  .letter {
    display: inline-block;
    margin: 10px 3px 0px 3px;
    font-size: 30px;
    width: 30px;
    cursor: pointer;
    font-family: $title-font-stack;
  }
   
  .letters-container {
    margin: auto;
    width: 100%;

    @include respond-from(md) {
      width: 350px;
    }
  }

  .disabled-letter {
    opacity: .5;
    pointer-events: none;
  }
</style>