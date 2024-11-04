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
    const response = await fetch('/.netlify/functions/login', {
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
        setSession(true);
        this.$router.push('/');
    } else {
        alert('Usuario o contraseña inválidos');
    }
}

  }
};
</script>
