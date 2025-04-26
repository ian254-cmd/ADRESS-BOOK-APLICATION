let localStorageAvailable = false;
try {
    localStorageAvailable = !!window.localStorage;
} catch (e) {
    localStorageAvailable = false;
}

const places = [];

// Constructor for Place
function Place(location, landmarks, timeOfYear, notes, image) {
    this.location = location;
    this.landmarks = landmarks;
    this.timeOfYear = timeOfYear;
    this.notes = notes;
    this.image = image;
}

// Prototype methods
Place.prototype.displayDetails = function() {
    const details = document.getElementById('details');
    details.innerHTML = `
      <img src="${this.image}" alt="${this.location}" style="width: 100%; max-width: 300px; border-radius: 15px; margin-bottom: 1rem;">
      <p><strong>Location:</strong> ${this.location}</p>
      <p><strong>Landmarks:</strong> ${this.landmarks.join(', ')}</p>
      <p><strong>Time of Year:</strong> ${this.timeOfYear}</p>
      <p><strong>Notes:</strong> ${this.notes}</p>
    `;
}

// Function to save places to local storage
function savePlaces() {
    if (localStorageAvailable) {
        localStorage.setItem('places', JSON.stringify(places));
    }
}

// Function to load places from local storage
function loadPlaces() {
    if (localStorageAvailable) {
        const savedPlaces = localStorage.getItem('places');
        if (savedPlaces) {
            places.push(...JSON.parse(savedPlaces));
        }
    }
}

// Function to add a place
function addPlace(location, landmarks, timeOfYear, notes, image) {
    if (!location || !landmarks || !timeOfYear) {
        alert('Please fill in all required fields.');
        return;
    }
    const newPlace = new Place(location, landmarks, timeOfYear, notes, image);
    places.push(newPlace);
    savePlaces();
    renderPlaces();
    document.getElementById('add-place-form').reset();
}

// Function to render places list
function renderPlaces() {
    const placesList = document.getElementById('places');
    placesList.innerHTML = '';
    places.forEach((place, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${place.image}" alt="${place.location}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin-right: 1rem;">
            ${place.location}
        `;
        li.addEventListener('click', () => place.displayDetails());
        placesList.appendChild(li);
    });
}

// Function to filter places based on search input
function filterPlaces() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const placesList = document.getElementById('places');
    placesList.innerHTML = '';
    places.filter(place => place.location.toLowerCase().includes(searchInput)).forEach(place => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${place.image}" alt="${place.location}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin-right: 1rem;">
            ${place.location}
        `;
        li.addEventListener('click', () => place.displayDetails());
        placesList.appendChild(li);
    });
}

// Load places from local storage on page load
loadPlaces();
renderPlaces();

// Event listener for adding new places
document.getElementById('add-place-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const landmarks = document.getElementById('landmarks').value.split(',').map(landmark => landmark.trim());
    const timeOfYear = document.getElementById('timeOfYear').value;
    const notes = document.getElementById('notes').value;
    const imageInput = document.getElementById('image');
    let image = 'https://via.placeholder.com/150'; // Default placeholder image
    if (imageInput.files.length > 0) {
        image = URL.createObjectURL(imageInput.files[0]);
    }
    addPlace(location, landmarks, timeOfYear, notes, image);
});

// Event listener for search input
document.getElementById('search').addEventListener('input', filterPlaces);  