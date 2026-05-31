import { useState } from 'react';
import styles from './Filtration.module.css';

// ── Figma assets — panel (node 4804:122722) ──────────────────────────────────
const ICON_SEARCH    = 'https://www.figma.com/api/mcp/asset/ac897a4e-efe0-48b0-8dfd-deb7d8cc4212';
const ICON_CHECK     = 'https://www.figma.com/api/mcp/asset/1c9b6215-01d4-49ea-b23a-d6ee448735e8';
const ICON_CHEVRON   = 'https://www.figma.com/api/mcp/asset/5a765383-48de-4887-877d-613ae82a5a31';
const ICON_TICK      = 'https://www.figma.com/api/mcp/asset/b1d53764-bafb-4352-aef4-3fe57c7f170f';
const ICON_RADIO_DOT = 'https://www.figma.com/api/mcp/asset/d56c2ce7-986b-436d-9ccb-9749df126b03';
const ICON_CHIP_X    = 'https://www.figma.com/api/mcp/asset/5e0daf8c-c46f-4ac7-9e6d-b2f0dc980f92';
const ICON_MINUS     = 'https://www.figma.com/api/mcp/asset/3e529565-90ed-4e04-99ba-1927d126ef1b';

// ── Figma assets — trigger / result state (node 4804:122763) ─────────────────
const ICON_FILTER_BTN     = 'https://www.figma.com/api/mcp/asset/7651d13c-1023-4f88-9af4-16d107e9b52a';
const ICON_ARROW_DOWN     = 'https://www.figma.com/api/mcp/asset/30748dca-5d6d-4d6b-a524-d9b381937313';
const ICON_CHIP_X_NEUTRAL = 'https://www.figma.com/api/mcp/asset/b6897afd-e47e-4900-9a19-a462f0da79cf';

// ── Default data ─────────────────────────────────────────────────────────────
const INIT_CB_OPTS = [
  { id: 1, label: 'Option', count: 22, checked: false },
  { id: 2, label: 'Option', count: 22, checked: true  },
  { id: 3, label: 'Option', count: 22, checked: true  },
];
const SINGLE_OPTS = [
  { id: 1, label: 'Option' },
  { id: 2, label: 'Option' },
  { id: 3, label: 'Option' },
  { id: 4, label: 'Option' },
  { id: 5, label: 'Option' },
];
const RADIO_OPTS = [
  { id: 1, label: 'Radio Label' },
  { id: 2, label: 'Radio Label' },
  { id: 3, label: 'Radio Label' },
  { id: 4, label: 'Radio Label' },
  { id: 5, label: 'Radio Label' },
];
const INIT_CHIPS = [
  { id: 1, label: 'Item' },
  { id: 2, label: 'Item Loooong' },
  { id: 3, label: 'Item' },
  { id: 4, label: 'Item' },
  { id: 5, label: 'Item Loooong' },
  { id: 6, label: 'Item Looong' },
  { id: 7, label: 'Item' },
  { id: 8, label: 'Item' },
];
const RATING_OPTS = [
  { id: 1, label: 'Highest (22)' },
  { id: 2, label: 'Lowest (22)'  },
];

