<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Jadwal Kuliah</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Tambah Jadwal
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Kuliah</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosen</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruangan</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(jadwal, index) in jadwalList" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">{{ jadwal.kode }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ jadwal.mataKuliah }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ jadwal.dosen }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ jadwal.hari }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ jadwal.jamMulai }} - {{ jadwal.jamSelesai }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ jadwal.ruangan }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editJadwal(jadwal, index)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteJadwal(index)"
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
          <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Tambah' : 'Edit' }} Jadwal</h2>
          <form @submit.prevent="showAddModal ? addJadwal() : updateJadwal()">
            <div class="mb-4">
              <label for="jadwal-kode" class="block text-gray-700 mb-2">Kode</label>
              <input
                type="text"
                id="jadwal-kode"
                v-model="form.kode"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label for="jadwal-matkul" class="block text-gray-700 mb-2">Mata Kuliah</label>
              <select
                id="jadwal-matkul"
                v-model="form.mataKuliah"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option v-for="mk in mataKuliahOptions" :value="mk.nama" :key="mk.kode">
                  {{ mk.kode }} - {{ mk.nama }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label for="jadwal-dosen" class="block text-gray-700 mb-2">Dosen</label>
              <input
                type="text"
                id="jadwal-dosen"
                v-model="form.dosen"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="jadwal-hari" class="block text-gray-700 mb-2">Hari</label>
                <select
                  id="jadwal-hari"
                  v-model="form.hari"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="jadwal-ruangan" class="block text-gray-700 mb-2">Ruangan</label>
                <input
                  type="text"
                  id="jadwal-ruangan"
                  v-model="form.ruangan"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="jadwal-jam-mulai" class="block text-gray-700 mb-2">Jam Mulai</label>
                <input
                  type="time"
                  id="jadwal-jam-mulai"
                  v-model="form.jamMulai"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="jadwal-jam-selesai" class="block text-gray-700 mb-2">Jam Selesai</label>
                <input
                  type="time"
                  id="jadwal-jam-selesai"
                  v-model="form.jamSelesai"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
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
      jadwalList: [
        {
          kode: 'CS101-A',
          mataKuliah: 'Algoritma',
          dosen: 'Dr. Ahmad Santoso',
          hari: 'Senin',
          jamMulai: '08:00',
          jamSelesai: '10:00',
          ruangan: 'A101'
        },
        {
          kode: 'CS102-B',
          mataKuliah: 'Struktur Data',
          dosen: 'Prof. Budi Raharjo',
          hari: 'Rabu',
          jamMulai: '13:00',
          jamSelesai: '15:00',
          ruangan: 'B202'
        }
      ],
      mataKuliahOptions: [
        { kode: 'CS101', nama: 'Algoritma' },
        { kode: 'CS102', nama: 'Struktur Data' },
        { kode: 'CS201', nama: 'Basis Data' },
        { kode: 'CS202', nama: 'Jaringan Komputer' },
        { kode: 'CS301', nama: 'Pemrograman Web' }
      ],
      showAddModal: false,
      showEditModal: false,
      form: {
        kode: '',
        mataKuliah: '',
        dosen: '',
        hari: '',
        jamMulai: '',
        jamSelesai: '',
        ruangan: ''
      },
      editingIndex: null
    }
  },
  methods: {
    addJadwal() {
      this.jadwalList.push({ ...this.form })
      this.closeModal()
      this.resetForm()
    },
    editJadwal(jadwal, index) {
      this.editingIndex = index
      this.form = { ...jadwal }
      this.showEditModal = true
    },
    updateJadwal() {
      this.jadwalList.splice(this.editingIndex, 1, { ...this.form })
      this.closeModal()
      this.resetForm()
    },
    deleteJadwal(index) {
      if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
        this.jadwalList.splice(index, 1)
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
        mataKuliah: '',
        dosen: '',
        hari: '',
        jamMulai: '',
        jamSelesai: '',
        ruangan: ''
      }
      this.editingIndex = null
    }
  }
}
</script>