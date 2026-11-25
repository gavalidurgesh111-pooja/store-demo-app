console.log("OWNER_EDIT_COMPLETE_V9");

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
  if (editorScreen) {
    editorScreen.remove();
    coverEditorEventsBound = false;
  }
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

function openStandaloneColorPicker(initialColor, onChooseColor, onCancelRestore) {
  removeCustomPickerIfExists();
  const previousColor = initialColor || "#0f766e";
  let hue = 0;
  let sat = 0.85;
  let val = 0.85;

  const modal = document.createElement("div");
  modal.id = "ownerCustomColorPickerModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:160;background:rgba(15,23,42,0.62);display:flex;align-items:center;justify-content:center;padding:12px;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:440px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.35);";

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
    if (typeof onCancelRestore === "function") {
      onCancelRestore(previousColor);
    }
    modal.remove();
  };

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "✕";
  closeBtn.style.cssText =
    "border:none;background:transparent;font-size:1.15rem;font-weight:700;color:#475569;cursor:pointer;padding:6px 10px;min-width:36px;min-height:36px;";
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
    "display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:14px;";

  const selectedNameText = document.createElement("span");
  selectedNameText.style.cssText = "font-size:0.9rem;font-weight:700;color:#111827;";

  const btnGroup = document.createElement("div");
  btnGroup.style.cssText = "display:flex;gap:8px;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cssText =
    "padding:9px 14px;min-height:40px;border:1px solid #cbd5e1;border-radius:8px;background:#ffffff;color:#334155;font-weight:600;cursor:pointer;";
  cancelBtn.onclick = closeModalAndRestore;

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.style.cssText =
    "padding:9px 16px;min-height:40px;border:none;border-radius:8px;background:#0f766e;color:#ffffff;font-weight:700;cursor:pointer;";

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

function openCustomColourPickerModal() {
  const data = getWorkingStoreData();
  const previousColor = data.themeColor || "#0f766e";
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
  valBadge.style.cssText = `font-size:0.84rem;font-weight:700;color:${accentHex};`;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = String(min);
  slider.max = String(max);
  slider.step = String(step);
  slider.value = String(initialVal);
  slider.style.cssText = "width:100%;height:26px;cursor:pointer;touch-action:pan-y;";
  slider.oninput = () => {
    const num = Number(slider.value);
    valBadge.textContent = `${num}${unitSuffix}`;
    onChange(num);
  };

  top.appendChild(lbl);
  top.appendChild(valBadge);
  wrap.appendChild(top);
  wrap.appendChild(slider);
  return wrap;
}

function makeToggleColorBox(titleText, enabledVal, colorVal, accentHex, onToggle, onColorChange) {
  const box = document.createElement("div");
  box.style.cssText =
    "border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:11px;display:flex;flex-direction:column;gap:10px;";

  const head = document.createElement("div");
  head.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";

  const toggleLabel = document.createElement("label");
  toggleLabel.style.cssText =
    "display:flex;align-items:center;gap:8px;min-height:36px;font-size:0.88rem;font-weight:700;color:#111827;cursor:pointer;flex:1;";

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.checked = Boolean(enabledVal);
  chk.style.cssText = "width:20px;height:20px;cursor:pointer;flex-shrink:0;";
  chk.onchange = () => onToggle(chk.checked);

  const txt = document.createElement("span");
  txt.textContent = titleText;

  toggleLabel.appendChild(chk);
  toggleLabel.appendChild(txt);

  const colorBtn = document.createElement("button");
  colorBtn.type = "button";
  colorBtn.textContent = "Colour";
  colorBtn.style.cssText =
    `min-height:34px;padding:4px 10px;border:2px solid #cbd5e1;border-radius:8px;background:${colorVal || "#38bdf8"};color:#ffffff;text-shadow:0 1px 2px rgba(0,0,0,0.75);font-size:0.78rem;font-weight:700;cursor:pointer;flex-shrink:0;`;
  colorBtn.onclick = () => {
    openStandaloneColorPicker(colorBtn.style.background || colorVal || "#38bdf8", (hex) => {
      colorBtn.style.background = hex;
      onColorChange(hex);
    });
  };

  head.appendChild(toggleLabel);
  head.appendChild(colorBtn);
  box.appendChild(head);

  const extraWrap = document.createElement("div");
  extraWrap.style.cssText = "display:flex;flex-direction:column;gap:8px;";
  box.appendChild(extraWrap);

  return { box, extraWrap, chk, colorBtn };
}

