<template>
  <a
    href="#"
    v-bind:class="className"
    @click="onButtonClick"
  >
    {{ buttonText }}
  </a>
</template>

<script>
  export default {
    name: 'Button',
    data() {
      return {
        className: this.getButtonClassName()
      }
    },
    props: {
      onButtonClick: Function,
      buttonText: String,
      buttonStyle: String
    },
    methods: {
      getButtonClassName() {
        const BUTTON_STYLE = {
          SUCCESS: 'success',
          ERROR: 'error',
          NORMAL: 'normal',
        }

        switch (this.buttonStyle) {
          case BUTTON_STYLE.SUCCESS:
            return 'button-success';

          case BUTTON_STYLE.ERROR:
            return 'button-error';
        
          default:
            return 'button-normal';
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';
  @import '../styles/typography.scss';
  @import '../styles/responsive.scss';
  
  .button,
  .button-normal,
  .button-success,
  .button-error {
    display: block;
    margin-top: 50px;
    padding: 13px 45px;
    border-radius: 4px;
    color: $white-color;
    font-weight: $font-weight-bold;
    font-size: $font-size;
    font-family: $font-stack;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

    @include respond-from(md) {
      display: inline-block;
    }
  }

  .button-normal {
    background-color: $orange-color;
  }

  .button-success {
    background-color: $success-color;
  }

  .button-error {
    background-color: $error-color;
  }
</style>