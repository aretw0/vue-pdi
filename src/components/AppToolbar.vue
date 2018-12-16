<template>
  <v-toolbar
    fixed
    dark
    app
    class="headline text-uppercase"
    >
    <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
        <span>Arthur Silva</span>
        <span class="font-weight-light"> PDI - UFERSA Mossoró</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$refs.imgPicker.click()">
        <v-icon>add_to_photos</v-icon>
    </v-btn>
    <input type="file" style="display: none;" name="uploadPic" @change="handleInputImage($event.target)"
           ref="imgPicker">    
  </v-toolbar>
</template>
<script>
export default {
  name: 'app-toolbar',
  methods: {
    handleDrawerToggle () {
        window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleInputImage (target) {
        window.getApp.$emit('APP_UPLOAD',target.files[0]);
        target.value = '';
    }
  }
};
</script>