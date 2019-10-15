<template>
  <div class="side-bar">
    <logo />
    <nav-menu />
  </div>
</template>

<script>
  import NavMenu from './NavMenu';
  import Logo from './Logo';

  export default {
    components: {
      NavMenu,
      Logo
    },
    data() {
      return {

      }
    }
  }
</script>
