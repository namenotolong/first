<template>
  <div class="pdf-acroforms">

    <div class="pdf-acroforms__tip">
      <p>参考的是pdf.js官方例子：
        <a href="https://github.com/mozilla/pdf.js/tree/master/examples/acroforms" target="_blank">acroforms</a></p>
      <p>优点：1.清晰度更高。</p>
      <p>2.可以使用pdf.js已经实现好的一些功能，比如可以直接从每个page的dataset中获取每一个的页码(虽然也可以自己实现)。</p>
      <p>3.可以保持pdf原文件的大小(A4纸)不变。比如开发一个电子签章功能，需要保证鼠标在page上点击盖章的位置与真实的位置一致。</p>
    </div>

    <div
      class="pdf-acroforms__container"
      ref="container"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
    </div>
  </div>
</template>


<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import * as pdfjsViewer from '../../../../node_modules/pdfjs-dist/web/pdf_viewer.js'
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


  export default {
    data() {
      return {
        fileLoading: false,
        fileUrl: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf'
      }
    },
    created() {

    },
    mounted() {
      this.loadFile();
    },
    methods: {
      // 加载pdf文件
      loadFile() {
        this.fileLoading = true;
        const loadingTask = pdfjs.getDocument(this.fileUrl);
        loadingTask.promise.then((pdf) => {
          const totalPage = pdf.numPages;
          for (let i = 1; i <= totalPage; i++) {
            this.renderPage(pdf, i);
          }
          this.fileLoading = false;
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      renderPage(pdfDoc, pageNumber) {
        pdfDoc.getPage(pageNumber).then(page => {
          const pdfPageView = new pdfjsViewer.PDFPageView({
            container: this.$refs.container,
            id: pageNumber,
            scale: 1,
            defaultViewport: page.getViewport({ scale: 1 }),
            annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
            renderInteractiveForms: true,
          });
          pdfPageView.setPdfPage(page);
          pdfPageView.draw();
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pdf-acroforms {
    height: 100%;

    .pdf-acroforms__tip {
      margin-bottom: 1em;
    }

    .pdf-acroforms__container {
      min-height: 100%;
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
<style lang="scss">
  .pdf-acroforms {
    .page {
      margin-bottom: 1em;
    }
  }
</style>