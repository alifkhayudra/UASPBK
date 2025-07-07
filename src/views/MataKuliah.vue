<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Mata Kuliah</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Tambah Mata Kuliah
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKS</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(matkul, index) in matkulList" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">{{ matkul.kode }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ matkul.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ matkul.sks }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ matkul.jurusan }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ matkul.semester }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editMatkul(matkul, index)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteMatkul(index)"
                class="text-red-600 hover:text-red-900"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Tambah' : 'Edit' }} Mata Kuliah</h2>
          <form @submit.prevent="showAddModal ? addMatkul() : updateMatkul()">
            <div class="mb-4">
              <label for="matkul-kode" class="block text-gray-700 mb-2">Kode</label>
              <input
                type="text"
                id="matkul-kode"
                v-model="form.kode"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label for="matkul-nama" class="block text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                id="matkul-nama"
                v-model="form.nama"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="matkul-sks" class="block text-gray-700 mb-2">SKS</label>
                <input
                  type="number"
                  id="matkul-sks"
                  v-model="form.sks"
                  min="1"
                  max="6"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="matkul-semester" class="block text-gray-700 mb-2">Semester</label>
                <input
                  type="number"
                  id="matkul-semester"
                  v-model="form.semester"
                  min="1"
                  max="14"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="matkul-jurusan" class="block text-gray-700 mb-2">Jurusan</label>
              <select
                id="matkul-jurusan"
                v-model="form.jurusan"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
                <option value="Teknik Mesin">Teknik Mesin</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matkulList: [
        { kode: 'CS101', nama: 'Algoritma', sks: 3, jurusan: 'Teknik Informatika', semester: 1 },
        { kode: 'CS102', nama: 'Struktur Data', sks: 3, jurusan: 'Teknik Informatika', semester: 2 },
        { kode: 'CS201', nama: 'Basis Data', sks: 4, jurusan: 'Teknik Informatika', semester: 3 }
      ],
      showAddModal: false,
      showEditModal: false,
      form: {
        kode: '',
        nama: '',
        sks: '',
        jurusan: '',
        semester: ''
      },
      editingIndex: null
    }
  },
  methods: {
    addMatkul() {
      this.matkulList.push({ ...this.form })
      this.closeModal()
      this.resetForm()
    },
    editMatkul(matkul, index) {
      this.editingIndex = index
      this.form = { ...matkul }
      this.showEditModal = true
    },
    updateMatkul() {
      this.matkulList.splice(this.editingIndex, 1, { ...this.form })
      this.closeModal()
      this.resetForm()
    },
    deleteMatkul(index) {
      if (confirm('Apakah Anda yakin ingin menghapus mata kuliah ini?')) {
        this.matkulList.splice(index, 1)
      }
    },
    closeModal() {
      this.showAddModal = false
      this.showEditModal = false
      this.resetForm()
    },
    resetForm() {
      this.form = {
        kode: '',
        nama: '',
        sks: '',
        jurusan: '',
        semester: ''
      }
      this.editingIndex = null
    }
  }
}
</script>