import styles from './EmptyState.module.css';
import { Button } from '../Button/Button';

// ─── Background pattern assets — Featured icon (node 4770:11221) ──────────────
const BG_CIRCLES_MASK_FI = 'https://www.figma.com/api/mcp/asset/06610907-31e9-420e-8c06-df4430ba84da';
const BG_CIRCLES_IMG_FI  = 'https://www.figma.com/api/mcp/asset/8ce214df-41d7-4526-91e7-ba9bd92d59d5';

// ─── Background pattern assets — Grid lines / Illustration (node 4770:11188) ──
const BG_GRID_MASK = 'https://www.figma.com/api/mcp/asset/e008e79f-1ba7-40a2-854a-8df6ca4833cc';
const BG_GRID_V    = 'https://www.figma.com/api/mcp/asset/16d3c8d3-1254-4ccb-a00c-f0b4815027f3';
const BG_GRID_H    = 'https://www.figma.com/api/mcp/asset/512902f2-4e7e-4e3d-a637-2d322a5cb89d';

// ─── Background pattern assets — File type icon (node 4770:11152) ─────────────
const BG_CIRCLES_MASK_FT = 'https://www.figma.com/api/mcp/asset/b16ad6aa-d277-462d-83ac-f7259401277c';
const BG_CIRCLES_IMG_FT  = 'https://www.figma.com/api/mcp/asset/391ca1f1-92e4-4e87-967d-3d711bf1e2fd';

// ─── Featured icon — search-lg (node 4770:11221) ──────────────────────────────
export const SEARCH_ICON = 'https://www.figma.com/api/mcp/asset/963743f9-e50f-4a98-8f5f-ec798b136861';

// ─── File type icon assets (node 4770:11152) ──────────────────────────────────
// imgPage = blue file-page shape; imgIconWrap = folder icon layered on top
const FILE_PAGE     = 'https://www.figma.com/api/mcp/asset/7f208d3f-be13-4344-92b2-baa66dd71230';
const FILE_BOOKMARK = 'https://www.figma.com/api/mcp/asset/90bf9cc8-dd45-4742-a8ad-8d8081af895a';

// ─── Primary button arrow — arrow-right-02-sharp (node 4796:19877) ────────────
// Figma renders with -rotate-90 -scale-x-100 → CSS: rotate(-90deg) scaleX(-1)
const BTN_ARROW = 'https://www.figma.com/api/mcp/asset/5222e1d6-db0e-43da-9b6f-5b7df5e7c468';

// ─── Illustration Cloud sm (node 4770:11408) ──────────────────────────────────
const ILLUS_SM = {
  w: 152, h: 118,
  bgCircle:   'https://www.figma.com/api/mcp/asset/1d8b88cb-cf8a-49db-a787-12dad9fe333b',
  cloud:      'https://www.figma.com/api/mcp/asset/9e0a4b4f-33c2-41fc-95e7-cf00321f4bcb',
  dot10:      'https://www.figma.com/api/mcp/asset/977f9102-fc9e-455e-ad86-93f0027c9a9a',
  dot14:      'https://www.figma.com/api/mcp/asset/15953b6d-90b5-4bd3-850a-22f895abc6ca',
  dot8:       'https://www.figma.com/api/mcp/asset/ddf46693-52e7-4314-b377-1fc73ebea3f0',
  searchIcon: 'https://www.figma.com/api/mcp/asset/21cf5338-1923-47ca-b8d7-ccf472a4cae7',
  bgCircleL: 24, bgCircleSize: 104,
  // Cloud: percentage inset (Figma inset-[13.56%_13.16%_32.2%_13.16%])
  cloudTop: '13.56%', cloudLeft: '13.16%', cloudRight: '13.16%', cloudBottom: '32.2%',
  cloudInner: '0 -17.86% -62.5% -17.86%',
  dots: [
    { src: 'dot10', size: 10, left: 16,  top: 14  },
    { src: 'dot14', size: 14, left: 11,  top: 102 },
    { src: 'dot14', size: 14, left: 138, top: 28  },
    { src: 'dot8',  size: 8,  left: 130, top: 4   },
  ],
  // Overlay: rgba(24,73,169,0.2) + backdrop-blur-[4px] + rounded-[24px]
  overlayL: 52, overlayT: 62, overlaySize: 48, overlayRadius: 24, iconSize: 24,
  bgTop: -188,
};

