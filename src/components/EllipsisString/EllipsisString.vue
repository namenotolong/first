<template>
  <div>


  </div>

</template>



<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    methods: {
      ellipsiString(str, num) {
        str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
