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
                md="4"
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
                            <v-list-item-subtitle>500</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                md="4"
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
                            <v-list-item-subtitle>300</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                </v-card>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <!-- <div class="overline mb-4">OVERLINE</div> -->
                            <v-list-item-title class="headline mb-1">Inactive User</v-list-item-title>
                            <v-list-item-subtitle>200</v-list-item-subtitle>
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
                    <div id="map">
                        <!-- <map-marker :lat="22.5676" :lng="88.3707"></map-marker> -->
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import {mapState} from 'vuex'
import $Scriptjs from 'scriptjs';
export default {
    data () {
        return{
            msg: 'Dashboard Page',
            map: null,
            googleMapApiKey: 'AIzaSyAyXZK5sxYTIzCdsdiP75n-3mvDhmyUYDY',
        }
        
    },
    computed: {
        ...mapState(['isLoggedIn'])
    },
    beforeMount: function (){
        $Scriptjs("https://maps.googleapis.com/maps/api/js?key="+this.googleMapApiKey+"&libraries=geometry,places", () => {
            this.initMap();
        });
    },
    methods: {
        beforeOpen: function () {
            console.log("open")
            console.log(this.isLoggedIn)
        },
        initMap() {
            this.map = new window.google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: 22.5726,
                    lng: 88.3639
                },
                zoom: 15
            })
            new window.google.maps.Marker({
                position: {
                    lat: 22.5726,
                    lng: 88.3639
                },
                map: this.map
            })
        }
    },
    
}
</script>

<style>
#map {
  width: 77vw;
  height: 30vw;
}
</style>