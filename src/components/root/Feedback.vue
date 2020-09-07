<template>
  <v-col cols=12>
  <v-data-table
    :headers="headers"
    :items="userList"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User Feedback</v-toolbar-title>
        <!-- <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider> -->
        <!-- <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" max-width="800px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >New Item</v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <!-- <span class="headline">{{ formTitle }}</span> -->
              <span class="headline">View Feedback</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12" >
                    <!-- <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field> -->
                    <v-card-title >App Feedback</v-card-title>
                      <template v-if="appFeedback.length>0">
                        <v-simple-table height="200px">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">Feedback</th>
                                <th class="text-left">Created On</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in appFeedback" :key="item.id">
                                <td>{{ item.feedbackMsg }}</td>
                                <td>{{ item.createdOn }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </template>
                      <template v-else><h3 class="noFeedbackMsg">Sorry! No App Feedback Found</h3></template>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <!-- <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field> -->
                    <v-card-title >Chat Feedback</v-card-title>
                      <template v-if="chatFeedback.length>0">
                        <v-simple-table height="200px">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">User's Reaction</th>
                                <th class="text-left">Feedback</th>
                                <th class="text-left">Chapter</th>
                                <th class="text-left">Created On</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in chatFeedback" :key="item.id">
                                <td>{{ item.smilySign }}</td>
                                <td>{{ item.feedbackMsg }}</td>
                                <td>{{ item.chapterType }}</td>
                                <td>{{ item.createdOn }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </template>
                      <template v-else><h3 class="noFeedbackMsg">Sorry! No Chat Feedback Found</h3></template>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">close</v-btn>
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
import moment from 'moment'
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // desserts: [],
      chapterList: [],
      userList: [],
      appFeedback: [],
      chatFeedback: [],
      // editedIndex: -1,
      // editedItem: {
      //   name: '',
      //   calories: 0
      // },
      // defaultItem: {
      //   name: '',
      //   calories: 0
      // },
      
    }),

    computed: {
      // formTitle () {
      //   return this.editedIndex === -1 ? 'New Item' : 'View Feedback'
      // },
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
      ...mapActions(["GivenFeedbackUserList", "SingleUserFeedback"]),

      initialize () {
        this.chapterList = [
          {
            keyName: 'introduction',
            originamName: 'Introduction'
          },
          {
            keyName: 'breastFeeding',
            originamName: 'Chapter 1'
          },
          {
            keyName: 'givingHealth',
            originamName: 'Chapter 2'
          },
          {
            keyName: 'chapter3',
            originamName: 'Chapter 3'
          },
          {
            keyName: 'chapter4',
            originamName: 'Chapter 4'
          },
          {
            keyName: 'chapter5',
            originamName: 'Chapter 5'
          },
          {
            keyName: 'chapter6',
            originamName: 'Chapter 6'
          },
          {
            keyName: 'chapter7',
            originamName: 'Chapter 7'
          },
          {
            keyName: 'chapter8',
            originamName: 'Chapter 8'
          },
          {
            keyName: 'chapter9',
            originamName: 'Chapter 9'
          },
          {
            keyName: 'chapter10',
            originamName: 'Chapter 10'
          },
          {
            keyName: 'chapter11',
            originamName: 'Chapter 11'
          },
          {
            keyName: 'chapter12',
            originamName: 'Chapter 12'
          }
        ]
      },

      viewItem (item) {
        this.SingleUserFeedback(item.conversationId).then(getFeedback=>{
          this.appFeedback = getFeedback.data.appFeedBack.map(data =>{
            data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
            return data;
          });
          this.chatFeedback = getFeedback.data.chatFeedBack.map(data =>{
            data.smilySign = (data.isSmiled == 'happy')? '😃':'😔';
            data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
            // let chapterList = [
              
            // ];
            this.chapterList.forEach(element => {
              if(element.keyName == data.chapterType){
                data.chapterType = element.originamName
              }
            });
            return data;
          });
          this.dialog = true
        })
        .catch(error=>{
          console.log(error)
        })
        // this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          // this.editedItem = Object.assign({}, this.defaultItem)
          // this.editedIndex = -1
        })
      },

    },
    beforeMount(){
      //Get Given Feedback UserList
      this.GivenFeedbackUserList()
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

<style>
  .noFeedbackMsg { color: red; }
</style>