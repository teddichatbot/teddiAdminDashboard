<template>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Teddi 1</v-toolbar-title>
      <v-row>
        <v-col
        cols="12"
        md="12"
        >
          <v-btn style="float: right;" @click="logout">Logout</v-btn>
        </v-col>
        
      </v-row>
      
    </v-app-bar>
</template>>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Header',
    data: () =>({
        // drawer: null,
    }),
    methods: {
      ...mapActions(['Logout']),

      logout(){
        this.Logout()
        this.$router.push({ name: "Login" });
      }
    }
}
</script>