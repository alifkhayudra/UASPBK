<template>
  <aside class="w-64 bg-white shadow-md h-screen sticky top-0">
    <div class="p-4">
      <h2 class="text-xl font-semibold text-gray-800">Menu</h2>
      <nav class="mt-6">
        <router-link 
          v-for="link in links" 
          :key="link.name"
          :to="link.path"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition"
          active-class="bg-blue-50 text-blue-600"
        >
          <span class="ml-3">{{ link.name }}</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Mahasiswa', path: '/mahasiswa' },
        { name: 'KRS', path: '/krs' },
        { name: 'KHS', path: '/khs' },
        { name: 'Jadwal', path: '/jadwal' },
        { name: 'Mata Kuliah', path: '/matakuliah' },
        { name: 'Laporan', path: '/laporan' }
      ]
    }
  }
}
</script>