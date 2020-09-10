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
        <v-dialog v-model="dialog" max-width="650px">
          
          <v-card>
            <v-card-title>
              <span class="headline">View User Details</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.fullName.trim()!=''" v-model="singleUserItem.fullName" label="Full Name" readonly></v-text-field>
                   <v-text-field v-else value="NA"  label="Full Name" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.email!=''" v-model="singleUserItem.email" label="Email Id" readonly></v-text-field>
                    <v-text-field v-else value="NA"  label="Email Id" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.registerCompleted" value="Yes" label="Registered?" readonly></v-text-field>
                    <v-text-field v-else value="No"  label="Registered?" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.registrationDate!=''" v-model="singleUserItem.registrationDate" label="Registered Date" readonly></v-text-field>
                  </v-col>
                  <v-col v-if="singleUserItem.child_data.length>0" cols="12" sm="12" md="12">
                    <v-simple-table height="100px">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Child Birthday</th>
                            <th class="text-left">Child Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in singleUserItem.child_data" :key="item.id">
                            <td>{{ item.child_dob }}</td>
                            <td>{{ item.child_gender }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.parent_age_range!=''" v-model="singleUserItem.parent_age_range" label="Parent Age Range" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.parent_gender!=''" v-model="singleUserItem.parent_gender" label="Parent Gender" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.zip_code!=''" v-model="singleUserItem.zip_code" label="Zip Code" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.occupation!=''" v-model="singleUserItem.occupation" label="Occupation" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-if="singleUserItem.ethnicity.trim()!='/'" v-model="singleUserItem.ethnicity" label="Ethnicity" readonly></v-text-field>
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

        <v-dialog v-model="dialog2" max-width="650px">
          <v-card>
            <v-card-title>
              <span class="headline">View User's Feedback</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12" >
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
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog3" max-width="850px">
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                   <v-card
                    color="#385F73"
                    dark
                   >
                    <v-card-title>
                      <span class="headline">Teddi</span>
                    </v-card-title>
                    <v-card-text >
                      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                    </v-card-text>
                   </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12" >
                  <v-card
                    color="#7D6608"
                    dark
                  >
                    <v-card-title >
                      <span class="title font-weight-light">You</span>
                    </v-card-title>
                    <v-card-text font-weight-bold>
                      "Turns out semicolon-less style is easier and safer."
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                   <v-card
                    color="#385F73"
                    dark
                   >
                    <v-card-title>
                      <span class="headline">Teddi</span>
                    </v-card-title>
                    <v-card-text >
                      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                    </v-card-text>
                   </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12" >
                  <v-card
                    color="#7D6608"
                    dark
                  >
                    <v-card-title >
                      <span class="title font-weight-light">You</span>
                    </v-card-title>
                    <v-card-text font-weight-bold>
                      "Turns out semicolon-less style is easier and safer."
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                   <v-card
                    color="#385F73"
                    dark
                   >
                    <v-card-title>
                      <span class="headline">Teddi</span>
                    </v-card-title>
                    <v-card-text >
                      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                    </v-card-text>
                   </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12" >
                  <v-card
                    color="#7D6608"
                    dark
                  >
                    <v-card-title >
                      <span class="title font-weight-light">You</span>
                    </v-card-title>
                    <v-card-text font-weight-bold>
                      "Turns out semicolon-less style is easier and safer."
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                   <v-card
                    color="#385F73"
                    dark
                   >
                    <v-card-title>
                      <span class="headline">Teddi</span>
                    </v-card-title>
                    <v-card-text >
                      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                    </v-card-text>
                   </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12" >
                  <v-card
                    color="#7D6608"
                    dark
                  >
                    <v-card-title >
                      <span class="title font-weight-light">You</span>
                    </v-card-title>
                    <v-card-text font-weight-bold>
                      "Turns out semicolon-less style is easier and safer."
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
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
      <v-icon
        small
        class="mr-2"
        @click="showUserFeedback(item)"
      >
        mdi-view-dashboard
      </v-icon>

      <v-icon
        small
        class="mr-2"
        @click="showUserChat(item)"
      >
        mdi-message-text
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
import moment from 'moment';
  export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      dialog3: false,
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
        email: '',
        registerCompleted: null,
        registrationDate: '',
        child_data: [],
        parent_age_range: '',
        parent_gender: '',
        zip_code: '',
        occupation: '',
        ethnicity: ''
      },
      appFeedback: [],
      chatFeedback: [],
      chapterList: [],
    }),

    computed: {
      
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close()
      },
      dialog3 (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize();
    },

    methods: {
      ...mapActions(["GetAllUserList", "GivenFeedbackUserList", "SingleUserFeedback"]),
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
        this.singleUserItem.fullName = item.firstName+' '+item.lastName;
        this.singleUserItem.email = item.email;
        this.singleUserItem.registerCompleted = item.registerCompleted;
        this.singleUserItem.child_data = item.child_data;
        this.singleUserItem.parent_age_range = item.parent_age_range;
        this.singleUserItem.parent_gender = item.parent_gender;
        this.singleUserItem.zip_code = item.zip_code;
        this.singleUserItem.occupation = item.occupation;
        this.singleUserItem.ethnicity = item.ethnicityMaster+'/'+item.ethnicityChild;
        this.singleUserItem.registrationDate = item.registrationDate ? item.registrationDate:'' ;
        this.dialog = true
      },

      showUserFeedback (item) {
        this.SingleUserFeedback(item.conversationId).then(getFeedback=>{
          this.appFeedback = getFeedback.data.appFeedBack.map(data =>{
            data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
            return data;
          });
          this.chatFeedback = getFeedback.data.chatFeedBack.map(data =>{
            data.smilySign = (data.isSmiled == 'happy')? '😃':'😔';
            data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
            this.chapterList.forEach(element => {
              if(element.keyName == data.chapterType){
                data.chapterType = element.originamName
              }
            });
            return data;
          });
          this.dialog2 = true
        })
        .catch(error=>{
          console.log(error)
        })
      },

      showUserChat(item){
        console.log(item)
        this.dialog3 = true
      },

      // deleteItem (item) {
      //   const index = this.desserts.indexOf(item)
      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      // },

      close () {
        this.dialog = false;
        this.dialog2 = false;
        this.dialog3 = false;
        // this.$nextTick(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // })
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
      // Get Given Feedback UserList
      this.GetAllUserList()
        .then(res=>{
          this.userList = res.data.userData;
          
          this.userList.map(data => { 
            data.fullName = data.firstName+' '+data.lastName ;
            data.isRegistered = data.registerCompleted? 'Yes':'No'
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