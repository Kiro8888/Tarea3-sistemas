<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
    </div>
</template>

<script>
import { setSession } from '../auth';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      // Envía las credenciales al servidor para iniciar sesión
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      if (response.ok) {
        // Si la respuesta es correcta, guarda la sesión y redirige
        setSession(true);
        this.$router.push('/'); 
      } else {
        // Si hay un error, muestra un mensaje
        alert('Invalid username or password');
      }
    }
  }
};
</script>
