<template>
  <el-tooltip effect="dark" content="换肤" placement="bottom">
    <el-color-picker popper-class="theme-picker" v-model="primaryTheme" :predefine="predefineThemes" size="small" />
  </el-tooltip>
</template>

<script>
  export default {
    data() {
      return {
        primaryTheme: '#409eff',
        predefineThemes: ['#409eff', '#1cc09d', '#ffa69e', '#ff4879', '#DDC9B4', '#5b5bea', '#FF8822', '#757575', '#5FC3D7', '#20BF55'],
        defaultColors: [],
        defaultCustomStyle: '',
        defaultElementStyle: ''
      };
    },
    watch: {
      primaryTheme(newTheme) {
        // if (!/^#[\dabcdef]{6}$/i.test(newTheme)) {
        //     this.$message.error('请选择正确的颜色！')
        //     return false;
        // }
        this.updateStyle(newTheme);
      }
    },
    created() {
      this.defaultColors = this.getColors(this.primaryTheme.replace('#', ''));
      // ['409eff', '64,158,255', '53a8ff', '66b1ff', '79bbff', '8cc5ff', 'a0cfff', 'b3d8ff', 'c6e2ff', 'd9ecff', 'ecf5ff', '3a8ee6']
    },
    mounted() {
      this.createStyleTag('element_theme');
      this.getDefaultStyle();
    },
    methods: {
      createStyleTag(id) {
        //退出登录后再登录会重新渲染组件，避免重复创建。
        if (document.getElementById(id)) {
          return false;
        }
        let styleTag = document.createElement('style');
        styleTag.setAttribute('id', id);
        document.head.appendChild(styleTag);
      },
      getDefaultStyle() {
        this.getDefaultElementStyle(() => {
          this.getDefaultCustomStyle(() => {
            const ms_theme = localStorage.getItem('ms_theme');
            if (ms_theme) {
              this.primaryTheme = ms_theme;
            }
          })
        })
      },
      // 获取element的默认样式
      getDefaultElementStyle(callback) {
        const version = require('element-ui/package.json').version;
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            //字体文件还是用element的theme-chalk中的
            this.defaultElementStyle = xhr.responseText.replace(/@font-face{[^}]+}/, '');
            callback();
          }
        };
        xhr.open('GET', url, true);
        xhr.send();
      },

      // 获取custom-theme的默认样式
      getDefaultCustomStyle(callback) {
        // 开发环境下可以从内部style元素中获取custom-theme
        // 生产环境下style会被抽离成单独的外部css文件，需要从link中获取custom-theme
        const styles = document.head.querySelectorAll('style');
        const customStyle = Array.from(styles).find(style => {
          return style.innerText.includes('277040a3-ee24-9156-6686-56eaad8218a9');
        })
        if (customStyle) {
          customStyle.setAttribute('id', 'custom_theme');
          this.defaultCustomStyle = customStyle.innerText;
          callback()
        } else {
          const links = document.head.getElementsByTagName('link');
          Array.from(links).forEach(link => {
            const url = link.href;
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4 && xhr.status === 200) {
                const cssText = xhr.responseText;
                if (cssText.includes('277040a3-ee24-9156-6686-56eaad8218a9')) {
                  this.createStyleTag('custom_theme');
                  this.defaultCustomStyle = cssText;
                  callback()
                }
              }
            };
            xhr.open('GET', url, true);
            xhr.send();
          })
        }
      },

      // 由基础颜色值生成一系列颜色值
      getColors(theme) {
        // 实现sass的mix函数与#fff合并。与白色合并其实就是改变透明度。

        /* $custom-primary-white__9:mix($custom-white, $custom-primary, 90%);
        $custom-primary-opacity__1:rgba($custom-primary,0.1);
        它们的效果是一样的 */

        const tintColor = (color, tint) => {
          let red = parseInt(color.slice(0, 2), 16);
          let green = parseInt(color.slice(2, 4), 16);
          let blue = parseInt(color.slice(4, 6), 16);
          // 有些背景需要设置透明度，用到了rgba颜色值。
          if (tint === 0) {
            return [red, green, blue].join(',');
            //如果是未经压缩的css文件，或scss编译后的css文件，注意rgba中逗号后会有一个空格。
          } else {
            red = Math.round(red * (1 - tint) + 255 * tint);
            green = Math.round(green * (1 - tint) + 255 * tint);
            blue = Math.round(blue * (1 - tint) + 255 * tint);
            red = red.toString(16);
            green = green.toString(16);
            blue = blue.toString(16);
            return `${red}${green}${blue}`;
          }
        };
        // button-active使用的这个色
        const shadeColor = (color, shade) => {
          let red = parseInt(color.slice(0, 2), 16);
          let green = parseInt(color.slice(2, 4), 16);
          let blue = parseInt(color.slice(4, 6), 16);
          red = Math.round((1 - shade) * red);
          green = Math.round((1 - shade) * green);
          blue = Math.round((1 - shade) * blue);
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);
          return `${red}${green}${blue}`;
        };
        const colors = [theme];
        for (let i = 10; i--;) {
          colors.push(tintColor(theme, i / 10));
        }
        colors.push(shadeColor(theme, 0.1));
        return colors;
      },
      // 更新样式
      updateStyle(newTheme) {
        const newColors = this.getColors(newTheme.replace('#', ''));

        let newCustomStyle = this.defaultCustomStyle;
        this.defaultColors.forEach((color, index) => {
          newCustomStyle = newCustomStyle.replace(
            new RegExp(color, 'ig'),
            newColors[index]
          );
        });
        document.head.querySelector('#custom_theme').innerText = newCustomStyle;

        let newElementStyle = this.defaultElementStyle;
        this.defaultColors.forEach((color, index) => {
          newElementStyle = newElementStyle.replace(
            new RegExp(color, 'ig'),
            newColors[index]
          );
        });
        document.head.querySelector('#element_theme').innerText = newElementStyle;

        localStorage.setItem('ms_theme', newTheme);
      }
    }
  };
</script>
<style lang="scss">
  .theme-picker {

    .el-color-dropdown__value,
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
</style>
