const STORAGE_KEY = "storeOwnerModularV3";
const OWNER_PIN = "1234";

const MAX_OWNER_BOXES = 50;
const MAX_INDEX_BOXES = 50;
const MAX_COVER_SLOTS = 10;

const CARTOON_AVATARS = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23dbeafe'/><circle cx='60' cy='46' r='22' fill='%23f59e0b'/><path d='M36 44c0-15 11-26 24-26s24 11 24 26c-6-6-14-9-24-9s-18 3-24 9z' fill='%231e293b'/><circle cx='52' cy='46' r='3' fill='%23111827'/><circle cx='68' cy='46' r='3' fill='%23111827'/><path d='M52 56q8 7 16 0' stroke='%23111827' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c4-22 18-32 34-32s30 10 34 32' fill='%230f766e'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23fce7f3'/><circle cx='60' cy='48' r='21' fill='%23fed7aa'/><path d='M34 52c0-20 12-32 26-32s26 12 26 32c-4-12-12-18-26-18s-22 6-26 18z' fill='%237c2d12'/><circle cx='52' cy='48' r='3' fill='%23111827'/><circle cx='68' cy='48' r='3' fill='%23111827'/><path d='M53 57q7 6 14 0' stroke='%23be123c' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M28 110c4-21 17-31 32-31s28 10 32 31' fill='%23db2777'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23fef3c7'/><circle cx='60' cy='48' r='22' fill='%23fdba74'/><rect x='43' y='42' width='14' height='10' rx='3' fill='none' stroke='%23111827' stroke-width='2.5'/><rect x='63' y='42' width='14' height='10' rx='3' fill='none' stroke='%23111827' stroke-width='2.5'/><line x1='57' y1='47' x2='63' y2='47' stroke='%23111827' stroke-width='2.5'/><path d='M52 59q8 6 16 0' stroke='%23111827' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c5-22 18-32 34-32s29 10 34 32' fill='%232563eb'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23dcfce7'/><circle cx='60' cy='52' r='24' fill='%23fb923c'/><polygon points='38,36 46,18 56,32' fill='%23fb923c'/><polygon points='82,36 74,18 64,32' fill='%23fb923c'/><circle cx='51' cy='49' r='3.5' fill='%23111827'/><circle cx='69' cy='49' r='3.5' fill='%23111827'/><polygon points='60,54 56,59 64,59' fill='%23111827'/><path d='M51 64q9 7 18 0' stroke='%23111827' stroke-width='2.5' fill='none' stroke-linecap='round'/><path d='M30 110c5-20 16-28 30-28s25 8 30 28' fill='%2315803d'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23e0e7ff'/><rect x='36' y='28' width='48' height='42' rx='12' fill='%2364748b'/><line x1='60' y1='16' x2='60' y2='28' stroke='%23475569' stroke-width='4'/><circle cx='60' cy='14' r='5' fill='%23ef4444'/><circle cx='50' cy='47' r='5' fill='%2338bdf8'/><circle cx='70' cy='47' r='5' fill='%2338bdf8'/><rect x='47' y='58' width='26' height='5' rx='2.5' fill='%23e2e8f0'/><path d='M30 110c4-22 16-32 30-32s26 10 30 32' fill='%234f46e5'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23ffedd5'/><circle cx='60' cy='48' r='22' fill='%23d97706'/><path d='M38 38c4-14 40-14 44 0' fill='%23111827'/><circle cx='52' cy='48' r='3' fill='%23111827'/><circle cx='68' cy='48' r='3' fill='%23111827'/><path d='M50 58c4 6 16 6 20 0' stroke='%23ffffff' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c4-22 18-32 34-32s30 10 34 32' fill='%23ea580c'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23f3e8ff'/><circle cx='60' cy='49' r='21' fill='%23fed7aa'/><circle cx='60' cy='23' r='9' fill='%23312e81'/><path d='M39 45c0-14 9-23 21-23s21 9 21 23' fill='%23312e81'/><circle cx='52' cy='49' r='3' fill='%23111827'/><circle cx='68' cy='49' r='3' fill='%23111827'/><path d='M53 58q7 6 14 0' stroke='%237e22ce' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M28 110c4-21 17-31 32-31s28 10 32 31' fill='%239333ea'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23ccfbf1'/><circle cx='40' cy='34' r='10' fill='%2378350f'/><circle cx='80' cy='34' r='10' fill='%2378350f'/><circle cx='60' cy='52' r='23' fill='%2392400e'/><circle cx='60' cy='57' r='10' fill='%23fde68a'/><circle cx='51' cy='47' r='3' fill='%23111827'/><circle cx='69' cy='47' r='3' fill='%23111827'/><circle cx='60' cy='54' r='3' fill='%23111827'/><path d='M30 110c5-20 16-28 30-28s25 8 30 28' fill='%230d9488'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23fee2e2'/><circle cx='60' cy='48' r='22' fill='%23fdba74'/><path d='M36 40h48l-6-16H42z' fill='%23dc2626'/><circle cx='52' cy='49' r='3' fill='%23111827'/><circle cx='68' cy='49' r='3' fill='%23111827'/><path d='M52 59q8 6 16 0' stroke='%23111827' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c4-22 18-32 34-32s30 10 34 32' fill='%231f2937'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23e0f2fe'/><ellipse cx='46' cy='24' rx='6' ry='16' fill='%23ffffff'/><ellipse cx='74' cy='24' rx='6' ry='16' fill='%23ffffff'/><circle cx='60' cy='54' r='23' fill='%23ffffff'/><circle cx='51' cy='51' r='3' fill='%23111827'/><circle cx='69' cy='51' r='3' fill='%23111827'/><circle cx='60' cy='57' r='3' fill='%23f43f5e'/><path d='M52 64q8 6 16 0' stroke='%23111827' stroke-width='2.5' fill='none' stroke-linecap='round'/><path d='M30 110c5-20 16-28 30-28s25 8 30 28' fill='%230284c7'/></svg>"
];

const DEFAULT_SECTION_TITLES = [
  "Trending Deals",
  "Fresh Fruits & Vegetables",
  "Dairy & Bakery",
  "Snacks & Namkeen",
  "Cold Drinks & Juices",
  "Atta, Rice & Dal",
  "Cooking Oil & Ghee",
  "Spices & Masala",
  "Tea, Coffee & Health Drinks",
  "Biscuits & Chocolates",
  "Personal Care",
  "Household & Cleaning",
  "Baby Care Essentials",
  "Dry Fruits & Nuts",
  "Combo Value Packs"
];

function stripAllDigits(text, fallback = "") {
  const cleaned = String(text || "").replace(/\d+/g, "").replace(/\s{2,}/g, " ").trim();
  return cleaned || fallback;
}

function getSectionTitleForView(rawTitle, index) {
  const cleanName = stripAllDigits(rawTitle || "", "Section");
  if (OWNER_EDIT_MODE) {
    return `${index + 1}. ${cleanName}`;
  }
  return cleanName;
}

function hideDigitsOnUserPage() {
  if (document.body.getAttribute("data-page") !== "store" || OWNER_EDIT_MODE) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement && node.parentElement.closest("#ownerLiveSaveBar, #ownerCustomColorPickerModal, #ownerPhotoPositionModal")) {
      continue;
    }
    if (/\d/.test(node.nodeValue)) {
      textNodes.push(node);
    }
  }
  textNodes.forEach((tn) => {
    tn.nodeValue = tn.nodeValue.replace(/\d+/g, "").replace(/\s{2,}/g, " ");
  });
}

function buildInitialData() {
  const sections = DEFAULT_SECTION_TITLES.map((title, idx) => {
    const count = idx === 0 ? 4 : 5;
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push({ id: `${idx}-${i}`, name: "Item", price: 0, img: "" });
    }
    return { title, items };
  });

  const ownerFolders = [
    { id: "store", name: "Store Setup", isCustom: false, entries: [], bigLeftLabel: "Sections", bigRightLabel: "Store Boxes", customName: "" },
    { id: "users", name: "Active Users", isCustom: false, entries: [], bigLeftLabel: "Active Users", bigRightLabel: "Box Limit", customName: "" },
    { id: "sales", name: "Sold Items", isCustom: false, entries: [], bigLeftLabel: "Total Units Sold", bigRightLabel: "Total Sales", customName: "" },
    { id: "buyers", name: "Customer Orders", isCustom: false, entries: [], bigLeftLabel: "Total Orders", bigRightLabel: "Buyers", customName: "" }
  ];
  for (let i = 1; i <= 10; i++) {
    ownerFolders.push({
      id: `custom-${i}`,
      name: "",
      isCustom: true,
      entries: [],
      bigLeftLabel: "Box 1",
      bigRightLabel: "Box 2",
      customName: ""
    });
  }

  return {
    storeTitle: "Store Name",
    storeSubtitle: "",
    titlePos: { x: 0, y: 0 },
    themeColor: "#0f766e",
    coverImg: "",
    coverSlots: [""],
    coverSlotsLimit: MAX_COVER_SLOTS,
    ownerBoxLimit: MAX_OWNER_BOXES,
    indexBoxLimit: MAX_INDEX_BOXES,
    ownerExtraBoxes: [],
    ownerUserBoxes: [],
    ownerBuyerBoxes: [],
    sections,
    orders: [],
    activeUsers: [],
    ownerFolders,
    mediaPermissionGranted: false,
    userProfile: {
      fixedRegistration: true,
      photo: "",
      firstName: "",
      surname: "",
      age: "",
      gender: "",
      phone: "",
      otpVerified: false,
      provider: ""
    }
  };
}

let storeData;
try {
  storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || buildInitialData();
} catch (err) {
  storeData = buildInitialData();
}

