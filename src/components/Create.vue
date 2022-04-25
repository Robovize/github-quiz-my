<template>
  <div class="form-container">
    <label for="quiz-title"><span>Title</span>
      <input v-model="quizTitle" id="quiz-title" type="text" placeholder="Quiz Title" class="form-input">
    </label>

    <label for="quiz-title"><span>Question</span>
      <input v-model="quizQuestion" id="quiz-question" type="text" placeholder="Quiz Question" class="form-input">
    </label>

    <div class="form-answers">
      <label for="quiz-title"><span>Answer 1</span>
        <input v-model="quizAnswer1" id="quiz-answer1" type="text" placeholder="Answer 1" class="form-input">
      </label>

      <label for="quiz-title"><span>Answer 2</span>
        <input v-model="quizAnswer2" id="quiz-answer2" type="text" placeholder="Answer 2" class="form-input">
      </label>

      <label for="quiz-title"><span>Answer 3</span>
        <input v-model="quizAnswer3" id="quiz-answer3" type="text" placeholder="Answer 3" class="form-input">
      </label>

      <label for="quiz-title"><span>Answer 4</span>
        <input v-model="quizAnswer4" id="quiz-answer4" type="text" placeholder="Answer 4" class="form-input">
      </label>
    </div>


  </div>
</template>

<script>
export default {
  name: "Create"
}
</script>

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
  background: lightgrey;
  width: 500px;
  margin: 0 auto 20px;
  padding: 50px 20px 50px 0;
}
.form-input {
  width: 300px;
  padding: 20px;
  margin: 1px 0 0 20px;
  background: silver;
  border: 1px solid silver;
}
</style>
