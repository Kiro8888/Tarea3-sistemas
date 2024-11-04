<template>
  <div id="app" class="container">
    <div class="row" style="margin-top: 15px">
      <router-link class="three columns button button-primary" to="/">Home</router-link>
      <router-link class="three columns button button-primary" to="/book">Books</router-link>
      <router-link class="three columns button button-primary" to="/author">Authors</router-link>
      <router-link class="three columns button button-primary" to="/publisher">Publishers</router-link>
      <!-- <button class="three columns button button-danger" @click="logout">Cerrar sesión</button>  -->
      <button style="  padding: 1px;" class="three columns logout-button" @click="logout">Cerrar sesión</button>

    </div>
    <router-view />
    <div class="row">
      <button disabled="disabled" class="twelve columns button-primary">
        Copyright (c) 2020 - Aaron Villegas Mora
      </button>
    </div>
  </div>
</template>

<script>
import { removeSession } from './auth';

export default {
  name: "App",
  methods: {
    async logout() {
      const response = await fetch('/.netlify/functions/logout', { method: 'GET', credentials: 'include' });

      if (response.ok) {
        removeSession();
        this.$router.push('/');
      } else {
        console.error('Error al cerrar sesión');
      }
    }
  }
};
</script>

<style>
.logout-button {

  background-color: #33c3f0; 
  color: white; 
  border: none; 
  padding: 10px 15px;
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.logout-button:hover {
  background-color: #c82333; 
}
</style>