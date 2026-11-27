console.log("OWNER_EDIT_COMPLETE_V49");

// Balanced professional palette anchored on #FF631C with neutral surfaces and soft idle tints.
const FIXED_EDITOR_COLOR = "#FF631C";
const SOFT_POPUP_BTN_BG = "#FFEDE5";
const SOFT_POPUP_BTN_TEXT = "#9A3412";
const SOFT_POPUP_BTN_BORDER = "#FDBA74";

function getEditorFixedColor() {
  return FIXED_EDITOR_COLOR;
}

function setButtonSoftIdleStyle(btn) {
  if (!btn) return;
  btn.style.background = SOFT_POPUP_BTN_BG;
  btn.style.backgroundColor = SOFT_POPUP_BTN_BG;
  btn.style.color = SOFT_POPUP_BTN_TEXT;
  btn.style.border = `1px solid ${SOFT_POPUP_BTN_BORDER}`;
}

function setButtonActiveAccentStyle(btn, hexColor = getEditorFixedColor()) {
  if (!btn) return;
  const activeHex = hexColor || getEditorFixedColor();
  btn.style.background = activeHex;
  btn.style.backgroundColor = activeHex;
  btn.style.color = "#ffffff";
  btn.style.border = `1px solid ${activeHex}`;
}

function bindSoftToAccentButton(btn, { isSelected = false, onBeforeClick = null, onAfterClick = null } = {}) {
  if (!btn) return;

  const syncVisualState = () => {
    if (isSelected) {
      setButtonActiveAccentStyle(btn);
    } else {
      setButtonSoftIdleStyle(btn);
    }
  };

  syncVisualState();

  btn.addEventListener("pointerdown", () => {
    setButtonActiveAccentStyle(btn);
  });

  const releasePress = () => {
    syncVisualState();
  };

  btn.addEventListener("pointerup", releasePress);
  btn.addEventListener("pointerleave", releasePress);
  btn.addEventListener("pointercancel", releasePress);

  const originalOnClick = btn.onclick;
  btn.onclick = (e) => {
    if (typeof onBeforeClick === "function") onBeforeClick(e);
    setButtonActiveAccentStyle(btn);
    if (typeof originalOnClick === "function") originalOnClick(e);
    if (typeof onAfterClick === "function") onAfterClick(e);
  };

  return {
    setSelected: (val) => {
      isSelected = Boolean(val);
      syncVisualState();
    },
    refresh: syncVisualState
  };
}

function openOwnerStoreEditView() {
  window.location.href = "index.html?ownerEdit=1";
}

function removeCustomPickerIfExists() {
  const existing = document.getElementById("ownerCustomColorPickerModal");
  if (existing) existing.remove();
}

function removeBoxSizePanelIfExists() {
  clearBoxPreviewHighlights();
  const existing = document.getElementById("ownerBoxSizePanelModal");
  if (existing) existing.remove();
}

function removePriceEditorModalIfExists() {
  const existing = document.getElementById("ownerItemPriceEditorModal");
  if (existing) existing.remove();
}

function removeStripHeightModalIfExists() {
  const existing = document.getElementById("ownerStripHeightEditorModal");
  if (existing) existing.remove();
}

function removeCustomAdModalIfExists() {
  const existing = document.getElementById("ownerCustomAdEditorModal");
  if (existing) existing.remove();
}

function removeCoverHeightModalIfExists() {
  const existing = document.getElementById("ownerCoverHeightEditorModal");
  if (existing) existing.remove();
}

function removeCoverManagerModalIfExists() {
  const existing = document.getElementById("ownerCoverManagerModal");
  if (existing) existing.remove();
}

function showBottomSavedPopup(message = "Saved Successfully") {
  const existing = document.getElementById("ownerBottomSavedToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "ownerBottomSavedToast";
  toast.textContent = message;
  toast.style.cssText =
    `position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:99999;background:#ffffff;color:#111827;border:1px solid ${SOFT_POPUP_BTN_BORDER};padding:9px 18px;border-radius:999px;font-size:0.84rem;font-weight:700;box-shadow:0 8px 24px rgba(15,23,42,0.16);pointer-events:none;`;

  document.body.appendChild(toast);
  setTimeout(() => {
    const el = document.getElementById("ownerBottomSavedToast");
    if (el) el.remove();
  }, 1800);
}

function removeOwnerStoreEditUI() {
  const bar = document.getElementById("ownerLiveSaveBar");
  if (bar) bar.remove();
  const bottomBar = document.getElementById("ownerBottomRowControls");
  if (bottomBar) bottomBar.remove();
  const nameModal = document.getElementById("ownerStoreNameModal");
  if (nameModal) nameModal.remove();
  const editorScreen = document.getElementById("screenPhotoEditor");
  if (editorScreen) {
    editorScreen.remove();
    coverEditorEventsBound = false;
  }
  removeCustomPickerIfExists();
  removeBoxSizePanelIfExists();
  removePriceEditorModalIfExists();
  removeStripHeightModalIfExists();
  removeCustomAdModalIfExists();
  removeCoverHeightModalIfExists();
  removeCoverManagerModalIfExists();
  document.querySelectorAll(".owner-inline-edit-btn").forEach((btn) => btn.remove());
}

function syncCoverOnlyEditState() {
  if (typeof renderHeader === "function") {
    renderHeader();
  }
  const coverWrap = document.querySelector(".cover-wrapper");
  if (coverWrap) {
    coverWrap.style.position = "relative";
    coverWrap.style.overflow = "hidden";
    const overlayEl = typeof ensureCoverStoreTitleElements === "function"
      ? ensureCoverStoreTitleElements(coverWrap).overlayEl
      : coverWrap.querySelector(".cover-overlay");
    const titleEl = document.getElementById("storeTitle");
    if (overlayEl && titleEl) {
      overlayEl.style.setProperty("z-index", "22", "important");
      overlayEl.style.setProperty("display", "inline-flex", "important");
      enableStoreNameDragOnCover(coverWrap, overlayEl);
    }
  }
}

function applyDraftThemeColor(hexColor) {
  const data = getWorkingStoreData();
  if (!hexColor) return;
  data.themeColor = hexColor;
  document.documentElement.style.setProperty("--primary", hexColor);
  if (typeof syncStripBarCornerDesign === "function") {
    syncStripBarCornerDesign();
  }
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

function openStandaloneColorPicker(initialColor, onChooseColor, onCancelRestore, options = {}) {
  removeCustomPickerIfExists();
  const previousColor = initialColor || getEditorFixedColor();
  let hue = 0;
  let sat = 0.85;
  let val = 0.85;

  const modal = document.createElement("div");
  modal.id = "ownerCustomColorPickerModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:160;background:rgba(15,23,42,0.55);display:flex;align-items:center;justify-content:center;padding:12px;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:440px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(15,23,42,0.28);";

  const header = document.createElement("div");
  header.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #e2e8f0;gap:10px;";

  const leftHead = document.createElement("div");
  leftHead.style.cssText = "display:flex;align-items:center;gap:10px;flex-wrap:wrap;";

  const title = document.createElement("span");
  title.textContent = "Color Picker";
  title.style.cssText = "font-size:1.05rem;font-weight:700;color:#111827;";

  const colorNameBadge = document.createElement("span");
  colorNameBadge.textContent = "Red";
  colorNameBadge.style.cssText =
    "font-size:0.82rem;font-weight:700;padding:3px 10px;border-radius:999px;background:#f8fafc;border:1px solid #e2e8f0;color:#111827;";

  leftHead.appendChild(title);
  leftHead.appendChild(colorNameBadge);

  const closeModalAndRestore = () => {
    if (typeof onCancelRestore === "function") {
      onCancelRestore(previousColor);
    }
    modal.remove();
  };

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.style.cssText =
    "border:none;background:transparent;font-size:1.05rem;font-weight:700;color:#475569;cursor:pointer;padding:6px 10px;min-width:36px;min-height:36px;";
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
    "position:absolute;width:26px;height:26px;border:3px solid #ffffff;border-radius:50%;box-shadow:0 0 4px rgba(0,0,0,0.65);transform:translate(-50%,-50%);pointer-events:none;left:85%;top:15%;";

  shadeArea.appendChild(satOverlay);
  shadeArea.appendChild(valOverlay);
  shadeArea.appendChild(thumbRing);

  body.appendChild(leftSwatch);
  body.appendChild(shadeArea);

  const sliderWrap = document.createElement("div");
  sliderWrap.style.cssText = "padding:16px;background:#ffffff;";

  const hueTrackWrap = document.createElement("div");
  hueTrackWrap.style.cssText =
    "position:relative;height:16px;border-radius:999px;background:linear-gradient(to right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000);touch-action:none;cursor:pointer;";

  const hueKnob = document.createElement("div");
  hueKnob.style.cssText =
    "position:absolute;top:50%;left:0%;width:26px;height:26px;border-radius:50%;background:#ff0000;border:2px solid #ffffff;box-shadow:0 1px 5px rgba(0,0,0,0.45);transform:translate(-50%,-50%);pointer-events:none;";

  hueTrackWrap.appendChild(hueKnob);

  const footer = document.createElement("div");
  footer.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:14px;flex-wrap:wrap;";

  const selectedNameText = document.createElement("span");
  selectedNameText.style.cssText = "font-size:0.9rem;font-weight:700;color:#111827;";

  const btnGroup = document.createElement("div");
  btnGroup.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cssText =
    "padding:9px 14px;min-height:40px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;color:#334155;font-weight:600;cursor:pointer;";
  cancelBtn.onclick = closeModalAndRestore;

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = options.applyLabel || "Apply";
  applyBtn.style.cssText =
    "padding:9px 16px;min-height:40px;border-radius:8px;font-weight:700;cursor:pointer;";

  let applyAllBtn = null;
  if (typeof options.onApplyAll === "function") {
    applyAllBtn = document.createElement("button");
    applyAllBtn.type = "button";
    applyAllBtn.textContent = options.applyAllLabel || "Apply to All";
    applyAllBtn.style.cssText =
      "padding:9px 14px;min-height:40px;border-radius:8px;font-weight:700;cursor:pointer;";
  }

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
    return chosenHex;
  }

  function updateShadeFromPointer(clientX, clientY) {
    const rect = shadeArea.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width || 1);
    const y = Math.min(Math.max(0, clientY - rect.top), rect.height || 1);
    sat = rect.width ? x / rect.width : 0.85;
    val = rect.height ? 1 - y / rect.height : 0.85;
    const hex = syncColorUI();
    if (typeof onChooseColor === "function") onChooseColor(hex, false);
  }

  function updateHueFromPointer(clientX) {
    const rect = hueTrackWrap.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width || 1);
    hue = rect.width ? (x / rect.width) * 360 : 0;
    const hex = syncColorUI();
    if (typeof onChooseColor === "function") onChooseColor(hex, false);
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
    if (typeof onChooseColor === "function") onChooseColor(finalHex, true);
    modal.remove();
  };

  if (applyAllBtn) {
    applyAllBtn.onclick = () => {
      const finalHex = syncColorUI();
      options.onApplyAll(finalHex);
      modal.remove();
    };
  }

  bindSoftToAccentButton(applyBtn);
  if (applyAllBtn) bindSoftToAccentButton(applyAllBtn);

  sliderWrap.appendChild(hueTrackWrap);
  btnGroup.appendChild(cancelBtn);
  btnGroup.appendChild(applyBtn);
  if (applyAllBtn) btnGroup.appendChild(applyAllBtn);
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

function openCustomColourPickerModal() {
  const data = getWorkingStoreData();
  const previousColor = data.themeColor || getEditorFixedColor();
  openStandaloneColorPicker(
    previousColor,
    (hex, isFinal) => {
      applyDraftThemeColor(hex);
      if (isFinal) attachOwnerStoreEditHandlers();
    },
    (restoreHex) => {
      applyDraftThemeColor(restoreHex);
    }
  );
}

