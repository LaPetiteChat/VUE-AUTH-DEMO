import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterForm from '../views/RegisterForm.vue';
import HelloWorld from '../components/HelloWorld.vue'; // 假设存在该页面

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterForm },
  { path: '/hello', component: HelloWorld, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const authStore = router.app._context.provides.useStore('auth');
  
  if (!authStore) {
    console.error('Auth store not initialized!');
    return next('/login');
  }

  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;