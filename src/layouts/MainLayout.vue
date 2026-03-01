<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main-layout">
    <header>
      <div class="logo">AppTest</div>
      <nav>
        <RouterLink to="/admin">Admin</RouterLink>
        <RouterLink to="/entreprise">Entreprise</RouterLink>
        <RouterLink to="/formateur">Formateur</RouterLink>
        <RouterLink to="/recruteur">Recruteur</RouterLink>
        <RouterLink to="/candidat">Candidat</RouterLink>
      </nav>
      <div class="user-actions">
        <RouterLink to="/auth">Déconnexion</RouterLink>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #42b983;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover, nav a.router-link-active {
  color: #42b983;
}

.user-actions a {
  text-decoration: none;
  color: #6c757d;
  font-size: 0.9rem;
}

main {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 70px);
}
</style>
