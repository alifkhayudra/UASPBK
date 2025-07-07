<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
    <router-link
      to="/"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Kembali ke Beranda
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>