<template>
  <div class="pdf-component">
    <pdf
      fileType="file"
      url="http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf" />
  </div>
</template>

<script>
  import Pdf from '@/components/pdf';

  export default {
    components: {
      Pdf
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .pdf-component {
    height: 100%;
  }
</style>