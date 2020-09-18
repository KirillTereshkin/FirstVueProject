<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('hide-navbar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span> 
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            User Name
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logoutHandler">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

let intervalId;
let dropdown;

export default {
  data: () => ({
    date: new Date()
  }),
  methods: {
    ...mapActions('auth', ['logout']),
    async logoutHandler(){
      await this.logout();
      this.$router.push("/login?message=logout");
    },    
  },
  mounted(){
    intervalId = setInterval(()=> { this.date = new Date() }, 1000);

    dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constraintWidth: true
    })
  },
  beforeDestroy(){
    clearInterval(intervalId);
    if( dropdown && dropdown.destroy ) dropdown.destroy();
  }
}
</script>