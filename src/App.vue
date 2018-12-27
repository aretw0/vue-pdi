<template>
  <v-app>
    <app-drawer/>     
    <app-toolbar/>
    <v-content>
      <!-- <HelloWorld/> -->
      <app-tool-box/>
       <!-- App Footer -->
        <v-footer height="auto" class="white pa-3 app--footer">
          <span class="caption">Aretw0 Development &copy; {{ new Date().getFullYear() }}</span>
          <v-spacer></v-spacer>
          <span class="caption mr-1">Made With Love </span> <v-icon color="pink" small>favorite</v-icon>
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
