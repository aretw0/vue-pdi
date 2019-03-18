<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
    >
    <v-toolbar color="darken-1" dark>
      <img :src="require('../assets/logo-pdi.png')" height="36" alt="PDI">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Toolbox</span>
      </v-toolbar-title>        
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
        <template v-for="(item, i) in menus">
            <!--group with subitems-->
            <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon" no-action="no-action">
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-chip class="caption blue lighten-2 white--text mx-0" v-if="item.chip" :color="item.color" label="label" small>{{ item.chip }}</v-chip>
              </v-list-tile>
              <template v-for="(subItem, i) in item.items">
                <!--sub group-->
                <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group" :prepend-icon="subItem.icon" sub-group="sub-group">
                  <v-list-tile slot="activator" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-chip class="caption blue lighten-2 white--text mx-0" v-if="subItem.chip" :color="subItem.color" label="label" small>{{ subItem.chip }}</v-chip>
                  </v-list-tile>
                  <template v-for="(grand, k) in subItem.children">
                    <!-- sub sub group -->
                    <v-list-group v-if="grand.items" :key="grand.name" :group="grand.group" :prepend-icon="grand.icon" sub-group="grand-group">
                      <v-list-tile slot="activator" ripple="ripple">
                        <v-list-tile-content>
                          <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-chip class="caption blue lighten-2 white--text mx-0" v-if="grand.chip" :color="grand.color" label="label" small>{{ grand.chip }}</v-chip>
                      </v-list-tile>
                      <v-list-tile v-for="(subGrand, j) in grand.children" :key="j" ripple="ripple" @click="emitOp(subGrand.name)">
                        <v-list-tile-action v-if="subGrand.icon">
                          <v-icon>{{ subGrand.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ subGrand.title }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-chip class="caption blue lighten-2 white--text mx-0" v-if="subGrand.chip" :color="subGrand.color" label="label" small>{{ subGrand.chip }}</v-chip>
                      </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="k" :disabled="grand.disabled" ripple="ripple" @click="emitOp(grand.name)">
                      <v-list-tile-action v-if="grand.icon">
                        <v-icon>{{ grand.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title><span>{{ grand.title }}</span></v-list-tile-title>
                      </v-list-tile-content>
                      <v-chip class="caption blue lighten-2 white--text mx-0" v-if="grand.chip" :color="grand.color" label="label" small>{{ grand.chip }}</v-chip>
                    </v-list-tile>
                  </template>
                </v-list-group>
                <!--child item-->
                <v-list-tile v-else :key="i" :disabled="subItem.disabled" ripple="ripple" @click="emitOp(subItem.name)">
                  <v-list-tile-action v-if="subItem.icon">
                    <v-icon>{{ subItem.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                  </v-list-tile-content>
                  <v-chip class="caption blue lighten-2 white--text mx-0" v-if="subItem.chip" :color="subItem.color" label="label" small>{{ subItem.chip }}</v-chip>
                </v-list-tile>
              </template>
            </v-list-group>
            <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <!--top-level link-->
            <v-list-tile v-else ripple="ripple" :disabled="item.disabled" rel="noopener" :key="item.name" @click="emitOp(item.name)">
              <v-list-tile-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-chip class="caption blue lighten-2 white--text mx-0" v-if="item.chip" :color="item.color" label="label" small>{{ item.chip }}</v-chip>
            </v-list-tile>
        </template>
      </v-list>        
    </vue-perfect-scrollbar>        
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    }    
  }),
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  methods: {
    emitOp (op) {
        window.getApp.$emit('APP_TB',op);
    }
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 60px)
    overflow: auto

</style>