<template>
  <div>
    <input type="text" ref="goal" :placeholder="placeholderText">
    <button @click="$emit('search',$refs.goal.value)">Send info</button>
  </div>
</template>

<script>
export default {
  name: 'BaseSearcher',
  props:{
    placeholderText:{
      type: String,
      required: false,
      default: ''
    },
  },
}
</script>

<style scoped>
div{
  display: flex;
  align-self: center;
  background-color: v-bind(color);
  flex:1;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-bottom: 50px;
}
input{
  font-size: 17px;
  margin: 5px 11px;
  flex: 1;
  border: none;
  outline: none;
}
button{
  width: 130px;
  background-color: #9bd0ff;
  border: none;
  border-radius: 11px;
  cursor: pointer;
}
</style>
