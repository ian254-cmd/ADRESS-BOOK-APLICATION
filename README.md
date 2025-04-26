# Visited Places

## Description
This website allows users to track places they've visited by adding location, landmarks, time of year, and personal notes. Each place is stored using a JavaScript constructor and prototype.

## Features
- Add a place with its details.
- See a list of all added places.
- Click a place to see a detailed description.

## Technologies Used
- HTML
- CSS
- JavaScript (ES6)
- Test-Driven Development (pseudo-tests documented)

## Setup Instructions
1. Clone this repository.
2. Open `index.html` in your browser.
3. Use the form to add places and interact with the list.

## Business Logic

- **Constructor**: `Place(location, landmarks, timeOfYear, notes)`
- **Prototype Method**: `.describe()`

## Tests

### Place
- **Test 1**: Should correctly instantiate a place with properties.
- **Test 2**: Should store landmarks as an array.
- **Test 3**: Should format the description correctly.

### Example (Pseudo Tests)

```javascript
Describe: Place
Test: "should create a place object with given properties"
Expect: (new Place("Paris", ["Eiffel Tower"], "Spring", "City of light")).location to equal "Paris"
Expect: (new Place("Paris", ["Eiffel Tower"], "Spring", "City of light")).landmarks to include "Eiffel Tower"

Describe: Place.prototype.describe
Test: "should return a formatted description"
Expect: place.describe() to return "Paris - Famous for: Eiffel Tower. Visited during: Spring. Notes: City of light."
