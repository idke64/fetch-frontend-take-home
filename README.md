# Fetch Frontend Take Home

This is a Svelte-based web application that allows users to explore different dog breeds and manage their favorite breeds. The app dynamically displays a list of dog breeds with sub-breeds and allows users to filter based on favorited breeds or those with sub-breeds. Additionally, users can view images of each breed and interact with an accordion-style display for easy navigation. The app also utilizes local storage to remember the user's favorite breeds across sessions.

## Features

- **Dog Breed Gallery**: Browse a list of dog breeds and sub-breeds.
- **Favorites**: Mark breeds as favorites and manage your list of favorites.
- **Filtering**: Filter breeds by favorites or by whether they have sub-breeds.
- **Image Display**: View random images of each breed from an API.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Running the Project Locally

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- npm (comes with Node.js) or [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/fetch-take-home.git
   cd fetch-take-home
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or use pnpm
   pnpm install
   # or use yarn
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open the app in your browser**:
   If you want the app to automatically open in your browser, you can run:
   ```bash
   npm run dev -- --open
   ```
