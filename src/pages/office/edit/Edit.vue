 <template>
   <div class="office-edit">
     <div>在线编辑需要在服务端部署office-online，才能在线编辑远程文件</div>
     <office mode="edit" :fileURL="fileURL" />
   </div>

 </template>

 <script>
   import Office from '@/components/office';

   export default {
     name: 'OfficeEdit',
     components: {
       Office
     },
     data() {
       return {
         fileURL: 'http://120.202.98.108:9079/wopi/files/YAkINBL3vBrmuxUgFmA5SZcgva45m4MCT2R-ywAHYnm1bCk7HdvclIsin55CR66ZmCoyQUYaU6N7-gfTPudRtvZLBZyRJwjPZkYAqi7-QNLNSVfEK_vSuRf04CGvOvvg1Rpo0E9F9WRYJnWAd03IMDi2bedwxuytBleAJkyEJV9gwJsPFUCGl1UfivAvGoSmHYue9sS-OIJh4V48UvT5hhiVZMy5w2laGMXfsSld4iQ'
       }
     }
   }
 </script>

 <style scoped>
   .office-edit {
     height: 100%
   }
 </style>