if (!storeData.ownerFolders || storeData.ownerFolders.length < 14) {
  storeData.ownerFolders = buildInitialData().ownerFolders;
}
if (!storeData.activeUsers) storeData.activeUsers = [];
if (!storeData.themeColor) storeData.themeColor = "#0f766e";
if (!storeData.titlePos || typeof storeData.titlePos.x !== "number" || typeof storeData.titlePos.y !== "number") {
  storeData.titlePos = { x: 0, y: 0 };
}
if (!Array.isArray(storeData.coverSlots) || storeData.coverSlots.length === 0) {
  storeData.coverSlots = [storeData.coverImg || ""];
}
if (!storeData.coverSlotsLimit) storeData.coverSlotsLimit = MAX_COVER_SLOTS;
if (!storeData.ownerBoxLimit) storeData.ownerBoxLimit = MAX_OWNER_BOXES;
if (!storeData.indexBoxLimit) storeData.indexBoxLimit = MAX_INDEX_BOXES;
if (!storeData.ownerExtraBoxes) storeData.ownerExtraBoxes = [];
if (!storeData.ownerUserBoxes) storeData.ownerUserBoxes = [];
if (!storeData.ownerBuyerBoxes) storeData.ownerBuyerBoxes = [];

let activeOrderItem = null;
let draftPhoto = storeData.userProfile?.photo || "";
let tempManagerPhoto = "";
let otpCountdownInterval = null;
let coverAutoScrollTimer = null;

let activeFolderIdx = 0;
let usersVisibleLimit = 10;

const OWNER_EDIT_MODE = new URLSearchParams(window.location.search).get("ownerEdit") === "1";
let draftStoreData = null;
let pendingOwnerEditSlot = null;

function getWorkingStoreData() {
  return OWNER_EDIT_MODE && draftStoreData ? draftStoreData : storeData;
}

function initDraftStoreData() {
  draftStoreData = JSON.parse(JSON.stringify(storeData));
}

function commitDraftStoreData() {
  if (!draftStoreData) return;
  storeData = JSON.parse(JSON.stringify(draftStoreData));
  saveData();
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
  } catch (err) {
    alert("Storage full. Remove some photos or items.");
  }
}

