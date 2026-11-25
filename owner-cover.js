function openCoverPhotoEditor(file, onDone) {
  if (!file || typeof onDone !== "function") return;
  onCoverEditorDone = onDone;
  ensureCoverEditorDOM();

  const screen = document.getElementById("screenPhotoEditor");
  const preview = document.getElementById("editorImagePreview");
  if (!screen || !preview) return;

  rawImageObj = null;
  isDraggingImg = false;
  initialPinchDistance = null;
  posX = 0;
  posY = 0;
  imgScale = 1;
  baseLeft = 0;
  baseTop = 0;

  preview.onload = null;
  preview.onerror = null;
  preview.style.transition = "none";
  preview.style.transform = "translate3d(0px, 0px, 0px)";
  preview.style.width = "auto";
  preview.style.height = "auto";
  preview.src = "";

  screen.style.display = "flex";

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

      const placeImageInFrame = () => {
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
        posX = 0;
        posY = 0;

        preview.style.left = baseLeft + "px";
        preview.style.top = baseTop + "px";
        preview.style.transform = "translate3d(0px, 0px, 0px)";
      };

      requestAnimationFrame(() => {
        placeImageInFrame();
        setTimeout(placeImageInFrame, 40);
      });
    };
    img.src = dataUrl;
  };
  reader.onerror = function () {
    cancelEditor();
    alert("Failed to read file.");
  };
  reader.readAsDataURL(file);
}
