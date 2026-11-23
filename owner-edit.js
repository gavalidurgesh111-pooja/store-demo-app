let coverEditorEventsBound = false;

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