function readImageAsDataURL(file, maxWidth = 600) {
  return new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function openPhotoPositionEditor(rawDataUrl, aspectRatio = 16 / 9, outWidth = 720) {
  return new Promise((resolve) => {
    const existing = document.getElementById("ownerPhotoPositionModal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "ownerPhotoPositionModal";
    modal.style.cssText =
      "position:fixed;inset:0;z-index:130;background:rgba(15,23,42,0.72);display:flex;align-items:center;justify-content:center;padding:14px;";

    const card = document.createElement("div");
    card.style.cssText =
      "width:100%;max-width:440px;background:#ffffff;border-radius:14px;padding:14px;box-shadow:0 12px 32px rgba(0,0,0,0.35);display:flex;flex-direction:column;gap:12px;";

    const heading = document.createElement("div");
    heading.textContent = "Adjust Photo Position";
    heading.style.cssText = "font-size:1rem;font-weight:700;color:#111827;";

    const hint = document.createElement("div");
    hint.textContent = "Drag photo to position & use slider to zoom";
    hint.style.cssText = "font-size:0.78rem;color:#475569;";

    const stage = document.createElement("div");
    const outHeight = Math.round(outWidth / aspectRatio);
    stage.style.cssText =
      `position:relative;width:100%;aspect-ratio:${aspectRatio};max-height:240px;background:#0f172a;border-radius:10px;overflow:hidden;touch-action:none;cursor:grab;`;

    const img = document.createElement("img");
    img.src = rawDataUrl;
    img.alt = "Edit Photo";
    img.draggable = false;
    img.style.cssText =
      "position:absolute;left:50%;top:50%;max-width:none;user-select:none;pointer-events:none;transform-origin:center center;";

    stage.appendChild(img);

    let zoom = 1;
    let offsetX = 0;
    let offsetY = 0;
    let baseW = 300;
    let baseH = 180;

    function fitImageToStage() {
      const rect = stage.getBoundingClientRect();
      const sw = rect.width || 360;
      const sh = rect.height || 180;
      const natW = img.naturalWidth || 1;
      const natH = img.naturalHeight || 1;
      const coverScale = Math.max(sw / natW, sh / natH);
      baseW = natW * coverScale;
      baseH = natH * coverScale;
      img.style.width = `${baseW}px`;
      img.style.height = `${baseH}px`;
      applyTransform();
    }

    function applyTransform() {
      img.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${zoom})`;
    }

    img.onload = fitImageToStage;
    if (img.complete) fitImageToStage();

    let dragging = false;
    let startX = 0;
    let startY = 0;

    stage.addEventListener("pointerdown", (e) => {
      dragging = true;
      stage.style.cursor = "grabbing";
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      applyTransform();
    });
    stage.addEventListener("pointerup", () => {
      dragging = false;
      stage.style.cursor = "grab";
    });

    const zoomRow = document.createElement("div");
    zoomRow.style.cssText = "display:flex;align-items:center;gap:10px;";

    const zoomLbl = document.createElement("span");
    zoomLbl.textContent = "Zoom";
    zoomLbl.style.cssText = "font-size:0.82rem;font-weight:700;color:#334155;";

    const zoomSlider = document.createElement("input");
    zoomSlider.type = "range";
    zoomSlider.min = "1";
    zoomSlider.max = "2.5";
    zoomSlider.step = "0.02";
    zoomSlider.value = "1";
    zoomSlider.style.cssText = "flex:1;";
    zoomSlider.oninput = () => {
      zoom = parseFloat(zoomSlider.value) || 1;
      applyTransform();
    };

    zoomRow.appendChild(zoomLbl);
    zoomRow.appendChild(zoomSlider);

    const actions = document.createElement("div");
    actions.style.cssText = "display:flex;justify-content:flex-end;gap:8px;margin-top:4px;";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.cssText =
      "padding:8px 14px;border:1px solid #cbd5e1;border-radius:8px;background:#ffffff;color:#334155;font-weight:600;cursor:pointer;";
    cancelBtn.onclick = () => {
      modal.remove();
      resolve(null);
    };

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.textContent = "Use Photo";
    doneBtn.style.cssText =
      "padding:8px 16px;border:none;border-radius:8px;background:#0f766e;color:#ffffff;font-weight:700;cursor:pointer;";
    doneBtn.onclick = () => {
      const rect = stage.getBoundingClientRect();
      const sw = rect.width || 360;
      const sh = rect.height || 180;
      const scaleToOutX = outWidth / sw;
      const scaleToOutY = outHeight / sh;

      const canvas = document.createElement("canvas");
      canvas.width = outWidth;
      canvas.height = outHeight;
      const ctx = canvas.getContext("2d");

      const drawW = baseW * zoom * scaleToOutX;
      const drawH = baseH * zoom * scaleToOutY;
      const drawX = (sw / 2 + offsetX) * scaleToOutX - drawW / 2;
      const drawY = (sh / 2 + offsetY) * scaleToOutY - drawH / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      const finalUrl = canvas.toDataURL("image/jpeg", 0.8);
      modal.remove();
      resolve(finalUrl);
    };

    actions.appendChild(cancelBtn);
    actions.appendChild(doneBtn);

    card.appendChild(heading);
    card.appendChild(hint);
    card.appendChild(stage);
    card.appendChild(zoomRow);
    card.appendChild(actions);
    modal.appendChild(card);
    document.body.appendChild(modal);
  });
}

function imgMarkup(src, altText, isMini = false) {
  if (src) {
    return `<img src="${src}" alt="${altText}" />`;
  }
  const h = isMini ? "74px" : "125px";
  return `<div style="width:100%;height:${h};background:#e5e7eb;"></div>`;
}

function startCoverAutoScroll(track, slideCount, onSlideChange) {
  clearInterval(coverAutoScrollTimer);
  if (OWNER_EDIT_MODE || !track || slideCount <= 1) return;

  let currentSlide = 0;
  coverAutoScrollTimer = setInterval(() => {
    if (!document.body.contains(track)) {
      clearInterval(coverAutoScrollTimer);
      return;
    }
    currentSlide = (currentSlide + 1) % slideCount;
    track.scrollTo({
      left: currentSlide * track.clientWidth,
      behavior: "smooth"
    });
    if (typeof onSlideChange === "function") onSlideChange(currentSlide);
  }, 3000);
}

function peekNextCoverHint() {
  const track = document.getElementById("coverSliderTrack");
  if (!track || OWNER_EDIT_MODE) return;
  const peekAmount = Math.min(80, Math.round(track.clientWidth * 0.22));
  if (peekAmount <= 0) return;

  track.scrollTo({ left: peekAmount, behavior: "smooth" });
  setTimeout(() => {
    if (document.body.contains(track)) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 650);
}

/* ==================== OWNER STORE LIVE EDIT (index.html?ownerEdit=1) ==================== */
function openOwnerStoreEditView() {
  window.location.href = "index.html?ownerEdit=1";
}

function removeCustomPickerIfExists() {
  const existing = document.getElementById("ownerCustomColorPickerModal");
  if (existing) existing.remove();
}

function removeOwnerStoreEditUI() {
  const bar = document.getElementById("ownerLiveSaveBar");
  if (bar) bar.remove();
  const bottomBar = document.getElementById("ownerBottomRowControls");
  if (bottomBar) bottomBar.remove();
  removeCustomPickerIfExists();
  document.querySelectorAll(".owner-inline-edit-btn").forEach((btn) => btn.remove());
}

function applyDraftThemeColor(hexColor) {
  const data = getWorkingStoreData();
  if (!hexColor) return;
  data.themeColor = hexColor;
  document.documentElement.style.setProperty("--primary", hexColor);
  const bar = document.getElementById("ownerLiveSaveBar");
  if (bar) bar.style.background = hexColor;
  const saveBtn = document.getElementById("ownerLiveSaveBtn");
  if (saveBtn) saveBtn.style.color = hexColor;
}

function hsvToHex(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  const toHex = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`;
}

function getColorNameFromHsv(h, s, v) {
  if (v < 0.14) return "Black";
  if (s < 0.12 && v > 0.88) return "White";
  if (s < 0.14) return v > 0.55 ? "Light Gray" : "Gray";

  let base = "Red";
  if (h >= 15 && h < 42) base = "Orange";
  else if (h >= 42 && h < 70) base = "Yellow";
  else if (h >= 70 && h < 160) base = "Green";
  else if (h >= 160 && h < 200) base = "Teal";
  else if (h >= 200 && h < 255) base = "Blue";
  else if (h >= 255 && h < 295) base = "Purple";
  else if (h >= 295 && h < 340) base = "Pink";

  if (v < 0.45) return `Dark ${base}`;
  if (s < 0.45 && v > 0.82) return `Light ${base}`;
  return base;
}

function openCustomColourPickerModal() {
  removeCustomPickerIfExists();
  const data = getWorkingStoreData();
  const initialColor = data.themeColor || "#0f766e";
  let hue = 0;
  let sat = 0.85;
  let val = 0.85;

  const modal = document.createElement("div");
  modal.id = "ownerCustomColorPickerModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:120;background:rgba(15,23,42,0.55);display:flex;align-items:center;justify-content:center;padding:14px;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:440px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.28);";

  const header = document.createElement("div");
  header.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #e2e8f0;gap:10px;";

  const leftHead = document.createElement("div");
  leftHead.style.cssText = "display:flex;align-items:center;gap:10px;flex-wrap:wrap;";

  const title = document.createElement("span");
  title.textContent = "Colour picker";
  title.style.cssText = "font-size:1.08rem;font-weight:700;color:#111827;";

  const colorNameBadge = document.createElement("span");
  colorNameBadge.textContent = "Red";
  colorNameBadge.style.cssText =
    "font-size:0.84rem;font-weight:700;padding:3px 10px;border-radius:999px;background:#f1f5f9;color:#111827;";

  leftHead.appendChild(title);
  leftHead.appendChild(colorNameBadge);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "✕";
  closeBtn.style.cssText =
    "border:none;background:transparent;font-size:1.1rem;font-weight:700;color:#475569;cursor:pointer;padding:2px 6px;";
  closeBtn.onclick = () => modal.remove();

  header.appendChild(leftHead);
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.style.cssText = "display:flex;height:190px;width:100%;";

  const leftSwatch = document.createElement("div");
  leftSwatch.style.cssText = `flex:0 0 36%;background:${initialColor};`;

  const shadeArea = document.createElement("div");
  shadeArea.style.cssText =
    "position:relative;flex:1;touch-action:none;cursor:crosshair;overflow:hidden;";

  const satOverlay = document.createElement("div");
  satOverlay.style.cssText =
    "position:absolute;inset:0;background:linear-gradient(to right,#ffffff,rgba(255,255,255,0));";

  const valOverlay = document.createElement("div");
  valOverlay.style.cssText =
    "position:absolute;inset:0;background:linear-gradient(to top,#000000,rgba(0,0,0,0));";

  const thumbRing = document.createElement("div");
  thumbRing.style.cssText =
    "position:absolute;width:24px;height:24px;border:3px solid #ffffff;border-radius:50%;box-shadow:0 0 4px rgba(0,0,0,0.65);transform:translate(-50%,-50%);pointer-events:none;left:85%;top:15%;";

  shadeArea.appendChild(satOverlay);
  shadeArea.appendChild(valOverlay);
  shadeArea.appendChild(thumbRing);

  body.appendChild(leftSwatch);
  body.appendChild(shadeArea);

  const sliderWrap = document.createElement("div");
  sliderWrap.style.cssText = "padding:16px;background:#ffffff;";

  const hueTrackWrap = document.createElement("div");
  hueTrackWrap.style.cssText =
    "position:relative;height:14px;border-radius:999px;background:linear-gradient(to right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000);touch-action:none;cursor:pointer;";

  const hueKnob = document.createElement("div");
  hueKnob.style.cssText =
    "position:absolute;top:50%;left:0%;width:24px;height:24px;border-radius:50%;background:#ff0000;border:2px solid #ffffff;box-shadow:0 1px 5px rgba(0,0,0,0.45);transform:translate(-50%,-50%);pointer-events:none;";

  hueTrackWrap.appendChild(hueKnob);

  const footer = document.createElement("div");
  footer.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:14px;";

  const selectedNameText = document.createElement("span");
  selectedNameText.style.cssText = "font-size:0.9rem;font-weight:700;color:#111827;";

  const btnGroup = document.createElement("div");
  btnGroup.style.cssText = "display:flex;gap:8px;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cssText =
    "padding:7px 14px;border:1px solid #cbd5e1;border-radius:8px;background:#ffffff;color:#334155;font-weight:600;cursor:pointer;";
  cancelBtn.onclick = () => modal.remove();

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.style.cssText =
    "padding:7px 16px;border:none;border-radius:8px;background:#0f766e;color:#ffffff;font-weight:700;cursor:pointer;";

  function syncColorUI() {
    const pureHueHex = hsvToHex(hue, 1, 1);
    shadeArea.style.background = pureHueHex;
    hueKnob.style.left = `${(hue / 360) * 100}%`;
    hueKnob.style.background = pureHueHex;

    const chosenHex = hsvToHex(hue, sat, val);
    const cname = getColorNameFromHsv(hue, sat, val);
    leftSwatch.style.background = chosenHex;
    thumbRing.style.left = `${sat * 100}%`;
    thumbRing.style.top = `${(1 - val) * 100}%`;
    colorNameBadge.textContent = cname;
    selectedNameText.textContent = cname;
    applyBtn.style.background = chosenHex;
    return chosenHex;
  }

  function updateShadeFromPointer(clientX, clientY) {
    const rect = shadeArea.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
    const y = Math.min(Math.max(0, clientY - rect.top), rect.height);
    sat = rect.width ? x / rect.width : 0.85;
    val = rect.height ? 1 - y / rect.height : 0.85;
    const hex = syncColorUI();
    applyDraftThemeColor(hex);
  }

  function updateHueFromPointer(clientX) {
    const rect = hueTrackWrap.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
    hue = rect.width ? (x / rect.width) * 360 : 0;
    const hex = syncColorUI();
    applyDraftThemeColor(hex);
  }

  let draggingShade = false;
  shadeArea.addEventListener("pointerdown", (e) => {
    draggingShade = true;
    shadeArea.setPointerCapture(e.pointerId);
    updateShadeFromPointer(e.clientX, e.clientY);
  });
  shadeArea.addEventListener("pointermove", (e) => {
    if (draggingShade) updateShadeFromPointer(e.clientX, e.clientY);
  });
  shadeArea.addEventListener("pointerup", () => {
    draggingShade = false;
  });

  let draggingHue = false;
  hueTrackWrap.addEventListener("pointerdown", (e) => {
    draggingHue = true;
    hueTrackWrap.setPointerCapture(e.pointerId);
    updateHueFromPointer(e.clientX);
  });
  hueTrackWrap.addEventListener("pointermove", (e) => {
    if (draggingHue) updateHueFromPointer(e.clientX);
  });
  hueTrackWrap.addEventListener("pointerup", () => {
    draggingHue = false;
  });

  applyBtn.onclick = () => {
    const finalHex = syncColorUI();
    applyDraftThemeColor(finalHex);
    modal.remove();
    attachOwnerStoreEditHandlers();
  };

  sliderWrap.appendChild(hueTrackWrap);
  btnGroup.appendChild(cancelBtn);
  btnGroup.appendChild(applyBtn);
  footer.appendChild(selectedNameText);
  footer.appendChild(btnGroup);
  sliderWrap.appendChild(footer);

  card.appendChild(header);
  card.appendChild(body);
  card.appendChild(sliderWrap);
  modal.appendChild(card);
  document.body.appendChild(modal);

  syncColorUI();
}

function ensureOwnerInlineFileInput() {
  let input = document.getElementById("ownerLivePhotoInput");
  if (!input) {
    input = document.createElement("input");
    input.type = "file";
    input.id = "ownerLivePhotoInput";
    input.accept = "image/*";
    input.style.display = "none";
    input.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file || !pendingOwnerEditSlot) return;

      const rawUrl = await readImageAsDataURL(file, 900);
      if (!rawUrl) return;

      const slotInfo = pendingOwnerEditSlot;
      pendingOwnerEditSlot = null;

      const isCover = slotInfo.type === "cover";
      const adjustedUrl = await openPhotoPositionEditor(
        rawUrl,
        isCover ? 16 / 9 : 1,
        isCover ? 720 : 500
      );
      if (!adjustedUrl) return;

      const data = getWorkingStoreData();
      if (isCover) {
        const slotIdx = Number.isInteger(slotInfo.slotIdx) ? slotInfo.slotIdx : 0;
        const wasFirstEmpty = slotIdx === 0 && !data.coverSlots[0];
        data.coverSlots[slotIdx] = adjustedUrl;
        data.coverImg = data.coverSlots[0] || adjustedUrl;
        renderHeader();
        attachOwnerStoreEditHandlers();
        if (wasFirstEmpty) {
          peekNextCoverHint();
        }
      } else if (slotInfo.type === "item") {
        const { sIdx, itemId } = slotInfo;
        const item = data.sections[sIdx]?.items?.find((i) => i.id === itemId);
        if (item) {
          item.img = adjustedUrl;
        }
        renderHeader();
        renderSections();
        attachOwnerStoreEditHandlers();
      }
    });
    document.body.appendChild(input);
  }
  return input;
}

function addCoverInEditMode() {
  const data = getWorkingStoreData();
  const maxAllowed = MAX_COVER_SLOTS;
  if (!Array.isArray(data.coverSlots)) data.coverSlots = [""];
  if (data.coverSlots.length >= maxAllowed) {
    alert(`Cover limit reached (${maxAllowed} max).`);
    return;
  }
  if ((data.coverSlotsLimit || 1) < data.coverSlots.length + 1) {
    data.coverSlotsLimit = data.coverSlots.length + 1;
  }
  data.coverSlots.push("");
  renderHeader();
  attachOwnerStoreEditHandlers();
  const track = document.getElementById("coverSliderTrack");
  if (track) {
    track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
  }
}

function removeCoverSlotAt(slotIdx) {
  const data = getWorkingStoreData();
  if (!Array.isArray(data.coverSlots) || data.coverSlots.length === 0) {
    data.coverSlots = [""];
  }

  if (data.coverSlots.length <= 1) {
    data.coverSlots[0] = "";
    data.coverImg = "";
  } else {
    const safeIdx = Math.max(0, Math.min(data.coverSlots.length - 1, slotIdx));
    data.coverSlots.splice(safeIdx, 1);
    data.coverImg = data.coverSlots.find(Boolean) || "";
  }

  renderHeader();
  attachOwnerStoreEditHandlers();
}

function addBoxToSection(sIdx) {
  const data = getWorkingStoreData();
  const sec = data.sections[sIdx];
  if (!sec) return;
  const maxBoxes = Math.min(MAX_INDEX_BOXES, Math.max(0, Number(data.indexBoxLimit ?? MAX_INDEX_BOXES)));
  const currentCount = sIdx === 0 ? Math.min(4, sec.items.length) : sec.items.length;

  if (currentCount >= maxBoxes) {
    alert(`Box limit reached (${maxBoxes} max).`);
    return;
  }

  sec.items.push({
    id: `${sIdx}-${Date.now()}-${sec.items.length + 1}`,
    name: "Item",
    price: 0,
    img: ""
  });

  renderSections();
  attachOwnerStoreEditHandlers();
}

function removeBoxFromSection(sIdx) {
  const data = getWorkingStoreData();
  const sec = data.sections[sIdx];
  if (!sec) return;
  const minBoxes = sIdx === 0 ? 1 : 0;
  if (sec.items.length <= minBoxes) return;

  sec.items.pop();
  renderSections();
  attachOwnerStoreEditHandlers();
}

function addBottomStoreRow() {
  const data = getWorkingStoreData();
  const maxRows = Math.min(MAX_INDEX_BOXES, Math.max(1, Number(data.indexBoxLimit ?? MAX_INDEX_BOXES)));
  if (data.sections.length >= maxRows) {
    alert(`Row limit reached (${maxRows} max).`);
    return;
  }

  const rowNum = data.sections.length + 1;
  const items = [];
  for (let i = 1; i <= 5; i++) {
    items.push({ id: `${rowNum}-${Date.now()}-${i}`, name: "Item", price: 0, img: "" });
  }
  data.sections.push({
    title: "New Row",
    items
  });

  renderSections();
  attachOwnerStoreEditHandlers();
}

function removeBottomStoreRow() {
  const data = getWorkingStoreData();
  if (data.sections.length <= 1) return;
  data.sections.pop();
  renderSections();
  attachOwnerStoreEditHandlers();
}

function enableStoreNameDragOnCover(coverWrap, overlayEl) {
  const data = getWorkingStoreData();
  if (!data.titlePos) data.titlePos = { x: 0, y: 0 };
  overlayEl.style.cursor = "move";
  overlayEl.style.touchAction = "none";

  let dragging = false;
  let startX = 0;
  let startY = 0;

  overlayEl.onpointerdown = (e) => {
    if (e.target.closest("button")) return;
    e.stopPropagation();
    dragging = true;
    overlayEl.setPointerCapture(e.pointerId);
    startX = e.clientX - (Number(data.titlePos.x) || 0);
    startY = e.clientY - (Number(data.titlePos.y) || 0);
  };

  overlayEl.onpointermove = (e) => {
    if (!dragging) return;
    const wrapRect = coverWrap.getBoundingClientRect();
    const boxW = overlayEl.offsetWidth || 0;
    const boxH = overlayEl.offsetHeight || 0;

    const maxX = Math.max(0, wrapRect.width - boxW);
    const maxY = Math.max(0, wrapRect.height - boxH);

    const nx = Math.min(maxX, Math.max(0, e.clientX - startX));
    const ny = Math.min(maxY, Math.max(0, e.clientY - startY));

    data.titlePos = {
      x: Math.round(nx),
      y: Math.round(ny)
    };
    applyTitlePositionStyle();
  };

  overlayEl.onpointerup = () => {
    dragging = false;
  };
}

function attachOwnerStoreEditHandlers() {
  if (!OWNER_EDIT_MODE || document.body.getAttribute("data-page") === "owner") return;

  const data = getWorkingStoreData();
  const fileInput = ensureOwnerInlineFileInput();
  removeOwnerStoreEditUI();

  const activeColor = data.themeColor || "#0f766e";
  document.documentElement.style.setProperty("--primary", activeColor);

  const bar = document.createElement("div");
  bar.id = "ownerLiveSaveBar";
  bar.style.cssText =
    `position:sticky;top:0;z-index:80;background:${activeColor};color:#ffffff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;`;

  const info = document.createElement("span");
  info.textContent = "Draft mode: Tap Save to update store";
  info.style.cssText = "font-size:0.8rem;font-weight:600;";

  const actions = document.createElement("div");
  actions.style.cssText = "display:flex;gap:6px;align-items:center;";

  const colorBtn = document.createElement("button");
  colorBtn.type = "button";
  colorBtn.textContent = "✎ Color";
  colorBtn.style.cssText =
    "padding:6px 10px;border:1px solid rgba(255,255,255,0.65);border-radius:8px;background:rgba(255,255,255,0.16);color:#ffffff;font-size:0.78rem;font-weight:700;cursor:pointer;";
  colorBtn.onclick = (e) => {
    e.stopPropagation();
    openCustomColourPickerModal();
  };

  const saveBtn = document.createElement("button");
  saveBtn.id = "ownerLiveSaveBtn";
  saveBtn.type = "button";
  saveBtn.textContent = "Save";
  saveBtn.style.cssText =
    `padding:7px 14px;border:none;border-radius:8px;background:#ffffff;color:${activeColor};font-weight:700;cursor:pointer;`;
  saveBtn.onclick = () => {
    commitDraftStoreData();
    removeOwnerStoreEditUI();
    window.location.href = "index.html";
  };

  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.textContent = "Store";
  backBtn.style.cssText =
    "padding:7px 10px;border:1px solid rgba(255,255,255,0.55);border-radius:8px;background:transparent;color:#ffffff;font-weight:600;cursor:pointer;";
  backBtn.onclick = () => {
    draftStoreData = null;
    removeOwnerStoreEditUI();
    window.location.href = "index.html";
  };

  actions.appendChild(colorBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(backBtn);
  bar.appendChild(info);
  bar.appendChild(actions);
  document.body.prepend(bar);

  const coverWrap = document.querySelector(".cover-wrapper");
  if (coverWrap) {
    coverWrap.style.position = "relative";
    coverWrap.style.overflow = "hidden";

    const overlayEl = coverWrap.querySelector(".cover-overlay");
    const titleEl = document.getElementById("storeTitle");
    if (overlayEl && titleEl) {
      overlayEl.style.zIndex = "22";
      enableStoreNameDragOnCover(coverWrap, overlayEl);

      const pencilBtn = document.createElement("button");
      pencilBtn.type = "button";
      pencilBtn.className = "owner-inline-edit-btn";
      pencilBtn.textContent = "✎";
      pencilBtn.title = "Edit Store Name";
      pencilBtn.style.cssText =
        "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:25;padding:1px 5px;margin:0;border:1px solid #0f172a;border-radius:4px;background:rgba(255,255,255,0.92);color:#0f172a;font-size:0.75rem;font-weight:700;line-height:1;cursor:pointer;";
      pencilBtn.onclick = (e) => {
        e.stopPropagation();
        const currentName = data.storeTitle || "";
        const next = prompt("Enter Store Name:", currentName);
        if (next !== null) {
          data.storeTitle = next.trim() || "Store";
          renderHeader();
          attachOwnerStoreEditHandlers();
        }
      };
      overlayEl.appendChild(pencilBtn);
    }

    const slides = coverWrap.querySelectorAll(".cover-slide-item");
    slides.forEach((slide, idx) => {
      const slidePhotoBtn = document.createElement("button");
      slidePhotoBtn.type = "button";
      slidePhotoBtn.className = "owner-inline-edit-btn";
      slidePhotoBtn.textContent = `Update ${idx + 1}`;
      slidePhotoBtn.style.cssText =
        `position:absolute;top:10px;right:48px;z-index:20;padding:5px 10px;border:none;border-radius:8px;background:#ffffff;color:${data.themeColor || "#0f766e"};font-size:0.76rem;font-weight:700;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.25);`;
      slidePhotoBtn.onclick = (e) => {
        e.stopPropagation();
        pendingOwnerEditSlot = { type: "cover", slotIdx: idx };
        fileInput.value = "";
        fileInput.click();
      };

      const slideDeleteBtn = document.createElement("button");
      slideDeleteBtn.type = "button";
      slideDeleteBtn.className = "owner-inline-edit-btn";
      slideDeleteBtn.textContent = "✕";
      slideDeleteBtn.title = "Delete Cover";
      slideDeleteBtn.style.cssText =
        "position:absolute;top:10px;right:10px;z-index:20;width:30px;height:28px;border:none;border-radius:8px;background:#fee2e2;color:#dc2626;font-size:0.85rem;font-weight:700;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.25);";
      slideDeleteBtn.onclick = (e) => {
        e.stopPropagation();
        removeCoverSlotAt(idx);
      };

      slide.appendChild(slidePhotoBtn);
      slide.appendChild(slideDeleteBtn);
    });

    const addCoverBtn = document.createElement("button");
    addCoverBtn.type = "button";
    addCoverBtn.className = "owner-inline-edit-btn";
    addCoverBtn.textContent = "+ Cover";
    addCoverBtn.style.cssText =
      `position:absolute;bottom:10px;right:10px;z-index:20;padding:5px 10px;border:none;border-radius:8px;background:#ffffff;color:${data.themeColor || "#0f766e"};font-size:0.76rem;font-weight:700;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.25);`;
    addCoverBtn.onclick = (e) => {
      e.stopPropagation();
      addCoverInEditMode();
    };

    coverWrap.appendChild(addCoverBtn);
  }

  const sectionEls = document.querySelectorAll("#sectionsContainer .row-section");
  sectionEls.forEach((secEl, sIdx) => {
    const sec = data.sections[sIdx];
    if (!sec) return;

    const stripEl = secEl.querySelector(".strip-bar");
    const stripTitle = secEl.querySelector(".strip-title");
    if (stripEl && stripTitle) {
      const secEditBtn = document.createElement("button");
      secEditBtn.type = "button";
      secEditBtn.className = "owner-inline-edit-btn";
      secEditBtn.textContent = "✎";
      secEditBtn.title = "Edit Name";
      secEditBtn.style.cssText =
        "margin-left:8px;padding:3px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;color:#111827;font-size:0.78rem;font-weight:700;cursor:pointer;";
      secEditBtn.onclick = (e) => {
        e.stopPropagation();
        const next = prompt("Edit Name:", stripAllDigits(sec.title || "", "Section"));
        if (next !== null) {
          sec.title = stripAllDigits(next, "Section");
          renderSections();
          attachOwnerStoreEditHandlers();
        }
      };
      stripTitle.insertAdjacentElement("afterend", secEditBtn);
    }

    const cards = secEl.querySelectorAll(".mini-box:not(.user-photo-only-box), .item-box");
    cards.forEach((card, idx) => {
      const item = sIdx === 0 ? sec.items.slice(0, 4)[idx] : sec.items[idx];
      if (!item) return;

      card.style.position = "relative";

      const photoBtn = document.createElement("button");
      photoBtn.type = "button";
      photoBtn.className = "owner-inline-edit-btn";
      photoBtn.textContent = "✎";
      photoBtn.title = "Edit Photo";
      photoBtn.style.cssText =
        `position:absolute;top:6px;right:6px;z-index:4;width:24px;height:24px;border:none;border-radius:6px;background:${data.themeColor || "#0f766e"};color:#ffffff;font-size:0.75rem;font-weight:700;cursor:pointer;`;
      photoBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        pendingOwnerEditSlot = { type: "item", sIdx, itemId: item.id };
        fileInput.value = "";
        fileInput.click();
      };
      card.appendChild(photoBtn);

      const nameEl = card.querySelector(".mini-box-name, .item-name");
      if (nameEl) {
        const nameBtn = document.createElement("button");
        nameBtn.type = "button";
        nameBtn.className = "owner-inline-edit-btn";
        nameBtn.textContent = "✎";
        nameBtn.title = "Edit Name";
        nameBtn.style.cssText =
          "margin-left:4px;padding:1px 6px;border:1px solid #cbd5e1;border-radius:5px;background:#f1f5f9;color:#111827;font-size:0.72rem;font-weight:700;cursor:pointer;";
        nameBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const next = prompt("Edit Name:", stripAllDigits(item.name || "", "Item"));
          if (next !== null) {
            item.name = stripAllDigits(next, "Item");
            renderSections();
            attachOwnerStoreEditHandlers();
          }
        };
        nameEl.insertAdjacentElement("afterend", nameBtn);
      }

      const priceBtn = document.createElement("button");
      priceBtn.type = "button";
      priceBtn.className = "owner-inline-edit-btn";
      priceBtn.textContent = "₹";
      priceBtn.title = "Set Amount";
      priceBtn.style.cssText =
        "margin-left:4px;padding:1px 6px;border:1px solid #cbd5e1;border-radius:5px;background:#fefce8;color:#854d0e;font-size:0.72rem;font-weight:700;cursor:pointer;";
      priceBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentPrice = Number(item.price || 0);
        const next = prompt("Set Amount (₹):", String(currentPrice));
        if (next !== null) {
          const parsed = Number(next.replace(/[^\d.]/g, ""));
          item.price = Number.isNaN(parsed) ? 0 : parsed;
          renderSections();
          attachOwnerStoreEditHandlers();
        }
      };
      card.appendChild(priceBtn);
    });

    if (sIdx > 0) {
      const scrollEl = secEl.querySelector(".scroll-row");
      if (scrollEl) {
        const addBoxBtn = document.createElement("button");
        addBoxBtn.type = "button";
        addBoxBtn.className = "owner-inline-edit-btn";
        addBoxBtn.textContent = "+ Box";
        addBoxBtn.style.cssText =
          `flex:0 0 auto;align-self:center;padding:10px 14px;border:1px dashed ${data.themeColor || "#0f766e"};border-radius:14px;background:#f0fdfa;color:${data.themeColor || "#0f766e"};font-size:0.82rem;font-weight:700;cursor:pointer;`;
        addBoxBtn.onclick = (e) => {
          e.stopPropagation();
          addBoxToSection(sIdx);
        };

        const remBoxBtn = document.createElement("button");
        remBoxBtn.type = "button";
        remBoxBtn.className = "owner-inline-edit-btn";
        remBoxBtn.textContent = "−";
        remBoxBtn.title = "Remove Last Box";
        remBoxBtn.style.cssText =
          "flex:0 0 auto;align-self:center;padding:10px 12px;border:1px solid #fecaca;border-radius:14px;background:#fee2e2;color:#dc2626;font-size:0.9rem;font-weight:700;cursor:pointer;";
        remBoxBtn.onclick = (e) => {
          e.stopPropagation();
          removeBoxFromSection(sIdx);
        };

        scrollEl.appendChild(addBoxBtn);
        scrollEl.appendChild(remBoxBtn);
      }
    }
  });

  const sectionsContainer = document.getElementById("sectionsContainer");
  if (sectionsContainer) {
    const bottomControls = document.createElement("div");
    bottomControls.id = "ownerBottomRowControls";
    bottomControls.style.cssText =
      "display:flex;gap:10px;margin-top:12px;margin-bottom:16px;";

    const addRowBtn = document.createElement("button");
    addRowBtn.type = "button";
    addRowBtn.className = "owner-inline-edit-btn";
    addRowBtn.textContent = "+ Row";
    addRowBtn.style.cssText =
      `flex:1;padding:10px 14px;border:1px solid ${data.themeColor || "#0f766e"};border-radius:12px;background:#f0fdfa;color:${data.themeColor || "#0f766e"};font-size:0.88rem;font-weight:700;cursor:pointer;`;
    addRowBtn.onclick = () => addBottomStoreRow();

    const remRowBtn = document.createElement("button");
    remRowBtn.type = "button";
    remRowBtn.className = "owner-inline-edit-btn";
    remRowBtn.textContent = "− Row";
    remRowBtn.style.cssText =
      "padding:10px 14px;border:1px solid #fecaca;border-radius:12px;background:#fee2e2;color:#dc2626;font-size:0.88rem;font-weight:700;cursor:pointer;";
    remRowBtn.onclick = () => removeBottomStoreRow();

    bottomControls.appendChild(addRowBtn);
    bottomControls.appendChild(remRowBtn);
    sectionsContainer.insertAdjacentElement("afterend", bottomControls);
  }
}