// ─── Illustration Cloud md (node 4770:11255) ──────────────────────────────────
const ILLUS_MD = {
  w: 172, h: 128,
  bgCircle:   'https://www.figma.com/api/mcp/asset/4ea53b78-7489-4e8e-8a6f-e80e4a82562c',
  cloud:      'https://www.figma.com/api/mcp/asset/90cf51cf-52dd-4a02-8663-9d7df15f1ee1',
  dot12:      'https://www.figma.com/api/mcp/asset/98f7af83-54d0-4699-8134-fc3c7d3c61ef',
  dot16:      'https://www.figma.com/api/mcp/asset/75724a71-5c7b-449c-961a-ae518890dc79',
  dot10:      'https://www.figma.com/api/mcp/asset/bf2a1965-7323-4893-a8a5-4e282f009aae',
  searchIcon: 'https://www.figma.com/api/mcp/asset/a84a740b-d5e3-4ab5-bc3f-f16f718421c8',
  bgCircleL: 22, bgCircleSize: 128,
  // Cloud: absolute position (Figma h-[80px] left-[16px] top-[16px] w-[140px])
  cloudAbsolute: { left: 16, top: 16, width: 140, height: 80 },
  cloudInner: '0 -14.29% -50% -14.29%',
  dots: [
    { src: 'dot12', size: 12, left: 14,  top: 14  },
    { src: 'dot16', size: 16, left: 9,   top: 104 },
    { src: 'dot16', size: 16, left: 152, top: 28  },
    { src: 'dot10', size: 10, left: 144, top: 4   },
  ],
  // Overlay: rgba(24,73,169,0.2) + backdrop-blur-[4px] + rounded-[36px]
  overlayL: 58, overlayT: 60, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  bgTop: -180,
};

// ─── Illustration Cloud lg (node 4770:11270) ──────────────────────────────────
const ILLUS_LG = {
  w: 220, h: 160,
  bgCircle:   'https://www.figma.com/api/mcp/asset/305a3e73-771c-489e-8a59-aad5284ac01c',
  cloud:      'https://www.figma.com/api/mcp/asset/311f5650-6650-4000-be7e-e2bc9c0328cd',
  dot16:      'https://www.figma.com/api/mcp/asset/ef25a603-a82b-443c-b2aa-9d017d44471b',
  dot12:      'https://www.figma.com/api/mcp/asset/77278aed-44aa-4ac9-afa8-3c97f7d6a7e8',
  dot20:      'https://www.figma.com/api/mcp/asset/bbfbcc7e-b5e2-4d6b-aeb1-1581be33360b',
  dot14:      'https://www.figma.com/api/mcp/asset/37756cdc-a4aa-4643-abc6-0286d1caec18',
  searchIcon: 'https://www.figma.com/api/mcp/asset/846dc565-48a1-4011-b5fe-7e98fd993980',
  bgCircleL: 30, bgCircleSize: 160,
  // Cloud: absolute position (Figma h-[99.429px] left-[24px] top-[16px] w-[174px])
  cloudAbsolute: { left: 24, top: 16, width: 174, height: 99.43 },
  cloudInner: '0 -11.49% -40.23% -11.49%',
  dots: [
    { src: 'dot16', size: 16, left: 18,  top: 12  },
    { src: 'dot12', size: 12, left: 192, top: 120 },
    { src: 'dot20', size: 20, left: 15,  top: 128 },
    { src: 'dot20', size: 20, left: 200, top: 36  },
    { src: 'dot14', size: 14, left: 184, top: 4   },
  ],
  // Overlay: rgba(24,73,169,0.2) + backdrop-blur-[4px] + rounded-[36px]
  overlayL: 82, overlayT: 84, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  bgTop: -160,
};

