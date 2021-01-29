<template>
  <v-col cols=12>
    <template ref="form">
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            ref="refChapter"
            v-model="selectedChapter"
            :items="chapterList"
            item-text="originalName"
            item-value="keyName"
            :rules="[() => !!selectedChapter || 'This field is required']"
            label="--Select Chapter--"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="Start End"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn color="primary" @click="checkFeedbackExport">Check</v-btn> 
        </v-col>
        <v-col cols="12" md="2">
          <download-excel
            v-if="hasExportData"
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="feedbacksheet.xls"
          >
            <v-btn color="primary">Download</v-btn> 
          </download-excel>
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
        <v-col cols="12" md="2">
          <download-excel
            v-if="hasExportDataByLocation"
            class="btn btn-default"
            :data="json_data_by_location"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="feedbacksheet.xls"
          >
            <v-btn color="primary">Download</v-btn> 
          </download-excel>
        </v-col>
      </v-row>
    </template>
    <template>
      <div class="text-center">
          <v-progress-circular
          v-if="showLoader"
          :size="50"
          color="primary"
          indeterminate
          ></v-progress-circular>
      </div>
    </template>
    <v-data-table
      :headers="headers"
      :items="userList"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>User Feedback</v-toolbar-title>
          <v-dialog v-model="dialog" max-width="900px">
            <v-card>
              <v-card-title>
                <span class="headline">View Feedback</span>
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
                                  <th class="text-left">Question 1</th>
                                  <th class="text-left">Question 2</th>
                                  <th class="text-left">Chapter</th>
                                  <th class="text-left">Created On</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in chatFeedback" :key="item.id">
                                  <td>{{ item.smilySign }}</td>
                                  <td>{{ item.feedbackMsg }}</td>
                                  <td>{{ item.answer1 }}</td>
                                  <td>{{ item.answer2 }}</td>
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
      showLoader: false,
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
      chapterList: [],
      userList: [],
      appFeedback: [],
      chatFeedback: [],
      selectedChapter: '',
      json_fields: {
        "Reaction": "smilySign",
        Message: "feedbackMsg",
        "Question 1": "answer1",
        "Question 2": "answer2",
        Chapter: "chapterType",
        "Created On": "createdOn"
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      dates: [],
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      formHasErrors: false,
      hasExportData: false,
      fileList: [],
      selectedFile: '',
      locationWiseUserList: [],
      hasExportDataByLocation: false,
      json_data_by_location: []
    }),

    computed: {
      form () {
        return {
          refChapter: this.selectedChapter
        }
      },
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
      ...mapActions(["GivenFeedbackUserList", "SingleUserFeedback", "GetFeedbackExport", "GetAllPostcodeFiles", "GetPostcodesByFileName", "GetAllUserList", "FileWiseFeedbackList"]),

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
        // console.log(item)
        this.SingleUserFeedback(item.conversationId).then(getFeedback=>{
          this.appFeedback = getFeedback.data.appFeedBack.map(data =>{
            data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
            return data;
          });
          this.chatFeedback = getFeedback.data.chatFeedBack.map(data =>{
            data.smilySign = (data.isSmiled == '')? data.isSmiled : (data.isSmiled == 'happy')? '😃':'😔';
            data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
            
            this.chapterList.forEach(element => {
              if(element.keyName == data.chapterType){
                data.chapterType = element.originalName
              }
            });
            data.answer1 = data.qa.length>0 ? data.qa[0].answer : '';
            data.answer2 = data.qa.length>1 ? data.qa[1].answer : '';
            return data;
          });
          this.dialog = true
        })
        .catch(error=>{
          console.log(error)
        })
        
      },

      close () {
        this.dialog = false
      },

      checkFeedbackExport() {
        
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
        })
        if(!this.formHasErrors){
          let payload = {
            chapterType: this.form.refChapter,
            startDate: this.startDate,
            endDate: this.endDate
          }
          this.showLoader = true;
          this.GetFeedbackExport(payload).then(getData=>{
            if(getData.data.feedbackList.length>0){
              
              this.json_data = getData.data.feedbackList.map(data=>{
                data.smilySign = (data.isSmiled == '')? data.isSmiled : (data.isSmiled == 'happy')? '😃':'😔';
                data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
                
                this.chapterList.forEach(element => {
                  if(element.keyName == data.chapterType){
                    data.chapterType = element.originalName
                  }
                });
                data.answer1 = data.qa.length>0 ? data.qa[0].answer : '';
                data.answer2 = data.qa.length>1 ? data.qa[1].answer : '';
                return data;
              })
              this.showLoader = false;
              this.hasExportData = true;
            }else{
              this.showLoader = false;
              this.hasExportData = false;
              alert('No feedback data for downloading')
            }
          })
          .catch(err=>{
            console.log(err)
          })
        }
      },
      async fileWiseUserList(){
        try{
          this.showLoader = true;
          //get all postcodes by location/file name
          let postCodesData = await this.GetPostcodesByFileName(this.selectedFile)
          let postcodeList = postCodesData.data.postcodeList.map(d => d.postcode)
          //get all users
          let allUserList = await this.GetAllUserList();
          allUserList = allUserList.data.userData;
          //filtered users by location -----> 1
          this.locationWiseUserList = allUserList.filter(function(element){
            return postcodeList.indexOf(element.zip_code) !== -1;
          });
          // get all users who submit feedback -----> 2
          let givenFeedbackUserList = await this.GivenFeedbackUserList();
          givenFeedbackUserList = givenFeedbackUserList.data.userData
          
          //get common users betwwen 1 & 2
          this.userList = this.locationWiseUserList.filter(function(o1){
            // Get common object
            return givenFeedbackUserList.some(function(o2){
                return o1.conversationId === o2.conversationId;          // assumes unique id
            });
          });
          this.userList.map(data => {
            data.fullName = data.firstName+' '+data.lastName ;
            data.isRegistered = data.registrationDate? 'Yes':'No'
            return data;
          });

          let convIdList = this.userList.map(data => {
            return data.conversationId;
          });
          // console.log(convIdList)
          let payload = {
            convIds: convIdList
          }
          this.FileWiseFeedbackList(payload).then(getData=>{
            if(getData.data.feedbackData.length>0){
              
              this.json_data_by_location = getData.data.feedbackData.map(data=>{
                data.smilySign = (data.isSmiled == '')? data.isSmiled : (data.isSmiled == 'happy')? '😃':'😔';
                data.createdOn = moment(String(data.createdOn)).format('DD/MM/YYYY hh:mm A')
                
                this.chapterList.forEach(element => {
                  if(element.keyName == data.chapterType){
                    data.chapterType = element.originalName
                  }
                });
                data.answer1 = data.qa.length>0 ? data.qa[0].answer : '';
                data.answer2 = data.qa.length>1 ? data.qa[1].answer : '';
                return data;
              })
              this.showLoader = false;
              this.hasExportDataByLocation = true;
            }else{
              this.showLoader = false;
              this.hasExportDataByLocation = false;
              alert('No feedback data for downloading')
            }
          })
          .catch(err=>{
            console.log(err)
          })
          
        }catch(e){
          this.showLoader = false;
          console.log(e)
        }
      },
    },
    beforeMount(){
      //Get Given Feedback UserList
      this.GivenFeedbackUserList()
        .then(res=>{
          // console.log(res.data.userData)
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
  .noFeedbackMsg { color: red; }
</style>