/* ==================== STORE PAGE (index.html) ==================== */
function applyTitlePositionStyle() {
  const data = getWorkingStoreData();
  const overlayEl = document.querySelector(".cover-overlay");
  const titleEl = document.getElementById("storeTitle");
  if (!overlayEl) return;

  const pos = data.titlePos || { x: 0, y: 0 };
  overlayEl.style.position = "absolute";
  overlayEl.style.left = `${pos.x}px`;
  overlayEl.style.top = `${pos.y}px`;
  overlayEl.style.right = "auto";
  overlayEl.style.bottom = "auto";
  overlayEl.style.width = "fit-content";
  overlayEl.style.height = "fit-content";
  overlayEl.style.maxWidth = "100%";
  overlayEl.style.margin = "0";
  overlayEl.style.padding = "0";
  overlayEl.style.display = "inline-block";
  overlayEl.style.boxSizing = "border-box";
  overlayEl.style.zIndex = "15";

  if (titleEl) {
    titleEl.style.display = "block";
    titleEl.style.margin = "0";
    titleEl.style.padding = "0";
    titleEl.style.lineHeight = "1.05";
    titleEl.style.whiteSpace = "normal";
    titleEl.style.overflowWrap = "anywhere";
    titleEl.style.wordBreak = "break-word";
  }

  if (OWNER_EDIT_MODE) {
    overlayEl.style.border = "1px solid #ffffff";
    overlayEl.style.borderRadius = "0px";
    overlayEl.style.background = "rgba(15, 23, 42, 0.45)";
  } else {
    overlayEl.style.border = "none";
    overlayEl.style.borderRadius = "0px";
    overlayEl.style.background = "transparent";
  }
}