const ILLUS_BY_SIZE = { sm: ILLUS_SM, md: ILLUS_MD, lg: ILLUS_LG };

const B = 'https://www.figma.com/api/mcp/asset/';

// ─── Box illustration assets (node 4770:11497/11523/11368) ───────────────────
const BOX_ILLUS = {
  sm: {
    w: 152, h: 124,
    bgCircle: B+'00d82a85-2803-42e2-9001-528256b7798f', bgL: 24, bgT: 6, bgSize: 104,
    shape: B+'29d8ff8f-2605-4864-bce7-5b980b5c3ea9',
    shapeL: 34, shapeTop: 0, shapeW: 84, shapeH: 90.19, shapeInset: '0 -23.81% -44.35% -23.81%',
    dots: [
      { src: B+'3e810315-24cd-4d55-ad14-52598be06c0a', size: 10, left: 16,  top: 20 },
      { src: B+'50d241eb-89d7-470c-b647-69479b9fb40d', size: 14, left: 11,  top: 102 },
      { src: B+'50d241eb-89d7-470c-b647-69479b9fb40d', size: 14, left: 138, top: 34 },
      { src: B+'48f9a300-8102-41aa-bc92-8623f45506ee', size: 8,  left: 130, top: 10 },
    ],
    defaultIcon: B+'bc109e7c-90f5-4bd4-9fbf-f5433fd8e5a4',
    overlayL: 52, overlayT: 68, overlaySize: 48, overlayRadius: 24, iconSize: 24,
  },
  md: {
    w: 172, h: 136,
    bgCircle: B+'f16465a0-0a74-4220-aafc-74fe9e018209', bgL: 22, bgT: 8, bgSize: 128,
    shape: B+'6413f565-48c9-48c8-8af3-a57879f781e6',
    shapeL: 34, shapeTop: 0, shapeW: 104, shapeH: 111.664, shapeInset: '0 -19.23% -35.82% -19.23%',
    dots: [
      { src: B+'f6a85e72-6e3b-4761-a4ff-8bbc1454c25f', size: 12, left: 14,  top: 22 },
      { src: B+'bd5857e1-5b83-40ca-9133-43292d0642fd', size: 16, left: 9,   top: 112 },
      { src: B+'bd5857e1-5b83-40ca-9133-43292d0642fd', size: 16, left: 152, top: 36 },
      { src: B+'eb8a2ab0-6063-4e29-a5e1-fd0fcfb5cca4', size: 10, left: 144, top: 12 },
    ],
    defaultIcon: B+'2d749436-9f3c-4d0a-82cf-80be4ca6f408',
    overlayL: 58, overlayT: 72, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  },
  lg: {
    w: 220, h: 168,
    bgCircle: B+'0a8fa8a2-1258-4b38-bcda-d07abc9772e5', bgL: 30, bgT: 8, bgSize: 160,
    shape: B+'17d13be9-0917-4fc9-91c0-30b873f2391d',
    shapeL: 46, shapeTop: 0, shapeW: 128, shapeH: 137.432, shapeInset: '0 -15.63% -29.11% -15.63%',
    dots: [
      { src: B+'9c0486eb-5fd6-4f1f-a291-fed57f2476c5', size: 16, left: 18,  top: 20 },
      { src: B+'759b4fd0-4c4e-4e18-9d28-6258dbe501f2', size: 12, left: 192, top: 128 },
      { src: B+'e3e7844d-05f5-4032-8acc-2766957b62ae', size: 20, left: 15,  top: 136 },
      { src: B+'e3e7844d-05f5-4032-8acc-2766957b62ae', size: 20, left: 200, top: 44 },
      { src: B+'3e841319-6738-4c50-8ba6-f3174081840f', size: 14, left: 184, top: 12 },
    ],
    defaultIcon: B+'ce8644a8-bd58-4205-a4d9-5a047672ce7e',
    overlayL: 82, overlayT: 104, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  },
};

