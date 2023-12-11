
let hamb = document.querySelector(".hamb");
let navMenu = document.querySelector(".nav_menu");

hamb.addEventListener("click", mobileMenu);
function mobileMenu(){
  hamb.classList.toggle("active")
  navMenu.classList.toggle("active")
}

const navLink = document.querySelectorAll(".nav_link");

navLink.forEach(n => n.addEventListener("click",closeMenu));
function closeMenu(){
  hamb.classList.remove("active");
  navMenu.classList.remove("active");
}
/*-----------------------TRUNKATE------------------*/
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + "…";
  } else {
    return str;
  }
}

let originalTextElements = document.querySelectorAll('.overlay p');
originalTextElements.forEach(element => {
  let originalText = element.textContent;
  let truncatedText = truncate(originalText, 250);
  element.textContent = truncatedText;
});

/*------------CAPTCHA----------*/
(function(){
  const fonts = ["cursive", "sans-serif", "serif", "monospace"];
  let captchaValue = "";
  function generateCaptcha(){
    let value = btoa(Math.random()* 1000000000);
    value = value.substring(0,5 + Math.random()* 5);
    captchaValue= value;
  }
  
function setCaptcha(){
  let html = captchaValue.split("").map((char)=>{
    const rotate = -20 + Math.trunc(Math.random()*30);
    const font =  Math.trunc(Math.random()*fonts.length);
    return `<span 
      style="
        transform: rotate(${rotate}deg);
        font-family:${fonts[font]};"
    >${char}</span>`;
  }).join("");
  document.querySelector(".inputBox .captcha .preview").innerHTML = html;
}
  function initCaptcha(){
    document.querySelector(".inputBox .captcha .captcha-refresh").addEventListener("click",function(){
      generateCaptcha();
      setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
  }
  initCaptcha();

  document.querySelector(".inputBox #login-form").addEventListener("click",function(){
    let inputCaptchaValue = document.querySelector(".inputBox .captcha input").value;
    if(inputCaptchaValue == captchaValue){
      alert("success");
    }
    else{
      alert("Invalid captcha");
    }
  });
  
})();


