<template>
  <div class="pdf-base64">
    <p class="pdf-base64__tip">pdf文件数据为base64</p>
    <div
      class="pdf-base64__canvas"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
      <canvas v-for="item in totalPage" :key="item" :id='"the-canvas" + item'></canvas>
    </div>
  </div>
</template>

<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


  const pdfData = atob(
    'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
    'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
    'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
    'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
    'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
    'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
    'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
    'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
    'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
    'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
    'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
    'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
    'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');

  export default {
    data() {
      return {
        fileLoading: false,
        totalPage: 0,
      }
    },
    created() {
      this.loadFile();
    },
    methods: {
      // 加载pdf文件
      loadFile() {
        this.fileLoading = true;
        const loadingTask = pdfjs.getDocument({ data: pdfData });
        loadingTask.promise.then((pdf) => {
          const totalPage = pdf.numPages;
          this.totalPage = totalPage;
          for (let i = 1; i <= totalPage; i++) {
            this.renderPage(pdf, i);
          }
          this.fileLoading = false;
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      // 以canvas的形式渲染
      renderPage(pdfDoc, pageNumber) {
        pdfDoc.getPage(pageNumber).then((page) => {
          const desiredWidth = 800;
          const viewport = page.getViewport({ scale: 1 });
          const scale = desiredWidth / viewport.width;
          const scaledViewport = page.getViewport({ scale });

          const canvas = document.getElementById('the-canvas' + pageNumber);
          const context = canvas.getContext('2d');
          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: scaledViewport
          };
          page.render(renderContext);
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pdf-base64 {
    height: 100%;

    .pdf-base64__tip {
      margin-bottom: 1em;
    }

    .pdf-base64__canvas {
      min-height: 100%;
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
