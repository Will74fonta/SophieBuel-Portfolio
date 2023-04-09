// Récupération des projets de l’architecte//

const imagesContainer = document.querySelector('.gallery')

const reponse = fetch('http://localhost:5678/api/works')
    .then((reponse) => reponse.json())
    .then((data) => {
        data.forEach((work) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')

            figureImage.src = work.imageUrl
            figureImage.alt = work.title
            figureCaption.innerHTML = work.title
            figure.className = work.category.name

            imagesContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)    
            
        });
    });

//Filtres//

//Filtre Objets//
        
function filtreObjet(){
  //afficher les Objets//
  var elementObjets = document.querySelectorAll('.Objets');

  for (var i = 0; i < elementObjets.length; i++){
      elementObjets[i].style.display = 'block';
  }

  //cacher les autres travaux//
  var elementsAppartements = document.querySelectorAll(".Appartements");
  var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

  for (var i = 0; i < elementsAppartements.length; i++){
      elementsAppartements[i].style.display = 'none';
  }

  for (var j = 0; j < elementsHotelRestaurants.length; j++){
      elementsHotelRestaurants[j].style.display = 'none';
  }
}
var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreObjet);
            
     
//Filtre Hotel & resutaurants//
      
function filtreHotelsRestaurants(){
  //afficher les Hotels & restaurants//
  var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

  for (var i = 0; i < elementsHotelRestaurants.length; i++){
      elementsHotelRestaurants[i].style.display = 'block';
  }

  //cacher  les autrex travaux//
  var elementsAppartements = document.querySelectorAll('.Appartements');
  var elementsObjets = document.querySelectorAll('.Objets');

  for (var i = 0; i < elementsAppartements.length; i++){
      elementsAppartements[i].style.display = 'none';
  }

  for (var j = 0; j < elementsObjets.length; j++){
      elementsObjets[j].style.display = 'none';
  }
}

var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);

      
//Filtre Appartements//

function filtreAppartements(){
          
  //afficher les Appartements//
  var elementsAppartements = document.querySelectorAll('.Appartements');

  for(var i = 0; i < elementsAppartements.length; i++){
      elementsAppartements[i].style.display = 'block';
  }

  //cacher le autrex travaux//
  var elementsObjets = document.querySelectorAll('.Objets');
  var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

  for (var j = 0; j < elementsObjets.length; j++){
      elementsObjets[j].style.display = 'none';
  }

  for(var j= 0; j < elementsHotelRestaurants.length; j++){
      elementsHotelRestaurants[j].style.display = 'none';
  }
}

var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreAppartements);

//Filtre Tous//

function filtreTous(){
  //Afficher tout les travaux//
  var elementsObjets = document.querySelectorAll('.Objets');
  var elementsAppartements = document.querySelectorAll('.Appartements');
  var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

  for (var i = 0; i < elementsObjets.length; i++){
      elementsObjets[i].style.display = 'block';
  }

  for(var i = 0; i < elementsAppartements.length; i++){
      elementsAppartements[i].style.display = 'block';
  }

  for (var i = 0; i < elementsHotelRestaurants.length; i++){
      elementsHotelRestaurants[i].style.display = 'block';
  }
}

var bouton = document.getElementById('btnTous');
bouton.addEventListener('click',filtreTous);


const boutons = document.querySelectorAll('.bouton-css');


// Fonction qui garde le bouton filtre selectionné//

boutons.forEach((bouton) => {
  bouton.addEventListener('click', function() {
    // Supprime la classe "selected" de tous les boutons
    boutons.forEach((bouton) => {
      bouton.classList.remove('selected');
    });
    // Ajoute la classe "selected" au bouton cliqué
    this.classList.add('selected');
    // Stocke l'ID du bouton cliqué dans le stockage local
    localStorage.setItem('boutonSelectionne', this.id);
  });
});

// Vérifie si un bouton a été sélectionné précédemment
const boutonSelectionne = localStorage.getItem('boutonSelectionne');
if (boutonSelectionne) {
  // Ajoute la classe "selected" au bouton correspondant
  const bouton = document.getElementById(boutonSelectionne);
  bouton.classList.add('selected');
}

window.onbeforeunload = function(){
  localStorage.removeItem('boutonSelectionne');
}

//Modal
const openModal = () => {
  const modal = 
  document.getElementById("modal")
  modal.setAttribute("class", "open")
}
const button = 
document.getElementById("openTheModalPlease")
button.addEventListener("click", openModal)

// mode edition
if(localStorage.getItem("token")){
  login.classList.remove("edit");
  login.classList.add("noedit");
  logout.classList.remove("noedit");
  editBar.classList.remove("noedit");
  editBar.classList.add("flex");
  editImg.classList.remove("noedit");
  editArticle.classList.remove("noedit");
  editWorks.classList.remove("noedit");
}

// se déconnecter 
logout.addEventListener("click", () => {
  localStorage.clear()
})



  // Remplace login par logout
  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // Display elements with display: none
  const topBar = document.getElementById("top-bar");
  topBar.style.display = "flex";
  
  const editionMode = document.querySelectorAll(".edition-mode");
  editionMode.forEach(element => element.style.display = "flex");

  const publishButton = document.querySelector(".publish-button input[type='submit']");
  publishButton.classList.remove("publish");
  
  const logout = document.querySelector(".logout");
  logout.style.display = "block";
  
  const figureDisplay = document.querySelector(".figure-display");
  figureDisplay.style.display = "flex";
  
  const modificationDisplayImage = document.querySelector(".modification-display-image");
  modificationDisplayImage.style.display = "flex";
  
  const modify = document.querySelectorAll(".modify");
  modify.forEach(element => element.style.display = "block");
  
  const modificationDisplayProject = document.querySelector(".modification-display-project");
  modificationDisplayProject.style.display = "flex";

  // Set margin for header
  const header = document.querySelector("header");
  header.style.margin = "95px 0 92px 0";

  // Retire login button
  const loginNav = document.querySelector('.login-nav');
  loginNav.style.display = 'none';

  // Retire category-select div
  const categorySelect = document.querySelector(".category-select");
  categorySelect.style.display = "none";

  // Set margin for project-display
  const projectDisplay = document.querySelector(".project-display");
  projectDisplay.style.marginBottom = "92px";
