<template>
  <v-col cols=12>
    <template>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <template ref="searchform">
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                    v-model="searchPostcode"
                    ref="refSearchPostcode"
                    :rules="[v => !!v || 'Item is required']"
                    required
                    placeholder="Postcode"                
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                  <v-btn
                      color="primary"
                      @click="findUserListByPostcode"
                  >
                      Search
                  </v-btn>
              </v-col>
            </v-row>
          </template> 
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="selectedFile"
            :items="fileList"
            label="Select Postcodes File"
            dense
            outlined
            @change="fileWiseUserList"
          ></v-select>
        </v-col>
      </v-row>
    </template>
    <div class="text-center">
        <v-progress-circular
        v-if="showLoader"
        :size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>
    </div>
    <v-data-table
      :headers="headers"
      :items="userList"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>User List : {{userList.length}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <download-excel
            v-if="hasExportData"
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="users_data.xls"
          >
            <v-btn color="primary">Download</v-btn> 
          </download-excel>
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
                      <v-text-field v-if="singleUserItem.firstName.trim()!=''" v-model="singleUserItem.firstName" label="Full Name" readonly></v-text-field>
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
                      <v-simple-table height="150px">
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
                        <template v-else><h3 class="notFound">Sorry! No App Feedback Found</h3></template>
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
                        <template v-else><h3 class="notFound">Sorry! No Chat Feedback Found</h3></template>
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
                  <template v-if="filteredMsgList.length>0">        
                    <v-col cols="12" sm="12" md="12" v-for="(data, index) in filteredMsgList" :key="index" >
                      <v-card
                        v-bind:color="data.from.name=='newTeddiBotDev'?'#385F73':'#7D6608'"
                        dark
                      >
                        <v-card-title >
                          <span v-bind:class="data.from.name=='newTeddiBotDev'?'headline':'title font-weight-light'">{{data.from.name=='newTeddiBotDev'?'Teddi':'You'}}</span>
                        </v-card-title>
                        <v-card-text font-weight-bold v-html="data.text">
                          <!-- {{data.text}} -->
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </template> 
                  <template v-else> 
                    <v-col cols="12" sm="12" md="12">
                      <v-card-title class="notFound">Sorry! No Messages found.</v-card-title>
                    </v-col>
                  </template> 
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
      
      <template v-slot:[`item.firstName`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.firstName"
          @save="saveUserName(props.item.firstName, props.item.lastName, props.item.conversationId)"
          @close="close"
        >
          {{ props.item.firstName }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.firstName"
              label="Edit User Name"
              single-line
            ></v-text-field>
          </template>
        
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.chatActions`]="{ item }">
        <div >
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                
              >
                Chapters
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(data, index) in chapterList"
                :key="index"
                @click="showUserChat(item.conversationId, data.keyName)"
              >
                <v-list-item-title>{{ data.originalName }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

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
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      
    </v-data-table>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import moment from 'moment';
  export default {
    data: () => ({
      showLoader: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'firstName',
        },
        { text: 'Email', value: 'email' },
        { text: 'Register?', value: 'isRegistered' },
        { text: 'Chat History', value: 'chatActions', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      userList: [],
      singleUserItem: {
        // fullName: '',
        firstName: '',
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
      chatHistory: [],
      filteredMsgList: [],
      searchFormHasErrors: false,
      searchPostcode: '',
      fileList: [],
      selectedFile: '',
      hasExportData: false,
      json_data: [],
      json_fields: {
        // Name: "firstName",
        Email: "email",
        // "Registration Date": "registrationDate",
        "Child BirthDay": {
            field: 'child_data',
            callback: (value) => {
              var birthDates = ''
              for (var x of value) {
                birthDates += x.child_dob + ' \n'
              }
              return birthDates;
            }
        },
        "Child Gender": {
            field: 'child_data',
            callback: (value) => {
              var genders = ''
              for (var x of value) {
                genders += x.child_gender + ' \n'
              }
              return genders;
            }
        },
        "Parent Age Range": "parent_age_range",
        "Parent Gender": "parent_gender",
        Zipcode: "zip_code",
        Occupation: "occupation",
        Ethnicity: {
          callback: (value) => {
              return value.ethnicityMaster+'/'+value.ethnicityChild; 
          }
        },
      },
      dataForExcel: [
        { colA: "Hello", colB: "World" },
        {
          colA: "Multi-line",
          /* Multi-line value: */
          colB:
            "This is a long paragraph\nwith multiple lines\nthat should show in a single cell.",
        },
        { colA: "Another", colB: "Regular cell" },
      ],
    }),

    computed: {
      searchform(){
        return {
          refSearchPostcode: this.searchPostcode,
        }
      }
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
      ...mapActions(["GetAllUserList", "GivenFeedbackUserList", "SingleUserFeedback", "GetUserChatHistory", "GetUserListByPostcode", "GetAllPostcodeFiles", "GetPostcodesByFileName", "UpdateUserName", "DeleteSingleUser"]),
      initialize () {
         this.chapterList = [
          {
            keyName: 'introduction',
            originalName: 'Introduction'
          },
          {
            keyName: 'breastFeeding',
            originalName: 'Chapter 1'
          },
          {
            keyName: 'givingHealth',
            originalName: 'Chapter 2'
          },
          {
            keyName: 'chapter3',
            originalName: 'Chapter 3'
          },
          {
            keyName: 'chapter4',
            originalName: 'Chapter 4'
          },
          {
            keyName: 'chapter5',
            originalName: 'Chapter 5'
          },
          {
            keyName: 'chapter6',
            originalName: 'Chapter 6'
          },
          {
            keyName: 'chapter7',
            originalName: 'Chapter 7'
          },
          {
            keyName: 'chapter8',
            originalName: 'Chapter 8'
          },
          {
            keyName: 'chapter9',
            originalName: 'Chapter 9'
          },
          {
            keyName: 'chapter10',
            originalName: 'Chapter 10'
          },
          {
            keyName: 'chapter11',
            originalName: 'Chapter 11'
          },
          {
            keyName: 'chapter12',
            originalName: 'Chapter 12'
          }
        ]
      
      },

      viewItem (item) {       
        // this.singleUserItem.fullName = item.firstName+' '+item.lastName;
        this.singleUserItem.firstName = item.firstName;
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
      deleteItem (item) {
        if (window.confirm("Are you sure want to delete?")) {
          // console.log(item)
          this.DeleteSingleUser(item.id).then(()=>{
            const index = this.userList.indexOf(item)
            this.userList.splice(index, 1)
            // alert(result.data.msg)
          })
          .catch(err=>{
            console.log(err)
          })
        }
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
                data.chapterType = element.originalName
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

      showUserChat(conversationId, chapterType){
        // console.log(conversationId, chapterType)
        let payload = {};
        payload.conversationId = conversationId;
        payload.chapterType = chapterType;
        payload.offset = 0;
        payload.limit = 5000;
        
        this.GetUserChatHistory(payload)
        .then(res=>{
          // console.log(res.data.chatData);
          this.chatHistory = res.data.chatData;
          if(this.chatHistory.length>0){
            this.filteredMsgList = [];
            this.chatHistory.sort((a, b) => a._ts - b._ts);
            for(var i=0; i<this.chatHistory.length; i++){
              if(this.chatHistory[i].from.name == 'newTeddiBotDev'){
                
                let msgArr = this.chatHistory[i].text.split('#&@#')
                for(var j=0; j<msgArr.length; j++){
                  if( (msgArr[j].indexOf("enterBtn") == -1) && (msgArr[j].indexOf("predictiveText") == -1) && (msgArr[j].indexOf("selectImage") == -1) && (msgArr[j] !== '')){
                    msgArr[j] = msgArr[j].replaceAll(/\n\n/g,'<br />');
                    
                    let count = 1;
                    while (msgArr[j].includes('**')) {
                      msgArr[j] = count % 2 !== 0 ? msgArr[j].replace("**", "<strong>") : msgArr[j].replace("**", "</strong>");
                      count++;
                    }

                    this.filteredMsgList.push({
                      timestamp: this.chatHistory[i].timestamp,
                      from: this.chatHistory[i].from,
                      conversation: this.chatHistory[i].conversation,
                      text: msgArr[j],
                      chapterType: this.chatHistory[i].chapterType
                    })
                  }
                  
                }
              }else{
                this.filteredMsgList.push({
                  timestamp: this.chatHistory[i].timestamp,
                  from: this.chatHistory[i].from,
                  conversation: this.chatHistory[i].conversation,
                  text: this.chatHistory[i].text,
                  chapterType: this.chatHistory[i].chapterType
                })
              }
            }
            
          }else{
            this.filteredMsgList = [];
          }
          
          this.dialog3 = true
        })
        .catch((err)=>{
          console.log(err)
          // alert(err.response.data)
        })
        
      },

      // deleteItem (item) {
      //   const index = this.desserts.indexOf(item)
      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      // },

      save () {
        console.log('save')
      },

      close () {
        this.dialog = false;
        this.dialog2 = false;
        this.dialog3 = false;
      },

      findUserListByPostcode(){
        this.searchFormHasErrors = false
        Object.keys(this.searchform).forEach(f => {
          
          if (!this.searchform[f]) this.searchFormHasErrors = true
          this.$refs[f].validate(true)
        })
        if(!this.searchFormHasErrors){
          this.GetUserListByPostcode(this.searchform.refSearchPostcode).then(res=>{
            this.userList = res.data.userData;         
            this.userList.map(data => { 
              // data.fullName = data.firstName+' '+data.lastName ;
              data.isRegistered = data.registerCompleted? 'Yes':'No'
              return data;
            });
          })
          .catch(err=>{
            console.log(err)
          })
        }
      },
      async fileWiseUserList(){
        try{
          this.showLoader = true;
          let postCodesData = await this.GetPostcodesByFileName(this.selectedFile)
          let postcodeList = postCodesData.data.postcodeList.map(d => d.postcode)
          // console.log(postcodeList)
          let allUserList = await this.GetAllUserList();
          allUserList = allUserList.data.userData;
          // filtering users of postcodes matching
          this.userList = allUserList.filter(function(element){
            return postcodeList.indexOf(element.zip_code) !== -1;
          });
          this.userList.map(data => { 
            // data.fullName = data.firstName+' '+data.lastName ;
            data.isRegistered = data.registerCompleted? 'Yes':'No'
            return data;
          });

          //export xlsx
          this.json_data = [...this.userList];
          
          if(this.json_data.length>0){
            //take first part of zipcode
            this.json_data.map(data => {
              let zip_codeArr = data.zip_code.split(' ');
              data.zip_code = zip_codeArr[0]
              return data;
            });
            this.hasExportData = true;
          }else{
            this.hasExportData = false;
            alert('No data found')
          }
          
          this.showLoader = false;
        }catch(e){
          this.showLoader = false;
          console.log(e)
        }
      },
      async saveUserName(firstName, lastName, conversationId){
        let payload = {
          conversationId: conversationId,
          fname: firstName,
          lname: lastName
        }
        this.UpdateUserName(payload).then(()=>{
          alert('Updated user name')
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
    beforeMount(){
      // Get Given Feedback UserList
      this.GetAllUserList()
        .then(res=>{
          this.userList = res.data.userData;
          
          this.userList.map(data => { 
            // data.fullName = data.firstName+' '+data.lastName ;
            data.isRegistered = data.registerCompleted? 'Yes':'No'
            return data;
          });
        })
        .catch((err)=>{
          console.log(err.response.data.msg)
        })
        //get postcode file/location list
        this.GetAllPostcodeFiles()
        .then(res=>{
          this.fileList = res.data.fileList
        })
        .catch((err)=>{
          console.log(err)
        })
    },
  }
</script>
<style>
  .notFound { color: red; }
</style>