// ==================== KNOB-ONLY SLIDER ====================
function createBlueKnobSlider(min, max, step, initialVal, onValueChange) {
  const minNum = Number(min);
  const maxNum = Number(max);
  const stepNum = Number(step) || 1;
  const knobColor = getEditorFixedColor();
  const knobSize = 26;

  const container = document.createElement("div");
  container.style.cssText =
    `position:relative;width:100%;height:${knobSize + 8}px;display:flex;align-items:center;user-select:none;-webkit-user-select:none;`;

  const trackLine = document.createElement("div");
  trackLine.style.cssText =
    "position:relative;width:100%;height:7px;border-radius:999px;background:#e2e8f0;overflow:hidden;pointer-events:none;";

  const activeFill = document.createElement("div");
  activeFill.style.cssText =
    `position:absolute;left:0;top:0;bottom:0;width:0%;background:${knobColor};border-radius:999px;`;
  trackLine.appendChild(activeFill);

  const knob = document.createElement("button");
  knob.type = "button";
  knob.setAttribute("aria-label", "Adjust slider");
  knob.style.cssText =
    `position:absolute;top:50%;left:0%;width:${knobSize}px;height:${knobSize}px;border-radius:50%;background:${knobColor};border:3px solid #ffffff;box-shadow:0 2px 7px rgba(15,23,42,0.28);transform:translate(-50%,-50%);cursor:grab;touch-action:none;padding:0;z-index:2;`;

  let currentVal = Number(initialVal);

  function snapAndClamp(val) {
    const raw = Number(val);
    if (!Number.isFinite(raw)) return minNum;
    const steps = Math.round((raw - minNum) / stepNum);
    const snapped = minNum + steps * stepNum;
    const clamped = Math.max(minNum, Math.min(maxNum, snapped));
    return stepNum < 1 ? Number(clamped.toFixed(2)) : Math.round(clamped);
  }

  function renderKnobPosition(val) {
    currentVal = snapAndClamp(val);
    const span = maxNum - minNum;
    const pct = span > 0 ? ((currentVal - minNum) / span) * 100 : 0;
    const safePct = Math.max(0, Math.min(100, pct));
    activeFill.style.width = `${safePct}%`;
    knob.style.left = `${safePct}%`;
  }

  let isDraggingKnob = false;

  const updateFromClientX = (clientX) => {
    const rect = container.getBoundingClientRect();
    const usableWidth = Math.max(1, rect.width - knobSize);
    const relX = clientX - rect.left - knobSize / 2;
    const ratio = Math.max(0, Math.min(1, relX / usableWidth));
    const nextVal = snapAndClamp(minNum + ratio * (maxNum - minNum));
    if (nextVal !== currentVal) {
      renderKnobPosition(nextVal);
      if (typeof onValueChange === "function") {
        onValueChange(currentVal);
      }
    }
  };

  knob.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    isDraggingKnob = true;
    knob.style.cursor = "grabbing";
    try {
      knob.setPointerCapture(e.pointerId);
    } catch (err) {}
    updateFromClientX(e.clientX);
    e.preventDefault();
  });

  knob.addEventListener("pointermove", (e) => {
    if (!isDraggingKnob) return;
    e.stopPropagation();
    updateFromClientX(e.clientX);
    e.preventDefault();
  });

  const stopKnobDrag = (e) => {
    if (!isDraggingKnob) return;
    isDraggingKnob = false;
    knob.style.cursor = "grab";
    if (e && typeof e.pointerId === "number") {
      try {
        knob.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  knob.addEventListener("pointerup", stopKnobDrag);
  knob.addEventListener("pointercancel", stopKnobDrag);

  container.appendChild(trackLine);
  container.appendChild(knob);
  renderKnobPosition(initialVal);

  return {
    element: container,
    setValue: (v) => renderKnobPosition(v),
    getValue: () => currentVal
  };
}

function makeLabeledSlider(labelText, min, max, step, initialVal, unitSuffix, accentHex, onChange) {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:flex;flex-direction:column;gap:6px;";

  const top = document.createElement("div");
  top.style.cssText = "display:flex;justify-content:space-between;align-items:center;";

  const lbl = document.createElement("span");
  lbl.textContent = labelText;
  lbl.style.cssText = "font-size:0.84rem;font-weight:700;color:#334155;";

  const valBadge = document.createElement("span");
  valBadge.textContent = `${initialVal}${unitSuffix}`;
  valBadge.style.cssText = `font-size:0.84rem;font-weight:700;color:${SOFT_POPUP_BTN_TEXT};`;

  const knobSlider = createBlueKnobSlider(min, max, step, initialVal, (num) => {
    valBadge.textContent = `${num}${unitSuffix}`;
    onChange(num);
  });

  top.appendChild(lbl);
  top.appendChild(valBadge);
  wrap.appendChild(top);
  wrap.appendChild(knobSlider.element);

  wrap.setSliderValue = (num) => {
    knobSlider.setValue(num);
    valBadge.textContent = `${knobSlider.getValue()}${unitSuffix}`;
  };

  return wrap;
}

// ==================== UNIFIED COVER MANAGER PANEL ====================
const INITIAL_OWNER_COVER_HEIGHT = (() => {
  const wrap = document.querySelector(".cover-wrapper");
  const measured = wrap ? Math.round(wrap.getBoundingClientRect().height) : 0;
  return measured >= 110 && measured <= 380 ? measured : 170;
})();

function openCoverManagerModal() {
  removeCoverManagerModalIfExists();
  const data = getWorkingStoreData();
  const coverWrap = document.querySelector(".cover-wrapper");
  const fileInput = ensureOwnerInlineFileInput();
  const accentHex = getEditorFixedColor();

  const ownerDefaultCoverH = INITIAL_OWNER_COVER_HEIGHT;
  const savedCoverHeight = data.coverHeight ?? null;
  let draftH = Number.isFinite(Number(savedCoverHeight)) && Number(savedCoverHeight) > 0
    ? clampNum(savedCoverHeight, 110, 380, ownerDefaultCoverH)
    : ownerDefaultCoverH;

  const setVisualCoverHeight = (hVal) => {
    if (!coverWrap) return;
    const ch = clampNum(hVal, 110, 380, ownerDefaultCoverH);
    coverWrap.style.setProperty("height", `${ch}px`, "important");
    coverWrap.style.setProperty("min-height", `${ch}px`, "important");
    coverWrap.style.setProperty("max-height", `${ch}px`, "important");
    if (typeof applyTitlePositionStyle === "function") {
      applyTitlePositionStyle();
    }
  };

  const modal = document.createElement("div");
  modal.id = "ownerCoverManagerModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:145;background:transparent;display:flex;align-items:flex-end;justify-content:center;padding:0;pointer-events:none;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:480px;max-height:52vh;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:#ffffff;border-top:2px solid #e2e8f0;border-radius:16px 16px 0 0;padding:12px 16px 18px;box-shadow:0 -10px 28px rgba(15,23,42,0.18);display:flex;flex-direction:column;gap:12px;color:#111827;pointer-events:auto;";

  const header = document.createElement("div");
  header.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;border-bottom:1px solid #e2e8f0;";

  const title = document.createElement("span");
  title.textContent = "Cover Settings";
  title.style.cssText = "font-size:0.96rem;font-weight:800;color:#111827;";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.style.cssText =
    "border:none;background:#f8fafc;border-radius:8px;min-width:32px;min-height:32px;font-weight:700;color:#334155;cursor:pointer;";
  closeBtn.onclick = () => {
    data.coverHeight = savedCoverHeight;
    setVisualCoverHeight(savedCoverHeight ?? ownerDefaultCoverH);
    modal.remove();
  };

  header.appendChild(title);
  header.appendChild(closeBtn);

  const hSlider = makeLabeledSlider("Cover Height", 110, 380, 2, draftH, "px", accentHex, (val) => {
    draftH = val;
    setVisualCoverHeight(val);
  });

  const slidesBox = document.createElement("div");
  slidesBox.style.cssText =
    "border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;";

  const slidesTop = document.createElement("div");
  slidesTop.style.cssText = "display:flex;justify-content:space-between;align-items:center;";

  const slidesLbl = document.createElement("span");
  slidesLbl.textContent = "Cover Slides";
  slidesLbl.style.cssText = "font-size:0.84rem;font-weight:800;color:#111827;";

  const addSlideBtn = document.createElement("button");
  addSlideBtn.type = "button";
  addSlideBtn.textContent = "+ Add Slide";
  addSlideBtn.style.cssText =
    "padding:5px 10px;border-radius:8px;font-size:0.76rem;font-weight:700;cursor:pointer;";
  addSlideBtn.onclick = () => {
    addCoverInEditMode();
    openCoverManagerModal();
  };
  bindSoftToAccentButton(addSlideBtn);

  slidesTop.appendChild(slidesLbl);
  slidesTop.appendChild(addSlideBtn);
  slidesBox.appendChild(slidesTop);

  const slots = Array.isArray(data.coverSlots) && data.coverSlots.length > 0 ? data.coverSlots : [""];
  slots.forEach((src, idx) => {
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;";

    const sName = document.createElement("span");
    sName.textContent = src ? `Slide ${idx + 1} (Photo Set)` : `Slide ${idx + 1} (Empty)`;
    sName.style.cssText = "font-size:0.8rem;font-weight:700;color:#334155;";

    const rowBtns = document.createElement("div");
    rowBtns.style.cssText = "display:flex;gap:6px;";

    const uploadBtn = document.createElement("button");
    uploadBtn.type = "button";
    uploadBtn.textContent = "Upload Photo";
    uploadBtn.style.cssText =
      "padding:4px 9px;border-radius:6px;font-size:0.74rem;font-weight:700;cursor:pointer;";
    uploadBtn.onclick = () => {
      pendingOwnerEditSlot = { type: "cover", slotIdx: idx, reopenCoverModal: true };
      fileInput.value = "";
      fileInput.click();
    };
    bindSoftToAccentButton(uploadBtn);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Remove";
    delBtn.style.cssText =
      "padding:4px 8px;border:1px solid #fecaca;border-radius:6px;background:#fff5f5;color:#b91c1c;font-size:0.74rem;font-weight:700;cursor:pointer;";
    delBtn.onclick = () => {
      removeCoverSlotAt(idx);
      openCoverManagerModal();
    };

    rowBtns.appendChild(uploadBtn);
    rowBtns.appendChild(delBtn);
    row.appendChild(sName);
    row.appendChild(rowBtns);
    slidesBox.appendChild(row);
  });

  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;gap:8px;margin-top:2px;";

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.textContent = "Reset Height";
  resetBtn.style.cssText =
    "min-height:38px;padding:7px 12px;border-radius:8px;font-size:0.82rem;font-weight:700;cursor:pointer;";
  resetBtn.onclick = () => {
    draftH = ownerDefaultCoverH;
    data.coverHeight = null;
    if (typeof hSlider.setSliderValue === "function") {
      hSlider.setSliderValue(ownerDefaultCoverH);
    }
    setVisualCoverHeight(ownerDefaultCoverH);
  };
  bindSoftToAccentButton(resetBtn);

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.style.cssText =
    "flex:1;min-height:38px;padding:7px 14px;border-radius:8px;font-size:0.84rem;font-weight:700;cursor:pointer;";
  applyBtn.onclick = () => {
    data.coverHeight = draftH;
    setVisualCoverHeight(draftH);
    modal.remove();
  };
  bindSoftToAccentButton(applyBtn);

  footer.appendChild(resetBtn);
  footer.appendChild(applyBtn);

  card.appendChild(header);
  card.appendChild(hSlider);
  card.appendChild(slidesBox);
  card.appendChild(footer);
  modal.appendChild(card);
  document.body.appendChild(modal);
}

// ==================== STRIP STYLE POP-UP (BOTTOM SHEET + SCROLLABLE) ====================
function openStripHeightEditorModal(sIdx, stripEl) {
  removeStripHeightModalIfExists();
  const data = getWorkingStoreData();
  const sec = data.sections && data.sections[sIdx];
  if (!sec) return;

  const accentHex = getEditorFixedColor();
  const prevBarHeight = Number.isFinite(Number(sec.barHeight)) && Number(sec.barHeight) > 0
    ? Number(sec.barHeight)
    : 36;
  const prevShape = sec.barShape || "default";
  const prevTopCol = sec.barGradTop || "";
  const prevBotCol = sec.barGradBottom || "";
  const prevSingleCol = sec.barBgColor || "";
  const prevSpacing = sec.barSpacing ? { ...sec.barSpacing } : null;

  let draftHeight = prevBarHeight;
  let draftShape = prevShape;
  let draftSingleCol = prevSingleCol || "#f1f5f9";
  let draftTopCol = prevTopCol || prevSingleCol || "#0f766e";
  let draftBotCol = prevBotCol || "#1d4ed8";
  let useTwoColors = Boolean(prevTopCol && prevBotCol);
  const spObj = {
    top: prevSpacing && Number.isFinite(Number(prevSpacing.top)) ? Number(prevSpacing.top) : 6,
    bottom: prevSpacing && Number.isFinite(Number(prevSpacing.bottom)) ? Number(prevSpacing.bottom) : 6,
    left: prevSpacing && Number.isFinite(Number(prevSpacing.left)) ? Number(prevSpacing.left) : 12,
    right: prevSpacing && Number.isFinite(Number(prevSpacing.right)) ? Number(prevSpacing.right) : 12
  };

  const modal = document.createElement("div");
  modal.id = "ownerStripHeightEditorModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:145;background:transparent;display:flex;align-items:flex-end;justify-content:center;padding:0;pointer-events:none;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:480px;height:48vh;max-height:50vh;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:#ffffff;border-top:2px solid #e2e8f0;border-radius:16px 16px 0 0;padding:10px 14px 18px;box-shadow:0 -10px 28px rgba(15,23,42,0.18);display:flex;flex-direction:column;gap:10px;color:#111827;pointer-events:auto;";

  const header = document.createElement("div");
  header.style.cssText =
    "position:sticky;top:-10px;z-index:5;background:#ffffff;display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px;border-bottom:1px solid #e2e8f0;";

  const title = document.createElement("span");
  title.textContent = `Row ${sIdx + 1} Strip Settings`;
  title.style.cssText = "font-size:0.96rem;font-weight:800;color:#111827;";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.style.cssText =
    "border:none;background:#f8fafc;border-radius:8px;min-width:32px;min-height:32px;font-weight:700;color:#334155;cursor:pointer;";

  const syncLiveStrip = () => {
    sec.barHeight = draftHeight;
    sec.barShape = draftShape;
    sec.barSpacing = { ...spObj };
    sec.barBgColor = draftSingleCol;
    if (useTwoColors) {
      sec.barGradTop = draftTopCol;
      sec.barGradBottom = draftBotCol;
    } else {
      sec.barGradTop = "";
      sec.barGradBottom = "";
    }
    if (stripEl && typeof applyStripBarStyle === "function") {
      applyStripBarStyle(stripEl, sec);
    }
  };

  closeBtn.onclick = () => {
    sec.barHeight = prevBarHeight;
    sec.barShape = prevShape;
    sec.barBgColor = prevSingleCol;
    sec.barGradTop = prevTopCol;
    sec.barGradBottom = prevBotCol;
    sec.barSpacing = prevSpacing;
    if (stripEl && typeof applyStripBarStyle === "function") {
      applyStripBarStyle(stripEl, sec);
    }
    modal.remove();
  };

  header.appendChild(title);
  header.appendChild(closeBtn);

  const singleColRow = document.createElement("div");
  singleColRow.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;";

  const singleColLbl = document.createElement("span");
  singleColLbl.textContent = "Strip Color";
  singleColLbl.style.cssText = "font-size:0.82rem;font-weight:700;color:#334155;";

  const singleColBtn = document.createElement("button");
  singleColBtn.type = "button";
  singleColBtn.textContent = "Pick Color";
  singleColBtn.style.cssText =
    "min-height:32px;padding:4px 10px;border-radius:8px;font-size:0.76rem;font-weight:700;cursor:pointer;";
  singleColBtn.onclick = () => {
    openStandaloneColorPicker(draftSingleCol, (hex) => {
      draftSingleCol = hex;
      useTwoColors = false;
      twoColChk.checked = false;
      syncLiveStrip();
    });
  };
  bindSoftToAccentButton(singleColBtn);

  singleColRow.appendChild(singleColLbl);
  singleColRow.appendChild(singleColBtn);

  const heightSlider = makeLabeledSlider("Strip Height", 24, 76, 1, draftHeight, "px", accentHex, (val) => {
    draftHeight = val;
    syncLiveStrip();
  });

  const sTop = makeLabeledSlider("Top Space", 0, 28, 1, spObj.top, "px", accentHex, (val) => {
    spObj.top = val;
    syncLiveStrip();
  });
  const sBot = makeLabeledSlider("Bottom Space", 0, 28, 1, spObj.bottom, "px", accentHex, (val) => {
    spObj.bottom = val;
    syncLiveStrip();
  });
  const sLeft = makeLabeledSlider("Left Space", 0, 32, 1, spObj.left, "px", accentHex, (val) => {
    spObj.left = val;
    syncLiveStrip();
  });
  const sRight = makeLabeledSlider("Right Space", 0, 32, 1, spObj.right, "px", accentHex, (val) => {
    spObj.right = val;
    syncLiveStrip();
  });

  const shapeLabel = document.createElement("span");
  shapeLabel.textContent = "Strip Edge Shape";
  shapeLabel.style.cssText = "font-size:0.82rem;font-weight:700;color:#334155;";

  const shapeGrid = document.createElement("div");
  shapeGrid.style.cssText = "display:grid;grid-template-columns:repeat(2,1fr);gap:6px;";

  const shapes = [
    { id: "default", label: "Default" },
    { id: "square", label: "[ Square ]" },
    { id: "round", label: "( Round )" },
    { id: "triangle", label: "< Triangle >" }
  ];

  const shapeControllers = [];
  const shapeBtns = shapes.map((sh) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = sh.label;
    b.style.cssText = "min-height:34px;padding:5px 8px;border-radius:8px;font-size:0.78rem;font-weight:800;cursor:pointer;";
    const ctrl = bindSoftToAccentButton(b, { isSelected: sh.id === draftShape });
    shapeControllers.push(ctrl);
    b.onclick = () => {
      draftShape = sh.id;
      shapeControllers.forEach((c, idx) => c.setSelected(shapes[idx].id === draftShape));
      syncLiveStrip();
    };
    shapeGrid.appendChild(b);
    return b;
  });

  const twoColBox = document.createElement("div");
  twoColBox.style.cssText =
    "border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:8px 10px;display:flex;flex-direction:column;gap:8px;";

  const twoColHead = document.createElement("label");
  twoColHead.style.cssText =
    "display:flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:700;color:#111827;cursor:pointer;";

  const twoColChk = document.createElement("input");
  twoColChk.type = "checkbox";
  twoColChk.checked = useTwoColors;
  twoColChk.style.cssText = "width:18px;height:18px;cursor:pointer;";
  twoColChk.onchange = () => {
    useTwoColors = twoColChk.checked;
    syncLiveStrip();
  };

  const twoColTxt = document.createElement("span");
  twoColTxt.textContent = "Two-Color Gradient (Top + Bottom)";

  twoColHead.appendChild(twoColChk);
  twoColHead.appendChild(twoColTxt);

  const pickersRow = document.createElement("div");
  pickersRow.style.cssText = "display:flex;gap:8px;";

  const topColBtn = document.createElement("button");
  topColBtn.type = "button";
  topColBtn.textContent = "Top Color";
  topColBtn.style.cssText =
    "flex:1;min-height:34px;padding:4px 8px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;";
  topColBtn.onclick = () => {
    openStandaloneColorPicker(draftTopCol, (hex) => {
      draftTopCol = hex;
      useTwoColors = true;
      twoColChk.checked = true;
      syncLiveStrip();
    });
  };
  bindSoftToAccentButton(topColBtn);

  const botColBtn = document.createElement("button");
  botColBtn.type = "button";
  botColBtn.textContent = "Bottom Color";
  botColBtn.style.cssText =
    "flex:1;min-height:34px;padding:4px 8px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;";
  botColBtn.onclick = () => {
    openStandaloneColorPicker(draftBotCol, (hex) => {
      draftBotCol = hex;
      useTwoColors = true;
      twoColChk.checked = true;
      syncLiveStrip();
    });
  };
  bindSoftToAccentButton(botColBtn);

  pickersRow.appendChild(topColBtn);
  pickersRow.appendChild(botColBtn);
  twoColBox.appendChild(twoColHead);
  twoColBox.appendChild(pickersRow);

  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cssText =
    "flex:1;min-height:38px;padding:7px 10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;color:#334155;font-weight:700;cursor:pointer;";
  cancelBtn.onclick = closeBtn.onclick;

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.style.cssText =
    "flex:1;min-height:38px;padding:7px 12px;border-radius:10px;font-weight:700;cursor:pointer;";
  applyBtn.onclick = () => {
    syncLiveStrip();
    modal.remove();
    renderSections();
    attachOwnerStoreEditHandlers();
  };
  bindSoftToAccentButton(applyBtn);

  const applyAllBtn = document.createElement("button");
  applyAllBtn.type = "button";
  applyAllBtn.textContent = "Apply to All";
  applyAllBtn.style.cssText =
    "flex:1;min-height:38px;padding:7px 12px;border-radius:10px;font-weight:700;cursor:pointer;";
  applyAllBtn.onclick = () => {
    syncLiveStrip();
    (data.sections || []).forEach((s) => {
      s.barHeight = draftHeight;
      s.barShape = draftShape;
      s.barBgColor = draftSingleCol;
      s.barSpacing = { ...spObj };
      s.barGradTop = useTwoColors ? draftTopCol : "";
      s.barGradBottom = useTwoColors ? draftBotCol : "";
    });
    modal.remove();
    renderSections();
    attachOwnerStoreEditHandlers();
  };
  bindSoftToAccentButton(applyAllBtn);

  footer.appendChild(cancelBtn);
  footer.appendChild(applyBtn);
  footer.appendChild(applyAllBtn);

  card.appendChild(header);
  card.appendChild(singleColRow);
  card.appendChild(heightSlider);
  card.appendChild(sTop);
  card.appendChild(sBot);
  card.appendChild(sLeft);
  card.appendChild(sRight);
  card.appendChild(shapeLabel);
  card.appendChild(shapeGrid);
  card.appendChild(twoColBox);
  card.appendChild(footer);
  modal.appendChild(card);
  document.body.appendChild(modal);
}

// ==================== CUSTOM AD POP-UP ====================
function openCustomAdEditorModal(sIdx) {
  removeCustomAdModalIfExists();
  const data = getWorkingStoreData();
  const sec = data.sections && data.sections[sIdx];
  if (!sec) return;

  const existingAd = sec.customAd && typeof sec.customAd === "object" ? sec.customAd : {};

  let draftWidth = existingAd.width || "100%";
  let draftHeight = existingAd.height || "70px";
  let draftMoveMode = existingAd.moveMode || "static";

  const modal = document.createElement("div");
  modal.id = "ownerCustomAdEditorModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:150;background:rgba(15,23,42,0.55);display:flex;align-items:center;justify-content:center;padding:12px;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:400px;background:#ffffff;border-radius:14px;padding:14px 16px;box-shadow:0 12px 30px rgba(15,23,42,0.28);display:flex;flex-direction:column;gap:10px;color:#111827;";

  const header = document.createElement("div");
  header.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;border-bottom:1px solid #e2e8f0;";

  const title = document.createElement("span");
  title.textContent = `Row ${sIdx + 1} Ad Banner`;
  title.style.cssText = "font-size:0.96rem;font-weight:800;color:#111827;";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.style.cssText =
    "border:none;background:#f8fafc;border-radius:8px;min-width:32px;min-height:32px;font-weight:700;color:#334155;cursor:pointer;";
  closeBtn.onclick = () => modal.remove();

  header.appendChild(title);
  header.appendChild(closeBtn);

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.value = existingAd.label || "";
  labelInput.placeholder = "Ad Title (optional)";
  labelInput.style.cssText =
    "width:100%;min-height:36px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.88rem;color:#111827;box-sizing:border-box;";

  const codeInput = document.createElement("textarea");
  codeInput.rows = 4;
  codeInput.value = existingAd.code || "";
  codeInput.placeholder = "Paste Google Ad / HTML / Script or Image URL";
  codeInput.style.cssText =
    "width:100%;min-height:80px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.84rem;color:#111827;box-sizing:border-box;font-family:monospace;";

  const dimRow = document.createElement("div");
  dimRow.style.cssText = "display:flex;gap:8px;";

  const widthInput = document.createElement("input");
  widthInput.type = "text";
  widthInput.value = draftWidth;
  widthInput.placeholder = "Width (e.g. 100% or 300px)";
  widthInput.style.cssText =
    "flex:1;min-height:36px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.84rem;color:#111827;box-sizing:border-box;";

  const heightInput = document.createElement("input");
  heightInput.type = "text";
  heightInput.value = draftHeight;
  heightInput.placeholder = "Height (e.g. 70px or 180px)";
  heightInput.style.cssText =
    "flex:1;min-height:36px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.84rem;color:#111827;box-sizing:border-box;";

  dimRow.appendChild(widthInput);
  dimRow.appendChild(heightInput);

  const moveRow = document.createElement("div");
  moveRow.style.cssText = "display:flex;gap:6px;flex-wrap:wrap;";

  const modes = [
    { id: "static", label: "Fixed" },
    { id: "marquee", label: "Sliding" },
    { id: "float", label: "Floating" }
  ];

  const modeControllers = [];
  const modeBtns = modes.map((m) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = m.label;
    b.style.cssText = "flex:1;min-height:34px;padding:5px 8px;border-radius:8px;font-size:0.78rem;font-weight:800;cursor:pointer;";
    const ctrl = bindSoftToAccentButton(b, { isSelected: m.id === draftMoveMode });
    modeControllers.push(ctrl);
    b.onclick = () => {
      draftMoveMode = m.id;
      modeControllers.forEach((c, idx) => c.setSelected(modes[idx].id === draftMoveMode));
    };
    moveRow.appendChild(b);
    return b;
  });

  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;";

  const clearAdBtn = document.createElement("button");
  clearAdBtn.type = "button";
  clearAdBtn.textContent = "Remove Ad";
  clearAdBtn.style.cssText =
    "min-height:38px;padding:7px 10px;border:1px solid #fecaca;border-radius:8px;background:#fff5f5;color:#b91c1c;font-size:0.82rem;font-weight:700;cursor:pointer;";
  clearAdBtn.onclick = () => {
    sec.customAd = null;
    modal.remove();
    renderSections();
    attachOwnerStoreEditHandlers();
  };

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply Ad";
  applyBtn.style.cssText =
    "flex:1;min-height:38px;padding:7px 12px;border-radius:8px;font-size:0.84rem;font-weight:700;cursor:pointer;";
  applyBtn.onclick = () => {
    const cleanCode = codeInput.value.trim();
    const cleanLbl = labelInput.value.trim();
    if (!cleanCode && !cleanLbl) {
      sec.customAd = null;
    } else {
      sec.barHidden = true;
      sec.customAd = {
        label: cleanLbl || "Ad",
        code: cleanCode,
        width: (widthInput.value || "").trim() || "100%",
        height: (heightInput.value || "").trim() || "70px",
        moveMode: draftMoveMode
      };
    }
    modal.remove();
    renderSections();
    attachOwnerStoreEditHandlers();
  };
  bindSoftToAccentButton(applyBtn);

  footer.appendChild(clearAdBtn);
  footer.appendChild(applyBtn);

  card.appendChild(header);
  card.appendChild(labelInput);
  card.appendChild(codeInput);
  card.appendChild(dimRow);
  card.appendChild(moveRow);
  card.appendChild(footer);
  modal.appendChild(card);
  document.body.appendChild(modal);
}

