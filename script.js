// Identifiants de connexion
const validUsername = "admin";
const validPassword = "Roue2021*";

// Éléments DOM pour la connexion
const loginPage = document.getElementById('loginPage');
const appPage = document.getElementById('appPage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');

// Afficher seulement la page de connexion au début
document.addEventListener('DOMContentLoaded', () => {
    hideElement(appPage);
    showElement(loginPage);
});

// Gestion de la connexion
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === validUsername && password === validPassword) {
        showElement(appPage);
        hideElement(loginPage);
    } else {
        loginError.classList.remove('hidden');
    }
});

// Gestion des idées
const newIdeaButton = document.getElementById('newIdeaButton');
const viewIdeasButton = document.getElementById('viewIdeasButton');
const ideaForm = document.getElementById('ideaForm');
const ideaInput = document.getElementById('ideaInput');
const submitIdeaButton = document.getElementById('submitIdeaButton');
const ideasList = document.getElementById('ideasList');
const ideasContainer = document.getElementById('ideasContainer');

// Gestion des données des idées
function getIdeas() {
    return JSON.parse(localStorage.getItem('ideas')) || [];
}

function saveIdeas(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
}

// Affichage et masquage des éléments
function showElement(element) {
    element.classList.remove('hidden');
}

function hideElement(element) {
    element.classList.add('hidden');
}

// Ajouter une nouvelle idée
submitIdeaButton.addEventListener('click', () => {
    const ideaText = ideaInput.value.trim();
    if (ideaText) {
        const ideas = getIdeas();
        ideas.push({ text: ideaText, status: 'normal' });
        saveIdeas(ideas);
        ideaInput.value = '';
        alert('Idée ajoutée avec succès !');
    }
});

// Rendu des idées
function renderIdeas() {
    const ideas = getIdeas();
    ideasContainer.innerHTML = '';
    ideas.forEach((idea, index) => {
        const li = document.createElement('li');
        li.className = `idea-item ${idea.status}`;
        li.innerHTML = `
            <span>${idea.text}</span>
            <div class="idea-actions">
                <button class="btn-excellent" onclick="markIdea(${index}, 'green')">Excellente</button>
                <button class="btn-potable" onclick="markIdea(${index}, 'orange')">Potable</button>
                <button class="btn-delete" onclick="confirmDeleteIdea(${index})">Supprimer</button>
            </div>
        `;
        ideasContainer.appendChild(li);
    });
}

// Marquer une idée
window.markIdea = (index, status) => {
    const ideas = getIdeas();
    ideas[index].status = status;
    saveIdeas(ideas);
    renderIdeas();
};

// Supprimer une idée avec confirmation
window.confirmDeleteIdea = (index) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette idée ?");
    if (confirmDelete) {
        deleteIdea(index);
    }
};

function deleteIdea(index) {
    const ideas = getIdeas();
    ideas.splice(index, 1);
    saveIdeas(ideas);
    renderIdeas();
}

// Navigation entre les pages
newIdeaButton.addEventListener('click', () => {
    showElement(ideaForm);
    hideElement(ideasList);
});

viewIdeasButton.addEventListener('click', () => {
    renderIdeas();
    showElement(ideasList);
    hideElement(ideaForm);
});
