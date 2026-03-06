<template>
  <div class="min-h-screen bg-[#FBFBFC] text-[#1A1C1E] font-sans selection:bg-emerald-100 selection:text-emerald-900 flex">
    
    <aside class="w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div class="p-8">
        <h1 class="text-xl font-bold text-gray-900 uppercase tracking-tight italic leading-none">
          Console <span class="text-emerald-600">Admin</span>
        </h1>
        <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2 flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Master Control
        </p>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <button v-for="item in menu" :key="item.id" @click="currentTab = item.id"
          :class="currentTab === item.id ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'"
          class="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group">
          <span class="text-[10px] font-bold uppercase tracking-[0.15em]">{{ item.label }}</span>
        </button>
      </nav>

      <div class="p-6 border-t border-gray-50">
        <div class="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 text-left">
          <div class="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white text-[10px] font-bold italic">AD</div>
          <div class="min-w-0">
            <p class="text-[10px] font-bold text-gray-800 uppercase leading-none">Super Admin</p>
            <p class="text-[8px] font-bold text-gray-400 uppercase mt-1 cursor-pointer hover:text-red-500 transition-colors italic">Déconnexion</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 p-10 max-w-6xl mx-auto w-full">
      <transition name="fade" mode="out-in">
        <section v-if="currentTab === 'companies'" class="space-y-8">
          
          <header class="flex justify-between items-end">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 uppercase italic tracking-tighter">Gestion <span class="text-emerald-600">Entreprises</span></h2>
              <p class="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-[0.2em]">Flux d'adhésion et validation</p>
            </div>
            <button class="h-10 px-6 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
              + Nouvelle Entreprise
            </button>
          </header>

          <div class="grid grid-cols-3 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center md:text-left">
              <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
              <div class="flex items-end gap-2 justify-center md:justify-start">
                <span class="text-4xl font-black text-indigo-600 leading-none tracking-tighter italic">{{ stat.value }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-50 flex items-center gap-3">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <h3 class="text-sm font-black text-gray-900 uppercase italic tracking-tight">Demandes d'accès <span class="text-indigo-600">récentes</span></h3>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-gray-50/50">
                  <tr>
                    <th class="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Entreprise</th>
                    <th class="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Email</th>
                    <th class="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-if="demandesAttente.length === 0">
                    <td colspan="3" class="py-16 text-center text-[11px] font-bold text-gray-300 uppercase italic tracking-widest">
                      Aucune demande en attente.
                    </td>
                  </tr>
                  <tr v-for="req in demandesAttente" :key="req.id" class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-4 text-xs font-black text-gray-800 italic uppercase">{{ req.entreprise }}</td>
                    <td class="px-6 py-4 text-xs font-bold text-gray-500 text-center">{{ req.email }}</td>
                    <td class="px-6 py-4 text-right space-x-2">
                      <button @click="validerDemande(req)" class="px-3 py-1.5 bg-emerald-500 text-white text-[9px] font-black rounded-lg hover:bg-emerald-600 transition-all uppercase italic">Valider</button>
                      <button @click="refuserDemande(req.id)" class="px-3 py-1.5 bg-white border border-red-100 text-red-500 text-[9px] font-black rounded-lg hover:bg-red-50 transition-all uppercase italic">Refuser</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div class="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Liste des partenaires validés</p>
                <div class="relative w-64 group">
                  <input v-model="searchQuery" type="text" placeholder="FILTRER..." 
                    class="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-[9px] font-bold uppercase outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm" />
                  <svg class="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="3"/></svg>
                </div>
              </div>
              <table class="w-full">
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="company in filteredCompanies" :key="company.id" class="hover:bg-gray-50/50 transition-colors group">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-[9px] font-black">{{ company.name.substring(0,2).toUpperCase() }}</div>
                        <p class="text-xs font-bold text-gray-800 uppercase italic">{{ company.name }}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span class="text-[9px] font-bold uppercase text-emerald-700 tracking-widest">Actif</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button @click="toggleCompany(company.id)" class="text-[9px] font-black text-red-400 uppercase hover:text-red-600 transition-colors">Révoquer</button>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </section>

        <section v-else class="max-w-3xl mx-auto space-y-8">
           <header>
            <h2 class="text-2xl font-bold text-gray-900 uppercase italic tracking-tighter">System <span class="text-emerald-600">Config</span></h2>
          </header>
          <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
             <p class="text-xs font-bold text-gray-400 uppercase italic">Configuration du serveur opérationnelle.</p>
          </div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const currentTab = ref('companies');
const menu = [
  { id: 'companies', label: 'Dashboard Entreprises' },
  { id: 'settings', label: 'Paramètres Système' }
];

// Données Mock des demandes d'accès (Pour simuler ton image)
const demandesAttente = ref([
  { id: 101, entreprise: 'TECH NEXUS', email: 'contact@technexus.io' },
  { id: 102, entreprise: 'ECO FUEL', email: 'rh@ecofuel.com' }
]);

const companies = ref([
  { id: 1, name: 'Alpha Digit', email: 'admin@alpha.com', sector: 'Tech', active: true },
  { id: 2, name: 'Sky Build', email: 'hq@skybuild.io', sector: 'BTP', active: true },
]);

const stats = [
  { label: 'Total Entreprises', value: '12' },
  { label: 'Utilisateurs Actifs', value: '148' },
  { label: 'Demandes Reçues', value: '2' },
];

const searchQuery = ref('');
const filteredCompanies = computed(() => {
  return companies.value.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Actions
const validerDemande = (req) => {
  companies.value.push({ ...req, name: req.entreprise, active: true, sector: 'Nouveau' });
  demandesAttente.value = demandesAttente.value.filter(d => d.id !== req.id);
};

const refuserDemande = (id) => {
  demandesAttente.value = demandesAttente.value.filter(d => d.id !== id);
};

const toggleCompany = (id) => {
  companies.value = companies.value.filter(x => x.id !== id);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>