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
                v-model="email"
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
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
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
        if(user.name === this.email) selectUser = user
      })
      if (this.email === null) alert('아이디가 없습니다')
        else{
        if (selectUser !== null){
          alert('가입된 아이디 입니다.')
        }else {
          this.postUser()
          location.href = 'login.vue'
        }
      }
      // 그 유저의 비밀번호와 입력된 비밀번호를 비교한다.
      console.log(this.email, this.password, this.allUsers)
    },
    getUsers () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          this.allUsers = r.data.users
          console.log(this.allUsers)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    postUser () {
      console.log(this.email, this.password)
      axios.post('http://localhost:3000/api/user', {
        name: this.email,
        age: this.password
        // user: 'postMan'
      })
        .then((r) => {
          alert('회원가입을 축하합니다')
           // 데이터갱신
        })
        .catch((e) => {
          console.error(e.message)
          this.pop('e.message')
        })
    }
  }
}
</script>
