<template>
  <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item :to="{name : 'Dashboard'}">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name : 'UserList'}" >
          <v-list-item-action>
            <v-icon>mdi-account-multiple-plus</v-icon> 
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item :to="{name : 'FAQ Page'}">
          <v-list-item-action>
            <v-icon> mdi-comment-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item :to="{name : 'Feedback'}">
          <v-list-item-action>
            <v-icon> mdi-comment-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Feedback</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name : 'Random Messages'}">
          <v-list-item-action>
            <v-icon> mdi-comment-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Random Message</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
</template>

<script>
export default {
  name: 'Sidebar',

  components: {},
  data: () => ({
    drawer: null,
  }),
};
</script>
