<template>
  <div class="pdf-prefect">
    <iframe
      frameborder="0"
      width="100%"
      height="100%"
      :src="`./static/pdf/web/viewer.html?file=${data}`"
      >
    </iframe>
  </div>
</template>


<script>
  // :src="`./static/pdf/web/viewer.html?file=${encodeURIComponent('http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf')}`"

  import data from '../pdfBase64/data.js';

  export default {
    data() {
      return {
        data: ''
      }
    },
    created() {
      this.data = this.decodeBase64(data);
    },
    methods: {
      //将base64数据解码
      decodeBase64(data) {
        //[RFC2045]中有规定：base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉。
        // 如果后端返回的base64数据带有MIME类型，需要从MIME类型之后开始清除换行和回车符。
        // 如果不带MIME类型，直接去除回车和换行，然后使用atob解码(不需要手动加上MIME类型头)。
        const maker = ';base64,';
        let newData = '';
        if (data.indexOf(maker) > -1) {
          const base64Index = data.indexOf(maker) + maker.length;
          newData = data.substring(base64Index).replace(/[\r\n]/g, '');
        } else {
          newData = data.replace(/[\r\n]/g, '');
        }
        return window.atob(newData);
      },
    },
  }
</script>

<style>
  .pdf-prefect {
    height: 100%;
  }
</style>