// ===== 🎛 UI Elements =====
const $ = (id) => document.getElementById(id);

// Left side buttons
const addBtn = $("addBtn");
const upBtn = $("upBtn");
const downBtn = $("downBtn");

// Card display elements
const image = $("image");
const fullName = $("fullName");
const homeTown = $("homeTown");
const booking = $("bookingData");

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
    messagePopUp("Calling is not available RN.", "#2d3748", "#E5E7EB");

  appMessage.onclick = () =>
    messagePopUp("Messaging is not available RN.", "#000", "#fff");
}
contactHandle();

// ===== 💬 Popup Message =====
function messagePopUp(msg, textColor, bgColor) {
  message.textContent = msg;
  message.style.color = textColor;
  messageBox.style.backgroundColor = bgColor;
  messageContainer.classList.remove("hidden");

  const hideMsg = () => {
    message.textContent = "";
    messageContainer.classList.add("hidden");
  };

  messageBtn.onclick = hideMsg;
  setTimeout(hideMsg, 5000);
}

// ===== ❌ Form Close =====
closeBtn.onclick = (e) => {
  e.preventDefault();
  formContainer.style.display = "none";
};

// ===== 🧠 Global Variables =====
let imgUrl = "",
  FName = "",
  address = "",
  reason = "",
  selected = "";

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
    // Update UI
    image.src = imageUrl.value;
    fullName.textContent = fullNameInput.value;
    homeTown.textContent = homeTownInput.value;
    booking.textContent = purpose.value;

    // Save values
    imgUrl = imageUrl.value;
    FName = fullNameInput.value;
    address = homeTownInput.value;
    reason = purpose.value;
    selected = category.value;

    // Hide form & reset
    formContainer.style.display = "none";
    form.reset();

    messagePopUp("New Note Created Successfully!", "#016630", "#b9f8cf");
  } else {
    messagePopUp("Please fill and check all required fields.", "#C62828", "#EF9A9A");
  }
}

// ===== ➕ Add Button =====
addBtn.onclick = () => (formContainer.style.display = "block");

// ===== 💾 (Future Ready) Save to LocalStorage =====
function saveToLocalStorage(obj) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

// ===== 📤 Form Submit =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateCard();

  saveToLocalStorage({ imgUrl, FName, address, reason, selected });
  
});