// ==================== BOX SIZE & STYLE PANEL ====================
const FALLBACK_BOX_SIZES = {
  miniBox: { width: 92, height: 122, imgHeight: 74, fontSize: 12, bgColor: "#ffffff", priceFontSize: 11, priceColor: "#111827", textBgTransparent: false },
  productBox: { width: 150, height: 215, imgHeight: 125, fontSize: 14, bgColor: "#ffffff", priceFontSize: 13, priceColor: "#111827", textBgTransparent: false }
};

function getCurrentBoxSizesForEdit(targetRowIdx = null) {
  const data = getWorkingStoreData();
  if (typeof targetRowIdx === "number" && data.sections && data.sections[targetRowIdx]) {
    const eff = typeof getEffectiveBoxSizesForSection === "function"
      ? getEffectiveBoxSizesForSection(data, targetRowIdx)
      : normalizeBoxSizes(data.boxSizes);
    return {
      miniBox: { ...eff.miniBox },
      productBox: { ...eff.productBox }
    };
  }
  if (typeof normalizeBoxSizes === "function") {
    data.boxSizes = normalizeBoxSizes(data.boxSizes);
    return data.boxSizes;
  }
  if (!data.boxSizes || typeof data.boxSizes !== "object") {
    data.boxSizes = JSON.parse(JSON.stringify(FALLBACK_BOX_SIZES));
  }
  data.boxSizes.miniBox = { ...FALLBACK_BOX_SIZES.miniBox, ...(data.boxSizes.miniBox || {}) };
  data.boxSizes.productBox = { ...FALLBACK_BOX_SIZES.productBox, ...(data.boxSizes.productBox || {}) };
  return data.boxSizes;
}

function highlightBoxPreview(selector, widthPx, heightPx, accentHex, rowIdx = null) {
  const rootScope = typeof rowIdx === "number"
    ? document.querySelector(`#sectionsContainer .row-section[data-section-index="${rowIdx}"]`) || document
    : document;
  rootScope.querySelectorAll(selector).forEach((box) => {
    box.style.outline = `2px dashed ${accentHex}`;
    box.style.outlineOffset = "2px";
    box.dataset.previewSize = `${widthPx}x${heightPx}px`;
  });
}

function clearBoxPreviewHighlights() {
  document.querySelectorAll(".mini-box, .item-box").forEach((box) => {
    box.style.outline = "";
    box.style.outlineOffset = "";
    delete box.dataset.previewSize;
  });
}

function applyBoxSizePanelToDom(sizes, targetRowIdx = null) {
  const data = getWorkingStoreData();
  if (typeof targetRowIdx === "number" && data.sections && data.sections[targetRowIdx]) {
    data.sections[targetRowIdx].customBoxSizes = {
      miniBox: { ...sizes.miniBox },
      productBox: { ...sizes.productBox }
    };
  } else {
    data.boxSizes = {
      miniBox: { ...sizes.miniBox },
      productBox: { ...sizes.productBox }
    };
    if (Array.isArray(data.sections)) {
      data.sections.forEach((s) => {
        if (s && s.customBoxSizes) {
          s.customBoxSizes.miniBox.textBgTransparent = Boolean(sizes.miniBox.textBgTransparent);
          s.customBoxSizes.productBox.textBgTransparent = Boolean(sizes.productBox.textBgTransparent);
        }
      });
    }
  }
  if (typeof window.applyBoxSizeStyles === "function") {
    window.applyBoxSizeStyles();
  }
}