function renderHeader() {
  const data = getWorkingStoreData();
  if (data.themeColor) {
    document.documentElement.style.setProperty("--primary", data.themeColor);
  }
  const titleEl = document.getElementById("storeTitle");
  if (!titleEl) return;
  titleEl.textContent = data.storeTitle || "Store";
  const subEl = document.getElementById("storeSubtitle");
  if (subEl) subEl.textContent = data.storeSubtitle || "";

  const coverWrap = document.querySelector(".cover-wrapper");
  if (!coverWrap) return;

  coverWrap.style.position = "relative";
  coverWrap.style.overflow = "hidden";
  applyTitlePositionStyle();

  const slots = Array.isArray(data.coverSlots) && data.coverSlots.length > 0 ? data.coverSlots : [""];
  const visibleSlots = OWNER_EDIT_MODE ? slots : slots.filter(Boolean);

  let track = document.getElementById("coverSliderTrack");
  if (!track) {
    track = document.createElement("div");
    track.id = "coverSliderTrack";
    track.style.cssText =
      "display:flex;width:100%;height:100%;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;";
    const oldImg = document.getElementById("coverImage");
    if (oldImg) oldImg.style.display = "none";
    coverWrap.prepend(track);
  }

  track.innerHTML = "";

  if (visibleSlots.length === 0) {
    clearInterval(coverAutoScrollTimer);
    track.style.display = "none";
    return;
  }

  track.style.display = "flex";
  visibleSlots.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = "cover-slide-item";
    slide.dataset.slotIdx = String(idx);
    slide.style.cssText =
      "position:relative;flex:0 0 100%;width:100%;height:100%;min-height:150px;scroll-snap-align:start;background:#e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;";

    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Cover";
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      slide.appendChild(img);
    } else if (OWNER_EDIT_MODE) {
      const emptyTxt = document.createElement("span");
      emptyTxt.textContent = `Cover ${idx + 1}`;
      emptyTxt.style.cssText = "font-size:0.85rem;font-weight:700;color:#64748b;";
      slide.appendChild(emptyTxt);
    }

    track.appendChild(slide);
  });

  startCoverAutoScroll(track, visibleSlots.length);
  if (!OWNER_EDIT_MODE) {
    hideDigitsOnUserPage();
  }
}

