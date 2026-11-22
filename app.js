const OWNER_EDIT_PARAM = new URLSearchParams(window.location.search).get("ownerEdit") === "1";
let activeOwnerPhotoSlot = null;

function readStoreForLiveView() {
  if (typeof storeData !== "undefined" && storeData && typeof storeData === "object") {
    return storeData;
  }
  try {
    return JSON.parse(localStorage.getItem("storeData") || "{}");
  } catch (err) {
    return {};
  }
}

function writeStoreForLiveView(nextData) {
  if (typeof storeData !== "undefined" && storeData && typeof storeData === "object") {
    Object.keys(storeData).forEach((k) => delete storeData[k]);
    Object.assign(storeData, nextData);
  }
  try {
    localStorage.setItem("storeData", JSON.stringify(nextData));
  } catch (err) {}
  if (typeof saveState === "function") {
    saveState();
  }
}

function ensureOwnerPhotoPicker() {
  let picker = document.getElementById("ownerStorePhotoPicker");
  if (!picker) {
    picker = document.createElement("input");
    picker.type = "file";
    picker.id = "ownerStorePhotoPicker";
    picker.accept = "image/*";
    picker.style.display = "none";
    picker.addEventListener("change", (ev) => {
      const file = ev.target.files && ev.target.files[0];
      if (!file || !activeOwnerPhotoSlot) return;
      const reader = new FileReader();
      reader.onload = (res) => {
        const imgUrl = res.target && res.target.result ? res.target.result : "";
        const current = readStoreForLiveView();
        if (activeOwnerPhotoSlot.type === "cover") {
          const maxCovers = Math.min(10, Math.max(1, Number(current.coverSlotsLimit ?? 1)));
          const covers = Array.isArray(current.covers) ? current.covers.slice(0, maxCovers) : [];
          covers[0] = imgUrl;
          current.covers = covers;
          current.cover = imgUrl;
        } else if (activeOwnerPhotoSlot.type === "item") {
          const { secIdx, itemIdx } = activeOwnerPhotoSlot;
          if (
            current.sections &&
            current.sections[secIdx] &&
            Array.isArray(current.sections[secIdx].items) &&
            current.sections[secIdx].items[itemIdx]
          ) {
            current.sections[secIdx].items[itemIdx].img = imgUrl;
            current.sections[secIdx].items[itemIdx].image = imgUrl;
          }
        }
        writeStoreForLiveView(current);
        activeOwnerPhotoSlot = null;
        if (typeof renderStore === "function") renderStore();
        if (OWNER_EDIT_PARAM) enhanceStoreForOwnerEdit();
      };
      reader.readAsDataURL(file);
    });
    document.body.appendChild(picker);
  }
  return picker;
}

function enhanceStoreForOwnerEdit() {
  if (!OWNER_EDIT_PARAM || document.body.dataset.page === "owner") return;
  const picker = ensureOwnerPhotoPicker();
  const data = readStoreForLiveView();

  const coverImg = document.querySelector(".cover-wrapper img");
  if (coverImg) {
    coverImg.style.cursor = "pointer";
    coverImg.title = "Change Cover Photo";
    coverImg.onclick = (e) => {
      e.stopPropagation();
      activeOwnerPhotoSlot = { type: "cover" };
      picker.value = "";
      picker.click();
    };
  }

  if (!document.getElementById("ownerSaveStoreBar")) {
    const bar = document.createElement("div");
    bar.id = "ownerSaveStoreBar";
    bar.style.cssText = "position:sticky;top:0;z-index:50;background:#0f766e;color:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px;";

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.textContent = "Save";
    saveBtn.style.cssText = "padding:7px 16px;border:none;border-radius:8px;background:#ffffff;color:#0f766e;font-weight:700;cursor:pointer;";
    saveBtn.onclick = () => {
      const latest = readStoreForLiveView();
      writeStoreForLiveView(latest);
      window.location.href = "index.html";
    };

    const exitBtn = document.createElement("button");
    exitBtn.type = "button";
    exitBtn.textContent = "Store";
    exitBtn.style.cssText = "padding:7px 12px;border:1px solid rgba(255,255,255,0.5);border-radius:8px;background:transparent;color:#fff;font-weight:600;cursor:pointer;";
    exitBtn.onclick = () => {
      window.location.href = "index.html";
    };

    bar.appendChild(saveBtn);
    bar.appendChild(exitBtn);
    document.body.prepend(bar);
  }

  const sections = Array.isArray(data.sections) ? data.sections : [];
  const rowSections = document.querySelectorAll(".row-section");
  rowSections.forEach((rowEl, secIdx) => {
    const sec = sections[secIdx];
    if (!sec) return;

    const stripTitle = rowEl.querySelector(".strip-title");
    if (stripTitle && !stripTitle.dataset.ownerBound) {
      stripTitle.dataset.ownerBound = "1";
      stripTitle.contentEditable = "true";
      stripTitle.addEventListener("input", () => {
        const latest = readStoreForLiveView();
        if (latest.sections && latest.sections[secIdx]) {
          latest.sections[secIdx].name = stripTitle.textContent.trim();
          writeStoreForLiveView(latest);
        }
      });
    }

    const cards = rowEl.querySelectorAll(".mini-box, .item-box");
    const items = Array.isArray(sec.items) ? sec.items : [];
    cards.forEach((cardEl, itemIdx) => {
      const item = items[itemIdx];
      if (!item) return;

      const cardImg = cardEl.querySelector("img");
      if (cardImg) {
        cardImg.style.cursor = "pointer";
        cardImg.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          activeOwnerPhotoSlot = { type: "item", secIdx, itemIdx };
          picker.value = "";
          picker.click();
        };
      }

      const nameEl = cardEl.querySelector(".mini-box-name, .item-name");
      if (nameEl && !nameEl.dataset.ownerBound) {
        nameEl.dataset.ownerBound = "1";
        nameEl.contentEditable = "true";
        nameEl.addEventListener("click", (e) => e.stopPropagation());
        nameEl.addEventListener("input", () => {
          const latest = readStoreForLiveView();
          if (
            latest.sections &&
            latest.sections[secIdx] &&
            latest.sections[secIdx].items &&
            latest.sections[secIdx].items[itemIdx]
          ) {
            latest.sections[secIdx].items[itemIdx].name = nameEl.textContent.trim();
            writeStoreForLiveView(latest);
          }
        });
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (OWNER_EDIT_PARAM) {
    setTimeout(enhanceStoreForOwnerEdit, 120);
  }
});
