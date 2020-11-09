<template>
    <v-col cols=12>
        <v-row>
            <v-col
            cols="12"
            md="12"
            >
                <h1>{{ msg }}</h1>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <!-- <div class="overline mb-4">OVERLINE</div> -->
                            <v-list-item-title class="headline mb-1">Total User</v-list-item-title>
                            <v-list-item-subtitle >{{totalUsers}}</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <!-- <div class="overline mb-4">OVERLINE</div> -->
                            <v-list-item-title class="headline mb-1">Active User</v-list-item-title>
                            <v-list-item-subtitle >{{activeUsers}}</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                </v-card>
            </v-col>
            
            <v-col
                cols="12"
                md="4"
            >
            <!-- <h1>Random No from method:</h1> -->
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                    <GmapMap 
                        map-type-id="roadmap" 
                        :zoom="2" 
                        :center="{lat: 53.4808, lng: -2.2426}" 
                        style="width: 1000px; height: 400px">
                        <GmapCluster :zoomOnClick="true">
                            <GmapMarker 
                                :key="index"
                                v-for="(m, index) in markers"  
                                :position="m" 
                            />
                            <!-- <GmapMarker :position="{lat: 53.4808, lng: -2.2426}" />
                            <GmapMarker :position="{lat: 53.4630, lng: -2.2900}" />
                            <GmapMarker :position="{lat: 53.4640, lng: -2.2702}" /> -->
                        </GmapCluster>
                        
                    </GmapMap>  
                               
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAyXZK5sxYTIzCdsdiP75n-3mvDhmyUYDY',
    libraries: 'places',
  },
 
})
Vue.component('GmapCluster', GmapCluster)

export default {
    data () {
        return{
            msg: 'Dashboard Page',
            markers: [],
            totalUsers: 0,
            activeUsers: 0,
            inactiveUsers: 0,
        }
        
    },
    computed: {
        ...mapState(['isLoggedIn'])
    },
    mounted(){
    //     this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({lat: 1.38, lng: 103.80})
    // })
        
    },
    methods: {
        ...mapActions(["GetAllUserList"]),
      
        beforeOpen: function () {
            console.log("open")
            console.log(this.isLoggedIn)
        },
        
    },
    beforeMount(){
      this.GetAllUserList()
        .then(res=>{
            this.totalUsers= res.data.userData.length
            this.activeUsers = res.data.userData.filter(data => parseInt((Date.now() - data.convEndTime)/1000)< 86400).length;
            
            res.data.userData.forEach(element => {
                if(element.lat){
                    let obj= {};
                    obj.lat= parseFloat(element.lat);
                    obj.lng= parseFloat(element.long);               
                    this.markers.push(obj)
                }               
            });
        })
        .catch((err)=>{
          alert(err.response.data.msg)
        })
    },
}
</script>

