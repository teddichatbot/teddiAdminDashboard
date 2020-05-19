<template>
  <v-app id="inspire">
    
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
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
  export default {
    props: {
      source: String,
    },
    components:{
      Sidebar,
      Header,
      Footer
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>