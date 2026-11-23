// ==================== INSTAGRAM FEED SIZE POP-UP PHOTO EDITOR (#screenPhotoEditor) ====================
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
      <div class="editor-popup-card" style="width:100%;max-width:320px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 28px rgba(0,0,0,0.4);display:flex;flex-direction:column;">
        <div class="editor-canvas-area" id="editorCanvasArea" style="width:100%;height:290px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;touch-action:none;background:#1e293b;">
          <img id="editorImagePreview" src="" alt="Preview" style="position:absolute;cursor:grab;user-select:none;z-index:5;display:block;max-width:none;max-height:none;will-change:transform;transform:translate3d(0, 0, 0);" />
          <div class="crop-frame-box" id="cropFrameBox" style="width:260px;height:260px;border:2px solid #ffffff;box-shadow:0 0 0 9999px rgba(0, 0, 0, 0.5);position:relative;pointer-events:none;z-index:10;"></div>
        </div>
        <div class="editor-bottom-bar" style="width:100%;height:46px;background:#ffffff;display:flex;justify-content:space-between;align-items:center;padding:0 20px;z-index:25;border-top:1px solid #e2e8f0;">
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

function applySmartBoundaryAndSnap() {
  const preview = document.getElementById("editorImagePreview");
  const box = document.getElementById("cropFrameBox")?.getBoundingClientRect();
  if (!preview || !box || !rawImageObj) return;

  const renderW = rawImageObj.width * imgScale;
  const renderH = rawImageObj.height * imgScale;

  const currentLeft = baseLeft + posX;
  const currentTop = baseTop + posY;

  const minX = box.right - renderW;
  const maxX = box.left;
  const minY = box.bottom - renderH;
  const maxY = box.top;

  const clampedLeft = Math.max(minX, Math.min(maxX, currentLeft));
  const clampedTop = Math.max(minY, Math.min(maxY, currentTop));

  if (clampedLeft !== currentLeft || clampedTop !== currentTop) {
    preview.style.transition = "transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    posX = clampedLeft - baseLeft;
    posY = clampedTop - baseTop;
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
    const newScale = imgScale * zoomFactor;
    if (newScale >= minScale && newScale <= maxScale) {
      imgScale = newScale;
      const renderW = rawImageObj.width * imgScale;
      const renderH = rawImageObj.height * imgScale;
      preview.style.width = renderW + "px";
      preview.style.height = renderH + "px";
      applySmartBoundaryAndSnap();
    }
  }, { passive: false });

  window.addEventListener("touchstart", (e) => {
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
  });

  window.addEventListener("touchmove", (e) => {
    if (!rawImageObj) return;
    if (e.touches.length === 1 && isDraggingImg) {
      posX += (e.touches[0].clientX - startMouseX) * 1.25;
      posY += (e.touches[0].clientY - startMouseY) * 1.25;
      startMouseX = e.touches[0].clientX;
      startMouseY = e.touches[0].clientY;
      preview.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`;
      e.preventDefault();
    } else if (e.touches.length === 2 && initialPinchDistance !== null) {
      const currentPinchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const zoomFactor = currentPinchDistance / initialPinchDistance;
      const newScale = imgScale * zoomFactor;
      if (newScale >= minScale && newScale <= maxScale) {
        imgScale = newScale;
        const renderW = rawImageObj.width * imgScale;
        const renderH = rawImageObj.height * imgScale;
        preview.style.width = renderW + "px";
        preview.style.height = renderH + "px";
      }
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
  canvas.width = 900;
  canvas.height = Math.round(900 / (box.width / box.height));
  const ctx = canvas.getContext("2d");

  const previewRect = preview.getBoundingClientRect();
  const renderedWidth = previewRect.width || (rawImageObj.width * imgScale);
  const renderedHeight = previewRect.height || (rawImageObj.height * imgScale);

  const sX = ((box.left - previewRect.left) / renderedWidth) * rawImageObj.width;
  const sY = ((box.top - previewRect.top) / renderedHeight) * rawImageObj.height;
  const sW = (box.width / renderedWidth) * rawImageObj.width;
  const sH = (box.height / renderedHeight) * rawImageObj.height;

  ctx.drawImage(rawImageObj, sX, sY, sW, sH, 0, 0, canvas.width, canvas.height);
  const croppedUrl = canvas.toDataURL("image/jpeg", 0.85);

  if (preview) preview.src = "";
  document.getElementById("screenPhotoEditor").style.display = "none";
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
    document.getElementById("screenPhotoEditor").style.display = "flex";
    const preview = document.getElementById("editorImagePreview");
    preview.style.transition = "none";
    preview.src = e.target.result;

    rawImageObj.onload = function () {
      requestAnimationFrame(() => {
        const areaRect = document.getElementById("editorCanvasArea").getBoundingClientRect();
        const boxRect = document.getElementById("cropFrameBox").getBoundingClientRect();
        minScale = Math.max(boxRect.width / rawImageObj.width, boxRect.height / rawImageObj.height);
        maxScale = minScale * 2.5;
        imgScale = minScale;

        const renderW = rawImageObj.width * imgScale;
        const renderH = rawImageObj.height * imgScale;
        preview.style.width = renderW + "px";
        preview.style.height = renderH + "px";

        const centerX = (boxRect.left + boxRect.right) / 2 - areaRect.left;
        const centerY = (boxRect.top + boxRect.bottom) / 2 - areaRect.top;

        baseLeft = centerX - renderW / 2;
        baseTop = centerY - renderH / 2;

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