function openBoxSizePanelModal(targetRowIdx = null) {
  removeBoxSizePanelIfExists();

  const data = getWorkingStoreData();
  const accentHex = getEditorFixedColor();
  const hasRowTarget = typeof targetRowIdx === "number" && data.sections && data.sections[targetRowIdx];
  const sizes = getCurrentBoxSizesForEdit(hasRowTarget ? targetRowIdx : null);
  const snapshotRowSizes = hasRowTarget && data.sections[targetRowIdx].customBoxSizes
    ? JSON.parse(JSON.stringify(data.sections[targetRowIdx].customBoxSizes))
    : null;
  const snapshotGlobalSizes = JSON.parse(JSON.stringify(data.boxSizes));

  const allNoBgSaved = Boolean(sizes.miniBox.textBgTransparent && sizes.productBox.textBgTransparent);
  const allNormalBgSaved = Boolean(!sizes.miniBox.textBgTransparent && !sizes.productBox.textBgTransparent);
  let selectedBulkMode = allNoBgSaved ? "noBg" : (allNormalBgSaved ? "normalBg" : null);

  const modal = document.createElement("div");
  modal.id = "ownerBoxSizePanelModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:135;background:transparent;display:flex;align-items:flex-end;justify-content:center;padding:0;pointer-events:none;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:480px;height:46vh;max-height:48vh;background:#ffffff;border-top:2px solid #e2e8f0;border-radius:16px 16px 0 0;padding:10px 14px 18px;box-shadow:0 -10px 28px rgba(15,23,42,0.18);display:flex;flex-direction:column;gap:10px;color:#111827;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;pointer-events:auto;";

  const header = document.createElement("div");
  header.style.cssText =
    "position:sticky;top:-10px;z-index:5;background:#ffffff;display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px;border-bottom:1px solid #e2e8f0;";

  const titleWrap = document.createElement("div");
  titleWrap.style.cssText = "display:flex;align-items:center;gap:8px;";

  const dragHandle = document.createElement("span");
  dragHandle.style.cssText =
    "display:inline-block;width:28px;height:4px;border-radius:999px;background:#cbd5e1;";

  const title = document.createElement("span");
  title.textContent = hasRowTarget ? `Row ${targetRowIdx + 1} Box Settings` : "All Boxes Settings";
  title.style.cssText = "font-size:0.94rem;font-weight:800;color:#111827;";

  titleWrap.appendChild(dragHandle);
  titleWrap.appendChild(title);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "X";
  closeBtn.style.cssText =
    "border:none;background:#f8fafc;border-radius:8px;min-width:32px;min-height:32px;font-size:0.95rem;font-weight:700;color:#334155;cursor:pointer;";

  const restoreSnapshot = () => {
    clearBoxPreviewHighlights();
    data.boxSizes = JSON.parse(JSON.stringify(snapshotGlobalSizes));
    if (hasRowTarget) {
      data.sections[targetRowIdx].customBoxSizes = snapshotRowSizes ? JSON.parse(JSON.stringify(snapshotRowSizes)) : null;
    }
    if (typeof window.applyBoxSizeStyles === "function") {
      window.applyBoxSizeStyles();
    }
    modal.remove();
  };

  closeBtn.onclick = restoreSnapshot;
  header.appendChild(titleWrap);
  header.appendChild(closeBtn);

  const quickBulkRow = document.createElement("div");
  quickBulkRow.style.cssText = "display:flex;gap:8px;flex-shrink:0;";

  const quickNoBgAllBtn = document.createElement("button");
  quickNoBgAllBtn.type = "button";
  quickNoBgAllBtn.textContent = "No BG All Boxes";
  quickNoBgAllBtn.style.cssText = "flex:1;min-height:36px;padding:6px 10px;border-radius:9px;font-size:0.78rem;font-weight:800;cursor:pointer;";
  const noBgBulkCtrl = bindSoftToAccentButton(quickNoBgAllBtn, { isSelected: selectedBulkMode === "noBg" });

  const quickNormalBgAllBtn = document.createElement("button");
  quickNormalBgAllBtn.type = "button";
  quickNormalBgAllBtn.textContent = "Normal BG All Boxes";
  quickNormalBgAllBtn.style.cssText = "flex:1;min-height:36px;padding:6px 10px;border-radius:9px;font-size:0.78rem;font-weight:800;cursor:pointer;";
  const normalBgBulkCtrl = bindSoftToAccentButton(quickNormalBgAllBtn, { isSelected: selectedBulkMode === "normalBg" });

  const syncBulkButtonsState = () => {
    noBgBulkCtrl.setSelected(selectedBulkMode === "noBg");
    normalBgBulkCtrl.setSelected(selectedBulkMode === "normalBg");
  };

  quickBulkRow.appendChild(quickNoBgAllBtn);
  quickBulkRow.appendChild(quickNormalBgAllBtn);

  function buildBoxSection(sectionLabel, targetObj, selector, limits) {
    const secWrap = document.createElement("div");
    secWrap.style.cssText =
      "border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;flex-shrink:0;";

    const secHead = document.createElement("div");
    secHead.style.cssText = "display:flex;justify-content:space-between;align-items:center;";

    const secTitle = document.createElement("span");
    secTitle.textContent = sectionLabel;
    secTitle.style.cssText = `font-size:0.86rem;font-weight:800;color:${SOFT_POPUP_BTN_TEXT};`;

    const badge = document.createElement("span");
    badge.style.cssText = "font-size:0.74rem;font-weight:700;color:#475569;";

    const updateBadge = () => {
      badge.textContent = `${targetObj.width}x${targetObj.height}px | Price ${targetObj.priceFontSize}px`;
    };
    updateBadge();

    secHead.appendChild(secTitle);
    secHead.appendChild(badge);
    secWrap.appendChild(secHead);

    const rows = [];

    const addControlRow = (labelTxt, propKey, minV, maxV, stepV) => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;flex-direction:column;gap:3px;";

      const topLine = document.createElement("div");
      topLine.style.cssText = "display:flex;justify-content:space-between;align-items:center;";

      const lbl = document.createElement("span");
      lbl.textContent = labelTxt;
      lbl.style.cssText = "font-size:0.78rem;font-weight:700;color:#334155;";

      const numInput = document.createElement("input");
      numInput.type = "number";
      numInput.min = String(minV);
      numInput.max = String(maxV);
      numInput.step = String(stepV);
      numInput.value = String(targetObj[propKey]);
      numInput.style.cssText =
        "width:64px;padding:3px 6px;border:1px solid #cbd5e1;border-radius:7px;font-size:0.8rem;font-weight:700;color:#111827;text-align:right;background:#ffffff;";

      const applyValue = (rawVal) => {
        const parsed = Number(rawVal);
        if (!Number.isFinite(parsed)) return;
        const clamped = Math.max(minV, Math.min(maxV, Math.round(parsed)));
        targetObj[propKey] = clamped;
        knobSlider.setValue(clamped);
        numInput.value = String(clamped);
        updateBadge();
        applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
        highlightBoxPreview(selector, targetObj.width, targetObj.height, accentHex, hasRowTarget ? targetRowIdx : null);
      };

      const knobSlider = createBlueKnobSlider(minV, maxV, stepV, targetObj[propKey], (nextVal) => {
        applyValue(nextVal);
      });

      numInput.onchange = () => applyValue(numInput.value);

      topLine.appendChild(lbl);
      topLine.appendChild(numInput);
      row.appendChild(topLine);
      row.appendChild(knobSlider.element);
      secWrap.appendChild(row);

      rows.push({
        propKey,
        sync: () => {
          knobSlider.setValue(targetObj[propKey]);
          numInput.value = String(targetObj[propKey]);
          updateBadge();
        }
      });
    };

    addControlRow("Width", "width", limits.wMin, limits.wMax, 1);
    addControlRow("Height", "height", limits.hMin, limits.hMax, 1);
    addControlRow("Image Height", "imgHeight", limits.imgMin, limits.imgMax, 1);
    addControlRow("Name Size", "fontSize", limits.fontMin, limits.fontMax, 1);
    addControlRow("Price Size", "priceFontSize", limits.priceMin, limits.priceMax, 1);

    const bgRow = document.createElement("div");
    bgRow.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:4px;border-top:1px dashed #e2e8f0;";

    const bgLbl = document.createElement("span");
    bgLbl.textContent = "Box Background Color";
    bgLbl.style.cssText = "font-size:0.78rem;font-weight:700;color:#334155;";

    const bgColorBtn = document.createElement("button");
    bgColorBtn.type = "button";
    bgColorBtn.textContent = "Pick Color";
    bgColorBtn.style.cssText =
      "min-height:32px;padding:4px 10px;border-radius:8px;font-size:0.76rem;font-weight:700;cursor:pointer;";
    bgColorBtn.onclick = () => {
      openStandaloneColorPicker(targetObj.bgColor || "#ffffff", (hex) => {
        targetObj.bgColor = hex;
        applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
        highlightBoxPreview(selector, targetObj.width, targetObj.height, accentHex, hasRowTarget ? targetRowIdx : null);
      });
    };
    bindSoftToAccentButton(bgColorBtn);

    bgRow.appendChild(bgLbl);
    bgRow.appendChild(bgColorBtn);
    secWrap.appendChild(bgRow);

    const noBgRow = document.createElement("div");
    noBgRow.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:4px;border-top:1px dashed #e2e8f0;";

    const noBgLabel = document.createElement("label");
    noBgLabel.style.cssText =
      "display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#334155;cursor:pointer;";

    const noBgChk = document.createElement("input");
    noBgChk.type = "checkbox";
    noBgChk.checked = Boolean(targetObj.textBgTransparent);
    noBgChk.style.cssText = "width:18px;height:18px;cursor:pointer;";

    const syncNoBgToggleActive = () => {
      const active = Boolean(noBgChk.checked);
      noBgRow.style.background = active ? SOFT_POPUP_BTN_BG : "transparent";
      noBgRow.style.borderRadius = "8px";
      noBgRow.style.padding = active ? "6px" : "4px 0 0 0";
      noBgTxt.style.color = active ? SOFT_POPUP_BTN_TEXT : "#334155";
      noBgTxt.style.fontWeight = active ? "800" : "700";
    };

    noBgChk.onchange = () => {
      targetObj.textBgTransparent = noBgChk.checked;
      const bothNoBg = Boolean(sizes.miniBox.textBgTransparent && sizes.productBox.textBgTransparent);
      const bothNormal = Boolean(!sizes.miniBox.textBgTransparent && !sizes.productBox.textBgTransparent);
      selectedBulkMode = bothNoBg ? "noBg" : (bothNormal ? "normalBg" : null);
      syncBulkButtonsState();
      syncNoBgToggleActive();
      applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
      highlightBoxPreview(selector, targetObj.width, targetObj.height, accentHex, hasRowTarget ? targetRowIdx : null);
    };

    const noBgTxt = document.createElement("span");
    noBgTxt.textContent = "Transparent Box (No BG)";

    noBgLabel.appendChild(noBgChk);
    noBgLabel.appendChild(noBgTxt);
    noBgRow.appendChild(noBgLabel);
    secWrap.appendChild(noBgRow);
    syncNoBgToggleActive();

    const priceColorRow = document.createElement("div");
    priceColorRow.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:4px;border-top:1px dashed #e2e8f0;";

    const priceColorLbl = document.createElement("span");
    priceColorLbl.textContent = "Price Color";
    priceColorLbl.style.cssText = "font-size:0.78rem;font-weight:700;color:#334155;";

    const priceColorBtn = document.createElement("button");
    priceColorBtn.type = "button";
    priceColorBtn.textContent = "Pick Color";
    priceColorBtn.style.cssText =
      "min-height:32px;padding:4px 10px;border-radius:8px;font-size:0.76rem;font-weight:700;cursor:pointer;";
    priceColorBtn.onclick = () => {
      openStandaloneColorPicker(targetObj.priceColor || "#111827", (hex) => {
        targetObj.priceColor = hex;
        applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
        highlightBoxPreview(selector, targetObj.width, targetObj.height, accentHex, hasRowTarget ? targetRowIdx : null);
      });
    };
    bindSoftToAccentButton(priceColorBtn);

    priceColorRow.appendChild(priceColorLbl);
    priceColorRow.appendChild(priceColorBtn);
    secWrap.appendChild(priceColorRow);

    return {
      secWrap,
      syncAll: () => {
        rows.forEach((r) => r.sync());
        noBgChk.checked = Boolean(targetObj.textBgTransparent);
        syncNoBgToggleActive();
      }
    };
  }

  const miniSec = buildBoxSection("Top Mini Boxes", sizes.miniBox, ".mini-box", {
    wMin: 64,
    wMax: 180,
    hMin: 90,
    hMax: 240,
    imgMin: 44,
    imgMax: 160,
    fontMin: 9,
    fontMax: 26,
    priceMin: 9,
    priceMax: 26
  });

  const prodSec = buildBoxSection("Product Boxes", sizes.productBox, ".item-box", {
    wMin: 110,
    wMax: 320,
    hMin: 165,
    hMax: 420,
    imgMin: 80,
    imgMax: 260,
    fontMin: 10,
    fontMax: 30,
    priceMin: 10,
    priceMax: 28
  });

  syncBulkButtonsState();

  quickNoBgAllBtn.onclick = () => {
    selectedBulkMode = "noBg";
    sizes.miniBox.textBgTransparent = true;
    sizes.productBox.textBgTransparent = true;
    syncBulkButtonsState();
    miniSec.syncAll();
    prodSec.syncAll();
    applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
  };

  quickNormalBgAllBtn.onclick = () => {
    selectedBulkMode = "normalBg";
    sizes.miniBox.textBgTransparent = false;
    sizes.productBox.textBgTransparent = false;
    syncBulkButtonsState();
    miniSec.syncAll();
    prodSec.syncAll();
    applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
  };

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.textContent = "Reset Default";
  resetBtn.style.cssText =
    "min-height:40px;padding:8px 10px;border-radius:10px;font-size:0.8rem;font-weight:700;cursor:pointer;flex-shrink:0;";
  resetBtn.onclick = () => {
    sizes.miniBox = { ...FALLBACK_BOX_SIZES.miniBox };
    sizes.productBox = { ...FALLBACK_BOX_SIZES.productBox };
    selectedBulkMode = "normalBg";
    syncBulkButtonsState();
    miniSec.syncAll();
    prodSec.syncAll();
    applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
    highlightBoxPreview(".mini-box", sizes.miniBox.width, sizes.miniBox.height, accentHex, hasRowTarget ? targetRowIdx : null);
    highlightBoxPreview(".item-box", sizes.productBox.width, sizes.productBox.height, accentHex, hasRowTarget ? targetRowIdx : null);
  };
  bindSoftToAccentButton(resetBtn);

  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;gap:6px;margin-top:2px;flex-shrink:0;flex-wrap:wrap;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cssText =
    "flex:1;min-height:40px;padding:8px 10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;color:#334155;font-size:0.82rem;font-weight:700;cursor:pointer;";
  cancelBtn.onclick = restoreSnapshot;

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = hasRowTarget ? `Apply Row ${targetRowIdx + 1}` : "Apply";
  applyBtn.style.cssText =
    "flex:1;min-height:40px;padding:8px 12px;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer;";
  applyBtn.onclick = () => {
    applyBoxSizePanelToDom(sizes, hasRowTarget ? targetRowIdx : null);
    clearBoxPreviewHighlights();
    modal.remove();
    renderSections();
    attachOwnerStoreEditHandlers();
  };
  bindSoftToAccentButton(applyBtn);

  const applyAllRowsBtn = document.createElement("button");
  applyAllRowsBtn.type = "button";
  applyAllRowsBtn.textContent = "Apply All Rows";
  applyAllRowsBtn.style.cssText =
    "flex:1;min-height:40px;padding:8px 12px;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer;";
  applyAllRowsBtn.onclick = () => {
    data.boxSizes = {
      miniBox: { ...sizes.miniBox },
      productBox: { ...sizes.productBox }
    };
    (data.sections || []).forEach((s) => {
      s.customBoxSizes = null;
    });
    clearBoxPreviewHighlights();
    modal.remove();
    renderSections();
    attachOwnerStoreEditHandlers();
  };
  bindSoftToAccentButton(applyAllRowsBtn);

  footer.appendChild(resetBtn);
  footer.appendChild(cancelBtn);
  footer.appendChild(applyBtn);
  footer.appendChild(applyAllRowsBtn);

  card.appendChild(header);
  card.appendChild(quickBulkRow);
  card.appendChild(miniSec.secWrap);
  card.appendChild(prodSec.secWrap);
  card.appendChild(footer);
  modal.appendChild(card);
  document.body.appendChild(modal);
}

function makeToggleColorBox(titleText, enabledVal, colorVal, accentHex, onToggle, onColorChange) {
  const box = document.createElement("div");
  box.style.cssText =
    "border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;padding:11px;display:flex;flex-direction:column;gap:10px;";

  const head = document.createElement("div");
  head.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";

  const toggleLabel = document.createElement("label");
  toggleLabel.style.cssText =
    "display:flex;align-items:center;gap:8px;min-height:36px;font-size:0.88rem;font-weight:700;color:#111827;cursor:pointer;flex:1;";

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.checked = Boolean(enabledVal);
  chk.style.cssText = "width:20px;height:20px;cursor:pointer;flex-shrink:0;";

  const txt = document.createElement("span");
  txt.textContent = titleText;

  const syncToggleHighlight = () => {
    const isChecked = Boolean(chk.checked);
    box.style.borderColor = isChecked ? SOFT_POPUP_BTN_BORDER : "#e2e8f0";
    box.style.background = isChecked ? SOFT_POPUP_BTN_BG : "#f8fafc";
    txt.style.color = isChecked ? SOFT_POPUP_BTN_TEXT : "#111827";
  };

  chk.onchange = () => {
    syncToggleHighlight();
    onToggle(chk.checked);
  };

  toggleLabel.appendChild(chk);
  toggleLabel.appendChild(txt);

  const colorBtn = document.createElement("button");
  colorBtn.type = "button";
  colorBtn.textContent = "Color";
  colorBtn.style.cssText =
    "min-height:34px;padding:4px 10px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;flex-shrink:0;";
  colorBtn.onclick = () => {
    openStandaloneColorPicker(colorVal || "#38bdf8", (hex) => {
      onColorChange(hex);
    });
  };
  bindSoftToAccentButton(colorBtn);

  head.appendChild(toggleLabel);
  head.appendChild(colorBtn);
  box.appendChild(head);

  const extraWrap = document.createElement("div");
  extraWrap.style.cssText = "display:flex;flex-direction:column;gap:8px;";
  box.appendChild(extraWrap);

  syncToggleHighlight();

  return { box, extraWrap, chk, colorBtn, syncToggleHighlight };
}

