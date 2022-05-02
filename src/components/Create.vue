<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';


const title = ref('');
// const difficulty = ref('');
// const category = ref('');
const content = ref([
  {
    question: '',
    correct_answer: '',
    answers: []
  }
]);

const save = async () => {
  await axios
      .put('http://127.0.0.1:8000/api/quiz/store', {
        newTitle: "hello"
      })
      .then(response => {
        console.log(response.data)
        console.log(title.value)
      })
      .catch (error => {
        console.log (error);
      })
}



</script>



<template>
  <div class="form-container">
    <label for="quiz-title"><span>Title</span>
      <input v-model="title" id="quiz-title" type="text" placeholder="Quiz Title" class="form-input">
    </label>
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
.form-answers{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 500px;
  margin: 0 auto 20px;
  padding: 50px 20px 50px 0;
}
.form-input {
  width: 300px;
  padding: 20px;
  margin: 1px 0 0 20px;
  border: 1px solid silver;
}
</style>