function renderSections() {
  const data = getWorkingStoreData();
  const container = document.getElementById("sectionsContainer");
  if (!container) return;
  container.innerHTML = "";
  const savedPhoto = data.userProfile?.photo || "";
  const maxBoxes = Math.min(MAX_INDEX_BOXES, Math.max(0, Number(data.indexBoxLimit ?? MAX_INDEX_BOXES)));

  data.sections.forEach((sec, sIdx) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "row-section";

    const displayTitle = getSectionTitleForView(sec.title || "", sIdx);

    const stripEl = document.createElement("div");
    stripEl.className = "strip-bar";
    stripEl.innerHTML = `
      <span class="strip-title">${displayTitle}</span>
      <span class="strip-tag">Swipe →</span>
    `;
    sectionEl.appendChild(stripEl);

    if (sIdx === 0) {
      const fiveRow = document.createElement("div");
      fiveRow.className = "five-boxes-row";

      sec.items.slice(0, Math.min(4, maxBoxes)).forEach((item) => {
        const cleanItemName = stripAllDigits(item.name || "", "Item");
        const amountVal = Number(item.price || 0);
        const priceDisplay = `₹${amountVal}`;
        const box = document.createElement("div");
        box.className = "mini-box";
        box.onclick = () => {
          if (OWNER_EDIT_MODE) return;
          openOrderModal(0, item.id);
        };
        box.innerHTML = `
          ${imgMarkup(item.img, cleanItemName, true)}
          <div class="mini-box-body">
            <div class="mini-box-name">${cleanItemName}</div>
            <div class="mini-box-price">${priceDisplay}</div>
          </div>
        `;
        fiveRow.appendChild(box);
      });

      const fifthBox = document.createElement("div");
      fifthBox.className = "mini-box user-photo-only-box" + (savedPhoto ? " has-photo" : "");
      fifthBox.onclick = () => {
        if (OWNER_EDIT_MODE) return;
        window.location.href = "profile.html";
      };
      fifthBox.innerHTML = savedPhoto
        ? `<img src="${savedPhoto}" alt="User Photo" />`
        : `<div class="user-placeholder-label">Profile</div>`;

      fiveRow.appendChild(fifthBox);
      sectionEl.appendChild(fiveRow);
    } else {
      const scrollEl = document.createElement("div");
      scrollEl.className = "scroll-row";

      sec.items.slice(0, maxBoxes).forEach((item) => {
        const cleanItemName = stripAllDigits(item.name || "", "Item");
        const amountVal = Number(item.price || 0);
        const priceDisplay = `₹${amountVal}`;
        const box = document.createElement("div");
        box.className = "item-box";
        box.innerHTML = `
          ${imgMarkup(item.img, cleanItemName, false)}
          <div class="item-info">
            <div class="item-name" title="${cleanItemName}">${cleanItemName}</div>
            <div class="item-price">${priceDisplay}</div>
            <button type="button" class="buy-btn" onclick="if(!OWNER_EDIT_MODE)openOrderModal(${sIdx}, '${item.id}')">Order</button>
          </div>
        `;
        scrollEl.appendChild(box);
      });

      sectionEl.appendChild(scrollEl);
    }

    container.appendChild(sectionEl);
  });

  if (!OWNER_EDIT_MODE) {
    hideDigitsOnUserPage();
  }
}

function openOrderModal(sectionIdx, itemId) {
  const item = storeData.sections[sectionIdx]?.items.find((i) => i.id === itemId);
  if (!item) return;
  activeOrderItem = item;
  const amountVal = Number(item.price || 0);
  document.getElementById("modalItemTitle").textContent = stripAllDigits(item.name || "", "Item");
  document.getElementById("modalItemPrice").textContent = `Price: ₹${amountVal}`;

  const up = storeData.userProfile || {};
  const fullName = [up.firstName, up.surname].filter(Boolean).join(" ");
  document.getElementById("orderCustomer").value = fullName;
  document.getElementById("orderQty").value = "1";
  document.getElementById("orderModal").classList.add("active");
}

function closeOrderModal() {
  document.getElementById("orderModal").classList.remove("active");
  activeOrderItem = null;
}

function confirmOrder() {
  if (!activeOrderItem) return;
  const up = storeData.userProfile || {};
  const defaultName = [up.firstName, up.surname].filter(Boolean).join(" ") || "Customer";
  const customer = document.getElementById("orderCustomer").value.trim() || defaultName;
  const qty = Math.max(1, parseInt(document.getElementById("orderQty").value, 10) || 1);
  const unitPrice = Number(activeOrderItem.price || 0);
  const amount = unitPrice * qty;
  const cleanItemName = stripAllDigits(activeOrderItem.name || "", "Item");

  storeData.orders.push({
    customer,
    customerPhone: up.phone || "",
    customerPhoto: up.photo || "",
    itemId: activeOrderItem.id,
    itemName: cleanItemName,
    itemPrice: unitPrice,
    itemImg: activeOrderItem.img || "",
    qty,
    amount
  });

  saveData();
  closeOrderModal();
  alert(`Order Placed: ${cleanItemName} (₹${amount})`);
}

function openPinModal() {
  window.location.href = "owner.html";
}

/* ==================== OWNER WORKSPACE (owner.html) ==================== */
function goToStoreFromPin() {
  window.location.href = "index.html";
}

function verifyPin() {
  if (document.getElementById("ownerPinInput").value.trim() === OWNER_PIN) {
    document.getElementById("pinModal").classList.remove("active");
    const panel = document.getElementById("ownerPanel");
    if (panel) panel.classList.add("active");
    renderOwnerWorkspace();
  } else {
    alert("Incorrect PIN");
  }
}

function lockOwnerPage() {
  const panel = document.getElementById("ownerPanel");
  if (panel) panel.classList.remove("active");
  const pinInput = document.getElementById("ownerPinInput");
  if (pinInput) pinInput.value = "";
  const pinModal = document.getElementById("pinModal");
  if (pinModal) pinModal.classList.add("active");
}

function renderOwnerWorkspace() {
  updateLimitsBadge();
  renderFolderGrid();
}

function updateLimitsBadge() {
  const badge = document.getElementById("limitsSummaryBadge");
  if (badge) {
    badge.textContent = `${storeData.ownerBoxLimit} / ${storeData.coverSlotsLimit}`;
  }
}

function openExpandLimitsModal() {
  document.getElementById("ownerBoxLimitInput").value = storeData.ownerBoxLimit;
  document.getElementById("indexBoxLimitInput").value = storeData.indexBoxLimit;
  document.getElementById("coverSlotsLimitInput").value = storeData.coverSlotsLimit;
  document.getElementById("expandLimitsModal").classList.add("active");
}

function closeExpandLimitsModal() {
  document.getElementById("expandLimitsModal").classList.remove("active");
}

function saveExpandLimits() {
  const ownerLim = Math.min(MAX_OWNER_BOXES, Math.max(1, parseInt(document.getElementById("ownerBoxLimitInput").value, 10) || MAX_OWNER_BOXES));
  const indexLim = Math.min(MAX_INDEX_BOXES, Math.max(0, parseInt(document.getElementById("indexBoxLimitInput").value, 10) || MAX_INDEX_BOXES));
  const coverLim = Math.min(MAX_COVER_SLOTS, Math.max(1, parseInt(document.getElementById("coverSlotsLimitInput").value, 10) || 1));

  storeData.ownerBoxLimit = ownerLim;
  storeData.indexBoxLimit = indexLim;
  storeData.coverSlotsLimit = coverLim;

  while (storeData.coverSlots.length > coverLim) {
    storeData.coverSlots.pop();
  }

  saveData();
  closeExpandLimitsModal();
  updateLimitsBadge();
}

