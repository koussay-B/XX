<template>
  <div class="max-w-md mx-auto space-y-6 relative">
    
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Connexion</h1>
      <p class="text-sm text-gray-500 mt-1">Bienvenue sur <span class="text-emerald-600 font-semibold">XX</span></p>
    </div>

    <transition name="toast">
      <div v-if="successMessage" class="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-emerald-600 text-white rounded-full shadow-2xl border border-emerald-400 min-w-[300px]">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <span class="text-sm font-bold truncate">{{ successMessage }}</span>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="errorMessage" class="flex items-center p-3 text-red-700 bg-red-50 border-l-4 border-red-500 rounded shadow-sm" role="alert">
        <span class="text-xs font-bold">{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="ml-auto text-red-400 hover:text-red-600 text-lg">×</button>
      </div>
    </transition>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      <div>
        <label class="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Email professionnel</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="nom@exemple.com"
          class="w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'"
        />
        <p v-if="errors.email" class="text-[10px] text-red-600 mt-1 font-bold ml-1 italic">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Mot de passe</label>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition"
            :class="errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-[10px] font-black uppercase"
          >
            {{ showPassword ? 'Cacher' : 'Voir' }}
          </button>
        </div>
        <p v-if="errors.password" class="text-[10px] text-red-600 mt-1 font-bold ml-1 italic">{{ errors.password }}</p>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full h-12 rounded-xl bg-gray-900 text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-100 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
      >
        <span v-if="!isLoading">SE CONNECTER</span>
        <svg v-else class="animate-spin h-5 w-5 text-emerald-400" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>

    </form>

    <p class="text-center text-sm text-gray-600">
      Pas de compte ?
      <router-link to="/auth/register" class="text-emerald-600 font-semibold underline decoration-2 underline-offset-4">
        S'inscrire
      </router-link>
    </p>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function validate() {
  errors.email = ''
  errors.password = ''
  let isValid = true

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = "L'email est requis."
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Format d'email invalide."
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Le mot de passe est requis.'
    isValid = false
  }

  return isValid
}

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!validate()) {
    errorMessage.value = "Veuillez remplir correctement les champs."
    return
  }

  isLoading.value = true

  try {
    // Simulation API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simuler connexion réussie
    localStorage.setItem('isLoggedIn', 'true')
    
    successMessage.value = "Connexion réussie ! Redirection..."
    
    // Auto-fermeture du toast
    setTimeout(() => { successMessage.value = ''; }, 3000)

  } catch (err) {
    errorMessage.value = 'Email ou mot de passe incorrect.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }

/* Animation du Toast */
.toast-enter-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from { transform: translate(-50%, -100px); opacity: 0; }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-leave-to { opacity: 0; transform: translate(-50%, -20px) scale(0.9); }
</style>