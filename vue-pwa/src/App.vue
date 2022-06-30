<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="title white--text">반가원요!</h1>
            <p class="caption">by VueJS</p>
            <img src="./assets/profile.jpeg" width="300" alt="profile image" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    // 다크 모드를 사용
    this.$vuetify.theme.dark = true;
  },
};
</script>
