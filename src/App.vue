<template>
  <div id="app">
    <Animation v-bind:strikes="strikes"/>
    <Word v-bind:wordDisplayLetters="wordDisplayLetters"/>
    <Letters
      v-if="gameIsStarted && !this.getGameStatus().isLost"
      v-bind:letters="alphabet"
      v-bind:tryLetter="tryLetter"
      v-bind:wordDisplayLetters="wordDisplayLetters"
      v-bind:getLetterStatusClass="getLetterStatusClass"
    />

    <Button
      buttonText="Well done, play again"
      buttonStyle="success"
      v-bind:onButtonClick="startGame"
      v-if="this.getGameStatus().isWon"
    />

    <Button
      buttonText="Sorry, try again"
      buttonStyle="error"
      v-bind:onButtonClick="startGame"
      v-if="this.getGameStatus().isLost"
    />

    <Button
      buttonText="Let's start"
      buttonStyle="normal"
      v-bind:onButtonClick="startGame"
      v-if="this.getGameStatus().isPending"
    />

    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
  import axios from 'axios';

  import Animation from './components/Animation.vue';
  import Word from './components/Word.vue';
  import Letters from './components/Letters.vue';
  import Button from './components/Button.vue';

  const initialWord = 'Hangman'.toUpperCase();
  const initialWordArray = initialWord.split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  const MAX_TRIES = 10;

  export default {
    name: 'app',
    data() {
      return {
        word: initialWord,
        wordLetters: initialWordArray,
        wordDisplayLetters: initialWordArray,
        usedLetters: [],
        alphabet,
        gameIsStarted: false,
        wordsData: [],
        strikes: MAX_TRIES,
        isLoading: true,
      }
    },
    mounted() {
      this.fetchWords();
    },
    methods: {
      getGameStatus() {
        const isWon = this.strikes <= MAX_TRIES && this.gameIsStarted && this.word === this.wordDisplayLetters.join('') && !this.isLoading;
        const isLost = this.strikes >= MAX_TRIES && this.gameIsStarted && !this.isLoading;
        const isPending = !this.gameIsStarted && !this.isLoading;

        return {
          isWon,
          isLost,
          isPending,
        };
      },
      fetchWords() {
        const url = 'http://localhost:8080/json/words.json';

        this.isLoading = true;

        axios
          .get(url)
          .then(response => {
            this.isLoading = false;

            // From words we get first 30 words for using and get single words from it
            const first30Words = response.data.data.splice(0, 30);

            this.wordsData = first30Words.map(wordData => !/\s/.test(wordData.word) && wordData.word.toUpperCase());
        });
      },
      getRandomWord() {
        const wordIndex = Math.floor(
          Math.random() * this.wordsData.length
        );
        
        const word = this.wordsData[wordIndex];

        this.wordsData.splice(wordIndex, 1);

        return word;
      },
      startGame(e) {
        if (e) e.preventDefault();

        this.gameIsStarted = true;
        this.strikes = 0;
        this.word = this.getRandomWord();
        this.wordLetters = this.word.split('');
        this.wordDisplayLetters = Array(this.word.length);
        this.usedLetters = [];
      },
      tryLetter(letter) {
        if (this.usedLetters.includes(letter)) {
          return;
        }

        this.usedLetters.push(letter);
        let match = false;

        for (let i = 0; i < this.wordDisplayLetters.length; i++) {
          if (letter === this.wordLetters[i]) {
            this.wordDisplayLetters.splice(i, 1, letter);
            match = true;
          }
        }

        if (!match) {
          this.strikes++;
        }
      },
      getLetterStatusClass(letter) {
        const isMostlyWon = this.word.length - this.wordDisplayLetters.join('').length < 3;
        const isLetterUsed = this.usedLetters.includes(letter);

        if (
         isLetterUsed  || (isMostlyWon && !isLetterUsed && this.word.indexOf(letter) === -1)
        ) {
          return 'disabled-letter';
        }

        return null;
      }
    },
    components: {
      Animation,
      Word,
      Letters,
      Button
    }
  }
</script>

<style lang="scss">
  #app {
    padding: 0 10px 100px;
    text-align: center;
  }
</style>