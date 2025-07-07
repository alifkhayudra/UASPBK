import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Mahasiswa from '../views/Mahasiswa.vue'
import KRS from '../views/KRS.vue'
import KHS from '../views/KHS.vue'
import Jadwal from '../views/Jadwal.vue'
import Matakuliah from '../views/Matakuliah.vue'
import Laporan from '../views/Laporan.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/mahasiswa', name: 'Mahasiswa', component: Mahasiswa },
  { path: '/krs', name: 'KRS', component: KRS },
  { path: '/khs', name: 'KHS', component: KHS },
  { path: '/jadwal', name: 'Jadwal', component: Jadwal },
  { path: '/matakuliah', name: 'Matakuliah', component: Matakuliah },
  { path: '/laporan', name: 'Laporan', component: Laporan },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router