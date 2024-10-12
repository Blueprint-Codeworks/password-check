document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const passwordStrength = document.getElementById('passwordStrength');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const passwordImprovement = document.getElementById('passwordImprovement');
    const passwordExamplesList = document.getElementById('passwordExamplesList');
    const togglePassword = document.getElementById('togglePassword');
  
    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 509.319 509.319" style="enable-background:new 0 0 509.319 509.319;" xml:space="preserve" width="24" height="24">
        <g>
          <path d="M488.942,188.222L488.942,188.222c-16.507-24.031-36.159-45.743-58.432-64.555l60.096-60.075   c12.135-12.848,11.558-33.101-1.29-45.236c-12.346-11.661-31.65-11.647-43.979,0.031l-69.248,69.269   c-37.697-18.837-79.311-28.5-121.451-28.203C159.882,60.36,71.893,108.716,20.334,188.222c-27.112,39.874-27.112,92.264,0,132.139   c16.507,24.031,36.159,45.743,58.432,64.555L18.67,445.054c-12.501,12.501-12.501,32.769,0,45.269   c12.501,12.501,32.769,12.501,45.269,0l69.248-69.269c37.697,18.837,79.311,28.5,121.451,28.203   c94.756-0.905,182.745-49.262,234.304-128.768C516.112,280.586,516.112,228.125,488.942,188.222z M73.113,284.222   c-12.285-18.016-12.285-41.717,0-59.733C112.451,162.079,180.866,124,254.638,123.454c24.861-0.121,49.543,4.215,72.875,12.8   l-39.552,39.531c-43.381-18.416-93.478,1.823-111.893,45.204c-9.046,21.309-9.046,45.38,0,66.689l-51.989,52.011   C104.466,323.794,87.295,305.106,73.113,284.222z M436.163,284.222c-39.339,62.41-107.754,100.489-181.525,101.035   c-24.861,0.121-49.543-4.215-72.875-12.8l39.552-39.552c43.381,18.416,93.478-1.823,111.893-45.204   c9.046-21.309,9.046-45.38,0-66.689l51.989-51.989c19.612,15.895,36.783,34.583,50.965,55.467   C448.448,242.505,448.448,266.206,436.163,284.222L436.163,284.222z"/>
        </g>
      </svg>
    `; // Ojo con una X
      } else {
        passwordInput.type = 'password';
        togglePassword.textContent = '👁️'; // Ojo normal
      }
    });
  
    // Evaluar la fuerza de la contraseña
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);
  
      passwordStrength.value = strength;
      displayFeedback(strength);
  
      const improvementMessage = getImprovementMessage(password);
      passwordImprovement.textContent = improvementMessage;
  
      generatePasswordExamples(password);
    });
  
    function calculatePasswordStrength(password) {
      let strength = 0;
  
      if (password.length >= 6) strength += 20; // Longitud
      if (/[A-Z]/.test(password)) strength += 20; // Mayúsculas
      if (/[a-z]/.test(password)) strength += 20; // Minúsculas
      if (/\d/.test(password)) strength += 20; // Números
      if (/[\W_]/.test(password)) strength += 20; // Símbolos
  
      return strength;
    }
  
    function displayFeedback(strength) {
      if (strength === 0) {
        passwordFeedback.textContent = 'Introduce una contraseña para evaluarla.';
        passwordFeedback.className = 'password-feedback';
      } else if (strength <= 40) {
        passwordFeedback.textContent = 'Poco Segura';
        passwordFeedback.className = 'password-feedback poco-segura';
      } else if (strength <= 70) {
        passwordFeedback.textContent = 'Segura';
        passwordFeedback.className = 'password-feedback segura';
      } else {
        passwordFeedback.textContent = 'Muy Segura';
        passwordFeedback.className = 'password-feedback muy-segura';
      }
    }
  
    function getImprovementMessage(password) {
      const missingRequirements = [];
  
      if (password.length < 6) missingRequirements.push('mínimo 6 caracteres');
      if (!/[A-Z]/.test(password)) missingRequirements.push('una letra mayúscula');
      if (!/[a-z]/.test(password)) missingRequirements.push('una letra minúscula');
      if (!/\d/.test(password)) missingRequirements.push('un número');
      if (!/[\W_]/.test(password)) missingRequirements.push('un símbolo');
  
      if (missingRequirements.length === 0) {
        return '¡Esta contraseña es fuerte!';
      }
  
      return `Para mejorar, incluye: ${missingRequirements.join(', ')}.`;
    }
  
    function generatePasswordExamples(password) {
      const examples = [];
      let modifiedPassword = password;
  
      if (password.length < 6) {
        modifiedPassword += '123!';
      }
  
      if (!/[A-Z]/.test(password)) {
        modifiedPassword = modifiedPassword.charAt(0).toUpperCase() + modifiedPassword.slice(1);
      }
  
      if (!/\d/.test(password)) {
        modifiedPassword += '1';
      }
  
      if (!/[\W_]/.test(password)) {
        modifiedPassword += '-!';
      }
  
      // Generar algunos ejemplos
      examples.push(`Ejemplo 1: ${modifiedPassword}`);
      examples.push(`Ejemplo 2: ${modifiedPassword.slice(0, 4)}XyZ!${modifiedPassword.slice(-2)}`);
      examples.push(`Ejemplo 3: ${modifiedPassword}22$`);
  
      // Limpiar y actualizar la lista de ejemplos
      passwordExamplesList.innerHTML = '';
      examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        passwordExamplesList.appendChild(li);
      });
    }
  });
  