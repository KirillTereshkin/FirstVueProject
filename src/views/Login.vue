<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" 
               type="text" 
               class="validate" 
               :class="{invalid: emailRequiredValidation || emailTemplateValidation}" 
               v-model="email"/>
        <label for="email">Email</label>
        <small v-if="emailRequiredValidation" class="helper-text invalid">Введите email</small>
        <small v-else-if="emailTemplateValidation" class="helper-text invalid">Введите корректный email</small>
      </div>
      <div class="input-field">
        <input id="password" 
               type="password" 
               class="validate" 
               :class="{invalid: passwordRequiredValidation || passwordMinLengthValidation}"
               v-model="password"/>
        <label for="password">Пароль</label>
        <small v-if="passwordRequiredValidation" class="helper-text invalid">Введите пароль</small>
        <small v-else-if="passwordMinLengthValidation" class="helper-text invalid">Пароль должен быть длиннее {{minLengthPassword}} символов</small>
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

export default {
  data: () => ({
    email: "",
    password: "",
    minLengthPassword: 10,
  }),
  computed: {
    emailRequiredValidation(){
      return this.$v.email.$dirty && !this.$v.email.required;
    },
    emailTemplateValidation(){
      return this.$v.email.$dirty && !this.$v.email.email;
    },
    passwordRequiredValidation(){
      return this.$v.password.$dirty && !this.$v.password.required;    
    },
    passwordMinLengthValidation(){
      return this.$v.password.$dirty && !this.$v.password.minLength;
    }
  },
  validations(){
    return {
      email: {
        email,
        required
      },
      password:{
        minLength: minLength(this.minLengthPassword),
        required
      }
    }
  },
  methods: {
    submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch();
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
      }

      this.$router.push("/");
    }
  }
}
</script>