// ─── Documents illustration assets (node 4770:11463/11549/11332) ─────────────
const DOCS_ILLUS = {
  sm: {
    w: 152, h: 118,
    bgCircle: B+'c9ba41ec-b44b-4473-a6fa-965e6bd6e2a9', bgL: 24, bgT: 0, bgSize: 104,
    container: { left: 13.44, top: 8, w: 124.56, h: 72.519 },
    papers: [
      { src: B+'1bd38dd2-f7d5-45fd-bb66-903753f7613f', side: 'left',   cW: 64.547, cH: 72.499, cL: 0,     pW: 43.343, pH: 59.783, inset: '0 -46.14% -66.91% -46.14%' },
      { src: B+'4606fae6-fcca-4af2-9b61-f97d9546b6c4', side: 'center', cL: 40.84,                          pW: 43.343, pH: 59.783, inset: '0 -46.14% -66.91% -46.14%' },
      { src: B+'c11b1b08-2123-414e-9afe-add26565096e', side: 'right',  cW: 64.547, cH: 72.499, cL: 60.01, pW: 43.343, pH: 59.783, inset: '0 -46.14% -66.91% -46.14%' },
    ],
    dots: [
      { src: B+'7ee92e2a-5773-4f49-a031-8d56921e88f5', size: 10, left: 16,  top: 6 },
      { src: B+'31134c72-4a96-4f14-9fc6-8c51c86ddd96', size: 14, left: 11,  top: 102 },
      { src: B+'31134c72-4a96-4f14-9fc6-8c51c86ddd96', size: 14, left: 138, top: 28 },
      { src: B+'d2334382-1e34-4f5c-be18-3e1c1950994f', size: 8,  left: 130, top: 4 },
    ],
    defaultIcon: B+'a676915a-3f25-4c38-9032-4a33f179083d',
    overlayL: 52, overlayT: 62, overlaySize: 48, overlayRadius: 24, iconSize: 24,
  },
  md: {
    w: 172, h: 128,
    bgCircle: B+'555ec08b-8eb2-4984-b796-0cc4b0fd61d8', bgL: 22, bgT: 0, bgSize: 128,
    container: { left: 11, top: 10, w: 149.44, h: 87.004 },
    papers: [
      { src: B+'d2cb680a-9762-49ca-8c5f-a6981af5287c', side: 'left',   cW: 77.44, cH: 86.98, cL: 0,  pW: 52, pH: 71.724, inset: '0 -38.46% -55.77% -38.46%' },
      { src: B+'3fb5b85f-6a65-410b-ba06-4e84a9fe4c8d', side: 'center', cL: 49,                        pW: 52, pH: 71.724, inset: '0 -38.46% -55.77% -38.46%' },
      { src: B+'93176ce6-34d1-41a8-abcb-d7c88c31a511', side: 'right',  cW: 77.44, cH: 86.98, cL: 72, pW: 52, pH: 71.724, inset: '0 -38.46% -55.77% -38.46%' },
    ],
    dots: [
      { src: B+'c904a003-fbec-417a-bd63-46d95aa4f921', size: 12, left: 14,  top: 6 },
      { src: B+'7a03f2f3-2076-4991-b308-d13068f3a933', size: 16, left: 9,   top: 104 },
      { src: B+'7a03f2f3-2076-4991-b308-d13068f3a933', size: 16, left: 156, top: 88 },
      { src: B+'5c44e5ce-33c6-4a07-961a-7b4da6aff77d', size: 10, left: 144, top: 4 },
    ],
    defaultIcon: B+'f4b06997-4952-446a-8e04-0677922e05ca',
    overlayL: 58, overlayT: 68, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  },
  lg: {
    w: 220, h: 160,
    bgCircle: B+'45b8f4db-abbf-4d1c-a313-731ff026e2d2', bgL: 30, bgT: 0, bgSize: 160,
    container: { left: 11.44, top: 12, w: 196.56, h: 114.437 },
    papers: [
      { src: B+'d4431b0e-b410-443a-9703-fe8c69ea2bb5', side: 'left',   cW: 101.857, cH: 114.406, cL: 0,     pW: 68.396, pH: 94.339, inset: '0 -29.24% -42.4% -29.24%' },
      { src: B+'b1bfb9ff-ecbf-4883-9fab-79c855187dfb', side: 'center', cL: 64.45,                            pW: 68.396, pH: 94.339, inset: '0 -29.24% -42.4% -29.24%' },
      { src: B+'a372d346-0283-4c49-a15c-75e9cc099e93', side: 'right',  cW: 101.857, cH: 114.406, cL: 94.7,  pW: 68.396, pH: 94.339, inset: '0 -29.24% -42.4% -29.24%' },
    ],
    dots: [
      { src: B+'75da710d-8cce-41ca-aa7b-b3bf37416ee5', size: 16, left: 18,  top: 12 },
      { src: B+'b4e0bdb4-96e9-4dda-83b6-a4d8c52ce52e', size: 12, left: 192, top: 120 },
      { src: B+'0cc8be0e-e363-4d99-9cc9-00aa5a1859c9', size: 20, left: 15,  top: 128 },
      { src: B+'0cc8be0e-e363-4d99-9cc9-00aa5a1859c9', size: 20, left: 200, top: 28 },
      { src: B+'7630a28e-686d-4bf7-a4f8-6f1df24a2f92', size: 14, left: 184, top: 4 },
    ],
    defaultIcon: B+'9d0d2245-4dc1-4919-ba06-e395fb11bfe1',
    overlayL: 82, overlayT: 88, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  },
};

