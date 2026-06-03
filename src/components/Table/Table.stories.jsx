import { useState, Fragment, useRef, useEffect } from 'react';
import { Table } from './Table';
import { Button } from '../Button/Button';
import { Icon } from '../icons/Icon';
import tableStyles from './Table.module.css';
import filtrationStyles from '../Filtration/Filtration.module.css';
import s from './Table.interactive.module.css';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    compact:         { control: 'boolean' },
    alternatingRows: { control: 'boolean' },
    contained:       { control: 'boolean' },
    selectable:      { control: 'boolean' },
    rtl:             { control: 'boolean' },
    emptyText:       { control: 'text' },
  },
};

/* ─────────────────────────────────────────────────────────────
   Figma cell sub-components (inline, matching Figma tokens)
   ───────────────────────────────────────────────────────────── */

const ActionButton = ({ label = 'Button', onClick }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    height: 40, padding: '0 12px', border: 'none', background: 'transparent',
    borderRadius: 4, cursor: 'pointer',
    color: 'var(--button-transparent-icon-default, #175cd3)',
    fontSize: 16, fontWeight: 500,
    fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    whiteSpace: 'nowrap',
  }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#175cd3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {label}
  </button>
);

const Chip = ({ label = 'Item' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: 32, padding: '0 12px', borderRadius: 9999,
    background: 'rgba(24,73,169,0.1)',
    color: 'var(--chips-primary-label-default, #1849a9)',
    fontSize: 16, fontWeight: 500,
    fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    whiteSpace: 'nowrap',
  }}>
    {label}
  </span>
);

const StatusTag = ({ label = 'Status', color }) => {
  const bg   = color === 'success' ? '#ecfdf5' : color === 'warning' ? '#fff7ed' : color === 'error' ? '#fef2f2' : '#f3f4f6';
  const dot  = color === 'success' ? '#059669' : color === 'warning' ? '#c2410c' : color === 'error' ? '#dc2626' : '#6b7280';
  const text = color === 'success' ? '#059669' : color === 'warning' ? '#c2410c' : color === 'error' ? '#dc2626' : '#000b36';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      height: 24, padding: '0 8px', borderRadius: 9999,
      background: bg, whiteSpace: 'nowrap',
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      <span style={{ fontSize: 14, fontWeight: 500, color: text }}>{label}</span>
    </span>
  );
};

