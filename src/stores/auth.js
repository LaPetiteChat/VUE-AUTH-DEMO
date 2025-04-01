import { defineStore } from 'pinia';
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    cachedUsers: [] // 缓存用户数据
  }),
  actions: {
    async fetchUsers() {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      this.cachedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    async registerUser(userData) {
      await addDoc(collection(db, "users"), userData);
      await this.fetchUsers(); // 注册后更新缓存
      this.loginUser(userData.email, userData.password);
    },
    
    async loginUser(email, password) {
      const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        this.currentUser = { email };
        return true;
      }
      return false;
    },
    
    async init() {
      await this.fetchUsers();
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) this.currentUser = storedUser;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
        paths: ['currentUser']
      }
    ]
  }
});