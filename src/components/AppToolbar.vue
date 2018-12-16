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
    <input type="file" accept="image/*" style="display: none;" name="uploadPic" @change="handleInputImage($event.target.files[0])"
           ref="imgPicker">
    <!-- <input type="file" ref="imgPicker" @onchange="handleInputImage(this)" accept="image/*" style="display: none;"> -->
    
  </v-toolbar>
</template>
<script>
export default {
  name: 'app-toolbar',
  methods: {
    handleDrawerToggle () {
        window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleInputImage (image) {
        window.getApp.$emit('APP_UPLOAD',image);
    }
  }
};
</script>