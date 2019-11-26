<template>
  <div class="setting">
    <i class="el-icon-setting setting__icon" @click="drawer = true"> </i>

    <el-drawer title="系统界面设置" :visible.sync="drawer" size="300px">
      <el-form label-width="100px">
        <el-form-item label="导航标签：">
          <el-switch v-model="tagVisible" />
        </el-form-item>

        <el-form-item label="系统风格：">
          <style-setting />
        </el-form-item>

        <el-form-item label="元素大小：">
          <size-setting />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import StyleSetting from '@/components/setting/StyleSetting';
  import SizeSetting from '@/components/setting/SizeSetting';

  export default {
    components: {
      StyleSetting,
      SizeSetting
    },
    data() {
      return {
        drawer: false,
        tagVisible: this.$store.getters.tagVisible,
      };
    },
    watch: {
      tagVisible(value) {
        this.$store.commit('SET_TAG_VISIBLE', value);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .setting {
    position: relative;

    .setting__icon {
      position: absolute;
      left: -40px;
      line-height: 60px;
      font-size: 28px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
