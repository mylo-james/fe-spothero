# Mylo's Parking Challenge 🚗

Welcome to Mylo's parking challenge! In this project, I've not only parked in the provided spots but also introduced some exciting new features to enhance the user experience. I've also dedicated a significant amount of time to documenting the changes made to ensure clarity and maintainability. 📝

## [Github](https://github.com/mylo-james/fe-spothero)

## Features 🌟

### Story #1: Spot Details Modal (✔️)

Users want to see details about a parking spot before reserving it.

#### Requirements

-   Implement a modal that shows the spot details. Follow [the design](./screens/search-modal.jpg) provided by the product team. (✔️)

    -   The modal should gracefully drive in and out, not just appear/disappear. (✔️)

### Story #2: Easy Spot Reservation (✔️)

Users should be able to reserve a parking spot with ease.

#### Requirements

-   Add a form that takes user input, verifies it, and allows the user to proceed to the confirmation page. Follow [the design](./screens/checkout.jpg) provided by the product team. (✔️)

    -   Email and Phone Number fields are required and should [display errors](./screens/checkout-errors.jpg) if not filled out correctly. (✔️)
    -   Phone Number should only allow entry of digits. Bonus points for auto-formatting to a US phone number (such as _(xxx) xxx-xxxx_). (✔️)
    -   Adjust the confirmation page (if necessary) to ensure it works and renders correctly. (✔️)
    -   Make sure that a second reservation and parking in another spot updates all UI correctly. (✔️)

## Additional Features 🚀

### Parking Session Tracking 🕑

-   **Parking Session ID**: A parking session ID is generated and stored in sessionStorage, enabling users to enter their information only once.
-   **Clear Parking Session Button**: A "Clear Parking Session" button on the home page allows users to reset their parking session and start fresh. 🔄

### Activity Tracking 🏃‍♂️

-   **User Activity**: User activity is monitored, and the user is considered "active" while navigating the parking app.
-   **Automatic Data Save**: When the user becomes inactive for 1 second, an API call is triggered to save their parking information securely. This data can be retrieved later using their parking session token. 💾

### Enhanced Parking API 🌐

I've made improvements to the parking API, including additional routes for user data:

-   `GET /users/:sessionId`: Get user parking data by session ID.
-   `PUT /users/:sessionId`: Update user parking data by session ID.
-   `POST /users`: Create a new parking user.

## Documentation 📖

I believe in the power of documentation to make code understandable and maintainable, just like proper parking signage! I've spent a significant amount of time documenting the changes made in this project, ensuring that anyone who parks here can easily understand and extend the functionality.

## Getting Started 🚦

1. Download or clone this parking lot.
2. Run `npm install` to download all necessary dependencies.
3. Run `npm start` to serve the parking API and start the local parking experience.

## API 🌐

The parking API is available at `http://localhost:8001/api` and offers the following routes:

-   `GET /spots`: Get a list of available parking spots.
-   `GET /spots/:id`: Get parking spot details by ID.
-   `GET /reservations/:id`: Get parking reservation details by ID.
-   `POST /reservations`: Make a parking reservation with the required fields.

-   `GET /users/:sessionId`: Get user parking data by parking session ID.
-   `PUT /users/:sessionId`: Update user parking data by parking session ID.
-   `POST /users`: Create a new parking user.

## Testing 🧪

Testing plays a crucial role in ensuring the smooth parking experience of this application. While the existing parking lot may not include tests, I encourage the addition of tests to verify and validate the parking functionality.

## Feedback 💌

I value your feedback and welcome any further improvements and enhancements to this parking lot. Thank you for considering Mylo's parking challenge. I'm excited to showcase these additions and look forward to your feedback.
