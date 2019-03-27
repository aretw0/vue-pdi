<template>
  <v-app>
    <app-drawer/>     
    <app-toolbar/>
    <v-content id="main">
      <app-tool-box/>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer transparent">
        <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
        <span class="caption mr-1">Feito com</span>
        <v-icon color="pink" small>favorite</v-icon>
        <span class="caption mr-1">  por <a href="https://github.com/aretw0">aretw0</a></span>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/AppToolbar';
import AppDrawer from '@/components/AppDrawer';
import AppToolBox from '@/components/AppToolBox';

export default {
  name: 'App',
  components: {
      AppDrawer,
      AppToolbar,
      AppToolBox
    },
  data () {
    return {
      //
    }
  },
  created () {
    window.getApp = this;
  }
}
</script>

<style>
  #main {
    background-color: darkgray;
  }
</style>

