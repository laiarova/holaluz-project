<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'BaseCard',
}
</script>

<style scoped>
div{
  display: flex;
  border-radius: 15px;
  box-shadow: 0 5px 13px rgb(0 0 0 / 26%);
  flex:1;
  align-self: center;
}
</style>