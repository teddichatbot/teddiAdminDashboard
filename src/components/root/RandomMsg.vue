<template>
    <v-col cols=12>
        <template>
            <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6">
                        <v-select
                        :items="chapterList"
                        item-text="originalName"
                        item-value="keyName"
                        label="Solo field"
                        solo
                        
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </template>
        <template>
            <v-simple-table fixed-header height="500px">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Message</th>
                    <th class="text-left">Predict Option?</th>
                    <th class="text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
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
                <!-- <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    Click Me
                    </v-btn>
                </template> -->

                <v-card>
                    <v-card-title class="headline grey lighten-2">
                    Privacy Policy
                    </v-card-title>

                    <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                    >
                        I accept
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
        </template>
    </v-col>
</template>

<script>
export default {
    name: 'RandomMsg-page',
    data: () =>({
        dialog: false,
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
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          }
        ]
    }),
    methods: {
        showMsg(item){
            alert(item.name);
            this.dialog= true
        }
    }
}
</script>