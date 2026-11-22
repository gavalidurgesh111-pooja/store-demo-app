const STORAGE_KEY = "storeModularCleanV1";
const OWNER_PIN = "1234";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=500&q=70";

const CARTOON_AVATARS = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23dbeafe'/><circle cx='60' cy='46' r='22' fill='%23f59e0b'/><path d='M36 44c0-15 11-26 24-26s24 11 24 26c-6-6-14-9-24-9s-18 3-24 9z' fill='%231e293b'/><circle cx='52' cy='46' r='3' fill='%23111827'/><circle cx='68' cy='46' r='3' fill='%23111827'/><path d='M52 56q8 7 16 0' stroke='%23111827' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c4-22 18-32 34-32s30 10 34 32' fill='%230f766e'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23fce7f3'/><circle cx='60' cy='48' r='21' fill='%23fed7aa'/><path d='M34 52c0-20 12-32 26-32s26 12 26 32c-4-12-12-18-26-18s-22 6-26 18z' fill='%237c2d12'/><circle cx='52' cy='48' r='3' fill='%23111827'/><circle cx='68' cy='48' r='3' fill='%23111827'/><path d='M53 57q7 6 14 0' stroke='%23be123c' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M28 110c4-21 17-31 32-31s28 10 32 31' fill='%23db2777'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23fef3c7'/><circle cx='60' cy='48' r='22' fill='%23fdba74'/><rect x='43' y='42' width='14' height='10' rx='3' fill='none' stroke='%23111827' stroke-width='2.5'/><rect x='63' y='42' width='14' height='10' rx='3' fill='none' stroke='%23111827' stroke-width='2.5'/><line x1='57' y1='47' x2='63' y2='47' stroke='%23111827' stroke-width='2.5'/><path d='M52 59q8 6 16 0' stroke='%23111827' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c5-22 18-32 34-32s29 10 34 32' fill='%232563eb'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23dcfce7'/><circle cx='60' cy='52' r='24' fill='%23fb923c'/><polygon points='38,36 46,18 56,32' fill='%23fb923c'/><polygon points='82,36 74,18 64,32' fill='%23fb923c'/><circle cx='51' cy='49' r='3.5' fill='%23111827'/><circle cx='69' cy='49' r='3.5' fill='%23111827'/><polygon points='60,54 56,59 64,59' fill='%23111827'/><path d='M51 64q9 7 18 0' stroke='%23111827' stroke-width='2.5' fill='none' stroke-linecap='round'/><path d='M30 110c5-20 16-28 30-28s25 8 30 28' fill='%2315803d'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23e0e7ff'/><rect x='36' y='28' width='48' height='42' rx='12' fill='%2364748b'/><line x1='60' y1='16' x2='60' y2='28' stroke='%23475569' stroke-width='4'/><circle cx='60' cy='14' r='5' fill='%23ef4444'/><circle cx='50' cy='47' r='5' fill='%2338bdf8'/><circle cx='70' cy='47' r='5' fill='%2338bdf8'/><rect x='47' y='58' width='26' height='5' rx='2.5' fill='%23e2e8f0'/><path d='M30 110c4-22 16-32 30-32s26 10 30 32' fill='%234f46e5'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23ffedd5'/><circle cx='60' cy='48' r='22' fill='%23d97706'/><path d='M38 38c4-14 40-14 44 0' fill='%23111827'/><circle cx='52' cy='48' r='3' fill='%23111827'/><circle cx='68' cy='48' r='3' fill='%23111827'/><path d='M50 58c4 6 16 6 20 0' stroke='%23ffffff' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c4-22 18-32 34-32s30 10 34 32' fill='%23ea580c'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23f3e8ff'/><circle cx='60' cy='49' r='21' fill='%23fed7aa'/><circle cx='60' cy='23' r='9' fill='%23312e81'/><path d='M39 45c0-14 9-23 21-23s21 9 21 23' fill='%23312e81'/><circle cx='52' cy='49' r='3' fill='%23111827'/><circle cx='68' cy='49' r='3' fill='%23111827'/><path d='M53 58q7 6 14 0' stroke='%237e22ce' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M28 110c4-21 17-31 32-31s28 10 32 31' fill='%239333ea'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23ccfbf1'/><circle cx='40' cy='34' r='10' fill='%2378350f'/><circle cx='80' cy='34' r='10' fill='%2378350f'/><circle cx='60' cy='52' r='23' fill='%2392400e'/><circle cx='60' cy='57' r='10' fill='%23fde68a'/><circle cx='51' cy='47' r='3' fill='%23111827'/><circle cx='69' cy='47' r='3' fill='%23111827'/><circle cx='60' cy='54' r='3' fill='%23111827'/><path d='M30 110c5-20 16-28 30-28s25 8 30 28' fill='%230d9488'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23fee2e2'/><circle cx='60' cy='48' r='22' fill='%23fdba74'/><path d='M36 40h48l-6-16H42z' fill='%23dc2626'/><circle cx='52' cy='49' r='3' fill='%23111827'/><circle cx='68' cy='49' r='3' fill='%23111827'/><path d='M52 59q8 6 16 0' stroke='%23111827' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M26 110c4-22 18-32 34-32s30 10 34 32' fill='%231f2937'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='%23e0f2fe'/><ellipse cx='46' cy='24' rx='6' ry='16' fill='%23ffffff'/><ellipse cx='74' cy='24' rx='6' ry='16' fill='%23ffffff'/><circle cx='60' cy='54' r='23' fill='%23ffffff'/><circle cx='51' cy='51' r='3' fill='%23111827'/><circle cx='69' cy='51' r='3' fill='%23111827'/><circle cx='60' cy='57' r='3' fill='%23f43f5e'/><path d='M52 64q8 6 16 0' stroke='%23111827' stroke-width='2.5' fill='none' stroke-linecap='round'/><path d='M30 110c5-20 16-28 30-28s25 8 30 28' fill='%230284c7'/></svg>"
];

