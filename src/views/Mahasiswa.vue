<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Data Mahasiswa</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Tambah Mahasiswa
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="student in students" :key="student.nim">
            <td class="px-6 py-4 whitespace-nowrap">{{ student.nim }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ student.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ student.jurusan }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ student.semester }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editStudent(student)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteStudent(student.nim)"
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
          <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Tambah' : 'Edit' }} Mahasiswa</h2>
          <form @submit.prevent="showAddModal ? addStudent() : updateStudent()">
            <div class="mb-4">
              <label for="nim" class="block text-gray-700 mb-2">NIM</label>
              <input
                type="text"
                id="nim"
                v-model="form.nim"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                :disabled="showEditModal"
              />
            </div>
            <div class="mb-4">
              <label for="nama" class="block text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                id="nama"
                v-model="form.nama"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label for="jurusan" class="block text-gray-700 mb-2">Jurusan</label>
              <select
                id="jurusan"
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
            <div class="mb-4">
              <label for="semester" class="block text-gray-700 mb-2">Semester</label>
              <input
                type="number"
                id="semester"
                v-model="form.semester"
                min="1"
                max="14"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
      students: [
        { nim: '20101101', nama: 'John Doe', jurusan: 'Teknik Informatika', semester: 5 },
        { nim: '20101102', nama: 'Jane Smith', jurusan: 'Sistem Informasi', semester: 4 },
        { nim: '20101103', nama: 'Bob Johnson', jurusan: 'Teknik Elektro', semester: 6 }
      ],
      showAddModal: false,
      showEditModal: false,
      form: {
        nim: '',
        nama: '',
        jurusan: '',
        semester: ''
      },
      editingIndex: null
    }
  },
  methods: {
    addStudent() {
      this.students.push({ ...this.form })
      this.closeModal()
      this.resetForm()
    },
    editStudent(student) {
      this.editingIndex = this.students.findIndex(s => s.nim === student.nim)
      this.form = { ...student }
      this.showEditModal = true
    },
    updateStudent() {
      this.students.splice(this.editingIndex, 1, { ...this.form })
      this.closeModal()
      this.resetForm()
    },
    deleteStudent(nim) {
      if (confirm('Apakah Anda yakin ingin menghapus mahasiswa ini?')) {
        this.students = this.students.filter(student => student.nim !== nim)
      }
    },
    closeModal() {
      this.showAddModal = false
      this.showEditModal = false
      this.resetForm()
    },
    resetForm() {
      this.form = {
        nim: '',
        nama: '',
        jurusan: '',
        semester: ''
      }
      this.editingIndex = null
    }
  }
}
</script>