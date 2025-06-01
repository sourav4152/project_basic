const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()-_=+[]{};:,.<>/?|~`";


let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();
setIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min= inputSlider.min;
    const max= inputSlider.max;
    inputSlider.style.backgroundSize= ((passwordLength - min)*100/(max- min )+ "100%");
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow= `0px 0px 12px 1px ${color}`;
}

function getRanInteger(min, max) {
   return( Math.floor(Math.random() * (max - min)) + min) ;
}

function generateRandomNumber() {
    return getRanInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRanInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRanInteger(65, 91));
}

function generateSymbols() {
    let random = getRanInteger(0, symbols.length);
    return symbols.charAt(random);
}

function calcStrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbols = false;

    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSymbols = true;

    if (hasLower && hasUpper && hasNum && hasSymbols && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSymbols) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}


async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }

    catch (e) {
        copyMsg.innerHTML = "Failed";
    }

    //to make copied span visible 
    copyMsg.classList.add("active");

    setTimeout(() => { copyMsg.classList.remove("active") }, 2000);

}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    // Special condition
    if(passwordLength <= checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}



allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
})


function shufflePassword(password) {
    let passwordArray = password.split("");
    
    for (let i = passwordArray.length - 1; i > 0; i--) {
        // Get a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));
        
        // Swap characters at positions i and j
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join("");
}


generateBtn.addEventListener('click', () => {
   
    if(checkCount<=0) return;    // none are checked
    if(passwordLength <= checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // for finding new password
    password="";

   /* if(upperCaseCheck.checked)  password+= generateUpperCase();
    if(lowerCaseCheck.checked)  password+= generateLowerCase();
    if(numberCheck.checked)     password+= generateRandomNumber();
    if(symbolsCheck.checked)    password+= generateSymbols();
   */
  
    
    let funcArr =[];
    if(upperCaseCheck.checked)  funcArr.push( generateUpperCase);
    if(lowerCaseCheck.checked)  funcArr.push( generateLowerCase);
    if(numberCheck.checked)     funcArr.push( generateRandomNumber);
    if(symbolsCheck.checked)    funcArr.push( generateSymbols);

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();  
    }

    for(let i=0; i<passwordLength-funcArr.length; i++){
        let ranIndex= getRanInteger(0, funcArr.length);
        password += funcArr[ranIndex]();
    }

    //suffel the password
    password= shufflePassword(password);

    passwordDisplay.value= password;
    //calculate strength
    calcStrength();
} )



// for LIGHT MODE
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeToggleBtn.textContent = "🌙 Dark Mode";
    } else {
        themeToggleBtn.textContent = "🌞 Light Mode";
    }
});
