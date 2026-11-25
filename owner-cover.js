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

  const minLeftRel = boxRightRel - renderW;
  const maxLeftRel = boxLeftRel;
  const minTopRel = boxBottomRel - renderH;
  const maxTopRel = boxTopRel;

  const clampedLeftRel = renderW >= boxRect.width
    ? Math.max(minLeftRel, Math.min(maxLeftRel, currentLeftRel))
    : currentLeftRel;
  const clampedTopRel = renderH >= boxRect.height
    ? Math.max(minTopRel, Math.min(maxTopRel, currentTopRel))
    : currentTopRel;

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
    if (!rawImageObj || e.target.closest("button")) return;
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
    if (!rawImageObj || e.target.closest("button")) return;
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
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const previewRect = preview.getBoundingClientRect();
    const natW = rawImageObj.naturalWidth || rawImageObj.width || 1;
    const natH = rawImageObj.naturalHeight || rawImageObj.height || 1;
    const renderedWidth = previewRect.width || (natW * imgScale) || 1;
    const renderedHeight = previewRect.height || (natH * imgScale) || 1;

    const rawSX = ((box.left - previewRect.left) / renderedWidth) * natW;
    const rawSY = ((box.top - previewRect.top) / renderedHeight) * natH;
    const rawSW = (box.width / renderedWidth) * natW;
    const rawSH = (box.height / renderedHeight) * natH;

    const sX = Math.max(0, Math.min(natW - 1, rawSX));
    const sY = Math.max(0, Math.min(natH - 1, rawSY));
    const sW = Math.max(1, Math.min(natW - sX, rawSW - Math.max(0, -rawSX)));
    const sH = Math.max(1, Math.min(natH - sY, rawSH - Math.max(0, -rawSY)));

    ctx.drawImage(rawImageObj, sX, sY, sW, sH, 0, 0, canvas.width, canvas.height);
    const croppedUrl = canvas.toDataURL("image/jpeg", 0.82);

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
  isDraggingImg = false;
  initialPinchDistance = null;

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
