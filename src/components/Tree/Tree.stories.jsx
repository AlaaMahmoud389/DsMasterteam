import React from 'react';
import { Tree, TreeItem } from './Tree';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Tree',
  component: Tree,
  parameters: { layout: 'padded' },
  tags: [],
};

const LABEL = {
  style: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: 12,
    fontFamily: FONT,
  },
};

const WRAP = { style: { maxWidth: 480 } };

/* ── Sample icons ────────────────────────────────────────────────── */

function FolderIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Sample data ─────────────────────────────────────────────────── */

const SAMPLE_TREE = [
  {
    id: 'docs',
    label: 'Documents',
    icon: <FolderIcon />,
    children: [
      {
        id: 'reports',
        label: 'Reports',
        icon: <FolderIcon />,
        children: [
          {
            id: 'q1',
            label: 'Q1 Report.pdf',
            icon: <FileIcon />,
            children: [
              { id: 'q1-summary', label: 'Summary', icon: <FileIcon /> },
            ],
          },
          { id: 'q2', label: 'Q2 Report.pdf', icon: <FileIcon /> },
        ],
      },
      { id: 'invoice', label: 'Invoice.pdf', icon: <FileIcon /> },
    ],
  },
  {
    id: 'images',
    label: 'Images',
    icon: <FolderIcon />,
    children: [
      { id: 'img1', label: 'hero.png',   icon: <FileIcon /> },
      { id: 'img2', label: 'logo.svg',   icon: <FileIcon /> },
    ],
  },
  {
    id: 'readme',
    label: 'README.md',
    icon: <FileIcon />,
  },
];

const STATES_DATA = [
  { id: 's1', label: 'Default item',   state: 'default' },
  { id: 's2', label: 'Hovered item',   state: 'hovered' },
  { id: 's3', label: 'Pressed item',   state: 'pressed' },
  { id: 's4', label: 'Selected item',  state: 'selected' },
  { id: 's5', label: 'Disabled item',  state: 'disabled' },
];

