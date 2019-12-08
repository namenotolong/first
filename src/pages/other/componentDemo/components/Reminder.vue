<template>
  <div>
    <input type="button" value="使用全局方法调用" @click="global">
    <input type="button" value="在当前组件内调用" @click="part">
    <input type="button" value="别名调用" @click="alias">
    <input type="button" value="不自动关闭，可在异步操作完成之后手动关闭" @click="manualClose">
  </div>
</template>

<script>
  // 在组件内使用
  import reminder from '@/components/Reminder';

  export default {
    data() {
      return {};
    },
    methods: {
      global() {
        this.$reminder('这是一段普通消息！');
      },
      part() {
        reminder({
          type: 'success',
          message: '这是一段成功消息！这是一段成功消息！这是一段成功消息！这是一段成功消息！这是一段成功消息！这是一段成功消息！这是一段成功消息！这是一段成功消息！',
          duration: 5000,
          onClose(arg) {
            console.log(arg);
            console.log('关闭之后的回调');
          }
        })
      },
      alias() {
        this.$reminder.error('这是一段错误消息！')
      },
      manualClose() {
        const reminder = this.$reminder.loading({
          type: 'loading',
          message: '请求中...',
          duration: 0
        })
        setTimeout(reminder.close, 5000);
      }
    }
  };
</script>
