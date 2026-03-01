<template>
  <div class="min-h-screen bg-[#FBFBFC] flex items-center justify-center p-4">
    <div class="max-w-xl w-full space-y-5 pb-10">
      
      <div class="relative flex items-center justify-center mb-2">
        <router-link 
          to="/formateur/gestionView" 
          class="absolute left-0 p-1.5 text-gray-400 hover:text-emerald-600 transition-colors bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
        </router-link>
        
        <h2 class="text-lg font-bold text-gray-900 uppercase tracking-tight italic">
          Nouvelle Question
        </h2>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 space-y-5">
        <div class="space-y-4 pr-1 custom-scroll max-h-[75vh] overflow-y-auto">
          
          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-wider">Énoncé de la question</label>
            <textarea 
              v-model="newQuestion.text" 
              placeholder="Ex: Quelle est la différence entre ref() et reactive() ?"
              rows="3"
              class="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 text-xs focus:ring-2 focus:ring-emerald-400 outline-none transition resize-none font-medium"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-wider">Questionnaire</label>
              <select 
                v-model="newQuestion.assignedQuestionnaireId" 
                class="w-full px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-[11px] focus:ring-2 focus:ring-emerald-400 outline-none transition font-bold text-gray-700 cursor-pointer"
              >
                <option value="" disabled>Choisir...</option>
                <option v-for="q in existingQuestionnaires" :key="q.id" :value="q.id">
                  {{ q.title.toUpperCase() }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-wider">Complexité</label>
              <select v-model="newQuestion.difficulty" class="w-full px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-[11px] focus:ring-2 focus:ring-emerald-400 outline-none transition font-bold text-gray-700 cursor-pointer">
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-wider">Type de réponse</label>
            <div class="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
              <button 
                v-for="type in ['QCM', 'QCU', 'Vrai/Faux']" :key="type"
                type="button"
                @click="changeType(type)"
                :class="newQuestion.type === type ? 'bg-white text-emerald-600 shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'"
                class="py-1.5 rounded-lg text-[9px] uppercase transition-all"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
            <div class="flex items-center justify-between mb-1">
              <label class="text-[10px] font-bold text-gray-900 uppercase tracking-widest italic">Options & Réponses</label>
              <button v-if="newQuestion.type !== 'Vrai/Faux'" @click="addOption" class="text-[9px] font-bold text-emerald-600 uppercase hover:underline">+ Ajouter</button>
            </div>

            <div v-for="(opt, index) in options" :key="index" class="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm transition-all" :class="{'ring-2 ring-emerald-400/20 border-emerald-200': opt.isCorrect}">
              <input 
                :type="newQuestion.type === 'QCM' ? 'checkbox' : 'radio'" 
                v-model="opt.isCorrect"
                @change="handleOptionCheck(index)"
                class="w-3.5 h-3.5 text-emerald-600 rounded-full border-gray-300 focus:ring-emerald-500 cursor-pointer"
              />
              <input v-model="opt.text" type="text" :disabled="newQuestion.type === 'Vrai/Faux'" class="flex-1 bg-transparent border-none text-[11px] outline-none font-bold text-gray-700" placeholder="Saisir une option..." />
              <button v-if="newQuestion.type !== 'Vrai/Faux' && options.length > 2" @click="removeOption(index)" class="text-gray-300 hover:text-red-500">
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-wider">Tags</label>
            <input v-model="tagInput" type="text" placeholder="ex: javascript, vuejs" class="w-full px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-[11px] focus:ring-2 focus:ring-emerald-400 outline-none transition font-medium" />
          </div>
        </div>

        <div class="flex gap-3 pt-3 border-t border-gray-50">
          <button @click="$router.push('/formateur/gestionView')" class="flex-1 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">Annuler</button>
          <button @click="saveQuestion" class="flex-[2] py-3 bg-gray-900 text-white rounded-xl font-bold text-[10px] tracking-widest shadow-lg hover:bg-emerald-600 active:scale-[0.98] transition-all uppercase">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const tagInput = ref('');
const options = ref([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
const existingQuestionnaires = ref<any[]>([]);

const newQuestion = reactive({
  text: '',
  assignedQuestionnaireId: '',
  difficulty: 'facile',
  type: 'QCM'
});

onMounted(() => {
  // Récupération des questionnaires existants
  const savedQuizzes = JSON.parse(localStorage.getItem('app_questionnaires') || '[]');
  existingQuestionnaires.value = savedQuizzes.length > 0 ? savedQuizzes : [
    { id: 1, title: "Onboarding Frontend" },
    { id: 2, title: "Algorithmique Python" }
  ];

  // LOGIQUE POUR LE NOM PAR DEFAUT
  if (route.query.questionnaireName) {
    const nameFromQuery = route.query.questionnaireName.toString().toLowerCase();
    const found = existingQuestionnaires.value.find(q => q.title.toLowerCase() === nameFromQuery);
    if (found) {
      newQuestion.assignedQuestionnaireId = found.id;
    }
  }
});

const changeType = (type: string) => {
  newQuestion.type = type;
  if (type === 'Vrai/Faux') {
    options.value = [{ text: 'Vrai', isCorrect: true }, { text: 'Faux', isCorrect: false }];
  } else {
    options.value = [{ text: '', isCorrect: false }, { text: '', isCorrect: false }];
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
  if (!newQuestion.text || !newQuestion.assignedQuestionnaireId) {
    return alert("L'énoncé et le questionnaire sont obligatoires.");
  }
  
  const hasCorrectAnswer = options.value.some(o => o.isCorrect);
  if (!hasCorrectAnswer) return alert("Veuillez marquer au moins une réponse comme correcte.");

  const savedQuestions = JSON.parse(localStorage.getItem('app_questions') || '[]');
  const tagsArray = tagInput.value.split(',').map(t => t.trim()).filter(t => t !== '');

  const data = {
    id: Date.now(),
    text: newQuestion.text,
    questionnaireId: newQuestion.assignedQuestionnaireId,
    difficulty: newQuestion.difficulty,
    type: newQuestion.type,
    tags: tagsArray,
    options: JSON.parse(JSON.stringify(options.value)),
    createdAt: new Date().toISOString()
  };

  savedQuestions.unshift(data);
  localStorage.setItem('app_questions', JSON.stringify(savedQuestions));
  router.push('/formateur/gestionView');
};
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.8em;
}
</style>