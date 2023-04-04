// Etape 1 Récupération des projets de la galerie et filtre des projets dans la galerie

// API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => console.log ("ok", data))
  .catch(error => console.error(error));
  
// Page principale et catégories
const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";

const gallery = document.querySelector(".gallery");
const categorySelect = document.createElement("div");
categorySelect.classList.add("category-select");

categorySelect.style.display = "flex";
categorySelect.style.justifyContent = "center";
categorySelect.style.gap = "1rem";
categorySelect.style.marginTop = "51px";
categorySelect.style.marginBottom = "51px";

fetch(categoriesUrl)
  .then(response => response.json())
  .then(data => {
    const categories = new Set([""]);
    data.forEach(category => categories.add(category.name));
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category ? category : "Tous";
      button.value = category;
      button.addEventListener("click", event => {
        const category = event.target.value;
        const worksElements = gallery.querySelectorAll(".work");
        worksElements.forEach(workElement => {
          if (category === "" || workElement.dataset.category === category) {
            workElement.style.display = "block";
          } else {
            workElement.style.display = "none";
          }
        });

        // Changement de couleur des boutons quand ils sont sélectionnés
        const buttons = categorySelect.querySelectorAll("button");
        buttons.forEach(button => {
          button.style.backgroundColor = button.value === category ? "#1D6154" : "white";
          button.style.color = button.value === category ? "white" : "#1D6154";
        });
      });

      button.style.backgroundColor = category === "" ? "#1D6154" : "white";
      button.style.color = category === "" ? "white" : "#1D6154";
      button.style.border = "2px solid #1D6154";
      button.style.borderRadius = "60px";
      button.style.padding = "0.5rem 2rem";
      button.style.height = "37px";
      button.style.fontFamily = "Syne";
      button.style.fontWeight = "700";
      button.style.fontSize = "16px";
      button.style.cursor = "pointer";

      categorySelect.appendChild(button);
    });
  })
  .catch(error => console.error(error));

  //Affichage Travaux Accueil Login

const displayWorksInList = (works)=>{
  gallery.innerHTML=""
  works.forEach(work => {
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    workElement.dataset.category = work.category.name;

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    workElement.appendChild(imageElement);

    const titleElement = document.createElement("h3");
    titleElement.textContent = work.title;
    workElement.appendChild(titleElement);

    gallery.appendChild(workElement);
  });
}

// Étape 3.1 : Ajout de la fenêtre modale

//Affichage Modale 1
const displayWorksInModal = (works)=>{
  document.getElementById("modal-works-container").innerHTML=""
  works.forEach(work => {
    
    // Affichage de la fenêtre modale
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    workElement.dataset.category = work.category.name;

    // Affichage des images modale
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    workElement.appendChild(imageElement);

    // Affichage de la Poubelle
    const iconElement = document.createElement("i")
    iconElement.setAttribute("class", "fa-solid fa-trash-can trash")
    workElement.appendChild(iconElement);

     // Affichage Editer
    const editButton = document.createElement("span");
    editButton.setAttribute("class", "edit-button");
    workElement.appendChild(editButton);
    editButton.textContent = 'éditer';

// Creer un evenement sur icone Poubelle
iconElement.addEventListener("click", ()=>{
  console.log(work.id)
  fetch (worksUrl +"/" +work.id,{
    method:"DELETE", 
    headers:
    {  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
  })
  .then(()=>{
    console.log("delete ok")
    listWorks()
  })
})
  
//Acces Deuxième page de la modale depuis la premiere

const addPhotoButton = document.getElementById('add-photo');
const firstElements = document.getElementById('first-elements');
const newElements = document.getElementById('new-elements');
const closeIcon = document.querySelector('.cross-icon');
const arrowIcon = document.querySelector('.close-icon');
const modal = document.getElementById('modal1');


//Acces Deuxième page de la modale + cache modale1

//creer un evenenement sur bouton Ajouter Photos
addPhotoButton.addEventListener('click', function() {
  firstElements.style.display = 'none';
  newElements.style.display = 'flex';
});

//creer un evenenement sur bouton croix fermer modale
closeIcon.addEventListener('click', function() {
  firstElements.style.display = 'flex';
  newElements.style.display = 'none';
});

//Retour Modal page 1
// Creer un evenement sur fleche retour
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    firstElements.style.display = 'flex';
    newElements.style.display = 'none';
  }
});

arrowIcon.addEventListener('click', function() {
  firstElements.style.display = 'flex';
  newElements.style.display = 'none';
});

    document.getElementById("modal-works-container").appendChild(workElement);
  });
}

const listWorks=() =>{
  fetch(worksUrl)
  .then(response => response.json())
  .then(data => {
    displayWorksInList(data)
    displayWorksInModal (data)
  })
  .catch(error => console.error(error));
}
listWorks()
  document.querySelector("#portfolio").insertBefore(categorySelect, gallery);