// ─── Credit card illustration assets (node 4770:11435/11583/11302) ───────────
const CCARD_ILLUS = {
  sm: {
    w: 152, h: 118,
    bgCircle: B+'00870948-bb03-4c61-bbb1-fee5bbc2f720', bgL: 24, bgT: 0, bgSize: 104,
    shape: B+'44085abc-f510-45dd-acc8-993d1bf6fed4',
    shapeL: 18, shapeTop: 12, shapeW: 115, shapeH: 72, shapeInset: '0 -14.49% -46.3% -14.49%',
    dots: [
      { src: B+'290a36d1-16b6-41b5-958c-44ab5fe87a6a', size: 10, left: 16,  top: 0 },
      { src: B+'bb3b7045-64f0-4000-8172-ff24b1cc70fa', size: 14, left: 11,  top: 102 },
      { src: B+'bb3b7045-64f0-4000-8172-ff24b1cc70fa', size: 14, left: 138, top: 28 },
      { src: B+'0c77df82-a360-4ea0-b89a-10aa2bca2379', size: 8,  left: 130, top: 4 },
    ],
    defaultIcon: B+'065f242a-9695-494f-8140-6bacc520e85b',
    overlayL: 52, overlayT: 70, overlaySize: 48, overlayRadius: 24, iconSize: 24,
  },
  md: {
    w: 172, h: 134,
    bgCircle: B+'a6affdbd-13f4-4e4a-87e2-605a274f36d9', bgL: 22, bgT: 0, bgSize: 128,
    shape: B+'b250eb78-51ad-4656-9451-dafb4fe83e60',
    shapeL: 17, shapeTop: 16, shapeW: 138, shapeH: 86, shapeInset: '0 -14.49% -46.51% -14.49%',
    dots: [
      { src: B+'7cd93bc4-e6c7-4e10-9f53-ef3be036a6d7', size: 12, left: 14,  top: 0 },
      { src: B+'06c0a0a7-88bf-4c6c-bbb4-95366b20d1c1', size: 16, left: 9,   top: 104 },
      { src: B+'06c0a0a7-88bf-4c6c-bbb4-95366b20d1c1', size: 16, left: 152, top: 28 },
      { src: B+'624614d6-4015-4a5e-9fd4-d7791dff62cc', size: 10, left: 144, top: 4 },
    ],
    defaultIcon: B+'a9c181b5-558d-4b07-9482-df7b02c58a93',
    overlayL: 58, overlayT: 78, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  },
  lg: {
    w: 220, h: 160,
    bgCircle: B+'c1903a40-049c-4a63-9a53-c50ba2d06eba', bgL: 30, bgT: 0, bgSize: 160,
    shape: B+'2314ee55-37ac-46b7-9c54-35f1e9b651a6',
    shapeL: 27, shapeTop: 22, shapeW: 166, shapeH: 104, shapeInset: '0 -12.05% -38.46% -12.05%',
    dots: [
      { src: B+'4b03e4dd-aa28-4da6-a039-b533a6fbcc3b', size: 16, left: 10,  top: 4 },
      { src: B+'206e9787-66d3-468d-86a2-5365a8382f43', size: 12, left: 192, top: 136 },
      { src: B+'4ecb1a80-db3a-48aa-a21b-99bf8ffe9976', size: 20, left: 15,  top: 128 },
      { src: B+'4ecb1a80-db3a-48aa-a21b-99bf8ffe9976', size: 20, left: 200, top: 36 },
      { src: B+'1d37de69-cb66-43e6-8d2a-3c69516c3ddc', size: 14, left: 184, top: 4 },
    ],
    defaultIcon: B+'8cb7a800-36d9-4e1a-91d2-2e9e3f8b2359',
    overlayL: 82, overlayT: 92, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  },
};

