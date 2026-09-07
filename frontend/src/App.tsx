import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Students from './pages/Students';
import SiswaDetail from './pages/SiswaDetail';
import Teachers from './pages/Teachers';
import Rombel from './pages/Rombel';
import Mapel from './pages/Mapel';
import Jadwal from './pages/Jadwal';
import KehadiranSiswa from './pages/KehadiranSiswa';
import KehadiranGuru from './pages/KehadiranGuru';
import Nilai from './pages/Nilai';
import Perkembangan from './pages/Perkembangan';
import Analytics from './pages/Analytics';
import Laporan from './pages/Laporan';
import Dapodik from './pages/Dapodik';
import Sinkronisasi from './pages/Sinkronisasi';
import Backup from './pages/Backup';
import Audit from './pages/Audit';
import Pengguna from './pages/Pengguna';
import Pengaturan from './pages/Pengaturan';
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
        <Route path="/siswa/:id" element={<Protected><SiswaDetail /></Protected>} />
        <Route path="/guru" element={<Protected><Teachers /></Protected>} />
        <Route path="/rombel" element={<Protected><Rombel /></Protected>} />
        <Route path="/mapel" element={<Protected><Mapel /></Protected>} />
        <Route path="/jadwal" element={<Protected><Jadwal /></Protected>} />
        <Route path="/kehadiran-siswa" element={<Protected><KehadiranSiswa /></Protected>} />
        <Route path="/kehadiran-guru" element={<Protected><KehadiranGuru /></Protected>} />
        <Route path="/nilai" element={<Protected><Nilai /></Protected>} />
        <Route path="/perkembangan" element={<Protected><Perkembangan /></Protected>} />
        <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
        <Route path="/laporan" element={<Protected><Laporan /></Protected>} />
        <Route path="/dapodik" element={<Protected><Dapodik /></Protected>} />
        <Route path="/sinkronisasi" element={<Protected><Sinkronisasi /></Protected>} />
        <Route path="/backup" element={<Protected><Backup /></Protected>} />
        <Route path="/pengguna" element={<Protected><Pengguna /></Protected>} />
        <Route path="/pengaturan" element={<Protected><Pengaturan /></Protected>} />
        <Route path="/audit" element={<Protected><Audit /></Protected>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
