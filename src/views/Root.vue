<template>
  <v-app id="inspire">
    
    <!-- <Sidebar v-if="this.adminDetails.isloggedIn" /> -->
    <Sidebar />
    
    <Header/>

    <v-content>
      
      <v-container>
        <v-row>
          
         <router-view />
        </v-row>
      </v-container>
       
    </v-content>
    
    <Footer/>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
  export default {
    props: {
    },
    components:{
      Sidebar,
      Header,
      Footer
    },
    data: () => ({
      // drawer: null,
    }),
    computed: {
      ...mapState(['adminDetails'])
    },
    mounted() {
        // console.log(this.adminDetails)
    },
  }
</script>