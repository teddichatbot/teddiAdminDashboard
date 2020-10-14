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
                        @change="chapterWiseFaqList"
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
                    <th class="text-left">Question</th>
                    <th class="text-left">Answer</th>
                    <th class="text-left">Chapter Name</th>
                    <th class="text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in faqList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.question }}</td>
                    <td>{{ item.answer }}</td>
                    <td>{{ item.chapterName }}</td>
                    <td>
                        <v-icon
                            small
                            class="mr-2"
                            @click="showFaq(item)"
                        >
                            mdi-eye
                        </v-icon>
                        <v-icon
                            small
                            class="mr-2"
                            @click="deleteFaq(item)"
                        >
                            mdi-delete
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
                                        label="Question"
                                        :readonly="editedIndex"
                                        v-model="getQuestion"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-textarea
                                        name="input-7-1"
                                        label="Answer"
                                        v-model="getAnswer"
                                        
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-combobox
                                        v-model="getSearchingWords"
                                        append-icon
                                        label="Searching Words"
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
                        @click="editFaq"
                    >
                        Update
                    </v-btn>
                    <v-btn
                        v-else
                        color="primary"
                        text
                        @click="saveNewFaq"
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
        faqList: [],
        getQuestion: '',
        getAnswer: '',
        getSearchingWords: [],
        getFaqId: ''
    }),
    methods: {
        ...mapActions(["GetFaqListByChapterName", "AddFaq", "UpdateFaq", "SearchFaq", "DeleteFaq"]),
        showFaq(item){
            this.getQuestion = item.question;
            this.getAnswer = item.answer;
            this.getSearchingWords = item.faq;
            this.getFaqId = item.id;
            this.editedIndex = true;
            this.dialog= true
        },
        chapterWiseFaqList(){
            this.showLoader = true;       
            this.GetFaqListByChapterName(this.selectedChapter).then(result=>{
                // console.log(result.data.msgData)
                this.faqList = result.data.data;
                this.faqList.map(data => { 
                    this.chapterList.forEach(element => {
                        if(element.keyName == data.chapterName){
                            data.chapterName = element.originalName
                        }
                    })
                    return data;
                });
                this.showLoader = false;
            })
            .catch(error=>{
                console.log(error)
                this.showLoader = false;
            })
        },
        editFaq(){
            if(this.getQuestion == ''){
                alert("Invalid Question field");
                return false;
            }
            if(this.getAnswer == ''){
                alert("Invalid Answer field");
                return false;
            }
            if(this.getSearchingWords.length == 0){
                alert("Invalid Selective Words field");
                return false;
            }
            let payload = {
                faq: this.getSearchingWords,
                question: this.getQuestion,
                answer: this.getAnswer,
                chapterName: this.selectedChapter,
                faqId: this.getFaqId
            }
            // console.log(payload)
            this.showLoader = true;
            this.UpdateFaq(payload).then(async(result)=>{
                await this.chapterWiseFaqList();
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
            this.getQuestion = '';
            this.getAnswer = '';
            this.getSearchingWords = [];
            this.dialog= true
        },
        async saveNewFaq(){
            if(this.getQuestion == ''){
                alert("Invalid Question field");
                return false;
            }
            if(this.getAnswer == ''){
                alert("Invalid Answer field");
                return false;
            }
            if(this.getSearchingWords.length == 0){
                alert("Invalid Selective Words field");
                return false;
            }
            if(this.selectedChapterForNewItem == ''){
                alert("Chapter name is required");
                return false;
            }        
            
            let payload = {
                faq: this.getSearchingWords,
                question: this.getQuestion,
                answer: this.getAnswer,
                chapterName: this.selectedChapterForNewItem,
            }
            
            this.showLoader = true;
            try{
                let searchResult = await this.SearchFaq(this.getQuestion);            
                if(searchResult.status == 200){
                    alert('This question is already matched of another combination of searching words.')
                }else{
                    this.AddFaq(payload).then(async()=>{
                        await this.chapterWiseFaqList();
                        this.showLoader = false;
                        alert("FAQ added successfully")
                        this.dialog= false
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            }catch(e){
                console.log(e)
            }
            
        },

        deleteFaq(item){
            if (window.confirm("Are you sure want to delete?")) { 
                this.showLoader = true;
                this.DeleteFaq(item.id).then(async(deleteData)=>{
                    await this.chapterWiseFaqList();
                    alert(deleteData.data.msg);
                    this.showLoader = false;
                })
                .catch(err=>{
                    console.log('err in delete Faq', err)
                })
            }
        }
    }
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>