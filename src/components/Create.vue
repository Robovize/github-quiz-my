<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';


const title = ref('');
// const difficulty = ref('');
// const category = ref('');
const questions = ref([
  {
    question: '',
    correct_answer: '',
    answers: [{
      answer: '',
      correct: false
    }]
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
    question: '',
    correct_answer: '',
    answers: [{
      answer: '',
      correct: false
    }]
  });
}

const addAnswer = (answerGroupIndex) => {
  questions.value[answerGroupIndex].answers.push({
    answer: '',
    correct: false
  });
  console.log("--")
  console.log(questions.value[answerGroupIndex].answers)
  console.log("--")
}

const setCorrectAnswer = (answerGroupIndex, answerInputIndex) => {
  questions.value[answerGroupIndex].answers[answerInputIndex].correct = !questions.value[answerGroupIndex].answers[answerInputIndex].correct;
  // console.log("-------------------")
  // console.log(questions.value[answerGroupIndex])
  // console.log(questions.value)
  // console.log(answerGroupIndex)
  // console.log(answerInputIndex)
  // console.log("-------------------")
  // console.log(questions.value[index.value].answers[answerInputIndex].correct)
  // console.log(questions.value[index].answers.correct)
  // console.log(questions.value[index].answers)
}

const removeAnswer = (answerGroupIndex, answerInputIndex) => {
  questions.value[answerGroupIndex].answers.splice(answerInputIndex, 1);
  // console.log(answerInputIndex)
  // console.log(questions.value[answerGroupIndex].answers)
}

</script>
<template>
  <div class="form-container">
    <label for="quiz-title"><span>Title</span>
      <input v-model="title" id="quiz-title" type="text" placeholder="Quiz Title" class="form-input">
    </label>

    <div v-for="(answerGroup, answerGroupIndex) in questions" :key="answerGroupIndex" class="answerGroup">
      <label :for="`question${(answerGroupIndex+1)}`" class="answerLabel"><span>Question {{ answerGroupIndex + 1 }}</span>
        <input v-model="questions[answerGroupIndex].question" :id="`question${(answerGroupIndex+1)}`" type="text" :placeholder="`Question ${(answerGroupIndex+1)}`" class="form-input">
      </label>


      <div v-for="(answerInput, answerInputIndex) in questions[answerGroupIndex].answers" :key="answerInputIndex" class="answer">
        <label :for="`answer${(answerGroupIndex+1)}`" class="answerLabel"><span>Answer {{ answerInputIndex + 1 }}</span>
          <input v-model="answerInput.answer" :id="`answer${(answerGroupIndex+1)}`" type="text" :placeholder="`Answer ${(answerInputIndex+1)}`" class="form-input">
        </label>
        <button @click="removeAnswer(answerGroupIndex, answerInputIndex)" >Remove</button>
        <button @click="setCorrectAnswer(answerGroupIndex, answerInputIndex)" :class="answerInput.correct ? 'setAnswerTrue' : 'setAnswerFalse'">Correct</button>
        <button @click="moveAnswer(answerGroupIndex)" >Move</button>
      </div>


      <div style="display: flex; justify-content: flex-end">
        <button @click="addAnswer(answerGroupIndex)" style="width: 100px">+</button>
      </div>


    </div>


    <button @click="addQuestion">Add Question</button>
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

.form-input::placeholder {
font-size: 10px;
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
  color: green;
}

.setAnswerFalse{;
  color: red;
}
</style>
