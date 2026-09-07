import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

const firstNames = ['Ahmad','Budi','Siti','Dewi','Rudi','Lina','Fajar','Nisa','Eko','Rina','Agus','Maya','Hendra','Indah','Joko','Putri','Andi','Sari','Doni','Tari'];
const lastNames = ['Santoso','Wijaya','Pratama','Susanti','Kurniawan','Lestari','Saputra','Anggraini','Setiawan','Permata','Hartono','Utami','Nugroho','Puspita','Hidayat','Safitri'];

function randName(i:number){ return `${firstNames[i%firstNames.length]} ${lastNames[i%lastNames.length]}`; }

async function main(){
  console.log('Seeding...');
  const pwd = await bcrypt.hash('admin123',10);
  await prisma.user.upsert({ where:{username:'admin'}, update:{}, create:{username:'admin', password:pwd, name:'Administrator', role:'SUPER_ADMIN'}});
  await prisma.user.upsert({ where:{username:'operator'}, update:{}, create:{username:'operator', password:pwd, name:'Operator Sekolah', role:'OPERATOR'}});
  await prisma.user.upsert({ where:{username:'kepsek'}, update:{}, create:{username:'kepsek', password:pwd, name:'Kepala Sekolah', role:'KEPALA_SEKOLAH'}});
  await prisma.user.upsert({ where:{username:'guru'}, update:{}, create:{username:'guru', password:pwd, name:'Guru Demo', role:'GURU'}});

  await prisma.school.upsert({ where:{npsn:'20200001'}, update:{}, create:{ npsn:'20200001', name:'SD Negeri Contoh 01', address:'Jl. Pendidikan No.1', village:'Cibiru', district:'Cileunyi', regency:'Bandung', province:'Jawa Barat', phone:'022-123456', principal:'Drs. H. Sutisna, M.Pd' }});

  const ay = await prisma.academicYear.upsert({ where:{name:'2025/2026'}, update:{}, create:{name:'2025/2026', isActive:true}});
  await prisma.semester.upsert({ where:{ academicYearId_name:{academicYearId: ay.id, name:'Ganjil'}}, update:{}, create:{academicYearId: ay.id, name:'Ganjil', isActive:true}});
  await prisma.semester.upsert({ where:{ academicYearId_name:{academicYearId: ay.id, name:'Genap'}}, update:{}, create:{academicYearId: ay.id, name:'Genap'}});

  const subjects = [
    {code:'BIN', name:'Bahasa Indonesia', group:'A'}, {code:'MTK', name:'Matematika', group:'A'}, {code:'IPA', name:'Ilmu Pengetahuan Alam', group:'A'},
    {code:'IPS', name:'Ilmu Pengetahuan Sosial', group:'A'}, {code:'PPKN', name:'PPKn', group:'A'}, {code:'SBDP', name:'Seni Budaya', group:'B'},
    {code:'PJOK', name:'PJOK', group:'B'}, {code:'PAI', name:'Pendidikan Agama Islam', group:'A'}, {code:'BING', name:'Bahasa Inggris', group:'A'}, {code:'TIK', name:'Informatika', group:'B'},
  ];
  for(const s of subjects) await prisma.subject.upsert({ where:{code:s.code}, update:{}, create: s as any });

  const rombelNames = ['1A','1B','2A','2B','3A','3B','4A','4B','5A','5B','6A','6B'];
  const rombels: any[]=[]; for(const n of rombelNames.slice(0,6)){ const r=await prisma.rombel.upsert({ where:{ academicYear_semester_name:{academicYear:'2025/2026', semester:'Ganjil', name:n}}, update:{}, create:{academicYear:'2025/2026', semester:'Ganjil', level: n[0], name:n, capacity:32, room:`R-${n}`}}); rombels.push(r); }

  // Teachers 20
  for(let i=0;i<20;i++){
    const name=randName(i)+' Guru';
    await prisma.teacher.upsert({ where:{ nuptk: String(1000000000000000+i)}, update:{}, create:{ nuptk: String(1000000000000000+i), nip: `19800${String(i).padStart(2,'0')}01${String(20050101+i).padStart(8,'0')}`, nik: `32010000000000${String(i).padStart(2,'0')}`, name, gender: i%2===0?'L':'P', employmentStatus: ['PNS','PPPK','Honorer'][i%3], lastEducation:'S1', studyProgram:'PGSD', certification: i%3===0, subject: subjects[i%subjects.length].name, teachingHours: 24, isActive:true }});
  }

  // Students 100
  for(let i=0;i<100;i++){
    const fullName = randName(i) + (i>19? ` ${i}`:'');
    const rombel = rombels[i%rombels.length];
    await prisma.student.upsert({ where:{ nisn: String(1000000000+i)}, update:{}, create:{
      nis: `00${String(1000+i).padStart(4,'0')}`, nisn: String(1000000000+i), nik:`3201${String(100000000000+i).padStart(12,'0')}`, fullName, gender: i%2===0?'L':'P', birthPlace:'Bandung', birthDate: new Date(2014, i%12, (i%28)+1), religion:'Islam', address:`Jl. Melati No.${i+1}`, village:'Cibiru', district:'Cileunyi', regency:'Bandung', province:'Jawa Barat', fatherName: `Ayah ${fullName}`, motherName:`Ibu ${fullName}`, rombelId: rombel.id, enrollYear:2023, status:'Aktif'
    }});
  }

  // Attendance & grades sample
  const students = await prisma.student.findMany({ take: 20 });
  const today = new Date();
  for(const s of students){
    await prisma.studentAttendance.create({ data:{ studentId: s.id, date: today, status: Math.random()>0.1?'Hadir':'Sakit'}});
    for(const subj of subjects.slice(0,3)){
      const subjRec = await prisma.subject.findUnique({ where:{code: subj.code }});
      await prisma.studentGrade.create({ data:{ studentId: s.id, subjectId: subjRec?.id, semester:'Ganjil', score: 70+ Math.floor(Math.random()*25), grade:'B'}});
    }
  }

  // Report templates
  await prisma.reportTemplate.upsert({ where:{name:'R7 Standar'}, update:{}, create:{name:'R7 Standar', entity:'Teacher', columns: JSON.stringify([{key:'name',label:'Nama',order:1,visible:true},{key:'nip',label:'NIP',order:2,visible:true},{key:'nuptk',label:'NUPTK',order:3,visible:true},{key:'employmentStatus',label:'Status',order:4,visible:true}])}});
  await prisma.reportTemplate.upsert({ where:{name:'R10 Standar'}, update:{}, create:{name:'R10 Standar', entity:'Teacher', columns: JSON.stringify([{key:'name',label:'Nama',order:1,visible:true},{key:'group',label:'Golongan',order:2,visible:true},{key:'lastEducation',label:'Pendidikan',order:3,visible:true}])}});

  console.log('Seed done: 1 sekolah, 100 siswa, 20 guru, 6 rombel, 10 mapel');
}
main().catch(e=>{console.error(e); process.exit(1)}).finally(()=>prisma.$disconnect());