// Bouton "Valider" Ajout Projet

document.getElementById("send-validation").addEventListener("click", function(event) {
  event.preventDefault();
  
  // Cherche les data dans le form inputs et le file uploadé
  const file = document.getElementById("photo-addition-button").files[0];
  const title = document.getElementById("title-input").value;
  const category = document.getElementById("category-input").value;
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);
  
  // Vérifie que les champs sont remplis et que le fichier a la bonne taille et le bon format
  if (title.trim() === "" || category.trim() === "" || !file || !["image/jpeg", "image/png"].includes(file.type) || file.size > 4000000) {
    alert("Veuillez remplir tous les champs et sélectionner une image de type jpg ou png de taille maximale 4 Mo.");
    return;
  }
  // Envoie les data à l'API avec un fetch
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: formData
  })
  
  .then(response => response.json())
  .then(data => {
    // Quand l'API répond, display le work ajouté dans la gallerie et la modale
    // On peut accéder aux données du work ajouté depuis le `data` object renvoyé par l'API
    console.log(data);
    // Display les works ajoutés dans la modale et la gallery
  })
  .catch(error => console.error(error));
});

// Remplir la category select input avec les données de l'API
fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(data => {
  const categoryInput = document.getElementById("category-input");
  data.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    categoryInput.add(option);
  });
})
.catch(error => console.error(error));

// Image upload
const photoAdditionButton = document.getElementById("photo-addition-button");
const sendValidationButton = document.getElementById("send-validation");

// Met un event listener au bouton send validation
sendValidationButton.addEventListener("click", function() {
  const title = titleInput.value;
  const category = categoryInput.value;
});

// Met un event listener sur le bouton d'ajout de photo
photoAdditionButton.addEventListener("change", function() {
  sendValidationButton.style.backgroundColor = "#1D6154";
});

//Login local storage (Partie 2)

function submitForm(event) {
  event.preventDefault(); 

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  // Fetch vérifier email et password avec le backend
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(response => {
    console.log('response', response);
    if (response.ok) {
      localStorage.setItem("isLoggedIn", true);
     
    } else {
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

if (localStorage.getItem("isLoggedIn") === "true") {

  // Remplace login par logout
  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // Affiche les elements display: none + Hiden

  //  Affiche Top Bar
  const topBar = document.getElementById("top-bar");
  topBar.style.display = "flex";
  
  const editionMode = document.querySelectorAll(".edition-mode");
  editionMode.forEach(element => element.style.display = "flex");

  const publishButton = document.querySelector(".publish-button input[type='submit']");
  publishButton.classList.remove("publish");

  
   //  Affiche Logout
  const logout = document.querySelector(".logout");
  logout.style.display = "block";

   // Retire login button
   const loginNav = document.querySelector('.login-nav');
   loginNav.style.display = 'none';

  
  const figureDisplay = document.querySelector(".figure-display");
  figureDisplay.style.display = "flex";
  
  //  Affiche Div modification-display-image
  const modificationDisplayImage = document.querySelector(".modification-display-image");
  modificationDisplayImage.style.display = "flex";
  
  //  Affiche Modifier
  const modify = document.querySelectorAll(".modify");
  modify.forEach(element => element.style.display = "block");
  
  //  Affiche Div modification-display-project
  const modificationDisplayProject = document.querySelector(".modification-display-project");
  modificationDisplayProject.style.display = "flex";

  //  marge header
  const header = document.querySelector("header");
  header.style.margin = "95px 0 92px 0";

  // Hiden category-select div
  const categorySelect = document.querySelector(".category-select");
  categorySelect.style.display = "none";

  // Set margin for project-display
  const projectDisplay = document.querySelector(".project-display");
  projectDisplay.style.marginBottom = "92px";
}

// Modale (Partie 3)

const openModal = function (e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href').substring(1); // Enlève le leading #
  const target = document.getElementById(targetId);
  if (!target) {
    console.error(`Cannot find modal element with ID ${targetId}`);
    return;
  }
  target.style.display = 'flex';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');

  // Fermer la fenêtre quand on click en dehors
  target.querySelector('.modal-wrapper').addEventListener('click', function (e) {
    e.stopPropagation();
  });
};

//Fermer la modale

const closeModal = function (target) {
  target.style.display = 'none'
  target.setAttribute('aria-hidden', 'true')
  target.removeAttribute('aria-modal')
}

document.querySelectorAll('.modal').forEach(a => {
  a.addEventListener('click', openModal)
})

document.querySelectorAll('.modal-display').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal(this);
    }
  });
});

document.querySelectorAll('.modal-close').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal(e.target.closest('.modal-display'));
  });
});

// blob preview Image
const avatar = document.getElementById("avatar")
function imagePreview(e) {
  const blob = new Blob([e.files[0]], { type: "image/jpeg" })
  const blobURL = URL.createObjectURL(blob)
  avatar.style.display = "block"
  avatar.src = blobURL
}