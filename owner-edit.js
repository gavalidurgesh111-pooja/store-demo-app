console.log("OWNER_EDIT_COMPLETE_V8");

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
    data.storeTitle = input.value.trim() || "Store";
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

// ==================== COVER SIZE CROP POP-UP EDITOR (#screenPhotoEditor) ====================
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

  window.addEventListener("wheel", (e) => {
    if (!rawImageObj) return;
    const screen = document.getElementById("screenPhotoEditor");
    if (!screen || screen.style.display === "none") return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setEditorZoomAroundCenter(imgScale * zoomFactor);
  }, { passive: false });

  window.addEventListener("touchstart", (e) => {
    if (!rawImageObj) return;
    const screen = document.getElementById("screenPhotoEditor");
    if (!screen || screen.style.display === "none") return;
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
  });

  window.addEventListener("touchmove", (e) => {
    if (!rawImageObj) return;
    const screen = document.getElementById("screenPhotoEditor");
    if (!screen || screen.style.display === "none") return;
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

  window.addEventListener("touchend", (e) => {
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
  if (preview) preview.src = "";
  if (screen) screen.style.display = "none";
  rawImageObj = null;
  onCoverEditorDone = null;
}

function confirmEditor() {
  const preview = document.getElementById("editorImagePreview");
  const box = document.getElementById("cropFrameBox")?.getBoundingClientRect();
  if (!rawImageObj || !preview || !box) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 520;
  const ctx = canvas.getContext("2d");

  const previewRect = preview.getBoundingClientRect();
  const renderedWidth = previewRect.width || (rawImageObj.width * imgScale);
  const renderedHeight = previewRect.height || (rawImageObj.height * imgScale);

  const sX = ((box.left - previewRect.left) / renderedWidth) * rawImageObj.width;
  const sY = ((box.top - previewRect.top) / renderedHeight) * rawImageObj.height;
  const sW = (box.width / renderedWidth) * rawImageObj.width;
  const sH = (box.height / renderedHeight) * rawImageObj.height;

  ctx.drawImage(rawImageObj, sX, sY, sW, sH, 0, 0, canvas.width, canvas.height);
  const croppedUrl = canvas.toDataURL("image/jpeg", 0.88);

  if (preview) preview.src = "";
  const screen = document.getElementById("screenPhotoEditor");
  if (screen) screen.style.display = "none";
  rawImageObj = null;

  if (onCoverEditorDone) {
    const cb = onCoverEditorDone;
    onCoverEditorDone = null;
    cb(croppedUrl);
  }
}

function openCoverPhotoEditor(file, onDone) {
  if (!file || typeof onDone !== "function") return;
  onCoverEditorDone = onDone;
  ensureCoverEditorDOM();

  const reader = new FileReader();
  reader.onload = function (e) {
    rawImageObj = new Image();
    const screen = document.getElementById("screenPhotoEditor");
    const preview = document.getElementById("editorImagePreview");
    if (screen) screen.style.display = "flex";
    if (!preview) return;

    preview.style.transition = "none";
    preview.src = e.target.result;

    rawImageObj.onload = function () {
      requestAnimationFrame(() => {
        const area = document.getElementById("editorCanvasArea");
        const box = document.getElementById("cropFrameBox");
        if (!area || !box || !rawImageObj) return;

        const areaRect = area.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();

        minScale = Math.max(boxRect.width / rawImageObj.width, boxRect.height / rawImageObj.height);
        maxScale = minScale * 2.5;
        imgScale = minScale;

        const renderW = rawImageObj.width * imgScale;
        const renderH = rawImageObj.height * imgScale;
        preview.style.width = renderW + "px";
        preview.style.height = renderH + "px";

        const centerXRel = (boxRect.left + boxRect.right) / 2 - areaRect.left;
        const centerYRel = (boxRect.top + boxRect.bottom) / 2 - areaRect.top;

        baseLeft = centerXRel - renderW / 2;
        baseTop = centerYRel - renderH / 2;

        preview.style.left = baseLeft + "px";
        preview.style.top = baseTop + "px";
        posX = 0;
        posY = 0;
        preview.style.transform = "translate3d(0px, 0px, 0px)";
      });
    };
    rawImageObj.src = e.target.result;
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
        openStoreNameEditorPopup();
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

if (document.body.getAttribute("data-page") === "store" && OWNER_EDIT_MODE) {
  if (!draftStoreData) initDraftStoreData();
  renderHeader();
  renderSections();
  attachOwnerStoreEditHandlers();
}
