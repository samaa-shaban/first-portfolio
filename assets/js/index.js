// & dom
const darkButton=document.getElementById("theme-toggle-button");
const htmlTag=document.querySelector("html");
const settingsIcon=document.getElementById("settings-toggle");
const settingsSidebar=document.getElementById("settings-sidebar");
const closeSidebarBtn=document.getElementById("close-settings");
const fontButtons=document.querySelectorAll(".font-option");
const colorOptions=document.querySelectorAll(".color-option");
const body=document.body;
const colorDiv=document.getElementById("theme-colors-grid");
const resetSettingsBtn=document.getElementById("reset-settings")
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");
const heroSection=document.getElementById("hero-section");
const scrollToTopButton=document.getElementById("scroll-to-top")
const portfolioFilters=document.getElementById("portfolio-filters");
const potfolioItems=document.querySelectorAll(".portfolio-item");
const allTabsBtn=document.querySelectorAll("button.portfolio-filter");
const carousel=document.getElementById("testimonials-carousel");
const carouselNextBtn=document.getElementById("next-testimonial");
const carouselPrevBtn=document.getElementById("prev-testimonial");
const cards=document.querySelectorAll("#testimonials-carousel .testimonial-card");
const carouselIndicator=document.querySelectorAll(".carousel-indicator");



// & variables 
let scrollPosition=10;
let currentCarouselIndex=0;
let currentCardsInCarousel;

//& invoks
scrollSpy();
handleCarouselSize();

// & events
scrollToTopButton.addEventListener("click",goToTopSite);
darkButton.addEventListener("click",changeDark);
settingsIcon.addEventListener("click",showSidebar);
closeSidebarBtn.addEventListener("click",closeSidebar);
fontButtons.forEach(function (button){
button.addEventListener("click",function(e){
 changeFont(e);
});
})
colorDiv.addEventListener("click",function(e){
    getThePressedColor(e);
})
resetSettingsBtn.addEventListener("click",function(e){
  closeSidebar();
  document.querySelector("button[data-font='tajawal']").click();
  document.querySelector("button[title='Purple Blue']").click();
}
)
window.addEventListener("scroll",function(){
    scrollSpy();
    toTopButton();
})
portfolioFilters.addEventListener("click",function(e){
    handleClickedNav(e);
})
carouselNextBtn.addEventListener("click", function () {
  const maxLength = cards.length - currentCardsInCarousel;

  if (currentCarouselIndex < maxLength) {
    currentCarouselIndex++;
  } else {
    currentCarouselIndex = 0;
  }

  handleNextbtn();
});
carouselPrevBtn.addEventListener("click", function () {
  const maxLength = cards.length - currentCardsInCarousel;

  if (currentCarouselIndex <= 0) {
    currentCarouselIndex = maxLength;
  } else {
    currentCarouselIndex--;
  }

  handleNextbtn();
});

carouselIndicator.forEach(function(element){
    element.addEventListener("click",function(){

       currentCarouselIndex=element.dataset.index;
       handleNextbtn();
    })
})

window.addEventListener("resize", function () {
  handleCarouselSize();

  const maxLength = cards.length - currentCardsInCarousel;

  if (currentCarouselIndex > maxLength) {
    currentCarouselIndex = maxLength;
  }

  handleNextbtn();
});
// & functions
function changeDark(){
   if( htmlTag.classList.contains("dark")){
     htmlTag.classList.replace("dark","light");
   }else{
     htmlTag.classList.replace("light","dark");
   }
}
function showSidebar(){
     settingsSidebar.classList.remove("translate-x-full")  
     settingsIcon.style.right="20rem";
}
function closeSidebar(){
     settingsSidebar.classList.add("translate-x-full")  
     settingsIcon.style.right="0";
}
function changeFont(e){
    let fontBtn=e.target.closest("button");
    let fontName= fontBtn.dataset.font;
   console.log(fontBtn,fontName);
   
    body.classList.remove("font-alexandria","font-tajawal","font-cairo");
    body.classList.add(`font-${fontName}`);
    fontButtons.forEach(function(button){
        button.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        button.classList.add("border-slate-200","dark:border-slate-700");
    })
    fontBtn.classList.remove("border-slate-200","dark:border-slate-700");
    fontBtn.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800");
}
function getThePressedColor(e){
 let colorBtn= e.target.closest("button");
if(colorBtn!=null){
    let primaryColor=colorBtn.dataset.primary;
    let secondaryColor=colorBtn.dataset.secondary;
 
    htmlTag.style.setProperty("--color-primary",primaryColor);
    htmlTag.style.setProperty("--color-secondary",secondaryColor);
    htmlTag.style.setProperty("--color-accent",secondaryColor);
    colorOptions.forEach(function(button){
    button.classList.remove("ring-2","ring-primary","ring-offset-2","ring-offset-white","dark:ring-offset-slate-900")
})
    colorBtn.classList.add("ring-2","ring-primary","ring-offset-2","ring-offset-white","dark:ring-offset-slate-900");
}
 

}
function scrollSpy(){
 scrollPosition=window.scrollY+10;
let currrentSectionId="";

for (let i = 0; i< sections.length; i++) {
    const sectionOffsetTop=sections[i].offsetTop;
    const sectionHight=sections[i].offsetHeight;
    const sectionOffsetBottom=sectionOffsetTop+sectionHight;
    if(scrollPosition>sectionOffsetTop && scrollPosition <sectionOffsetBottom){
        currrentSectionId = sections[i].getAttribute("id");
        
    }
  
}
for(let i=0;i<navLinks.length;i++){
    navLinks[i].classList.remove("active");
      if(navLinks[i].getAttribute("href")===`#${currrentSectionId}`){
        navLinks[i].classList.add("active");
        
    }
}

}
function toTopButton(){
    const scrollPosition=window.scrollY;
    const heroSectionHight=heroSection.offsetHeight;
    if(scrollPosition>heroSectionHight){
        scrollToTopButton.classList.remove("opacity-0","invisible")
        scrollToTopButton.classList.add("opacity-100","visible")
    }else{
        scrollToTopButton.classList.add("opacity-0","invisible")
        scrollToTopButton.classList.remove("opacity-100","visible")
    }
}
function goToTopSite(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}
function handleClickedNav(e){
    const button=e.target.closest("button");
    
    if(button!==null){
        allTabsBtn.forEach(function(btn){
            btn.classList.remove("active","bg-linear-to-r","from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50");
        })
        button.classList.add("active","bg-linear-to-r","from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50");

        const filter=button.dataset.filter;

        potfolioItems.forEach(function(item){
            const category=item.dataset.category;
            item.style.opacity=0;
            item.style.transform="scale:(0.8)";
            setTimeout(function(){
                if(filter==="all"||filter===category) {
                item.classList.remove("hidden");
                setTimeout(function(){
                    item.style.opacity=1;
            item.style.transform="scale:(1)";
                },50)
                }
                else{
                    item.classList.add("hidden")
                
                }    
            },300)
        })
    }
}
function handleNextbtn(){
    const cardWidth = cards[0].offsetWidth;

  const offset = currentCarouselIndex * cardWidth;

  carousel.style.transform = `translateX(-${offset}px)`;
}

function handleCarouselSize(){
   if(window.innerWidth>1024) {
    currentCardsInCarousel=3;
   }else if(window.innerWidth>768)
   {
 currentCardsInCarousel=2;
   }else{
     currentCardsInCarousel=1;
   }
}