function getTargetBoxCard(sIdx, itemId) {
  const secEl = document.querySelector(`#sectionsContainer .row-section[data-section-index="${sIdx}"]`);
  if (!secEl) return null;
  const data = getWorkingStoreData();
  const sec = data.sections && data.sections[sIdx];
  if (!sec || !Array.isArray(sec.items)) return null;
  const topRowLimit = Math.min(MAX_TOP_ROW_BOXES, Math.max(0, Number(data.indexBoxLimit ?? MAX_TOP_ROW_BOXES)));
  const list = sIdx === 0 ? sec.items.slice(0, topRowLimit) : sec.items;
  const idx = list.findIndex((i) => i.id === itemId);
  if (idx < 0) return null;
  const cards = secEl.querySelectorAll(".mini-box:not(.user-photo-only-box), .item-box");
  return cards[idx] || null;
}

function getTargetBoxPriceElement(sIdx, itemId) {
  const card = getTargetBoxCard(sIdx, itemId);
  return card ? card.querySelector(".mini-box-price, .item-price") : null;
}

function syncTargetBoxPhotoOnScreen(sIdx, itemId, imgUrl) {
  const card = getTargetBoxCard(sIdx, itemId);
  if (!card) return;
  const data = getWorkingStoreData();
  const sizes = typeof getEffectiveBoxSizesForSection === "function"
    ? getEffectiveBoxSizesForSection(data, sIdx)
    : normalizeBoxSizes(data.boxSizes);
  const isMini = sIdx === 0;
  const cfg = isMini ? sizes.miniBox : sizes.productBox;
  const h = cfg.imgHeight;
  const radius = cfg.textBgTransparent ? "10px" : "0px";
  const kind = isMini ? "mini" : "product";

  const existingImg = card.querySelector("img");
  const existingPh = card.querySelector(`[data-box-placeholder="${kind}"]`);

  if (imgUrl) {
    if (existingImg) {
      existingImg.src = imgUrl;
      existingImg.style.height = `${h}px`;
      existingImg.style.borderRadius = radius;
      existingImg.style.display = "block";
    } else if (existingPh) {
      const newImg = document.createElement("img");
      newImg.src = imgUrl;
      newImg.alt = "Item";
      newImg.style.cssText = `width:100%;height:${h}px;object-fit:cover;display:block;border-radius:${radius};`;
      existingPh.replaceWith(newImg);
    }
  } else {
    if (existingImg) {
      const newPh = document.createElement("div");
      newPh.setAttribute("data-box-placeholder", kind);
      newPh.style.cssText = `width:100%;height:${h}px;background:#e5e7eb;border-radius:${radius};`;
      existingImg.replaceWith(newPh);
    } else if (existingPh) {
      existingPh.style.height = `${h}px`;
      existingPh.style.borderRadius = radius;
    }
  }
}

