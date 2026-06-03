import { useState } from 'react';
import styles from './Filtration.module.css';

// ── Icons — Figma Masterteam DS · HugeIcons Stroke Rounded · node 4804:122666 ─
// SVG originals saved at: src/assets/icons/filtration/{filter,arrow-down,cancel}.svg

const FilterIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 4H22L14.5 12V19L9.5 21V12L2 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = ({ color = 'currentColor', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 7.5L10 12.5L15 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CancelIcon = ({ color = 'currentColor', size = 18, className, onClick }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
    <path d="M4 4L14 14M14 4L4 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = ({ color = '#6c7c96' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="5.5" stroke={color} strokeWidth="1.5"/>
    <path d="M13 13L17 17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5L6 11.5L13 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TickIcon = ({ color = '#1849a9' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 10.5L8 14L16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

        {/* Search box */}
        <div className={styles.searchBox}>
          <SearchIcon />
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
              <div className={[styles.checkbox, opt.checked ? styles.checkboxChecked : ''].filter(Boolean).join(' ')}>
                {opt.checked && (
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckmarkIcon />
                  </span>
                )}
              </div>
              <div className={styles.optionText}>
                {opt.label}{' '}
                <span className={styles.optionCount}>({opt.count})</span>
              </div>
            </OptionItem>
          ))}
        </div>

        {/* Show more */}
        <button className={styles.showMoreBtn} type="button">
          Show 19 more
          <ChevronDownIcon size={16} />
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
              {singleSel === opt.id && <TickIcon />}
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
              <div className={styles.radioWrapper}>
                <div className={[styles.radioCircle, radioSel === opt.id ? styles.radioCircleChecked : ''].filter(Boolean).join(' ')} />
                {radioSel === opt.id && (
                  <svg
                    width="10" height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    <circle cx="5" cy="5" r="5" fill="#1849a9"/>
                  </svg>
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
              <CancelIcon
                color="#1849a9"
                size={14}
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
          <svg
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ alignSelf: 'flex-end', marginBottom: 4, flexShrink: 0 }}
          >
            <path d="M5 12H19" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
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
              {ratingSel === opt.id && <TickIcon />}
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
// Matches Figma node 4804:122666 / 4804:122763 "RTL=No, Open=No, Result=Yes"

const DEFAULT_RESULTS = ['Item', 'Item', 'Item'];

export function FilterTrigger({ rtl = false, results = DEFAULT_RESULTS, onFilterClick, onRemoveChip }) {
  return (
    <div className={styles.filterTrigger} dir={rtl ? 'rtl' : undefined}>
      {/* Blue filter button: filter icon + label + chevron */}
      <button className={styles.filterBtn} type="button" onClick={onFilterClick}>
        <FilterIcon color="white" />
        <span className={styles.filterBtnText}>Filter</span>
        <ChevronDownIcon color="white" />
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
              <CancelIcon color="#6b7280" size={16} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
