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
