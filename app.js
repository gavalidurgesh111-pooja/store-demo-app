function removeOwnerStoreEditUI() {
  const bar = document.getElementById("ownerLiveSaveBar");
  if (bar) bar.remove();
  const bottomBar = document.getElementById("ownerBottomRowControls");
  if (bottomBar) bottomBar.remove();
  removeCustomPickerIfExists();
  document.querySelectorAll(".owner-inline-edit-btn").forEach((btn) => btn.remove());
}

function removeCustomPickerIfExists() {
  const existing = document.getElementById("ownerCustomColorPickerModal");
  if (existing) existing.remove();
}

function applyStoreThemeColor(hexColor) {
  if (!hexColor) return;
  storeData.themeColor = hexColor;
  document.documentElement.style.setProperty("--primary", hexColor);
  const bar = document.getElementById("ownerLiveSaveBar");
  if (bar) bar.style.background = hexColor;
  const saveBtn = document.getElementById("ownerLiveSaveBtn");
  if (saveBtn) saveBtn.style.color = hexColor;
  saveData();
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
  const initialColor = storeData.themeColor || "#0f766e";
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

  // Top Header: "Colour picker" + Live Color Name + Close
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

  // Body: Left Solid Preview + Right Shade Box
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

  // Bottom Scroll / Drag Hue Slider + Color Name + Apply
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
    applyStoreThemeColor(hex);
  }

  function updateHueFromPointer(clientX) {
    const rect = hueTrackWrap.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
    hue = rect.width ? (x / rect.width) * 360 : 0;
    const hex = syncColorUI();
    applyStoreThemeColor(hex);
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
    applyStoreThemeColor(finalHex);
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