function renderFolderGrid() {
  const grid = document.getElementById("ownerFoldersGrid");
  if (!grid) return;
  grid.innerHTML = "";

  storeData.ownerFolders.forEach((folder, idx) => {
    const card = document.createElement("div");
    const isNamed = Boolean(folder.name && folder.name.trim());
    const label = isNamed ? folder.name : `Folder ${idx - 3}`;

    card.className =
      "folder-card" +
      (idx === activeFolderIdx ? " active" : "") +
      (folder.isCustom ? " empty-custom" : "") +
      (isNamed ? " named" : "");

    card.onclick = () => selectOwnerFolder(idx);

    const nameSpan = document.createElement("span");
    nameSpan.className = "folder-card-name";
    nameSpan.textContent = label;

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "icon-mini-btn";
    editBtn.title = "Edit Name";
    editBtn.textContent = "✎";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      renameFolderAt(idx);
    };

    card.appendChild(nameSpan);
    card.appendChild(editBtn);
    grid.appendChild(card);
  });
}

function renameFolderAt(idx) {
  const folder = storeData.ownerFolders[idx];
  const current = folder.name || "";
  const next = prompt("Enter Folder Name:", current);
  if (next !== null) {
    folder.name = next.trim();
    saveData();
    renderFolderGrid();
    const heading = document.getElementById("activeFolderHeading");
    if (heading && idx === activeFolderIdx) {
      heading.textContent = folder.name || `Folder ${idx - 3}`;
    }
  }
}

function renameActiveFolder() {
  renameFolderAt(activeFolderIdx);
}

function selectOwnerFolder(idx) {
  activeFolderIdx = idx;
  renderFolderGrid();

  const folder = storeData.ownerFolders[idx];
  const heading = document.getElementById("activeFolderHeading");
  if (heading && folder) {
    heading.textContent = folder.name || (folder.isCustom ? `Folder ${idx - 3}` : "");
  }

  document.querySelectorAll(".folder-tab-pane").forEach((el) => {
    el.style.display = "none";
  });

  if (idx === 1) {
    const tab = document.getElementById("tabActiveUsers");
    if (tab) {
      tab.style.display = "block";
      renderActiveUsersTab();
    }
  } else if (idx === 2) {
    const tab = document.getElementById("tabSoldItems");
    if (tab) {
      tab.style.display = "block";
      renderSoldItemsTab();
    }
  } else if (idx === 3) {
    const tab = document.getElementById("tabBuyers");
    if (tab) {
      tab.style.display = "block";
      renderBuyersTab();
    }
  } else if (idx >= 4) {
    const tab = document.getElementById("tabCustomFolder");
    if (tab) {
      tab.style.display = "block";
      renderCustomFolderTab();
    }
  }
}

function renderActiveUsersTab() {
  const users = storeData.activeUsers || [];
  const countEl = document.getElementById("activeUsersCount") || document.getElementById("activeUsersTabCount");
  if (countEl) countEl.textContent = users.length;
  const boxesEl = document.getElementById("ownerUserBoxesCount");
  if (boxesEl) boxesEl.textContent = `${storeData.ownerUserBoxes.length} / ${storeData.ownerBoxLimit}`;
  const input = document.getElementById("usersTabNameInput");
  if (input) input.value = storeData.ownerFolders[1]?.customName || "";
  renderPaginatedUsers();
}

function toggleUsersList() {
  const wrap = document.getElementById("activeUsersListWrap");
  if (!wrap) return;
  const btn = document.getElementById("toggleUsersBtn");
  const isHidden = wrap.style.display === "none";
  wrap.style.display = isHidden ? "block" : "none";
  if (btn) btn.textContent = isHidden ? "Hide List" : "View List";
  if (isHidden) renderPaginatedUsers();
}

function renderPaginatedUsers() {
  const users = storeData.activeUsers || [];
  const list = document.getElementById("activeUsersList");
  const loadMoreBtn = document.getElementById("loadMoreUsersBtn");
  if (!list) return;
  list.innerHTML = "";

  const isOwnerPage = document.body.getAttribute("data-page") === "owner";

  const slice = users.slice(0, usersVisibleLimit);
  slice.forEach((u) => {
    const fullName = [u.firstName, u.surname].filter(Boolean).join(" ") || "User";
    const thumbHtml = u.photo
      ? `<img class="row-thumb round" src="${u.photo}" alt="${fullName}" />`
      : `<div class="row-thumb round">${fullName.charAt(0).toUpperCase()}</div>`;

    const subText = isOwnerPage
      ? (u.phone || u.provider || "Active")
      : (u.provider || "");

    const row = document.createElement("div");
    row.className = "list-row-card";
    row.innerHTML = `
      <div class="list-row-left">
        ${thumbHtml}
        <div>
          <div class="row-main-text">${fullName}</div>
          ${subText ? `<div class="row-sub-text">${subText}</div>` : ""}
        </div>
      </div>
    `;
    list.appendChild(row);
  });

  if (loadMoreBtn) {
    loadMoreBtn.style.display = users.length > usersVisibleLimit ? "block" : "none";
  }
}

function loadMoreUsers() {
  usersVisibleLimit += 10;
  renderPaginatedUsers();
}

function renderSoldItemsTab() {
  const totalSold = storeData.orders.reduce((s, o) => s + o.qty, 0);
  const totalRev = storeData.orders.reduce((s, o) => s + o.amount, 0);

  const soldEl = document.getElementById("statSold") || document.getElementById("statSoldTab");
  if (soldEl) soldEl.textContent = totalSold;
  const revEl = document.getElementById("statRevenue");
  if (revEl) revEl.textContent = `₹${totalRev}`;
  const input = document.getElementById("salesTabNameInput");
  if (input) input.value = storeData.ownerFolders[2]?.customName || "";

  const grouped = {};
  storeData.orders.forEach((o) => {
    const key = stripAllDigits(o.itemName || "", "Item");
    if (!grouped[key]) {
      grouped[key] = {
        name: key,
        price: o.itemPrice || 0,
        img: o.itemImg || "",
        soldQty: 0
      };
    }
    grouped[key].soldQty += o.qty;
  });

  const list = document.getElementById("soldItemsList");
  if (!list) return;
  list.innerHTML = "";
  Object.values(grouped).forEach((item) => {
    const thumbHtml = item.img
      ? `<img class="row-thumb" src="${item.img}" alt="${item.name}" />`
      : `<div class="row-thumb">Item</div>`;

    const row = document.createElement("div");
    row.className = "list-row-card";
    row.innerHTML = `
      <div class="list-row-left">
        ${thumbHtml}
        <div>
          <div class="row-main-text">${item.name}</div>
          <div class="row-sub-text">Price: ₹${item.price}</div>
        </div>
      </div>
      <div class="row-actions">
        <span style="font-size:0.85rem; font-weight:700; color:var(--primary-dark);">Sold: ${item.soldQty}</span>
      </div>
    `;
    list.appendChild(row);
  });
}

function addOwnerBuyerBox() {
  if (storeData.ownerBuyerBoxes.length >= storeData.ownerBoxLimit) {
    alert(`Box limit reached (Max ${storeData.ownerBoxLimit}).`);
    return;
  }
  storeData.ownerBuyerBoxes.push({ name: "Buyer Box" });
  saveData();
  renderBuyersTab();
}

function renderBuyersTab() {
  const ordEl = document.getElementById("statOrders") || document.getElementById("statOrdersTab");
  if (ordEl) ordEl.textContent = storeData.orders.length;
  const boxesEl = document.getElementById("ownerBuyerBoxesCount");
  if (boxesEl) boxesEl.textContent = `${storeData.ownerBuyerBoxes.length} / ${storeData.ownerBoxLimit}`;
  const input = document.getElementById("buyersTabNameInput");
  if (input) input.value = storeData.ownerFolders[3]?.customName || "";

  const list = document.getElementById("buyersList");
  if (!list) return;
  list.innerHTML = "";

  const savedPhone = storeData.userProfile?.phone || "";

  storeData.orders.slice().reverse().forEach((o) => {
    const thumbHtml = o.customerPhoto
      ? `<img class="row-thumb round" src="${o.customerPhoto}" alt="${o.customer}" />`
      : `<div class="row-thumb round">${(o.customer || "C").charAt(0).toUpperCase()}</div>`;

    const phoneLine = o.customerPhone || savedPhone;
    const cleanItem = stripAllDigits(o.itemName || "", "Item");

    const row = document.createElement("div");
    row.className = "list-row-card";
    row.innerHTML = `
      <div class="list-row-left">
        ${thumbHtml}
        <div>
          <div class="row-main-text">${o.customer}</div>
          <div class="row-sub-text">${cleanItem} × ${o.qty}${phoneLine ? ` • ${phoneLine}` : ""}</div>
        </div>
      </div>
      <div class="row-actions">
        <span style="font-size:0.85rem; font-weight:700; color:var(--primary);">₹${o.amount}</span>
      </div>
    `;
    list.appendChild(row);
  });
}

function saveTabName(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const val = el.value.trim();
  storeData.ownerFolders[activeFolderIdx].customName = val;
  if (val) {
    storeData.ownerFolders[activeFolderIdx].name = val;
    renderFolderGrid();
    const heading = document.getElementById("activeFolderHeading");
    if (heading) heading.textContent = val;
  }
  saveData();
  alert("Saved!");
}

