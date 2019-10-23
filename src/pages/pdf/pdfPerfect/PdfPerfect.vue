<template>
  <div class="pdf-prefect">
    <iframe
      frameborder="0"
      width="100%"
      height="100%"
      :src="`./static/pdf/web/viewer.html?file=${encodeURIComponent('http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf')}`">
    </iframe>
  </div>
</template>

<style>
  .pdf-prefect {
    height: 100%;
  }
</style>
