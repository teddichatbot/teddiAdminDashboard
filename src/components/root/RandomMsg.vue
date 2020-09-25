<template>
    <v-col cols=12>
        <template>
            <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                        <v-select
                        v-model="selectedChapter"
                        :items="chapterList"
                        item-text="originalName"
                        item-value="keyName"
                        label="--Select Chapter--"
                        solo
                        @change="chapterWistMsgList"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"></v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-btn
                            color="primary"
                            @click="openNewItemform"
                        >
                            Add New
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
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
        <template>
            <v-simple-table fixed-header height="500px">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">#</th>
                    <th class="text-left">Message</th>
                    <th class="text-left">Chapter Name</th>
                    <th class="text-left">Predict Option?</th>
                    <th class="text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in randomMsgList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.respMsg }}</td>
                    <td>{{ item.chapterType }}</td>
                    <td>{{ item.isPredict }}</td>
                    <td>
                        <v-icon
                            small
                            class="mr-2"
                            @click="showMsg(item)"
                        >
                            mdi-eye
                        </v-icon>
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </template>
        <template>
            <div class="text-center">
                <v-dialog
                v-model="dialog"
                width="500"
                >

                <v-card>
                    <v-card-title class="headline grey lighten-2">
                    Message Details
                    </v-card-title>

                    <v-card-text>
                        <template>
                            <v-container fluid>
                                <v-row>
                                    
                                    <v-col cols="12" sm="6" md="12">
                                        <v-textarea
                                        name="input-7-1"
                                        label="Message"
                                        v-model="getRandomMsg"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-combobox
                                        v-model="getPredictOptions"
                                        append-icon
                                        label="Predict Options"
                                        multiple
                                        chips
                                        deletable-chips
                                        ></v-combobox>
                                    </v-col>  
                                    <v-col cols="12" sm="6" md="12">
                                        <v-select
                                        v-if="!editedIndex"
                                        v-model="selectedChapterForNewItem"
                                        :items="chapterList"
                                        item-text="originalName"
                                        item-value="keyName"
                                        label="--Select Chapter--"
                                        ></v-select>
                                    </v-col>                             
                                </v-row>
                            </v-container>
                        </template>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="editedIndex"
                        color="primary"
                        text
                        @click="updateRandomMsg"
                    >
                        Update
                    </v-btn>
                    <v-btn
                        v-else
                        color="primary"
                        text
                        @click="saveNewRandomMsg"
                    >
                        Save
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                
            </div>
        </template>
    </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'RandomMsg-page',
    data: () =>({
        dialog: false,
        editedIndex: false,
        showLoader: false,
        selectedChapter: '',
        selectedChapterForNewItem: '',
        chapterList: [
            // {
            //     keyName: 'introduction',
            //     originalName: 'Introduction'
            // },
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
        ],
        randomMsgList: [],
        getRandomMsg: '',
        getPredictOptions: [],
        getMsgId: ''
    }),
    methods: {
        ...mapActions(["GetRandomMsgListByChapterName", "AddRandomMsg", "UpdateRandomMsg"]),
        showMsg(item){
            this.getRandomMsg = item.respMsg;
            this.getPredictOptions = item.predict;
            this.getMsgId = item.id;
            this.editedIndex = true;
            this.dialog= true
        },
        chapterWistMsgList(){
            this.showLoader = true;
            
            this.GetRandomMsgListByChapterName(this.selectedChapter).then(result=>{
                // console.log(result.data.msgData)
                this.randomMsgList = result.data.msgData;
                this.randomMsgList.map(data => { 
                    this.chapterList.forEach(element => {
                        if(element.keyName == data.chapterType){
                            data.chapterType = element.originalName
                        }
                    })
                    data.isPredict = data.predict!=''? 'Yes':'No'
                    return data;
                });
                this.showLoader = false;
            })
            .catch(error=>{
                console.log(error)
                this.showLoader = false;
            })
        },
        updateRandomMsg(){
            if(this.getRandomMsg == ''){
                alert("Invalid Meassage field");
                return false;
            }
            let payload = {
                respMsg: this.getRandomMsg,
                predict: this.getPredictOptions.length > 0 ? this.getPredictOptions: "",
                chapterType: this.selectedChapter,
                msgId: this.getMsgId
            }
            this.showLoader = true;
            this.UpdateRandomMsg(payload).then(async(result)=>{
                await this.chapterWistMsgList();
                alert(result.data.msg);
                this.showLoader = false;
                this.dialog= false
            })
            .catch(err=>{
                console.log(err)
            })
        },
        openNewItemform(){
            this.editedIndex = false;
            this.selectedChapterForNewItem = '';
            this.getRandomMsg = '';
            this.getPredictOptions = [];
            this.dialog= true
        },
        saveNewRandomMsg(){
            if(this.getRandomMsg == ''){
                alert("Invalid Meassage field");
                return false;
            }
            if(this.selectedChapterForNewItem == ''){
                alert("Please select Chapter Name");
                return false;
            }
            
            let payload = {
                respMsg: this.getRandomMsg,
                predict: this.getPredictOptions.length > 0 ? this.getPredictOptions: "",
                chapterType: this.selectedChapterForNewItem
            }
            
            this.AddRandomMsg(payload).then(async(result)=>{
                await this.chapterWistMsgList();
                // console.log(result.data)
                alert(result.data.msg)
                this.dialog= false
            })
            .catch(err=>{
                console.log(err)
            })
            
        }
    }
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>