function renderCustomFolderTab() {
  const folder = storeData.ownerFolders[activeFolderIdx];
  const leftLbl = document.getElementById("customBigLeftLabel");
  const rightLbl = document.getElementById("customBigRightLabel");
  const leftCnt = document.getElementById("customBigLeftCount");
  const rightCnt = document.getElementById("customBigRightCount");
  if (leftLbl) leftLbl.textContent = folder.bigLeftLabel || "Box 1";
  if (rightLbl) rightLbl.textContent = folder.bigRightLabel || "Box 2";
  if (leftCnt) leftCnt.textContent = (folder.entries || []).length;
  if (rightCnt) rightCnt.textContent = `${(folder.entries || []).length} / ${storeData.ownerBoxLimit}`;

  const list = document.getElementById("customFolderEntriesList");
  if (!list) return;
  list.innerHTML = "";

  (folder.entries || []).forEach((text, eIdx) => {
    const row = document.createElement("div");
    row.className = "list-row-card";
    row.innerHTML = `
      <div class="row-main-text">${text}</div>
      <div class="row-actions">
        <button type="button" class="icon-mini-btn danger-tone" title="Remove" onclick="removeCustomFolderEntry(${eIdx})">×</button>
      </div>
    `;
    list.appendChild(row);
  });
}

function renameCustomSubLabel(side) {
  const folder = storeData.ownerFolders[activeFolderIdx];
  if (side === "left") {
    const next = prompt("Edit Name:", folder.bigLeftLabel || "Box 1");
    if (next && next.trim()) folder.bigLeftLabel = next.trim();
  } else {
    const next = prompt("Edit Name:", folder.bigRightLabel || "Box 2");
    if (next && next.trim()) folder.bigRightLabel = next.trim();
  }
  saveData();
  renderCustomFolderTab();
}

function addCustomFolderEntry() {
  const folder = storeData.ownerFolders[activeFolderIdx];
  if ((folder.entries || []).length >= storeData.ownerBoxLimit) {
    alert(`Box limit reached (Max ${storeData.ownerBoxLimit}).`);
    return;
  }
  const input = document.getElementById("customEntryInput");
  const val = input.value.trim() || "Item";
  folder.entries.unshift(val);
  saveData();
  input.value = "";
  renderCustomFolderTab();
}

function removeCustomFolderEntry(eIdx) {
  const folder = storeData.ownerFolders[activeFolderIdx];
  folder.entries.splice(eIdx, 1);
  saveData();
  renderCustomFolderTab();
}

/* ==================== PROFILE PAGE (profile.html) ==================== */
function updateMainAvatarCircleUI() {
  const trigger = document.getElementById("avatarCircleTrigger");
  if (!trigger) return;
  if (draftPhoto) {
    trigger.classList.add("has-img");
    trigger.innerHTML = `<img src="${draftPhoto}" alt="Selected Profile" />`;
  } else {
    trigger.classList.remove("has-img");
    trigger.innerHTML = `<span class="plus-sign-icon">+</span>`;
  }
}

function openRegistrationPopup() {
  const modal = document.getElementById("userProfileModal");
  if (!modal) return;
  const up = storeData.userProfile;
  draftPhoto = up.photo || "";
  updateMainAvatarCircleUI();

  document.getElementById("userFirstName").value = up.firstName || "";
  document.getElementById("userSurname").value = up.surname || "";
  document.getElementById("userAge").value = up.age || "";
  document.getElementById("userGender").value = up.gender || "";
  document.getElementById("userPhone").value = up.phone || "";
  document.getElementById("userOtpInput").value = "";
  document.getElementById("otpStatusMsg").textContent = "";
  document.getElementById("otpStripPopup").classList.remove("active");
  clearInterval(otpCountdownInterval);

  const sendBtn = document.getElementById("sendOtpBtn");
  const badge = document.getElementById("phoneVerifiedBadge");
  if (up.otpVerified) {
    sendBtn.style.display = "none";
    badge.textContent = "Number Verified";
  } else {
    sendBtn.style.display = "inline-block";
    badge.textContent = "";
  }

  modal.classList.add("active");
}

function cancelRegistrationPopup() {
  clearInterval(otpCountdownInterval);
  document.getElementById("userProfileModal").classList.remove("active");
  window.location.href = "index.html";
}

function handleAvatarCircleClick() {
  if (storeData.mediaPermissionGranted) {
    openPhotoManagerModal();
  } else {
    document.getElementById("permissionModal").classList.add("active");
  }
}

function denyMediaPermission() {
  document.getElementById("permissionModal").classList.remove("active");
  alert("Permission denied.");
}

function allowMediaPermission() {
  storeData.mediaPermissionGranted = true;
  saveData();
  document.getElementById("permissionModal").classList.remove("active");
  openPhotoManagerModal();
}

function openPhotoManagerModal() {
  tempManagerPhoto = draftPhoto;
  renderPhotoManagerPreview();
  buildCartoonAvatarsGrid();
  document.getElementById("photoManagerModal").classList.add("active");
}

function closePhotoManagerModal() {
  document.getElementById("photoManagerModal").classList.remove("active");
}

function renderPhotoManagerPreview() {
  const preview = document.getElementById("photoManagerPreview");
  if (tempManagerPhoto) {
    preview.classList.add("has-img");
    preview.innerHTML = `<img src="${tempManagerPhoto}" alt="Preview" />`;
  } else {
    preview.classList.remove("has-img");
    preview.innerHTML = `<span class="plus-sign-icon">+</span>`;
  }
}

function buildCartoonAvatarsGrid() {
  const grid = document.getElementById("cartoonAvatarsGrid");
  grid.innerHTML = "";
  CARTOON_AVATARS.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Avatar";
    img.className = "avatar-choice" + (tempManagerPhoto === url ? " selected" : "");
    img.onclick = () => {
      tempManagerPhoto = url;
      renderPhotoManagerPreview();
      buildCartoonAvatarsGrid();
    };
    grid.appendChild(img);
  });
}

async function handleUserPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const rawData = await readImageAsDataURL(file, 600);
  if (rawData) {
    const adjusted = await openPhotoPositionEditor(rawData, 1, 400);
    if (adjusted) {
      tempManagerPhoto = adjusted;
      renderPhotoManagerPreview();
      buildCartoonAvatarsGrid();
    }
  }
  event.target.value = "";
}

function deleteTempPhoto() {
  tempManagerPhoto = "";
  renderPhotoManagerPreview();
  buildCartoonAvatarsGrid();
}

function applyPhotoSelection() {
  draftPhoto = tempManagerPhoto;
  updateMainAvatarCircleUI();
  closePhotoManagerModal();
}

function resetOtpOnPhoneChange() {
  storeData.userProfile.otpVerified = false;
  document.getElementById("sendOtpBtn").style.display = "inline-block";
  document.getElementById("phoneVerifiedBadge").textContent = "";
}

function startOtpTimer(seconds = 30) {
  clearInterval(otpCountdownInterval);
  let left = seconds;
  const timerEl = document.getElementById("otpTimerText");
  timerEl.textContent = `${left}s`;

  otpCountdownInterval = setInterval(() => {
    left -= 1;
    if (left <= 0) {
      clearInterval(otpCountdownInterval);
      timerEl.textContent = "0s";
      document.getElementById("otpStatusMsg").textContent = "Time expired. Tap Send to resend.";
    } else {
      timerEl.textContent = `${left}s`;
    }
  }, 1000);
}

function sendOtpForNumber() {
  const digits = document.getElementById("userPhone").value.replace(/\D/g, "");
  if (digits.length < 10) {
    alert("Please enter a valid mobile number first.");
    return;
  }

  document.getElementById("userOtpInput").value = "";
  document.getElementById("otpStatusMsg").textContent = "OTP sent (Demo OTP: 1234)";
  document.getElementById("otpStripPopup").classList.add("active");
  startOtpTimer(30);
}

function verifyUserOtp() {
  const code = document.getElementById("userOtpInput").value.trim();
  if (code.length >= 4) {
    clearInterval(otpCountdownInterval);
    storeData.userProfile.otpVerified = true;
    document.getElementById("otpStripPopup").classList.remove("active");
    document.getElementById("sendOtpBtn").style.display = "none";
    document.getElementById("phoneVerifiedBadge").textContent = "Number Verified";
  } else {
    document.getElementById("otpStatusMsg").textContent = "Please enter OTP";
  }
}

function socialRegister(provider) {
  storeData.userProfile.provider = provider;
  if (!draftPhoto) {
    draftPhoto = CARTOON_AVATARS[0];
    updateMainAvatarCircleUI();
  }
  alert(`${provider} selected. Tap Save to apply.`);
}

function saveUserProfile() {
  const updatedProfile = {
    ...storeData.userProfile,
    fixedRegistration: true,
    photo: draftPhoto,
    firstName: document.getElementById("userFirstName").value.trim(),
    surname: document.getElementById("userSurname").value.trim(),
    age: document.getElementById("userAge").value.trim(),
    gender: document.getElementById("userGender").value,
    phone: document.getElementById("userPhone").value.trim()
  };

  storeData.userProfile = updatedProfile;

  const userRecord = { key: "fixed-user-registration", ...updatedProfile };
  storeData.activeUsers = [userRecord];

  saveData();
  window.location.href = "index.html";
}

/* ==================== PAGE INIT ==================== */
window.addEventListener("storage", () => {
  try {
    storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || storeData;
  } catch (err) {}
  renderHeader();
  renderSections();
  if (OWNER_EDIT_MODE && !draftStoreData) initDraftStoreData();
  if (OWNER_EDIT_MODE) attachOwnerStoreEditHandlers();
});

const currentPage = document.body.getAttribute("data-page");
if (currentPage === "store") {
  if (OWNER_EDIT_MODE) initDraftStoreData();
  renderHeader();
  renderSections();
  if (OWNER_EDIT_MODE) attachOwnerStoreEditHandlers();
} else if (currentPage === "profile") {
  openRegistrationPopup();
} else if (currentPage === "owner") {
  const pinModal = document.getElementById("pinModal");
  if (pinModal) pinModal.classList.add("active");
}
