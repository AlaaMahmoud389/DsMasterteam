# DESIGN_SYSTEM_KNOWLEDGE.md
## Masterteam Design System — Complete Reference
> **Sources:** Figma `WTmRAkJVvw0IvZMA7wBdTC` · GitHub `AlaaMahmoud389/DsMasterteam` · Storybook/Chromatic `https://6a0780b6ea01e2c8d049c258-hdstoiscjh.chromatic.com/`
> **Stack:** React 19 · Vite · Storybook 10 · CSS Modules · MDX 3
> **Last Synced:** June 2025

---

## Table of Contents

1. [Design System Overview](#1-design-system-overview)
2. [Design Tokens](#2-design-tokens)
3. [Components Library](#3-components-library)
4. [Forms](#4-forms)
5. [Data Display](#5-data-display)
6. [Data Visualization](#6-data-visualization)
7. [Layout Patterns](#7-layout-patterns)
8. [Interaction Patterns](#8-interaction-patterns)
9. [Accessibility Rules](#9-accessibility-rules)
10. [Design Constraints](#10-design-constraints)
11. [AI Usage Guide](#11-ai-usage-guide)

---

## 1. Design System Overview

### Purpose

The Masterteam Design System (DS) is the unified visual and interaction language for all Masterteam products: **P+, S+, Diwan, Faris OS, Dr3, and Flow+**. It ensures consistency, accelerates development, and enforces accessibility across all digital surfaces — both LTR (English) and RTL (Arabic).

### Design Principles

| Principle | Description |
|---|---|
| **Consistency** | Every component looks and behaves identically across all products. Never deviate from tokens. |
| **Clarity** | Information hierarchy is established through typography scale and color contrast — not decoration. |
| **Efficiency** | Components are composable. Build complex UIs from existing primitives without creating new ones. |
| **Accessibility First** | All components meet WCAG 2.1 AA. RTL layout is a first-class requirement, not an afterthought. |
| **Token-driven** | No hardcoded hex values, no raw pixel values in component CSS. Always use CSS custom properties. |

### UX Principles

| Principle | Application |
|---|---|
| **Progressive Disclosure** | Use Accordion, Expandable Cards, and Slideout Menus to reveal complexity on demand. |
| **Feedback Loop** | Every interaction produces a visible state change (hover, focus, pressed, loading, success, error). |
| **Miller's Law** | Limit visible options to 7 ± 2. Use pagination, filters, and grouping for dense data. |
| **Fitts's Law** | Interactive targets are minimum 40px (lg button height) for comfortable touch and cursor use. |
| **Jakob's Law** | Follow familiar interaction patterns (date picker, table sort, modal dismiss) — never reinvent. |
| **Error Prevention** | Validate inline, before submission. Use helper text and inline alerts proactively. |

---

## 2. Design Tokens

> **Rule:** Always reference tokens via CSS custom properties. Never hardcode hex, px, or raw values in component CSS.
> **Source file:** `src/components/tokens.css`

---

### 2.1 Colors

#### Primary Blue (Info Palette)

| Step | Hex | CSS Token | Usage |
|---|---|---|---|
| 25 | `#F5FAFF` | `--color-blue-25` | Lightest tint |
| 50 | `#EFF8FF` | `--color-blue-50` | Hover backgrounds |
| 100 | `#D1E9FF` | `--color-blue-100` | Light badges |
| 200 | `#B2DDFF` | `--color-blue-200` | — |
| 300 | `#84CAFF` | `--color-blue-300` | — |
| 400 | `#53B1FD` | `--color-blue-400` | — |
| 500 | `#2E90FA` | `--color-blue-500` | Accent links |
| 600 | `#1570EF` | `--color-blue-600` | Interactive states |
| 700 | `#175CD3` | `--color-blue-700` | Transparent button text |
| 800 | `#1849A9` | `--color-primary-bg` | **Primary button default** |
| 900 | `#194185` | `--color-primary-bg-hover` | Primary button hover |
| 950 | `#102A56` | `--color-primary-bg-pressed` | Primary button pressed |

#### Secondary — Indigo

| Step | Hex | Usage |
|---|---|---|
| 25–50 | `#F5F8FF` / `#EEF4FF` | Background tints |
| 500 | `#6172F3` | Accent tags, selected states |
| 700 | `#3538CD` | Strong accent |
| 800 | `#2D31A6` | Deep indigo |

#### Semantic Status Colors

| Name | Default | Token | Usage |
|---|---|---|---|
| **Success** | `#17B26A` (500) / `#067647` (700) | — | Success states, positive trends |
| **Warning** | `#F79009` (500) / `#DC6803` (600) | — | Warnings, caution alerts |
| **Error** | `#F04438` (500) / `#D92D20` (600) | — | Errors, destructive actions |
| **Info** | `#2E90FA` (500) | — | Informational banners |

#### Gray Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-gray-50` | `#f9fafb` | Page background, disabled surface |
| `--color-gray-100` | `#f3f4f6` | Neutral button bg, content area |
| `--color-gray-200` | `#e5e7eb` | Borders, hover bg, dividers |
| `--color-gray-300` | `#d1d5db` | Disabled borders, neutral pressed |
| `--color-gray-400` | `#9ca3af` | Placeholder text |
| `--color-gray-500` | `#6b7280` | Secondary text, labels |
| `--color-gray-600` | `#4b5563` | Muted body text |
| `--color-gray-700` | `#374151` | Strong body text |
| `--color-gray-800` | `#1f2937` | Headings on light background |
| `--color-gray-900` | `#111827` | Primary headings, high contrast |

#### Semantic Surface & Text Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-surface` | `#ffffff` | Page / card background |
| `--color-border` | `#e5e7eb` | Dividers, outlines |
| `--color-neutral-text` | `#000b36` | Default label text |
| `--color-disabled-bg` | `#d2d6db` | Any disabled surface |
| `--color-disabled-text` | `#6c7c96` | Any disabled label |
| `--focus-ring-color` | `#1849a9` | Inner focus ring |
| `--focus-outline-color` | `#ffffff` | Outer focus ring |

#### Button Semantic Colors

| Variant | Default BG | Hover BG | Pressed BG | Text |
|---|---|---|---|---|
| Primary | `#1849a9` | `#194185` | `#102a56` | `#f9fafb` |
| Neutral | `#f3f4f6` | `#e5e7eb` | `#d2d6db` | `#000b36` |
| Secondary-Solid | `rgba(24,73,169,0.20)` | `rgba(24,73,169,0.10)` | — | `#1849a9` |
| Transparent | — | — | — | `#175cd3` (hover: `#1570ef`) |
| Danger-Primary | `#a30000` | — | — | `#f9fafb` |
| Danger-Secondary | `#fcdad7` | `#f8bab5` | `#f3908a` | `#a30000` |
| Disabled (any) | `#d2d6db` | — | — | `#6c7c96` |

---

### 2.2 Typography

**Font Family:** `IBM Plex Sans Arabic` — covers both LTR and RTL scripts natively.
**CSS Token:** `--font-sans: 'IBM Plex Sans Arabic', system-ui, 'Segoe UI', sans-serif;`

#### Type Scale (Desktop)

| Step | Font Size | Line Height | Tracking | Usage |
|---|---|---|---|---|
| Display 2xl | 72px / 4.5rem | 90px | −2% | Hero headings, landing page titles |
| Display xl | 60px / 3.75rem | 72px | −2% | Section headings, feature titles |
| Display lg | 48px / 3rem | 60px | −2% | Page titles, primary headings |
| Display md | 36px / 2.25rem | 44px | −2% | Sub-page titles, card headings |
| Display sm | 30px / 1.875rem | 38px | — | Section sub-headings |
| Display xs | 24px / 1.5rem | 32px | — | Sidebar headings, panel titles |
| Text xl | 20px / 1.25rem | 30px | — | Large body, intro paragraphs |
| Text lg | 18px / 1.125rem | 28px | — | Subheadings, card descriptions |
| Text md | 16px / 1rem | 24px | — | Default body, accordion header, button lg |
| Text sm | 14px / 0.875rem | 20px | — | Labels, form fields, button sm/md |
| Text xs | 12px / 0.75rem | 18px | — | Captions, badges, helper text |
| Text xxs | 12px / 0.75rem | 18px | — | Smallest legal / tooltip text |

#### Font Weights

| Token | Value | Name | Usage |
|---|---|---|---|
| `--font-weight-regular` | 400 | Regular | Body text, content panels, descriptions |
| `--font-weight-medium` | 500 | Medium | Button labels, interactive text |
| `--font-weight-semibold` | 600 | Semibold | Accordion headers, section headings |
| `--font-weight-bold` | 700 | Bold | Strong emphasis, data callouts, critical labels |

---

### 2.3 Spacing

Base unit: **4px grid**. All steps are multiples of 4px (from xs upward).

| Figma Token | Pixels | CSS Token | Usage |
|---|---|---|---|
| `spacing-none` | 0px | — | Reset padding or gap |
| `spacing-xxs` | 2px | — | Tiny nudge, divider offset |
| `spacing-xs` | 4px | `--space-1` | Icon gap, badge padding |
| `spacing-sm` | 6px | — | Tight label gap |
| `spacing-md` | 8px | `--space-2` | Button internal gap |
| `spacing-lg` | 12px | `--space-3` | Button padding sm/md |
| `spacing-xl` | 16px | `--space-4` | Card padding, accordion h-padding |
| `spacing-2xl` | 20px | `--space-5` | Section inner gap |
| `spacing-3xl` | 24px | `--space-6` | Accordion content pb, panel gap |
| `spacing-4xl` | 32px | `--space-8` | Panel padding |
| `spacing-5xl` | 40px | — | Large section gap |
| `spacing-6xl` | 48px | `--space-12` | Accordion content pe |
| `spacing-7xl` | 64px | — | Page section vertical rhythm |
| `spacing-8xl` | 80px | — | Hero vertical padding |
| `spacing-9xl` | 96px | — | Page top margin |
| `spacing-10xl` | 128px | — | Full-width section gap |

---

### 2.4 Border Radius

| Figma Token | Pixels | CSS Token | Usage |
|---|---|---|---|
| `radius-none` | 0px | — | Sharp corners — data tables, code blocks |
| `radius-xs` | 2px | `--radius-sm` | Code badges, small tags |
| `radius-sm` | 4px | `--radius-md` | **Default** — buttons, inputs, dropdowns, accordion |
| `radius-md` | 8px | `--radius-lg` | Cards, tooltips, popovers |
| `radius-lg` | 16px | — | Modals, drawers, section containers |
| `radius-xl` | 24px | — | Large floating panels, feature cards |
| `radius-full` | 9999px | `--radius-full` | Pills, avatar rings, toggle switches |

---

### 2.5 Shadows

All values sourced directly from Figma effect styles. Never invent custom shadow values.

| Token | CSS `box-shadow` Value | Usage |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgba(16,24,40,.05)` | Subtle lift, input fields |
| `shadow-sm` | `0 1px 3px 0 rgba(16,24,40,.10), 0 1px 2px 0 rgba(16,24,40,.06)` | Cards default |
| `shadow-md` | `0 4px 8px -2px rgba(16,24,40,.10), 0 2px 4px -2px rgba(16,24,40,.06)` | Dropdowns, tooltips |
| `shadow-lg` | `0 12px 16px -6px rgba(16,24,40,.08), 0 4px 6px -2px rgba(16,24,40,.03)` | Modals, panels |
| `shadow-xl` | `0 20px 24px -4px rgba(16,24,40,.08), 0 8px 8px -4px rgba(16,24,40,.03)` | Drawer, large overlays |
| `shadow-2xl` | `0 24px 48px -12px rgba(16,24,40,.18)` | Full-screen overlay scrim |
| `shadow-3xl` | `0 32px 64px -12px rgba(16,24,40,.14)` | Hero banners, marketing cards |

#### Backdrop Blur

| Token | CSS Value | Usage |
|---|---|---|
| `backdrop-blur-sm` | `backdrop-filter: blur(4px)` | Subtle glass tint |
| `backdrop-blur-md` | `backdrop-filter: blur(8px)` | Tooltip backgrounds, overlays |
| `backdrop-blur-lg` | `backdrop-filter: blur(12px)` | Sidebar / drawer panels |
| `backdrop-blur-xl` | `backdrop-filter: blur(20px)` | Full-screen modal scrims |

#### Transitions

| Token | Value |
|---|---|
| `--transition-fast` | `120ms ease` |
| `--transition-base` | `200ms ease` |

---

### 2.6 Grid System

**12-column layout grid.**

| Breakpoint | Viewport | Columns | Gutter | Margin |
|---|---|---|---|---|
| Mobile | < 768px | 4 | 16px | 16px |
| Tablet | 768px–1279px | 8 | 24px | 24px |
| Desktop | ≥ 1280px | 12 | 32px | 48px |

---

### 2.7 Breakpoints

| Name | Min Width | Use For |
|---|---|---|
| `sm` | 640px | Small tablets, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, small desktops |
| `xl` | 1280px | Standard desktop |
| `2xl` | 1440px | Wide desktop |

---

## 3. Components Library

> **Rule:** If a component exists in this list, **never create a new one**. Reuse with props.

---

### 3.1 Accordion

**Purpose:** Progressively disclose large amounts of content in a small space.

**Variants:** `single` (one item open at a time) · `multiple` (any number open)

**Sizes:** `lg` (56px header) · `md` (48px header) · `sm` (40px header)

**States:** Default · Hover · Focused · Disabled · Expanded · Collapsed

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'single' \| 'multiple'` | `'single'` | Expansion behavior |
| `size` | `'lg' \| 'md' \| 'sm'` | `'lg'` | Header height |
| `iconAlignment` | `'trailing' \| 'leading'` | `'trailing'` | Chevron position |
| `flush` | `boolean` | `false` | Remove borders for edge-to-edge placement |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `items` | `array` | — | Array of `{ title, content }` objects |

**Usage Rules:**
- Use for FAQ sections, settings panels, and content-heavy sidebars.
- Default to `single` type unless the user must compare multiple expanded items simultaneously.
- Always provide meaningful `title` text — no empty accordions.

**Do's:**
- ✅ Use for progressive disclosure of secondary content.
- ✅ Set `iconAlignment="leading"` for navigation-style lists.
- ✅ Use `flush` when inside a card with its own padding.

**Don'ts:**
- ❌ Don't nest accordions inside accordions.
- ❌ Don't use for primary content that users always need to see.
- ❌ Don't disable accordion items without explaining why.

---

### 3.2 Avatar

**Purpose:** Represent a user, team, or entity visually.

**Variants:** Image · Initials · Icon fallback

**Sizes:** `xs` · `sm` · `md` · `lg` · `xl` · `2xl`

**States:** Default · Online · Offline · Busy · Away

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL |
| `initials` | `string` | — | Fallback 1–2 character initials |
| `size` | `string` | `'md'` | Avatar size |
| `status` | `string` | — | Presence indicator |

**Do's:** ✅ Always provide initials as fallback when using image src.
**Don'ts:** ❌ Don't show avatars without a fallback state.

---

### 3.3 Breadcrumb

**Purpose:** Show the user's location within the product hierarchy.

**Variants:** Text only · With icons

**States:** Default · Active (last item)

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `items` | `array` | Array of `{ label, href }` — last item is current page |
| `dir` | `'ltr' \| 'rtl'` | Text direction |

**Do's:** ✅ Always show the current page as the last non-linked item.
**Don'ts:** ❌ Don't show more than 4 levels without truncation.

---

### 3.4 Button

**Purpose:** Trigger primary, secondary, and destructive actions.

**Variants:**
- `primary` — Main CTA, filled blue
- `neutral` — Secondary action, light gray
- `secondary-solid` — Tinted secondary
- `transparent` — Ghost / link-style
- `danger` — Destructive primary (red)
- `danger-secondary` — Destructive secondary (light red)

**Sizes:** `sm` (24px height) · `md` (32px height) · `lg` (40px height)

**States:** Default · Hover · Pressed · Focused · Disabled · Loading

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | enum | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Button height |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Shows spinner, blocks click |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `iconOnly` | `boolean` | `false` | Square icon button |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `leadIcon` | `node` | — | Leading icon slot |
| `trailIcon` | `node` | — | Trailing icon slot |

**Focus Ring:** Double box-shadow — no `outline`:
```css
box-shadow: 0 0 0 2px #1849a9, 0 0 0 5px #ffffff;
```

**Disabled State:** Use dedicated tokens — never opacity:
```css
background-color: var(--color-disabled-bg);  /* #d2d6db */
color: var(--color-disabled-text);           /* #6c7c96 */
cursor: not-allowed;
pointer-events: none;
```

**Usage Rules:**
- Use only one `primary` button per page section.
- `danger` is for irreversible destructive actions only (delete, revoke).
- Always set `aria-label` on `iconOnly` buttons.

**Do's:**
- ✅ Pair a primary + neutral button for form actions (Submit / Cancel).
- ✅ Use `loading` state during async operations to prevent double-click.
- ✅ Use `lg` size for primary CTAs, `md` for secondary, `sm` for dense UIs.

**Don'ts:**
- ❌ Don't use more than 3 buttons in a single row.
- ❌ Don't use `danger` variant for warning-level actions.
- ❌ Don't nest buttons inside other interactive elements.

---

### 3.5 Card

**Purpose:** Contain related content and actions within a distinct visual container.

**Types:**
- `default` — Static content card
- `expandable` — Card with expand/collapse toggle
- `selectable` — Card that can be selected like a radio/checkbox

**Effects:** `With Shadow` · `No Shadow` · `Stroke`

**States:** Default · Hover · Focused · Disabled · Expanded · Selected

**Size:** 360 × 228px (Default/Expandable) · 360 × 164px (Selectable)

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `type` | `'default' \| 'expandable' \| 'selectable'` | Card behavior |
| `state` | `'default' \| 'hover' \| 'focused' \| 'disabled'` | Interaction state |
| `shadow` | `boolean` | Enable shadow effect |
| `stroke` | `boolean` | Enable border stroke |
| `image` | `boolean` | Show image slot at top |
| `featuredIcon` | `boolean` | Show featured icon |
| `selected` | `boolean` | Selected state (selectable type) |
| `expanded` | `boolean` | Expanded state (expandable type) |
| `showTitle` | `boolean` | Show title text |
| `showDescription` | `boolean` | Show description text |
| `showTags` | `boolean` | Show tag chips |
| `showRating` | `boolean` | Show star rating |
| `showActions` | `boolean` | Show action buttons |
| `dir` | `'ltr' \| 'rtl'` | Text direction |

**Do's:** ✅ Use `selectable` type for option-choosing UIs (plan selection, filter presets).
**Don'ts:** ❌ Don't apply both `shadow` and `stroke` simultaneously.

---

### 3.6 Carousel

**Purpose:** Display a collection of items in a horizontally scrollable container.

**States:** Default · Active indicator · Navigation hover

**Do's:** ✅ Always show navigation arrows and dot indicators.
**Don'ts:** ❌ Don't auto-play without user control — causes accessibility issues.

---

### 3.7 Checkbox

**Purpose:** Allow multi-selection from a list of options.

**States:** Unchecked · Checked · Indeterminate · Disabled

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `checked` | `boolean` | Checked state |
| `indeterminate` | `boolean` | Partial selection state |
| `disabled` | `boolean` | Disabled state |
| `label` | `string` | Accessible label |
| `dir` | `'ltr' \| 'rtl'` | Text direction |

**Do's:** ✅ Use `indeterminate` for "select all" when some items are selected.
**Don'ts:** ❌ Don't use checkboxes for mutually exclusive choices — use Radio.

---

### 3.8 Chip (Tag/Chip)

**Purpose:** Display compact interactive or descriptive labels for filtering, categorization, or status.

**Variants:** Default · Selected · Dismissible

**States:** Default · Hover · Selected · Disabled

**Do's:** ✅ Use for active filter chips in filter panels.
**Don'ts:** ❌ Don't use chips as primary navigation.

---

### 3.9 Circular Stepper

**Purpose:** Guide users through a multi-step process with a circular progress indicator.

**States:** Incomplete · Active · Complete · Error

**Do's:** ✅ Use for short, ordered workflows (onboarding, setup wizards).

---

### 3.10 Color Input

**Purpose:** Allow users to select or input color values.

**Variants:** Hex input · Color picker

**States:** Default · Focused · Disabled

---

### 3.11 Command (Command Palette)

**Purpose:** Provide keyboard-first global search and action execution.

**States:** Open · Focused · Active result · Empty

**Keyboard:** `⌘K` / `Ctrl+K` to open · `↑↓` to navigate · `Enter` to select · `Esc` to close

**Do's:** ✅ Include all major actions and navigation routes in the command palette.
**Don'ts:** ❌ Don't show more than 8 results without a "show more" trigger.

---

### 3.12 Content Switcher

**Purpose:** Toggle between two or more mutually exclusive content views.

**States:** Default · Selected · Hover · Disabled

**Usage Rules:**
- Use for view toggles (Table / Grid, Chart / Data, LTR / RTL).
- Maximum 4 options — use Tabs for more.

**Do's:** ✅ Always have one option selected by default.
**Don'ts:** ❌ Don't use for navigation between pages — use Tabs or Sidebar.

---

### 3.13 Date Picker

**Purpose:** Allow users to select single dates or date ranges.

**Modes:** `single` · `range`

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `inline` | `boolean` | `false` | Show calendar without trigger field |
| `showInputField` | `boolean` | `true` | Show date display fields |
| `dualMonth` | `boolean` | `false` | Two-month side-by-side view |
| `showQuickOptions` | `boolean` | `false` | Shortcut sidebar (Today, Last 7 Days…) |
| `showSubmitButton` | `boolean` | `false` | Apply / Cancel actions |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction (calendar mirrors in RTL) |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |

**Do's:**
- ✅ Use `range` mode for report date filters.
- ✅ Use `showQuickOptions` for analytics dashboards (Last 7 Days, This Month).
- ✅ Use `dualMonth` for range selection to reduce navigation.

**Don'ts:**
- ❌ Don't allow future dates when selecting birth dates.
- ❌ Don't use for year-only selection — use a separate dropdown.

---

### 3.14 Divider

**Purpose:** Visually separate content sections.

**Variants:** Horizontal · Vertical

**Do's:** ✅ Use sparingly — only when whitespace alone is insufficient.
**Don'ts:** ❌ Don't use consecutive dividers.

---

### 3.15 Dropdown Input

**Purpose:** Allow users to select one option from a collapsible list.

**States:** Default · Open · Selected · Focused · Disabled · Error

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `options` | `array` | Array of `{ label, value }` options |
| `value` | `string` | Selected value |
| `placeholder` | `string` | Placeholder text |
| `disabled` | `boolean` | Disabled state |
| `error` | `boolean` | Error state |
| `dir` | `'ltr' \| 'rtl'` | Text direction |

**Do's:** ✅ Use for 5+ options. Use Radio for 2–4 options.
**Don'ts:** ❌ Don't use for boolean choices — use Switch or Checkbox.

---

### 3.16 Empty State

**Purpose:** Inform users when there is no content to display and guide next steps.

**Icon Types:** `featured-icon` · `illustration` · `file-type-icon`

**Illustration Styles:** Cloud · Box · Documents · Credit Card

**Sizes:** `sm` · `md` · `lg`

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `iconType` | enum | Type of visual indicator |
| `illustrationStyle` | enum | Shape when using illustration |
| `size` | `'sm' \| 'md' \| 'lg'` | Component size |
| `rtl` | `boolean` | RTL layout |
| `title` | `string` | Main heading |
| `description` | `string` | Supporting text |
| `primaryLabel` | `string` | Primary action button label |
| `secondaryLabel` | `string` | Secondary action button label |
| `showArrow` | `boolean` | Show directional arrow hint |

**Usage Rules:**
- Always provide a primary action when the user can create or add content.
- Use `illustration` for main page empty states, `featured-icon` for widget-level.

---

### 3.17 Featured Icons

**Purpose:** Display prominent icon indicators for status, category, or alerts.

**Variants:** Color-filled · Outline · Ghost

**Sizes:** `sm` · `md` · `lg` · `xl`

**Colors:** Primary · Gray · Error · Warning · Success

---

### 3.18 File Upload

**Purpose:** Allow users to upload files via drag-and-drop or file browser.

**States:** Default · Drag-over · Uploading · Success · Error

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `accept` | `string` | Accepted file types (MIME) |
| `multiple` | `boolean` | Allow multiple file selection |
| `maxSize` | `number` | Max file size in bytes |

**Do's:** ✅ Always display accepted file types and size limits.
**Don'ts:** ❌ Don't allow upload without showing progress feedback.

---

### 3.19 Filtration

**Purpose:** Enable users to filter data sets through a structured panel.

**Variants:** Inline panel · Sidebar panel · Dropdown

**States:** Default · Applied (with active count badge)

**Do's:** ✅ Show active filter count badge when filters are applied.
**Don'ts:** ❌ Don't hide the "Clear All" action when filters are applied.

---

### 3.20 Floating Button (FAB)

**Purpose:** Provide a persistent primary action accessible from anywhere on the screen.

**Variants:** Icon only · Icon + Label

**States:** Default · Hover · Pressed

**Do's:** ✅ Use one FAB per screen maximum.
**Don'ts:** ❌ Don't use FAB for secondary or destructive actions.

---

### 3.21 Inline Alert

**Purpose:** Display contextual feedback within a form or content section.

**Variants:** `Critical` · `Warning` · `Success` · `Info` · `Neutral`

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `variant` | enum | Alert severity and color |
| `dismissible` | `boolean` | Show close button |
| `title` | `string` | Bold alert label |
| `message` | `string` | Supporting message |
| `rtl` | `boolean` | RTL layout |

---

### 3.22 Links

**Purpose:** Navigate to another page or section.

**Variants:** Default · Visited · With icon

**States:** Default · Hover · Active · Visited · Disabled

**Do's:** ✅ Use descriptive link text — never "Click here" or "Read more".

---

### 3.23 Lists

**Purpose:** Display ordered or unordered content collections.

**Variants:** Bullet · Numbered · Checklist · Interactive (clickable rows)

---

### 3.24 Loading

**Purpose:** Indicate background processing or content fetching.

**Variants:** Spinner · Progress bar · Skeleton

**Do's:** ✅ Use Skeleton for content-loading states, Spinner for action-processing states.
**Don'ts:** ❌ Don't use Spinner for page-level loading — use Skeleton instead.

---

### 3.25 Menu

**Purpose:** Display a list of actions in a contextual popover.

**States:** Default · Hover · Selected · Disabled · Destructive

**Do's:** ✅ Group related actions with dividers. Place destructive actions at the bottom.
**Don'ts:** ❌ Don't put more than 8 items in a menu without grouping.

---

### 3.26 Metric (KPI Card)

**Purpose:** Display a single key performance indicator with trend visualization.

**Variants:**
- `Small Chart` — Compact KPI with mini sparkline
- `Large Chart` — Full KPI with larger chart area

**Chart Types:** `Realistic` · `Wavy` · `Straight` · `Layers`

**Trend:** `Positive` · `Negative`

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `variant` | `'Small Chart' \| 'Large Chart'` | Card size |
| `chartType` | enum | Sparkline style |
| `trend` | `'Positive' \| 'Negative'` | Trend direction |
| `labelEn` | `string` | English metric label |
| `labelAr` | `string` | Arabic metric label |
| `percentage` | `string` | Primary KPI value |
| `changePct` | `string` | Change percentage |
| `rtl` | `boolean` | RTL layout |
| `showChart` | `boolean` | Show sparkline |
| `showFeaturedIcon` | `boolean` | Show icon indicator |
| `showActions` | `boolean` | Show action buttons |

**KPI Token Values:**
```css
--component-charts-kpi-value-font-size:   32px;
--component-charts-kpi-value-font-weight: 600;
--chart-kpi-positive:                     #006121;
--chart-kpi-bg:                           rgba(0, 97, 33, 0.1);
```

---

### 3.27 Modal

**Purpose:** Display focused dialogs requiring user attention or action.

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `mobile` | `boolean` | `false` | Mobile layout (320px) vs desktop (600px) |
| `rtl` | `boolean` | `false` | RTL layout |
| `dismissible` | `boolean` | `true` | Show × close button |
| `showDescription` | `boolean` | `true` | Supporting description |
| `showActions` | `boolean` | `true` | Footer action buttons |
| `title` | `string` | — | Modal heading |
| `description` | `string` | — | Body text |
| `primaryActionLabel` | `string` | — | Primary button label |
| `secondaryActionLabel` | `string` | — | Secondary button label |
| `tertiaryActionLabel` | `string` | — | Tertiary/ghost button label |

**Usage Rules:**
- Close on: × button click · Backdrop click (if dismissible) · Esc key
- Always trap focus within the modal while open
- Restore focus to the trigger element on close

**Do's:** ✅ Limit to one primary action. ✅ Use brief, action-oriented titles.
**Don'ts:** ❌ Don't open a modal from within a modal. ❌ Don't use for notifications.

---

### 3.28 Notification

**Purpose:** Display system-level alerts and banners.

**Variants:** `Critical` · `Warning` · `Success` · `Info` · `Neutral`

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | enum | `'Critical'` | Visual severity |
| `dismissible` | `boolean` | `true` | Show dismiss button |
| `rtl` | `boolean` | `false` | RTL layout |
| `title` | `string` | — | Bold prefix label |
| `message` | `string` | — | Body message |

---

### 3.29 Notification Toast

**Purpose:** Display transient feedback messages that auto-dismiss.

**Variants:** `Critical` · `Warning` · `Success` · `Info` · `Neutral`

**Duration:** 4–6 seconds (configurable)
**Position:** Top-right (LTR) / Top-left (RTL)

**Do's:** ✅ Use for non-blocking confirmation of user actions.
**Don'ts:** ❌ Don't use for errors requiring user action — use Inline Alert or Modal.

---

### 3.30 Number Input

**Purpose:** Allow users to enter numeric values with increment/decrement controls.

**States:** Default · Focused · Disabled · Error

**Do's:** ✅ Set min/max/step constraints to prevent invalid values.

---

### 3.31 Pagination

**Purpose:** Navigate through multi-page datasets.

**Variants:** Numbered · Previous/Next only · With page size selector

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `totalItems` | `number` | Total record count |
| `pageSize` | `number` | Items per page |
| `currentPage` | `number` | Active page (1-indexed) |
| `dir` | `'ltr' \| 'rtl'` | Text direction |

**Do's:** ✅ Show total record count. ✅ Allow page size selection for power users.

---

### 3.32 Password Field

**Purpose:** Secure text input with show/hide toggle.

**States:** Default · Focused · Show · Hidden · Error · Disabled

**Do's:** ✅ Always include the show/hide toggle for usability.

---

### 3.33 Progress Bar

**Purpose:** Display the completion status of a task or process.

**Variants:** Determinate · Indeterminate

**Sizes:** `sm` · `md` · `lg`

**Colors:** Primary · Success · Warning · Error

---

### 3.34 Progress Stepper (Step Indicator)

**Purpose:** Guide users through a linear multi-step process.

**States:** Incomplete · Active · Complete · Error

**Variants:** Horizontal · Vertical

**Do's:** ✅ Show step count ("Step 2 of 5"). ✅ Allow navigation to completed steps.

---

### 3.35 Quote

**Purpose:** Highlight quoted text or testimonials.

**Variants:** Default · With attribution

---

### 3.36 Radio

**Purpose:** Allow single selection from a list of mutually exclusive options.

**States:** Unselected · Selected · Focused · Disabled

**Do's:** ✅ Use for 2–4 mutually exclusive options visible at once.
**Don'ts:** ❌ Don't use Radio for multi-select — use Checkbox.

---

### 3.37 Rating

**Purpose:** Collect or display star-based ratings.

**Range:** 0–5 stars, 0.5 increments

**States:** Default · Hover · Selected · Read-only · Disabled

---

### 3.38 Search Input

**Purpose:** Allow users to search and filter content.

**States:** Default · Focused · With value · Loading · Empty results

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `placeholder` | `string` | Search hint text |
| `value` | `string` | Current search value |
| `loading` | `boolean` | Loading indicator while searching |
| `dir` | `'ltr' \| 'rtl'` | Text direction |

**Do's:** ✅ Show loading spinner during async search. ✅ Debounce input by 300ms.

---

### 3.39 Sidebar

**Purpose:** Provide primary navigation and section switching.

**States:** Expanded · Collapsed · Item active · Item hover

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `items` | `array` | Navigation items |
| `collapsed` | `boolean` | Collapsed (icon-only) mode |
| `dir` | `'ltr' \| 'rtl'` | Text direction (mirrors in RTL) |

**Do's:** ✅ Persist sidebar state (expanded/collapsed) in local storage.

---

### 3.40 Skeleton

**Purpose:** Show loading placeholders matching the shape of content being fetched.

**Shapes:** Rectangle · Circle · Text line

**Do's:** ✅ Match the skeleton structure to the real content layout.
**Don'ts:** ❌ Don't show Skeleton for less than 300ms — causes unnecessary flicker.

---

### 3.41 Slider

**Purpose:** Allow users to select a value within a range.

**Variants:** Single handle · Range (two handles)

**States:** Default · Focused · Disabled

---

### 3.42 Slideout Menu (Drawer)

**Purpose:** Slide a panel from the edge of the screen for secondary content or actions.

**Positions:** Right (LTR) · Left (RTL) · Bottom (mobile)

**Do's:** ✅ Trap focus inside the open drawer. ✅ Allow Esc to close.

---

### 3.43 Switch (Toggle)

**Purpose:** Toggle a binary on/off setting.

**States:** Off · On · Focused · Disabled

**Do's:** ✅ Apply changes immediately without a submit button.
**Don'ts:** ❌ Don't use Switch for choices that require a save action.

---

### 3.44 Table

**Purpose:** Display structured tabular data with sorting, selection, and actions.

**Properties:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `compact` | `boolean` | `false` | Reduced row height |
| `alternatingRows` | `boolean` | `false` | Zebra striping |
| `contained` | `boolean` | `false` | Full-border container |
| `selectable` | `boolean` | `false` | Row checkbox selection |
| `rtl` | `boolean` | `false` | RTL layout |
| `emptyText` | `string` | — | Empty state message |

**States:** Default · Row hover · Row selected · Sorted column · Empty · Loading

**Do's:**
- ✅ Use `compact` for dense data dashboards.
- ✅ Always show column count and total row count.
- ✅ Pair Table with Filtration and Pagination components.

**Don'ts:**
- ❌ Don't show more than 10 columns without horizontal scroll.
- ❌ Don't use tables for non-tabular content.

---

### 3.45 Tabs

**Purpose:** Switch between related content sections within the same view.

**Variants:** Line tabs · Contained tabs · Vertical tabs

**States:** Default · Active · Hover · Disabled · With badge

**Do's:** ✅ Keep tab labels short (1–2 words). ✅ Show content count in badge.
**Don'ts:** ❌ Don't use Tabs for navigation between pages — use Sidebar.

---

### 3.46 Tags

**Purpose:** Display categorization labels or metadata attributes.

**Variants:** Default · Colored · Dismissible · With icon

**Sizes:** `sm` · `md` · `lg`

**Do's:** ✅ Use consistent colors for the same category across the product.

---

### 3.47 Text Input Field

**Purpose:** Accept single-line text input from users.

**Sizes:** `medium` · `large`

**Variants:** `default` · `filled-darker` · `filled-lighter`

**States:** Default · Hovered · Pressed · Focused · Read-only · Disabled · Error

**Properties:**

| Prop | Type | Description |
|---|---|---|
| `size` | `'medium' \| 'large'` | Input height |
| `state` | enum | Interaction state |
| `error` | `boolean` | Error state |
| `variant` | enum | Background style |
| `label` | `string` | Field label |
| `required` | `boolean` | Required indicator |
| `placeholder` | `string` | Placeholder text |
| `showHelperText` | `boolean` | Show helper/error message |
| `helperText` | `string` | Helper or error message |
| `showPrefix` | `boolean` | Show prefix slot |
| `prefixType` | `'dropdown' \| 'dropdown-icon' \| 'text'` | Prefix variant |

**Do's:** ✅ Always pair with a label. ✅ Show helper text for format requirements.
**Don'ts:** ❌ Don't use placeholder text as a substitute for labels.

---

### 3.48 Textarea

**Purpose:** Accept multi-line text input.

**States:** Default · Focused · Disabled · Error · Read-only

**Do's:** ✅ Set a minimum and maximum row height. ✅ Show character count for limits.

---

### 3.49 Time Picker

**Purpose:** Allow users to select a specific time.

**Variants:** 12-hour · 24-hour

**States:** Default · Open · Selected · Disabled

---

### 3.50 Tooltip

**Purpose:** Display brief contextual information on hover or focus.

**Positions:** Top · Bottom · Left · Right

**Token Values:**
```css
--chart-tooltip-bg:     #1a2236;
--chart-tooltip-text:   #ffffff;
--chart-tooltip-radius: 6px;
```

**Do's:** ✅ Use for icon-only buttons and truncated text.
**Don'ts:** ❌ Don't put interactive content inside tooltips. ❌ Don't duplicate visible text.

---

### 3.51 Tree

**Purpose:** Display hierarchical data in a collapsible tree structure.

**States:** Collapsed · Expanded · Selected · Focused · Disabled

**Do's:** ✅ Use for file explorers, org charts, and nested navigation.

---

### 3.52 Video Player

**Purpose:** Embed and control video playback.

**Controls:** Play/Pause · Volume · Seek · Fullscreen · Speed

---

### 3.53 UI Shell — Nav Header

**Purpose:** Top navigation bar with logo, search, and user actions.

**Properties:** `dir` (LTR/RTL), logo slot, action slots, search integration.

---

### 3.54 UI Shell — Nav Drawer

**Purpose:** Side navigation with collapsible sections and item hierarchy.

---

### 3.55 UI Shell — Second Level Nav Header

**Purpose:** Secondary navigation bar for sub-product or section switching.

---

### 3.56 UI Shell — Table of Contents (TOC)

**Purpose:** Anchor-based in-page navigation for long document pages.

---

### 3.57 UI Shell — Footer

**Purpose:** Persistent bottom bar with legal links and secondary navigation.

---

## 4. Forms

### 4.1 Text Input

See component [3.47 Text Input Field](#347-text-input-field).

**Validation Rules:**
- Required fields must show `*` in the label.
- Error messages appear below the field (never above).
- Error message replaces helper text — never show both simultaneously.
- Validate `onBlur` for format errors; validate `onChange` after first invalid attempt.

---

### 4.2 Select / Dropdown

See component [3.15 Dropdown Input](#315-dropdown-input).

**Validation Rules:**
- Show "Please select an option" error when submitted without selection.
- Pre-select the first option when it's always valid (e.g. country with a default).

---

### 4.3 Date Picker

See component [3.13 Date Picker](#313-date-picker).

**Validation Rules:**
- Show error when end date is before start date in range mode.
- Prevent past dates for future-only selections at the component level.

---

### 4.4 Textarea

See component [3.48 Textarea](#348-textarea).

**Validation Rules:**
- Show character count as `[used]/[max]` when limit is set.
- Turn character count red when approaching limit (< 10% remaining).

---

### 4.5 General Validation Rules

| Rule | Implementation |
|---|---|
| **Required fields** | Mark with `*`; validate on submit |
| **Inline errors** | Display below the input field in error state |
| **Error text** | Use `Text sm` / `#D92D20` color |
| **Helper text** | Use `Text sm` / `#6b7280` (gray-500) |
| **Success state** | Show green checkmark only when format is verified |
| **RTL validation** | Error messages must also mirror in RTL layout |
| **No submit without validity** | Disable submit button or show all errors on attempt |

---

## 5. Data Display

### 5.1 Tables

See component [3.44 Table](#344-table).

**Best Practices:**
- Use `compact` mode for dashboards where space is premium.
- Use `alternatingRows` for tables with more than 5 columns.
- Always include a table toolbar with: search, filter toggle, column count, and action buttons.
- Pair with Pagination for datasets > 20 rows.
- Show Empty State component when no rows match.

---

### 5.2 KPI Cards (Metric)

See component [3.26 Metric (KPI Card)](#326-metric-kpi-card).

**Best Practices:**
- Group related KPIs in a grid (max 4 per row on desktop, 2 on tablet, 1 on mobile).
- Always show trend direction (positive = green `#006121`, negative = red).
- Comparison period label ("vs last month") must be visible.

---

### 5.3 Metric Cards

- Use `Large Chart` variant for primary dashboard KPIs.
- Use `Small Chart` variant for secondary or widget-level KPIs.
- Always show the comparison label in both Arabic and English per layout direction.

---

### 5.4 Empty States

See component [3.16 Empty State](#316-empty-state).

**When to Use:**

| Context | Icon Type | Size |
|---|---|---|
| Main page, no data yet | Illustration | `lg` |
| Search returned no results | Featured Icon | `md` |
| Widget / panel has no data | Featured Icon | `sm` |
| Filtered results are empty | Featured Icon | `sm` |

---

### 5.5 Tooltips

See component [3.50 Tooltip](#350-tooltip).

**Content Rules:**
- Maximum 1–2 lines of text.
- No interactive elements (links, buttons) inside tooltip.
- Delay: 400ms before showing; dismiss immediately on mouse-out.

---

### 5.6 Badges / Tags

See component [3.46 Tags](#346-tags).

**Status Badges:**

| Status | Background | Text | Usage |
|---|---|---|---|
| Active / Success | `#DCFAE6` | `#067647` | Live, approved, completed |
| Warning | `#FEF0C7` | `#B54708` | Pending, review needed |
| Error / Critical | `#FEE4E2` | `#B42318` | Failed, rejected, error |
| Info | `#D1E9FF` | `#175CD3` | Informational, in-progress |
| Neutral | `#F3F4F6` | `#374151` | Draft, paused, archived |

---

## 6. Data Visualization

> **Source:** `src/components/charts/` — All charts use shared token system from `tokens.css`.
> **Chart Colors:** Series 1 `#1849a9` → Series 2 `#175cd3` → Series 3 `#2e90fa` → Series 4 `#53b1fd` → Series 5 `#b2ddff` → Series 6 `#d1e9ff`

---

### 6.1 Line Chart

**File:** `src/components/charts/LineChart/`
**When to Use:** Time-series data showing continuous trends over a period.

**Variants:**
- `line` — Standard straight lines
- `step` — Step-function changes (state transitions)
- `smooth` — Bezier curves for smoother visual flow

**Properties:** `title`, `subtitle`, `lineType`, `showKpi`, `rtl`, multiple series support

**Best Practices:**
- Maximum 4 series per chart to maintain readability.
- Always label axes — Y-axis on left (LTR), right (RTL).
- Use KPI badge to show the most recent value and trend.

**Accessibility:** Provide a data table alternative for screen reader users.

---

### 6.2 Area Chart

**File:** `src/components/charts/AreaChart/`
**When to Use:** Time-series data where cumulative volume matters (revenue, users over time).

**Best Practices:**
- Use filled area to emphasize volume, not just trend.
- Limit to 3 overlapping areas for legibility.
- Use opacity 30–50% for area fill to show overlapping series.

---

### 6.3 Vertical Bar Chart

**File:** `src/components/charts/VerticalBarChart/`
**When to Use:** Comparing discrete categories or time periods side by side.

**Best Practices:**
- Sort bars by value (descending) unless chronological order matters.
- Use for up to 12 categories — use horizontal bar for longer labels.
- Include data labels on bars for dense dashboards.

---

### 6.4 Horizontal Bar Chart

**File:** `src/components/charts/HorizontalBarChart/`
**When to Use:** Comparing items with long category labels or ranking lists.

**Best Practices:**
- Sort by value descending for rankings.
- Use for 5–15 items — paginate or truncate beyond that.
- Always start the x-axis at 0.

---

### 6.5 Donut Chart

**File:** `src/components/charts/DonutChart/`
**When to Use:** Part-to-whole relationships (market share, budget allocation).

**Center Value Tokens:**
```css
--component-charts-donut-center-value-font-size:   28px;
--component-charts-donut-center-value-font-weight: 700;
```

**Best Practices:**
- Maximum 6 segments — combine smaller segments into "Other".
- Always show center total value.
- Include a legend alongside the chart.
- Never use Donut for time-series data — use Line or Area.

---

### 6.6 Radar Chart

**File:** `src/components/charts/RadarChart/`
**When to Use:** Multi-dimensional comparison across several attributes (performance dimensions, skills matrix).

**Best Practices:**
- Use for 5–8 axes for best readability.
- Limit to 3 series maximum for clarity.

---

### 6.7 Heatmap Chart

**File:** `src/components/charts/HeatmapChart/`
**When to Use:** Activity density over a grid (calendar heatmap, correlation matrix).

**Best Practices:**
- Use sequential color scale from the DS chart palette.
- Always include a color scale legend.

---

### 6.8 Map Chart

**File:** `src/components/charts/MapChart/`
**When to Use:** Geographic distribution of data across regions.

**Best Practices:**
- Include tooltips with region name and value on hover.
- Provide a non-map table alternative for accessibility.

---

### 6.9 Risk Matrix

**File:** `src/components/charts/RiskMatrix/`
**When to Use:** Plotting risk items by likelihood vs impact (project risk management, decision analysis).

**Best Practices:**
- Use 5×5 grid with color zones: Low (green) → Medium (yellow) → High (red).
- Label each plotted item with a short identifier.

---

### 6.10 Chart Best Practices (All Types)

- **Always use chart tokens** — never hardcode chart colors.
- **KPI value always at 32px / 600 weight** using `--component-charts-kpi-value-font-size`.
- **Container padding:** `24px` (`--chart-container-padding`).
- **Border radius:** `8px` (`--chart-container-radius`).
- **Background:** `#ffffff` (`--chart-container-bg`).
- **Title color:** `#000b36` (`--chart-title`).
- **Subtitle/axis label color:** `#3c5073` (`--chart-subtitle`).
- **Grid line color:** `#f3f4f6` (`--chart-border`).
- **Tooltip:** Dark background `#1a2236` with white text.

### 6.11 Chart Accessibility Notes

- All charts must have an `aria-label` on the container.
- Provide a data table toggle below the chart for screen reader access.
- Never rely on color alone to distinguish data series — add patterns or labels.
- Tooltip must be keyboard-accessible (show on focus, not just hover).
- Chart titles and axis labels must pass 4.5:1 contrast ratio against the background.

---

## 7. Layout Patterns

### 7.1 Dashboard Layout

```
┌──────────────────────────────────────────┐
│  Nav Header (UI Shell)                   │
├──────────┬───────────────────────────────┤
│ Sidebar  │  Page Header (Title + Actions)│
│          ├───────────────────────────────┤
│          │  KPI Cards Row (4 columns)    │
│          ├───────────────────────────────┤
│          │  Charts Row (2 columns)       │
│          ├───────────────────────────────┤
│          │  Data Table                   │
└──────────┴───────────────────────────────┘
```

**Rules:**
- Sidebar width: 240px (expanded) / 64px (collapsed).
- Page content max-width: 1280px.
- KPI cards: 4-column grid on desktop, 2 on tablet, 1 on mobile.
- Use `spacing-4xl` (32px) between major sections.

---

### 7.2 Detail Page Layout

```
┌──────────────────────────────────────────┐
│  Nav Header                              │
├──────────┬───────────────────────────────┤
│ Sidebar  │  Breadcrumb                   │
│          │  Page Title + Status Badge    │
│          │  Tab Navigation               │
│          ├────────────────┬──────────────┤
│          │  Main Content  │ Side Panel   │
│          │  (8 cols)      │ (4 cols)     │
└──────────┴────────────────┴──────────────┘
```

---

### 7.3 Listing Page Layout

```
┌──────────────────────────────────────────┐
│  Nav Header                              │
├──────────┬───────────────────────────────┤
│ Sidebar  │  Page Title + "New" Button    │
│          │  Search + Filter Bar          │
│          │  Results Count + Sort         │
│          │  Table / Card Grid            │
│          │  Pagination                   │
└──────────┴───────────────────────────────┘
```

---

### 7.4 Filter Panel

- Default to collapsed (hidden) — reveal via filter button with active count badge.
- Filter panel opens as a side drawer (desktop) or bottom sheet (mobile).
- Always include: "Apply Filters" (Primary button) + "Clear All" (Transparent button).
- Show active filter chips above the results area after applying.

---

### 7.5 Side Panels (Slideout/Drawer)

- Width: 400px (default) / 600px (wide) on desktop; 100% on mobile.
- Open direction: Right (LTR) → Left (RTL), automatically mirrored.
- Always include a close button (× icon) in the panel header.
- Trap focus inside the open panel.
- Overlay the main content with a semi-transparent scrim (`backdrop-blur-md`).

---

### 7.6 Modals

- Centered on desktop, bottom sheet on mobile.
- Width: 600px (desktop) / 320px (mobile).
- Maximum content height: 80vh with internal scroll.
- Always include: Title + (optional) Description + Action buttons.
- Maximum 3 action buttons: Primary + Secondary + Tertiary.

---

## 8. Interaction Patterns

### 8.1 Loading States

| Context | Component | Duration Rule |
|---|---|---|
| Initial page load | Skeleton | Show immediately; hide when content ready |
| Action processing | Spinner (Button loading) | Show during async operation |
| Data table loading | Skeleton rows | Match row count of expected data |
| Chart loading | Skeleton chart | Use `--chart-skeleton: #e7e9ed` |
| Search results | Loading spinner below input | Show after 300ms debounce |

**Rules:**
- Never show both Skeleton and Spinner simultaneously.
- Minimum visible duration: 300ms (prevents flicker).
- Maximum wait before timeout error: 30 seconds.

---

### 8.2 Error States

| Error Type | Component | Action |
|---|---|---|
| Form field error | Inline text below field | Highlight in red, show error message |
| Page-level error | Inline Alert (Critical) | Persist until resolved |
| Toast error | Notification Toast (Critical) | Auto-dismiss after 6 seconds |
| Network/server error | Empty State with retry | Show retry button |
| 404 / Not found | Empty State | Redirect to home or parent page |

---

### 8.3 Success States

| Context | Component |
|---|---|
| Form submission | Toast (Success) — "Saved successfully" |
| File upload complete | Inline green checkmark + filename |
| Action completed | Toast (Success) with optional undo |
| Step completed | Progress Stepper step marked Complete |

---

### 8.4 Empty States

See Section [5.4 Empty States](#54-empty-states) for component usage.

**Interaction Rules:**
- Always provide a primary action (e.g., "Create your first project").
- Show a secondary action when a search/filter produced no results ("Clear search").
- Use `showArrow` to point toward the action button for onboarding-style empty states.

---

## 9. Accessibility Rules

### 9.1 Color Contrast

| Element | Minimum Ratio | Target |
|---|---|---|
| Body text on white | 4.5:1 (AA) | 7:1 (AAA) |
| Large text (18px+ regular / 14px+ bold) | 3:1 (AA) | 4.5:1 |
| Interactive UI components (borders) | 3:1 | — |
| Icons conveying meaning | 3:1 | 4.5:1 |
| Disabled elements | Exempt | — |

**Key pairs that pass AA:**
- `#000b36` on `#ffffff` = 19.7:1 ✅
- `#1849a9` on `#ffffff` = 7.4:1 ✅
- `#6b7280` on `#ffffff` = 4.6:1 ✅
- `#f9fafb` on `#1849a9` = 5.2:1 ✅ (primary button text)
- `#6c7c96` on `#d2d6db` = 2.9:1 ⚠️ (disabled — exempt)

---

### 9.2 Typography Accessibility

- Minimum body font size: **14px** (never go below `Text sm`).
- Line height minimum: **1.4× font size** — all DS tokens satisfy this.
- Never use ALL CAPS for body text — use `text-transform: uppercase` with `letter-spacing`.
- Do not use color alone to convey meaning in text.
- Maintain **RTL typographic rhythm** — never mirror font weight or size.

---

### 9.3 Keyboard Navigation

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus forward / backward |
| `Enter` / `Space` | Activate focused element |
| `Escape` | Close modal, dropdown, drawer |
| `Arrow Keys` | Navigate within component (menu, tabs, radio group) |
| `Home` / `End` | Jump to first/last item in a list |
| `⌘K` / `Ctrl+K` | Open Command Palette |

**Focus Ring:** All interactive elements must show the double box-shadow focus ring:
```css
outline: none;
box-shadow: 0 0 0 2px var(--focus-ring-color), 0 0 0 5px var(--focus-outline-color);
```

**Rules:**
- Focus must always be visible — never suppress `focus-visible`.
- Focus order must follow visual reading order (LTR: left-to-right; RTL: right-to-left).
- Modal / Drawer must trap focus while open.
- Toast notifications should not steal focus.

---

### 9.4 ARIA & Semantics

| Component | Required ARIA |
|---|---|
| Icon-only Button | `aria-label="[action name]"` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Sidebar Navigation | `role="navigation"`, `aria-label="Main navigation"` |
| Accordion | `aria-expanded`, `aria-controls` |
| Table | `aria-sort` on sortable columns |
| Loading | `aria-live="polite"` on the content container |
| Error message | `aria-live="assertive"` for real-time form errors |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"` |

---

## 10. Design Constraints

> These are hard rules. AI agents and developers must follow all of them without exception.

### Token Constraints

- ❌ **NEVER hardcode hex values** in component CSS. Use `var(--token-name)` only.
- ❌ **NEVER create new color tokens** without a corresponding Figma variable path comment.
- ❌ **NEVER create new typography sizes** outside the 12-step scale.
- ❌ **NEVER use raw `px` values** in component spacing. Use spacing tokens.
- ❌ **NEVER use `opacity`** for disabled states. Use `--color-disabled-bg` / `--color-disabled-text`.

### Component Constraints

- ❌ **NEVER create a new component** if one already exists in the library.
- ❌ **NEVER modify a component** to fix a one-off case — create a variant or compose with props.
- ❌ **NEVER use `!important`** in component CSS.
- ❌ **NEVER hardcode `font-family`** — always use `var(--font-sans)`.
- ❌ **NEVER use Unicode bullet characters** — use proper list elements or `LevelFormat.BULLET`.
- ❌ **NEVER open a modal from within a modal**.
- ❌ **NEVER show more than one primary button** per form/section.

### RTL Constraints

- ❌ **NEVER manually mirror layout** with negative margins — use `logical CSS properties` (`padding-inline-start`, `margin-inline-end`) or the `dir` prop.
- ❌ **NEVER flip icon content manually** unless the icon has semantic directionality (arrows, back buttons).
- ✅ **Always pass `dir="rtl"`** to components when in RTL context.

### Accessibility Constraints

- ❌ **NEVER suppress `focus-visible`** or set `outline: none` without the DS focus ring replacement.
- ❌ **NEVER use color alone** to convey meaning.
- ❌ **NEVER use placeholder text** as a label substitute.
- ❌ **NEVER auto-dismiss error messages** — only success and info toasts auto-dismiss.
- ✅ **Always set `aria-label`** on icon-only buttons.
- ✅ **Always trap focus** inside open modals and drawers.

### Chart Constraints

- ❌ **NEVER use more than 6 data series** in a single chart.
- ❌ **NEVER use custom colors** for chart series — use `--chart-series-1` through `--chart-series-6`.
- ❌ **NEVER use Donut chart** for time-series data.
- ❌ **NEVER omit axis labels** on bar or line charts.

---

## 11. AI Usage Guide

### Purpose

This guide defines how AI agents (Claude, Copilot, Cursor, Cline, Codex, etc.) should use the Masterteam Design System when generating UI code, Figma designs, Storybook stories, or documentation.

---

### Core Rules for AI Agents

1. **Search before creating.** Before generating any UI element, check this document and the component list. If it exists — use it.

2. **Use CSS tokens, never hex values.** Every color, spacing, radius, and shadow must reference a CSS custom property from `tokens.css`.

3. **IBM Plex Sans Arabic is the only font.** Never suggest or import another font family.

4. **RTL is required.** Every component implementation must include RTL support via the `dir` prop or CSS logical properties.

5. **Follow the component's Storybook props exactly.** Do not add undocumented props. Do not restructure component APIs.

6. **Button hierarchy per section:** 1 primary, 1 secondary/neutral, 1 transparent/ghost. Never exceed this.

7. **Empty states are components.** Never render `null` or a plain text "No data" — use the `<EmptyState>` component.

8. **Loading states are components.** Use `<Skeleton>` for content loading, `loading` prop on Button for actions.

---

### Component Reuse Priority

When implementing any UI screen, follow this decision tree:

```
Does the DS have a component for this?
  ├── YES → Use it with props. Do not recreate.
  └── NO → Does a close variant exist?
            ├── YES → Extend via props/composition. Do not fork.
            └── NO → Check Figma file for an undocumented component.
                      ├── EXISTS → Document it, then implement.
                      └── NOT EXISTS → Create new (rare) + add to DS backlog.
```

---

### Implementation Order for New Screens

1. **Read this document** — identify which components are needed.
2. **Check Storybook** at `https://6a0780b6ea01e2c8d049c258-hdstoiscjh.chromatic.com/` — confirm props and variants.
3. **Import from the DS** — never copy-paste component code from the Storybook story into product code.
4. **Use layout patterns** from Section 7 — match Dashboard, Listing, or Detail page structure.
5. **Apply tokens** from `tokens.css` — no hardcoded values.
6. **Test RTL** — always verify the layout at `dir="rtl"`.
7. **Verify accessibility** — run through the ARIA and keyboard checklist in Section 9.

---

### Storybook as Source of Truth

The live Storybook at Chromatic is the authoritative reference for component behavior:
> `https://6a0780b6ea01e2c8d049c258-hdstoiscjh.chromatic.com/`

**When Figma and Storybook conflict:** Storybook takes precedence for implemented behavior; Figma takes precedence for visual design intent. Flag conflicts as mismatches.

**When this document and Storybook conflict:** Run `git pull` on `AlaaMahmoud389/DsMasterteam` and re-read the latest stories. This document may be outdated.

---

### Chart Implementation Checklist

For every chart:
- [ ] Container uses `--chart-container-bg`, `--chart-container-padding`, `--chart-container-radius`
- [ ] Series colors from `--chart-series-1` to `--chart-series-6` only
- [ ] Title: `--chart-title` (#000b36), Subtitle: `--chart-subtitle` (#3c5073)
- [ ] Tooltip: `--chart-tooltip-bg` (#1a2236) on dark, `--chart-tooltip-text` (#ffffff)
- [ ] KPI value: `32px / 600 weight` using `--component-charts-kpi-value-font-size`
- [ ] RTL: Axis labels and legend mirror correctly with `dir` prop
- [ ] Accessibility: `aria-label` on container, data table alternative available

---

### Quick Reference: Design System Links

| Resource | URL |
|---|---|
| Figma File | `https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/` |
| GitHub Repo | `https://github.com/AlaaMahmoud389/DsMasterteam` |
| Storybook / Chromatic | `https://6a0780b6ea01e2c8d049c258-hdstoiscjh.chromatic.com/` |
| Tokens CSS | `src/components/tokens.css` |
| Colors Doc | `src/foundations/colors/Colors.mdx` |
| Typography Doc | `src/foundations/typography/Typography.mdx` |
| Spacing / Grid Doc | `src/foundations/spacing/SpacingRadiusGrids.mdx` |
| Effects Doc | `src/foundations/effects/EffectStyles.mdx` |

---

*Document generated from: Figma `WTmRAkJVvw0IvZMA7wBdTC` + GitHub `AlaaMahmoud389/DsMasterteam` + Storybook/Chromatic · June 2025*
