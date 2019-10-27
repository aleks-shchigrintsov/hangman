<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="260px" viewBox="0 0 350 275"
    preserveAspectRatio="xMidYMid meet">
    
    <line v-if="strikes > 0" x1="100" y1="257" x2="100" y2="40" v-bind:style="lineStyle" />

    <line v-if="strikes > 1" x1="260" y1="257" x2="260" y2="40" v-bind:style="lineStyle" />
    
    <line v-if="strikes > 2" x1="100" y1="40" x2="260" y2="40" v-bind:style="lineStyle" />
    
    <line v-if="strikes > 3" x1="182" y1="40" x2="182" y2="80" v-bind:style="lineStyle" />
    
    <circle v-if="strikes > 4" cx="182" cy="100" v-bind:style="circleStyle" r="20" />
    
    <line v-if="strikes > 5" x1="182" y1="120" x2="182" y2="170" v-bind:style="lineStyle" />
    
    <line v-if="strikes > 6" x1="182" y1="140" x2="212" y2="160" v-bind:style="lineStyle" />
    
    <line v-if="strikes > 7" x1="182" y1="140" x2="154" y2="160" v-bind:style="lineStyle" />
    
    <line v-if="strikes > 8" x1="182" y1="170" x2="154" y2="200" v-bind:style="lineStyle" />
    
    <line v-if="strikes > 9" x1="182" y1="170" x2="210" y2="200" v-bind:style="lineStyle" />
  </svg>
</template>

<script>
  export default {
    name: 'Animation',
    data: function () {
      return {
        lineStyle: 'stroke:#000000;fill:none;stroke-width:2px;',
        circleStyle: 'fill:#FF9966;stroke:#000000;stroke-width:2px;'
      }
    },
    props: {
      strikes: Number
    }
  }
</script>