// ==================== UNIFIED BOTTOM-SHEET EDITOR (#ownerStoreNameModal) ====================
function openCustomTextStylePopup(config) {
  const existing = document.getElementById("ownerStoreNameModal");
  if (existing) existing.remove();

  const data = getWorkingStoreData();
  const accentHex = getEditorFixedColor();

  const isStore = config.targetType === "store";
  const isSection = config.targetType === "section";
  const secObj = isSection || config.targetType === "item" ? data.sections[config.sIdx] : null;
  const itemObj = config.targetType === "item" ? secObj?.items?.find((i) => i.id === config.itemId) : null;
  const isItemBox = Boolean(itemObj && typeof config.sIdx === "number");

  let currentText = "";
  let defaultSize = 14;
  let minSize = 10;
  let maxSize = 28;
  let defaultColor = "#111827";
  let currentStyleSource = null;

  if (isStore) {
    currentText = data.storeTitle !== undefined && data.storeTitle !== null ? String(data.storeTitle) : "Store Name";
    defaultSize = 30;
    minSize = 16;
    maxSize = 56;
    defaultColor = STORE_NAME_COLORS[0];
    currentStyleSource = data.titleStyle || {
      fontFamily: data.titleFont,
      fontStyle: data.titleFontStyle,
      fontSize: data.titleSize,
      color: data.titleColor
    };
  } else if (isSection && secObj) {
    currentText = secObj.title !== undefined && secObj.title !== null ? String(secObj.title) : "Name";
    defaultSize = 16;
    minSize = 12;
    maxSize = 30;
    defaultColor = "#111827";
    currentStyleSource = secObj.titleStyle;
  } else if (itemObj) {
    currentText = itemObj.name !== undefined && itemObj.name !== null ? String(itemObj.name) : "Item";
    defaultSize = 13;
    minSize = 10;
    maxSize = 24;
    defaultColor = "#111827";
    currentStyleSource = itemObj.nameStyle;
  } else {
    return;
  }

  const st = normalizeTextStyle(currentStyleSource, {
    fontSize: defaultSize,
    fontWeight: isStore ? 700 : 600,
    color: defaultColor
  });
  st.fontSize = Math.max(minSize, Math.min(maxSize, st.fontSize));
  st.borderWidth = getSafeThinBorderWidth(st.fontSize, st.borderWidth);

  const boxDefaults = isItemBox ? getEffectiveBoxSizesForSection(data, config.sIdx) : null;
  const basePriceDefaults = isItemBox
    ? (config.sIdx === 0 ? boxDefaults.miniBox : boxDefaults.productBox)
    : null;

  let draftPriceText = isItemBox
    ? (itemObj.priceText !== undefined && itemObj.priceText !== null && String(itemObj.priceText).trim() !== ""
      ? String(itemObj.priceText)
      : String(itemObj.price ?? 0))
    : "";
  let draftPriceSize = isItemBox
    ? (Number.isFinite(Number(itemObj.priceFontSize)) && Number(itemObj.priceFontSize) > 0
      ? Number(itemObj.priceFontSize)
      : basePriceDefaults.priceFontSize)
    : 13;
  let draftPriceColor = isItemBox
    ? (itemObj.priceColor || basePriceDefaults.priceColor || "#111827")
    : "#111827";
  let draftItemImg = isItemBox ? (itemObj.img || "") : "";

  const isBottomSheet = isItemBox || isSection;
  const modal = document.createElement("div");
  modal.id = "ownerStoreNameModal";
  modal.style.cssText = isBottomSheet
    ? "position:fixed;inset:0;z-index:125;background:transparent;display:flex;align-items:flex-end;justify-content:center;padding:0;pointer-events:none;"
    : "position:fixed;inset:0;z-index:125;background:rgba(15,23,42,0.58);display:flex;align-items:flex-start;justify-content:center;padding:8px;overflow-y:auto;";

  const card = document.createElement("div");
  card.style.cssText = isBottomSheet
    ? "width:100%;max-width:480px;height:54vh;max-height:54vh;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:#ffffff;border-top:2px solid #e2e8f0;border-radius:16px 16px 0 0;padding:10px 14px 18px;box-shadow:0 -10px 28px rgba(15,23,42,0.22);display:flex;flex-direction:column;gap:12px;pointer-events:auto;"
    : "width:100%;max-width:100%;background:#ffffff;border-radius:14px;padding:12px 14px 16px;box-shadow:0 12px 32px rgba(15,23,42,0.28);display:flex;flex-direction:column;gap:12px;";

  const stickyHeader = document.createElement("div");
  stickyHeader.style.cssText =
    `position:sticky;top:${isBottomSheet ? "-10px" : "0"};z-index:20;background:#ffffff;padding-bottom:8px;border-bottom:1px solid #e2e8f0;display:flex;flex-direction:column;gap:6px;`;

  const topBar = document.createElement("div");
  topBar.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";

  const heading = document.createElement("div");
  heading.textContent = config.modalTitle || "Edit";
  heading.style.cssText = "font-size:0.98rem;font-weight:800;color:#111827;";

  const topCloseBtn = document.createElement("button");
  topCloseBtn.type = "button";
  topCloseBtn.textContent = "X";
  topCloseBtn.style.cssText =
    "border:none;background:#f8fafc;border-radius:8px;min-width:34px;min-height:34px;font-size:1rem;font-weight:700;color:#334155;cursor:pointer;";
  topCloseBtn.onclick = () => modal.remove();

  topBar.appendChild(heading);
  topBar.appendChild(topCloseBtn);

  const previewBox = document.createElement("div");
  previewBox.style.cssText =
    `padding:8px 12px;border-radius:10px;background:${isStore ? "#1e293b" : "#f8fafc"};border:1px solid #e2e8f0;min-height:42px;max-height:105px;overflow:auto;display:flex;align-items:center;justify-content:center;text-align:center;`;

  const previewText = document.createElement("span");
  previewText.style.cssText = "display:inline-block;line-height:1.2;white-space:pre-line;word-break:normal;";
  previewBox.appendChild(previewText);

  stickyHeader.appendChild(topBar);
  stickyHeader.appendChild(previewBox);

  let glowCtrl;
  let borderCtrl;
  let bgCtrl;
  let textColorTriggerBtn;
  let renderFontScrollList;
  let selectedPresetIdx = -1;

  function syncAllControlsFromState() {
    if (glowCtrl) {
      glowCtrl.chk.checked = Boolean(st.glowEnabled);
      if (glowCtrl.syncToggleHighlight) glowCtrl.syncToggleHighlight();
    }
    if (borderCtrl) {
      borderCtrl.chk.checked = Boolean(st.borderEnabled);
      if (borderCtrl.syncToggleHighlight) borderCtrl.syncToggleHighlight();
    }
    if (bgCtrl) {
      bgCtrl.chk.checked = Boolean(st.bgEnabled);
      if (bgCtrl.syncToggleHighlight) bgCtrl.syncToggleHighlight();
    }
    if (renderFontScrollList) {
      renderFontScrollList();
    }
  }

  function syncPreview() {
    previewText.textContent = textInput.value.length > 0
      ? textInput.value
      : (isStore ? "Store Name" : isSection ? "Name" : "Item");
    applyTextStyleToElement(previewText, st);
    previewText.style.lineHeight = "1.2";
    previewText.style.whiteSpace = "pre-line";
    previewText.style.overflow = "visible";
    if (!st.bgEnabled) {
      previewText.style.padding = "0px";
      previewText.style.borderRadius = "0px";
    }
  }

  // ---- NAME SECTION & ITS NEARBY CONTROLS ----
  const nameSectionBox = document.createElement("div");
  nameSectionBox.style.cssText =
    "border:1px solid #e2e8f0;background:#ffffff;border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:10px;";

  const nameSecHead = document.createElement("span");
  nameSecHead.textContent = "Name & Style";
  nameSecHead.style.cssText = `font-size:0.86rem;font-weight:800;color:${SOFT_POPUP_BTN_TEXT};`;

  const textInput = document.createElement("textarea");
  textInput.rows = 2;
  textInput.value = currentText;
  textInput.placeholder = "Enter name (Press Enter for a new line)";
  textInput.style.cssText =
    "width:100%;min-height:52px;max-height:110px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:10px;font-size:0.92rem;line-height:1.35;color:#111827;box-sizing:border-box;resize:vertical;overflow:auto;font-family:inherit;";
  textInput.oninput = syncPreview;

  const presetWrap = document.createElement("div");
  presetWrap.style.cssText = "display:grid;grid-template-columns:repeat(2,1fr);gap:8px;";

  const presets = [
    {
      label: "Clean",
      apply: () => {
        st.glowEnabled = false;
        st.borderEnabled = false;
        st.bgEnabled = false;
        st.fontWeight = isStore ? 700 : 600;
      }
    },
    {
      label: "Neon Glow",
      apply: () => {
        st.glowEnabled = true;
        st.glowColor = "#38bdf8";
        st.glowSize = 14;
        st.borderEnabled = false;
        st.fontWeight = 800;
      }
    },
    {
      label: "Clear Border",
      apply: () => {
        st.glowEnabled = false;
        st.borderEnabled = true;
        st.borderColor = "#0f172a";
        st.borderWidth = getSafeThinBorderWidth(st.fontSize, 1.4);
        st.fontWeight = 700;
      }
    },
    {
      label: "Badge Box",
      apply: () => {
        st.bgEnabled = true;
        st.bgColor = "#0f172a";
        st.bgOpacity = 0.72;
        st.bgRadius = 10;
        st.color = "#ffffff";
      }
    }
  ];

  const presetControllers = [];
  presets.forEach((p, pIdx) => {
    const pBtn = document.createElement("button");
    pBtn.type = "button";
    pBtn.textContent = p.label;
    pBtn.style.cssText =
      "min-height:36px;padding:6px 10px;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer;";
    const ctrl = bindSoftToAccentButton(pBtn, { isSelected: false });
    presetControllers.push(ctrl);
    pBtn.onclick = () => {
      selectedPresetIdx = pIdx;
      p.apply();
      presetControllers.forEach((c, idx) => c.setSelected(idx === selectedPresetIdx));
      syncAllControlsFromState();
      syncPreview();
    };
    presetWrap.appendChild(pBtn);
  });

  const mainColorRow = document.createElement("div");
  mainColorRow.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:8px 10px;";

  const mainColorLbl = document.createElement("span");
  mainColorLbl.textContent = "Text Color";
  mainColorLbl.style.cssText = "font-size:0.84rem;font-weight:700;color:#111827;cursor:pointer;flex:1;";

  textColorTriggerBtn = document.createElement("button");
  textColorTriggerBtn.type = "button";
  textColorTriggerBtn.textContent = "Pick Color";
  textColorTriggerBtn.style.cssText =
    "min-height:34px;padding:5px 12px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;";

  const triggerTextColorPicker = () => {
    openStandaloneColorPicker(st.color || "#ffffff", (hex) => {
      st.color = hex;
      syncPreview();
    });
  };

  mainColorLbl.onclick = triggerTextColorPicker;
  textColorTriggerBtn.onclick = triggerTextColorPicker;
  bindSoftToAccentButton(textColorTriggerBtn);

  mainColorRow.appendChild(mainColorLbl);
  mainColorRow.appendChild(textColorTriggerBtn);

  const fontWrap = document.createElement("div");
  fontWrap.style.cssText =
    "display:flex;flex-direction:column;gap:8px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:8px 10px;";

  const fontHeader = document.createElement("div");
  fontHeader.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";

  const fontLbl = document.createElement("span");
  fontLbl.textContent = "Font Style (100)";
  fontLbl.style.cssText = "font-size:0.84rem;font-weight:700;color:#111827;";

  const toggleFontListBtn = document.createElement("button");
  toggleFontListBtn.type = "button";
  toggleFontListBtn.textContent = "Choose Font";
  toggleFontListBtn.style.cssText =
    "padding:5px 10px;min-height:32px;border-radius:8px;font-size:0.76rem;font-weight:700;cursor:pointer;max-width:62%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
  const fontToggleCtrl = bindSoftToAccentButton(toggleFontListBtn);

  fontHeader.appendChild(fontLbl);
  fontHeader.appendChild(toggleFontListBtn);

  const fontScrollBox = document.createElement("div");
  fontScrollBox.style.cssText =
    "display:none;flex-direction:column;gap:4px;max-height:155px;overflow-y:auto;padding:6px;border:1px solid #e2e8f0;border-radius:10px;background:#ffffff;";

  const syncChooseFontBtnLabel = () => {
    const matched = STORE_FONT_OPTIONS.find(
      (o) =>
        o.value === st.fontFamily &&
        (o.italic ? "italic" : "normal") === st.fontStyle &&
        Number(o.weight) === Number(st.fontWeight) &&
        Number(o.letterSpacing) === Number(st.letterSpacing)
    );
    toggleFontListBtn.textContent = matched ? matched.label : "Choose Font";
  };

  toggleFontListBtn.onclick = () => {
    const isHidden = fontScrollBox.style.display === "none";
    fontScrollBox.style.display = isHidden ? "flex" : "none";
    fontToggleCtrl.setSelected(isHidden);
  };

  const fontItemControllers = [];
  STORE_FONT_OPTIONS.forEach((opt) => {
    const itemBtn = document.createElement("button");
    itemBtn.type = "button";
    itemBtn.textContent = opt.label;
    itemBtn.style.cssText =
      `width:100%;text-align:left;padding:7px 9px;min-height:34px;border-radius:8px;font-family:${opt.value};font-style:${opt.italic ? "italic" : "normal"};font-weight:${opt.weight || 600};letter-spacing:${opt.letterSpacing || 0}px;text-transform:${opt.textTransform || "none"};font-size:0.86rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;flex-shrink:0;`;
    const ctrl = bindSoftToAccentButton(itemBtn, { isSelected: false });
    fontItemControllers.push(ctrl);
    itemBtn.onclick = () => {
      st.fontFamily = opt.value;
      st.fontStyle = opt.italic ? "italic" : "normal";
      st.fontWeight = opt.weight || st.fontWeight;
      st.letterSpacing = opt.letterSpacing ?? 0;
      st.textTransform = opt.textTransform || "none";
      renderFontScrollList();
      syncChooseFontBtnLabel();
      syncPreview();
      fontScrollBox.style.display = "none";
      fontToggleCtrl.setSelected(false);
    };
    fontScrollBox.appendChild(itemBtn);
  });

  renderFontScrollList = () => {
    fontItemControllers.forEach((ctrl, idx) => {
      const opt = STORE_FONT_OPTIONS[idx];
      const active =
        opt.value === st.fontFamily &&
        (opt.italic ? "italic" : "normal") === st.fontStyle &&
        Number(opt.weight) === Number(st.fontWeight) &&
        Number(opt.letterSpacing) === Number(st.letterSpacing);
      ctrl.setSelected(active);
    });
    syncChooseFontBtnLabel();
  };

  fontWrap.appendChild(fontHeader);
  fontWrap.appendChild(fontScrollBox);

  const sizeSlider = makeLabeledSlider("Size", minSize, maxSize, 1, st.fontSize, "px", accentHex, (val) => {
    st.fontSize = val;
    st.borderWidth = getSafeThinBorderWidth(st.fontSize, st.borderWidth);
    syncPreview();
  });

  const weightSlider = makeLabeledSlider("Thickness (Thin / Bold)", 300, 900, 50, st.fontWeight, "", accentHex, (val) => {
    st.fontWeight = val;
    syncPreview();
  });

  glowCtrl = makeToggleColorBox(
    "Glow",
    st.glowEnabled,
    st.glowColor,
    accentHex,
    (checked) => {
      st.glowEnabled = checked;
      syncPreview();
    },
    (hex) => {
      st.glowColor = hex;
      syncPreview();
    }
  );
  glowCtrl.extraWrap.appendChild(
    makeLabeledSlider("Glow Spread", 2, 28, 1, st.glowSize, "px", accentHex, (val) => {
      st.glowSize = val;
      syncPreview();
    })
  );

  const maxClearSlider = Math.max(1.2, Math.min(2.6, Number((st.fontSize * 0.08).toFixed(1))));
  borderCtrl = makeToggleColorBox(
    "Clear Border",
    st.borderEnabled,
    st.borderColor,
    accentHex,
    (checked) => {
      st.borderEnabled = checked;
      syncPreview();
    },
    (hex) => {
      st.borderColor = hex;
      syncPreview();
    }
  );
  borderCtrl.extraWrap.appendChild(
    makeLabeledSlider("Border Width", 0.8, maxClearSlider, 0.1, st.borderWidth, "px", accentHex, (val) => {
      st.borderWidth = getSafeThinBorderWidth(st.fontSize, val);
      syncPreview();
    })
  );

  bgCtrl = makeToggleColorBox(
    "Background",
    st.bgEnabled,
    st.bgColor,
    accentHex,
    (checked) => {
      st.bgEnabled = checked;
      syncPreview();
    },
    (hex) => {
      st.bgColor = hex;
      syncPreview();
    }
  );
  bgCtrl.extraWrap.appendChild(
    makeLabeledSlider("Background Opacity", 0.1, 1, 0.05, st.bgOpacity, "", accentHex, (val) => {
      st.bgOpacity = val;
      syncPreview();
    })
  );
  bgCtrl.extraWrap.appendChild(
    makeLabeledSlider("Corner Roundness", 0, 20, 1, st.bgRadius, "px", accentHex, (val) => {
      st.bgRadius = val;
      syncPreview();
    })
  );

  nameSectionBox.appendChild(nameSecHead);
  nameSectionBox.appendChild(textInput);
  nameSectionBox.appendChild(presetWrap);
  nameSectionBox.appendChild(mainColorRow);
  nameSectionBox.appendChild(fontWrap);
  nameSectionBox.appendChild(sizeSlider);
  nameSectionBox.appendChild(weightSlider);
  nameSectionBox.appendChild(glowCtrl.box);
  nameSectionBox.appendChild(borderCtrl.box);
  nameSectionBox.appendChild(bgCtrl.box);

  // ---- PHOTO SECTION & ITS NEARBY CONTROLS ----
  let boxPhotoWrap = null;
  let photoStatusBadge = null;
  if (isItemBox) {
    boxPhotoWrap = document.createElement("div");
    boxPhotoWrap.style.cssText =
      "border:1px solid #e2e8f0;background:#ffffff;border-radius:12px;padding:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;";

    const photoLeft = document.createElement("div");
    photoLeft.style.cssText = "display:flex;flex-direction:column;gap:2px;";

    const photoTitle = document.createElement("span");
    photoTitle.textContent = "Photo";
    photoTitle.style.cssText = `font-size:0.86rem;font-weight:800;color:${SOFT_POPUP_BTN_TEXT};`;

    photoStatusBadge = document.createElement("span");
    photoStatusBadge.textContent = draftItemImg ? "Photo Set" : "No Photo";
    photoStatusBadge.style.cssText = "font-size:0.76rem;font-weight:700;color:#475569;";

    photoLeft.appendChild(photoTitle);
    photoLeft.appendChild(photoStatusBadge);

    const pBtnGroup = document.createElement("div");
    pBtnGroup.style.cssText = "display:flex;gap:6px;align-items:center;";

    const pickPhotoBtn = document.createElement("button");
    pickPhotoBtn.type = "button";
    pickPhotoBtn.textContent = "Choose Photo";
    pickPhotoBtn.style.cssText =
      "min-height:34px;padding:5px 11px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;";
    pickPhotoBtn.onclick = () => {
      const fileInput = ensureOwnerInlineFileInput();
      pendingOwnerEditSlot = {
        type: "item",
        sIdx: config.sIdx,
        itemId: config.itemId,
        reopenBoxEditModal: true,
        modalTitle: config.modalTitle,
        modalScrollTop: card.scrollTop || 0
      };
      fileInput.value = "";
      fileInput.click();
    };
    bindSoftToAccentButton(pickPhotoBtn);

    const removePhotoBtn = document.createElement("button");
    removePhotoBtn.type = "button";
    removePhotoBtn.textContent = "Remove Photo";
    removePhotoBtn.style.cssText =
      "min-height:34px;padding:5px 10px;border:1px solid #fecaca;border-radius:8px;background:#fff5f5;color:#b91c1c;font-size:0.78rem;font-weight:700;cursor:pointer;";
    removePhotoBtn.onclick = () => {
      draftItemImg = "";
      itemObj.img = "";
      if (photoStatusBadge) photoStatusBadge.textContent = "No Photo";
      syncTargetBoxPhotoOnScreen(config.sIdx, config.itemId, "");
    };

    pBtnGroup.appendChild(pickPhotoBtn);
    pBtnGroup.appendChild(removePhotoBtn);
    boxPhotoWrap.appendChild(photoLeft);
    boxPhotoWrap.appendChild(pBtnGroup);
  }

  // ---- PRICE SECTION & ITS NEARBY LIVE CONTROLS ----
  let boxPriceWrap = null;
  let priceInput = null;
  let priceLiveBadge = null;
  let pSizeSlider = null;
  if (isItemBox) {
    boxPriceWrap = document.createElement("div");
    boxPriceWrap.style.cssText =
      "border:1px solid #e2e8f0;background:#ffffff;border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;";

    const priceTopRow = document.createElement("div");
    priceTopRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;";

    const priceTopLbl = document.createElement("span");
    priceTopLbl.textContent = "Price & Size";
    priceTopLbl.style.cssText = `font-size:0.86rem;font-weight:800;color:${SOFT_POPUP_BTN_TEXT};`;

    priceLiveBadge = document.createElement("span");
    priceLiveBadge.style.cssText = "display:inline-block;font-weight:700;line-height:1.1;";

    priceTopRow.appendChild(priceTopLbl);
    priceTopRow.appendChild(priceLiveBadge);

    const syncPriceLivePreview = () => {
      const raw = (priceInput ? priceInput.value : draftPriceText).trim();
      const disp = raw.length > 0 ? (raw.startsWith("₹") || raw.startsWith("$") ? raw : `₹${raw}`) : "₹0";
      if (priceLiveBadge) {
        priceLiveBadge.textContent = disp;
        priceLiveBadge.style.fontSize = `${draftPriceSize}px`;
        priceLiveBadge.style.color = draftPriceColor;
      }
      const domPriceEl = getTargetBoxPriceElement(config.sIdx, config.itemId);
      if (domPriceEl) {
        domPriceEl.textContent = disp;
        domPriceEl.style.setProperty("font-size", `${draftPriceSize}px`, "important");
        domPriceEl.style.setProperty("color", draftPriceColor, "important");
      }
    };

    priceInput = document.createElement("input");
    priceInput.type = "text";
    priceInput.value = draftPriceText;
    priceInput.placeholder = "Enter price (e.g. 99 or 150/-)";
    priceInput.style.cssText =
      "width:100%;min-height:36px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:8px;font-size:0.9rem;font-weight:700;color:#111827;background:#f8fafc;box-sizing:border-box;";
    priceInput.oninput = () => {
      draftPriceText = priceInput.value;
      syncPriceLivePreview();
    };

    pSizeSlider = makeLabeledSlider("Price Size", 9, 28, 1, draftPriceSize, "px", accentHex, (val) => {
      draftPriceSize = val;
      syncPriceLivePreview();
    });

    const pColorRow = document.createElement("div");
    pColorRow.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;gap:8px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:8px 10px;";

    const pColorLbl = document.createElement("span");
    pColorLbl.textContent = "Price Color";
    pColorLbl.style.cssText = "font-size:0.82rem;font-weight:700;color:#111827;";

    const pColorBtn = document.createElement("button");
    pColorBtn.type = "button";
    pColorBtn.textContent = "Pick Color";
    pColorBtn.style.cssText =
      "min-height:32px;padding:4px 10px;border-radius:8px;font-size:0.76rem;font-weight:700;cursor:pointer;";
    pColorBtn.onclick = () => {
      openStandaloneColorPicker(draftPriceColor, (hex) => {
        draftPriceColor = hex;
        syncPriceLivePreview();
      });
    };
    bindSoftToAccentButton(pColorBtn);

    pColorRow.appendChild(pColorLbl);
    pColorRow.appendChild(pColorBtn);

    boxPriceWrap.appendChild(priceTopRow);
    boxPriceWrap.appendChild(priceInput);
    boxPriceWrap.appendChild(pSizeSlider);
    boxPriceWrap.appendChild(pColorRow);

    syncPriceLivePreview();
  }

  // ---- FOOTER BUTTONS: RESET, APPLY, APPLY TO ALL (NO CANCEL) ----
  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;gap:6px;margin-top:4px;flex-wrap:wrap;";

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.textContent = "Reset";
  resetBtn.style.cssText =
    "min-height:42px;padding:8px 12px;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer;";
  resetBtn.onclick = () => {
    const freshStyle = normalizeTextStyle(null, {
      fontSize: defaultSize,
      fontWeight: isStore ? 700 : 600,
      color: defaultColor
    });
    Object.assign(st, freshStyle);
    st.fontSize = Math.max(minSize, Math.min(maxSize, st.fontSize));
    st.borderWidth = getSafeThinBorderWidth(st.fontSize, st.borderWidth);

    const resetText = isStore ? "Store Name" : isSection ? "Name" : "Item";
    textInput.value = resetText;
    selectedPresetIdx = 0;
    presetControllers.forEach((c, idx) => c.setSelected(idx === 0));
    syncAllControlsFromState();
    syncPreview();

    if (isItemBox) {
      draftItemImg = "";
      itemObj.img = "";
      syncTargetBoxPhotoOnScreen(config.sIdx, config.itemId, "");
      if (photoStatusBadge) photoStatusBadge.textContent = "No Photo";
      draftPriceText = "0";
      if (priceInput) priceInput.value = "0";
      draftPriceSize = basePriceDefaults.priceFontSize;
      draftPriceColor = basePriceDefaults.priceColor || "#111827";
      if (pSizeSlider && typeof pSizeSlider.setSliderValue === "function") {
        pSizeSlider.setSliderValue(draftPriceSize);
      }
      if (priceLiveBadge) {
        priceLiveBadge.textContent = "₹0";
        priceLiveBadge.style.fontSize = `${draftPriceSize}px`;
        priceLiveBadge.style.color = draftPriceColor;
      }
      const domPriceEl = getTargetBoxPriceElement(config.sIdx, config.itemId);
      if (domPriceEl) {
        domPriceEl.textContent = "₹0";
        domPriceEl.style.setProperty("font-size", `${draftPriceSize}px`, "important");
        domPriceEl.style.setProperty("color", draftPriceColor, "important");
      }
    }
  };
  bindSoftToAccentButton(resetBtn);

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.style.cssText =
    "flex:1;min-height:42px;padding:8px 14px;border-radius:10px;font-weight:700;cursor:pointer;";

  const applyAllBtn = document.createElement("button");
  applyAllBtn.type = "button";
  applyAllBtn.textContent = "Apply to All";
  applyAllBtn.style.cssText =
    "flex:1;min-height:42px;padding:8px 14px;border-radius:10px;font-weight:700;cursor:pointer;";

  const commitStyleSelection = (applyToAll) => {
    const rawEnteredText = textInput.value;
    const finalText = rawEnteredText.length > 0
      ? rawEnteredText
      : (isStore ? "Store Name" : isSection ? "Name" : "Item");
    st.borderWidth = getSafeThinBorderWidth(st.fontSize, st.borderWidth);

    if (isStore) {
      data.storeTitle = finalText;
      data.titleStyle = { ...st };
      data.titleFont = st.fontFamily;
      data.titleFontStyle = st.fontStyle;
      data.titleSize = st.fontSize;
      data.titleColor = st.color;
      modal.remove();
      renderHeader();
      attachOwnerStoreEditHandlers();
    } else if (isSection && secObj) {
      secObj.title = finalText;
      secObj.titleStyle = { ...st };
      if (applyToAll) {
        (data.sections || []).forEach((s) => {
          s.titleStyle = { ...st };
        });
      }
      modal.remove();
      renderSections();
      attachOwnerStoreEditHandlers();
    } else if (itemObj) {
      itemObj.name = finalText;
      itemObj.nameStyle = { ...st };
      if (isItemBox) {
        const rawPrice = priceInput ? priceInput.value.trim() : draftPriceText.trim();
        itemObj.priceText = rawPrice.length > 0 ? rawPrice : "0";
        const numMatch = rawPrice.match(/(\d+(?:\.\d+)?)/);
        itemObj.price = numMatch ? Number(numMatch[1]) : 0;
        itemObj.priceFontSize = draftPriceSize;
        itemObj.priceColor = draftPriceColor;
        itemObj.img = draftItemImg;
      }
      if (applyToAll) {
        (data.sections || []).forEach((s) => {
          (s.items || []).forEach((it) => {
            it.nameStyle = { ...st };
            if (isItemBox) {
              it.priceFontSize = draftPriceSize;
              it.priceColor = draftPriceColor;
            }
          });
        });
      }
      modal.remove();
      renderSections();
      attachOwnerStoreEditHandlers();
    }
  };

  applyBtn.onclick = () => commitStyleSelection(false);
  applyAllBtn.onclick = () => commitStyleSelection(true);
  bindSoftToAccentButton(applyBtn);
  bindSoftToAccentButton(applyAllBtn);

  footer.appendChild(resetBtn);
  footer.appendChild(applyBtn);
  if (!isStore) {
    footer.appendChild(applyAllBtn);
  }

  card.appendChild(stickyHeader);
  card.appendChild(nameSectionBox);
  if (boxPhotoWrap) card.appendChild(boxPhotoWrap);
  if (boxPriceWrap) card.appendChild(boxPriceWrap);
  card.appendChild(footer);

  modal.appendChild(card);
  document.body.appendChild(modal);

  if (typeof config.initialScrollTop === "number" && config.initialScrollTop > 0) {
    card.scrollTop = config.initialScrollTop;
  }

  syncAllControlsFromState();
  syncPreview();
}

