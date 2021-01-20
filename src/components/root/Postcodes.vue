<template>
  <v-col cols=12>
    <template>
      <v-row>
        <v-col cols="12" sm="6" md="6"> 
          <v-row>
            <v-col cols="12" md="8">
              <v-file-input
                v-model="files"
                placeholder="Upload your postcodes"
                label="File input"
                multiple
                prepend-icon="mdi-paperclip"
              >
                <template v-slot:selection="{ text }">
                  <v-chip
                    small
                    label
                    color="primary"
                  >
                    {{ text }}
                  </v-chip>
                </template>
            </v-file-input> 
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                  color="primary"
                  @click="addXlsxFile"
              >
                  Add Xlsx file
              </v-btn>   
            </v-col>
          </v-row>                        
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedFile"
                :items="fileList"
                
                label="--Select File--"
                solo
                @change="fileWisePostcodes"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                  color="error"
                  @click="deletePostcodeFile"
                  v-if="fileDltBtn"
              >
                  Delete file
              </v-btn>   
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mt-12" ></v-divider>
      <v-row>
        <v-col cols="12" sm="6" md="6">
         <template ref="form">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                ref="refPostcode"
                v-model="setPostcode"
                :rules="[() => !!setPostcode || 'This field is required']"
                label="Post Code"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="5">
              <v-select
                ref="refLocation"
                :items="fileList"
                v-model="setLocation"
                :rules="[() => !!setLocation || 'This field is required']"
                label="--Select Location--"
                solo              
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                  color="primary"
                  @click="addPostcode"
              >
                  Add
              </v-btn>   
            </v-col>
          </v-row>
         </template> 
        </v-col>
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
                      @click="findPostcode"
                  >
                      Search
                  </v-btn>
              </v-col>
            </v-row>
          </template> 
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
      :items="postcodeList"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Postcodes List</v-toolbar-title> 
          <v-subheader>Total: {{totalCount}}</v-subheader>        
          <!-- <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">View Feedback</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    
                    
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="deleteItem(item)"
        >
          mdi-delete
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
// import axios from "axios";

  export default {
    data: () => ({
      dialog: false,
      showLoader: false,
      totalCount: 0,
      headers: [
        {
          text: 'Postcode',
          align: 'start',
          sortable: false,
          value: 'postcode',
        },
        { text: 'Location', value: 'location' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      postcodeList: [],
      files: [],
      selectedFile: '',
      fileList: [],
      fileDltBtn: false,
      setPostcode: null,
      setLocation: null,
      formHasErrors: false,
      searchFormHasErrors: false,
      searchPostcode: ''
    }),

    computed: {
      form () {
        return {
          refPostcode: this.setPostcode,
          refLocation: this.setLocation,
        }
      },
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
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions(["GetAllPostcodes", "UploadPostcodes", "GetAllPostcodeFiles", "GetPostcodesByFileName", "DeleteFileWithPostcodes", "AddPostcode",
      "GetSinglePostcode", "DeleteSinglePostcode"]),

      initialize () {
        
      },

      deleteItem (item) {
        if (window.confirm("Are you sure want to delete?")) {
          this.DeleteSinglePostcode(item.id).then(()=>{
            const index = this.postcodeList.indexOf(item)
            this.postcodeList.splice(index, 1)
            // alert(result.data.msg)
          })
          .catch(err=>{
            console.log(err)
          })
        }       
      },

      close () {
        this.dialog = false
      },
      addXlsxFile (){
        if(this.files.length>0){
          if(this.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            
            let formData = new FormData();
            formData.append('file', this.files[0]);
            this.showLoader=true;
            this.UploadPostcodes(formData)
            .then(()=>{
              // console.log(res.data);
              this.showLoader=false;
              alert("file upload successfully")
              window.location.reload();
            })
            .catch((err)=>{
              console.log(err)
              this.showLoader=false;
            })
          }else{
            alert('Please select only XLSX file')
          }
        }else{
          alert('Please upload your file')
        }
      },
      fileWisePostcodes (){
        // console.log(this.selectedFile)
        this.showLoader=true;
        this.GetPostcodesByFileName(this.selectedFile).then(res=>{
          this.totalCount = res.data.postcodeList.length
          this.postcodeList = res.data.postcodeList
          this.fileDltBtn=true
          this.showLoader=false;
        })
        .catch(err=>{
          console.log(err)
          this.showLoader=false;
        })
        
      },
      deletePostcodeFile(){       
        this.showLoader=true;
        if (window.confirm("Are you sure want to delete?")) { 
          this.DeleteFileWithPostcodes(this.selectedFile).then(()=>{
            alert('Deleted Successfully')
            this.showLoader=false;
            window.location.reload();
          })
          .catch(err=>{
            console.log(err)
            this.showLoader=false;
          })
        }       
      },
      addPostcode () {
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
        })
        if(!this.formHasErrors){
          // console.log(this.form)
          let payload = {
            postcode: this.form.refPostcode,
            location: this.form.refLocation
          }
          // console.log(payload)        
          this.AddPostcode(payload).then(()=>{
            alert('Postcode Added')
            this.GetAllPostcodes()
            .then(res=>{
              this.totalCount = res.data.postcodeList.length
              this.postcodeList = res.data.postcodeList
            })
            .catch((err)=>{
              console.log(err)
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }        
      },
      findPostcode(){
        this.searchFormHasErrors = false
        Object.keys(this.searchform).forEach(f => {
          
          if (!this.searchform[f]) this.searchFormHasErrors = true
          this.$refs[f].validate(true)
        })
        if(!this.searchFormHasErrors){
          this.GetSinglePostcode(this.searchform.refSearchPostcode).then(res=>{
            // console.log(res)
            if(res.data.status == 200){
              this.totalCount = 1
              this.postcodeList = [];
              this.postcodeList.push(res.data.postcodeData)
            }else{
              alert('No data found')
            }
          })
          .catch(err=>{
            console.log(err)
          })
        }
      },
    },
    beforeMount(){
      this.GetAllPostcodes()
      .then(res=>{
        this.totalCount = res.data.postcodeList.length
        this.postcodeList = res.data.postcodeList
      })
      .catch((err)=>{
        console.log(err)
      })
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