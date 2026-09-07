import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Rombel from './pages/Rombel';
import Dapodik from './pages/Dapodik';
import Generic from './pages/Generic';
import { getToken } from './lib/api';

function Protected({ children }: { children: React.ReactNode }) {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/siswa" element={<Protected><Students /></Protected>} />
        <Route path="/guru" element={<Protected><Teachers /></Protected>} />
        <Route path="/rombel" element={<Protected><Rombel /></Protected>} />
        <Route path="/mapel" element={<Protected><Generic title="Mata Pelajaran" desc="Kelola mata pelajaran, kelompok, dan guru pengampu." /></Protected>} />
        <Route path="/jadwal" element={<Protected><Generic title="Jadwal Sekolah" desc="Jadwal guru/kelas/ruang dengan deteksi konflik otomatis." /></Protected>} />
        <Route path="/kehadiran-siswa" element={<Protected><Generic title="Kehadiran Siswa" desc="Presensi harian, massal, rekap mingguan/bulanan, alert <90%." /></Protected>} />
        <Route path="/kehadiran-guru" element={<Protected><Generic title="Kehadiran Guru" desc="Hadir/Sakit/Izin/Cuti/Dinas Luar/Alpa/Terlambat." /></Protected>} />
        <Route path="/nilai" element={<Protected><Generic title="Nilai Siswa" desc="Tugas, Ulangan, Formatif, Sumatif, UTS, UAS — formula configurable." /></Protected>} />
        <Route path="/perkembangan" element={<Protected><Generic title="Perkembangan Siswa" desc="Grafik individual per semester dengan trend MENINGKAT/MENURUN." /></Protected>} />
        <Route path="/analytics" element={<Protected><Generic title="Analytics Sekolah" desc="Perbandingan kelas, tren nilai & kehadiran, grafik interaktif." /></Protected>} />
        <Route path="/laporan" element={<Protected><Generic title="Report Center" desc="Siswa, Guru (R7/R10 configurable), Kehadiran, Nilai, Dapodik — export PDF/Excel/CSV." /></Protected>} />
        <Route path="/dapodik" element={<Protected><Dapodik /></Protected>} />
        <Route path="/sinkronisasi" element={<Protected><Generic title="Sinkronisasi" desc="LOCAL → COMPARE → REMOTE → DIFF ENGINE → CONFLICT DETECTION → USER CONFIRMATION → SYNC" /></Protected>} />
        <Route path="/backup" element={<Protected><Generic title="Backup Center" desc="Backup manual/scheduled, restore, checksum, verification, rollback." /></Protected>} />
        <Route path="/pengguna" element={<Protected><Generic title="Pengguna & Role" desc="SUPER_ADMIN, ADMIN_SEKOLAH, OPERATOR, KEPALA_SEKOLAH, GURU, WALI_KELAS, TU — permission configurable." /></Protected>} />
        <Route path="/pengaturan" element={<Protected><Generic title="Pengaturan" desc="Threshold kehadiran, tahun ajaran, semester, formula nilai." /></Protected>} />
        <Route path="/audit" element={<Protected><Generic title="Audit Log" desc="Login, CRUD, Import/Export, Sinkronisasi, Backup/Restore — lengkap." /></Protected>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