function openStoreNameEditorPopup() {
  openCustomTextStylePopup({
    targetType: "store",
    modalTitle: "Store Name & Style"
  });
}

// ==================== PHOTO CROP POP-UP EDITOR (#screenPhotoEditor) ====================
let rawImageObj = null;
let posX = 0, posY = 0, imgScale = 1, minScale = 1, maxScale = 3.0;
let baseLeft = 0, baseTop = 0;
let isDraggingImg = false, startMouseX = 0, startMouseY = 0;
let pinchStartDist = 0, pinchStartScale = 1;
let onCoverEditorDone = null;
let coverEditorEventsBound = false;
let activeCropConfig = { frameW: 290, frameH: 140, outW: 1080, outH: 520 };

function getBoxCropFrameDimensions(data, sIdx) {
  const sizes = typeof getEffectiveBoxSizesForSection === "function"
    ? getEffectiveBoxSizesForSection(data, sIdx)
    : normalizeBoxSizes(data && data.boxSizes);
  const cfg = sIdx === 0 ? sizes.miniBox : sizes.productBox;
  const maxW = 296;
  const maxH = 165;
  const rawW = Math.max(40, Number(cfg.width) || (sIdx === 0 ? 92 : 150));
  const rawH = Math.max(36, Number(cfg.imgHeight) || (sIdx === 0 ? 74 : 125));
  const scale = Math.min(maxW / rawW, maxH / rawH, 1.8);
  return {
    frameW: Math.max(56, Math.round(rawW * scale)),
    frameH: Math.max(46, Math.round(rawH * scale)),
    outW: Math.max(240, Math.round(rawW * 4)),
    outH: Math.max(180, Math.round(rawH * 4))
  };
}

function applyCropFrameSize(cropDims = null) {
  const box = document.getElementById("cropFrameBox");
  if (!box) return;
  const cfg = cropDims || { frameW: 290, frameH: 140, outW: 1080, outH: 520 };
  activeCropConfig = {
    frameW: cfg.frameW || 290,
    frameH: cfg.frameH || 140,
    outW: cfg.outW || 1080,
    outH: cfg.outH || 520
  };
  box.style.width = `${activeCropConfig.frameW}px`;
  box.style.height = `${activeCropConfig.frameH}px`;
}

function ensureCoverEditorDOM() {
  let screen = document.getElementById("screenPhotoEditor");
  if (!screen) {
    coverEditorEventsBound = false;
    screen = document.createElement("div");
    screen.id = "screenPhotoEditor";
    screen.style.cssText =
      "display:none;position:fixed;inset:0;background:rgba(15,23,42,0.62);z-index:99999;align-items:center;justify-content:center;padding:12px;";

    screen.innerHTML = `
      <div class="editor-popup-card" style="width:100%;max-width:344px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.32);display:flex;flex-direction:column;">
        <div class="editor-canvas-area" id="editorCanvasArea" style="width:100%;height:230px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;touch-action:none;background:#1e293b;">
          <img id="editorImagePreview" src="" alt="Preview" style="position:absolute;transform-origin:0 0;cursor:grab;user-select:none;z-index:5;display:block;max-width:none;max-height:none;will-change:transform;transform:translate3d(0px, 0px, 0px);" />
          <div class="crop-frame-box" id="cropFrameBox" style="width:290px;height:140px;border:2px solid #ffffff;box-shadow:0 0 0 9999px rgba(0, 0, 0, 0.52);position:relative;pointer-events:none;z-index:10;"></div>
        </div>
        <div class="editor-bottom-bar" style="width:100%;height:48px;background:#ffffff;display:flex;justify-content:space-between;align-items:center;padding:0 22px;z-index:25;border-top:1px solid #e2e8f0;">
          <button type="button" class="editor-bottom-btn" onclick="cancelEditor()" title="Cancel" style="background:#f8fafc;border:1px solid #e2e8f0;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;color:#334155;font-weight:700;">X</button>
          <button type="button" class="editor-bottom-btn" onclick="confirmEditor()" title="Save" style="background:#FFEDE5;border:1px solid #FDBA74;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 14px;height:34px;border-radius:8px;color:#9A3412;font-weight:700;">Save</button>
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

  const natW = rawImageObj.naturalWidth || rawImageObj.width || 1;
  const natH = rawImageObj.naturalHeight || rawImageObj.height || 1;
  const oldW = natW * imgScale;
  const oldH = natH * imgScale;
  const oldLeft = baseLeft + posX;
  const oldTop = baseTop + posY;

  const ratioX = oldW ? (boxCenterX - oldLeft) / oldW : 0.5;
  const ratioY = oldH ? (boxCenterY - oldTop) / oldH : 0.5;

  imgScale = clampedScale;
  const newW = natW * imgScale;
  const newH = natH * imgScale;

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

  const natW = rawImageObj.naturalWidth || rawImageObj.width || 1;
  const natH = rawImageObj.naturalHeight || rawImageObj.height || 1;
  const renderW = natW * imgScale;
  const renderH = natH * imgScale;

  const currentLeftRel = baseLeft + posX;
  const currentTopRel = baseTop + posY;

  let clampedLeftRel = currentLeftRel;
  let clampedTopRel = currentTopRel;

  if (renderW >= boxRect.width) {
    const minLeftRel = boxRightRel - renderW;
    const maxLeftRel = boxLeftRel;
    clampedLeftRel = Math.max(minLeftRel, Math.min(maxLeftRel, currentLeftRel));
  }

  if (renderH >= boxRect.height) {
    const minTopRel = boxBottomRel - renderH;
    const maxTopRel = boxTopRel;
    clampedTopRel = Math.max(minTopRel, Math.min(maxTopRel, currentTopRel));
  }

  posX = clampedLeftRel - baseLeft;
  posY = clampedTopRel - baseTop;
  preview.style.transition = "none";
  preview.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`;
}

function getTouchDistance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.hypot(dx, dy);
}

