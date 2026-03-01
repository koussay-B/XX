<template>
  <div class="max-w-3xl mx-auto space-y-6 pb-24 px-4 pt-10">
    <div class="flex items-center gap-4 mb-4">
      <router-link to="/formateur/gestionView" class="p-2 text-gray-400 hover:text-emerald-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      </router-link>
      <h2 class="text-xl font-black text-gray-900 uppercase italic">Nouvelle Question</h2>
    </div>

    <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
      <div class="space-y-4 pr-2 custom-scroll">
        <div>
          <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Énoncé</label>
          <textarea 
            v-model="newQuestion.text" 
            placeholder="Votre question ici..."
            rows="3"
            class="w-full px-4 py-3 border border-gray-100 rounded-2xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition resize-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Catégorie</label>
            <input v-model="newQuestion.category" type="text" placeholder="ex: VueJS" class="w-full px-4 py-3 border border-gray-100 rounded-2xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition" />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Complexité</label>
            <select v-model="newQuestion.difficulty" class="w-full px-4 py-3 border border-gray-100 rounded-2xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition">
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Type de réponse</label>
          <div class="grid grid-cols-3 gap-2">
            <button 
              v-for="type in ['QCM', 'QCU', 'Vrai/Faux']" :key="type"
              type="button"
              @click="changeType(type)"
              :class="newQuestion.type === type ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
              class="py-2 rounded-xl text-[10px] font-bold transition-all uppercase"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <div class="bg-gray-50 p-5 rounded-3xl border border-gray-100 space-y-3">
          <div class="flex items-center justify-between mb-2">
            <label class="text-[11px] font-black text-gray-900 uppercase tracking-widest italic">Options & Réponses</label>
            <button v-if="newQuestion.type !== 'Vrai/Faux'" @click="addOption" class="text-[10px] font-bold text-emerald-600 uppercase">+ Ajouter</button>
          </div>

          <div v-for="(opt, index) in options" :key="index" class="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
            <input 
              :type="newQuestion.type === 'QCM' ? 'checkbox' : 'radio'" 
              v-model="opt.isCorrect"
              @change="handleOptionCheck(index)"
              class="w-4 h-4 text-emerald-600 rounded-full border-gray-300 focus:ring-emerald-500"
            />
            <input v-model="opt.text" type="text" :disabled="newQuestion.type === 'Vrai/Faux'" class="flex-1 bg-transparent border-none text-xs outline-none font-medium" placeholder="Texte de la réponse..." />
            <button v-if="newQuestion.type !== 'Vrai/Faux' && options.length > 2" @click="removeOption(index)" class="text-gray-300 hover:text-red-400">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tags (virgules)</label>
          <input v-model="tagInput" type="text" placeholder="ex: javascript, frontend" class="w-full px-4 py-3 border border-gray-100 rounded-2xl bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition" />
        </div>
      </div>

      <div class="flex gap-3 pt-4 border-t">
        <button @click="$router.push('/formateur/gestionView')" class="flex-1 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Annuler</button>
        <button @click="saveQuestion" class="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-bold text-xs tracking-[0.2em] shadow-lg active:scale-95 transition-all uppercase">
          Enregistrer la Question
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tagInput = ref('');
const options = ref([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);

const newQuestion = reactive({
  text: '',
  category: '',
  difficulty: 'facile',
  type: 'QCM'
});

const changeType = (type: string) => {
  newQuestion.type = type;
  if (type === 'Vrai/Faux') {
    options.value = [{ text: 'Vrai', isCorrect: true }, { text: 'Faux', isCorrect: false }];
  }
};

const handleOptionCheck = (index: number) => {
  if (newQuestion.type !== 'QCM') {
    options.value.forEach((opt, i) => opt.isCorrect = (i === index));
  }
};

const addOption = () => options.value.push({ text: '', isCorrect: false });
const removeOption = (index: number) => options.value.splice(index, 1);

const saveQuestion = () => {
  if (!newQuestion.text || !newQuestion.category) return alert("Remplissez l'énoncé.");
  
  const saved = JSON.parse(localStorage.getItem('app_questions') || '[]');
  const tagsArray = tagInput.value.split(',').map(t => t.trim()).filter(t => t !== '');

  const data = {
    id: Date.now(),
    ...newQuestion,
    tags: tagsArray,
    options: JSON.parse(JSON.stringify(options.value)),
    createdAt: new Date().toISOString()
  };

  saved.unshift(data);
  localStorage.setItem('app_questions', JSON.stringify(saved));
  router.push('/formateur/gestionView');
};
</script>