const SAMPLE_CATALOG = [
  {
    title: "1. Trending Deals",
    items: [
      { name: "Grocery Combo", price: 799, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=70" },
      { name: "Dry Fruit Box", price: 540, img: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=500&q=70" },
      { name: "Organic Honey", price: 295, img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=70" },
      { name: "Assam Gold Tea", price: 420, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=500&q=70" }
    ]
  },
  {
    title: "2. Fresh Fruits & Vegetables",
    items: [
      { name: "Shimla Apples 1kg", price: 160, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=70" },
      { name: "Fresh Bananas", price: 60, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=70" },
      { name: "Farm Tomatoes 1kg", price: 45, img: "https://images.unsplash.com/photo-1546470427-227c7369a9b9?auto=format&fit=crop&w=500&q=70" },
      { name: "Red Onions 2kg", price: 70, img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=70" },
      { name: "Fresh Potatoes 2kg", price: 65, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=70" }
    ]
  },
  {
    title: "3. Dairy & Bakery",
    items: [
      { name: "Full Cream Milk 1L", price: 68, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=70" },
      { name: "Brown Bread Pack", price: 45, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=70" },
      { name: "Table Butter 500g", price: 275, img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=70" },
      { name: "Fresh Paneer 200g", price: 95, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=70" },
      { name: "Cheese Slices Pack", price: 140, img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=70" }
    ]
  },
  {
    title: "4. Snacks & Namkeen",
    items: [
      { name: "Classic Salted Chips", price: 30, img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=70" },
      { name: "Aloo Bhujia 400g", price: 95, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=70" },
      { name: "Roasted Peanuts 250g", price: 65, img: "https://images.unsplash.com/photo-1567892320421-1c657571ea4a?auto=format&fit=crop&w=500&q=70" },
      { name: "Masala Mixture 500g", price: 120, img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=70" },
      { name: "Butter Popcorn Pack", price: 50, img: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=500&q=70" }
    ]
  },
  {
    title: "5. Cold Drinks & Juices",
    items: [
      { name: "Mixed Fruit Juice 1L", price: 110, img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=70" },
      { name: "Orange Juice Pack 1L", price: 115, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=500&q=70" },
      { name: "Sparkling Cola 2L", price: 95, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=70" },
      { name: "Mango Drink 1.2L", price: 75, img: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=70" },
      { name: "Lemon Iced Tea 500ml", price: 60, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=70" }
    ]
  }
];

const EXTRA_TITLES = [
  "6. Atta, Rice & Dal",
  "7. Cooking Oil & Ghee",
  "8. Spices & Masala",
  "9. Tea, Coffee & Health Drinks",
  "10. Biscuits & Chocolates",
  "11. Personal Care",
  "12. Household & Cleaning",
  "13. Baby Care Essentials",
  "14. Dry Fruits & Nuts",
  "15. Combo Value Packs"
];

function buildInitialData() {
  const sections = [];
  SAMPLE_CATALOG.forEach((sec, sIdx) => {
    sections.push({
      title: sec.title,
      items: sec.items.map((it, iIdx) => ({
        id: `${sIdx}-${iIdx}`,
        name: it.name,
        price: it.price,
        img: it.img
      }))
    });
  });

  EXTRA_TITLES.forEach((title, idx) => {
    const sIdx = idx + 5;
    const baseSamples = SAMPLE_CATALOG[idx % SAMPLE_CATALOG.length].items;
    sections.push({
      title,
      items: baseSamples.map((it, iIdx) => ({
        id: `${sIdx}-${iIdx}`,
        name: `${it.name} Pack`,
        price: it.price + (idx + 1) * 10,
        img: it.img
      }))
    });
  });

  return {
    storeTitle: "Urban Fresh Mart",
    storeSubtitle: "Daily Essentials • Fast Delivery • Best Local Prices",
    coverImg: DEFAULT_COVER,
    sections,
    orders: [],
    mediaPermissionGranted: false,
    userProfile: {
      photo: "",
      firstName: "",
      surname: "",
      age: "",
      gender: "",
      phone: "",
      otpVerified: false,
      provider: ""
    }
  };
}

let storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || buildInitialData();
if (!storeData.userProfile) {
  storeData.userProfile = { photo: "", firstName: "", surname: "", age: "", gender: "", phone: "", otpVerified: false, provider: "" };
}

let activeOrderItem = null;
let draftPhoto = storeData.userProfile.photo || "";
let tempManagerPhoto = "";
let otpCountdownInterval = null;

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
}

function readImageAsDataURL(file, maxWidth = 600) {
  return new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ==================== STORE PAGE (index.html) ==================== */
function renderHeader() {
  const titleEl = document.getElementById("storeTitle");
  if (!titleEl) return;
  titleEl.textContent = storeData.storeTitle;
  document.getElementById("storeSubtitle").textContent = storeData.storeSubtitle;
  document.getElementById("coverImage").src = storeData.coverImg || DEFAULT_COVER;
}

function renderSections() {
  const container = document.getElementById("sectionsContainer");
  if (!container) return;
  container.innerHTML = "";
  const savedPhoto = storeData.userProfile?.photo || "";

  storeData.sections.forEach((sec, sIdx) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "row-section";

    const stripEl = document.createElement("div");
    stripEl.className = "strip-bar";
    stripEl.innerHTML = `
      <span class="strip-title">${sec.title}</span>
      <span class="strip-tag">${sIdx === 0 ? "5 Boxes" : "Swipe →"}</span>
    `;
    sectionEl.appendChild(stripEl);

    if (sIdx === 0) {
      const fiveRow = document.createElement("div");
      fiveRow.className = "five-boxes-row";

      sec.items.slice(0, 4).forEach((item) => {
        const box = document.createElement("div");
        box.className = "mini-box";
        box.onclick = () => openOrderModal(0, item.id);
        box.innerHTML = `
          <img src="${item.img || FALLBACK_IMG}" alt="${item.name}" onerror="this.src='${FALLBACK_IMG}'" />
          <div class="mini-box-body">
            <div class="mini-box-name">${item.name}</div>
            <div class="mini-box-price">₹${item.price}</div>
          </div>
        `;
        fiveRow.appendChild(box);
      });

      const fifthBox = document.createElement("div");
      fifthBox.className = "mini-box user-photo-only-box" + (savedPhoto ? " has-photo" : "");
      fifthBox.onclick = () => {
        window.location.href = "profile.html";
      };
      fifthBox.innerHTML = savedPhoto
        ? `<img src="${savedPhoto}" alt="User Photo" />`
        : `<div class="user-placeholder-label">Profile</div>`;

      fiveRow.appendChild(fifthBox);
      sectionEl.appendChild(fiveRow);
    } else {
      const scrollEl = document.createElement("div");
      scrollEl.className = "scroll-row";

      sec.items.forEach((item) => {
        const box = document.createElement("div");
        box.className = "item-box";
        box.innerHTML = `
          <img src="${item.img || FALLBACK_IMG}" alt="${item.name}" onerror="this.src='${FALLBACK_IMG}'" />
          <div class="item-info">
            <div class="item-name" title="${item.name}">${item.name}</div>
            <div class="item-price">₹${item.price}</div>
            <button type="button" class="buy-btn" onclick="openOrderModal(${sIdx}, '${item.id}')">Order</button>
          </div>
        `;
        scrollEl.appendChild(box);
      });

      sectionEl.appendChild(scrollEl);
    }

    container.appendChild(sectionEl);
  });
}

function openOrderModal(sectionIdx, itemId) {
  const item = storeData.sections[sectionIdx]?.items.find((i) => i.id === itemId);
  if (!item) return;
  activeOrderItem = item;
  document.getElementById("modalItemTitle").textContent = item.name;
  document.getElementById("modalItemPrice").textContent = `Price: ₹${item.price}`;
  document.getElementById("orderCustomer").value = "";
  document.getElementById("orderQty").value = "1";
  document.getElementById("orderModal").classList.add("active");
}

function closeOrderModal() {
  document.getElementById("orderModal").classList.remove("active");
  activeOrderItem = null;
}

function confirmOrder() {
  if (!activeOrderItem) return;
  const customer = document.getElementById("orderCustomer").value.trim() || "Walk-in Customer";
  const qty = Math.max(1, parseInt(document.getElementById("orderQty").value, 10) || 1);
  const amount = activeOrderItem.price * qty;

  storeData.orders.push({ customer, itemName: activeOrderItem.name, qty, amount });
  saveData();
  closeOrderModal();
  renderOwnerDashboard();
  alert(`Order Placed: ${activeOrderItem.name} x${qty} (₹${amount})`);
}

function openPinModal() {
  document.getElementById("ownerPinInput").value = "";
  document.getElementById("pinModal").classList.add("active");
}

function closePinModal() {
  document.getElementById("pinModal").classList.remove("active");
}

function verifyPin() {
  if (document.getElementById("ownerPinInput").value.trim() === OWNER_PIN) {
    closePinModal();
    const panel = document.getElementById("ownerPanel");
    panel.classList.add("active");
    renderOwnerDashboard();
    panel.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Incorrect PIN");
  }
}

function closeOwnerPanel() {
  document.getElementById("ownerPanel").classList.remove("active");
}

function renderOwnerDashboard() {
  const panel = document.getElementById("ownerPanel");
  if (!panel) return;

  document.getElementById("editStoreTitle").value = storeData.storeTitle;
  document.getElementById("editStoreSubtitle").value = storeData.storeSubtitle;

  const select = document.getElementById("newSectionIndex");
  const filter = document.getElementById("manageSectionFilter");
  const prevFilter = filter.value || "0";

  select.innerHTML = "";
  filter.innerHTML = "";
  storeData.sections.forEach((sec, idx) => {
    const opt1 = document.createElement("option");
    opt1.value = idx;
    opt1.textContent = sec.title;
    select.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = idx;
    opt2.textContent = sec.title;
    filter.appendChild(opt2);
  });
  filter.value = prevFilter;

  const totalSold = storeData.orders.reduce((s, o) => s + o.qty, 0);
  const totalRev = storeData.orders.reduce((s, o) => s + o.amount, 0);

  document.getElementById("statSold").textContent = totalSold;
  document.getElementById("statRevenue").textContent = `₹${totalRev}`;
  document.getElementById("statOrders").textContent = storeData.orders.length;

  renderOwnerItemsTable();

  const tbody = document.getElementById("ordersTableBody");
  tbody.innerHTML = "";
  storeData.orders.slice().reverse().forEach((o) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${o.customer}</td><td>${o.itemName}</td><td>${o.qty}</td><td>₹${o.amount}</td>`;
    tbody.appendChild(tr);
  });
}

async function updateStoreHeader() {
  const title = document.getElementById("editStoreTitle").value.trim();
  const sub = document.getElementById("editStoreSubtitle").value.trim();
  const file = document.getElementById("editCoverFile").files[0];

  if (title) storeData.storeTitle = title;
  if (sub) storeData.storeSubtitle = sub;
  if (file) {
    const imgData = await readImageAsDataURL(file, 900);
    if (imgData) storeData.coverImg = imgData;
  }

  saveData();
  renderHeader();
  document.getElementById("editCoverFile").value = "";
  alert("Store header updated!");
}

async function addNewItem() {
  const sIdx = parseInt(document.getElementById("newSectionIndex").value, 10);
  const name = document.getElementById("newItemName").value.trim();
  const price = parseInt(document.getElementById("newItemPrice").value, 10);
  const file = document.getElementById("newItemFile").files[0];

  if (!name || !price || price <= 0) {
    alert("Please enter valid item name and price.");
    return;
  }

  let imgUrl = FALLBACK_IMG;
  if (file) {
    const uploaded = await readImageAsDataURL(file, 500);
    if (uploaded) imgUrl = uploaded;
  }

  storeData.sections[sIdx].items.unshift({ id: `${sIdx}-${Date.now()}`, name, price, img: imgUrl });
  saveData();
  renderSections();
  renderOwnerItemsTable();

  document.getElementById("newItemName").value = "";
  document.getElementById("newItemPrice").value = "";
  document.getElementById("newItemFile").value = "";
  alert("Item added!");
}

function renderOwnerItemsTable() {
  const filter = document.getElementById("manageSectionFilter");
  if (!filter) return;
  const sIdx = parseInt(filter.value, 10) || 0;
  const tbody = document.getElementById("ownerItemsTableBody");
  tbody.innerHTML = "";

  storeData.sections[sIdx].items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td class="action-cell">
        <button type="button" class="btn-small" onclick="editItemPrice(${sIdx}, '${item.id}')">Price</button>
        <button type="button" class="btn-danger" onclick="deleteItem(${sIdx}, '${item.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editItemPrice(sIdx, itemId) {
  const item = storeData.sections[sIdx].items.find((i) => i.id === itemId);
  if (!item) return;
  const num = parseInt(prompt(`New price for ${item.name} (₹):`, item.price), 10);
  if (num && num > 0) {
    item.price = num;
    saveData();
    renderSections();
    renderOwnerItemsTable();
  }
}

function deleteItem(sIdx, itemId) {
  storeData.sections[sIdx].items = storeData.sections[sIdx].items.filter((i) => i.id !== itemId);
  saveData();
  renderSections();
  renderOwnerItemsTable();
}

/* ==================== PROFILE PAGE (profile.html) ==================== */
function updateMainAvatarCircleUI() {
  const trigger = document.getElementById("avatarCircleTrigger");
  if (!trigger) return;
  if (draftPhoto) {
    trigger.classList.add("has-img");
    trigger.innerHTML = `<img src="${draftPhoto}" alt="Selected Profile" />`;
  } else {
    trigger.classList.remove("has-img");
    trigger.innerHTML = `<span class="plus-sign-icon">+</span>`;
  }
}

function openRegistrationPopup() {
  const modal = document.getElementById("userProfileModal");
  if (!modal) return;
  const up = storeData.userProfile;
  draftPhoto = up.photo || "";
  updateMainAvatarCircleUI();

  document.getElementById("userFirstName").value = up.firstName || "";
  document.getElementById("userSurname").value = up.surname || "";
  document.getElementById("userAge").value = up.age || "";
  document.getElementById("userGender").value = up.gender || "";
  document.getElementById("userPhone").value = up.phone || "";
  document.getElementById("userOtpInput").value = "";
  document.getElementById("otpStatusMsg").textContent = "";
  document.getElementById("otpStripPopup").classList.remove("active");
  clearInterval(otpCountdownInterval);

  const sendBtn = document.getElementById("sendOtpBtn");
  const badge = document.getElementById("phoneVerifiedBadge");
  if (up.otpVerified) {
    sendBtn.style.display = "none";
    badge.textContent = "Number Verified";
  } else {
    sendBtn.style.display = "inline-block";
    badge.textContent = "";
  }

  modal.classList.add("active");
}

function cancelRegistrationPopup() {
  clearInterval(otpCountdownInterval);
  document.getElementById("userProfileModal").classList.remove("active");
  window.location.href = "index.html";
}

function handleAvatarCircleClick() {
  if (storeData.mediaPermissionGranted) {
    openPhotoManagerModal();
  } else {
    document.getElementById("permissionModal").classList.add("active");
  }
}

function denyMediaPermission() {
  document.getElementById("permissionModal").classList.remove("active");
  alert("Permission denied.");
}

function allowMediaPermission() {
  storeData.mediaPermissionGranted = true;
  saveData();
  document.getElementById("permissionModal").classList.remove("active");
  openPhotoManagerModal();
}

function openPhotoManagerModal() {
  tempManagerPhoto = draftPhoto;
  renderPhotoManagerPreview();
  buildCartoonAvatarsGrid();
  document.getElementById("photoManagerModal").classList.add("active");
}

function closePhotoManagerModal() {
  document.getElementById("photoManagerModal").classList.remove("active");
}

function renderPhotoManagerPreview() {
  const preview = document.getElementById("photoManagerPreview");
  if (tempManagerPhoto) {
    preview.classList.add("has-img");
    preview.innerHTML = `<img src="${tempManagerPhoto}" alt="Preview" />`;
  } else {
    preview.classList.remove("has-img");
    preview.innerHTML = `<span class="plus-sign-icon">+</span>`;
  }
}

function buildCartoonAvatarsGrid() {
  const grid = document.getElementById("cartoonAvatarsGrid");
  grid.innerHTML = "";
  CARTOON_AVATARS.forEach((url, idx) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `Avatar ${idx + 1}`;
    img.className = "avatar-choice" + (tempManagerPhoto === url ? " selected" : "");
    img.onclick = () => {
      tempManagerPhoto = url;
      renderPhotoManagerPreview();
      buildCartoonAvatarsGrid();
    };
    grid.appendChild(img);
  });
}

async function handleUserPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const imgData = await readImageAsDataURL(file, 400);
  if (imgData) {
    tempManagerPhoto = imgData;
    renderPhotoManagerPreview();
    buildCartoonAvatarsGrid();
  }
  event.target.value = "";
}

function deleteTempPhoto() {
  tempManagerPhoto = "";
  renderPhotoManagerPreview();
  buildCartoonAvatarsGrid();
}

function applyPhotoSelection() {
  draftPhoto = tempManagerPhoto;
  updateMainAvatarCircleUI();
  closePhotoManagerModal();
}

function resetOtpOnPhoneChange() {
  storeData.userProfile.otpVerified = false;
  document.getElementById("sendOtpBtn").style.display = "inline-block";
  document.getElementById("phoneVerifiedBadge").textContent = "";
}

function startOtpTimer(seconds = 30) {
  clearInterval(otpCountdownInterval);
  let left = seconds;
  const timerEl = document.getElementById("otpTimerText");
  timerEl.textContent = `${left}s`;

  otpCountdownInterval = setInterval(() => {
    left -= 1;
    if (left <= 0) {
      clearInterval(otpCountdownInterval);
      timerEl.textContent = "0s";
      document.getElementById("otpStatusMsg").textContent = "Time expired. Tap Send to resend.";
    } else {
      timerEl.textContent = `${left}s`;
    }
  }, 1000);
}

function sendOtpForNumber() {
  const digits = document.getElementById("userPhone").value.replace(/\D/g, "");
  if (digits.length < 10) {
    alert("Please enter a valid mobile number first.");
    return;
  }

  document.getElementById("userOtpInput").value = "";
  document.getElementById("otpStatusMsg").textContent = "OTP sent (Demo OTP: 1234)";
  document.getElementById("otpStripPopup").classList.add("active");
  startOtpTimer(30);
}

function verifyUserOtp() {
  const code = document.getElementById("userOtpInput").value.trim();
  if (code.length >= 4) {
    clearInterval(otpCountdownInterval);
    storeData.userProfile.otpVerified = true;
    document.getElementById("otpStripPopup").classList.remove("active");
    document.getElementById("sendOtpBtn").style.display = "none";
    document.getElementById("phoneVerifiedBadge").textContent = "Number Verified";
  } else {
    document.getElementById("otpStatusMsg").textContent = "Please enter OTP";
  }
}

function socialRegister(provider) {
  storeData.userProfile.provider = provider;
  if (!draftPhoto) {
    draftPhoto = CARTOON_AVATARS[0];
    updateMainAvatarCircleUI();
  }
  alert(`${provider} selected. Tap Save to apply.`);
}

function saveUserProfile() {
  storeData.userProfile = {
    ...storeData.userProfile,
    photo: draftPhoto,
    firstName: document.getElementById("userFirstName").value.trim(),
    surname: document.getElementById("userSurname").value.trim(),
    age: document.getElementById("userAge").value.trim(),
    gender: document.getElementById("userGender").value,
    phone: document.getElementById("userPhone").value.trim()
  };

  saveData();
  window.location.href = "index.html";
}

/* ==================== PAGE INIT ==================== */
window.addEventListener("storage", () => {
  storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || storeData;
  renderSections();
});

const currentPage = document.body.getAttribute("data-page");
if (currentPage === "store") {
  renderHeader();
  renderSections();
} else if (currentPage === "profile") {
  openRegistrationPopup();
}