function bindCoverEditorEvents() {
  if (coverEditorEventsBound) return;
  coverEditorEventsBound = true;

  const editorArea = document.getElementById("editorCanvasArea");
  const preview = document.getElementById("editorImagePreview");
  if (!editorArea || !preview) return;

  editorArea.style.touchAction = "none";
  preview.style.touchAction = "none";

  editorArea.addEventListener("pointerdown", (e) => {
    if (!rawImageObj || e.target.closest("button")) return;
    isDraggingImg = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    preview.style.transition = "none";
    try {
      editorArea.setPointerCapture(e.pointerId);
    } catch (err) {}
    e.preventDefault();
  });

  editorArea.addEventListener("pointermove", (e) => {
    if (!isDraggingImg || !rawImageObj) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    posX += dx;
    posY += dy;
    preview.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`;
    e.preventDefault();
  });

  const finishDrag = (e) => {
    if (!isDraggingImg) return;
    isDraggingImg = false;
    if (e && typeof e.pointerId === "number") {
      try {
        editorArea.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    applySmartBoundaryAndSnap();
  };

  editorArea.addEventListener("pointerup", finishDrag);
  editorArea.addEventListener("pointercancel", finishDrag);

  editorArea.addEventListener("touchstart", (e) => {
    if (!rawImageObj) return;
    if (e.touches.length === 2) {
      isDraggingImg = false;
      pinchStartDist = getTouchDistance(e.touches[0], e.touches[1]);
      pinchStartScale = imgScale;
    }
  }, { passive: false });

  editorArea.addEventListener("touchmove", (e) => {
    if (!rawImageObj) return;
    if (e.touches.length === 2 && pinchStartDist > 0) {
      e.preventDefault();
      const dist = getTouchDistance(e.touches[0], e.touches[1]);
      setEditorZoomAroundCenter(pinchStartScale * (dist / pinchStartDist));
    }
  }, { passive: false });

  editorArea.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) {
      pinchStartDist = 0;
    }
  });

  editorArea.addEventListener("wheel", (e) => {
    if (!rawImageObj) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setEditorZoomAroundCenter(imgScale * zoomFactor);
  }, { passive: false });
}

function reopenAfterPhotoEditor(slotInfo) {
  if (!OWNER_EDIT_MODE || !slotInfo) return;
  if (slotInfo.reopenCoverModal) {
    openCoverManagerModal();
  } else if (slotInfo.reopenBoxEditModal) {
    openCustomTextStylePopup({
      targetType: "item",
      sIdx: slotInfo.sIdx,
      itemId: slotInfo.itemId,
      modalTitle: slotInfo.modalTitle || "Item Edit",
      initialScrollTop: slotInfo.modalScrollTop || 0
    });
  }
}

function cancelEditor() {
  const slotInfo = pendingOwnerEditSlot ? { ...pendingOwnerEditSlot } : null;
  pendingOwnerEditSlot = null;

  const screen = document.getElementById("screenPhotoEditor");
  const preview = document.getElementById("editorImagePreview");
  if (preview) {
    preview.onload = null;
    preview.onerror = null;
    preview.src = "";
  }
  if (screen) screen.style.display = "none";
  rawImageObj = null;
  onCoverEditorDone = null;
  isDraggingImg = false;
  pinchStartDist = 0;

  reopenAfterPhotoEditor(slotInfo);
}

function confirmEditor() {
  const slotInfo = pendingOwnerEditSlot ? { ...pendingOwnerEditSlot } : null;
  pendingOwnerEditSlot = null;
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
    canvas.width = activeCropConfig.outW || 1080;
    canvas.height = activeCropConfig.outH || 520;
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

    const screen = document.getElementById("screenPhotoEditor");
    if (preview) {
      preview.onload = null;
      preview.onerror = null;
      preview.src = "";
    }
    if (screen) screen.style.display = "none";
    rawImageObj = null;
    isDraggingImg = false;
    pinchStartDist = 0;

    if (typeof cb === "function") {
      cb(croppedUrl);
    }
    reopenAfterPhotoEditor(slotInfo);
  } catch (err) {
    cancelEditor();
    alert("Photo crop failed. Try another photo.");
  }
}

function openCoverPhotoEditor(file, onDone, cropDims = null) {
  if (!file || typeof onDone !== "function") return;
  onCoverEditorDone = onDone;
  ensureCoverEditorDOM();
  applyCropFrameSize(cropDims);

  const screen = document.getElementById("screenPhotoEditor");
  const preview = document.getElementById("editorImagePreview");
  if (screen) screen.style.display = "flex";
  if (!preview) return;

  preview.style.transition = "none";
  preview.src = "";

  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target && e.target.result;
    if (!dataUrl) {
      cancelEditor();
      return;
    }

    const img = new Image();
    img.onerror = function () {
      cancelEditor();
      alert("Could not load image.");
    };
    img.onload = function () {
      rawImageObj = img;
      preview.src = dataUrl;

      setTimeout(() => {
        const area = document.getElementById("editorCanvasArea");
        const box = document.getElementById("cropFrameBox");
        if (!area || !box || !rawImageObj) return;

        const areaRect = area.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const natW = rawImageObj.naturalWidth || rawImageObj.width || 1;
        const natH = rawImageObj.naturalHeight || rawImageObj.height || 1;
        const boxW = boxRect.width || activeCropConfig.frameW || 290;
        const boxH = boxRect.height || activeCropConfig.frameH || 140;

        minScale = Math.max(boxW / natW, boxH / natH) || 1;
        maxScale = minScale * 3.0;
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
      }, 30);
    };
    img.src = dataUrl;
  };
  reader.onerror = function () {
    cancelEditor();
    alert("Failed to read file.");
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
    document.body.appendChild(input);
  }

  input.onchange = async (e) => {
    const file = e.target.files && e.target.files[0];
    const slotInfo = pendingOwnerEditSlot ? { ...pendingOwnerEditSlot } : null;
    e.target.value = "";

    if (!file || !slotInfo) {
      pendingOwnerEditSlot = null;
      return;
    }

    if (slotInfo.type === "cover") {
      openCoverPhotoEditor(file, (adjustedUrl) => {
        const data = getWorkingStoreData();
        if (!Array.isArray(data.coverSlots)) data.coverSlots = [""];
        const slotIdx = Number.isInteger(slotInfo.slotIdx) ? slotInfo.slotIdx : 0;
        while (data.coverSlots.length <= slotIdx) {
          data.coverSlots.push("");
        }
        const wasFirstEmpty = slotIdx === 0 && !data.coverSlots[0];
        data.coverSlots[slotIdx] = adjustedUrl;
        data.coverImg = data.coverSlots.find(Boolean) || adjustedUrl;
        syncCoverOnlyEditState();
        if (wasFirstEmpty) {
          peekNextCoverHint();
        }
      });
    } else if (slotInfo.type === "item") {
      const data = getWorkingStoreData();
      const cropDims = getBoxCropFrameDimensions(data, slotInfo.sIdx);
      openCoverPhotoEditor(file, (croppedUrl) => {
        if (!croppedUrl) return;
        const workingData = getWorkingStoreData();
        const { sIdx, itemId } = slotInfo;
        const item = workingData.sections[sIdx]?.items?.find((i) => i.id === itemId);
        if (item) {
          item.img = croppedUrl;
        }
        syncTargetBoxPhotoOnScreen(sIdx, itemId, croppedUrl);
      }, cropDims);
    }
  };

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
  syncCoverOnlyEditState();
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

  syncCoverOnlyEditState();
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
    priceText: "0",
    priceFontSize: null,
    priceColor: null,
    img: "",
    nameStyle: null
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
    items.push({
      id: `${rowNum}-${Date.now()}-${i}`,
      name: "Item",
      price: 0,
      priceText: "0",
      priceFontSize: null,
      priceColor: null,
      img: "",
      nameStyle: null
    });
  }
  data.sections.push({
    title: "Name",
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
    data.titlePosNorm = {
      rx: maxX > 0 ? rx / maxX : 0,
      ry: maxY > 0 ? ry / maxY : 0
    };
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
  removeOwnerStoreEditUI();

  const fixedEditorColor = getEditorFixedColor();

  // Unified Editor Control Bar with balanced #FF631C accent and crisp white contrast
  const bar = document.createElement("div");
  bar.id = "ownerLiveSaveBar";
  bar.style.cssText =
    `position:sticky;top:0;z-index:80;background:${fixedEditorColor};color:#ffffff;padding:8px 12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 2px 8px rgba(15,23,42,0.16);`;

  const topRow = document.createElement("div");
  topRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";

  const info = document.createElement("span");
  info.textContent = "Store Editor (Draft Mode)";
  info.style.cssText = "font-size:0.82rem;font-weight:700;letter-spacing:0.2px;";

  const primaryActions = document.createElement("div");
  primaryActions.style.cssText = "display:flex;gap:6px;align-items:center;";

  const saveBtn = document.createElement("button");
  saveBtn.id = "ownerLiveSaveBtn";
  saveBtn.type = "button";
  saveBtn.textContent = "Save";
  saveBtn.style.cssText =
    `padding:6px 14px;border:none;border-radius:8px;background:#ffffff;color:${SOFT_POPUP_BTN_TEXT};font-size:0.8rem;font-weight:800;cursor:pointer;`;
  saveBtn.onclick = () => {
    commitDraftStoreData();
    draftStoreData = JSON.parse(JSON.stringify(storeData));
    renderHeader();
    renderSections();
    attachOwnerStoreEditHandlers();
    showBottomSavedPopup("Saved Successfully");
  };

  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.textContent = "Exit";
  backBtn.style.cssText =
    "padding:6px 10px;border:1px solid rgba(255,255,255,0.65);border-radius:8px;background:rgba(255,255,255,0.12);color:#ffffff;font-size:0.78rem;font-weight:700;cursor:pointer;";
  backBtn.onclick = () => {
    setOwnerEditMode(false);
    draftStoreData = null;
    removeOwnerStoreEditUI();
    window.location.href = "index.html";
  };

  primaryActions.appendChild(saveBtn);
  primaryActions.appendChild(backBtn);
  topRow.appendChild(info);
  topRow.appendChild(primaryActions);

  // Unified Tools Row (Cover controls live inside Cover Settings)
  const toolsRow = document.createElement("div");
  toolsRow.style.cssText = "display:flex;gap:6px;align-items:center;flex-wrap:wrap;";

  const makeToolBtn = (label, onClickFn, isHighlighted = false) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.style.cssText = isHighlighted
      ? `padding:5px 10px;border:1px solid #ffffff;border-radius:8px;background:#ffffff;color:${SOFT_POPUP_BTN_TEXT};font-size:0.76rem;font-weight:800;cursor:pointer;`
      : "padding:5px 10px;border:1px solid rgba(255,255,255,0.55);border-radius:8px;background:rgba(255,255,255,0.16);color:#ffffff;font-size:0.76rem;font-weight:700;cursor:pointer;";
    btn.onclick = (e) => {
      e.stopPropagation();
      onClickFn();
    };
    return btn;
  };

  const allStripsHidden = Array.isArray(data.sections) && data.sections.length > 0 && data.sections.every((s) => Boolean(s.barHidden));

  toolsRow.appendChild(makeToolBtn("Store Name", () => openStoreNameEditorPopup()));
  toolsRow.appendChild(makeToolBtn("Cover", () => openCoverManagerModal()));
  toolsRow.appendChild(makeToolBtn("All Boxes", () => openBoxSizePanelModal(null)));
  toolsRow.appendChild(makeToolBtn("Theme Color", () => openCustomColourPickerModal()));
  toolsRow.appendChild(
    makeToolBtn(
      allStripsHidden ? "Show All Strips" : "Hide All Strips",
      () => {
        const targetHide = !allStripsHidden;
        (data.sections || []).forEach((s) => {
          s.barHidden = targetHide;
        });
        renderSections();
        attachOwnerStoreEditHandlers();
      },
      allStripsHidden
    )
  );

  bar.appendChild(topRow);
  bar.appendChild(toolsRow);
  document.body.prepend(bar);

  // Keep cover area clean; only Store Name drag is active on cover
  const coverWrap = document.querySelector(".cover-wrapper");
  if (coverWrap) {
    coverWrap.style.position = "relative";
    coverWrap.style.overflow = "hidden";

    const overlayEl = typeof ensureCoverStoreTitleElements === "function"
      ? ensureCoverStoreTitleElements(coverWrap).overlayEl
      : coverWrap.querySelector(".cover-overlay");
    const titleEl = document.getElementById("storeTitle");
    if (overlayEl && titleEl) {
      overlayEl.style.setProperty("z-index", "22", "important");
      overlayEl.style.setProperty("display", "inline-flex", "important");
      enableStoreNameDragOnCover(coverWrap, overlayEl);
    }
  }

  // Row Controls
  const sectionEls = document.querySelectorAll("#sectionsContainer .row-section");
  sectionEls.forEach((secEl, sIdx) => {
    const sec = data.sections[sIdx];
    if (!sec) return;

    const stripEl = secEl.querySelector(".strip-bar");
    const stripTitle = secEl.querySelector(".strip-title");
    if (stripEl && stripTitle) {
      const stripControlsWrap = document.createElement("div");
      stripControlsWrap.className = "owner-inline-edit-btn";
      stripControlsWrap.style.cssText = "margin-left:auto;display:flex;align-items:center;gap:4px;";

      const secEditBtn = document.createElement("button");
      secEditBtn.type = "button";
      secEditBtn.textContent = "Edit Name";
      secEditBtn.style.cssText =
        "padding:3px 7px;border:1px solid #e2e8f0;border-radius:6px;background:#ffffff;color:#111827;font-size:0.72rem;font-weight:700;cursor:pointer;";
      secEditBtn.onclick = (e) => {
        e.stopPropagation();
        openCustomTextStylePopup({
          targetType: "section",
          sIdx,
          modalTitle: `Row ${sIdx + 1} Strip Name & Style`
        });
      };

      const stripHeightBtn = document.createElement("button");
      stripHeightBtn.type = "button";
      stripHeightBtn.textContent = "Strip Style";
      stripHeightBtn.style.cssText =
        "padding:3px 7px;border:1px solid #e2e8f0;border-radius:6px;background:#ffffff;color:#111827;font-size:0.72rem;font-weight:700;cursor:pointer;";
      stripHeightBtn.onclick = (e) => {
        e.stopPropagation();
        openStripHeightEditorModal(sIdx, stripEl);
      };

      const hideStripBtn = document.createElement("button");
      hideStripBtn.type = "button";
      hideStripBtn.textContent = "Hide";
      hideStripBtn.style.cssText =
        "padding:3px 7px;border:1px solid #fecaca;border-radius:6px;background:#fff5f5;color:#b91c1c;font-size:0.72rem;font-weight:700;cursor:pointer;";
      hideStripBtn.onclick = (e) => {
        e.stopPropagation();
        sec.barHidden = true;
        renderSections();
        attachOwnerStoreEditHandlers();
      };

      stripControlsWrap.appendChild(secEditBtn);
      stripControlsWrap.appendChild(stripHeightBtn);
      stripControlsWrap.appendChild(hideStripBtn);
      stripEl.appendChild(stripControlsWrap);
    } else if (sec.barHidden) {
      const restoreBarRow = document.createElement("div");
      restoreBarRow.className = "owner-inline-edit-btn";
      restoreBarRow.style.cssText =
        "display:flex;justify-content:flex-start;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;";

      const addStripBtn = document.createElement("button");
      addStripBtn.type = "button";
      addStripBtn.textContent = `+ Strip ${sIdx + 1}`;
      addStripBtn.style.cssText =
        `padding:4px 10px;border:1px solid ${SOFT_POPUP_BTN_BORDER};border-radius:8px;background:${SOFT_POPUP_BTN_BG};color:${SOFT_POPUP_BTN_TEXT};font-size:0.75rem;font-weight:700;cursor:pointer;`;
      addStripBtn.onclick = (e) => {
        e.stopPropagation();
        sec.barHidden = false;
        sec.customAd = null;
        renderSections();
        attachOwnerStoreEditHandlers();
      };

      const addAdBtn = document.createElement("button");
      addAdBtn.type = "button";
      addAdBtn.textContent = sec.customAd ? "Edit Ad" : "+ Ad";
      addAdBtn.style.cssText =
        "padding:4px 10px;border:1px solid #e2e8f0;border-radius:8px;background:#ffffff;color:#111827;font-size:0.75rem;font-weight:700;cursor:pointer;";
      addAdBtn.onclick = (e) => {
        e.stopPropagation();
        openCustomAdEditorModal(sIdx);
      };

      restoreBarRow.appendChild(addStripBtn);
      restoreBarRow.appendChild(addAdBtn);
      secEl.prepend(restoreBarRow);
    }

    // Single 'Edit' button per box; opens the unified bottom-sheet editor with Name, Photo & Price
    const topRowLimit = Math.min(MAX_TOP_ROW_BOXES, Math.max(0, Number(data.indexBoxLimit ?? MAX_TOP_ROW_BOXES)));
    const cards = secEl.querySelectorAll(".mini-box:not(.user-photo-only-box), .item-box");
    cards.forEach((card, idx) => {
      const item = sIdx === 0 ? sec.items.slice(0, topRowLimit)[idx] : sec.items[idx];
      if (!item) return;

      card.style.position = "relative";

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "owner-inline-edit-btn";
      editBtn.textContent = "Edit";
      editBtn.title = "Edit Name, Photo & Price";
      editBtn.style.cssText =
        `position:absolute;top:6px;right:6px;z-index:4;padding:2px 7px;border:1px solid ${SOFT_POPUP_BTN_BORDER};border-radius:5px;background:${SOFT_POPUP_BTN_BG};color:${SOFT_POPUP_BTN_TEXT};font-size:0.68rem;font-weight:700;cursor:pointer;`;
      editBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCustomTextStylePopup({
          targetType: "item",
          sIdx,
          itemId: item.id,
          modalTitle: `Row ${sIdx + 1} Item Edit`
        });
      };
      card.appendChild(editBtn);
    });

    const boxContainerEl = sIdx === 0 ? secEl.querySelector(".five-boxes-row") : secEl.querySelector(".scroll-row");
    if (boxContainerEl) {
      const underRowBar = document.createElement("div");
      underRowBar.className = "owner-inline-edit-btn";
      underRowBar.style.cssText =
        "display:flex;justify-content:flex-start;align-items:center;gap:6px;margin-top:6px;width:100%;flex-wrap:wrap;";

      const rowBoxSizeBtn = document.createElement("button");
      rowBoxSizeBtn.type = "button";
      rowBoxSizeBtn.textContent = `Row ${sIdx + 1} Box Size`;
      rowBoxSizeBtn.style.cssText =
        `padding:4px 10px;border:1px solid ${SOFT_POPUP_BTN_BORDER};border-radius:8px;background:${SOFT_POPUP_BTN_BG};color:${SOFT_POPUP_BTN_TEXT};font-size:0.74rem;font-weight:800;cursor:pointer;`;
      rowBoxSizeBtn.onclick = (e) => {
        e.stopPropagation();
        openBoxSizePanelModal(sIdx);
      };

      const addBoxBtn = document.createElement("button");
      addBoxBtn.type = "button";
      addBoxBtn.textContent = "+ Add Box";
      addBoxBtn.style.cssText =
        "padding:4px 10px;border:1px solid #e2e8f0;border-radius:8px;background:#ffffff;color:#111827;font-size:0.74rem;font-weight:700;cursor:pointer;";
      addBoxBtn.onclick = (e) => {
        e.stopPropagation();
        addBoxToSection(sIdx);
      };

      const remBoxBtn = document.createElement("button");
      remBoxBtn.type = "button";
      remBoxBtn.textContent = "- Remove Box";
      remBoxBtn.style.cssText =
        "padding:4px 10px;border:1px solid #fecaca;border-radius:8px;background:#fff5f5;color:#b91c1c;font-size:0.74rem;font-weight:700;cursor:pointer;";
      remBoxBtn.onclick = (e) => {
        e.stopPropagation();
        removeBoxFromSection(sIdx);
      };

      underRowBar.appendChild(rowBoxSizeBtn);
      underRowBar.appendChild(addBoxBtn);
      underRowBar.appendChild(remBoxBtn);
      boxContainerEl.insertAdjacentElement("afterend", underRowBar);
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
    addRowBtn.textContent = "+ Add Row";
    addRowBtn.style.cssText =
      `flex:1;padding:10px 14px;border:1px solid ${SOFT_POPUP_BTN_BORDER};border-radius:12px;background:${SOFT_POPUP_BTN_BG};color:${SOFT_POPUP_BTN_TEXT};font-size:0.86rem;font-weight:700;cursor:pointer;`;
    addRowBtn.onclick = () => addBottomStoreRow();

    const remRowBtn = document.createElement("button");
    remRowBtn.type = "button";
    remRowBtn.className = "owner-inline-edit-btn";
    remRowBtn.textContent = "- Remove Row";
    remRowBtn.style.cssText =
      "padding:10px 14px;border:1px solid #fecaca;border-radius:12px;background:#fff5f5;color:#b91c1c;font-size:0.86rem;font-weight:700;cursor:pointer;";
    remRowBtn.onclick = () => removeBottomStoreRow();

    bottomControls.appendChild(addRowBtn);
    bottomControls.appendChild(remRowBtn);
    sectionsContainer.insertAdjacentElement("afterend", bottomControls);
  }

  if (typeof syncStripBarCornerDesign === "function") {
    syncStripBarCornerDesign();
  }
}

if (document.body.getAttribute("data-page") === "store" && OWNER_EDIT_MODE) {
  if (!draftStoreData) initDraftStoreData();
  renderHeader();
  renderSections();
  attachOwnerStoreEditHandlers();
}
