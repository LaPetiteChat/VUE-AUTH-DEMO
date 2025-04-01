<template>
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        
        <form @submit.prevent="handleRegister" class="auth-form">
          <!-- Email Field -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="your@email.com"
              required
              class="form-input"
            />
          </div>
  
          <!-- Password Field -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="At least 8 characters"
              minlength="8"
              required
              class="form-input"
            />
          </div>
  
          <!-- Gender Field -->
          <div class="form-group">
            <label>Gender</label>
            <div class="radio-group">
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="gender"
                  value="male"
                />
                <span>Male</span>
              </label>
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="gender"
                  value="female"
                />
                <span>Female</span>
              </label>
              <label class="radio-option">
                <input
                  type="radio"
                  v-model="gender"
                  value="other"
                />
                <span>Other</span>
              </label>
            </div>
          </div>
  
          <!-- Disability Field -->
          <div class="form-group">
            <label>Do you have a disability?</label>
            <select v-model="hasDisability" class="form-select">
              <option value="" disabled selected>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
  
          <!-- Reason for Joining -->
          <div class="form-group">
            <label for="reason">Reason for Joining (max 200 characters)</label>
            <textarea
              id="reason"
              v-model="reasonForJoining"
              placeholder="Tell us why you're joining..."
              maxlength="200"
              class="form-textarea"
            ></textarea>
            <div class="char-count">{{ reasonForJoining.length }}/200</div>
          </div>
  
          <!-- Submit Button -->
          <button type="submit" class="submit-btn">Register Now</button>
          
          <!-- Error Message -->
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
  
        <div class="auth-footer">
          <p>Already have an account?</p>
          <button @click="$router.push('/login')" class="link-btn">Sign In</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  
  const email = ref('');
  const password = ref('');
  const gender = ref('');
  const hasDisability = ref('');
  const reasonForJoining = ref('');
  const error = ref('');
  const router = useRouter();
  const authStore = useAuthStore();
  
  const handleRegister = async () => {
    // Basic validation
    if (!email.value || !password.value) {
      error.value = 'Email and password are required';
      return;
    }
    
    if (password.value.length < 8) {
      error.value = 'Password must be at least 8 characters';
      return;
    }
  
    try {
      await authStore.registerUser({
      email: email.value,
      password: password.value,
      gender: gender.value,
      hasDisability: hasDisability.value,
      reasonForJoining: reasonForJoining.value
    });
    router.push('/hello');
  } catch (error) {
    error.value = 'Registration failed: ' + error.message;
  }
    
    
  };
  </script>
  
  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
  }
  
  .auth-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 32px;
    width: 100%;
    max-width: 480px;
  }
  
  .auth-title {
    font-size: 24px;
    font-weight: 600;
    color: #2d3748;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  label {
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
  }
  
  .form-input,
  .form-select,
  .form-textarea {
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
  
  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .char-count {
    font-size: 12px;
    color: #718096;
    text-align: right;
  }
  
  .radio-group {
    display: flex;
    gap: 16px;
    margin-top: 4px;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .submit-btn {
    background-color: #4299e1;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 8px;
  }
  
  .submit-btn:hover {
    background-color: #3182ce;
  }
  
  .error-message {
    color: #e53e3e;
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
  }
  
  .auth-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    font-size: 14px;
    color: #718096;
  }
  
  .link-btn {
    background: none;
    border: none;
    color: #4299e1;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }
  
  .link-btn:hover {
    text-decoration: underline;
  }
  </style>