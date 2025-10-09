// ===== 🎛 UI Elements =====
const $ = (id) => document.getElementById(id);

// Left side buttons
const addBtn = $("addBtn");
const upBtn = $("upBtn");
const downBtn = $("downBtn");

// ===== ⬆️⬇️ Up/Down Button Functionality with Looping and Animation =====
function moveCardUp() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer || cardsContainer.children.length <= 1) return;
  addScaleAnimation();
  const firstCard = cardsContainer.firstElementChild;
  cardsContainer.appendChild(firstCard);
  updateCardStackStyles();
}

function moveCardDown() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer || cardsContainer.children.length <= 1) return;
  addScaleAnimation();
  const lastCard = cardsContainer.lastElementChild;
  cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild);
  updateCardStackStyles();
}

function addScaleAnimation() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer) return;
  cardsContainer.style.transition = 'transform 0.05s ease-in-out';
  cardsContainer.style.transform = 'scale(0.96)';
  setTimeout(() => {
    cardsContainer.style.transform = 'scale(1)';
    setTimeout(() => {
      cardsContainer.style.transition = '';
    }, 25);
  }, 25);
}

function updateCardStackStyles() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer) return;
  const cards = Array.from(cardsContainer.children);
  cards.forEach((card, index) => {
    card.style.position = 'absolute';
    card.style.zIndex = '';
    card.style.transform = '';
    card.style.opacity = '';
    card.style.top = '0';
    card.style.left = '0';
    card.style.right = '0';
    card.style.bottom = '0';
    card.style.width = '100%';
    card.style.height = '100%';
    if (index === 0) {
      card.style.zIndex = cards.length - index;
      card.style.transform = 'translateY(0) scale(1)';
      card.style.opacity = '1';
    } else if (index === 1) {
      card.style.zIndex = cards.length - index;
      card.style.transform = 'translateY(8px) scale(0.98)';
      card.style.opacity = '0.9';
    } else if (index === 2) {
      card.style.zIndex = cards.length - index;
      card.style.transform = 'translateY(16px) scale(0.96)';
      card.style.opacity = '0.8';
    } else {
      card.style.zIndex = cards.length - index;
      card.style.transform = 'translateY(20px) scale(0.94)';
      card.style.opacity = '0';
    }
  });
}

// Contact action buttons
const appCall = $("appCall");
const appMessage = $("appMessage");

// Call importance filters
const callDone = $("callDone");
const callLater = $("callLater");
const callSoon = $("callSoon");
const callNow = $("callNow");

// Form & Inputs
const form = document.querySelector("form");
const formContainer = $("formContainer");
const imageUrl = $("imageUrl");
const fullNameInput = $("fullNameInput");
const homeTownInput = $("hometownInput");
const purpose = $("purpose");

// Form buttons
const createBtn = $("createBtn");
const closeBtn = $("closeBtn");

// Message popup
const messageContainer = $("messageContainer");
const messageBox = $("messageBox");
const message = $("message");
const messageBtn = $("messageBtn");

// ===== 📞 Contact Handling =====
function contactHandle() {
  appCall.onclick = () =>
    messagePopUp("Calling is not available RN.", "#fff", "#666");
  appMessage.onclick = () =>
    messagePopUp("Messaging is not available RN.", "#000", "#fff");
}
contactHandle();

// ===== 💬 Popup Message =====
let hideTimeout;

function messagePopUp(msg, textColor, bgColor) {
  clearTimeout(hideTimeout);
  message.textContent = msg;
  message.style.color = textColor;
  messageBox.style.backgroundColor = bgColor;
  messageContainer.classList.remove("hidden");
  messageBox.classList.remove("blink");
  void messageBox.offsetWidth;
  messageBox.classList.add("blink");
  const hideMsg = () => {
    message.textContent = "";
    messageContainer.classList.add("hidden");
  };
  messageBtn.onclick = () => {
    clearTimeout(hideTimeout);
    hideMsg();
  };
  hideTimeout = setTimeout(hideMsg, 5000);
}

// ===== ❌ Form Close =====
if (closeBtn && formContainer) {
  closeBtn.addEventListener('click', (dets) => {
    dets.preventDefault();
    formContainer.style.display = "none";
  });
}

let cardData = {};
let image = "";
let fullName = "";
let homeTown = "";
let booking = "";
let selected = "";

// ===== ✍️ Form Handling =====
function updateCard() {
  const category = document.querySelector('input[type="radio"]:checked');
  if (
    imageUrl.value.trim() &&
    fullNameInput.value.trim() &&
    homeTownInput.value.trim() &&
    purpose.value.trim() &&
    category
  ) {
    cardData = {
      image: imageUrl.value,
      fullName: fullNameInput.value,
      homeTown: homeTownInput.value,
      booking: purpose.value,
      selected: category.value,
    };
    formContainer.style.display = "none";
    form.reset();
    messagePopUp("New Note Created Successfully!", "#016630", "#b9f8cf");
  } else {
    messagePopUp("Please fill and check all required fields.", "#C62828", "#EF9A9A");
  }
}

// ===== ➕ Add Button =====
if (addBtn && formContainer) {
  addBtn.addEventListener('click', () => {
    formContainer.style.display = "block";
  });
}

// ===== ⬆️⬇️ Up/Down Button Event Listeners =====
if (upBtn) {
  upBtn.addEventListener('click', () => {
    moveCardUp();
  });
}

if (downBtn) {
  downBtn.addEventListener('click', () => {
    moveCardDown();
  });
}

// ===== 💾 Save to LocalStorage =====
function saveToLocalStorage(obj) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

// ===== 📤 Form Submit =====
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateCard();
    saveToLocalStorage(cardData);
    createCard(cardData);
  });
}