function openCustomTextStylePopup(config) {
  const existing = document.getElementById("ownerStoreNameModal");
  if (existing) existing.remove();

  const data = getWorkingStoreData();
  const accentHex = data.themeColor || "#0f766e";

  const isStore = config.targetType === "store";
  const isSection = config.targetType === "section";
  const secObj = isSection || config.targetType === "item" ? data.sections[config.sIdx] : null;
  const itemObj = config.targetType === "item" ? secObj?.items?.find((i) => i.id === config.itemId) : null;

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

  const modal = document.createElement("div");
  modal.id = "ownerStoreNameModal";
  modal.style.cssText =
    "position:fixed;inset:0;z-index:125;background:rgba(15,23,42,0.72);display:flex;align-items:flex-start;justify-content:center;padding:8px;overflow-y:auto;";

  const card = document.createElement("div");
  card.style.cssText =
    "width:100%;max-width:100%;background:#ffffff;border-radius:14px;padding:12px 14px 16px;box-shadow:0 12px 32px rgba(0,0,0,0.38);display:flex;flex-direction:column;gap:12px;";

  const stickyHeader = document.createElement("div");
  stickyHeader.style.cssText =
    "position:sticky;top:0;z-index:20;background:#ffffff;padding-bottom:8px;border-bottom:1px solid #e2e8f0;display:flex;flex-direction:column;gap:8px;";

  const topBar = document.createElement("div");
  topBar.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";

  const heading = document.createElement("div");
  heading.textContent = config.modalTitle || "Name & Style";
  heading.style.cssText = "font-size:1.02rem;font-weight:800;color:#111827;";

  const topCloseBtn = document.createElement("button");
  topCloseBtn.type = "button";
  topCloseBtn.textContent = "✕";
  topCloseBtn.style.cssText =
    "border:none;background:#f1f5f9;border-radius:8px;min-width:34px;min-height:34px;font-size:1rem;font-weight:700;color:#334155;cursor:pointer;";
  topCloseBtn.onclick = () => modal.remove();

  topBar.appendChild(heading);
  topBar.appendChild(topCloseBtn);

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = currentText;
  textInput.placeholder = "Paste or type name (no changes)";
  textInput.style.cssText =
    "width:100%;min-height:40px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:10px;font-size:0.96rem;color:#111827;box-sizing:border-box;";

  const previewBox = document.createElement("div");
  previewBox.style.cssText =
    `padding:10px 12px;border-radius:10px;background:${isStore ? "#1e293b" : "#f1f5f9"};min-height:46px;max-height:92px;overflow:auto;display:flex;align-items:center;justify-content:center;`;

  const previewText = document.createElement("span");
  previewText.style.cssText = "display:inline-block;line-height:0.92;white-space:nowrap;";
  previewBox.appendChild(previewText);

  stickyHeader.appendChild(topBar);
  stickyHeader.appendChild(textInput);
  stickyHeader.appendChild(previewBox);

  let glowCtrl;
  let borderCtrl;
  let bgCtrl;
  let textColorTriggerBtn;
  let fontSelectEl;

  function syncAllControlsFromState() {
    if (textColorTriggerBtn) {
      textColorTriggerBtn.style.background = st.color || "#ffffff";
    }
    if (glowCtrl) {
      glowCtrl.chk.checked = Boolean(st.glowEnabled);
      glowCtrl.colorBtn.style.background = st.glowColor || "#38bdf8";
    }
    if (borderCtrl) {
      borderCtrl.chk.checked = Boolean(st.borderEnabled);
      borderCtrl.colorBtn.style.background = st.borderColor || "#0f172a";
    }
    if (bgCtrl) {
      bgCtrl.chk.checked = Boolean(st.bgEnabled);
      bgCtrl.colorBtn.style.background = st.bgColor || "#0f172a";
    }
    if (fontSelectEl) {
      const matchedIdx = STORE_FONT_OPTIONS.findIndex(
        (opt) => opt.value === st.fontFamily && (opt.italic ? "italic" : "normal") === st.fontStyle
      );
      if (matchedIdx >= 0) fontSelectEl.value = String(matchedIdx);
    }
  }

  function syncPreview() {
    previewText.textContent = textInput.value.length > 0
      ? textInput.value
      : (isStore ? "Store Name" : isSection ? "Name" : "Item");
    applyTextStyleToElement(previewText, st);
    previewText.style.lineHeight = "0.92";
    if (!st.bgEnabled) {
      previewText.style.padding = "0px";
      previewText.style.borderRadius = "0px";
    }
  }

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
      label: "Thin Border",
      apply: () => {
        st.borderEnabled = true;
        st.borderColor = "#0f172a";
        st.borderWidth = getSafeThinBorderWidth(st.fontSize, 0.8);
        st.fontWeight = 800;
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

  presets.forEach((p) => {
    const pBtn = document.createElement("button");
    pBtn.type = "button";
    pBtn.textContent = p.label;
    pBtn.style.cssText =
      "min-height:40px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;color:#111827;font-size:0.84rem;font-weight:700;cursor:pointer;";
    pBtn.onclick = () => {
      p.apply();
      syncAllControlsFromState();
      syncPreview();
    };
    presetWrap.appendChild(pBtn);
  });

  textInput.oninput = syncPreview;

  const mainColorRow = document.createElement("div");
  mainColorRow.style.cssText =
    "display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:10px 12px;";

  const mainColorLbl = document.createElement("span");
  mainColorLbl.textContent = "Text Colour";
  mainColorLbl.style.cssText = "font-size:0.88rem;font-weight:700;color:#111827;cursor:pointer;flex:1;";

  textColorTriggerBtn = document.createElement("button");
  textColorTriggerBtn.type = "button";
  textColorTriggerBtn.textContent = "Pick Colour";
  textColorTriggerBtn.style.cssText =
    `min-height:36px;padding:6px 12px;border:2px solid #cbd5e1;border-radius:8px;background:${st.color || "#ffffff"};color:#ffffff;text-shadow:0 1px 2px rgba(0,0,0,0.8);font-size:0.82rem;font-weight:700;cursor:pointer;`;

  const triggerTextColorPicker = () => {
    openStandaloneColorPicker(st.color || "#ffffff", (hex) => {
      st.color = hex;
      textColorTriggerBtn.style.background = hex;
      syncPreview();
    });
  };

  mainColorLbl.onclick = triggerTextColorPicker;
  textColorTriggerBtn.onclick = triggerTextColorPicker;

  mainColorRow.appendChild(mainColorLbl);
  mainColorRow.appendChild(textColorTriggerBtn);

  const fontWrap = document.createElement("div");
  fontWrap.style.cssText =
    "display:flex;flex-direction:column;gap:8px;border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:10px 12px;";

  const fontLbl = document.createElement("label");
  fontLbl.textContent = "Font Style (100)";
  fontLbl.style.cssText = "font-size:0.88rem;font-weight:700;color:#111827;";

  fontSelectEl = document.createElement("select");
  fontSelectEl.size = 6;
  fontSelectEl.style.cssText =
    "width:100%;max-height:150px;overflow-y:auto;padding:6px 8px;border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;color:#111827;font-size:0.88rem;font-weight:600;cursor:pointer;";

  STORE_FONT_OPTIONS.forEach((opt, idx) => {
    const optionEl = document.createElement("option");
    optionEl.value = String(idx);
    optionEl.textContent = opt.label;
    optionEl.style.fontFamily = opt.value;
    optionEl.style.fontStyle = opt.italic ? "italic" : "normal";
    optionEl.style.padding = "5px 6px";
    fontSelectEl.appendChild(optionEl);
  });

  fontSelectEl.onchange = () => {
    const idx = Number(fontSelectEl.value);
    const chosen = STORE_FONT_OPTIONS[idx] || STORE_FONT_OPTIONS[0];
    st.fontFamily = chosen.value;
    st.fontStyle = chosen.italic ? "italic" : "normal";
    syncPreview();
  };

  fontWrap.appendChild(fontLbl);
  fontWrap.appendChild(fontSelectEl);

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
    "Glow (चमक)",
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

  const maxThinSlider = Math.max(0.7, Math.min(1.5, Number((st.fontSize * 0.06).toFixed(1))));
  borderCtrl = makeToggleColorBox(
    "Thin Border (पतली बॉर्डर)",
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
    makeLabeledSlider("Border Width (Thin)", 0.5, maxThinSlider, 0.1, st.borderWidth, "px", accentHex, (val) => {
      st.borderWidth = getSafeThinBorderWidth(st.fontSize, val);
      syncPreview();
    })
  );

  bgCtrl = makeToggleColorBox(
    "Background (बैकग्राउंड)",
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

  const footer = document.createElement("div");
  footer.style.cssText = "display:flex;gap:10px;margin-top:4px;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cssText =
    "flex:1;min-height:44px;padding:9px 14px;border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;color:#334155;font-weight:700;cursor:pointer;";
  cancelBtn.onclick = () => modal.remove();

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.style.cssText =
    `flex:1;min-height:44px;padding:9px 16px;border:none;border-radius:10px;background:${accentHex};color:#ffffff;font-weight:700;cursor:pointer;`;
  applyBtn.onclick = () => {
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
      modal.remove();
      renderSections();
      attachOwnerStoreEditHandlers();
    } else if (itemObj) {
      itemObj.name = finalText;
      itemObj.nameStyle = { ...st };
      modal.remove();
      renderSections();
      attachOwnerStoreEditHandlers();
    }
  };

  footer.appendChild(cancelBtn);
  footer.appendChild(applyBtn);

  card.appendChild(stickyHeader);
  card.appendChild(presetWrap);
  card.appendChild(mainColorRow);
  card.appendChild(fontWrap);
  card.appendChild(sizeSlider);
  card.appendChild(weightSlider);
  card.appendChild(glowCtrl.box);
  card.appendChild(borderCtrl.box);
  card.appendChild(bgCtrl.box);
  card.appendChild(footer);

  modal.appendChild(card);
  document.body.appendChild(modal);

  syncAllControlsFromState();
  syncPreview();
}

function openStoreNameEditorPopup() {
  openCustomTextStylePopup({
    targetType: "store",
    modalTitle: "Store Name & Style"
  });
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
    coverEditorEventsBound = false;
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

  editorArea.addEventListener("wheel", (e) => {
    if (!rawImageObj) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setEditorZoomAroundCenter(imgScale * zoomFactor);
  }, { passive: false });
}

function cancelEditor() {
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
  initialPinchDistance = null;
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

    cancelEditor();
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
    pendingOwnerEditSlot = null;
    e.target.value = "";

    if (!file || !slotInfo) return;

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
    items.push({ id: `${rowNum}-${Date.now()}-${i}`, name: "Item", price: 0, img: "", nameStyle: null });
  }
  data.sections.push({
    title: "Name",
    items,
    titleStyle: null
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
      pencilBtn.title = "Edit Store Name & Style";
      pencilBtn.style.cssText =
        "position:static;transform:none;flex-shrink:0;padding:2px 6px;margin:0;border:1px solid #0f172a;border-radius:4px;background:rgba(255,255,255,0.92);color:#0f172a;font-size:0.75rem;font-weight:700;line-height:1;cursor:pointer;";
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
      secEditBtn.title = "Edit Name & Style";
      secEditBtn.style.cssText =
        "margin-left:8px;padding:3px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;color:#111827;font-size:0.78rem;font-weight:700;cursor:pointer;";
      secEditBtn.onclick = (e) => {
        e.stopPropagation();
        openCustomTextStylePopup({
          targetType: "section",
          sIdx,
          modalTitle: `Section ${sIdx + 1} Name & Style`
        });
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
        nameBtn.title = "Edit Name & Style";
        nameBtn.style.cssText =
          "margin-left:4px;padding:1px 6px;border:1px solid #cbd5e1;border-radius:5px;background:#f1f5f9;color:#111827;font-size:0.72rem;font-weight:700;cursor:pointer;";
        nameBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          openCustomTextStylePopup({
            targetType: "item",
            sIdx,
            itemId: item.id,
            modalTitle: "Item Name & Style"
          });
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

if (document.body.getAttribute("data-page") === "store" && OWNER_EDIT_MODE) {
  if (!draftStoreData) initDraftStoreData();
  renderHeader();
  renderSections();
  attachOwnerStoreEditHandlers();
}
