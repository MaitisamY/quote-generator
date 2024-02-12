# 3 - Quote Generator Application

## Introduction

The Quote Generator Application is a simple project designed to provide users with inspirational and thought-provoking quotes based on their preferences. Users can input the type of quote they are interested in and specify the number of quotes they want to receive. The application utilizes the quotable.io API to fetch quotes and presents them in an easily accessible format.

## Features
- **User Input**: Users can input their preferences for quote type and limit.
- **API Requests**: The application makes two API requests to the quotable.io API.
  - **Getting Available Tags**: Fetches all available tags from the API endpoint.
  - **Getting Quotes**: Retrieves quotes based on user-specified parameters from the API endpoint.
- **Copy Quotes**: Users can copy quotes for easy sharing or saving.

## Usage
1. **Input Preferences**: Enter the type of quote (tag) and the number of quotes (limit) you want to receive.
2. **Fetch Quotes**: Click on the "Get Quotes" button to fetch quotes based on your preferences.
3. **View Quotes**: View the quotes displayed on the screen.
4. **Copy Quotes**: Click on the copy button next to each quote to copy it for sharing or saving.

## API Endpoints
- **Getting Available Tags**: `GET` request to `https://api.quotable.io/tags`.
- **Getting Quotes**: `GET` request to `https://api.quotable.io/quotes/random?limit=${limit}&tags=${tag}`.

## Installation
1. Clone or download the Flashcard Quiz repository from [GitHub](https://github.com/MaitisamY/quote-generator).
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open the provided URL in a web browser to access the application.

## Live Demo
Check out the live version of the project [here](https://quote-generator-sooty-two.vercel.app/)

## Support
For any inquiries or support requests, please contact the development team through our GitHub repository.

## Note
This project is open-source and does not include a license. Users are free to use and modify the code according to their requirements.
