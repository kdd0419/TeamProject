<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-toolbar flat>
         <v-toolbar-title>로그인</v-toolbar-title>
       </v-toolbar>
        <v-card>
          <div class="pa-3">
            <v-text-field
                v-model="email"
                label="이메일을 입력하세요"

            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="패스워드를 입력하세요"
                type="password"
            >
            </v-text-field>
            <v-btn
             large
             block
             color="primary"
             @click="login()"
            >로그인</v-btn>
          </div>
        </v-card>
      </v-flex>
      <v-btn color="info" href="/signup">회원가입</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: "",
      password: "",
      allUsers: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    login() {
      // 전체 유저에서 해당 이메일로 유저를 찾는다.
      let selectUser = null
      this.allUsers.forEach(user =>{
        if (user.id === this.email) selectUser = user
      })
      if (selectUser === null) alert('입력하신 이메일이 없습니다')
        else{
        if (selectUser.pw !== this.password){
          alert('이메일과 비밀번호가 일치하지 않습니다.')
       }else {
          alert('로그인 완료')
          location.href = '/'
        }
      }
      // 그 유저의 비밀번호와 입력된 비밀번호를 비교한다.
      console.log(this.email, this.password, selectUser.id, selectUser.pw)
    },
    getUsers () {
      axios.get('http://localhost:3000/api/s_user')
        .then((r) => {
          this.allUsers = r.data.users
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>
