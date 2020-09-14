<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model="email" :class="{invalid: fieldRequiredValidation('email') || fieldTemplateValidation('email')}"/>
        <label for="email">Email</label>
        <small v-if="fieldRequiredValidation('email')" class="helper-text invalid">Введите email</small>
        <small v-if="fieldTemplateValidation('email')" class="helper-text invalid">Введите корректный email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" class="validate" v-model="password" :class="{invalid: fieldRequiredValidation('password') || fieldMinLengthValidation('password')}"/>
        <label for="password">Пароль</label>
        <small v-if="fieldRequiredValidation('password')" class="helper-text invalid">Введите пароль</small>
        <small v-if="fieldMinLengthValidation('password')" class="helper-text invalid">Пароль должен быть длиннее {{minLength}} символов</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" class="validate" v-model.trim="name" :class="{invalid: fieldRequiredValidation('name')}"/>
        <label for="name">Имя</label>
        <small v-if="fieldRequiredValidation('name')" class="helper-text invalid">Введите имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="isAgree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  data: ()=>({
    email: "",
    password: "",
    name: "",
    isAgree: false,
    minLength: 6
  }),
  validations(){
    return {
      email: {email, required},
      password: {minLength: minLength(this.minLength), required},
      name: {required},
      isAgree: {checked: v => v}
    }
  },
  methods: {
    fieldRequiredValidation(field){
      return this.$v[field].$dirty && !this.$v[field].required;
    },
    fieldMinLengthValidation(field){
      return this.$v[field].$dirty && !this.$v[field].minLength;
    },
    fieldTemplateValidation(field, template = "email"){
      return this.$v[field].$dirty && !this.$v[field][template];
    },
    submitHandler(){
      
      if(this.$v.$invalid){
        this.$v.$touch(); 
        return
      }

      const formData = {
      };

      this.$router.push("/");
    }
  }
}
</script>
