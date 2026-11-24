const STORAGE_KEY = "storeOwnerModularV3";
const OWNER_PIN = "1234";

const MAX_OWNER_BOXES = 50;
const MAX_INDEX_BOXES = 50;
const MAX_COVER_SLOTS = 10;
const MAX_TOP_ROW_BOXES = 30;

const STORE_FONT_OPTIONS = [
  { label: "Sans", value: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" },
  { label: "Rounded", value: "'Trebuchet MS', 'Segoe UI', sans-serif" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Mono", value: "'Courier New', monospace" }
];

const STORE_NAME_COLORS = [
  "#ffffff",
  "#fde047",
  "#67e8f9",
  "#86efac",
  "#fda4af",
  "#fdba74",
  "#111827"
];

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

const DEFAULT_SECTION_TITLES = Array.from({ length: 15 }, () => "Name");

let OWNER_EDIT_MODE = new URLSearchParams(window.location.search).get("ownerEdit") === "1";
window.OWNER_EDIT_MODE = OWNER_EDIT_MODE;

function setOwnerEditMode(active) {
  OWNER_EDIT_MODE = Boolean(active);
  window.OWNER_EDIT_MODE = OWNER_EDIT_MODE;
}

function getSectionTitleForView(rawTitle, index) {
  const cleanName = String(rawTitle || "").trim() || "Name";
  if (OWNER_EDIT_MODE) {
    return `${index + 1}. ${cleanName}`;
  }
  return cleanName;
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
    { id: "store", name: "Name", isCustom: false, entries: [], bigLeftLabel: "Name", bigRightLabel: "Name", customName: "" },
    { id: "users", name: "Name", isCustom: false, entries: [], bigLeftLabel: "Name", bigRightLabel: "Name", customName: "" },
    { id: "sales", name: "Name", isCustom: false, entries: [], bigLeftLabel: "Name", bigRightLabel: "Name", customName: "" },
    { id: "buyers", name: "Name", isCustom: false, entries: [], bigLeftLabel: "Name", bigRightLabel: "Name", customName: "" }
  ];
  for (let i = 1; i <= 10; i++) {
    ownerFolders.push({
      id: `custom-${i}`,
      name: "Name",
      isCustom: true,
      entries: [],
      bigLeftLabel: "Name",
      bigRightLabel: "Name",
      customName: ""
    });
  }

  return {
    storeTitle: "Store Name",
    storeSubtitle: "",
    titlePos: { x: 0, y: 0 },
    titleFont: STORE_FONT_OPTIONS[0].value,
    titleColor: STORE_NAME_COLORS[0],
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

function normalizeStoreData(raw) {
  const base = buildInitialData();
  const data = raw && typeof raw === "object" ? raw : base;

  data.userProfile =
    data.userProfile && typeof data.userProfile === "object"
      ? { ...base.userProfile, ...data.userProfile }
      : { ...base.userProfile };

  if (!Array.isArray(data.ownerFolders) || data.ownerFolders.length < 14) {
    data.ownerFolders = base.ownerFolders;
  }
  if (!Array.isArray(data.activeUsers)) data.activeUsers = [];
  if (!Array.isArray(data.orders)) data.orders = [];
  if (!Array.isArray(data.sections) || data.sections.length === 0) data.sections = base.sections;
  if (!data.themeColor) data.themeColor = "#0f766e";
  if (!data.titlePos || typeof data.titlePos.x !== "number" || typeof data.titlePos.y !== "number") {
    data.titlePos = { x: 0, y: 0 };
  }
  if (!data.titleFont) data.titleFont = STORE_FONT_OPTIONS[0].value;
  if (!data.titleColor) data.titleColor = STORE_NAME_COLORS[0];
  if (!Array.isArray(data.coverSlots) || data.coverSlots.length === 0) {
    data.coverSlots = [data.coverImg || ""];
  }
  if (!data.coverSlotsLimit) data.coverSlotsLimit = MAX_COVER_SLOTS;
  if (!data.ownerBoxLimit) data.ownerBoxLimit = MAX_OWNER_BOXES;
  if (!data.indexBoxLimit) data.indexBoxLimit = MAX_INDEX_BOXES;
  if (!Array.isArray(data.ownerExtraBoxes)) data.ownerExtraBoxes = [];
  if (!Array.isArray(data.ownerUserBoxes)) data.ownerUserBoxes = [];
  if (!Array.isArray(data.ownerBuyerBoxes)) data.ownerBuyerBoxes = [];

  return data;
}

let storeData;
try {
  storeData = normalizeStoreData(JSON.parse(localStorage.getItem(STORAGE_KEY)));
} catch (err) {
  storeData = buildInitialData();
}

let activeOrderItem = null;
let draftPhoto = (storeData.userProfile && storeData.userProfile.photo) || "";
let tempManagerPhoto = "";
let otpCountdownInterval = null;
let coverAutoScrollTimer = null;

let activeFolderIdx = 0;
let usersVisibleLimit = 10;

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
  storeData = normalizeStoreData(JSON.parse(JSON.stringify(draftStoreData)));
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
        const scale = Math.min(1, maxWidth / (img.width || 1));
        canvas.width = Math.max(1, Math.round((img.width || 1) * scale));
        canvas.height = Math.max(1, Math.round((img.height || 1) * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function imgMarkup(src, altText, isMini = false) {
  if (src) {
    return `<img src="${src}" alt="${altText}" />`;
  }
  const h = isMini ? "74px" : "125px";
  return `<div style="width:100%;height:${h};background:#e5e7eb;"></div>`;
}

function startCoverAutoScroll(track, slideCount) {
  clearInterval(coverAutoScrollTimer);
  if (OWNER_EDIT_MODE || !track || slideCount <= 1) {
    if (track) track.scrollLeft = 0;
    return;
  }

  let resetTimer = null;

  coverAutoScrollTimer = setInterval(() => {
    if (!document.body.contains(track)) {
      clearInterval(coverAutoScrollTimer);
      clearTimeout(resetTimer);
      return;
    }

    const slideWidth = track.clientWidth;
    if (!slideWidth) return;

    const currentIdx = Math.round(track.scrollLeft / slideWidth);
    const nextIdx = currentIdx + 1;

    track.style.scrollBehavior = "smooth";
    track.scrollTo({
      left: nextIdx * slideWidth,
      behavior: "smooth"
    });

    if (nextIdx >= slideCount) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (!document.body.contains(track)) return;
        track.style.scrollBehavior = "auto";
        track.scrollLeft = 0;
        track.style.scrollBehavior = "smooth";
      }, 550);
    }
  }, 3000);
}

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
    titleEl.style.fontFamily = data.titleFont || STORE_FONT_OPTIONS[0].value;
    titleEl.style.color = data.titleColor || STORE_NAME_COLORS[0];
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
  titleEl.textContent = data.storeTitle || "Store Name";
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
  track.scrollLeft = 0;

  if (visibleSlots.length === 0) {
    clearInterval(coverAutoScrollTimer);
    track.style.display = "none";
    return;
  }

  track.style.display = "flex";

  const slidesToRender = (!OWNER_EDIT_MODE && visibleSlots.length > 1)
    ? [...visibleSlots, visibleSlots[0]]
    : visibleSlots;

  slidesToRender.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = "cover-slide-item";
    slide.dataset.slotIdx = String(idx % visibleSlots.length);
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
    stripEl.innerHTML = `<span class="strip-title">${displayTitle}</span>`;
    sectionEl.appendChild(stripEl);

    if (sIdx === 0) {
      const fiveRow = document.createElement("div");
      fiveRow.className = "five-boxes-row";
      const topRowLimit = Math.min(MAX_TOP_ROW_BOXES, maxBoxes);

      sec.items.slice(0, topRowLimit).forEach((item) => {
        const cleanItemName = String(item.name || "").trim() || "Item";
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
        const cleanItemName = String(item.name || "").trim() || "Item";
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
}

function openOrderModal(sectionIdx, itemId) {
  const data = getWorkingStoreData();
  const item = data.sections[sectionIdx]?.items.find((i) => i.id === itemId);
  if (!item) return;
  activeOrderItem = item;
  const amountVal = Number(item.price || 0);
  document.getElementById("modalItemTitle").textContent = String(item.name || "").trim() || "Item";
  document.getElementById("modalItemPrice").textContent = `Price: ₹${amountVal}`;

  const up = data.userProfile || {};
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
  const cleanItemName = String(activeOrderItem.name || "").trim() || "Item";

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

function goToStoreFromPin() {
  setOwnerEditMode(false);
  draftStoreData = null;
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
  setOwnerEditMode(false);
  draftStoreData = null;
  pendingOwnerEditSlot = null;
  clearInterval(coverAutoScrollTimer);

  const panel = document.getElementById("ownerPanel");
  if (panel) panel.classList.remove("active");
  const pinInput = document.getElementById("ownerPinInput");
  if (pinInput) pinInput.value = "";
  const pinModal = document.getElementById("pinModal");
  if (pinModal) pinModal.classList.remove("active");

  if (typeof removeOwnerStoreEditUI === "function") {
    removeOwnerStoreEditUI();
  }

  window.location.href = "index.html";
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
    const label = isNamed ? folder.name : "Name";

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
  const next = prompt("Enter Name:", current);
  if (next !== null) {
    folder.name = next.trim() || "Name";
    saveData();
    renderFolderGrid();
    const heading = document.getElementById("activeFolderHeading");
    if (heading && idx === activeFolderIdx) {
      heading.textContent = folder.name || "Name";
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
    heading.textContent = folder.name || "Name";
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

    const subText = isOwnerPage ? (u.phone || u.provider || "Active") : (u.provider || "");
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
    const key = String(o.itemName || "").trim() || "Item";
    if (!grouped[key]) {
      grouped[key] = { name: key, price: o.itemPrice || 0, img: o.itemImg || "", soldQty: 0 };
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
  storeData.ownerBuyerBoxes.push({ name: "Name" });
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
    const cleanItem = String(o.itemName || "").trim() || "Item";

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
  if (leftLbl) leftLbl.textContent = folder.bigLeftLabel || "Name";
  if (rightLbl) rightLbl.textContent = folder.bigRightLabel || "Name";
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
    const next = prompt("Edit Name:", folder.bigLeftLabel || "Name");
    if (next && next.trim()) folder.bigLeftLabel = next.trim();
  } else {
    const next = prompt("Edit Name:", folder.bigRightLabel || "Name");
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
  const up = storeData.userProfile || {};
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
    const adjusted = typeof openPhotoPositionEditor === "function"
      ? await openPhotoPositionEditor(rawData, 1, 400)
      : rawData;
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
  const existingIdx = storeData.activeUsers.findIndex((u) => u.key === "fixed-user-registration");
  const entry = { key: "fixed-user-registration", ...updatedProfile };
  if (existingIdx >= 0) {
    storeData.activeUsers[existingIdx] = entry;
  } else {
    storeData.activeUsers.unshift(entry);
  }

  saveData();
  window.location.href = "index.html";
}

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
  const nameModal = document.getElementById("ownerStoreNameModal");
  if (nameModal) nameModal.remove();
  const editorScreen = document.getElementById("screenPhotoEditor");
  if (editorScreen) editorScreen.remove();
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
  const previousColor = data.themeColor || "#0f766e";
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

  const closeModalAndRestore = () => {
    applyDraftThemeColor(previousColor);
    modal.remove();
  };

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "✕";
  closeBtn.style.cssText =
    "border:none;background:transparent;font-size:1.1rem;font-weight:700;color:#475569;cursor:pointer;padding:2px 6px;";
  closeBtn.onclick = closeModalAndRestore;

  header.appendChild(leftHead);
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.style.cssText = "display:flex;height:190px;width:100%;";

  const leftSwatch = document.createElement("div");
  leftSwatch.style.cssText = `flex:0 0 36%;background:${previousColor};`;

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
  cancelBtn.onclick = closeModalAndRestore;

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
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width || 1);
    const y = Math.min(Math.max(0, clientY - rect.top), rect.height || 1);
    sat = rect.width ? x / rect.width : 0.85;
    val = rect.height ? 1 - y / rect.height : 0.85;
    const hex = syncColorUI();
    applyDraftThemeColor(hex);
  }

  function updateHueFromPointer(clientX) {
    const rect = hueTrackWrap.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width || 1);
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

function openStoreNameEditorPopup() {
  const existing = document.getElementById("ownerStoreNameModal");
  if (existing) existing.remove();

  const data = getWorkingStoreData();
  const tempName = data.storeTitle || "";
  let tempFont = data.titleFont || STORE_FONT_OPTIONS[0].value;
  let tempColor = data.titleColor || STORE_NAME_COLORS[0];

  const modal = document.createElement("div");
  modal.id = "ownerStoreNameModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:125;background:rgba(15,23,42,0.6);display:flex;align-items:center;justify-content:center;padding:14px;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:380px;background:#ffffff;border-radius:12px;padding:14px;box-shadow:0 12px 30px rgba(0,0,0,0.3);display:flex;flex-direction:column;gap:12px;";

  const title = document.createElement("div");
  title.textContent = "Store Name";
  title.style.cssText = "font-size:1rem;font-weight:700;color:#111827;";

  const input = document.createElement("input");
  input.type = "text";
  input.value = tempName;
  input.placeholder = "Enter store name";
  input.style.cssText =
    "width:100%;padding:9px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.95rem;color:#111827;box-sizing:border-box;";

  const previewBox = document.createElement("div");
  previewBox.style.cssText =
    "padding:10px;border-radius:8px;background:#1e293b;min-height:38px;display:flex;align-items:center;overflow-wrap:anywhere;word-break:break-word;";

  const previewText = document.createElement("span");
  previewBox.appendChild(previewText);

  function syncPreview() {
    previewText.textContent = input.value || "Store Name";
    previewText.style.fontFamily = tempFont;
    previewText.style.color = tempColor;
    previewText.style.fontWeight = "700";
    previewText.style.fontSize = "1.05rem";
  }

  input.oninput = syncPreview;

  const fontWrap = document.createElement("div");
  fontWrap.style.cssText = "display:flex;flex-direction:column;gap:6px;";

  const fontLbl = document.createElement("span");
  fontLbl.textContent = "Font";
  fontLbl.style.cssText = "font-size:0.82rem;font-weight:700;color:#334155;";

  const fontList = document.createElement("div");
  fontList.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;";

  STORE_FONT_OPTIONS.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = opt.label;
    btn.style.cssText =
      `padding:5px 10px;border-radius:6px;border:1px solid #cbd5e1;font-family:${opt.value};font-size:0.82rem;font-weight:700;cursor:pointer;`;
    btn.onclick = () => {
      tempFont = opt.value;
      renderFontButtons();
      syncPreview();
    };
    fontList.appendChild(btn);
  });

  function renderFontButtons() {
    const btns = fontList.querySelectorAll("button");
    btns.forEach((b, i) => {
      const active = STORE_FONT_OPTIONS[i].value === tempFont;
      b.style.background = active ? "#0f766e" : "#f8fafc";
      b.style.color = active ? "#ffffff" : "#111827";
      b.style.borderColor = active ? "#0f766e" : "#cbd5e1";
    });
  }

  fontWrap.appendChild(fontLbl);
  fontWrap.appendChild(fontList);

  const colorWrap = document.createElement("div");
  colorWrap.style.cssText = "display:flex;flex-direction:column;gap:6px;";

  const colorLbl = document.createElement("span");
  colorLbl.textContent = "Colour";
  colorLbl.style.cssText = "font-size:0.82rem;font-weight:700;color:#334155;";

  const colorList = document.createElement("div");
  colorList.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;align-items:center;";

  STORE_NAME_COLORS.forEach((hex) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.style.cssText =
      `width:26px;height:26px;border-radius:50%;background:${hex};border:2px solid #cbd5e1;cursor:pointer;padding:0;`;
    swatch.onclick = () => {
      tempColor = hex;
      renderColorButtons();
      syncPreview();
    };
    colorList.appendChild(swatch);
  });

  function renderColorButtons() {
    const btns = colorList.querySelectorAll("button");
    btns.forEach((b, i) => {
      const selected = STORE_NAME_COLORS[i] === tempColor;
      b.style.outline = selected ? "2px solid #0f172a" : "none";
      b.style.outlineOffset = selected ? "2px" : "0px";
    });
  }

  colorWrap.appendChild(colorLbl);
  colorWrap.appendChild(colorList);

  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;justify-content:flex-end;gap:8px;margin-top:4px;";

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
  applyBtn.onclick = () => {
    data.storeTitle = input.value.trim() || "Store Name";
    data.titleFont = tempFont;
    data.titleColor = tempColor;
    modal.remove();
    renderHeader();
    attachOwnerStoreEditHandlers();
  };

  footer.appendChild(cancelBtn);
  footer.appendChild(applyBtn);

  card.appendChild(title);
  card.appendChild(input);
  card.appendChild(previewBox);
  card.appendChild(fontWrap);
  card.appendChild(colorWrap);
  card.appendChild(footer);
  modal.appendChild(card);
  document.body.appendChild(modal);

  renderFontButtons();
  renderColorButtons();
  syncPreview();
}

let rawImageObj = null;
let posX = 0, posY = 0, imgScale = 1, minScale = 1, maxScale = 2.5;
let baseLeft = 0, baseTop = 0;
let isDraggingImg = false, startMouseX = 0, startMouseY = 0;
let initialPinchDistance = null;
let onCoverEditorDone = null;
let coverEditorEventsBound = false;

function ensureCoverEditorDOM() {
  let screen = document.getElementById("screenPhotoEditor");
  if (!screen) {
    screen = document.createElement("div");
    screen.id = "screenPhotoEditor";
    screen.style.cssText =
      "display:none;position:fixed;inset:0;background:rgba(15,23,42,0.72);z-index:99999;align-items:center;justify-content:center;padding:12px;";

    screen.innerHTML = `
      <div class="editor-popup-card" style="width:100%;max-width:344px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.4);display:flex;flex-direction:column;">
        <div class="editor-canvas-area" id="editorCanvasArea" style="width:100%;height:230px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;touch-action:none;background:#1e293b;">
          <img id="editorImagePreview" src="" alt="Preview" style="position:absolute;transform-origin:0 0;cursor:grab;user-select:none;z-index:5;display:block;max-width:none;max-height:none;will-change:transform;transform:translate3d(0px, 0px, 0px);" />
          <div class="crop-frame-box" id="cropFrameBox" style="width:290px;height:140px;border:2px solid #ffffff;box-shadow:0 0 0 9999px rgba(0, 0, 0, 0.52);position:relative;pointer-events:none;z-index:10;"></div>
        </div>
        <div class="editor-bottom-bar" style="width:100%;height:48px;background:#ffffff;display:flex;justify-content:space-between;align-items:center;padding:0 22px;z-index:25;border-top:1px solid #e2e8f0;">
          <button type="button" class="editor-bottom-btn" onclick="cancelEditor()" title="Cancel" style="background:none;border:none;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;color:#334155;font-weight:700;">✕</button>
          <button type="button" class="editor-bottom-btn" onclick="confirmEditor()" title="Save" style="background:none;border:none;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;color:#0f766e;font-weight:700;">✓</button>
        </div>
      </div>
    `;
    document.body.appendChild(screen);
    bindCoverEditorEvents();
  }
  return screen;
}

function setEditorZoomAroundCenter(nextScale) {
  const preview = document.getElementById("editorImagePreview");
  const area = document.getElementById("editorCanvasArea");
  const box = document.getElementById("cropFrameBox");
  if (!preview || !area || !box || !rawImageObj) return;

  const clampedScale = Math.max(minScale, Math.min(maxScale, nextScale));
  if (clampedScale === imgScale) return;

  const areaRect = area.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  const boxCenterX = (boxRect.left + boxRect.right) / 2 - areaRect.left;
  const boxCenterY = (boxRect.top + boxRect.bottom) / 2 - areaRect.top;

  const oldW = rawImageObj.width * imgScale;
  const oldH = rawImageObj.height * imgScale;
  const oldLeft = baseLeft + posX;
  const oldTop = baseTop + posY;

  const ratioX = oldW ? (boxCenterX - oldLeft) / oldW : 0.5;
  const ratioY = oldH ? (boxCenterY - oldTop) / oldH : 0.5;

  imgScale = clampedScale;
  const newW = rawImageObj.width * imgScale;
  const newH = rawImageObj.height * imgScale;

  preview.style.width = newW + "px";
  preview.style.height = newH + "px";

  posX = boxCenterX - ratioX * newW - baseLeft;
  posY = boxCenterY - ratioY * newH - baseTop;

  applySmartBoundaryAndSnap();
}

function applySmartBoundaryAndSnap() {
  const preview = document.getElementById("editorImagePreview");
  const area = document.getElementById("editorCanvasArea");
  const box = document.getElementById("cropFrameBox");
  if (!preview || !area || !box || !rawImageObj) return;

  const areaRect = area.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();

  const boxLeftRel = boxRect.left - areaRect.left;
  const boxTopRel = boxRect.top - areaRect.top;
  const boxRightRel = boxRect.right - areaRect.left;
  const boxBottomRel = boxRect.bottom - areaRect.top;

  const renderW = rawImageObj.width * imgScale;
  const renderH = rawImageObj.height * imgScale;

  const currentLeftRel = baseLeft + posX;
  const currentTopRel = baseTop + posY;

  const minLeftRel = boxRightRel - renderW;
  const maxLeftRel = boxLeftRel;
  const minTopRel = boxBottomRel - renderH;
  const maxTopRel = boxTopRel;

  const clampedLeftRel = Math.max(minLeftRel, Math.min(maxLeftRel, currentLeftRel));
  const clampedTopRel = Math.max(minTopRel, Math.min(maxTopRel, currentTopRel));

  if (clampedLeftRel !== currentLeftRel || clampedTopRel !== currentTopRel) {
    preview.style.transition = "transform 0.2s ease-out";
    posX = clampedLeftRel - baseLeft;
    posY = clampedTopRel - baseTop;
  } else {
    preview.style.transition = "none";
  }
  preview.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`;
}

function bindCoverEditorEvents() {
  if (coverEditorEventsBound) return;
  coverEditorEventsBound = true;

  const editorArea = document.getElementById("editorCanvasArea");
  const preview = document.getElementById("editorImagePreview");
  if (!editorArea || !preview) return;

  editorArea.addEventListener("mousedown", (e) => {
    if (!rawImageObj) return;
    isDraggingImg = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    preview.style.transition = "none";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDraggingImg || !rawImageObj) return;
    posX += (e.clientX - startMouseX) * 1.25;
    posY += (e.clientY - startMouseY) * 1.25;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    preview.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`;
  });

  window.addEventListener("mouseup", () => {
    if (isDraggingImg) {
      isDraggingImg = false;
      applySmartBoundaryAndSnap();
    }
  });

  editorArea.addEventListener("wheel", (e) => {
    if (!rawImageObj) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setEditorZoomAroundCenter(imgScale * zoomFactor);
  }, { passive: false });

  editorArea.addEventListener("touchstart", (e) => {
    if (!rawImageObj) return;
    if (e.touches.length === 1) {
      isDraggingImg = true;
      startMouseX = e.touches[0].clientX;
      startMouseY = e.touches[0].clientY;
      initialPinchDistance = null;
      preview.style.transition = "none";
    } else if (e.touches.length === 2) {
      isDraggingImg = false;
      initialPinchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  editorArea.addEventListener("touchmove", (e) => {
    if (!rawImageObj) return;
    if (e.touches.length === 1 && isDraggingImg) {
      posX += (e.touches[0].clientX - startMouseX) * 1.25;
      posY += (e.touches[0].clientY - startMouseY) * 1.25;
      startMouseX = e.touches[0].clientX;
      startMouseY = e.touches[0].clientY;
      preview.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`;
      e.preventDefault();
    } else if (e.touches.length === 2 && initialPinchDistance !== null && initialPinchDistance > 0) {
      const currentPinchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const zoomFactor = currentPinchDistance / initialPinchDistance;
      setEditorZoomAroundCenter(imgScale * zoomFactor);
      initialPinchDistance = currentPinchDistance;
      e.preventDefault();
    }
  }, { passive: false });

  editorArea.addEventListener("touchend", (e) => {
    if (!rawImageObj) return;
    if (e.touches.length < 2) initialPinchDistance = null;
    if (e.touches.length === 0 && isDraggingImg) {
      isDraggingImg = false;
      applySmartBoundaryAndSnap();
    }
  });
}

function cancelEditor() {
  const screen = document.getElementById("screenPhotoEditor");
  const preview = document.getElementById("editorImagePreview");
  if (preview) {
    preview.onload = null;
    preview.src = "";
  }
  if (screen) screen.style.display = "none";
  rawImageObj = null;
  onCoverEditorDone = null;
}

function confirmEditor() {
  const preview = document.getElementById("editorImagePreview");
  const box = document.getElementById("cropFrameBox")?.getBoundingClientRect();
  const cb = onCoverEditorDone;
  onCoverEditorDone = null;

  if (!rawImageObj || !preview || !box || !box.width || !box.height) {
    cancelEditor();
    return;
  }

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 520;
    const ctx = canvas.getContext("2d");

    const previewRect = preview.getBoundingClientRect();
    const natW = rawImageObj.naturalWidth || rawImageObj.width || 1;
    const natH = rawImageObj.naturalHeight || rawImageObj.height || 1;
    const renderedWidth = previewRect.width || (natW * imgScale) || 1;
    const renderedHeight = previewRect.height || (natH * imgScale) || 1;

    const sX = Math.max(0, ((box.left - previewRect.left) / renderedWidth) * natW);
    const sY = Math.max(0, ((box.top - previewRect.top) / renderedHeight) * natH);
    const sW = Math.min(natW - sX, (box.width / renderedWidth) * natW);
    const sH = Math.min(natH - sY, (box.height / renderedHeight) * natH);

    ctx.drawImage(rawImageObj, sX, sY, sW, sH, 0, 0, canvas.width, canvas.height);
    const croppedUrl = canvas.toDataURL("image/jpeg", 0.85);

    if (preview) preview.src = "";
    const screen = document.getElementById("screenPhotoEditor");
    if (screen) screen.style.display = "none";
    rawImageObj = null;

    if (typeof cb === "function") {
      cb(croppedUrl);
    }
  } catch (err) {
    cancelEditor();
    alert("Photo crop failed. Try another photo.");
  }
}

function openCoverPhotoEditor(file, onDone) {
  if (!file || typeof onDone !== "function") return;
  onCoverEditorDone = onDone;
  ensureCoverEditorDOM();

  const screen = document.getElementById("screenPhotoEditor");
  const preview = document.getElementById("editorImagePreview");
  if (screen) screen.style.display = "flex";
  if (!preview) return;

  preview.style.transition = "none";
  preview.src = "";

  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target && e.target.result;
    if (!dataUrl) return;

    const img = new Image();
    img.onload = function () {
      rawImageObj = img;
      preview.src = dataUrl;

      requestAnimationFrame(() => {
        const area = document.getElementById("editorCanvasArea");
        const box = document.getElementById("cropFrameBox");
        if (!area || !box || !rawImageObj) return;

        const areaRect = area.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const natW = rawImageObj.naturalWidth || rawImageObj.width || 1;
        const natH = rawImageObj.naturalHeight || rawImageObj.height || 1;
        const boxW = boxRect.width || 290;
        const boxH = boxRect.height || 140;

        minScale = Math.max(boxW / natW, boxH / natH) || 1;
        maxScale = minScale * 2.5;
        imgScale = minScale;

        const renderW = natW * imgScale;
        const renderH = natH * imgScale;
        preview.style.width = renderW + "px";
        preview.style.height = renderH + "px";

        const centerXRel = ((boxRect.left + boxRect.right) / 2 || (areaRect.width / 2)) - (areaRect.left || 0);
        const centerYRel = ((boxRect.top + boxRect.bottom) / 2 || (areaRect.height / 2)) - (areaRect.top || 0);

        baseLeft = centerXRel - renderW / 2;
        baseTop = centerYRel - renderH / 2;

        preview.style.left = baseLeft + "px";
        preview.style.top = baseTop + "px";
        posX = 0;
        posY = 0;
        preview.style.transform = "translate3d(0px, 0px, 0px)";
      });
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
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

      const slotInfo = pendingOwnerEditSlot;
      pendingOwnerEditSlot = null;

      if (slotInfo.type === "cover") {
        openCoverPhotoEditor(file, (adjustedUrl) => {
          const data = getWorkingStoreData();
          const slotIdx = Number.isInteger(slotInfo.slotIdx) ? slotInfo.slotIdx : 0;
          const wasFirstEmpty = slotIdx === 0 && !data.coverSlots[0];
          data.coverSlots[slotIdx] = adjustedUrl;
          data.coverImg = data.coverSlots[0] || adjustedUrl;
          renderHeader();
          attachOwnerStoreEditHandlers();
          if (wasFirstEmpty) {
            peekNextCoverHint();
          }
        });
      } else if (slotInfo.type === "item") {
        const resizedUrl = await readImageAsDataURL(file, 500);
        if (!resizedUrl) return;
        const data = getWorkingStoreData();
        const { sIdx, itemId } = slotInfo;
        const item = data.sections[sIdx]?.items?.find((i) => i.id === itemId);
        if (item) {
          item.img = resizedUrl;
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
  const rowCap = sIdx === 0 ? MAX_TOP_ROW_BOXES : MAX_INDEX_BOXES;
  const maxBoxes = Math.min(rowCap, Math.max(0, Number(data.indexBoxLimit ?? rowCap)));
  const currentCount = sec.items.length;

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
  const minBoxes = 1;
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
    title: "Name",
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

    const rx = Math.round(nx);
    const ry = Math.round(ny);
    data.titlePos = { x: rx, y: ry };
    overlayEl.style.left = `${rx}px`;
    overlayEl.style.top = `${ry}px`;
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
    draftStoreData = JSON.parse(JSON.stringify(storeData));
    renderHeader();
    renderSections();
    attachOwnerStoreEditHandlers();
    alert("Saved!");
  };

  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.textContent = "Store";
  backBtn.style.cssText =
    "padding:7px 10px;border:1px solid rgba(255,255,255,0.55);border-radius:8px;background:transparent;color:#ffffff;font-weight:600;cursor:pointer;";
  backBtn.onclick = () => {
    setOwnerEditMode(false);
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
        openStoreNameEditorPopup();
      };

      overlayEl.appendChild(pencilBtn);
    }

    const slides = coverWrap.querySelectorAll(".cover-slide-item");
    slides.forEach((slide, idx) => {
      const slidePhotoBtn = document.createElement("button");
      slidePhotoBtn.type = "button";
      slidePhotoBtn.className = "owner-inline-edit-btn";
      slidePhotoBtn.textContent = `Update Photo ${idx + 1}`;
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
    addCoverBtn.textContent = "+ Cover Update";
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
        const next = prompt("Edit Name:", sec.title || "Name");
        if (next !== null) {
          sec.title = next.trim() || "Name";
          renderSections();
          attachOwnerStoreEditHandlers();
        }
      };
      stripTitle.insertAdjacentElement("afterend", secEditBtn);
    }

    const topRowLimit = Math.min(MAX_TOP_ROW_BOXES, Math.max(0, Number(data.indexBoxLimit ?? MAX_TOP_ROW_BOXES)));
    const cards = secEl.querySelectorAll(".mini-box:not(.user-photo-only-box), .item-box");
    cards.forEach((card, idx) => {
      const item = sIdx === 0 ? sec.items.slice(0, topRowLimit)[idx] : sec.items[idx];
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
          const next = prompt("Edit Name:", item.name || "Item");
          if (next !== null) {
            item.name = next.trim() || "Item";
            renderSections();
            attachOwnerStoreEditHandlers();
          }
        };
        nameEl.insertAdjacentElement("afterend", nameBtn);
      }

      const priceBtn = document.createElement("button");
      priceBtn.type = "button";
      priceBtn.className = "owner-inline-edit-btn";
      priceBtn.textContent = "✎ ₹";
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

    const boxContainerEl = sIdx === 0 ? secEl.querySelector(".five-boxes-row") : secEl.querySelector(".scroll-row");
    if (boxContainerEl) {
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

      boxContainerEl.appendChild(addBoxBtn);
      boxContainerEl.appendChild(remBoxBtn);
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

window.addEventListener("storage", () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed) storeData = normalizeStoreData(parsed);
  } catch (err) {}
  renderHeader();
  renderSections();
  if (OWNER_EDIT_MODE && !draftStoreData) {
    initDraftStoreData();
  }
  if (OWNER_EDIT_MODE) {
    attachOwnerStoreEditHandlers();
  }
});

const currentPage = document.body.getAttribute("data-page");
if (currentPage === "store") {
  if (OWNER_EDIT_MODE && !draftStoreData) initDraftStoreData();
  renderHeader();
  renderSections();
  if (OWNER_EDIT_MODE) {
    attachOwnerStoreEditHandlers();
  }
} else if (currentPage === "profile") {
  openRegistrationPopup();
} else if (currentPage === "owner") {
  const pinModal = document.getElementById("pinModal");
  if (pinModal) pinModal.classList.add("active");
}
