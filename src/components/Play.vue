<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';



const stageIntro = ref(true)
const stageQuestions = ref(false)
const stageResults = ref(false)
const correctAnswers = ref(0)
const wrongAnswers = ref(0)
const questionIndex = ref(0)
const questions = ref([
  {
    question: 'What color/colour is a polar bears skin?',
    correct_answer: "Black",
    answers: [
      "White",
      "Pink",
      "Black",
      "Green"
    ],
    selectedAnswer: null
  },
  {
    question: 'What are rhinos horn made of?',
    correct_answer: "Keratin",
    answers: [
      "Keratin",
      "Bone",
      "Ivory",
      "Skin"
    ],
    selectedAnswer: null
  },
  {
    question: 'What do you call a baby bat?',
    correct_answer: "Pup",
    answers: [
      "Cub",
      "Chick",
      "Kid",
      "Pup"
    ],
    selectedAnswer: null
  },

])



onMounted(async () => {
  await axios
      .get('http://127.0.0.1:8000/api/quizzes')
      .then(response => {
        questions.value = response.data[0]
      })
      .catch (error => {
        console.log (error);
      })
})





const startQuiz = () => {
  stageIntro.value = false
  stageQuestions.value = true
}

const nextQuestion = () => {
  if (questionIndex.value < questions.value.length - 1) {
    questionIndex.value++
    questions.value.selectedAnswer = null
  } else {
    stageQuestions.value = false
    stageResults.value = true
  }
}

const previousQuestion = () => {
  if (questionIndex.value > 0) {
    questionIndex.value--
    questions.value.selectedAnswer = null
  }
}


const setAnswer = (e) => {
  questions.value.selectedAnswer = e.target.value
  if (questions.value[questionIndex.value].selectedAnswer == questions.value[questionIndex.value].correct_answer) {
    correctAnswers.value++
  } else {
    wrongAnswers.value++
  }
  console.log("questions.value.selectedAnswer ", questions.value[questionIndex.value].selectedAnswer)
  console.log("questions.value[questionIndex.value].correct_answer", questions.value[questionIndex.value].correct_answer)
  console.log("correctAnswer.value ", correctAnswers.value)
  console.log("---")
  e.target.value = null
}


const resetQuiz = () => {
  stageQuestions.value = true
  stageResults.value = false
  correctAnswers.value = 0
  wrongAnswers.value = 0
  questionIndex.value = 0
  questions.value.selectedAnswer = null

  questions.value.map(question => {
    question.selectedAnswer = null
    console.log("hello")
  })
}
</script>

<template>
  <router-view></router-view>
  <h1>Verisure</h1>

  <div v-if="stageIntro" class="quiz-container">
    <button @click="startQuiz">Start</button>
  </div>
  <div v-if="stageQuestions">
    <div class="quiz-container">
      <p>{{ questions[questionIndex].question }}</p>
      <label v-for="(answer, index) in questions[questionIndex]['answers']" :for="index" class="answer">
        <input
            type="radio"
            :id="index"
            :value="answer"
            v-model="questions[questionIndex].selectedAnswer"
            @change="setAnswer($event)"
            :disabled="questions[questionIndex].selectedAnswer"/> {{ answer }}
      </label>
      <button @click="previousQuestion" :disabled="questionIndex === 0">&lt; Back</button>
      <button @click="nextQuestion" :disabled="!questions[questionIndex].selectedAnswer">
        {{
          questionIndex == questions.length - 1 ? 'Finish' : questions[questionIndex].selectedAnswer == null ? 'Select an option' : 'Next >'
        }}
      </button>
      <section>
        <p>Score is {{ correctAnswers }} / {{ questions.length }}</p>
      </section>
    </div>
  </div>
  <div v-if="stageResults" class="quiz-container">
    <button @click="resetQuiz">Reset Quiz</button>
    <p>Score is {{ correctAnswers }} / {{ questions.length }}</p>

    <div v-for="(quiz, key) in questions" class="quiz-container">
      <label v-for="(answer, index) in questions[key]['answers']" :for="index" class="answer">
        <input
            type="radio"
            :id="index"
            :value="answer"
            v-model="questions[key].selectedAnswer"
            @change="setAnswer($event)"
            :disabled="questions[key].selectedAnswer"/> {{ answer }}
      </label>
    </div>
  </div>

</template>


<style>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  width: 500px;
  margin: 0 auto 20px;
}

.answer {
  width: 300px;
  padding: 20px;
  margin: 1px 0;
  background: silver;
  border: 1px solid silver;
}

.answer:hover {
  background: lightgrey;
  cursor: pointer;
  border: 1px solid grey;
}

button {
  margin: 20px 0 0 0;
  padding: 20px;
  width: 342px;
}
</style>
