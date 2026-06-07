import React from 'react';
import { Sidebar } from './Sidebar';
import { FIGMA_PHOTO, ARAB_PHOTOS } from '../Avatar/Avatar';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: [],
};

/* ── Shared wrapper to frame the sidebar realistically ───────────── */
const Frame = ({ children, bg = '#F9FAFB' }) => (
  <div style={{ display: 'flex', height: '100vh', background: bg, fontFamily: FONT }}>
    {children}
    <div style={{ flex: 1, padding: 32, display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ color: '#6B7280', fontSize: 14 }}>← Main content area</div>
    </div>
  </div>
);

/* ── Custom menu items for demos ──────────────────────────────────── */
const MENU_ITEMS = [
  { id: 'home',          label: 'Home',          leadIcon: 'home',      state: 'selected' },
  { id: 'messages',      label: 'Messages',       leadIcon: 'message',   trailElement: 'text', trailText: '+5' },
  { id: 'analytics',     label: 'Analytics',      leadIcon: 'chart-bar' },
  { id: 'notifications', label: 'Notifications',  leadIcon: 'bell' },
  { id: 'settings',      label: 'Settings',       leadIcon: 'setting' },
];

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Sidebar',
  argTypes: {
    variant: { control: 'select', options: ['ltr', 'rtl', 'icon-only'] },
    featuredTitle:       { control: 'text' },
    featuredSubtext:     { control: 'text' },
    featuredButtonLabel: { control: 'text' },
    userName:  { control: 'text' },
    userEmail: { control: 'text' },
  },
  args: {
    variant: 'ltr',
    featuredTitle: 'Getting Started',
    featuredSubtext: 'Watch this short intro to learn the basics of the platform.',
    featuredButtonLabel: 'Get Started',
    userName: 'Nora Ahmed',
    userEmail: 'nora.ahmed@email.com',
  },
  render: (args) => (
    <Frame>
      <Sidebar
        {...args}
        menuItems={MENU_ITEMS}
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
    </Frame>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   LTR (default)
   ════════════════════════════════════════════════════════════════════ */
export const LTR = {
  name: 'Variant — LTR',
  render: () => (
    <Frame>
      <Sidebar
        variant="ltr"
        menuItems={MENU_ITEMS}
        featuredTitle="Getting Started"
        featuredSubtext="Watch this short intro to learn the basics of the platform."
        featuredButtonLabel="Get Started"
        userName="Nora Ahmed"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
    </Frame>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTL = {
  name: 'Variant — RTL',
  render: () => (
    <Frame>
      <Sidebar
        variant="rtl"
        menuItems={[
          { id: 'home',          label: 'الرئيسية',    leadIcon: 'home',      state: 'selected' },
          { id: 'messages',      label: 'الرسائل',     leadIcon: 'message',   trailElement: 'text', trailText: '+5' },
          { id: 'analytics',     label: 'التحليلات',   leadIcon: 'chart-bar' },
          { id: 'notifications', label: 'الإشعارات',   leadIcon: 'bell' },
          { id: 'settings',      label: 'الإعدادات',   leadIcon: 'setting' },
        ]}
        featuredTitle="ابدأ الآن"
        featuredSubtext="شاهد هذا الفيديو القصير لتتعلم أساسيات المنصة."
        featuredButtonLabel="ابدأ"
        userName="نورة أحمد"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
    </Frame>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Icon Only (collapsed)
   ════════════════════════════════════════════════════════════════════ */
export const IconOnly = {
  name: 'Variant — Icon Only',
  render: () => (
    <Frame>
      <Sidebar
        variant="icon-only"
        menuItems={MENU_ITEMS}
        userName="Nora Ahmed"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
    </Frame>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All three variants side by side
   ════════════════════════════════════════════════════════════════════ */
export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', height: '100vh', fontFamily: FONT }}>
      {/* LTR */}
      <Sidebar
        variant="ltr"
        menuItems={MENU_ITEMS}
        featuredTitle="Getting Started"
        featuredSubtext="Watch this short intro to learn the basics."
        featuredButtonLabel="Get Started"
        userName="Nora Ahmed"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
      {/* Icon only */}
      <Sidebar
        variant="icon-only"
        menuItems={MENU_ITEMS}
        userName="Nora Ahmed"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
      {/* RTL */}
      <Sidebar
        variant="rtl"
        menuItems={[
          { id: 'home',          label: 'الرئيسية',    leadIcon: 'home',      state: 'selected' },
          { id: 'messages',      label: 'الرسائل',     leadIcon: 'message',   trailElement: 'text', trailText: '+5' },
          { id: 'analytics',     label: 'التحليلات',   leadIcon: 'chart-bar' },
          { id: 'notifications', label: 'الإشعارات',   leadIcon: 'bell' },
          { id: 'settings',      label: 'الإعدادات',   leadIcon: 'setting' },
        ]}
        featuredTitle="ابدأ الآن"
        featuredSubtext="شاهد هذا الفيديو القصير لتتعلم أساسيات المنصة."
        featuredButtonLabel="ابدأ"
        userName="نورة أحمد"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
      <div style={{ flex: 1, padding: 32, background: '#F9FAFB', color: '#6B7280', fontSize: 14 }}>
        Main content area
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Without featured card (already closed)
   ════════════════════════════════════════════════════════════════════ */
export const WithoutFeaturedCard = {
  name: 'Without Featured Card',
  render: () => (
    <Frame>
      {/* We mount with a key so the closed-state is the initial state.
          Click the × in the Playground to see live dismissal. */}
      <Sidebar
        key="no-card"
        variant="ltr"
        menuItems={MENU_ITEMS}
        userName="Nora Ahmed"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
        /* featuredVisible is internal state; here we demo by hiding via CSS trick.
           In real usage, use the onFeaturedClose callback to control it externally. */
      />
    </Frame>
  ),
  decorators: [
    (Story) => (
      <div>
        <style>{`.featuredCard { display: none !important; }`}</style>
        <Story />
      </div>
    ),
  ],
};

/* ════════════════════════════════════════════════════════════════════
   Custom logo
   ════════════════════════════════════════════════════════════════════ */
export const CustomLogo = {
  name: 'Custom Logo',
  render: () => (
    <Frame>
      <Sidebar
        variant="ltr"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="16" fill="#7C3AED" />
              <path d="M10 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0z" fill="white" opacity=".3" />
              <path d="M16 11v10M11 16h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#000B36', fontFamily: FONT }}>
              Acme Corp
            </span>
          </div>
        }
        menuItems={MENU_ITEMS}
        featuredTitle="Getting Started"
        featuredSubtext="Watch this short intro to learn the basics."
        featuredButtonLabel="Get Started"
        userName="Nora Ahmed"
        userEmail="nora.ahmed@email.com"
        userAvatarSrc={ARAB_PHOTOS[0]}
      />
    </Frame>
  ),
};
