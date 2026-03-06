<template>
  <div class="max-w-sm mx-auto space-y-4 relative">
    
    <div class="text-center">
      <h1 class="text-xl font-bold text-gray-900">Créer un compte entreprise</h1>
      <p class="text-xs text-gray-500 mt-1">Rejoignez <span class="text-emerald-600 font-semibold">XX</span></p>
    </div>

    <transition name="toast">
      <div v-if="successMessage" class="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full shadow-2xl border border-emerald-400 min-w-[260px]">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <span class="text-xs font-bold truncate">{{ successMessage }}</span>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="errorMessage" class="flex items-center p-2 text-red-700 bg-red-50 border-l-4 border-red-500 rounded shadow-sm" role="alert">
        <span class="text-xs font-bold">{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="ml-auto text-red-400 hover:text-red-600">×</button>
      </div>
    </transition>

    

    <!-- Séparateur -->
    <div class="flex items-center gap-2">
      <div class="flex-1 h-px bg-gray-200"></div>
      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ou</span>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-3">
      
      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Nom Entreprise</label>
        <input 
          v-model="form.nomEntreprise" 
          type="text" 
          placeholder="ex: Société Générale"
          class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-xs focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.nomEntreprise ? 'border-red-500 bg-red-50' : 'border-gray-200'"
        />
        <p v-if="errors.nomEntreprise" class="text-[9px] text-red-600 mt-0.5 font-bold ml-1 italic">{{ errors.nomEntreprise }}</p>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Matricule Fiscale</label>
        <input 
          v-model="form.matriculeFiscale" 
          type="text" 
          placeholder="ex: 1234567A/B/C/D"
          class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-xs focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.matriculeFiscale ? 'border-red-500 bg-red-50' : 'border-gray-200'"
        />
        <p v-if="errors.matriculeFiscale" class="text-[9px] text-red-600 mt-0.5 font-bold ml-1 italic">{{ errors.matriculeFiscale }}</p>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Nom Responsable</label>
        <input 
          v-model="form.nomResponsable" 
          type="text" 
          placeholder="ex: Ahmed Benali"
          class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-xs focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.nomResponsable ? 'border-red-500 bg-red-50' : 'border-gray-200'"
        />
        <p v-if="errors.nomResponsable" class="text-[9px] text-red-600 mt-0.5 font-bold ml-1 italic">{{ errors.nomResponsable }}</p>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Email Responsable</label>
        <input 
          v-model="form.emailResponsable" 
          type="email" 
          placeholder="nom@exemple.com"
          class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-xs focus:ring-2 focus:ring-emerald-400 outline-none transition"
          :class="errors.emailResponsable ? 'border-red-500 bg-red-50' : 'border-gray-200'"
        />
        <p v-if="errors.emailResponsable" class="text-[9px] text-red-600 mt-0.5 font-bold ml-1 italic">{{ errors.emailResponsable }}</p>
      </div>

      <button type="submit" :disabled="isLoading" class="w-full h-10 rounded-lg bg-gray-900 text-white font-bold text-xs transition-all shadow-md hover:shadow-emerald-100 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2">
        <span v-if="!isLoading">CRÉER MON COMPTE</span>
        <svg v-else class="animate-spin h-4 w-4 text-emerald-400" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface RegistrationForm {
  nomEntreprise: string;
  matriculeFiscale: string;
  nomResponsable: string;
  emailResponsable: string;
}

const form = reactive<RegistrationForm>({
  nomEntreprise: '',
  matriculeFiscale: '',
  nomResponsable: '',
  emailResponsable: ''
});

const errors = reactive<Partial<RegistrationForm>>({});
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleGoogleLogin = () => {
  console.log('Connexion Google déclenchée');
};

const handleSubmit = () => {
  errorMessage.value = "";
  Object.keys(errors).forEach(key => delete (errors as any)[key]);

  let isInvalid = false;

  if (!form.nomEntreprise.trim()) {
    errors.nomEntreprise = "Le nom de l'entreprise est requis.";
    isInvalid = true;
  }

  if (!form.matriculeFiscale.trim()) {
    errors.matriculeFiscale = "La matricule fiscale est requise.";
    isInvalid = true;
  }

  if (!form.nomResponsable.trim()) {
    errors.nomResponsable = "Le nom du responsable est requis.";
    isInvalid = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.emailResponsable)) {
    errors.emailResponsable = "Email invalide.";
    isInvalid = true;
  }

  if (isInvalid) {
    errorMessage.value = "Certains champs nécessitent votre attention.";
    return;
  }

  isLoading.value = true;
  
  setTimeout(() => {
    isLoading.value = false;
    successMessage.value = `Bienvenue, ${form.nomEntreprise} ! Inscription réussie.`;
    form.nomEntreprise = ''; form.matriculeFiscale = ''; form.nomResponsable = ''; form.emailResponsable = '';
    setTimeout(() => { successMessage.value = ''; }, 4000);
  }, 1500);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }

.toast-enter-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from { transform: translate(-50%, -100px); opacity: 0; }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-leave-to { opacity: 0; transform: translate(-50%, -20px) scale(0.9); }
</style>