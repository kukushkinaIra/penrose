const drops = document.getElementById('myDropdown');
const dropbtn = document.querySelector('.dropbtn');


dropbtn.addEventListener('click', () =>{
    drops.classList.toggle("hide");
})

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        drops.classList.add("hide");
    }
}


const makeRequest = async(url, method) => {
    try {
        const response = await fetch(url, { method })
        const data = await response.json()
        return data;
    } catch(error) {
        console.error(error);
    }
}

let currentSlide = 0;
const slider = document.getElementById('slider')
const sliderDots = document.getElementById('slider-dots')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

prev.onclick = () =>{
    currentSlide = Math.max(0, currentSlide-1)
    showSlide()
}

next.onclick = () =>{
    currentSlide = Math.min(slider.children.length-1, currentSlide+1)
    showSlide()
}

function showSlide(){
    Array.from(slider.children).forEach(element => {
        element.style.display = "none"
    });
    slider.children[currentSlide].style.display = "flex"

    Array.from(sliderDots.children).forEach(el => {
        el.classList.remove('active')
    })
    sliderDots.children[currentSlide].classList.add('active')
}

function setCurrentSlide(index){
    currentSlide = index;
    showSlide()
}

const getCosmetics = async() => {
    const allCosmetics = await makeRequest('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline', 'GET');
    const cosmeticsWithPriceLowerThanFive = allCosmetics.filter((el) => Number(el.price) < 5)

    cosmeticsWithPriceLowerThanFive.forEach((el, index) =>{
        const itemSlider = document.createElement("div");
        const name = document.createElement("span")
        const price = document.createElement("span")
        itemSlider.append(name,price)

        name.textContent = el.name
        name.style.color = "white"
        price.textContent = el.price
        price.style.color = "white"
        itemSlider.classList.add('item')
        slider.appendChild(itemSlider)

        const itemDot = document.createElement("div")
        itemDot.classList.add('slider-dots_item')
        sliderDots.appendChild(itemDot)

        itemDot.onclick = () => setCurrentSlide(index)
    })

    showSlide()

}

getCosmetics()