// show card after reload
window.addEventListener("DOMContentLoaded", () => {
  const rawData = localStorage.getItem("tasks");
  const existingTasks = JSON.parse(rawData || "[]");
  const cardsContainer = document.getElementById("cardsContainer");
  if (existingTasks && existingTasks.length > 0) {
    const reversedTasks = existingTasks.slice().reverse();
    reversedTasks.forEach((task) => {
      createCard(task);
    });
    updateCardStackStyles();
  } else {
    // No cards in localStorage → show message
    messagePopUp("No cards found! Click '+' to add your first card.", "#000", "#FFD54F");
  }
});

// Create cards 
function createCard(cardData) {
  if (
    !cardData ||
    !cardData.image ||
    !cardData.fullName ||
    !cardData.homeTown ||
    !cardData.booking ||
    !cardData.selected
  ) return;

  const card = document.createElement("div");
  card.className = "card shadow-lg shadow-gray-400";
  card.dataset.importance = cardData.selected;

  const imageContainer = document.createElement("div");

  // ✅ FIXED color mapping (Tailwind-safe)
  const colorMap = {
    "no rush": "bg-green-600",
    "important": "bg-amber-600",
    "emergency": "bg-orange-600",
    "urgent": "bg-red-600"
  };
  const colorClass = colorMap[cardData.selected] || "bg-gray-400";
  imageContainer.className = `imageContainer ${colorClass} rounded-full`;

  const img = document.createElement("img");
  img.className = "rounded-full";
  img.src = cardData.image;
  img.alt = "Client Image";
  imageContainer.appendChild(img);

  const fullname = document.createElement("div");
  fullname.className = "fullname text-2xl font-bold";
  fullname.textContent = cardData.fullName;

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "detailsContainer";

  const details = document.createElement("div");
  details.className = "details";

  const hometownInfo = document.createElement("div");
  hometownInfo.className = "info text-md font-bold";
  hometownInfo.textContent = "Hometown";

  const purposeInfo = document.createElement("div");
  purposeInfo.className = "info text-md font-bold";
  purposeInfo.textContent = "Purpose";

  details.append(hometownInfo, purposeInfo);

  const answerContainer = document.createElement("div");
  answerContainer.className = "answerContainer";

  const hometownAns = document.createElement("div");
  hometownAns.className = "answer font-semibold text-sm";
  hometownAns.textContent = cardData.homeTown;

  const bookingAns = document.createElement("div");
  bookingAns.className = "answer font-semibold text-sm";
  bookingAns.textContent = cardData.booking;

  answerContainer.append(hometownAns, bookingAns);
  detailsContainer.append(details, answerContainer);

  const btnContainer = document.createElement("div");
  btnContainer.className = "btnContainer flex flex-row justify-between items-center mt-2";

  const callBtn = document.createElement("button");
  callBtn.className = "button shadow-2xl";
  callBtn.id = "appCall";
  callBtn.innerHTML = `<span><i class="ri-phone-line"></i></span>Call`;

  const messageBtn = document.createElement("button");
  messageBtn.className = "button shadow-lg";
  messageBtn.id = "appMessage";
  messageBtn.innerHTML = `<span><i class="ri-message-2-line"></i></span>Message`;

  btnContainer.append(callBtn, messageBtn);

  card.append(imageContainer, fullname, detailsContainer, btnContainer);

  const cardsContainer = document.getElementById("cardsContainer");
  if (cardsContainer) {
    cardsContainer.insertBefore(card, cardsContainer.firstElementChild);
  }

  callBtn.onclick = () => messagePopUp("Calling is not available RN.", "#fff", "#666");
  messageBtn.onclick = () => messagePopUp("Messaging is not available RN.", "#000", "#fff");

  updateCardStackStyles();
}

/// ===== 🎨 Filter Feature  =====
const filterButtons = [callDone, callLater, callSoon, callNow];
let activeFilter = null;

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const colorMap = {
      callDone: "green",
      callLater: "amber",
      callSoon: "orange",
      callNow: "red"
    };
    const selectedColor = colorMap[btn.id];

    if (activeFilter === selectedColor) {
      // Turn off filter if same color clicked again
      activeFilter = null;
      showAllCards();
      highlightActiveFilter(null);
    } else {
      activeFilter = selectedColor;
      filterCardsByColor(selectedColor);
      highlightActiveFilter(btn);
    }
  });
});

function highlightActiveFilter(activeBtn) {
  filterButtons.forEach((b) => b.classList.remove("ring-2", "ring-black"));
  if (activeBtn) activeBtn.classList.add("ring-2", "ring-black");
}

function filterCardsByColor(color) {
  const cards = document.querySelectorAll(".card");
  let found = false;

  cards.forEach((card) => {
    const imageContainer = card.querySelector(".imageContainer");
    if (
      imageContainer &&
      (imageContainer.classList.contains(`bg-${color}-600`) ||
       imageContainer.classList.contains(`bg-${color}-800`))
    ) {
      card.style.display = "flex";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!found) {
    messagePopUp("No cards found for this category!", "#fff", "#E53935");
  }
}

function showAllCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.display = "flex"));
}

// ===== 🧹 Prevent Duplicate Cards on Reload =====
window.addEventListener("DOMContentLoaded", () => {
  const rawData = localStorage.getItem("tasks");
  const existingTasks = JSON.parse(rawData || "[]");
  const cardsContainer = document.getElementById("cardsContainer");
  if (cardsContainer) cardsContainer.innerHTML = ""; // clear first
  if (existingTasks.length > 0) {
    const reversedTasks = existingTasks.slice().reverse();
    reversedTasks.forEach((task) => createCard(task));
    updateCardStackStyles();
  }
});
