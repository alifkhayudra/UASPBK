<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Kartu Hasil Studi</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Tambah KHS
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(khs, index) in khsList" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">{{ khs.nim }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ khs.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ khs.semester }}</td>
            <td class="px-6 py-4 whitespace-nowrap font-bold">{{ khs.ipSemester }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="viewDetail(khs)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Detail
              </button>
              <button
                @click="editKHS(khs, index)"
                class="text-green-600 hover:text-green-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteKHS(index)"
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
          <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Tambah' : 'Edit' }} KHS</h2>
          <form @submit.prevent="showAddModal ? addKHS() : updateKHS()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="khs-nim" class="block text-gray-700 mb-2">NIM</label>
                <input
                  type="text"
                  id="khs-nim"
                  v-model="form.nim"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="khs-nama" class="block text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  id="khs-nama"
                  v-model="form.nama"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="khs-semester" class="block text-gray-700 mb-2">Semester</label>
                <input
                  type="number"
                  id="khs-semester"
                  v-model="form.semester"
                  min="1"
                  max="14"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="khs-ip" class="block text-gray-700 mb-2">IP Semester</label>
                <input
                  type="number"
                  id="khs-ip"
                  v-model="form.ipSemester"
                  step="0.01"
                  min="0"
                  max="4"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Detail Nilai</label>
              <div v-for="(nilai, index) in form.detailNilai" :key="index" class="flex items-center mb-2">
                <select
                  v-model="nilai.kodeMatkul"
                  class="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                  required
                >
                  <option v-for="mk in mataKuliahOptions" :value="mk.kode" :key="mk.kode">
                    {{ mk.kode }} - {{ mk.nama }}
                  </option>
                </select>
                <select
                  v-model="nilai.nilaiHuruf"
                  class="w-1/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                  required
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
                <input
                  type="number"
                  v-model="nilai.sks"
                  min="1"
                  max="6"
                  class="w-1/6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                  placeholder="SKS"
                  required
                />
                <button
                  type="button"
                  @click="removeNilai(index)"
                  class="text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </div>
              <button
                type="button"
                @click="addNilai"
                class="text-blue-600 hover:text-blue-900 text-sm"
              >
                + Tambah Nilai
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

    <!-- Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Detail KHS - {{ detailData.nim }}</h2>
          <div class="mb-6">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-gray-600">Nama</p>
                <p class="font-semibold">{{ detailData.nama }}</p>
              </div>
              <div>
                <p class="text-gray-600">Semester</p>
                <p class="font-semibold">{{ detailData.semester }}</p>
              </div>
              <div>
                <p class="text-gray-600">IP Semester</p>
                <p class="font-semibold">{{ detailData.ipSemester }}</p>
              </div>
            </div>

            <h3 class="text-lg font-semibold mb-2">Detail Nilai</h3>
            <table class="min-w-full bg-white">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-2 px-4 text-left">Mata Kuliah</th>
                  <th class="py-2 px-4 text-left">Nilai</th>
                  <th class="py-2 px-4 text-left">SKS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(nilai, index) in detailData.detailNilai" :key="index" class="border-b">
                  <td class="py-2 px-4">{{ getMatkulName(nilai.kodeMatkul) }}</td>
                  <td class="py-2 px-4">{{ nilai.nilaiHuruf }}</td>
                  <td class="py-2 px-4">{{ nilai.sks }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-end">
            <button
              @click="showDetailModal = false"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      khsList: [
        {
          nim: '20101101',
          nama: 'John Doe',
          semester: 5,
          ipSemester: 3.75,
          detailNilai: [
            { kodeMatkul: 'CS101', nilaiHuruf: 'A', sks: 3 },
            { kodeMatkul: 'CS102', nilaiHuruf: 'B', sks: 3 }
          ]
        },
        {
          nim: '20101102',
          nama: 'Jane Smith',
          semester: 4,
          ipSemester: 3.25,
          detailNilai: [
            { kodeMatkul: 'CS201', nilaiHuruf: 'A', sks: 4 }
          ]
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
      showDetailModal: false,
      form: {
        nim: '',
        nama: '',
        semester: '',
        ipSemester: '',
        detailNilai: [{ kodeMatkul: '', nilaiHuruf: '', sks: '' }]
      },
      detailData: {},
      editingIndex: null
    }
  },
  methods: {
    addKHS() {
      this.khsList.push({ ...this.form })
      this.closeModal()
      this.resetForm()
    },
    editKHS(khs, index) {
      this.editingIndex = index
      this.form = JSON.parse(JSON.stringify(khs))
      this.showEditModal = true
    },
    updateKHS() {
      this.khsList.splice(this.editingIndex, 1, { ...this.form })
      this.closeModal()
      this.resetForm()
    },
    deleteKHS(index) {
      if (confirm('Apakah Anda yakin ingin menghapus KHS ini?')) {
        this.khsList.splice(index, 1)
      }
    },
    viewDetail(khs) {
      this.detailData = JSON.parse(JSON.stringify(khs))
      this.showDetailModal = true
    },
    addNilai() {
      this.form.detailNilai.push({ kodeMatkul: '', nilaiHuruf: '', sks: '' })
    },
    removeNilai(index) {
      this.form.detailNilai.splice(index, 1)
    },
    getMatkulName(kode) {
      const matkul = this.mataKuliahOptions.find(mk => mk.kode === kode)
      return matkul ? `${kode} - ${matkul.nama}` : kode
    },
    closeModal() {
      this.showAddModal = false
      this.showEditModal = false
      this.showDetailModal = false
      this.resetForm()
    },
    resetForm() {
      this.form = {
        nim: '',
        nama: '',
        semester: '',
        ipSemester: '',
        detailNilai: [{ kodeMatkul: '', nilaiHuruf: '', sks: '' }]
      }
      this.editingIndex = null
    }
  }
}
</script>