<template>
  <v-col cols=12>
  <v-data-table
    :headers="headers"
    :items="userList"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User List</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          
          <v-card>
            <v-card-title>
              <span class="headline">View User Details</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="singleUserItem.fullName" label="Full name"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="viewItem(item)"
      >
        mdi-eye
      </v-icon>
      
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
    </template>
  </v-data-table>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'fullName',
        },
        { text: 'Email', value: 'email' },
        { text: 'Register?', value: 'isRegistered' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      // editedIndex: -1,
      userList: [],
      singleUserItem: {
        fullName: '',
        email: ''
      },
    }),

    computed: {
      
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions(["GetAllUserList"]),
      initialize () {

        },

      viewItem (item) {
        console.log(item)
        
        this.singleUserItem.fullName = item.firstName+' '+item.lastName;
        this.singleUserItem.email = item.email;
        // alert(this.viewItem.fullName)
        this.dialog = true
      },

      // deleteItem (item) {
      //   const index = this.desserts.indexOf(item)
      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      // },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
      //   } else {
      //     this.desserts.push(this.editedItem)
      //   }
      //   this.close()
      // },
    },
    beforeMount(){
      //Get Given Feedback UserList
      this.GetAllUserList()
        .then(res=>{
          this.userList = res.data.userData;
          
          this.userList.map(data => { 
            data.fullName = data.firstName+' '+data.lastName ;
            data.isRegistered = data.registrationDate? 'Yes':'No'
            return data;
          });
        })
        .catch((err)=>{
          alert(err.response.data.msg)
        })
    },
  }
</script>