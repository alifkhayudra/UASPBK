<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Kartu Rencana Studi</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Tambah KRS
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Kuliah</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(krs, index) in krsList" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">{{ krs.nim }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ krs.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ krs.semester }}</td>
            <td class="px-6 py-4">
              <div v-for="matkul in krs.mataKuliah" :key="matkul.kode">
                {{ matkul.kode }} - {{ matkul.nama }} ({{ matkul.sks }} SKS)
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{
                'px-2 py-1 rounded-full text-xs': true,
                'bg-green-100 text-green-800': krs.status === 'Disetujui',
                'bg-yellow-100 text-yellow-800': krs.status === 'Pending',
                'bg-red-100 text-red-800': krs.status === 'Ditolak'
              }">
                {{ krs.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editKRS(krs, index)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteKRS(index)"
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
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Tambah' : 'Edit' }} KRS</h2>
          <form @submit.prevent="showAddModal ? addKRS() : updateKRS()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="krs-nim" class="block text-gray-700 mb-2">NIM</label>
                <input
                  type="text"
                  id="krs-nim"
                  v-model="form.nim"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="krs-nama" class="block text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  id="krs-nama"
                  v-model="form.nama"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="krs-semester" class="block text-gray-700 mb-2">Semester</label>
                <input
                  type="number"
                  id="krs-semester"
                  v-model="form.semester"
                  min="1"
                  max="14"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="krs-status" class="block text-gray-700 mb-2">Status</label>
                <select
                  id="krs-status"
                  v-model="form.status"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Disetujui">Disetujui</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Mata Kuliah</label>
              <div v-for="(matkul, index) in form.mataKuliah" :key="index" class="flex items-center mb-2">
                <select
                  v-model="matkul.kode"
                  class="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                  required
                >
                  <option v-for="mk in mataKuliahOptions" :value="mk.kode" :key="mk.kode">
                    {{ mk.kode }} - {{ mk.nama }}
                  </option>
                </select>
                <input
                  type="number"
                  v-model="matkul.sks"
                  min="1"
                  max="6"
                  class="w-1/6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                  placeholder="SKS"
                  required
                />
                <button
                  type="button"
                  @click="removeMatkul(index)"
                  class="text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </div>
              <button
                type="button"
                @click="addMatkul"
                class="text-blue-600 hover:text-blue-900 text-sm"
              >
                + Tambah Mata Kuliah
              </button>
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
      krsList: [
        {
          nim: '20101101',
          nama: 'John Doe',
          semester: 5,
          mataKuliah: [
            { kode: 'CS101', nama: 'Algoritma', sks: 3 },
            { kode: 'CS102', nama: 'Struktur Data', sks: 3 }
          ],
          status: 'Disetujui'
        },
        {
          nim: '20101102',
          nama: 'Jane Smith',
          semester: 4,
          mataKuliah: [
            { kode: 'CS201', nama: 'Basis Data', sks: 4 }
          ],
          status: 'Pending'
        }
      ],
      mataKuliahOptions: [
        { kode: 'CS101', nama: 'Algoritma', sks: 3 },
        { kode: 'CS102', nama: 'Struktur Data', sks: 3 },
        { kode: 'CS201', nama: 'Basis Data', sks: 4 },
        { kode: 'CS202', nama: 'Jaringan Komputer', sks: 3 },
        { kode: 'CS301', nama: 'Pemrograman Web', sks: 3 }
      ],
      showAddModal: false,
      showEditModal: false,
      form: {
        nim: '',
        nama: '',
        semester: '',
        status: 'Pending',
        mataKuliah: [{ kode: '', sks: '' }]
      },
      editingIndex: null
    }
  },
  methods: {
    addKRS() {
      this.krsList.push({ ...this.form })
      this.closeModal()
      this.resetForm()
    },
    editKRS(krs, index) {
      this.editingIndex = index
      this.form = JSON.parse(JSON.stringify(krs))
      this.showEditModal = true
    },
    updateKRS() {
      this.krsList.splice(this.editingIndex, 1, { ...this.form })
      this.closeModal()
      this.resetForm()
    },
    deleteKRS(index) {
      if (confirm('Apakah Anda yakin ingin menghapus KRS ini?')) {
        this.krsList.splice(index, 1)
      }
    },
    addMatkul() {
      this.form.mataKuliah.push({ kode: '', sks: '' })
    },
    removeMatkul(index) {
      this.form.mataKuliah.splice(index, 1)
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
        semester: '',
        status: 'Pending',
        mataKuliah: [{ kode: '', sks: '' }]
      }
      this.editingIndex = null
    }
  }
}
</script>