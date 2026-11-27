const STORAGE_KEY = "storeOwnerModularV3";
const OWNER_PIN = "1234";

const MAX_OWNER_BOXES = 50;
const MAX_INDEX_BOXES = 50;
const MAX_COVER_SLOTS = 10;
const MAX_TOP_ROW_BOXES = 30;

const DEFAULT_BOX_SIZES = {
  miniBox: {
    width: 92,
    height: 122,
    imgHeight: 74,
    fontSize: 12,
    bgColor: "#ffffff",
    priceFontSize: 11,
    priceColor: "#111827",
    textBgTransparent: false
  },
  productBox: {
    width: 150,
    height: 215,
    imgHeight: 125,
    fontSize: 14,
    bgColor: "#ffffff",
    priceFontSize: 13,
    priceColor: "#111827",
    textBgTransparent: false
  }
};

const BASE_FONT_FAMILIES = [
  "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  "'Trebuchet MS', 'Segoe UI', sans-serif",
  "Georgia, 'Times New Roman', serif",
  "'Rockwell', 'Courier New', Georgia, serif",
  "'Arial Narrow', 'Impact', sans-serif",
  "'Segoe UI', Roboto, sans-serif",
  "'Brush Script MT', 'Segoe Script', cursive",
  "'Courier New', monospace",
  "Verdana, Geneva, sans-serif",
  "Tahoma, Geneva, sans-serif",
  "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
  "Garamond, Baskerville, 'Times New Roman', serif",
  "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
  "'Century Gothic', 'AppleGothic', sans-serif",
  "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  "'Lucida Console', Monaco, monospace",
  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
  "Candara, Calibri, Segoe, 'Segoe UI', Optima, sans-serif",
  "Consolas, 'Andale Mono', 'Lucida Console', monospace"
];

const STYLE_TAG_WORDS = [
  "Classic",
  "Modern",
  "Bold",
  "Soft",
  "Crisp",
  "Retro",
  "Tall",
  "Wide",
  "Script",
  "Mono"
];

const STORE_FONT_OPTIONS = Array.from({ length: 100 }, (_, idx) => {
  const num = idx + 1;
  const family = BASE_FONT_FAMILIES[idx % BASE_FONT_FAMILIES.length];
  const isItalic = idx % 3 === 1;
  const weight = 300 + ((idx * 73) % 650);
  const letterSpacing = Number((((idx % 7) - 2) * 0.35).toFixed(2));
  const textTransform = idx % 5 === 0 ? "uppercase" : idx % 5 === 2 ? "capitalize" : "none";
  const tagWord = STYLE_TAG_WORDS[idx % STYLE_TAG_WORDS.length];
  return {
    label: `${num}. ${tagWord} ${family.split(",")[0].replace(/['"]/g, "")}`,
    value: family,
    italic: isItalic,
    weight,
    letterSpacing,
    textTransform
  };
});

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

function applyNoTapHighlightRule() {
  const styleId = "storeNoTapHighlightGlobalStyle";
  if (document.getElementById(styleId)) return;

  const styleEl = document.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = `
    *, *::before, *::after {
      -webkit-tap-highlight-color: transparent !important;
      -webkit-touch-callout: none !important;
      -webkit-user-select: none !important;
      user-select: none !important;
    }
    input, textarea, select, [contenteditable="true"] {
      -webkit-user-select: text !important;
      user-select: text !important;
      -webkit-touch-callout: default !important;
    }
    @keyframes storeAdFloatAnim {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes storeAdMarqueeAnim {
      0% { transform: translateX(65%); }
      100% { transform: translateX(-65%); }
    }
  `;
  (document.head || document.documentElement).appendChild(styleEl);
}

applyNoTapHighlightRule();

function getEffectiveBoxSizesForSection(data, sIdx) {
  const globalSizes = normalizeBoxSizes(data && data.boxSizes);
  const sec = data && Array.isArray(data.sections) ? data.sections[sIdx] : null;
  if (!sec || !sec.customBoxSizes || typeof sec.customBoxSizes !== "object") {
    return globalSizes;
  }
  const cMini = sec.customBoxSizes.miniBox || {};
  const cProd = sec.customBoxSizes.productBox || {};
  return normalizeBoxSizes({
    miniBox: { ...globalSizes.miniBox, ...cMini },
    productBox: { ...globalSizes.productBox, ...cProd }
  });
}

function syncNoBgCleanStyleTag(miniNoBg, prodNoBg) {
  const tagId = "storeBoxNoBgCleanOverrideStyle";
  let tagEl = document.getElementById(tagId);
  if (!miniNoBg && !prodNoBg) {
    if (tagEl) tagEl.remove();
    return;
  }
  if (!tagEl) {
    tagEl = document.createElement("style");
    tagEl.id = tagId;
    (document.head || document.documentElement).appendChild(tagEl);
  }

  const rules = [];
  if (miniNoBg) {
    rules.push(`
      .mini-box:not(.user-photo-only-box),
      .mini-box:not(.user-photo-only-box) .mini-box-body,
      .mini-box:not(.user-photo-only-box) .mini-box-name,
      .mini-box:not(.user-photo-only-box) .mini-box-price,
      .mini-box:not(.user-photo-only-box) .owner-item-inline-group {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        border-color: transparent !important;
        box-shadow: none !important;
        outline: none !important;
      }
      .mini-box:not(.user-photo-only-box) {
        padding: 0 !important;
        min-height: 0 !important;
        height: auto !important;
      }
      .mini-box:not(.user-photo-only-box) .mini-box-body {
        padding: 4px 0 0 0 !important;
      }
    `);
  }
  if (prodNoBg) {
    rules.push(`
      .item-box,
      .item-box .item-info,
      .item-box .item-name,
      .item-box .item-price,
      .item-box .owner-item-inline-group {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        border-color: transparent !important;
        box-shadow: none !important;
        outline: none !important;
      }
      .item-box {
        padding: 0 !important;
        min-height: 0 !important;
        height: auto !important;
      }
      .item-box .item-info {
        padding: 4px 0 0 0 !important;
      }
    `);
  }
  tagEl.textContent = rules.join("\n");
}

function formatItemPriceDisplay(item) {
  if (!item) return "$0";
  if (item.priceText !== undefined && item.priceText !== null && String(item.priceText).trim() !== "") {
    const raw = String(item.priceText).trim();
    return raw.startsWith("$") || raw.startsWith("₹") ? raw : `₹${raw}`;
  }
  const numVal = Number(item.price || 0);
  return `₹${Number.isFinite(numVal) ? numVal : 0}`;
}