const IconBtn = ({ title = '', icon = 'edit', onClick, ...rest }) => (
  <button title={title} onClick={onClick} {...rest} style={{
    width: 32, height: 32, borderRadius: 4, border: 'none',
    background: 'transparent', cursor: 'pointer', padding: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: '#6b7280',
  }}>
    {icon === 'edit' ? (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M10.5 3.5L14.5 7.5M2 16L6.5 15L15.5 6A2.121 2.121 0 1 0 12.5 3L3.5 12L2 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 4.5H15M7.5 8V13M10.5 8V13M4.5 4.5L5.25 14.25A1.5 1.5 0 0 0 6.75 15.75H11.25A1.5 1.5 0 0 0 12.75 14.25L13.5 4.5M7.5 4.5V3.75A.75.75 0 0 1 8.25 3H9.75A.75.75 0 0 1 10.5 3.75V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </button>
);

/* ─────────────────────────────────────────────────────────────
   Column definitions & data
   ───────────────────────────────────────────────────────────── */

const FIGMA_COLUMNS = [
  { key: 'action', label: 'Action', minWidth: 120, render: (_v, row) => <ActionButton label={row.action} /> },
  { key: 'name',       label: 'Name',       sortable: true, minWidth: 130 },
  { key: 'role',       label: 'Role',        sortable: true, minWidth: 130 },
  { key: 'department', label: 'Department',  sortable: true, minWidth: 130 },
  { key: 'category',   label: 'Category',    minWidth: 120, render: (val) => <Chip label={val} /> },
  { key: 'status',     label: 'Status',      minWidth: 120, render: (_v, row) => <StatusTag label={row.status} color={row.statusColor} /> },
  { key: 'date',       label: 'Date',        sortable: true, minWidth: 110 },
  {
    key: '_actions', label: '', type: 'actions',
    render: (_v, row) => (
      <span style={{ display: 'inline-flex', gap: 4 }}>
        <IconBtn title={`Edit ${row.name}`}   icon="edit" />
        <IconBtn title={`Delete ${row.name}`} icon="delete" />
      </span>
    ),
  },
];

const ROWS = [
  { id: 1, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
  { id: 2, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
  { id: 3, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
  { id: 4, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
  { id: 5, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
  { id: 6, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
  { id: 7, action: 'Button', name: 'Cell', role: 'Cell', department: 'Cell', category: 'Item', status: 'Status', statusColor: 'neutral', date: 'Cell' },
];

const ROWS_REAL = [
  { id: 1, action: 'View', name: 'Sarah Al-Qassem',  role: 'Product Manager',   department: 'Product',     category: 'Full-time', status: 'Active',   statusColor: 'success', date: '2021-03-15' },
  { id: 2, action: 'View', name: 'Khalid Mansour',   role: 'UX Designer',       department: 'Design',      category: 'Full-time', status: 'Active',   statusColor: 'success', date: '2020-07-08' },
  { id: 3, action: 'View', name: 'Leila Hadid',      role: 'Frontend Dev',      department: 'Engineering', category: 'Contract',  status: 'On Leave', statusColor: 'warning', date: '2022-01-22' },
  { id: 4, action: 'View', name: 'Omar Al-Farsi',    role: 'Data Analyst',      department: 'Analytics',   category: 'Full-time', status: 'Active',   statusColor: 'success', date: '2019-11-30' },
  { id: 5, action: 'View', name: 'Nour Abdallah',    role: 'Backend Dev',       department: 'Engineering', category: 'Contract',  status: 'Inactive', statusColor: 'error',   date: '2023-04-11' },
  { id: 6, action: 'View', name: 'Tariq Salim',      role: 'QA Engineer',       department: 'Engineering', category: 'Full-time', status: 'Active',   statusColor: 'success', date: '2021-09-03' },
  { id: 7, action: 'View', name: 'Rana Khoury',      role: 'DevOps Engineer',   department: 'Platform',    category: 'Full-time', status: 'Active',   statusColor: 'success', date: '2022-06-17' },
];

const FIGMA_COLUMNS_AR = [
  { key: 'action', label: 'الإجراء', minWidth: 120, render: (_v, row) => <ActionButton label={row.action} /> },
  { key: 'name',       label: 'الاسم',              sortable: true, minWidth: 150 },
  { key: 'role',       label: 'المسمى الوظيفي',     sortable: true, minWidth: 150 },
  { key: 'department', label: 'القسم',               sortable: true, minWidth: 120 },
  { key: 'category',   label: 'التصنيف',             minWidth: 120, render: (val) => <Chip label={val} /> },
  { key: 'status',     label: 'الحالة',              minWidth: 110, render: (_v, row) => <StatusTag label={row.status} color={row.statusColor} /> },
  { key: 'date',       label: 'التاريخ',             sortable: true, minWidth: 110 },
  {
    key: '_actions', label: '', type: 'actions',
    render: (_v, row) => (
      <span style={{ display: 'inline-flex', gap: 4 }}>
        <IconBtn title={`تعديل ${row.name}`} icon="edit" />
        <IconBtn title={`حذف ${row.name}`}   icon="delete" />
      </span>
    ),
  },
];

const ROWS_AR = [
  { id: 1, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
  { id: 2, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
  { id: 3, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
  { id: 4, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
  { id: 5, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
  { id: 6, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
  { id: 7, action: 'عرض', name: 'خلية', role: 'خلية', department: 'خلية', category: 'عنصر', status: 'الحالة', statusColor: 'neutral', date: 'خلية' },
];

/* ─────────────────────────────────────────────────────────────
   Domain constants for Interactive story
   ───────────────────────────────────────────────────────────── */

const ROLES       = ['Product Manager','UX Designer','Frontend Dev','Backend Dev','Data Analyst','QA Engineer','DevOps Engineer'];
const DEPARTMENTS = ['Product','Design','Engineering','Analytics','Platform'];
const CATEGORIES  = ['Full-time','Contract','Part-time'];
const STATUSES    = ['Active','On Leave','Inactive'];
const STATUS_COLORS = { Active: 'success', 'On Leave': 'warning', Inactive: 'error' };

const SORT_FIELDS = [
  { key: 'name',       label: 'Name' },
  { key: 'role',       label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'category',   label: 'Category' },
  { key: 'status',     label: 'Status' },
];

const FILTER_OPTIONS = {
  role:       ROLES,
  department: DEPARTMENTS,
  category:   CATEGORIES,
  status:     STATUSES,
};

const EMPTY_FILTERS = { role: [], department: [], category: [], status: [] };

/* ─────────────────────────────────────────────────────────────
   Interactive sub-components
   ───────────────────────────────────────────────────────────── */

function Tooltip({ label, children }) {
  return (
    <span className={s.tooltipWrap}>
      {children}
      <span className={s.tooltip} role="tooltip">{label}</span>
    </span>
  );
}

function TableFilterPanel({ activeFilters, onApply, onClear }) {
  const [local, setLocal] = useState({ ...activeFilters });

  const toggle = (key, val) => {
    setLocal(prev => {
      const arr = prev[key].includes(val)
        ? prev[key].filter(v => v !== val)
        : [...prev[key], val];
      return { ...prev, [key]: arr };
    });
  };

  const totalActive = Object.values(local).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className={filtrationStyles.panel}>
      {Object.entries(FILTER_OPTIONS).map(([key, options], i) => (
        <Fragment key={key}>
          {i > 0 && <div className={filtrationStyles.divider} />}
          <div className={filtrationStyles.section}>
            <span className={filtrationStyles.sectionLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {local[key].length > 0 && (
                <span className={filtrationStyles.labelCount}> ({local[key].length})</span>
              )}
            </span>
            <div className={filtrationStyles.optionsList}>
              {options.map(opt => {
                const checked = local[key].includes(opt);
                return (
                  <div
                    key={opt}
                    className={filtrationStyles.optionItem}
                    onClick={() => toggle(key, opt)}
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    onKeyDown={e => e.key === ' ' && toggle(key, opt)}
                  >
                    <span
                      className={`${filtrationStyles.checkbox} ${checked ? filtrationStyles.checkboxChecked : ''}`}
                    />
                    <span className={filtrationStyles.optionText}>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Fragment>
      ))}
      <div className={filtrationStyles.footer}>
        <button
          className={filtrationStyles.clearBtn}
          onClick={() => { setLocal({ ...EMPTY_FILTERS }); onClear(); }}
        >
          Clear all
        </button>
        <button
          className={filtrationStyles.applyBtn}
          onClick={() => onApply(local)}
        >
          Apply{totalActive > 0 ? ` (${totalActive})` : ''}
        </button>
      </div>
    </div>
  );
}

function SortDropdown({ sortConfig, onSort }) {
  return (
    <div className={s.sortPanel}>
      <div className={s.sortSectionLabel}>Sort by</div>
      {SORT_FIELDS.map(f => {
        const isActive = sortConfig.key === f.key;
        return (
          <div
            key={f.key}
            className={`${s.sortOption} ${isActive ? s.sortOptionActive : ''}`}
            onClick={() => onSort({
              key: f.key,
              dir: isActive && sortConfig.dir === 'asc' ? 'desc' : 'asc',
            })}
            role="option"
            aria-selected={isActive}
          >
            <span>{f.label}</span>
            {isActive && (
              <Icon
                name={sortConfig.dir === 'asc' ? 'arrow-up' : 'arrow-down'}
                size={14}
                color="#1849a9"
              />
            )}
          </div>
        );
      })}
      {sortConfig.key && (
        <>
          <hr className={s.sortDivider} />
          <div className={s.sortSectionLabel}>Direction</div>
          <div
            className={`${s.sortOption} ${sortConfig.dir === 'asc' ? s.sortOptionActive : ''}`}
            onClick={() => onSort({ ...sortConfig, dir: 'asc' })}
          >
            Ascending
          </div>
          <div
            className={`${s.sortOption} ${sortConfig.dir === 'desc' ? s.sortOptionActive : ''}`}
            onClick={() => onSort({ ...sortConfig, dir: 'desc' })}
          >
            Descending
          </div>
        </>
      )}
    </div>
  );
}

function DeleteModal({ target, onConfirm, onCancel }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div
      className={s.modalOverlay}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="del-modal-title"
    >
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.modalIconWrap}>
          <Icon name="delete" size={24} color="#dc2626" />
        </div>
        <h3 id="del-modal-title" className={s.modalTitle}>Delete member?</h3>
        <p className={s.modalDesc}>
          <strong style={{ color: '#111827' }}>{target.name}</strong>{' '}
          will be permanently removed.<br />
          This action cannot be undone.
        </p>
        <div className={s.modalActions}>
          <Button variant="neutral" size="lg" onClick={onCancel} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button variant="danger" size="lg" onClick={onConfirm} style={{ flex: 1 }}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   InteractiveTableDemo — main stateful demo component
   ───────────────────────────────────────────────────────────── */

function InteractiveTableDemo({ rtl = false }) {
  const [rows,         setRows]         = useState([...ROWS_REAL]);
  const [search,       setSearch]       = useState('');
  const [editingId,    setEditingId]    = useState(null);
  const [editDraft,    setEditDraft]    = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterOpen,   setFilterOpen]   = useState(false);
  const [sortOpen,     setSortOpen]     = useState(false);
  const [activeFilters, setActiveFilters] = useState({ ...EMPTY_FILTERS });
  const [sortConfig,   setSortConfig]   = useState({ key: null, dir: 'asc' });
  const [flash,        setFlash]        = useState({});
  const [toast,        setToast]        = useState(null);

  const filterRef = useRef(null);
  const sortRef   = useRef(null);

  /* Close popovers when clicking outside */
  useEffect(() => {
    const handler = e => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
      if (sortRef.current   && !sortRef.current.contains(e.target))   setSortOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Escape key: cancel edit, close popovers */
  useEffect(() => {
    const handler = e => {
      if (e.key !== 'Escape') return;
      setFilterOpen(false);
      setSortOpen(false);
      if (editingId) { setEditingId(null); setEditDraft({}); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [editingId]);

  const showToast = (msg, kind = 'success') => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 2800);
  };

  const flashRow = (id, kind, ms = 520) => {
    setFlash(p => ({ ...p, [id]: kind }));
    setTimeout(() => setFlash(p => { const n = { ...p }; delete n[id]; return n; }), ms);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setEditDraft({ ...row });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({});
  };

  const saveEdit = () => {
    if (!editDraft.name?.trim()) return;
    const updated = {
      ...editDraft,
      statusColor: STATUS_COLORS[editDraft.status] || 'neutral',
    };
    setRows(prev => prev.map(r => r.id === updated.id ? updated : r));
    flashRow(updated.id, 'edit');
    setEditingId(null);
    setEditDraft({});
    showToast(`"${updated.name}" updated successfully.`, 'success');
  };

  const confirmDelete = () => {
    const row = deleteTarget;
    setDeleteTarget(null);
    flashRow(row.id, 'delete', 480);
    setTimeout(() => {
      setRows(prev => prev.filter(r => r.id !== row.id));
      showToast(`"${row.name}" has been removed.`, 'error');
    }, 480);
  };

  const applyFilters = filters => {
    setActiveFilters(filters);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setActiveFilters({ ...EMPTY_FILTERS });
    setFilterOpen(false);
  };

  const removeFilterTag = (key, val) =>
    setActiveFilters(prev => ({ ...prev, [key]: prev[key].filter(v => v !== val) }));

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  const displayedRows = rows.filter(r => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const hit = [r.name, r.role, r.department, r.status, r.category]
        .some(v => String(v).toLowerCase().includes(q));
      if (!hit) return false;
    }
    if (activeFilters.role.length       && !activeFilters.role.includes(r.role))             return false;
    if (activeFilters.department.length && !activeFilters.department.includes(r.department)) return false;
    if (activeFilters.category.length   && !activeFilters.category.includes(r.category))     return false;
    if (activeFilters.status.length     && !activeFilters.status.includes(r.status))         return false;
    return true;
  });

  const sortedRows = sortConfig.key
    ? [...displayedRows].sort((a, b) => {
        const cmp = String(a[sortConfig.key]).localeCompare(
          String(b[sortConfig.key]), undefined, { numeric: true }
        );
        return sortConfig.dir === 'asc' ? cmp : -cmp;
      })
    : displayedRows;

  /* ── Column definitions with inline edit renderers ── */
  const columns = [
    {
      key: 'action', label: 'Action', width: 120,
      render: (_v, row) => {
        if (editingId === row.id) return null;
        return (
          <ActionButton
            label="View"
            onClick={e => { e.stopPropagation(); showToast(`Viewing ${row.name}`, 'success'); }}
          />
        );
      },
    },
    {
      key: 'name', label: 'Name', sortable: true, minWidth: 150,
      render: (val, row) => {
        if (editingId !== row.id) return val;
        return (
          <input
            className={s.editInput}
            value={editDraft.name || ''}
            onChange={e => setEditDraft(p => ({ ...p, name: e.target.value }))}
            onKeyDown={e => {
              if (e.key === 'Enter')  saveEdit();
              if (e.key === 'Escape') cancelEdit();
              e.stopPropagation();
            }}
            onClick={e => e.stopPropagation()}
            autoFocus
            aria-label="Name"
          />
        );
      },
    },
    {
      key: 'role', label: 'Role', sortable: true, minWidth: 140,
      render: (val, row) => {
        if (editingId !== row.id) return val;
        return (
          <select
            className={s.editSelect}
            value={editDraft.role || ''}
            onChange={e => setEditDraft(p => ({ ...p, role: e.target.value }))}
            onClick={e => e.stopPropagation()}
            aria-label="Role"
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        );
      },
    },
    {
      key: 'department', label: 'Department', sortable: true, minWidth: 130,
      render: (val, row) => {
        if (editingId !== row.id) return val;
        return (
          <select
            className={s.editSelect}
            value={editDraft.department || ''}
            onChange={e => setEditDraft(p => ({ ...p, department: e.target.value }))}
            onClick={e => e.stopPropagation()}
            aria-label="Department"
          >
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        );
      },
    },
    {
      key: 'category', label: 'Category', minWidth: 120,
      render: (val, row) => {
        if (editingId !== row.id) return <Chip label={val} />;
        return (
          <select
            className={s.editSelect}
            value={editDraft.category || ''}
            onChange={e => setEditDraft(p => ({ ...p, category: e.target.value }))}
            onClick={e => e.stopPropagation()}
            aria-label="Category"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        );
      },
    },
    {
      key: 'status', label: 'Status', minWidth: 120,
      render: (val, row) => {
        if (editingId !== row.id) return <StatusTag label={val} color={row.statusColor} />;
        return (
          <select
            className={s.editSelect}
            value={editDraft.status || ''}
            onChange={e => setEditDraft(p => ({ ...p, status: e.target.value }))}
            onClick={e => e.stopPropagation()}
            aria-label="Status"
          >
            {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        );
      },
    },
    { key: 'date', label: 'Date', sortable: true, minWidth: 110 },
    {
      key: '_row_actions', label: '', align: 'right', width: 104,
      render: (_v, row) => {
        if (editingId === row.id) {
          return (
            <span style={{ display: 'inline-flex', gap: 4 }} onClick={e => e.stopPropagation()}>
              <Tooltip label="Save changes">
                <Button
                  iconOnly size="md" variant="primary"
                  disabled={!editDraft.name?.trim()}
                  aria-label="Save changes"
                  onClick={saveEdit}
                >
                  <Icon name="tick" size={20} color="#fff" />
                </Button>
              </Tooltip>
              <Tooltip label="Cancel">
                <Button
                  iconOnly size="md" variant="neutral"
                  aria-label="Cancel edit"
                  onClick={cancelEdit}
                >
                  <Icon name="cancel" size={20} />
                </Button>
              </Tooltip>
            </span>
          );
        }
        return (
          <span style={{ display: 'inline-flex', gap: 4 }} onClick={e => e.stopPropagation()}>
            <Tooltip label="Edit">
              <IconBtn
                icon="edit"
                aria-label={`Edit ${row.name}`}
                onClick={() => openEdit(row)}
              />
            </Tooltip>
            <Tooltip label="Delete">
              <IconBtn
                icon="delete"
                aria-label={`Delete ${row.name}`}
                onClick={() => setDeleteTarget(row)}
              />
            </Tooltip>
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", position: 'relative' }}>

      {/* ── Toast ── */}
      {toast && (
        <div className={`${s.toast} ${toast.kind === 'success' ? s.toastSuccess : s.toastError}`}>
          <span
            className={s.toastDot}
            style={{ background: toast.kind === 'success' ? '#059669' : '#dc2626' }}
          >
            {toast.kind === 'success' ? '✓' : '✕'}
          </span>
          {toast.msg}
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className={s.toolbar}>
        <div>
          <h2 className={s.toolbarTitle}>Team Members</h2>
          <p className={s.toolbarSubtitle}>
            {sortedRows.length} of {rows.length} record{rows.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className={s.toolbarRight}>

          {/* Search */}
          <div className={s.searchWrap}>
            <span className={s.searchIcon}>
              <Icon name="search" size={15} color="#9ca3af" />
            </span>
            <input
              type="text"
              className={s.searchInput}
              style={{ paddingRight: search ? 32 : 12 }}
              placeholder="Search name, role, status…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search team members"
            />
            {search && (
              <button className={s.clearSearch} onClick={() => setSearch('')} aria-label="Clear search">
                <Icon name="cancel" size={14} />
              </button>
            )}
          </div>

          {/* Filter */}
          <div className={s.popoverAnchor} ref={filterRef}>
            <div className={s.filterBtnWrap}>
              <Button
                iconOnly size="md"
                variant={hasActiveFilters ? 'secondary-solid' : 'neutral'}
                aria-label="Filter"
                aria-expanded={filterOpen}
                onClick={() => { setFilterOpen(o => !o); setSortOpen(false); }}
              >
                <Icon name="filter" size={20} color={hasActiveFilters ? '#1849a9' : '#6b7280'} />
              </Button>
              {hasActiveFilters && <span className={s.filterActiveDot} />}
            </div>
            {filterOpen && (
              <div className={s.filterPopoverWrap}>
                <TableFilterPanel
                  activeFilters={activeFilters}
                  onApply={applyFilters}
                  onClear={clearFilters}
                />
              </div>
            )}
          </div>

          {/* Sort */}
          <div className={s.popoverAnchor} ref={sortRef}>
            <Button
              iconOnly size="md"
              variant={sortConfig.key ? 'secondary-solid' : 'neutral'}
              aria-label="Sort"
              aria-expanded={sortOpen}
              onClick={() => { setSortOpen(o => !o); setFilterOpen(false); }}
            >
              <Icon name="sort" size={20} color={sortConfig.key ? '#1849a9' : '#6b7280'} />
            </Button>
            {sortOpen && (
              <div className={s.sortDropdownWrap}>
                <SortDropdown
                  sortConfig={sortConfig}
                  onSort={cfg => { setSortConfig(cfg); setSortOpen(false); }}
                />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Filter chips ── */}
      {hasActiveFilters && (
        <div className={s.filterChips} role="group" aria-label="Active filters">
          {Object.entries(activeFilters).flatMap(([key, values]) =>
            values.map(val => (
              <span key={`${key}:${val}`} className={s.filterChip}>
                <span className={s.filterChipLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {val}
                </span>
                <button
                  className={s.filterChipRemove}
                  aria-label={`Remove filter ${key}: ${val}`}
                  onClick={() => removeFilterTag(key, val)}
                >
                  <Icon name="cancel" size={11} />
                </button>
              </span>
            ))
          )}
          <button
            className={s.filterChipsClearAll}
            aria-label="Clear all filters"
            onClick={clearFilters}
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <Table
        columns={columns}
        data={sortedRows}
        alternatingRows
        contained
        selectable
        rtl={rtl}
        emptyText={
          search || hasActiveFilters
            ? 'No records match your search or filters.'
            : 'No records available.'
        }
        rowClassName={row => {
          if (flash[row.id] === 'edit')   return tableStyles.rowFlashEdit;
          if (flash[row.id] === 'delete') return tableStyles.rowFlashDelete;
          if (editingId === row.id)       return tableStyles.rowEditing;
          return '';
        }}
      />

      {/* ── Delete confirmation modal ── */}
      {deleteTarget && (
        <DeleteModal
          target={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stories — static variants
   ───────────────────────────────────────────────────────────── */

export const Playground = {
  args: {
    columns: FIGMA_COLUMNS, data: ROWS,
    compact: false, alternatingRows: false, contained: false, selectable: true, rtl: false,
  },
};

export const Default = {
  name: 'Default — Figma structure',
  args: { columns: FIGMA_COLUMNS, data: ROWS, selectable: true },
};

export const Compact = {
  name: 'Compact',
  args: { columns: FIGMA_COLUMNS, data: ROWS, compact: true, selectable: true },
};

export const AlternatingRows = {
  name: 'Alternating Rows',
  args: { columns: FIGMA_COLUMNS, data: ROWS, alternatingRows: true, selectable: true },
};

export const Contained = {
  name: 'Contained',
  args: { columns: FIGMA_COLUMNS, data: ROWS, contained: true, selectable: true },
};

export const CompactContained = {
  name: 'Compact + Contained',
  args: { columns: FIGMA_COLUMNS, data: ROWS, compact: true, contained: true, selectable: true },
};

export const AlternatingContained = {
  name: 'Alternating + Contained',
  args: { columns: FIGMA_COLUMNS, data: ROWS, alternatingRows: true, contained: true, selectable: true },
};

export const CompactAlternating = {
  name: 'Compact + Alternating + Contained',
  args: { columns: FIGMA_COLUMNS, data: ROWS, compact: true, alternatingRows: true, contained: true, selectable: true },
};

export const FullFeatured = {
  name: 'Full Featured — Real Data',
  args: { columns: FIGMA_COLUMNS, data: ROWS_REAL, alternatingRows: true, contained: true, selectable: true },
};

export const RTLArabic = {
  name: 'RTL / Arabic',
  args: { columns: FIGMA_COLUMNS_AR, data: ROWS_AR, rtl: true, contained: true, selectable: true },
};

export const RTLAlternating = {
  name: 'RTL + Alternating',
  args: { columns: FIGMA_COLUMNS_AR, data: ROWS_AR, rtl: true, alternatingRows: true, contained: true, selectable: true },
};

export const EmptyState = {
  name: 'Empty State',
  args: { columns: FIGMA_COLUMNS, data: [], contained: true, emptyText: 'No records found.' },
};

/* ─────────────────────────────────────────────────────────────
   Interactive story
   ───────────────────────────────────────────────────────────── */

export const Interactive = {
  name: 'Interactive — Filter, Edit & Delete',
  render: () => <InteractiveTableDemo />,
  parameters: { layout: 'padded' },
};

/* ── All Variants 2×2 grid ─────────────────────────────────── */

export const AllVariants = {
  name: 'All Variants (2×2 Grid)',
  render: () => {
    const cols = FIGMA_COLUMNS.slice(0, 5);
    const rows = ROWS.slice(0, 4);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {[
          ['Default', {}],
          ['Compact', { compact: true }],
          ['Alternating Rows', { alternatingRows: true }],
          ['Contained + Selection', { contained: true, selectable: true }],
        ].map(([label, props]) => (
          <div key={label}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
            <Table columns={cols} data={rows} {...props} />
          </div>
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
