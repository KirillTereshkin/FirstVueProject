<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" 
               type="text" 
               class="validate" 
               :class="{invalid: fieldRequiredValidation('email') || fieldTemplateValidation('email')}" 
               v-model="email"/>
        <label for="email">Email</label>
        <small v-if="fieldRequiredValidation('email')" class="helper-text invalid">Введите email</small>
        <small v-else-if="fieldTemplateValidation('email')" class="helper-text invalid">Введите корректный email</small>
      </div>
      <div class="input-field">
        <input id="password" 
               type="password" 
               class="validate" 
               :class="{invalid: fieldRequiredValidation('password') || fieldMinLengthValidation('password')}"
               v-model="password"/>
        <label for="password">Пароль</label>
        <small v-if="fieldRequiredValidation('password')" class="helper-text invalid">Введите пароль</small>
        <small v-else-if="fieldMinLengthValidation('password')" class="helper-text invalid">Пароль должен быть длиннее {{minLength}} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import {toastMessages, toastStyles} from '@/utils/toast-info'
import {mapActions} from 'vuex'

export default {
  data: () => ({
    email: "",
    password: "",
    minLength: 6,
  }),
  validations(){
    return {
      email: {
        email,
        required
      },
      password:{
        minLength: minLength(this.minLength),
        required
      }
    }
  },
  mounted(){
    if(toastMessages[this.$route.query.message]) this.$addToast(toastMessages[this.$route.query.message], toastStyles.success);
  },
  methods: {
    ...mapActions(['login']),
    fieldRequiredValidation(field){
      return this.$v[field].$dirty && !this.$v[field].required;
    },
    fieldMinLengthValidation(field){
      return this.$v[field].$dirty && !this.$v[field].minLength;
    },
    fieldTemplateValidation(field, template = "email"){
      return this.$v[field].$dirty && !this.$v[field][template];
    },
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch();
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
      }

      try{
        await this.login(formData);
        this.$router.push("/");
      }
      catch(e){}
      
    }
  }
}
</script>
