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
                label="이메일"
                :rules="[() => !!email || 'E-mail is required']"
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="비밀번호(영문자, 숫자 포함)"
                type="password"
                :rules="[
                  () => !!password || 'password is required',
                ]"
            >
            </v-text-field>
            <v-text-field
                v-model="name"
                label="이름"
            >
            </v-text-field>
            <v-text-field
                v-model="age"
                label="나이"
                type="number"
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
      name: '',
      age: 0,
      allUsers: []
    }
  },
  mounted () {
    this.getUsers()
  },

  methods: {
    login () {
      // 전체 유저에서 해당 이메일로 유저를 찾는다.
      let selectUser = null
      this.allUsers.forEach(user =>{
        if(user.id === this.email) selectUser = user
      })
      if (this.email === null) alert('아이디가 없습니다')
        else{
        if (selectUser !== null){
          alert('가입된 아이디 입니다.')
        }else {
            let rule = /^[a-z0-9_-]+$/
            console.log(rule.test(this.password))
            if(rule.test(this.password)===true){
              this.postUser()
              location.href = '/login'
            }else{
              alert('비밀번호가 형식에 맞지 않습니다.')
            }
          }

        }
      // 그 유저의 비밀번호와 입력된 비밀번호를 비교한다.
      console.log(this.email, this.password, this.allUsers)
    },
    getUsers () {
      axios.get('http://localhost:3000/api/s_user')
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
      axios.post('http://localhost:3000/api/s_user', {
        id: this.email,
        pw: this.password,
        name: this.name,
        age: this.age
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
    },

  }
}
</script>
