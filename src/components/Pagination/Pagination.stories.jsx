import { useState } from 'react';
import { Pagination } from './Pagination';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-22726&t=fWTlS4h9RZJZvHwC-4';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: ['Small', 'Medium', 'Large'],
      description: 'Item height — Small 24px · Medium 32px · Large 40px',
      table: { defaultValue: { summary: 'Medium' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — reverses page order and swaps chevrons',
      table: { defaultValue: { summary: 'false' } },
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Active page (1-based)',
      table: { defaultValue: { summary: '1' } },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
      table: { defaultValue: { summary: '10' } },
    },
    onPageChange: { action: 'page-changed' },
  },
  args: {
    size:        'Medium',
    rtl:         false,
    currentPage: 1,
    totalPages:  10,
  },
};

/* Controlled wrapper so navigation actually works in the canvas */
const Controlled = (args) => {
  const [page, setPage] = useState(args.currentPage ?? 1);
  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={(p) => { setPage(p); args.onPageChange?.(p); }}
    />
  );
};

export const Playground = { render: Controlled };

export const Small = {
  name: 'Small',
  render: Controlled,
  args: { size: 'Small', currentPage: 1, totalPages: 10 },
};

export const Medium = {
  name: 'Medium',
  render: Controlled,
  args: { size: 'Medium', currentPage: 1, totalPages: 10 },
};

export const Large = {
  name: 'Large',
  render: Controlled,
  args: { size: 'Large', currentPage: 1, totalPages: 10 },
};

export const MiddlePage = {
  name: 'Middle Page',
  render: Controlled,
  args: { size: 'Medium', currentPage: 5, totalPages: 10 },
};

export const LastPage = {
  name: 'Last Page (Next Disabled)',
  render: Controlled,
  args: { size: 'Medium', currentPage: 10, totalPages: 10 },
};

export const FewPages = {
  name: 'Few Pages (≤ 7, no ellipsis)',
  render: Controlled,
  args: { size: 'Medium', currentPage: 3, totalPages: 5 },
};

export const ManyPages = {
  name: 'Many Pages (ellipsis)',
  render: Controlled,
  args: { size: 'Medium', currentPage: 1, totalPages: 999 },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  render: Controlled,
  args: { size: 'Medium', rtl: true, currentPage: 1, totalPages: 10 },
};

export const RTLLarge = {
  name: 'RTL Large',
  render: Controlled,
  args: { size: 'Large', rtl: true, currentPage: 1, totalPages: 999 },
};

export const AllSizes = {
  name: 'All Sizes',
  render: (args) => {
    const [pages, setPages] = useState({ small: 1, medium: 1, large: 1 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        {[
          ['Small',  'small'],
          ['Medium', 'medium'],
          ['Large',  'large'],
        ].map(([label, key]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', width: 54, flexShrink: 0 }}>{label}</span>
            <Pagination
              size={label}
              rtl={args.rtl}
              currentPage={pages[key]}
              totalPages={10}
              onPageChange={(p) => setPages(prev => ({ ...prev, [key]: p }))}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const AllSizesRTL = {
  name: 'All Sizes RTL',
  render: (args) => {
    const [pages, setPages] = useState({ small: 1, medium: 1, large: 1 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        {[
          ['Small',  'small'],
          ['Medium', 'medium'],
          ['Large',  'large'],
        ].map(([label, key]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', width: 54, flexShrink: 0 }}>{label}</span>
            <Pagination
              size={label}
              rtl={true}
              currentPage={pages[key]}
              totalPages={10}
              onPageChange={(p) => setPages(prev => ({ ...prev, [key]: p }))}
            />
          </div>
        ))}
      </div>
    );
  },
};
