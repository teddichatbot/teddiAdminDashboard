<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="Username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model.trim="payload.username"
                    :rules="[v => !!v || 'Username is required']"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-model.trim="payload.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                     @click:append="showPassword = !showPassword"
                     :rules="[v => !!v || 'Password is required']"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary" 
                  @click="login"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import API from '../service/api'
  export default {
    name: "login-page",
    data: () => ({
      showPassword: false,
      payload: {
        username: "",
        password: ""
      }
    }),
    // beforeEnter: (to, from, next) => {
    //     console.log('check login',this.adminDetails.isloggedIn);
    //     next();
    // },
    computed: {
      ...mapState(['adminDetails'])
    },
    methods: {
      ...mapActions(["Login"]),

      async login(){
        if(this.payload.username == ''){
          alert('Please Enter Username');
          return false;
        }else if(this.payload.password == ''){
          alert('Please Enter Password');
          return false;
        }
        
        this.Login(this.payload)
        .then(res=>{
          console.log(res.data.msg);
          this.$router.push({ name: "Dashboard" });
        })
        .catch((err)=>{
          // console.log(err.response.data.msg)
          alert(err.response.data.msg)
        })
      }
    }
  }
</script>