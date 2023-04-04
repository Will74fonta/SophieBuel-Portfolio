// Étape 2 : Coder la page de connexion + Authentification de l’utilisateur

// login form element
const loginForm = document.querySelector('.login-form');

// event listener for the form submit event
loginForm.addEventListener('submit', function(event) {
  // Pour ne pas se logger par défaut
  event.preventDefault();

  // email and password input elements
  const emailInput = loginForm.querySelector('#email-input');
  const passwordInput = loginForm.querySelector('#password-input');

  // email and password values
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: emailValue, password: passwordValue })
  })
  .then(response => {
    // Vérifie the response status
    if (response.ok) {
      // Get the authentication token
      return response.json();
    } else {
      
      // Sinon, display error message
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
      throw new Error('Login failed');
    }
  })
  .then(data => {
   
    // Save the authentication token in local storage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('isLoggedIn', true);
    console.log('isLoggedIn:', true);
    
    // Rediriger vers index.html
    window.location.href = 'index.html';
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

if (localStorage.getItem('isLoggedIn') === 'true') {
  
}