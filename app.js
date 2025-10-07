// Left btns
const addBtn = document.getElementById('addBtn');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');

// app Data
let  image = document.getElementById('image');
let  fullName = document.getElementById('fullName');
let  homeTown = document.getElementById('homeTown');
let  booking = document.getElementById('bookingData');

// app contact 
const appCall = document.getElementById('appCall');
const appMessage = document.getElementById('appMessage');

// call importance
const callDone = document.getElementById('callDone')
const callLater = document.getElementById('callLater');
const callSoon = document.getElementById('callSoon');
const callNow = document.getElementById('callNow');

// form
const form = document.querySelector('form');
const formContainer = document.getElementById('formContainer');
// inputs
const imageUrl = document.getElementById('imageUrl');
const fullNameInput = document.getElementById('fullNameInput');
const homeTownInput = document.getElementById('hometownInput');
const purpose = document.getElementById('purpose')


// form btns 
const createBtn = document.getElementById('createBtn');
const closeBtn = document.getElementById('closeBtn');

// message
const messageContainer = document.getElementById('messageContainer');
const messageBox = document.getElementById('messageBox');
const message = document.getElementById('message');
const messageBtn = document.getElementById('messageBtn');

// message handling
function messagePopUp (msg,textColor ,bgColor) {
  message.textContent = msg;
    messageContainer.style.display = 'block'
    messageContainer.style.right ='2rem'  
    message.style.color = textColor;
    messageBox.style.backgroundColor = bgColor;
    setTimeout(() => {
        message.textContent = ""
        messageContainer.style.display = 'none'
        
    }, 5000);
    messageBtn.addEventListener('click', () => {
        message.textContent = ""
        messageContainer.style.display = 'none'
    })

    closeBtn.addEventListener('click', (dets) => {
    dets.preventDefault();
    formContainer.style.display = 'none';
})
}

// contact hadling
const contactHandle = () => {
   appCall.addEventListener('click', () => {
    messagePopUp("Calling is not Availabel RN." ,"#2d3748", "#E5E7EB");
   })

   appMessage.addEventListener('click', () => {
       messagePopUp("Messaging is not available RN." ,"#000", "#fff");
   })
}
contactHandle()

// form handling
const updateCard = () => {
    if (fullNameInput.value.trim() !=="" && homeTownInput.value.trim !== "" && purpose.value.trim() !== "") {
        image.removeAttribute('src' );
        image.setAttribute('src',imageUrl.value);
    
        fullName.textContent = fullNameInput.value;
        homeTown.textContent = homeTownInput.value;
        booking.textContent = purpose.value;

        formContainer.style.display = 'none';
        form.reset();

        messagePopUp("New Note Created Sucessfully!", "#016630", "#b9f8cf");

    } else {
       messagePopUp("Please Fill all required field.| No spaces Allowed." ,"#C62828" , "#EF9A9A")
    }
}

addBtn.addEventListener('click', (dets) => {
    formContainer.style.display = 'block';   
})

// form submit
form.addEventListener('submit', (dets) => { 
    dets.preventDefault();
      
    updateCard()

    
})