// ── Icon helper ───────────────────────────────────────────────────────────────
// Matches Figma's 3-level pattern: outer container (px size) → inner inset div
// (percentage-based offset) → img (fills inner div 100%).
// insetY = top & bottom %, insetX = left & right % (Figma "inset-[Y%_X%]").
function FigmaIcon({ src, w = 20, h = 20, insetY = '0%', insetX = '0%', flip = false, style: extraStyle }) {
  return (
    <div style={{ position: 'relative', width: w, height: h, flexShrink: 0, overflow: 'hidden', ...extraStyle }}>
      <div style={{ position: 'absolute', top: insetY, right: insetX, bottom: insetY, left: insetX }}>
        <img
          src={src}
          alt=""
          style={{
            width: '100%', height: '100%',
            display: 'block', objectFit: 'contain',
            transform: flip ? 'scaleX(-1)' : undefined,
          }}
        />
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Divider() {
  return <div className={styles.divider} />;
}

function SectionLabel({ children }) {
  return <div className={styles.sectionLabel}>{children}</div>;
}

function OptionItem({ onClick, children, className }) {
  return (
    <div
      className={[styles.optionItem, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ── Filtration panel ──────────────────────────────────────────────────────────

export function Filtration({ rtl = false, onApply, onClear }) {
  const [cbOpts, setCbOpts]     = useState(INIT_CB_OPTS);
  const [cbSearch, setCbSearch] = useState('');
  const [singleSel, setSingleSel] = useState(1);
  const [radioSel, setRadioSel]   = useState(1);
  const [chips, setChips]         = useState(INIT_CHIPS);
  const [sliderLow,  setSliderLow]  = useState(20);
  const [sliderHigh, setSliderHigh] = useState(70);
  const [rangeMax, setRangeMax] = useState('10000');
  const [rangeMin, setRangeMin] = useState('10000');
  const [dateVal, setDateVal]   = useState('');
  const [ratingSel, setRatingSel] = useState(1);

  const checkedCount = cbOpts.filter(o => o.checked).length;
  const totalActive  = checkedCount + chips.length + 3;

  const filteredCbOpts = cbSearch
    ? cbOpts.filter(o => o.label.toLowerCase().includes(cbSearch.toLowerCase()))
    : cbOpts;

  const toggleCb   = (id) => setCbOpts(opts => opts.map(o => o.id === id ? { ...o, checked: !o.checked } : o));
  const removeChip = (id) => setChips(cs => cs.filter(c => c.id !== id));

  const SLIDER_MIN = 0, SLIDER_MAX = 100;
  const lowPct    = ((sliderLow  - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
  const highPct   = ((sliderHigh - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
  const progLeft  = Math.min(lowPct, highPct);
  const progWidth = Math.abs(highPct - lowPct);

  return (
    <div className={styles.panel} dir={rtl ? 'rtl' : undefined}>

      {/* ── 1. Multi-Select Checkbox ──────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 16 }}>
        <SectionLabel>
          Variant{' '}
          {checkedCount > 0 && (
            <span className={styles.labelCount}>({checkedCount} {checkedCount === 1 ? 'selection' : 'selections'})</span>
          )}
        </SectionLabel>

        {/* Search box — icon 20×20, inset 5.21% ≈ 18px visible area */}
        <div className={styles.searchBox}>
          <FigmaIcon src={ICON_SEARCH} w={20} h={20} insetY="5.21%" insetX="5.21%" flip />
          <input
            className={styles.searchInput}
            placeholder="Search"
            value={cbSearch}
            onChange={e => setCbSearch(e.target.value)}
            dir={rtl ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Checkbox options */}
        <div className={styles.optionsList}>
          {filteredCbOpts.map(opt => (
            <OptionItem key={opt.id} onClick={() => toggleCb(opt.id)}>
              {/* Checkbox — 16×16, checked: blue bg + checkmark fills inset-0 */}
              <div className={[styles.checkbox, opt.checked ? styles.checkboxChecked : ''].filter(Boolean).join(' ')}>
                {opt.checked && (
                  <img
                    src={ICON_CHECK}
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
                  />
                )}
              </div>
              <div className={styles.optionText}>
                {opt.label}{' '}
                <span className={styles.optionCount}>({opt.count})</span>
              </div>
            </OptionItem>
          ))}
        </div>

        {/* Show more — chevron 20×20, inset 34.38% / 21.88% → ~11×6px actual */}
        <button className={styles.showMoreBtn} type="button">
          Show 19 more
          <FigmaIcon src={ICON_CHEVRON} w={20} h={20} insetY="34.38%" insetX="21.88%" />
        </button>
      </div>

      <Divider />

      {/* ── 2. Single Select ─────────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 20 }}>
        <SectionLabel>Variant</SectionLabel>
        <div className={styles.optionsList}>
          {SINGLE_OPTS.map(opt => (
            <OptionItem key={opt.id} onClick={() => setSingleSel(opt.id)}>
              <div className={styles.optionText}>{opt.label}</div>
              {/* Tick — 20×20, inset 23.96% / 17.71% → ~13×10px actual */}
              {singleSel === opt.id && (
                <FigmaIcon src={ICON_TICK} w={20} h={20} insetY="23.96%" insetX="17.71%" />
              )}
            </OptionItem>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 3. Radio Button ──────────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 20 }}>
        <SectionLabel>Variant</SectionLabel>
        <div className={styles.optionsList}>
          {RADIO_OPTS.map(opt => (
            <OptionItem key={opt.id} onClick={() => setRadioSel(opt.id)} className={styles.optionItemNoGap}>
              {/* Radio — 32×32 wrapper, 24×24 ring, 16×16 inner dot */}
              <div className={styles.radioWrapper}>
                <div className={[styles.radioCircle, radioSel === opt.id ? styles.radioCircleChecked : ''].filter(Boolean).join(' ')} />
                {radioSel === opt.id && (
                  <img src={ICON_RADIO_DOT} alt="" className={styles.radioInner} />
                )}
              </div>
              <div className={styles.optionText}>{opt.label}</div>
            </OptionItem>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 4. Chips Multi-Select ────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 20 }}>
        <SectionLabel>Variant</SectionLabel>
        <div className={styles.chipsStack}>
          {chips.map(chip => (
            <div key={chip.id} className={styles.chip}>
              <span className={styles.chipText}>{chip.label}</span>
              {/* Chip X — explicit 14×14 in CSS class */}
              <img
                src={ICON_CHIP_X}
                alt="remove"
                className={styles.chipClose}
                onClick={() => removeChip(chip.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 5. Slider ────────────────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 20 }}>
        <SectionLabel>Variant</SectionLabel>
        <div className={styles.sliderRow}>
          <span className={styles.sliderValue}>{sliderHigh}</span>
          <div className={styles.sliderTrack}>
            <div
              className={styles.sliderProgress}
              style={{ left: `${progLeft}%`, width: `${progWidth}%` }}
            />
            <input
              type="range"
              min={SLIDER_MIN} max={SLIDER_MAX}
              value={sliderLow}
              onChange={e => setSliderLow(Number(e.target.value))}
              className={styles.sliderThumb}
            />
            <input
              type="range"
              min={SLIDER_MIN} max={SLIDER_MAX}
              value={sliderHigh}
              onChange={e => setSliderHigh(Number(e.target.value))}
              className={styles.sliderThumb}
            />
          </div>
          <span className={styles.sliderValue}>{sliderLow}</span>
        </div>
      </div>

      <Divider />

      {/* ── 6. Input Range ───────────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 20 }}>
        <SectionLabel>Variant</SectionLabel>
        <div className={styles.inputRangeRow}>
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>Max</div>
            <div className={styles.inputField}>
              <div className={styles.inputFieldText}>
                <input
                  type="text"
                  value={rangeMax}
                  onChange={e => setRangeMax(e.target.value)}
                  className={styles.inputNative}
                  dir={rtl ? 'rtl' : 'ltr'}
                />
              </div>
              <div className={styles.inputSuffix}>SAR</div>
            </div>
          </div>
          {/* Minus separator — 24×24, inset 46.88% / 13.54% → ~17×1.5px thin line */}
          <FigmaIcon
            src={ICON_MINUS}
            w={24} h={24}
            insetY="46.88%" insetX="13.54%"
            style={{ alignSelf: 'flex-end', marginBottom: 4 }}
          />
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>Min</div>
            <div className={styles.inputField}>
              <div className={styles.inputFieldText}>
                <input
                  type="text"
                  value={rangeMin}
                  onChange={e => setRangeMin(e.target.value)}
                  className={styles.inputNative}
                  dir={rtl ? 'rtl' : 'ltr'}
                />
              </div>
              <div className={styles.inputSuffix}>SAR</div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 7. Date ──────────────────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 16 }}>
        <SectionLabel>Date</SectionLabel>
        <input
          type="date"
          value={dateVal}
          onChange={e => setDateVal(e.target.value)}
          className={styles.dateInput}
          dir={rtl ? 'rtl' : 'ltr'}
        />
      </div>

      <Divider />

      {/* ── 8. Rating Text-Based ─────────────────────────────────────────── */}
      <div className={styles.section} style={{ gap: 20 }}>
        <SectionLabel>Variant</SectionLabel>
        <div className={styles.optionsList}>
          {RATING_OPTS.map(opt => (
            <OptionItem key={opt.id} onClick={() => setRatingSel(opt.id)}>
              <div className={styles.optionText}>{opt.label}</div>
              {ratingSel === opt.id && (
                <FigmaIcon src={ICON_TICK} w={20} h={20} insetY="23.96%" insetX="17.71%" />
              )}
            </OptionItem>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 9. Swap Placeholder ──────────────────────────────────────────── */}
      <div className={styles.swapPlaceholder}>
        <div className={styles.swapText}>
          SWAP WITH CONTENT COMPONENT
          <br />
          استبدل هذا العنصر بأي عنصر آخر
        </div>
      </div>

      {/* ── Scrollbar ────────────────────────────────────────────────────── */}
      <div className={styles.scrollbar} style={{ [rtl ? 'left' : 'right']: 0 }}>
        <div className={styles.scrollbarThumb} />
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className={styles.footer}>
        <button className={styles.applyBtn} type="button" onClick={onApply}>
          Apply Filters ({totalActive})
        </button>
        <button className={styles.clearBtn} type="button" onClick={onClear}>
          Clear Filter
        </button>
      </div>
    </div>
  );
}

// ── Filter Trigger — closed state showing the button + result chips ────────────
// Matches Figma node 4804:122763 "RTL=No, Open=No, Result=Yes".

const DEFAULT_RESULTS = ['Item', 'Item', 'Item'];

export function FilterTrigger({ rtl = false, results = DEFAULT_RESULTS, onFilterClick, onRemoveChip }) {
  return (
    <div className={styles.filterTrigger} dir={rtl ? 'rtl' : undefined}>
      {/* Blue filter button — filter icon 24×24 (inset 9.37%) + text + arrow 20×20 (inset 34.38%/21.88%) */}
      <button className={styles.filterBtn} type="button" onClick={onFilterClick}>
        <FigmaIcon src={ICON_FILTER_BTN} w={24} h={24} insetY="9.37%" insetX="9.38%" />
        <span className={styles.filterBtnText}>Filter</span>
        <FigmaIcon src={ICON_ARROW_DOWN} w={20} h={20} insetY="34.38%" insetX="21.88%" />
      </button>

      {/* Result chips — neutral style: rgba(31,42,55,0.05) bg, h-32, rounded-19 */}
      {results.length > 0 && (
        <div className={styles.resultChips}>
          {results.map((label, i) => (
            <button
              key={i}
              className={styles.resultChip}
              type="button"
              onClick={() => onRemoveChip?.(i)}
            >
              <span className={styles.resultChipText}>{label}</span>
              {/* Chip X — 18×18, inset 17.71% → ~11.6px actual */}
              <FigmaIcon src={ICON_CHIP_X_NEUTRAL} w={18} h={18} insetY="17.71%" insetX="17.71%" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
