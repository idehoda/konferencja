const modal = document.querySelector('#myModal');
const btn = document.querySelectorAll(".myBtn");
const span = document.querySelectorAll(".close")[0];
const modalImage = document.querySelector(".modal__image");
const modalName = document.querySelector(".modal__name");
const modalTitle = document.querySelector(".modal__title");
const modalText = document.querySelector(".modal__desc");
const moreButton = document.querySelector(".carousel__more");

// When the user clicks the button, open the modal 
btn.forEach(function(elem) {
    elem.addEventListener("click",modalInfo);
});
// btn.onclick = function() {
   
// }
function modalInfo(){
    modal.style.display = "block";

    let image = this.parentElement.children[0].src;
    let name = this.parentElement.children[1].textContent;
    let institution = this.parentElement.children[2].textContent;
    let text = this.textContent;
    
    modalImage.src = image;
    modalName.textContent = name;
    modalTitle.textContent = institution;
    modalText.textContent = text;    
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}