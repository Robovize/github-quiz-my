<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from '../db';



const stageIntro = ref(true)
const stageQuestions = ref(false)
const stageResults = ref(false)
const correctAnswers = ref(0)
const wrongAnswers = ref(0)
const questionIndex = ref(0)
const APIquestions = ref([])
// const questions = ref([])
const APItitle = ref('')
// const title = ref('')
const APIid = ref('')
const id = ref('')
const answerHistory = computed(() => {
  return questions.value.map(question => {
    return {
      quizID: question.quizID,
      questionID: question.questionID,
      selectedAnswer: question.selectedAnswer,
      correctAnswer: question.is_answer_correct,
    }
  })
})



onMounted(async () => {
  await axios
      .get('http://127.0.0.1:8000/api/quizzes')
      .then(response => {
        APIquestions.value = response.data[0].content
        APItitle.value = response.data[0].title
        id.value = response.data[0].id
        console.log("---")
        console.log(questions.value)
        console.log(title.value)
        console.log("---")
      })
      .catch (error => {
        console.log (error);
      })
})





const startQuiz = () => {
  stageIntro.value = false
  stageQuestions.value = true
}

const nextQuestion = async () => {
  if (questionIndex.value < questions.value.length - 1) {
    questionIndex.value++
    questions.value.selectedAnswer = null
  } else {
    stageQuestions.value = false
    stageResults.value = true
    await axios
        .put('http://127.0.0.1:8000/api/user/2', {
          answerHistory: answerHistory.value
        })
        .then(response => {
          console.log(response.data)
        })
        .catch (error => {
          console.log (error);
        })
    console.log(answerHistory.value)

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
    questions.value[questionIndex.value].is_answer_correct = true;
    correctAnswers.value++
  } else {
    questions.value[questionIndex.value].is_answer_correct = false;
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

  questions.value.map(question => {
    question.selectedAnswer = null
    console.log("hello")
  })
}




const updateLocalDB = () => {
  db.items.add({ id: id.value ,title: 'a', content: 'a' })
  console.log(id.value)
}


const localDBItems = ref(useObservable(liveQuery(() => db.items.toArray())))
const questions = ref(useObservable(liveQuery(() => db.items.content)))

</script>

<template>
  <router-view></router-view>
  <h1>{{ localDBItems[0].title }}</h1>
  <button @click="updateLocalDB">Update Local DB</button>

  <div v-if="stageIntro" class="quiz-container">
    <button @click="startQuiz">Start</button>
  </div>
  <div v-if="stageQuestions">
    <div class="quiz-container">
      <p>{{ questions[questionIndex].question }}</p>
      <label v-for="(answer, index) in questions[questionIndex]['answers']" :key ="index" :for="index" class="answer">
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

    <div v-for="(quiz, key) in questions" :key ="key" class="quiz-container">
      <label v-for="(answer, index) in questions[key]['answers']" :key ="index" :for="index" class="answer">
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


<style scoped>
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