/* ════════════════════════════════════════════════════════════════════
   Playground — Tree
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Tree',
  args: { rtl: false },
  argTypes: {
    rtl: { control: 'boolean' },
  },
  render: (args) => (
    <div {...WRAP}>
      <Tree items={SAMPLE_TREE} {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Playground — TreeItem (single row)
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundItem = {
  name: 'Playground — TreeItem',
  argTypes: {
    label:        { control: 'text' },
    level:        { control: 'select', options: [1, 2, 3, 4] },
    state:        { control: 'select', options: ['default', 'hovered', 'pressed', 'selected', 'disabled'] },
    hasChildren:  { control: 'boolean' },
    isExpanded:   { control: 'boolean' },
    showIcon1:    { control: 'boolean' },
    showIcon2:    { control: 'boolean' },
    showIcon3:    { control: 'boolean' },
    showSwitch:   { control: 'boolean' },
    switchChecked:{ control: 'boolean' },
    rtl:          { control: 'boolean' },
  },
  args: {
    label: 'Tree item',
    level: 1,
    state: 'default',
    hasChildren: false,
    isExpanded: false,
    showIcon1: false,
    showIcon2: false,
    showIcon3: false,
    showSwitch: false,
    switchChecked: false,
    rtl: false,
  },
  render: (args) => (
    <div {...WRAP}>
      <TreeItem
        {...args}
        icon={<FolderIcon />}
        icon1={<EditIcon />}
        icon2={<TrashIcon />}
        icon3={<PlusIcon />}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States
   ════════════════════════════════════════════════════════════════════ */
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {STATES_DATA.map(({ id, label, state }) => (
        <div key={id}>
          <p {...LABEL}>{state}</p>
          <div {...WRAP}>
            <TreeItem
              label={label}
              state={state}
              icon={<FolderIcon />}
              hasChildren
              isExpanded={false}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Levels (static — no expand)
   ════════════════════════════════════════════════════════════════════ */
export const AllLevels = {
  name: 'All Levels',
  render: () => (
    <div {...WRAP}>
      <p {...LABEL}>Indent increases 16px per level</p>
      {[1, 2, 3, 4].map((level) => (
        <TreeItem
          key={level}
          label={`Level ${level} item`}
          level={level}
          icon={level === 4 ? <FileIcon /> : <FolderIcon />}
          hasChildren={level < 4}
        />
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Right Icons
   ════════════════════════════════════════════════════════════════════ */
export const WithRightIcons = {
  name: 'With Right Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div {...WRAP}>
        <p {...LABEL}>One action icon</p>
        <TreeItem
          label="Item with one icon"
          icon={<FileIcon />}
          showIcon1
          icon1={<EditIcon />}
        />
      </div>
      <div {...WRAP}>
        <p {...LABEL}>Two action icons</p>
        <TreeItem
          label="Item with two icons"
          icon={<FileIcon />}
          showIcon1
          icon1={<EditIcon />}
          showIcon2
          icon2={<TrashIcon />}
        />
      </div>
      <div {...WRAP}>
        <p {...LABEL}>Three action icons</p>
        <TreeItem
          label="Item with three icons"
          icon={<FileIcon />}
          showIcon1
          icon1={<EditIcon />}
          showIcon2
          icon2={<TrashIcon />}
          showIcon3
          icon3={<PlusIcon />}
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Switch
   ════════════════════════════════════════════════════════════════════ */
export const WithSwitch = {
  name: 'With Switch',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div {...WRAP}>
        <p {...LABEL}>Switch only</p>
        <TreeItem
          label="Toggle feature"
          icon={<FileIcon />}
          showSwitch
          switchChecked={false}
        />
      </div>
      <div {...WRAP}>
        <p {...LABEL}>Switch + icons</p>
        <TreeItem
          label="Toggle with actions"
          icon={<FileIcon />}
          showIcon1
          icon1={<EditIcon />}
          showSwitch
          switchChecked
        />
      </div>
      <div {...WRAP}>
        <p {...LABEL}>Disabled + switch</p>
        <TreeItem
          label="Disabled item"
          icon={<FileIcon />}
          state="disabled"
          showSwitch
          switchChecked
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Interactive Tree
   ════════════════════════════════════════════════════════════════════ */
export const Interactive = {
  name: 'Interactive Tree',
  render: () => (
    <div {...WRAP}>
      <Tree items={SAMPLE_TREE} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Tree with Switches
   ════════════════════════════════════════════════════════════════════ */
export const TreeWithSwitches = {
  name: 'Tree with Switches',
  render: () => {
    const items = [
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <FolderIcon />,
        showSwitch: true,
        switchChecked: true,
        children: [
          { id: 'email',  label: 'Email alerts',   icon: <FileIcon />, showSwitch: true, switchChecked: true },
          { id: 'sms',    label: 'SMS alerts',      icon: <FileIcon />, showSwitch: true, switchChecked: false },
          { id: 'push',   label: 'Push alerts',     icon: <FileIcon />, showSwitch: true, switchChecked: true },
        ],
      },
      {
        id: 'privacy',
        label: 'Privacy',
        icon: <FolderIcon />,
        showSwitch: true,
        switchChecked: false,
        children: [
          { id: 'tracking', label: 'Usage tracking', icon: <FileIcon />, showSwitch: true, switchChecked: false },
          { id: 'analytics', label: 'Analytics',     icon: <FileIcon />, showSwitch: true, switchChecked: true },
        ],
      },
    ];
    return (
      <div {...WRAP}>
        <Tree items={items} />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTL = {
  name: 'RTL',
  render: () => {
    const items = [
      {
        id: 'docs-ar',
        label: 'المستندات',
        icon: <FolderIcon />,
        children: [
          {
            id: 'reports-ar',
            label: 'التقارير',
            icon: <FolderIcon />,
            children: [
              { id: 'q1-ar', label: 'تقرير الربع الأول', icon: <FileIcon /> },
              { id: 'q2-ar', label: 'تقرير الربع الثاني', icon: <FileIcon /> },
            ],
          },
          { id: 'invoice-ar', label: 'الفاتورة', icon: <FileIcon /> },
        ],
      },
      {
        id: 'images-ar',
        label: 'الصور',
        icon: <FolderIcon />,
        children: [
          { id: 'img1-ar', label: 'الشعار', icon: <FileIcon /> },
        ],
      },
    ];
    return (
      <div {...WRAP}>
        <Tree items={items} rtl />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Full Featured
   ════════════════════════════════════════════════════════════════════ */
export const FullFeatured = {
  name: 'Full Featured',
  render: () => {
    const items = [
      {
        id: 'root1',
        label: 'Project Alpha',
        icon: <FolderIcon />,
        showIcon1: true, icon1: <EditIcon />,
        showSwitch: true, switchChecked: true,
        children: [
          {
            id: 'src',
            label: 'Source files',
            icon: <FolderIcon />,
            showIcon1: true, icon1: <PlusIcon />,
            children: [
              {
                id: 'components',
                label: 'Components',
                icon: <FolderIcon />,
                children: [
                  { id: 'btn', label: 'Button.jsx', icon: <FileIcon />, showIcon1: true, icon1: <EditIcon />, showIcon2: true, icon2: <TrashIcon /> },
                  { id: 'inp', label: 'Input.jsx',  icon: <FileIcon />, showIcon1: true, icon1: <EditIcon />, showIcon2: true, icon2: <TrashIcon /> },
                ],
              },
              { id: 'index', label: 'index.js', icon: <FileIcon />, showIcon1: true, icon1: <EditIcon /> },
            ],
          },
          { id: 'pkg', label: 'package.json', icon: <FileIcon />, showIcon1: true, icon1: <EditIcon />, showSwitch: true },
          { id: 'disabled-file', label: 'locked.config', icon: <FileIcon />, state: 'disabled' },
        ],
      },
      {
        id: 'root2',
        label: 'Project Beta',
        icon: <FolderIcon />,
        showSwitch: true,
        children: [
          { id: 'beta-src', label: 'src', icon: <FolderIcon /> },
          { id: 'beta-dist', label: 'dist', icon: <FolderIcon /> },
        ],
      },
    ];
    return (
      <div {...WRAP}>
        <Tree items={items} />
      </div>
    );
  },
};
