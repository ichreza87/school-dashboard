-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "ip" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "npsn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "village" TEXT,
    "district" TEXT,
    "regency" TEXT,
    "province" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "principal" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academicYearId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Semester_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nis" TEXT,
    "nisn" TEXT,
    "nik" TEXT,
    "fullName" TEXT NOT NULL,
    "nickName" TEXT,
    "gender" TEXT NOT NULL,
    "birthPlace" TEXT,
    "birthDate" DATETIME,
    "religion" TEXT,
    "address" TEXT,
    "village" TEXT,
    "district" TEXT,
    "regency" TEXT,
    "province" TEXT,
    "kkNumber" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "guardianName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "rombelId" TEXT,
    "enrollYear" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Student_rombelId_fkey" FOREIGN KEY ("rombelId") REFERENCES "Rombel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "author" TEXT,
    "category" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentNote_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT,
    "date" DATETIME,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Achievement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nip" TEXT,
    "nuptk" TEXT,
    "nik" TEXT,
    "name" TEXT NOT NULL,
    "prefixTitle" TEXT,
    "suffixTitle" TEXT,
    "gender" TEXT,
    "birthPlace" TEXT,
    "birthDate" DATETIME,
    "employmentStatus" TEXT,
    "ptkType" TEXT,
    "position" TEXT,
    "rank" TEXT,
    "group" TEXT,
    "lastEducation" TEXT,
    "studyProgram" TEXT,
    "certification" BOOLEAN NOT NULL DEFAULT false,
    "certificateNo" TEXT,
    "subject" TEXT,
    "teachingHours" INTEGER NOT NULL DEFAULT 0,
    "additionalTask" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeacherEducation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "major" TEXT,
    "institution" TEXT,
    "year" INTEGER,
    CONSTRAINT "TeacherEducation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeacherPosition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    CONSTRAINT "TeacherPosition_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeacherCertification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT,
    "year" INTEGER,
    CONSTRAINT "TeacherCertification_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rombel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academicYear" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homeroomId" TEXT,
    "room" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 32,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" TEXT,
    "level" TEXT,
    "teacherId" TEXT,
    "hours" INTEGER NOT NULL DEFAULT 2,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rombelId" TEXT NOT NULL,
    "subjectId" TEXT,
    "teacherId" TEXT,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "room" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Schedule_rombelId_fkey" FOREIGN KEY ("rombelId") REFERENCES "Rombel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Schedule_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeacherAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "subjectId" TEXT,
    "rombelId" TEXT,
    "hours" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "TeacherAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentAttendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "subjectId" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentAttendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeacherAttendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "checkIn" TEXT,
    "checkOut" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeacherAttendance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subjectId" TEXT,
    "rombelId" TEXT,
    "weight" REAL NOT NULL DEFAULT 1.0,
    "maxScore" INTEGER NOT NULL DEFAULT 100,
    "date" DATETIME,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "StudentGrade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "assessmentId" TEXT,
    "subjectId" TEXT,
    "semester" TEXT,
    "score" REAL NOT NULL,
    "grade" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentGrade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentGrade_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SyncSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME,
    "durationMs" INTEGER,
    "totalRecords" INTEGER NOT NULL DEFAULT 0,
    "newRecords" INTEGER NOT NULL DEFAULT 0,
    "updatedRecords" INTEGER NOT NULL DEFAULT 0,
    "conflictCount" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "triggeredBy" TEXT,
    "detail" TEXT
);

-- CreateTable
CREATE TABLE "SyncRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "action" TEXT NOT NULL,
    "localData" TEXT,
    "remoteData" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SyncRecord_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SyncSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SyncConflict" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "field" TEXT,
    "localValue" TEXT,
    "remoteValue" TEXT,
    "resolution" TEXT,
    "resolvedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SyncConflict_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SyncSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "columns" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Backup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "size" INTEGER,
    "checksum" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "School_npsn_key" ON "School"("npsn");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_name_key" ON "AcademicYear"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_academicYearId_name_key" ON "Semester"("academicYearId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nisn_key" ON "Student"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nik_key" ON "Student"("nik");

-- CreateIndex
CREATE INDEX "Student_fullName_idx" ON "Student"("fullName");

-- CreateIndex
CREATE INDEX "Student_status_idx" ON "Student"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_nip_key" ON "Teacher"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_nuptk_key" ON "Teacher"("nuptk");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_nik_key" ON "Teacher"("nik");

-- CreateIndex
CREATE INDEX "Teacher_name_idx" ON "Teacher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rombel_academicYear_semester_name_key" ON "Rombel"("academicYear", "semester", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE INDEX "Schedule_teacherId_day_startTime_idx" ON "Schedule"("teacherId", "day", "startTime");

-- CreateIndex
CREATE INDEX "Schedule_rombelId_day_idx" ON "Schedule"("rombelId", "day");

-- CreateIndex
CREATE INDEX "StudentAttendance_date_idx" ON "StudentAttendance"("date");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAttendance_studentId_date_subjectId_key" ON "StudentAttendance"("studentId", "date", "subjectId");

-- CreateIndex
CREATE INDEX "TeacherAttendance_date_idx" ON "TeacherAttendance"("date");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAttendance_teacherId_date_key" ON "TeacherAttendance"("teacherId", "date");

-- CreateIndex
CREATE INDEX "StudentGrade_studentId_subjectId_idx" ON "StudentGrade"("studentId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportTemplate_name_key" ON "ReportTemplate"("name");