function getNumericItemPrice(item) {
  if (!item) return 0;
  if (typeof item.price === "number" && Number.isFinite(item.price)) return item.price;
  const source = item.priceText !== undefined && item.priceText !== null ? String(item.priceText) : String(item.price || "0");
  const match = source.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function clampNum(val, min, max, fallback) {
  const n = Number(val);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function normalizeHexColor(val, fallback) {
  if (typeof val === "string" && /^#[0-9a-fA-F]{6}$/.test(val.trim())) {
    return val.trim();
  }
  return fallback;
}

function normalizeBoxSizes(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const mini = src.miniBox && typeof src.miniBox === "object" ? src.miniBox : {};
  const prod = src.productBox && typeof src.productBox === "object" ? src.productBox : {};

  return {
    miniBox: {
      width: clampNum(mini.width, 64, 180, DEFAULT_BOX_SIZES.miniBox.width),
      height: clampNum(mini.height, 90, 240, DEFAULT_BOX_SIZES.miniBox.height),
      imgHeight: clampNum(mini.imgHeight, 44, 160, DEFAULT_BOX_SIZES.miniBox.imgHeight),
      fontSize: clampNum(mini.fontSize, 9, 26, DEFAULT_BOX_SIZES.miniBox.fontSize),
      bgColor: normalizeHexColor(mini.bgColor, DEFAULT_BOX_SIZES.miniBox.bgColor),
      priceFontSize: clampNum(mini.priceFontSize, 9, 26, DEFAULT_BOX_SIZES.miniBox.priceFontSize),
      priceColor: normalizeHexColor(mini.priceColor, DEFAULT_BOX_SIZES.miniBox.priceColor),
      textBgTransparent: Boolean(mini.textBgTransparent)
    },
    productBox: {
      width: clampNum(prod.width, 110, 320, DEFAULT_BOX_SIZES.productBox.width),
      height: clampNum(prod.height, 165, 420, DEFAULT_BOX_SIZES.productBox.height),
      imgHeight: clampNum(prod.imgHeight, 80, 260, DEFAULT_BOX_SIZES.productBox.imgHeight),
      fontSize: clampNum(prod.fontSize, 10, 30, DEFAULT_BOX_SIZES.productBox.fontSize),
      bgColor: normalizeHexColor(prod.bgColor, DEFAULT_BOX_SIZES.productBox.bgColor),
      priceFontSize: clampNum(prod.priceFontSize, 10, 28, DEFAULT_BOX_SIZES.productBox.priceFontSize),
      priceColor: normalizeHexColor(prod.priceColor, DEFAULT_BOX_SIZES.productBox.priceColor),
      textBgTransparent: Boolean(prod.textBgTransparent)
    }
  };
}

function renderItemNameLines(containerEl, rawText, alignMode = "left") {
  if (!containerEl) return;
  const textStr = String(rawText ?? "");
  const lines = textStr.split(/\r?\n/);

  containerEl.innerHTML = "";
  containerEl.style.setProperty("display", "block", "important");
  containerEl.style.setProperty("width", "100%", "important");
  containerEl.style.setProperty("max-width", "100%", "important");
  containerEl.style.setProperty("min-width", "0", "important");
  containerEl.style.setProperty("overflow", "hidden", "important");
  containerEl.style.setProperty("text-align", alignMode, "important");

  lines.forEach((lineStr) => {
    const lineDiv = document.createElement("div");
    lineDiv.textContent = lineStr.length > 0 ? lineStr : "\u00A0";
    lineDiv.style.setProperty("display", "block", "important");
    lineDiv.style.setProperty("width", "100%", "important");
    lineDiv.style.setProperty("max-width", "100%", "important");
    lineDiv.style.setProperty("white-space", "pre", "important");
    lineDiv.style.setProperty("overflow", "hidden", "important");
    lineDiv.style.setProperty("text-overflow", "clip", "important");
    lineDiv.style.setProperty("word-break", "normal", "important");
    lineDiv.style.setProperty("overflow-wrap", "normal", "important");
    lineDiv.style.setProperty("text-align", alignMode, "important");
    containerEl.appendChild(lineDiv);
  });
}

function applyPriceVisualStyle(priceEl, item, defaultBoxPriceStyle) {
  if (!priceEl) return;
  const customSize = item && Number.isFinite(Number(item.priceFontSize)) && Number(item.priceFontSize) > 0
    ? Number(item.priceFontSize)
    : defaultBoxPriceStyle.priceFontSize;
  const customColor = item && item.priceColor
    ? normalizeHexColor(item.priceColor, defaultBoxPriceStyle.priceColor)
    : defaultBoxPriceStyle.priceColor;

  priceEl.style.setProperty("font-size", `${customSize}px`, "important");
  priceEl.style.setProperty("color", customColor, "important");
  priceEl.style.setProperty("font-weight", "700", "important");
  if (defaultBoxPriceStyle && defaultBoxPriceStyle.textBgTransparent) {
    priceEl.style.setProperty("background", "transparent", "important");
    priceEl.style.setProperty("background-color", "transparent", "important");
    priceEl.style.setProperty("border", "none", "important");
    priceEl.style.setProperty("box-shadow", "none", "important");
  }
}

function getActiveThemeColor(data) {
  if (data && typeof data.themeColor === "string" && /^#[0-9a-fA-F]{6}$/.test(data.themeColor.trim())) {
    return data.themeColor.trim();
  }
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(cssVar)) {
    return cssVar;
  }
  return "#0f766e";
}

function applyStripBarStyle(stripEl, sec) {
  if (!stripEl) return;

  const data = getWorkingStoreData();
  const themeCol = getActiveThemeColor(data);
  const topCol = sec && sec.barGradTop ? normalizeHexColor(sec.barGradTop, "") : "";
  const botCol = sec && sec.barGradBottom ? normalizeHexColor(sec.barGradBottom, "") : "";
  const customBg = sec && sec.barBgColor ? normalizeHexColor(sec.barBgColor, "") : "";

  const fillBg = (topCol && botCol)
    ? `linear-gradient(to bottom, ${topCol} 0%, ${botCol} 100%)`
    : (customBg || "");

  if (fillBg) {
    stripEl.style.setProperty("background", fillBg, "important");
    if (topCol || customBg) {
      stripEl.style.setProperty("background-color", topCol || customBg, "important");
    }
  }

  if (sec && Number.isFinite(Number(sec.barHeight)) && Number(sec.barHeight) > 0) {
    const h = clampNum(sec.barHeight, 24, 80, 36);
    stripEl.style.setProperty("min-height", `${h}px`, "important");
    stripEl.style.setProperty("height", `${h}px`, "important");
  }
  stripEl.style.setProperty("display", "flex", "important");
  stripEl.style.setProperty("align-items", "center", "important");
  stripEl.style.setProperty("position", "relative", "important");
  stripEl.style.setProperty("overflow", "visible", "important");
  stripEl.style.setProperty("box-sizing", "border-box", "important");

  stripEl.querySelectorAll(".strip-title, .owner-inline-edit-btn").forEach((child) => {
    child.style.setProperty("position", "relative", "important");
    child.style.setProperty("z-index", "2", "important");
  });

  const sp = sec && sec.barSpacing && typeof sec.barSpacing === "object" ? sec.barSpacing : null;
  const padTop = sp && Number.isFinite(Number(sp.top)) ? clampNum(sp.top, 0, 30, 6) : null;
  const padBot = sp && Number.isFinite(Number(sp.bottom)) ? clampNum(sp.bottom, 0, 30, 6) : null;
  const padLeft = sp && Number.isFinite(Number(sp.left)) ? clampNum(sp.left, 0, 36, 12) : null;
  const padRight = sp && Number.isFinite(Number(sp.right)) ? clampNum(sp.right, 0, 36, 12) : null;

  if (padTop !== null) stripEl.style.setProperty("padding-top", `${padTop}px`, "important");
  if (padBot !== null) stripEl.style.setProperty("padding-bottom", `${padBot}px`, "important");

  stripEl.querySelectorAll(".strip-side-edge-cap").forEach((el) => el.remove());
  stripEl.style.removeProperty("clip-path");

  const shapeMode = (sec && sec.barShape) || "default";
  const edgeColor = shapeMode === "default" ? (topCol || customBg || themeCol) : themeCol;

  if (shapeMode === "square") {
    stripEl.style.setProperty("border-radius", "0px", "important");
    stripEl.style.setProperty("border-top", `2px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("border-bottom", `2px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("border-left", `10px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("border-right", `10px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("padding-left", `${padLeft !== null ? padLeft : 14}px`, "important");
    stripEl.style.setProperty("padding-right", `${padRight !== null ? padRight : 14}px`, "important");
  } else if (shapeMode === "round") {
    stripEl.style.setProperty("border-radius", "999px", "important");
    stripEl.style.setProperty("border-top", `2px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("border-bottom", `2px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("border-left", `10px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("border-right", `10px solid ${edgeColor}`, "important");
    stripEl.style.setProperty("padding-left", `${padLeft !== null ? padLeft : 16}px`, "important");
    stripEl.style.setProperty("padding-right", `${padRight !== null ? padRight : 16}px`, "important");
  } else if (shapeMode === "triangle") {
    stripEl.style.setProperty("border-radius", "0px", "important");
    stripEl.style.setProperty("border", "none", "important");
    stripEl.style.setProperty("padding-left", `${(padLeft !== null ? padLeft : 10) + 18}px`, "important");
    stripEl.style.setProperty("padding-right", `${(padRight !== null ? padRight : 10) + 18}px`, "important");

    const leftCap = document.createElement("span");
    leftCap.className = "strip-side-edge-cap";
    leftCap.style.cssText =
      `position:absolute;left:0;top:0;bottom:0;width:18px;background:${edgeColor};clip-path:polygon(100% 0%, 0% 50%, 100% 100%);pointer-events:none;z-index:1;`;

    const rightCap = document.createElement("span");
    rightCap.className = "strip-side-edge-cap";
    rightCap.style.cssText =
      `position:absolute;right:0;top:0;bottom:0;width:18px;background:${edgeColor};clip-path:polygon(0% 0%, 100% 50%, 0% 100%);pointer-events:none;z-index:1;`;

    stripEl.appendChild(leftCap);
    stripEl.appendChild(rightCap);
  } else {
    stripEl.style.removeProperty("border-top");
    stripEl.style.removeProperty("border-bottom");
    stripEl.style.removeProperty("border-left");
    stripEl.style.removeProperty("border-right");
    stripEl.style.removeProperty("border-radius");

    const cs = window.getComputedStyle(stripEl);
    const tl = cs.borderTopLeftRadius;
    const bl = cs.borderBottomLeftRadius;
    const bwLeft = parseFloat(cs.borderLeftWidth) || 0;
    const sideW = bwLeft > 0 ? `${bwLeft}px` : "5px";
    const sideStyle = cs.borderLeftStyle && cs.borderLeftStyle !== "none" ? cs.borderLeftStyle : "solid";
    const sideCol = cs.borderLeftColor && cs.borderLeftColor !== "rgba(0, 0, 0, 0)" ? cs.borderLeftColor : edgeColor;

    if (tl && tl !== "0px") {
      stripEl.style.setProperty("border-top-right-radius", tl, "important");
    }
    if (bl && bl !== "0px") {
      stripEl.style.setProperty("border-bottom-right-radius", bl, "important");
    }
    stripEl.style.setProperty("border-left", `${sideW} ${sideStyle} ${sideCol}`, "important");
    stripEl.style.setProperty("border-right", `${sideW} ${sideStyle} ${sideCol}`, "important");

    if (padLeft !== null) {
      stripEl.style.setProperty("padding-left", `${padLeft}px`, "important");
    }
    if (padRight !== null) {
      stripEl.style.setProperty("padding-right", `${padRight}px`, "important");
    } else if (cs.paddingLeft && cs.paddingLeft !== "0px") {
      stripEl.style.setProperty("padding-right", cs.paddingLeft, "important");
    }
  }
}

function syncStripBarCornerDesign() {
  const data = getWorkingStoreData();
  const stripEls = document.querySelectorAll("#sectionsContainer .strip-bar");
  if (stripEls.length > 0) {
    stripEls.forEach((stripEl, idx) => {
      const sec = data.sections && data.sections[idx] ? data.sections[idx] : null;
      applyStripBarStyle(stripEl, sec);
    });
  } else {
    document.querySelectorAll(".strip-bar").forEach((stripEl) => {
      applyStripBarStyle(stripEl, null);
    });
  }
}

function applyInnerBoxColor(boxEl, innerSelector, boxCfg) {
  const safeColor = normalizeHexColor(boxCfg && boxCfg.bgColor, "#ffffff");
  const isNoBg = Boolean(boxCfg && boxCfg.textBgTransparent);
  const innerEl = boxEl.querySelector(innerSelector);

  if (isNoBg) {
    boxEl.style.setProperty("background", "transparent", "important");
    boxEl.style.setProperty("background-color", "transparent", "important");
    boxEl.style.setProperty("border", "none", "important");
    boxEl.style.setProperty("box-shadow", "none", "important");
    boxEl.style.setProperty("padding", "0px", "important");
    boxEl.style.setProperty("min-height", "0px", "important");
    boxEl.style.setProperty("height", "auto", "important");
    boxEl.style.setProperty("overflow", "visible", "important");
    if (innerEl) {
      innerEl.style.setProperty("background", "transparent", "important");
      innerEl.style.setProperty("background-color", "transparent", "important");
      innerEl.style.setProperty("border", "none", "important");
      innerEl.style.setProperty("box-shadow", "none", "important");
      innerEl.style.setProperty("padding", "4px 0 0 0", "important");
      innerEl.style.setProperty("margin", "0", "important");
    }
  } else {
    boxEl.style.setProperty("background", safeColor, "important");
    boxEl.style.setProperty("background-color", safeColor, "important");
    boxEl.style.removeProperty("border");
    boxEl.style.removeProperty("box-shadow");
    boxEl.style.removeProperty("padding");
    boxEl.style.setProperty("overflow", "hidden", "important");
    if (innerEl) {
      innerEl.style.setProperty("background", safeColor, "important");
      innerEl.style.setProperty("background-color", safeColor, "important");
      innerEl.style.removeProperty("border");
      innerEl.style.removeProperty("box-shadow");
      innerEl.style.removeProperty("padding");
      innerEl.style.removeProperty("margin");
    }
  }
}

function applyBoxSizeStyles() {
  const data = getWorkingStoreData();
  const baseSizes = normalizeBoxSizes(data.boxSizes);
  data.boxSizes = baseSizes;

  const anyMiniNoBg = Boolean(
    baseSizes.miniBox.textBgTransparent ||
    (data.sections || []).some((s) => s && s.customBoxSizes && s.customBoxSizes.miniBox && s.customBoxSizes.miniBox.textBgTransparent)
  );
  const anyProdNoBg = Boolean(
    baseSizes.productBox.textBgTransparent ||
    (data.sections || []).some((s) => s && s.customBoxSizes && s.customBoxSizes.productBox && s.customBoxSizes.productBox.textBgTransparent)
  );
  syncNoBgCleanStyleTag(anyMiniNoBg, anyProdNoBg);

  const root = document.documentElement;
  root.style.setProperty("--mini-box-w", `${baseSizes.miniBox.width}px`);
  root.style.setProperty("--mini-box-h", `${baseSizes.miniBox.height}px`);
  root.style.setProperty("--mini-box-img-h", `${baseSizes.miniBox.imgHeight}px`);
  root.style.setProperty("--mini-box-font-sz", `${baseSizes.miniBox.fontSize}px`);
  root.style.setProperty("--mini-box-bg", baseSizes.miniBox.textBgTransparent ? "transparent" : baseSizes.miniBox.bgColor);
  root.style.setProperty("--mini-price-sz", `${baseSizes.miniBox.priceFontSize}px`);
  root.style.setProperty("--mini-price-color", baseSizes.miniBox.priceColor);

  root.style.setProperty("--product-box-w", `${baseSizes.productBox.width}px`);
  root.style.setProperty("--product-box-h", `${baseSizes.productBox.height}px`);
  root.style.setProperty("--product-box-img-h", `${baseSizes.productBox.imgHeight}px`);
  root.style.setProperty("--product-box-font-sz", `${baseSizes.productBox.fontSize}px`);
  root.style.setProperty("--product-box-bg", baseSizes.productBox.textBgTransparent ? "transparent" : baseSizes.productBox.bgColor);
  root.style.setProperty("--product-price-sz", `${baseSizes.productBox.priceFontSize}px`);
  root.style.setProperty("--product-price-color", baseSizes.productBox.priceColor);

  const sectionEls = document.querySelectorAll("#sectionsContainer .row-section");
  sectionEls.forEach((secEl, sIdx) => {
    const sec = (data.sections && data.sections[sIdx]) || null;
    const sizes = getEffectiveBoxSizesForSection(data, sIdx);
    const secItems = (sec && Array.isArray(sec.items)) ? sec.items : [];

    if (sIdx === 0) {
      const fiveRow = secEl.querySelector(".five-boxes-row");
      if (fiveRow) {
        fiveRow.style.setProperty("overflow-x", "auto", "important");
        fiveRow.style.setProperty("flex-wrap", "nowrap", "important");
      }

      secEl.querySelectorAll(".mini-box:not(.user-photo-only-box)").forEach((box, idx) => {
        const item = secItems[idx] || null;
        const w = sizes.miniBox.width;
        const h = sizes.miniBox.height;

        box.style.setProperty("box-sizing", "border-box", "important");
        box.style.setProperty("flex", `0 0 ${w}px`, "important");
        box.style.setProperty("width", `${w}px`, "important");
        box.style.setProperty("min-width", `${w}px`, "important");
        box.style.setProperty("max-width", `${w}px`, "important");

        if (sizes.miniBox.textBgTransparent) {
          box.style.setProperty("height", "auto", "important");
          box.style.setProperty("min-height", "0px", "important");
        } else {
          box.style.setProperty("height", `${h}px`, "important");
          box.style.setProperty("min-height", `${h}px`, "important");
        }

        applyInnerBoxColor(box, ".mini-box-body", sizes.miniBox);
        const bodyEl = box.querySelector(".mini-box-body");
        if (bodyEl) {
          bodyEl.style.width = "100%";
          bodyEl.style.maxWidth = "100%";
          bodyEl.style.minWidth = "0";
          bodyEl.style.overflow = "hidden";
          bodyEl.style.boxSizing = "border-box";
        }

        const img = box.querySelector("img");
        if (img) {
          img.style.width = "100%";
          img.style.height = `${sizes.miniBox.imgHeight}px`;
          img.style.objectFit = "cover";
          img.style.borderRadius = sizes.miniBox.textBgTransparent ? "10px" : "0px";
        }
        const placeholder = box.querySelector("[data-box-placeholder='mini']");
        if (placeholder) {
          placeholder.style.width = "100%";
          placeholder.style.height = `${sizes.miniBox.imgHeight}px`;
          placeholder.style.borderRadius = sizes.miniBox.textBgTransparent ? "10px" : "0px";
        }

        const nameEl = box.querySelector(".mini-box-name");
        if (nameEl) {
          if (!item || !item.nameStyle) {
            nameEl.style.fontSize = `${sizes.miniBox.fontSize}px`;
          }
          nameEl.style.display = "block";
          nameEl.style.width = "100%";
          nameEl.style.maxWidth = "100%";
          nameEl.style.minWidth = "0";
          nameEl.style.overflow = "hidden";
          if (sizes.miniBox.textBgTransparent) {
            nameEl.style.setProperty("background", "transparent", "important");
            nameEl.style.setProperty("background-color", "transparent", "important");
            nameEl.style.setProperty("border", "none", "important");
            nameEl.style.setProperty("box-shadow", "none", "important");
          }
        }
        const priceEl = box.querySelector(".mini-box-price");
        if (priceEl) {
          applyPriceVisualStyle(priceEl, item, sizes.miniBox);
        }
      });

      const userProfileBox = secEl.querySelector(".mini-box.user-photo-only-box");
      if (userProfileBox) {
        const w = sizes.miniBox.width;
        const h = sizes.miniBox.height;
        userProfileBox.style.setProperty("box-sizing", "border-box", "important");
        userProfileBox.style.setProperty("flex", `0 0 ${w}px`, "important");
        userProfileBox.style.setProperty("width", `${w}px`, "important");
        userProfileBox.style.setProperty("min-width", `${w}px`, "important");
        userProfileBox.style.setProperty("max-width", `${w}px`, "important");
        userProfileBox.style.setProperty("height", `${h}px`, "important");
        userProfileBox.style.setProperty("min-height", `${h}px`, "important");
      }
      return;
    }

    secEl.querySelectorAll(".item-box").forEach((box, idx) => {
      const item = secItems[idx] || null;
      const w = sizes.productBox.width;
      const h = sizes.productBox.height;

      box.style.setProperty("box-sizing", "border-box", "important");
      box.style.setProperty("flex", `0 0 ${w}px`, "important");
      box.style.setProperty("width", `${w}px`, "important");
      box.style.setProperty("min-width", `${w}px`, "important");
      box.style.setProperty("max-width", `${w}px`, "important");

      if (sizes.productBox.textBgTransparent) {
        box.style.setProperty("height", "auto", "important");
        box.style.setProperty("min-height", "0px", "important");
      } else {
        box.style.setProperty("height", `${h}px`, "important");
        box.style.setProperty("min-height", `${h}px`, "important");
      }

      applyInnerBoxColor(box, ".item-info", sizes.productBox);
      const infoEl = box.querySelector(".item-info");
      if (infoEl) {
        infoEl.style.width = "100%";
        infoEl.style.maxWidth = "100%";
        infoEl.style.minWidth = "0";
        infoEl.style.overflow = "hidden";
        infoEl.style.boxSizing = "border-box";
      }

      const img = box.querySelector("img");
      if (img) {
        img.style.width = "100%";
        img.style.height = `${sizes.productBox.imgHeight}px`;
        img.style.objectFit = "cover";
        img.style.borderRadius = sizes.productBox.textBgTransparent ? "10px" : "0px";
      }
      const placeholder = box.querySelector("[data-box-placeholder='product']");
      if (placeholder) {
        placeholder.style.width = "100%";
        placeholder.style.height = `${sizes.productBox.imgHeight}px`;
        placeholder.style.borderRadius = sizes.productBox.textBgTransparent ? "10px" : "0px";
      }

      const nameEl = box.querySelector(".item-name");
      if (nameEl) {
        if (!item || !item.nameStyle) {
          nameEl.style.fontSize = `${sizes.productBox.fontSize}px`;
        }
        nameEl.style.display = "block";
        nameEl.style.width = "100%";
        nameEl.style.maxWidth = "100%";
        nameEl.style.minWidth = "0";
        nameEl.style.overflow = "hidden";
        if (sizes.productBox.textBgTransparent) {
          nameEl.style.setProperty("background", "transparent", "important");
          nameEl.style.setProperty("background-color", "transparent", "important");
          nameEl.style.setProperty("border", "none", "important");
          nameEl.style.setProperty("box-shadow", "none", "important");
        }
      }
      const priceEl = box.querySelector(".item-price");
      if (priceEl) {
        applyPriceVisualStyle(priceEl, item, sizes.productBox);
      }
    });
  });

  syncStripBarCornerDesign();
}

function updateBoxSizeSetting(boxType, prop, value, { persist = false, sIdx = null } = {}) {
  const targetData = persist ? storeData : getWorkingStoreData();
  targetData.boxSizes = normalizeBoxSizes(targetData.boxSizes);

  let targetObj;
  if (typeof sIdx === "number" && targetData.sections && targetData.sections[sIdx]) {
    const sec = targetData.sections[sIdx];
    const effective = getEffectiveBoxSizesForSection(targetData, sIdx);
    sec.customBoxSizes = {
      miniBox: { ...effective.miniBox },
      productBox: { ...effective.productBox }
    };
    targetObj = boxType === "mini" ? sec.customBoxSizes.miniBox : sec.customBoxSizes.productBox;
  } else {
    targetObj = boxType === "mini" ? targetData.boxSizes.miniBox : targetData.boxSizes.productBox;
  }

  if (boxType === "mini") {
    if (prop === "width") {
      targetObj.width = clampNum(value, 64, 180, DEFAULT_BOX_SIZES.miniBox.width);
    } else if (prop === "height") {
      targetObj.height = clampNum(value, 90, 240, DEFAULT_BOX_SIZES.miniBox.height);
      const maxImg = Math.max(44, targetObj.height - 42);
      if (targetObj.imgHeight > maxImg) {
        targetObj.imgHeight = maxImg;
      }
    } else if (prop === "imgHeight") {
      targetObj.imgHeight = clampNum(value, 44, 160, DEFAULT_BOX_SIZES.miniBox.imgHeight);
    } else if (prop === "fontSize") {
      targetObj.fontSize = clampNum(value, 9, 26, DEFAULT_BOX_SIZES.miniBox.fontSize);
    } else if (prop === "bgColor") {
      targetObj.bgColor = normalizeHexColor(value, DEFAULT_BOX_SIZES.miniBox.bgColor);
    } else if (prop === "priceFontSize") {
      targetObj.priceFontSize = clampNum(value, 9, 26, DEFAULT_BOX_SIZES.miniBox.priceFontSize);
    } else if (prop === "priceColor") {
      targetObj.priceColor = normalizeHexColor(value, DEFAULT_BOX_SIZES.miniBox.priceColor);
    } else if (prop === "textBgTransparent") {
      targetObj.textBgTransparent = Boolean(value);
    }
  } else if (boxType === "product") {
    if (prop === "width") {
      targetObj.width = clampNum(value, 110, 320, DEFAULT_BOX_SIZES.productBox.width);
    } else if (prop === "height") {
      targetObj.height = clampNum(value, 165, 420, DEFAULT_BOX_SIZES.productBox.height);
      const maxImg = Math.max(80, targetObj.height - 82);
      if (targetObj.imgHeight > maxImg) {
        targetObj.imgHeight = maxImg;
      }
    } else if (prop === "imgHeight") {
      targetObj.imgHeight = clampNum(value, 80, 260, DEFAULT_BOX_SIZES.productBox.imgHeight);
    } else if (prop === "fontSize") {
      targetObj.fontSize = clampNum(value, 10, 30, DEFAULT_BOX_SIZES.productBox.fontSize);
    } else if (prop === "bgColor") {
      targetObj.bgColor = normalizeHexColor(value, DEFAULT_BOX_SIZES.productBox.bgColor);
    } else if (prop === "priceFontSize") {
      targetObj.priceFontSize = clampNum(value, 10, 28, DEFAULT_BOX_SIZES.productBox.priceFontSize);
    } else if (prop === "priceColor") {
      targetObj.priceColor = normalizeHexColor(value, DEFAULT_BOX_SIZES.productBox.priceColor);
    } else if (prop === "textBgTransparent") {
      targetObj.textBgTransparent = Boolean(value);
    }
  }

  if (OWNER_EDIT_MODE && draftStoreData && !persist) {
    draftStoreData.boxSizes = normalizeBoxSizes(targetData.boxSizes);
  }
  if (persist) {
    storeData.boxSizes = normalizeBoxSizes(targetData.boxSizes);
    saveData();
  }

  applyBoxSizeStyles();
}

function resetBoxSizes({ persist = false, sIdx = null } = {}) {
  const fresh = normalizeBoxSizes(DEFAULT_BOX_SIZES);
  if (typeof sIdx === "number") {
    const targetData = persist ? storeData : getWorkingStoreData();
    if (targetData.sections && targetData.sections[sIdx]) {
      delete targetData.sections[sIdx].customBoxSizes;
    }
    if (persist) saveData();
    applyBoxSizeStyles();
    return;
  }

  if (persist) {
    storeData.boxSizes = JSON.parse(JSON.stringify(fresh));
    if (draftStoreData) draftStoreData.boxSizes = JSON.parse(JSON.stringify(fresh));
    saveData();
  } else if (OWNER_EDIT_MODE && draftStoreData) {
    draftStoreData.boxSizes = JSON.parse(JSON.stringify(fresh));
  } else {
    storeData.boxSizes = JSON.parse(JSON.stringify(fresh));
  }
  applyBoxSizeStyles();
}

window.updateBoxSizeSetting = updateBoxSizeSetting;
window.resetBoxSizes = resetBoxSizes;
window.applyBoxSizeStyles = applyBoxSizeStyles;
window.syncStripBarCornerDesign = syncStripBarCornerDesign;

function createDefaultTextStyle(overrides = {}) {
  return {
    fontFamily: STORE_FONT_OPTIONS[0].value,
    fontStyle: "normal",
    fontSize: 30,
    fontWeight: 700,
    letterSpacing: 0,
    textTransform: "none",
    color: "#ffffff",
    glowEnabled: false,
    glowColor: "#38bdf8",
    glowSize: 12,
    borderEnabled: false,
    borderColor: "#0f172a",
    borderWidth: 1.2,
    bgEnabled: false,
    bgColor: "#0f766e",
    bgOpacity: 0.65,
    bgRadius: 8,
    ...overrides
  };
}

function getSafeThinBorderWidth(fontSize, requestedWidth) {
  const size = Math.max(10, Number(fontSize) || 14);
  const maxClearAllowed = Math.max(1.0, Math.min(2.6, Number((size * 0.08).toFixed(1))));
  const req = Number(requestedWidth);
  if (!Number.isFinite(req) || req <= 0) return 1.2;
  return Number(Math.max(0.8, Math.min(maxClearAllowed, req)).toFixed(1));
}

function hexToRgba(hex, alpha = 1) {
  const clean = String(hex || "#000000").replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean.padEnd(6, "0").slice(0, 6);
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const a = Math.max(0, Math.min(1, Number(alpha)));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function normalizeTextStyle(raw, defaults = {}) {
  const base = createDefaultTextStyle(defaults);
  const s = raw && typeof raw === "object" ? raw : {};
  const fontSize = Number.isFinite(Number(s.fontSize)) ? Number(s.fontSize) : base.fontSize;
  const rawBorder = Number.isFinite(Number(s.borderWidth)) ? Number(s.borderWidth) : base.borderWidth;
  return {
    ...base,
    ...s,
    fontSize,
    fontWeight: Number.isFinite(Number(s.fontWeight)) ? Number(s.fontWeight) : base.fontWeight,
    letterSpacing: Number.isFinite(Number(s.letterSpacing)) ? Number(s.letterSpacing) : base.letterSpacing,
    textTransform: s.textTransform || base.textTransform,
    glowSize: Number.isFinite(Number(s.glowSize)) ? Number(s.glowSize) : base.glowSize,
    borderWidth: getSafeThinBorderWidth(fontSize, rawBorder),
    bgOpacity: Number.isFinite(Number(s.bgOpacity)) ? Number(s.bgOpacity) : base.bgOpacity,
    bgRadius: Number.isFinite(Number(s.bgRadius)) ? Number(s.bgRadius) : base.bgRadius
  };
}

function applyTextStyleToElement(el, rawStyle, defaults = {}) {
  if (!el) return;
  const st = normalizeTextStyle(rawStyle, defaults);

  el.style.fontFamily = st.fontFamily;
  el.style.fontStyle = st.fontStyle;
  el.style.fontSize = `${st.fontSize}px`;
  el.style.fontWeight = String(st.fontWeight);
  el.style.letterSpacing = `${st.letterSpacing}px`;
  el.style.textTransform = st.textTransform;
  el.style.color = st.color;

  const hasExplicitLineBreak = String(el.textContent || "").includes("\n");
  el.style.setProperty("white-space", hasExplicitLineBreak ? "pre-line" : "pre", "important");
  el.style.setProperty("word-break", "normal", "important");
  el.style.setProperty("overflow-wrap", "normal", "important");
  el.style.setProperty("overflow", "hidden", "important");
  el.style.setProperty("text-overflow", "clip", "important");

  if (st.borderEnabled) {
    const clearWidth = getSafeThinBorderWidth(st.fontSize, st.borderWidth);
    el.style.webkitTextStroke = `${clearWidth}px ${st.borderColor}`;
    el.style.setProperty("paint-order", "stroke fill");
  } else {
    el.style.webkitTextStroke = "0px transparent";
    el.style.removeProperty("paint-order");
  }

  if (st.glowEnabled) {
    const gSize = Math.max(2, st.glowSize);
    el.style.textShadow = `0 0 ${Math.round(gSize * 0.45)}px ${st.glowColor}, 0 0 ${gSize}px ${st.glowColor}`;
  } else {
    el.style.textShadow = "none";
  }

  if (st.bgEnabled) {
    el.style.background = hexToRgba(st.bgColor, st.bgOpacity);
    el.style.padding = "3px 8px";
    el.style.borderRadius = `${st.bgRadius}px`;
    el.style.boxDecorationBreak = "clone";
    el.style.webkitBoxDecorationBreak = "clone";
  } else {
    el.style.background = "transparent";
    el.style.padding = "0px";
    el.style.borderRadius = "0px";
  }
}

let OWNER_EDIT_MODE = new URLSearchParams(window.location.search).get("ownerEdit") === "1";
window.OWNER_EDIT_MODE = OWNER_EDIT_MODE;

function setOwnerEditMode(active) {
  OWNER_EDIT_MODE = Boolean(active);
  window.OWNER_EDIT_MODE = OWNER_EDIT_MODE;
}

function getSectionTitleForView(rawTitle, index) {
  const baseName = rawTitle !== undefined && rawTitle !== null && String(rawTitle).length > 0
    ? String(rawTitle)
    : "Name";
  if (OWNER_EDIT_MODE) {
    return `${index + 1}. ${baseName}`;
  }
  return baseName;
}

function buildInitialData() {
  const sections = DEFAULT_SECTION_TITLES.map((title, idx) => {
    const count = idx === 0 ? 4 : 5;
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push({
        id: `${idx}-${i}`,
        name: "Item",
        price: 0,
        priceText: "0",
        priceFontSize: null,
        priceColor: null,
        img: "",
        nameStyle: null
      });
    }
    return {
      title,
      items,
      titleStyle: null,
      barBgColor: "",
      barGradTop: "",
      barGradBottom: "",
      barShape: "default",
      barSpacing: null,
      barHidden: false,
      barHeight: 36,
      customBoxSizes: null,
      customAd: null
    };
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
    titlePosNorm: { rx: 0, ry: 0 },
    titleFont: STORE_FONT_OPTIONS[0].value,
    titleFontStyle: "normal",
    titleSize: 30,
    titleColor: STORE_NAME_COLORS[0],
    titleStyle: createDefaultTextStyle({ fontSize: 30, fontWeight: 700, color: STORE_NAME_COLORS[0] }),
    boxSizes: normalizeBoxSizes(DEFAULT_BOX_SIZES),
    themeColor: "#0f766e",
    coverImg: "",
    coverSlots: [""],
    coverHeight: null,
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
  if (!data.titlePosNorm || typeof data.titlePosNorm.rx !== "number" || typeof data.titlePosNorm.ry !== "number") {
    data.titlePosNorm = { rx: 0, ry: 0 };
  }
  if (!data.titleFont) data.titleFont = STORE_FONT_OPTIONS[0].value;
  if (!data.titleFontStyle) data.titleFontStyle = "normal";
  if (!data.titleSize || Number.isNaN(Number(data.titleSize))) data.titleSize = 30;
  if (!data.titleColor) data.titleColor = STORE_NAME_COLORS[0];

  data.boxSizes = normalizeBoxSizes(data.boxSizes);

  data.titleStyle = normalizeTextStyle(data.titleStyle, {
    fontFamily: data.titleFont,
    fontStyle: data.titleFontStyle,
    fontSize: data.titleSize,
    color: data.titleColor
  });
  data.titleFont = data.titleStyle.fontFamily;
  data.titleFontStyle = data.titleStyle.fontStyle;
  data.titleSize = data.titleStyle.fontSize;
  data.titleColor = data.titleStyle.color;

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
    reader.onerror = () => resolve(null);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(null);
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
  const sizes = normalizeBoxSizes(getWorkingStoreData().boxSizes);
  const h = isMini ? sizes.miniBox.imgHeight : sizes.productBox.imgHeight;
  const kind = isMini ? "mini" : "product";
  const radius = isMini
    ? (sizes.miniBox.textBgTransparent ? "10px" : "0px")
    : (sizes.productBox.textBgTransparent ? "10px" : "0px");
  if (src) {
    return `<img src="${src}" alt="${altText}" style="width:100%;height:${h}px;object-fit:cover;display:block;border-radius:${radius};" />`;
  }
  return `<div data-box-placeholder="${kind}" style="width:100%;height:${h}px;background:#e5e7eb;border-radius:${radius};"></div>`;
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

function ensureCoverStoreTitleElements(coverWrap) {
  if (!coverWrap) return { overlayEl: null, titleEl: null, subEl: null };
  let overlayEl = coverWrap.querySelector(".cover-overlay");
  if (!overlayEl) {
    overlayEl = document.createElement("div");
    overlayEl.className = "cover-overlay";
    coverWrap.appendChild(overlayEl);
  }
  overlayEl.style.setProperty("display", "inline-flex", "important");
  overlayEl.style.setProperty("visibility", "visible", "important");
  overlayEl.style.setProperty("opacity", "1", "important");

  let titleEl = overlayEl.querySelector("#storeTitle") || document.getElementById("storeTitle");
  if (!titleEl) {
    titleEl = document.createElement("div");
    titleEl.id = "storeTitle";
    overlayEl.prepend(titleEl);
  } else if (titleEl.parentElement !== overlayEl) {
    overlayEl.prepend(titleEl);
  }
  titleEl.style.setProperty("display", "inline-block", "important");
  titleEl.style.setProperty("visibility", "visible", "important");
  titleEl.style.setProperty("opacity", "1", "important");

  const subEl = overlayEl.querySelector("#storeSubtitle") || document.getElementById("storeSubtitle");
  return { overlayEl, titleEl, subEl };
}

function resolveTitlePixelPos(data, coverWrap, overlayEl) {
  const pos = data && data.titlePos ? data.titlePos : { x: 0, y: 0 };
  const wrapRect = coverWrap ? coverWrap.getBoundingClientRect() : null;
  const wrapW = wrapRect && wrapRect.width > 0 ? wrapRect.width : 360;
  const wrapH = wrapRect && wrapRect.height > 0
    ? wrapRect.height
    : (Number.isFinite(Number(data && data.coverHeight)) && Number(data.coverHeight) > 0
      ? Number(data.coverHeight)
      : 170);

  const boxW = overlayEl ? (overlayEl.offsetWidth || 0) : 0;
  const boxH = overlayEl ? (overlayEl.offsetHeight || 0) : 0;
  const maxX = Math.max(0, wrapW - boxW);
  const maxY = Math.max(0, wrapH - boxH);

  const norm = data && data.titlePosNorm;
  if (norm && typeof norm.rx === "number" && typeof norm.ry === "number") {
    const x = Math.min(maxX, Math.max(0, Math.round(norm.rx * maxX)));
    const y = Math.min(maxY, Math.max(0, Math.round(norm.ry * maxY)));
    return { x, y };
  }

  const x = Math.min(maxX, Math.max(0, Math.round(Number(pos.x) || 0)));
  const y = Math.min(maxY, Math.max(0, Math.round(Number(pos.y) || 0)));
  return { x, y };
}

function syncTitleNormalizedPos(data, coverWrap, overlayEl) {
  if (!data || !coverWrap || !overlayEl) return;
  const wrapRect = coverWrap.getBoundingClientRect();
  if (!wrapRect.width || !wrapRect.height) return;

  const boxW = overlayEl.offsetWidth || 0;
  const boxH = overlayEl.offsetHeight || 0;
  const maxX = Math.max(1, wrapRect.width - boxW);
  const maxY = Math.max(1, wrapRect.height - boxH);

  const curX = Number(data.titlePos && data.titlePos.x) || 0;
  const curY = Number(data.titlePos && data.titlePos.y) || 0;

  data.titlePosNorm = {
    rx: Math.min(1, Math.max(0, curX / maxX)),
    ry: Math.min(1, Math.max(0, curY / maxY))
  };
}

function applyTitlePositionStyle() {
  const data = getWorkingStoreData();
  const coverWrap = document.querySelector(".cover-wrapper");
  if (!coverWrap) return;
  const { overlayEl, titleEl, subEl } = ensureCoverStoreTitleElements(coverWrap);
  if (!overlayEl) return;

  if (subEl && !subEl.textContent.trim()) {
    subEl.style.display = "none";
  }

  overlayEl.style.position = "absolute";
  overlayEl.style.left = "0px";
  overlayEl.style.top = "0px";
  overlayEl.style.right = "auto";
  overlayEl.style.bottom = "auto";
  overlayEl.style.width = "max-content";
  overlayEl.style.height = "max-content";
  overlayEl.style.maxWidth = "none";
  overlayEl.style.margin = "0";
  overlayEl.style.padding = "0";
  overlayEl.style.border = "none";
  overlayEl.style.borderRadius = "0px";
  overlayEl.style.background = "transparent";
  overlayEl.style.display = "inline-flex";
  overlayEl.style.alignItems = "center";
  overlayEl.style.gap = "6px";
  overlayEl.style.boxSizing = "border-box";
  overlayEl.style.zIndex = "22";

  if (titleEl) {
    titleEl.style.display = "inline-block";
    titleEl.style.margin = "0";
    titleEl.style.lineHeight = "1.05";
    titleEl.style.overflow = "visible";

    const st = normalizeTextStyle(data.titleStyle, {
      fontFamily: data.titleFont || STORE_FONT_OPTIONS[0].value,
      fontStyle: data.titleFontStyle || "normal",
      fontSize: Number(data.titleSize) || 30,
      color: data.titleColor || STORE_NAME_COLORS[0]
    });
    applyTextStyleToElement(titleEl, st);
    if (!st.bgEnabled) {
      titleEl.style.padding = "0px";
      titleEl.style.borderRadius = "0px";
    }
  }

  const resolved = resolveTitlePixelPos(data, coverWrap, overlayEl);
  data.titlePos = resolved;
  overlayEl.style.left = `${resolved.x}px`;
  overlayEl.style.top = `${resolved.y}px`;
  syncTitleNormalizedPos(data, coverWrap, overlayEl);
}

window.resolveTitlePixelPos = resolveTitlePixelPos;
window.syncTitleNormalizedPos = syncTitleNormalizedPos;
window.applyTitlePositionStyle = applyTitlePositionStyle;

function applyCoverHeightStyle(coverWrap, data) {
  if (!coverWrap || !data) return;
  if (Number.isFinite(Number(data.coverHeight)) && Number(data.coverHeight) > 0) {
    const ch = clampNum(data.coverHeight, 110, 380, 170);
    coverWrap.style.setProperty("height", `${ch}px`, "important");
    coverWrap.style.setProperty("min-height", `${ch}px`, "important");
    coverWrap.style.setProperty("max-height", `${ch}px`, "important");
  }
}

window.applyCoverHeightStyle = applyCoverHeightStyle;

function renderHeader() {
  const data = getWorkingStoreData();
  if (data.themeColor) {
    document.documentElement.style.setProperty("--primary", data.themeColor);
  }
  const coverWrap = document.querySelector(".cover-wrapper");
  if (!coverWrap) return;

  const { titleEl, subEl } = ensureCoverStoreTitleElements(coverWrap);
  if (titleEl) {
    titleEl.textContent = data.storeTitle !== undefined && data.storeTitle !== null && String(data.storeTitle).length > 0
      ? String(data.storeTitle)
      : "Store Name";
  }
  if (subEl) subEl.textContent = data.storeSubtitle || "";

  coverWrap.style.position = "relative";
  coverWrap.style.overflow = "hidden";
  applyCoverHeightStyle(coverWrap, data);
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
      "position:relative;flex:0 0 100%;width:100%;height:100%;scroll-snap-align:start;background:#e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;";

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

function renderCustomAdSlotElement(adCfg) {
  if (!adCfg || (!adCfg.code && !adCfg.label)) return null;

  const wVal = String(adCfg.width || "100%").trim();
  const hVal = String(adCfg.height || "64px").trim();
  const moveMode = adCfg.moveMode || "static";

  const outerBox = document.createElement("div");
  outerBox.className = "owner-custom-ad-slot";
  outerBox.style.cssText =
    `width:${wVal};max-width:100%;height:${hVal};margin:6px auto;border:1px dashed #94a3b8;border-radius:10px;background:#f8fafc;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;`;

  const innerMover = document.createElement("div");
  innerMover.style.cssText =
    "width:100%;height:100%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;";

  if (moveMode === "float") {
    innerMover.style.animation = "storeAdFloatAnim 2.4s ease-in-out infinite";
  } else if (moveMode === "marquee") {
    innerMover.style.animation = "storeAdMarqueeAnim 7s linear infinite";
    innerMover.style.whiteSpace = "nowrap";
  }

  const rawCode = String(adCfg.code || "").trim();
  if (/^https?:\/\//i.test(rawCode) && /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(rawCode)) {
    const img = document.createElement("img");
    img.src = rawCode;
    img.alt = adCfg.label || "Ad";
    img.style.cssText = "max-width:100%;max-height:100%;object-fit:contain;display:block;";
    innerMover.appendChild(img);
  } else if (rawCode) {
    const htmlHolder = document.createElement("div");
    htmlHolder.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;";
    htmlHolder.innerHTML = rawCode;
    htmlHolder.querySelectorAll("script").forEach((oldScript) => {
      const s = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => s.setAttribute(attr.name, attr.value));
      s.textContent = oldScript.textContent || "";
      oldScript.replaceWith(s);
    });
    innerMover.appendChild(htmlHolder);
  } else {
    const badge = document.createElement("span");
    badge.textContent = adCfg.label || "Ad";
    badge.style.cssText = "font-size:0.82rem;font-weight:700;color:#334155;";
    innerMover.appendChild(badge);
  }

  outerBox.appendChild(innerMover);
  return outerBox;
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
    sectionEl.dataset.sectionIndex = String(sIdx);

    const boxSizes = getEffectiveBoxSizesForSection(data, sIdx);
    const isBarHidden = Boolean(sec && sec.barHidden);

    if (!isBarHidden) {
      const displayTitle = getSectionTitleForView(sec.title || "", sIdx);
      const stripEl = document.createElement("div");
      stripEl.className = "strip-bar";
      const stripTitleEl = document.createElement("span");
      stripTitleEl.className = "strip-title";
      stripTitleEl.textContent = displayTitle;
      stripEl.appendChild(stripTitleEl);
      applyTextStyleToElement(stripTitleEl, sec.titleStyle, {
        fontSize: 16,
        fontWeight: 700,
        color: "#111827"
      });
      applyStripBarStyle(stripEl, sec);
      sectionEl.appendChild(stripEl);
    } else if (sec && sec.customAd) {
      const adEl = renderCustomAdSlotElement(sec.customAd);
      if (adEl) sectionEl.appendChild(adEl);
    }

    if (sIdx === 0) {
      const fiveRow = document.createElement("div");
      fiveRow.className = "five-boxes-row";
      const topRowLimit = Math.min(MAX_TOP_ROW_BOXES, maxBoxes);

      sec.items.slice(0, topRowLimit).forEach((item) => {
        const cleanItemName = item.name !== undefined && item.name !== null && String(item.name).length > 0
          ? String(item.name)
          : "Item";
        const priceDisplay = formatItemPriceDisplay(item);
        const box = document.createElement("div");
        box.className = "mini-box";
        box.style.cursor = OWNER_EDIT_MODE ? "default" : "pointer";
        box.onclick = () => {
          if (OWNER_EDIT_MODE) return;
          openOrderModal(0, item.id);
        };
        box.innerHTML = `
          ${imgMarkup(item.img, cleanItemName, true)}
          <div class="mini-box-body" style="text-align:left;width:100%;max-width:100%;min-width:0;overflow:hidden;box-sizing:border-box;">
            <div class="mini-box-name"></div>
            <div class="mini-box-price" style="text-align:left;">${priceDisplay}</div>
          </div>
        `;
        const miniNameEl = box.querySelector(".mini-box-name");
        renderItemNameLines(miniNameEl, cleanItemName, "left");
        applyTextStyleToElement(miniNameEl, item.nameStyle, {
          fontSize: boxSizes.miniBox.fontSize,
          fontWeight: 600,
          color: "#111827"
        });
        const miniPriceEl = box.querySelector(".mini-box-price");
        applyPriceVisualStyle(miniPriceEl, item, boxSizes.miniBox);
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
        const cleanItemName = item.name !== undefined && item.name !== null && String(item.name).length > 0
          ? String(item.name)
          : "Item";
        const priceDisplay = formatItemPriceDisplay(item);
        const box = document.createElement("div");
        box.className = "item-box";
        box.style.cursor = OWNER_EDIT_MODE ? "default" : "pointer";
        box.onclick = () => {
          if (OWNER_EDIT_MODE) return;
          openOrderModal(sIdx, item.id);
        };
        box.innerHTML = `
          ${imgMarkup(item.img, cleanItemName, false)}
          <div class="item-info" style="text-align:left;width:100%;max-width:100%;min-width:0;overflow:hidden;box-sizing:border-box;">
            <div class="item-name" style="text-align:left;"></div>
            <div class="item-price" style="text-align:left;">${priceDisplay}</div>
          </div>
        `;
        const itemNameEl = box.querySelector(".item-name");
        itemNameEl.title = cleanItemName;
        renderItemNameLines(itemNameEl, cleanItemName, "left");
        applyTextStyleToElement(itemNameEl, item.nameStyle, {
          fontSize: boxSizes.productBox.fontSize,
          fontWeight: 600,
          color: "#111827"
        });
        const itemPriceEl = box.querySelector(".item-price");
        applyPriceVisualStyle(itemPriceEl, item, boxSizes.productBox);
        scrollEl.appendChild(box);
      });

      sectionEl.appendChild(scrollEl);
    }

    container.appendChild(sectionEl);
  });

  applyBoxSizeStyles();
}

function openOrderModal(sectionIdx, itemId) {
  const data = getWorkingStoreData();
  const item = data.sections[sectionIdx]?.items.find((i) => i.id === itemId);
  if (!item) return;
  activeOrderItem = item;
  const priceDisplay = formatItemPriceDisplay(item);
  document.getElementById("modalItemTitle").textContent = item.name !== undefined && item.name !== null && String(item.name).length > 0
    ? String(item.name)
    : "Item";
  document.getElementById("modalItemPrice").textContent = `Price: ${priceDisplay}`;

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
  const unitPrice = getNumericItemPrice(activeOrderItem);
  const amount = Number((unitPrice * qty).toFixed(2));
  const cleanItemName = activeOrderItem.name !== undefined && activeOrderItem.name !== null && String(activeOrderItem.name).length > 0
    ? String(activeOrderItem.name)
    : "Item";

  storeData.orders.push({
    customer,
    customerPhone: up.phone || "",
    customerPhoto: up.photo || "",
    itemId: activeOrderItem.id,
    itemName: cleanItemName,
    itemPrice: unitPrice,
    itemPriceText: formatItemPriceDisplay(activeOrderItem),
    itemImg: activeOrderItem.img || "",
    qty,
    amount
  });

  saveData();
  closeOrderModal();
  alert(`Order Placed: ${cleanItemName} (${amount})`);
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
    editBtn.textContent = "Edit";
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
    folder.name = next.length > 0 ? next : "Name";
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
          <div class="row-sub-text">${cleanItem} x ${o.qty}${phoneLine ? ` - ${phoneLine}` : ""}</div>
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
        <button type="button" class="icon-mini-btn danger-tone" title="Remove" onclick="removeCustomFolderEntry(${eIdx})">X</button>
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
  const val = input.value.length > 0 ? input.value : "Item";
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

window.addEventListener("storage", () => {
  applyNoTapHighlightRule();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed) storeData = normalizeStoreData(parsed);
  } catch (err) {}
  renderHeader();
  renderSections();
  applyBoxSizeStyles();
  if (OWNER_EDIT_MODE && !draftStoreData) {
    initDraftStoreData();
  }
  if (OWNER_EDIT_MODE && typeof attachOwnerStoreEditHandlers === "function") {
    attachOwnerStoreEditHandlers();
  }
});

const currentPage = document.body.getAttribute("data-page");
if (currentPage === "store") {
  if (OWNER_EDIT_MODE && !draftStoreData) initDraftStoreData();
  renderHeader();
  renderSections();
  applyBoxSizeStyles();
  if (OWNER_EDIT_MODE && typeof attachOwnerStoreEditHandlers === "function") {
    attachOwnerStoreEditHandlers();
  }
} else if (currentPage === "profile") {
  openRegistrationPopup();
} else if (currentPage === "owner") {
  applyBoxSizeStyles();
  let alreadyVerified = false;
  try {
    if (sessionStorage.getItem("ownerPinVerifiedForNextPage") === "1") {
      alreadyVerified = true;
      sessionStorage.removeItem("ownerPinVerifiedForNextPage");
    }
  } catch (err) {}

  if (alreadyVerified) {
    const pinModal = document.getElementById("pinModal");
    if (pinModal) pinModal.classList.remove("active");
    const panel = document.getElementById("ownerPanel");
    if (panel) panel.classList.add("active");
    if (typeof renderOwnerWorkspace === "function") renderOwnerWorkspace();
  } else {
    const pinModal = document.getElementById("pinModal");
    if (pinModal) pinModal.classList.add("active");
  }
}

(function attachUsersManagePinPopup() {
  const PIN_VALUE = typeof OWNER_PIN !== "undefined" ? OWNER_PIN : "1234";
  const POPUP_ID = "usersManagePinPopupOverlay";
  const INPUT_ID = "usersManagePinPopupInput";
  const ERR_ID = "usersManagePinPopupError";

  let pendingTargetUrl = "";
  let pendingCallback = null;

  function ensurePinPopup() {
    let overlay = document.getElementById(POPUP_ID);
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = POPUP_ID;
    overlay.style.cssText =
      "display:none;position:fixed;inset:0;z-index:99998;background:rgba(15,23,42,0.65);align-items:center;justify-content:center;padding:16px;";

    overlay.innerHTML = `
      <div style="width:100%;max-width:340px;background:#ffffff;border-radius:14px;padding:16px;box-shadow:0 12px 30px rgba(0,0,0,0.35);display:flex;flex-direction:column;gap:12px;">
        <div style="font-size:1rem;font-weight:700;color:#111827;">Enter PIN</div>
        <input id="${INPUT_ID}" type="password" inputmode="numeric" autocomplete="off" placeholder="Enter PIN" style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:1rem;color:#111827;box-sizing:border-box;" />
        <div id="${ERR_ID}" style="min-height:18px;font-size:0.82rem;font-weight:600;color:#dc2626;"></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button type="button" id="usersManagePinCancelBtn" style="padding:8px 14px;border:1px solid #cbd5e1;border-radius:8px;background:#ffffff;color:#334155;font-weight:600;cursor:pointer;">Cancel</button>
          <button type="button" id="usersManagePinSubmitBtn" style="padding:8px 16px;border:none;border-radius:8px;background:#0f766e;color:#ffffff;font-weight:700;cursor:pointer;">Continue</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const inputEl = document.getElementById(INPUT_ID);
    const errEl = document.getElementById(ERR_ID);
    const cancelBtn = document.getElementById("usersManagePinCancelBtn");
    const submitBtn = document.getElementById("usersManagePinSubmitBtn");

    function closePopup() {
      overlay.style.display = "none";
      pendingTargetUrl = "";
      pendingCallback = null;
      if (inputEl) inputEl.value = "";
      if (errEl) errEl.textContent = "";
    }

    function submitPin() {
      const entered = (inputEl && inputEl.value ? inputEl.value : "").trim();
      if (entered === String(PIN_VALUE)) {
        const targetUrl = pendingTargetUrl;
        const cb = pendingCallback;
        try {
          sessionStorage.setItem("ownerPinVerifiedForNextPage", "1");
        } catch (err) {}
        closePopup();
        if (typeof cb === "function") cb();
        if (targetUrl) window.location.href = targetUrl;
      } else if (errEl) {
        errEl.textContent = "Incorrect PIN";
      }
    }

    cancelBtn.addEventListener("click", closePopup);
    submitBtn.addEventListener("click", submitPin);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitPin();
      } else if (e.key === "Escape") {
        closePopup();
      }
    });

    return overlay;
  }

  window.openUsersManagePinPopup = function (targetUrl, onSuccess) {
    pendingTargetUrl = targetUrl || "";
    pendingCallback = typeof onSuccess === "function" ? onSuccess : null;
    const overlay = ensurePinPopup();
    const inputEl = document.getElementById(INPUT_ID);
    const errEl = document.getElementById(ERR_ID);
    if (errEl) errEl.textContent = "";
    if (inputEl) inputEl.value = "";
    overlay.style.display = "flex";
    setTimeout(() => {
      if (inputEl) inputEl.focus();
    }, 30);
  };

  function isManageControl(el) {
    if (!el) return false;
    const text = (el.textContent || "").trim().toLowerCase();
    const aria = (el.getAttribute("aria-label") || "").trim().toLowerCase();
    const title = (el.getAttribute("title") || "").trim().toLowerCase();
    return text === "manage" || aria === "manage" || title === "manage";
  }

  document.addEventListener(
    "click",
    (e) => {
      const trigger = e.target.closest("button, a, span, [role='button'], .manage-btn, .owner-trigger");
      if (!trigger || trigger.closest(`#${POPUP_ID}`)) return;
      if (!isManageControl(trigger)) return;

      const href = trigger.getAttribute("href");
      const onclickAttr = trigger.getAttribute("onclick") || "";
      let nextUrl = href && href !== "#" && !href.startsWith("javascript:") ? href : "";

      if (!nextUrl) {
        const match = onclickAttr.match(/location\.href\s*=\s*['"]([^'"]+)['"]/i);
        if (match && match[1]) nextUrl = match[1];
      }

      if (!nextUrl && onclickAttr.includes("openPinModal")) {
        nextUrl = "owner.html";
      }

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      window.openUsersManagePinPopup(nextUrl, () => {
        if (!nextUrl && onclickAttr) {
          try {
            new Function(onclickAttr).call(trigger);
          } catch (err) {}
        }
      });
    },
    true
  );
})();
