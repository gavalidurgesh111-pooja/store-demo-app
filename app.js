const STORAGE_KEY = "storeOwnerModularV3";
const OWNER_PIN = "1234";

const MAX_OWNER_BOXES = 50;
const MAX_INDEX_BOXES = 50;
const MAX_COVER_SLOTS = 10;

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
    if (node.parentElement && node.parentElement.closest("#ownerLiveSaveBar, #ownerCustomColorPickerModal, #ownerPhotoPositionModal, #ownerStoreNameModal")) {
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
if (!storeData.titleFont) storeData.titleFont = STORE_FONT_OPTIONS[0].value;
if (!storeData.titleColor) storeData.titleColor = STORE_NAME_COLORS[0];
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

  let currentSlide = 0;
  let resetTimer = null;

  coverAutoScrollTimer = setInterval(() => {
    if (!document.body.contains(track)) {
      clearInterval(coverAutoScrollTimer);
      clearTimeout(resetTimer);
      return;
    }

    const slideWidth = track.clientWidth;
    if (!slideWidth) return;

    currentSlide += 1;
    track.scrollTo({
      left: currentSlide * slideWidth,
      behavior: "smooth"
    });

    if (currentSlide >= slideCount) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (!document.body.contains(track)) return;
        track.scrollTo({
          left: 0,
          behavior: "instant"
        });
        currentSlide = 0;
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
    const key = stripAllDigits(o.itemName || "", "Item");
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
  storeData.activeUsers = [{ key: "fixed-user-registration", ...updatedProfile }];

  saveData();
  window.location.href = "index.html";
}

window.addEventListener("storage", () => {
  try {
    storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || storeData;
  } catch (err) {}
  renderHeader();
  renderSections();
  if (OWNER_EDIT_MODE && !draftStoreData && typeof initDraftStoreData === "function") {
    initDraftStoreData();
  }
  if (OWNER_EDIT_MODE && typeof attachOwnerStoreEditHandlers === "function") {
    attachOwnerStoreEditHandlers();
  }
});

const currentPage = document.body.getAttribute("data-page");
if (currentPage === "store") {
  if (OWNER_EDIT_MODE && typeof initDraftStoreData === "function") initDraftStoreData();
  renderHeader();
  renderSections();
  if (OWNER_EDIT_MODE && typeof attachOwnerStoreEditHandlers === "function") {
    attachOwnerStoreEditHandlers();
  }
} else if (currentPage === "profile") {
  openRegistrationPopup();
} else if (currentPage === "owner") {
  const pinModal = document.getElementById("pinModal");
  if (pinModal) pinModal.classList.add("active");
}
