import React from 'react';
import { StatusTag, Tag } from './Tags';

/* ── Icons ──────────────────────────────────────────────────────────── */

function TagLabelIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 2H8.79C8.92 2 9.04 2.05 9.13 2.15L13.85 6.87C14.05 7.07 14.05 7.4 13.85 7.6L8.6 12.85C8.4 13.05 8.07 13.05 7.87 12.85L2.15 7.13C2.05 7.03 2 6.9 2 6.77V2.5C2 2.22 2.22 2 2.5 2Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="5" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}

function CheckCircleIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 8.5L7 10.5L11 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function WarningIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 6.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.7" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L9.65 6.26H14.1L10.52 8.74L11.9 13L8 10.52L4.1 13L5.48 8.74L1.9 6.26H6.35L8 2Z"
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Shared constants ───────────────────────────────────────────────── */

const STATUSES = ['neutral', 'success', 'primary', 'warning', 'error'];
const TYPES    = ['subtle', 'inverted', 'ghost'];

const STATUS_LABELS = {
  neutral: 'Neutral',
  success: 'Success',
  primary: 'Primary',
  warning: 'Warning',
  error:   'Error',
};

const STATUS_ICONS = {
  neutral: <TagLabelIcon />,
  success: <CheckCircleIcon />,
  primary: <InfoIcon />,
  warning: <WarningIcon />,
  error:   <ErrorIcon />,
};

