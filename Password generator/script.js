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

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color, label) {
    indicator.style.backgroundColor = color;
    const labelEl = document.getElementById("strength-label");
    if (labelEl) {
        labelEl.textContent = label;
    }
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
    const hasUpper = upperCaseCheck.checked;
    const hasLower = lowerCaseCheck.checked;
    const hasNum = numberCheck.checked;
    const hasSymbols = symbolsCheck.checked;

    let strength = 0;
    if (hasUpper) strength++;
    if (hasLower) strength++;
    if (hasNum) strength++;
    if (hasSymbols) strength++;

    if (passwordLength >= 12 && strength === 4) {
        setIndicator("#00ff00", "Very Strong");
    } else if (passwordLength >= 10 && strength >= 3) {
        setIndicator("#32cd32", "Strong");
    } else if (passwordLength >= 8 && strength >= 2) {
        setIndicator("#ffd700", "Medium");
    } else if (passwordLength >= 6 && strength >= 1) {
        setIndicator("#ff8c00", "Weak");
    } else {
        setIndicator("#ff0000", "Very Weak");
    }
}




async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied !";
    }

    catch (e) {
        copyMsg.innerHTML = "Failed to copy";
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

// ============ Strength Label Logic ============
const strengthLabel = document.createElement("p");
strengthLabel.id = "strengthText";
strengthLabel.style.fontWeight = "bold";
strengthLabel.style.marginLeft = "10px";
document.querySelector(".strength-container").appendChild(strengthLabel);

function setStrengthLevel(level) {
    // Remove previous strength-* class
    for (let i = 1; i <= 5; i++) {
        indicator.classList.remove(`strength-${i}`);
    }

    // Add base class back if needed
    indicator.classList.add("strength-indicator");
    indicator.classList.add(`strength-${level}`);

    const levels = {
        1: "Very Weak",
        2: "Weak",
        3: "Medium",
        4: "Strong",
        5: "Very Strong"
    };
    strengthLabel.textContent = levels[level];
}


function calcStrength() {
    const hasUpper = upperCaseCheck.checked;
    const hasLower = lowerCaseCheck.checked;
    const hasNum = numberCheck.checked;
    const hasSymbols = symbolsCheck.checked;

    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNum) score++;
    if (hasSymbols) score++;
    if (passwordLength >= 12) score++;

    // Clamp between 1 and 5
    const level = Math.min(Math.max(score, 1), 5);
    setStrengthLevel(level);
}

// ========== Dark/Light Mode ==========
const toggleBtn = document.getElementById("modeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light")
        ? "Switch to Dark Mode"
        : "Switch to Light Mode";
});
