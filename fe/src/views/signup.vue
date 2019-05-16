<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-toolbar flat>
         <v-toolbar-title>회원가입</v-toolbar-title>
       </v-toolbar>
        <v-card>
          <div class="pa-3">
            <v-text-field
                v-model="user_id"
                label="임시아이디 : 사용자 이름"

            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="임시 비밀번호 : 사용자 나이"
                type="password"
            >
            </v-text-field>
            <v-btn
             large
             block
             color="primary"
             @click="login()"
            >회원가입</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      allUsers: [
        { id:1, user_id: 'genie', password:'12345'},
        { id:2, user_id: 'test',  password:'12345'}
      ]
    }
  },
  methods: {
    login() {
      // 전체 유저에서 해당 이메일로 유저를 찾는다.
      let selectUser = null
      this.allUsers.forEach(user =>{
        if(user.user_id === this.user_id) selectUser = user
      })
      if (selectUser === null) alert('아이디가 없습니다')
        else{
        if (selectUser.password !== this.password){
          alert('아이디와 비밀번호가 일치하지 않습니다.')
        }else {
          alert('로그인 완료')
          location.href = 'Home.vue'
        }
      }
      // 그 유저의 비밀번호와 입력된 비밀번호를 비교한다.
      console.log(this.email, this.password)
    }
  }
}
</script>