const sectionLabel = {
  margin: '0 0 10px',
  fontFamily: 'IBM Plex Sans Arabic, sans-serif',
  fontSize: 11,
  fontWeight: 600,
  color: '#6C7C96',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

/* ── Default export ─────────────────────────────────────────────────── */

export default {
  title: 'Components/Tags',
  component: StatusTag,
  parameters: { layout: 'padded' },
};

/* ════════════════════════════════════════════════════════════════════
   STATUS TAG STORIES
   ════════════════════════════════════════════════════════════════════ */

export const StatusTagPlayground = {
  name: 'Status Tag — Playground',
  args: {
    status:   'neutral',
    type:     'subtle',
    size:     'medium',
    rtl:      false,
    children: 'Active',
  },
  argTypes: {
    status:   { control: 'radio',   options: STATUSES },
    type:     { control: 'radio',   options: TYPES },
    size:     { control: 'radio',   options: ['medium', 'small', 'xsmall'] },
    rtl:      { control: 'boolean' },
    children: { control: 'text',    description: 'Label text' },
  },
  render: (args) => <StatusTag {...args} />,
};

export const StatusTagAllStyles = {
  name: 'Status Tag — All Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {TYPES.map(type => (
        <div key={type}>
          <p style={sectionLabel}>{type}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {STATUSES.map(status => (
              <StatusTag key={status} status={status} type={type} size="medium">
                {STATUS_LABELS[status]}
              </StatusTag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const StatusTagSizes = {
  name: 'Status Tag — Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { key: 'medium', label: 'Medium — 32 px' },
        { key: 'small',  label: 'Small — 24 px'  },
        { key: 'xsmall', label: 'X-Small — 20 px' },
      ].map(({ key, label }) => (
        <div key={key}>
          <p style={sectionLabel}>{label}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {STATUSES.map(status => (
              <StatusTag key={status} status={status} type="subtle" size={key}>
                {STATUS_LABELS[status]}
              </StatusTag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const StatusTagRTL = {
  name: 'Status Tag — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {TYPES.map(type => (
        <div key={type}>
          <p style={sectionLabel}>{type}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {STATUSES.map(status => (
              <StatusTag key={status} status={status} type={type} size="medium" rtl>
                نشط
              </StatusTag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   TAG STORIES
   ════════════════════════════════════════════════════════════════════ */

export const TagPlayground = {
  name: 'Tag — Playground',
  args: {
    status:        'neutral',
    size:          'medium',
    rtl:           false,
    rounded:       false,
    outline:       false,
    iconOnly:      false,
    showLeadIcon:  true,
    showTrailIcon: false,
    children:      'Tag Label',
  },
  argTypes: {
    status:        { control: 'radio',   options: STATUSES },
    size:          { control: 'radio',   options: ['medium', 'small', 'xsmall'] },
    rtl:           { control: 'boolean' },
    rounded:       { control: 'boolean', description: 'Full-rounded pill shape' },
    outline:       { control: 'boolean', description: 'Border uses text colour instead of default stroke' },
    iconOnly:      { control: 'boolean', description: 'Show icon only (hides text)' },
    showLeadIcon:  { control: 'boolean', description: 'Show lead icon' },
    showTrailIcon: { control: 'boolean', description: 'Show trail icon' },
    children:      { control: 'text',    description: 'Label text' },
  },
  render: ({ showLeadIcon, showTrailIcon, ...args }) => (
    <Tag
      {...args}
      leadIcon={showLeadIcon  ? <TagLabelIcon /> : undefined}
      trailIcon={showTrailIcon ? <ArrowRightIcon /> : undefined}
    />
  ),
};

export const TagAllStyles = {
  name: 'Tag — All Styles',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {STATUSES.map(status => (
        <Tag key={status} status={status} size="medium" leadIcon={<TagLabelIcon />}>
          {STATUS_LABELS[status]}
        </Tag>
      ))}
    </div>
  ),
};

export const TagSizes = {
  name: 'Tag — Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { key: 'medium', label: 'Medium — 32 px' },
        { key: 'small',  label: 'Small — 24 px'  },
        { key: 'xsmall', label: 'X-Small — 20 px' },
      ].map(({ key, label }) => (
        <div key={key}>
          <p style={sectionLabel}>{label}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {STATUSES.map(status => (
              <Tag key={status} status={status} size={key} leadIcon={<TagLabelIcon />}>
                {STATUS_LABELS[status]}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TagLeadIcon = {
  name: 'Tag — Lead Icon',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {STATUSES.map(status => (
        <Tag key={status} status={status} size="medium" leadIcon={STATUS_ICONS[status]}>
          {STATUS_LABELS[status]}
        </Tag>
      ))}
    </div>
  ),
};

export const TagTrailIcon = {
  name: 'Tag — Trail Icon',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {STATUSES.map(status => (
        <Tag key={status} status={status} size="medium" trailIcon={<ArrowRightIcon />}>
          {STATUS_LABELS[status]}
        </Tag>
      ))}
    </div>
  ),
};

export const TagBothIcons = {
  name: 'Tag — Lead & Trail Icons',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {STATUSES.map(status => (
        <Tag key={status} status={status} size="medium"
          leadIcon={STATUS_ICONS[status]}
          trailIcon={<ArrowRightIcon />}
        >
          {STATUS_LABELS[status]}
        </Tag>
      ))}
    </div>
  ),
};

export const TagIconOnly = {
  name: 'Tag — Icon Only',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { key: 'medium', label: 'Medium — 32 px' },
        { key: 'small',  label: 'Small — 24 px'  },
        { key: 'xsmall', label: 'X-Small — 20 px' },
      ].map(({ key, label }) => (
        <div key={key}>
          <p style={sectionLabel}>{label}</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {STATUSES.map(status => (
              <Tag key={status} status={status} size={key} iconOnly leadIcon={STATUS_ICONS[status]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TagOutline = {
  name: 'Tag — Outline',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={sectionLabel}>Outline — All Styles</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {STATUSES.map(status => (
            <Tag key={status} status={status} size="medium" outline leadIcon={STATUS_ICONS[status]}>
              {STATUS_LABELS[status]}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p style={sectionLabel}>Outline + Rounded</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {STATUSES.map(status => (
            <Tag key={status} status={status} size="medium" outline rounded leadIcon={STATUS_ICONS[status]}>
              {STATUS_LABELS[status]}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p style={sectionLabel}>Default vs Outline — Comparison</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag status="primary" size="medium" leadIcon={<InfoIcon />}>Default stroke</Tag>
          <Tag status="primary" size="medium" outline leadIcon={<InfoIcon />}>Outline</Tag>
          <Tag status="error" size="medium" leadIcon={<ErrorIcon />}>Default stroke</Tag>
          <Tag status="error" size="medium" outline leadIcon={<ErrorIcon />}>Outline</Tag>
        </div>
      </div>
    </div>
  ),
};

export const TagRounded = {
  name: 'Tag — Rounded',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={sectionLabel}>All Styles — Rounded</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {STATUSES.map(status => (
            <Tag key={status} status={status} size="medium" rounded leadIcon={STATUS_ICONS[status]}>
              {STATUS_LABELS[status]}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p style={sectionLabel}>All Sizes — Rounded</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { key: 'medium', label: 'Medium' },
            { key: 'small',  label: 'Small'  },
            { key: 'xsmall', label: 'X-Small' },
          ].map(({ key, label }) => (
            <Tag key={key} status="primary" size={key} rounded leadIcon={<TagLabelIcon />}>
              {label}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p style={sectionLabel}>Rounded vs Default — Comparison</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag status="neutral" size="medium" leadIcon={<TagLabelIcon />}>Default (4 px)</Tag>
          <Tag status="neutral" size="medium" rounded leadIcon={<TagLabelIcon />}>Rounded (pill)</Tag>
          <Tag status="primary" size="medium" leadIcon={<InfoIcon />}>Default (4 px)</Tag>
          <Tag status="primary" size="medium" rounded leadIcon={<InfoIcon />}>Rounded (pill)</Tag>
        </div>
      </div>
    </div>
  ),
};

export const TagRTL = {
  name: 'Tag — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={sectionLabel}>Lead Icon · RTL</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {STATUSES.map(status => (
            <Tag key={status} status={status} size="medium" rtl leadIcon={STATUS_ICONS[status]}>
              وسم
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p style={sectionLabel}>Trail Icon · RTL</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {STATUSES.map(status => (
            <Tag key={status} status={status} size="medium" rtl trailIcon={<StarIcon />}>
              وسم
            </Tag>
          ))}
        </div>
      </div>
    </div>
  ),
};
