<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';


const title = ref('');
// const difficulty = ref('');
// const category = ref('');
const questions = ref([
  {
    questionID: '',
    question: '',
    correct_answer: '',
    answers: [{
      answer: '',
      correct: false
    }],
    selectedAnswer: null,
    is_answer_correct: null
  },
]);

const save = async () => {
  await axios
      .post('http://127.0.0.1:8000/api/quiz/store', {
        newTitle: title.value,
        newContent: questions.value
      })
      .then(response => {
        console.log(response)
        //console.log(title.value)
      })
      .catch(error => {
        console.log(error);
      })
}

const addQuestion = () => {
  questions.value.push({
    questionID: '',
    question: '',
    correct_answer: '',
    answers: [{
      answer: '',
      correct: false
    }],
    selectedAnswer: null,
    is_answer_correct: null
  });
}

const addAnswer = (index) => {
  questions.value[index].answers.push({
    answer: '',
    correct: false
  });
  console.log("--")
  console.log(questions.value[index].answers)
  console.log(questions.value[index])
  console.log(questions.value)
  console.log("--")
}

const setCorrectAnswer = (index, index2) => {
  questions.value[index2].answers.correct = !questions.value[index2].answers.correct;
  console.log("--")
  console.log(questions.value[index.value].answers[index2].correct)
  console.log(questions.value[index].answers.correct)
  console.log(questions.value[index].answers)
  console.log(questions.value[index])
  console.log(questions.value)
  console.log("--")
}

const log = (index, index2) => {
  console.log("--")
  console.log(questions.value[index])
  console.log(questions.value)
  console.log(questions.value[index2])
  console.log("--")
}
</script>
<template>
  <div class="form-container">
    <label for="quiz-title"><span>Title</span>
      <input v-model="title" id="quiz-title" type="text" placeholder="Quiz Title" class="form-input">
    </label>

    <div v-for="(answerGroup, index) in questions" :key="index" class="answerGroup">
      <label for="quiz-title" class="answerLabel"><span>Question {{ index + 1 }}</span>
        <input v-model="questions[index].question" :id="`question${(index+1)}`" type="text" :placeholder="`Question ${(index+1)}`" class="form-input">
      </label>


      <div v-for="(answerInput, index2) in questions[index].answers" :key="index2" class="answer">
        <label for="quiz-title" class="answerLabel"><span>Answer {{ index2 + 1 }}</span>
          <input v-model="answerInput.answer" :id="`answer${(index+1)}`" type="text" :placeholder="`Answer ${(index+1)}`" class="form-input">
        </label>
        <button @click="removeAnswer(index)" >Delete</button>
        <button @click="setCorrectAnswer(index, index2)" :class="answerInput.correct ? 'setAnswerTrue' : 'setAnswerFalse'">Correct</button>
        <button @click="moveAnswer(index)" >Move</button>
        <br>
        <button @click="log(index, index2)">aa</button>
        1: {{ questions[index].answers }}<br>
        2: {{ index }}<br>
        3: {{ index2 }}<br>
        4: {{ answerInput.correct }}
      </div>


      <div style="display: flex; justify-content: flex-end">
        <button @click="addAnswer(index)" style="width: 100px">+</button>
      </div>

      <label for="quiz-title" class="answerLabel"><span>Correct Answer {{ index + 1 }}</span>
        <input v-model="questions[index].correct_answer" :id="`correct_answer${(index+1)}`" type="text" :placeholder="`Correct Answer ${(index+1)}`" class="form-input">
      </label>


    </div>


    <button @click="addQuestion()">Add Question</button>
    <button @click="save">Save</button>


  </div>
</template>


<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background: lightgrey;
  width: 500px;
  margin: 0 auto 20px;
  padding: 50px 20px 50px 0;
}

.form-input {
  padding: 5px;
  margin: 1px 0 0 20px;
  border: 1px solid silver;
}

.answerGroup {
  width: 100%;
  background: #fafdfe;
  padding: 10px;
  margin: 10px 0;
}



.answer {
  background: lightgrey;
  width: 100%;
  padding-left: 10px;
}

.setAnswerTrue{
  background: green;
  color: white;
}

.setAnswerFalse{
  background: red;
  color: white;
}
</style>