// ─── Featured icon size config ─────────────────────────────────────────────────
const FEATURED_CFG = {
  sm: { box: 48, radius: 10, iconSize: 24, bgTop: -216 },
  md: { box: 48, radius: 10, iconSize: 24, bgTop: -216 },
  lg: { box: 56, radius: 12, iconSize: 28, bgTop: -212 },
};

// ─── File type icon config ─────────────────────────────────────────────────────
const FILE_CFG = {
  sm: { wrapPad: 32, iconSize: 40, bgTop: -188 },
  md: { wrapPad: 32, iconSize: 40, bgTop: -188 },
  lg: { wrapPad: 32, iconSize: 40, bgTop: -188 },
};

// ─── Background pattern ───────────────────────────────────────────────────────
function BgPattern({ iconType, topOffset }) {
  if (iconType === 'illustration') {
    return (
      <div
        className={styles.bgWrap}
        style={{ top: topOffset, maskImage: `url('${BG_GRID_MASK}')`, WebkitMaskImage: `url('${BG_GRID_MASK}')` }}
      >
        <div className={styles.bgGridLines}>
          <img src={BG_GRID_V} alt="" className={styles.bgGridImg} />
          <img src={BG_GRID_H} alt="" className={styles.bgGridImgH} />
        </div>
      </div>
    );
  }
  const mask = iconType === 'file-type-icon' ? BG_CIRCLES_MASK_FT : BG_CIRCLES_MASK_FI;
  const img  = iconType === 'file-type-icon' ? BG_CIRCLES_IMG_FT  : BG_CIRCLES_IMG_FI;
  return (
    <div
      className={styles.bgWrap}
      style={{ top: topOffset, maskImage: `url('${mask}')`, WebkitMaskImage: `url('${mask}')` }}
    >
      <img src={img} alt="" className={styles.bgCirclesImg} />
    </div>
  );
}

// ─── Featured icon indicator (node 4770:11221) ────────────────────────────────
function FeaturedIconIndicator({ size, icon }) {
  const cfg = FEATURED_CFG[size] ?? FEATURED_CFG.sm;
  return (
    <div
      className={styles.featuredBox}
      style={{ width: cfg.box, height: cfg.box, borderRadius: cfg.radius }}
    >
      <img
        src={icon || SEARCH_ICON}
        alt=""
        style={{ width: cfg.iconSize, height: cfg.iconSize, display: 'block', objectFit: 'contain' }}
      />
    </div>
  );
}

