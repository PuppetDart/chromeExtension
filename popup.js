var parent=document.querySelector(".parent");
var text=document.querySelector(".text");
var temp=document.querySelector(".temp");
var sun=document.querySelector(".sun");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '03ea6b6876mshc2f2dcf88a97a71p1eaa9ejsnab496bf3f824',
		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}
};
sun.addEventListener('animationstart',()=>parent.classList.add("full_width_parent"));
var rotatant=document.querySelector('.loading_sun').style.getPropertyValue('--rotatant');
console.log(rotatant);
document.addEventListener("DOMContentLoaded",getTemp);
async function getTemp(){
    await setTimeout(
        ()=>{
            // animation-on-iteration event runs when
            // an iteration of animation is completed
            sun.addEventListener('animationiteration',()=>{
                sun.classList.remove("loading_sun");
                temp.textContent="86";
                text.classList.add("visible_text");
            });
        }, 0
    );
}
