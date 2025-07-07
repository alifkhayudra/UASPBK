<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Laporan</h1>
      <div class="flex space-x-4">
        <button
          @click="generatePDF"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Export PDF
        </button>
        <button
          @click="generateExcel"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Export Excel
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Filter Laporan</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="report-type" class="block text-gray-700 mb-2">Jenis Laporan</label>
          <select
            id="report-type"
            v-model="filter.jenis"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mahasiswa">Data Mahasiswa</option>
            <option value="krs">Kartu Rencana Studi</option>
            <option value="khs">Kartu Hasil Studi</option>
            <option value="matkul">Mata Kuliah</option>
          </select>
        </div>
        <div>
          <label for="report-jurusan" class="block text-gray-700 mb-2">Jurusan</label>
          <select
            id="report-jurusan"
            v-model="filter.jurusan"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Jurusan</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Teknik Elektro">Teknik Elektro</option>
          </select>
        </div>
        <div>
          <label for="report-semester" class="block text-gray-700 mb-2">Semester</label>
          <select
            id="report-semester"
            v-model="filter.semester"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Semester</option>
            <option v-for="i in 14" :value="i" :key="i">Semester {{ i }}</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="applyFilter"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div v-if="filteredData.length === 0" class="p-6 text-center text-gray-500">
        Tidak ada data yang ditemukan
      </div>
      
      <!-- Mahasiswa Report -->
      <table v-if="filter.jenis === 'mahasiswa' && filteredData.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredData" :key="item.nim">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nim }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.jurusan }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.semester }}</td>
          </tr>
        </tbody>
      </table>

      <!-- KRS Report -->
      <table v-if="filter.jenis === 'krs' && filteredData.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Kuliah</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredData" :key="item.nim + item.semester">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nim }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.semester }}</td>
            <td class="px-6 py-4">
              <div v-for="matkul in item.mataKuliah" :key="matkul.kode">
                {{ matkul.kode }} - {{ matkul.nama }} ({{ matkul.sks }} SKS)
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.status }}</td>
          </tr>
        </tbody>
      </table>

      <!-- KHS Report -->
      <table v-if="filter.jenis === 'khs' && filteredData.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Semester</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredData" :key="item.nim + item.semester">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nim }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.semester }}</td>
            <td class="px-6 py-4 whitespace-nowrap font-bold">{{ item.ipSemester }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Mata Kuliah Report -->
      <table v-if="filter.jenis === 'matkul' && filteredData.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKS</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredData" :key="item.kode">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.kode }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.sks }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.jurusan }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.semester }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        jenis: 'mahasiswa',
        jurusan: '',
        semester: ''
      },
      filteredData: [],
      sampleMahasiswa: [
        { nim: '20101101', nama: 'John Doe', jurusan: 'Teknik Informatika', semester: 5 },
        { nim: '20101102', nama: 'Jane Smith', jurusan: 'Sistem Informasi', semester: 4 },
        { nim: '20101103', nama: 'Bob Johnson', jurusan: 'Teknik Elektro', semester: 6 }
      ],
      sampleKRS: [
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
      sampleKHS: [
        {
          nim: '20101101',
          nama: 'John Doe',
          semester: 5,
          ipSemester: 3.75
        },
        {
          nim: '20101102',
          nama: 'Jane Smith',
          semester: 4,
          ipSemester: 3.25
        }
      ],
      sampleMatkul: [
        { kode: 'CS101', nama: 'Algoritma', sks: 3, jurusan: 'Teknik Informatika', semester: 1 },
        { kode: 'CS102', nama: 'Struktur Data', sks: 3, jurusan: 'Teknik Informatika', semester: 2 },
        { kode: 'CS201', nama: 'Basis Data', sks: 4, jurusan: 'Teknik Informatika', semester: 3 }
      ]
    }
  },
  created() {
    this.applyFilter()
  },
  methods: {
    applyFilter() {
      let data = []
      
      switch (this.filter.jenis) {
        case 'mahasiswa':
          data = [...this.sampleMahasiswa]
          break
        case 'krs':
          data = [...this.sampleKRS]
          break
        case 'khs':
          data = [...this.sampleKHS]
          break
        case 'matkul':
          data = [...this.sampleMatkul]
          break
      }
      
      // Apply jurusan filter
      if (this.filter.jurusan) {
        data = data.filter(item => item.jurusan === this.filter.jurusan)
      }
      
      // Apply semester filter
      if (this.filter.semester) {
        data = data.filter(item => item.semester == this.filter.semester)
      }
      
      this.filteredData = data
    },
    generatePDF() {
      alert('Fungsi export PDF akan diimplementasikan di sini')
      // Implementasi nyata akan menggunakan library seperti jsPDF
    },
    generateExcel() {
      alert('Fungsi export Excel akan diimplementasikan di sini')
      // Implementasi nyata akan menggunakan library seperti xlsx
    }
  }
}
</script>