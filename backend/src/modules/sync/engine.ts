export type DiffAction = 'NEW' | 'UPDATED' | 'UNCHANGED' | 'CONFLICT' | 'ERROR';

export interface DiffRecord {
  entity: string;
  entityId?: string;
  action: DiffAction;
  localData?: any;
  remoteData?: any;
  conflicts?: { field: string; localValue: any; remoteValue: any }[];
}

export function diffEngine(local: Record<string, any>[], remote: Record<string, any>[], key: string = 'nisn'): DiffRecord[] {
  const localMap = new Map(local.map((r) => [r[key], r]));
  const results: DiffRecord[] = [];
  const seen = new Set<string>();

  for (const r of remote) {
    const k = r[key];
    seen.add(k);
    const l = localMap.get(k);
    if (!l) {
      results.push({ entity: 'Student', entityId: k, action: 'NEW', remoteData: r });
    } else {
      // shallow compare significant fields
      const changedFields = Object.keys(r).filter((field) => String(r[field]) !== String((l as any)[field]));
      if (changedFields.length === 0) {
        results.push({ entity: 'Student', entityId: k, action: 'UNCHANGED', localData: l, remoteData: r });
      } else {
        // if name differs, treat as conflict if both non-empty
        const conflicts = changedFields
          .filter((f) => l[f] && r[f] && l[f] !== r[f])
          .map((f) => ({ field: f, localValue: l[f], remoteValue: r[f] }));
        if (conflicts.length > 0) {
          results.push({ entity: 'Student', entityId: k, action: 'CONFLICT', localData: l, remoteData: r, conflicts });
        } else {
          results.push({ entity: 'Student', entityId: k, action: 'UPDATED', localData: l, remoteData: r });
        }
      }
    }
  }
  // local only - unchanged local
  for (const [k, l] of localMap) {
    if (!seen.has(k)) results.push({ entity: 'Student', entityId: k, action: 'UNCHANGED', localData: l });
  }
  return results;
}

export function summarizeDiff(records: DiffRecord[]) {
  return {
    total: records.length,
    newRecords: records.filter((r) => r.action === 'NEW').length,
    updated: records.filter((r) => r.action === 'UPDATED').length,
    unchanged: records.filter((r) => r.action === 'UNCHANGED').length,
    conflicts: records.filter((r) => r.action === 'CONFLICT').length,
    errors: records.filter((r) => r.action === 'ERROR').length,
  };
}
