<template>
  <div class="pdf">
    
    <div class="pdf__toolbar">
      <el-pagination
        layout="prev, pager, next,jumper"
        :page-size="1"
        :total="totalPage"
        @current-change="handleCurrentChange"
        background>
      </el-pagination>
    </div>


    <div
      class="pdf__container"
      ref="container"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
      <div id="pdfViewer" class="pdfViewer"></div>
    </div>

  </div>
</template>

<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer.js';
  import scrollTo from '@/utils/scrollTo';
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  export default {
    props: {
      // 文件类型
      // 如果类型是'file'，则url传入文件地址；如果类型是'base64'，则data传入经过编码的base64的数据。
      fileType: {
        validator(value) {
          return ['file', 'base64'].includes(value);
        }
      },
      // pdf文件地址
      url: {
        type: String,
        default: ''
      },
      // base64的pdf文件字符串
      data: {
        type: String,
        default: ''
      },
      // pdf的缩放模式。可选：'auto'(自动缩放),'page-actual'(实际大小),'page-fit'(适合页面),'page-width'(适合页宽),'0.5'(缩小50%)，'1.5'(放大150%)...
      scaleMode: {
        type: String,
        default: 'page-actual'
      },
      // 是否分页
      pagination: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        fileLoading: false,
        // Some PDFs need external cmaps.
        cmapUrl: 'pdfjs-dist/cmaps/',
        cmapPacked: true,
        // 搜索关键词
        searchText: '',
        // 总页数
        totalPage: 0,
        pdfLinkService: null,
        pdfFindController: null,
        pdfViewer: null
      }
    },
    mounted() {
      this.initPdf();
      this.loadFile();
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
      // 初始化一些需要的功能模块
      initPdf() {
        // 超链接功能(类似a元素的锚点，方便定位到搜索到的内容的位置)
        this.pdfLinkService = new pdfjsViewer.PDFLinkService();
        // 搜索功能
        this.pdfFindController = new pdfjsViewer.PDFFindController({
          linkService: this.pdfLinkService,
        });
        this.pdfViewer = new pdfjsViewer.PDFViewer({
          container: this.$refs.container,
          linkService: this.pdfLinkService,
          findController: this.pdfFindController,
        });

        this.pdfLinkService.setViewer(this.pdfViewer);

        document.addEventListener('pagesinit', () => {
          //设置缩放模式
          this.pdfViewer.currentScaleValue = this.scaleMode;
        });
      },
      // 加载文件
      loadFile() {
        this.fileLoading = true;
        const options = {
          cMapUrl: this.cmapUrl,
          cMapPacked: this.cmapPacked
        };
        if (this.fileType === 'file') {
          options.url = this.url;
        } else if (this.fileType === 'base64') {
          options.data = this.decodeBase64(this.data);
        }
        const loadingTask = pdfjs.getDocument(options);
        loadingTask.promise.then((pdfDoc) => {
          this.totalPage = pdfDoc.numPages;
          this.renderPage(pdfDoc);
          this.fileLoading = false;
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      // 渲染页面
      renderPage(pdfDoc) {
        const a = this.pdfViewer.setDocument(pdfDoc);
        console.log(a)
        this.pdfLinkService.setDocument(pdfDoc, null);
      },
      // 搜索
      handleSearch(searchText) {
        this.pdfFindController.executeCommand('find', { query: searchText });
      },
      // 翻页
      handleCurrentChange(pageNumber) {
        const pages = document.getElementById('pdfViewer').getElementsByClassName('page');
        const targetPage = Array.from(pages).find(page => page.dataset.pageNumber === String(pageNumber));
        console.log(targetPage.offsetTop)
        const offsetTop = targetPage.offsetTop;
        scrollTo(document.querySelector('.pdf'), offsetTop, 500)
      }
    },
  }
</script>

<style src="pdfjs-dist/web/pdf_viewer.css"></style>
<style lang="scss" scoped>
  .pdf {
    height: 100%;
    overflow: auto;

    .pdf__container {
      position: relative;

    }
  }
</style>