<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <button @click="$router.push('/register')">Go to Register</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  const authStore = useAuthStore();
  
  const handleLogin = async () => {
    if (!email.value || !password.value) {
      error.value = 'Email and password are required';
      return;
    }

    try {
      const success = await authStore.loginUser(email.value, password.value);
    if (success) {
      router.push('/hello');
    } else {
      error.value = 'Invalid credentials';
    }
  } catch (error) {
    error.value = 'Login failed: ' + error.message;
  }
};
  </script>