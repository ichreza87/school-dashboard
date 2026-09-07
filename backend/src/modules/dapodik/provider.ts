// Abstraction for Dapodik integration - never mock legitimate endpoints
export interface School {
  npsn: string;
  name: string;
  address?: string;
  province?: string;
  regency?: string;
}
export interface DapodikStudent {
  nisn?: string;
  nis?: string;
  nik?: string;
  fullName: string;
  gender: string;
  birthPlace?: string;
  birthDate?: string;
  rombel?: string;
}
export interface DapodikTeacher {
  nuptk?: string;
  nip?: string;
  nik?: string;
  name: string;
  gender?: string;
  employmentStatus?: string;
}
export interface DapodikRombel {
  name: string;
  level: string;
  academicYear: string;
  semester: string;
  capacity?: number;
}
export interface DapodikSubject {
  code: string;
  name: string;
  group?: string;
}
export interface SyncResult {
  success: boolean;
  total: number;
  newRecords: number;
  updated: number;
  conflicts: number;
  errors: number;
  durationMs: number;
}

export interface DapodikProvider {
  connect(): Promise<void>;
  authenticate(): Promise<void>;
  getSchool(): Promise<School>;
  getStudents(): Promise<DapodikStudent[]>;
  getTeachers(): Promise<DapodikTeacher[]>;
  getRombels(): Promise<DapodikRombel[]>;
  getSubjects(): Promise<DapodikSubject[]>;
  getDataVersion(): Promise<string>;
  sync(): Promise<SyncResult>;
  disconnect(): Promise<void>;
}

// ── Mock Provider for Development ─────────────────────────────
export class MockDapodikProvider implements DapodikProvider {
  private connected = false;
  async connect() { this.connected = true; }
  async authenticate() { if (!this.connected) throw new Error('Not connected'); }
  async getSchool(): Promise<School> {
    return { npsn: '20200001', name: 'SD Negeri Contoh 01', address: 'Jl. Pendidikan No.1', province: 'Jawa Barat', regency: 'Bandung' };
  }
  async getStudents(): Promise<DapodikStudent[]> {
    return Array.from({ length: 10 }, (_, i) => ({
      nisn: `00${String(1000000000 + i).slice(-7)}`,
      nis: `NIS${1000 + i}`,
      fullName: `Siswa Mock ${i + 1}`,
      gender: i % 2 === 0 ? 'L' : 'P',
      rombel: i < 5 ? '5A' : '5B',
    }));
  }
  async getTeachers(): Promise<DapodikTeacher[]> {
    return [
      { nuptk: '1234567890123456', nip: '198001012005011001', name: 'Budi Santoso', gender: 'L' },
      { nuptk: '1234567890123457', nip: '198205152008012002', name: 'Siti Aminah', gender: 'P' },
    ];
  }
  async getRombels(): Promise<DapodikRombel[]> {
    return [{ name: '5A', level: '5', academicYear: '2025/2026', semester: 'Ganjil', capacity: 32 }];
  }
  async getSubjects(): Promise<DapodikSubject[]> {
    return [{ code: 'MTK', name: 'Matematika', group: 'A' }, { code: 'BIN', name: 'Bahasa Indonesia', group: 'A' }];
  }
  async getDataVersion() { return `mock-${Date.now()}`; }
  async sync(): Promise<SyncResult> {
    return { success: true, total: 22, newRecords: 2, updated: 1, conflicts: 0, errors: 0, durationMs: 1234 };
  }
  async disconnect() { this.connected = false; }
}

export function createDapodikProvider(type: string = 'mock'): DapodikProvider {
  if (type === 'mock') return new MockDapodikProvider();
  throw new Error(`Provider ${type} belum diimplementasikan. Gunakan provider resmi Dapodik sesuai mekanisme autentikasi yang tersedia.`);
}
