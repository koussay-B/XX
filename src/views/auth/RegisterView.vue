<template>
  <div class="max-w-md mx-auto space-y-6 relative">
    
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Créer un compte</h1>
      <p class="text-sm text-gray-500 mt-1">Rejoignez <span class="text-emerald-600 font-semibold">XX</span></p>
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
        <button @click="errorMessage = ''" class="ml-auto text-red-400 hover:text-red-600">×</button>
      </div>
    </transition>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      
      <div>
        <label class="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Nom complet</label>
        <input 
          v-model="form.name" 
          type="text" 
          placeholder="ex: Ahmed Benali"
          class="w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'"
        />
        <p v-if="errors.name" class="text-[10px] text-red-600 mt-1 font-bold ml-1 italic">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Email </label>
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
            class="w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition"
            :class="errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'"
          />
          <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-[10px] font-black uppercase">
            {{ showPassword ? 'Cacher' : 'Voir' }}
          </button>
        </div>

        <div class="flex gap-2 mt-2 px-1">
          <div v-for="(req, index) in passwordRequirements" :key="index" class="flex-1">
            <div class="h-1 rounded-full transition-all duration-500" :class="req.isValid ? 'bg-emerald-500 shadow-sm' : 'bg-gray-200'"></div>
            <p class="text-[8px] mt-1 text-center uppercase tracking-tighter" :class="req.isValid ? 'text-emerald-600 font-bold' : 'text-gray-400'">{{ req.label }}</p>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Vérification</label>
        <input 
          v-model="form.confirmPassword" 
          :type="showPassword ? 'text' : 'password'" 
          class="w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'"
        />
        <p v-if="errors.confirmPassword" class="text-[10px] text-red-600 mt-1 font-bold ml-1 italic">{{ errors.confirmPassword }}</p>
      </div>

      <button type="submit" :disabled="isLoading" class="w-full h-12 rounded-xl bg-gray-900 text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-100 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2">
        <span v-if="!isLoading">CRÉER MON COMPTE</span>
        <svg v-else class="animate-spin h-5 w-5 text-emerald-400" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const form = reactive<RegistrationForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive<Partial<RegistrationForm>>({});
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const showPassword = ref(false);

const passwordRequirements = computed(() => [
  { label: '6+ Carac.', isValid: form.password.length >= 6 },
  { label: '1 Chiffre', isValid: /\d/.test(form.password) },
  { label: '1 Majuscule', isValid: /[A-Z]/.test(form.password) }
]);

const handleSubmit = () => {
  errorMessage.value = "";
  Object.keys(errors).forEach(key => delete (errors as any)[key]);

  let isInvalid = false;

  const nameParts = form.name.trim().split(/\s+/);
  if (nameParts.length < 2) {
    errors.name = "Format incorrect (Prénom + Nom).";
    isInvalid = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    errors.email = "Email invalide.";
    isInvalid = true;
  }

  if (!passwordRequirements.value.every(r => r.isValid)) {
    errors.password = "Sécurité insuffisante.";
    isInvalid = true;
  }

  if (form.password !== form.confirmPassword || !form.confirmPassword) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    isInvalid = true;
  }

  if (isInvalid) {
    errorMessage.value = "Certains champs nécessitent votre attention.";
    return;
  }

  isLoading.value = true;
  
  setTimeout(() => {
    isLoading.value = false;
    successMessage.value = `Bienvenue, ${nameParts[0]} ! Inscription réussie.`;
    
    // Reset du formulaire
    form.name = ''; form.email = ''; form.password = ''; form.confirmPassword = '';
    
    // Faire disparaître le toast automatiquement après 4s
    setTimeout(() => { successMessage.value = ''; }, 4000);
  }, 1500);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }

/* Animation du Toast (Succès) */
.toast-enter-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from { transform: translate(-50%, -100px); opacity: 0; }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-leave-to { opacity: 0; transform: translate(-50%, -20px) scale(0.9); }
</style>