<template>
  <v-app>
    <!-- <core-filter /> -->
    <core-toolbar v-if='!isMobile' />

    <core-drawer v-if='!isMobile'/>

    <core-view />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isMobile: false
  }),
  created(){
    let url = window.location.href 
    if(url.includes('mobile')){
      this.isMobile = true
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
