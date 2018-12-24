<template>
    <el-tooltip effect="dark" content="换肤" placement="bottom">
        <el-color-picker popper-class="theme-picker" v-model="primaryTheme" :predefine="predefineThemes" size="small" />
    </el-tooltip>
</template>

<script>
    export default {
        data() {
            return {
                primaryTheme: "#409eff",
                predefineThemes: ["#409eff", "#1cc09d", "#ffa69e", "#ff4879", "#DDC9B4", "#843B62", "#FF8822",
                    "#EE7FA8", "#757575", "#5FC3D7", "#E7E88F", "#20BF55", "#847577"
                ],
                defaultColors: [],
                defaultCustomStyle: "",
                defaultElementStyle: ""
            }
        },
        watch: {
            primaryTheme(newTheme) {
                // if (!/^#[\dabcdef]{6}$/i.test(newTheme)) {
                //     this.$message.error("请选择正确的颜色！")
                //     return false;
                // }
                this.updateStyle(newTheme);
            }
        },
        created() {
            this.defaultColors = this.getColors(this.primaryTheme.replace('#', ''));
            // ["409eff", "64,158,255", "53a8ff", "66b1ff", "79bbff", "8cc5ff", "a0cfff", "b3d8ff", "c6e2ff", "d9ecff", "ecf5ff", "3a8ee6"]

        },
        mounted() {
            this.getDefaultCustomStyle();
            this.createStyleTag("element_theme");
            this.createStyleTag("custom_theme");
            const ms_theme = localStorage.getItem("ms_theme");
            if (ms_theme) {
                this.getDefaultElementStyle(() => {
                    this.primaryTheme = ms_theme;
                });
            } else {
                this.getDefaultElementStyle(() => {
                    document.getElementById("element_theme").innerText = this.defaultElementStyle;
                    document.getElementById("custom_theme").innerText = this.defaultCustomStyle;
                });
            }
        },
        methods: {
            // 创建Style标签。
            createStyleTag(id) {
                //退出登录后再登录会重新渲染组件，避免重复创建。
                if (document.getElementById(id)) {
                    return false;
                }
                let styleTag = document.createElement("style");
                styleTag.setAttribute("id", id);
                document.head.appendChild(styleTag);
            },
            // 获取element的默认样式
            getDefaultElementStyle(callback) {
                const version = require('element-ui/package.json').version;
                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this.defaultElementStyle = xhr.responseText.replace(/@font-face{[^}]+}/, ''); //字体文件还是用element的theme-chalk中的
                        callback();
                    }
                }
                xhr.open("GET", url, true);
                xhr.send();
            },
            // 获取custom-theme的默认样式
            /* 获取custom-theme样式的三种方法 */
            /* 1.在一个js文件中将custom-theme样式以字符串存储，然后export。
            在ThemePicker组件中import这个js文件，就得到了默认的custom-theme样式 */
            /* 2.写一个custom-theme.css文件，不过这个文件要放在后端服务器上,放在前端目录里打包之后axios请求会出现路径问题。
            然后像获取element.css文件一样获取这个css文件，就得到了默认的custom-theme样式 */
            /* 3.写一个custom-theme.scss文件，要动态改变的颜色值就可以用变量控制，并在这个文件中做一个特殊标记。
            在mian.js中import这个scss文件。
            在ThemePicker组件中找到所有的style标签，获取标签的innerText，看哪个标签中有提前做好的标记，那么这个style标签的内容就是所要的默认custom-theme样式。 */

            getDefaultCustomStyle() {
                const styles = document.head.querySelectorAll("style");
                Array.from(styles).some(style => {
                    const styleText = style.innerText;
                    if (styleText.includes("277040a3-ee24-9156-6686-56eaad8218a9")) {
                        this.defaultCustomStyle = styleText.replace("277040a3-ee24-9156-6686-56eaad8218a9", "");
                        return true;
                    }
                })
            },
            // 由基础颜色值生成一系列合并后的颜色值
            getColors(theme) {
                // 实现sass的mix函数与#fff合并。与白色合并其实就是改变透明度。
                /* 
                $custom-primary-white__9:mix($custom-white, $custom-primary, 90%);
                $custom-primary-opacity__1:rgba($custom-primary,0.1);
                它们的效果是一样的
                 */
                const tintColor = (color, tint) => {
                    let red = parseInt(color.slice(0, 2), 16);
                    let green = parseInt(color.slice(2, 4), 16);
                    let blue = parseInt(color.slice(4, 6), 16);
                    // 有些背景需要设置透明度，用到了rgba颜色值。
                    if (tint === 0) {
                        return [red, green, blue].join(',')
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
                }
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
                    return `${red}${green}${blue}`
                }
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
                let newElementStyle = this.defaultElementStyle;
                this.defaultColors.forEach((color, index) => {
                    newElementStyle = newElementStyle.replace(new RegExp(color, 'ig'), newColors[index]);
                });

                let newCustomStyle = this.defaultCustomStyle;
                this.defaultColors.forEach((color, index) => {
                    newCustomStyle = newCustomStyle.replace(new RegExp(color, 'ig'), newColors[index]);
                })
                document.head.querySelector("#element_theme").innerText = newElementStyle;
                document.head.querySelector("#custom_theme").innerText = newCustomStyle;
                localStorage.setItem("ms_theme", newTheme);
            },
        }
    }
</script>
<style lang="scss">
    .theme-picker {
        .el-color-dropdown__value,
        .el-color-dropdown__link-btn {
            display: none;
        }
    }
</style>