// ─── Shared frosted overlay ───────────────────────────────────────────────────
function Overlay({ left, top, size, radius, iconSrc, iconSize }) {
  return (
    <div style={{ position: 'absolute', left, top, width: size, height: size, borderRadius: radius, background: 'rgba(24,73,169,0.2)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={iconSrc} alt="" style={{ width: iconSize, height: iconSize, display: 'block' }} />
    </div>
  );
}

// ─── Illustration indicator — Cloud / Box / Documents / Credit card ───────────
function IllustrationIndicator({ size, icon, illustrationStyle = 'Cloud' }) {
  if (illustrationStyle === 'Box' || illustrationStyle === 'Credit card') {
    const c = (illustrationStyle === 'Box' ? BOX_ILLUS : CCARD_ILLUS)[size] ?? (illustrationStyle === 'Box' ? BOX_ILLUS : CCARD_ILLUS).sm;
    return (
      <div style={{ width: c.w, height: c.h, position: 'relative', flexShrink: 0 }}>
        <img src={c.bgCircle} alt="" style={{ position: 'absolute', left: c.bgL, top: c.bgT, width: c.bgSize, height: c.bgSize, display: 'block' }} />
        <div style={{ position: 'absolute', left: c.shapeL, top: c.shapeTop, width: c.shapeW, height: c.shapeH }}>
          <div style={{ position: 'absolute', inset: c.shapeInset }}>
            <img src={c.shape} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
        {c.dots.map((dot, i) => (
          <img key={i} src={dot.src} alt="" style={{ position: 'absolute', left: dot.left, top: dot.top, width: dot.size, height: dot.size, display: 'block' }} />
        ))}
        <Overlay left={c.overlayL} top={c.overlayT} size={c.overlaySize} radius={c.overlayRadius} iconSrc={icon || c.defaultIcon} iconSize={c.iconSize} />
      </div>
    );
  }

  if (illustrationStyle === 'Documents') {
    const c = DOCS_ILLUS[size] ?? DOCS_ILLUS.sm;
    return (
      <div style={{ width: c.w, height: c.h, position: 'relative', flexShrink: 0 }}>
        <img src={c.bgCircle} alt="" style={{ position: 'absolute', left: c.bgL, top: c.bgT, width: c.bgSize, height: c.bgSize, display: 'block' }} />
        <div style={{ position: 'absolute', left: c.container.left, top: c.container.top, width: c.container.w, height: c.container.h }}>
          {c.papers.map((p) => {
            if (p.side === 'center') {
              return (
                <div key={p.src} style={{ position: 'absolute', left: p.cL, top: 0, width: p.pW, height: p.pH }}>
                  <div style={{ position: 'absolute', inset: p.inset }}>
                    <img src={p.src} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                  </div>
                </div>
              );
            }
            const isLeft = p.side === 'left';
            return (
              <div key={p.src} style={{ position: 'absolute', left: p.cL, top: isLeft ? 0.02 : 0, width: p.cW, height: p.cH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flexShrink: 0, transform: isLeft ? 'rotate(-25deg)' : 'rotate(25deg)' }}>
                  <div style={{ position: 'relative', width: p.pW, height: p.pH }}>
                    <div style={{ position: 'absolute', inset: p.inset }}>
                      <img src={p.src} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {c.dots.map((dot, i) => (
          <img key={i} src={dot.src} alt="" style={{ position: 'absolute', left: dot.left, top: dot.top, width: dot.size, height: dot.size, display: 'block' }} />
        ))}
        <Overlay left={c.overlayL} top={c.overlayT} size={c.overlaySize} radius={c.overlayRadius} iconSrc={icon || c.defaultIcon} iconSize={c.iconSize} />
      </div>
    );
  }

  // Cloud (default)
  const c = ILLUS_BY_SIZE[size] ?? ILLUS_SM;
  const cloudContent = (
    <img src={c.cloud} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
  );
  return (
    <div style={{ width: c.w, height: c.h, position: 'relative', flexShrink: 0 }}>
      <img src={c.bgCircle} alt="" style={{ position: 'absolute', left: c.bgCircleL, top: 0, width: c.bgCircleSize, height: c.bgCircleSize, display: 'block' }} />
      {size === 'sm' ? (
        <div style={{ position: 'absolute', top: c.cloudTop, left: c.cloudLeft, right: c.cloudRight, bottom: c.cloudBottom }}>
          <div style={{ position: 'absolute', inset: c.cloudInner }}>{cloudContent}</div>
        </div>
      ) : (
        <div style={{ position: 'absolute', left: c.cloudAbsolute.left, top: c.cloudAbsolute.top, width: c.cloudAbsolute.width, height: c.cloudAbsolute.height, overflow: 'visible' }}>
          <div style={{ position: 'absolute', inset: c.cloudInner }}>{cloudContent}</div>
        </div>
      )}
      {c.dots.map((dot, i) => (
        <img key={i} src={c[dot.src]} alt="" style={{ position: 'absolute', left: dot.left, top: dot.top, width: dot.size, height: dot.size, display: 'block' }} />
      ))}
      <Overlay left={c.overlayL} top={c.overlayT} size={c.overlaySize} radius={c.overlayRadius} iconSrc={icon || c.searchIcon} iconSize={c.iconSize} />
    </div>
  );
}

// ─── File type icon indicator (node 4770:11152) ───────────────────────────────
function FileTypeIconIndicator({ size }) {
  const cfg = FILE_CFG[size] ?? FILE_CFG.sm;
  return (
    <div className={styles.fileWrap} style={{ padding: cfg.wrapPad }}>
      {/* Figma: drop-shadow(0px 1px 1.5px rgba(16,24,40,0.1)) drop-shadow(0px 1px 1px rgba(16,24,40,0.06)) */}
      <div style={{
        position: 'relative',
        width: cfg.iconSize,
        height: cfg.iconSize,
        flexShrink: 0,
        filter: 'drop-shadow(0px 1px 1.5px rgba(16,24,40,0.10)) drop-shadow(0px 1px 1px rgba(16,24,40,0.06))',
      }}>
        {/* Blue file-page shape: inset 0 10% */}
        <img src={FILE_PAGE} alt="" style={{ position: 'absolute', inset: '0 10%', width: '80%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({
  iconType            = 'featured-icon',
  illustrationStyle   = 'Cloud',
  size                = 'sm',
  rtl                 = false,
  title               = 'No projects found',
  description         = 'Your search "Landing page design" did not match any projects. Please try again.',
  primaryLabel        = 'Button',
  secondaryLabel      = 'Button',
  onPrimary,
  onSecondary,
  icon,
  showArrow           = true,
  className,
  style,
}) {
  const bgTop =
    iconType === 'featured-icon'
      ? (FEATURED_CFG[size] ?? FEATURED_CFG.sm).bgTop
      : iconType === 'illustration'
      ? (ILLUS_BY_SIZE[size] ?? ILLUS_SM).bgTop
      : (FILE_CFG[size] ?? FILE_CFG.sm).bgTop;

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      dir={rtl ? 'rtl' : undefined}
      style={style}
    >
      <BgPattern iconType={iconType} topOffset={bgTop} />

      <div className={styles.inner}>
        <div className={styles.content}>
          {iconType === 'featured-icon'  && <FeaturedIconIndicator  size={size} icon={icon} />}
          {iconType === 'illustration'   && <IllustrationIndicator  size={size} icon={icon} illustrationStyle={illustrationStyle} />}
          {iconType === 'file-type-icon' && <FileTypeIconIndicator  size={size} />}

          <div className={styles.textGroup}>
            <p className={styles.title}>{title}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>

        {/* Actions — design-system Button component, matching Figma gap-[12px] between buttons */}
        {(primaryLabel || secondaryLabel) && (
          <div className={styles.actions}>
            {secondaryLabel && (
              <Button variant="neutral" size="lg" onClick={onSecondary} dir={rtl ? 'rtl' : 'ltr'}>
                {secondaryLabel}
              </Button>
            )}
            {primaryLabel && (
              <Button
                variant="primary"
                size="lg"
                onClick={onPrimary}
                dir={rtl ? 'rtl' : 'ltr'}
                leadIcon={showArrow ? (
                  <img
                    src={BTN_ARROW}
                    alt=""
                    style={{
                      width: 16,
                      height: 16,
                      display: 'block',
                      flexShrink: 0,
                      // Figma: -rotate-90 -scale-x-100
                      transform: rtl ? 'rotate(90deg) scaleX(1)' : 'rotate(-90deg) scaleX(-1)',
                    }}
                  />
                ) : null}
              >
                {primaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
