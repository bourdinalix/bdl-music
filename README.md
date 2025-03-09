# BDL Music 🎵

A music search application built with React and Next.js, allowing users to search for albums through the iTunes API and manage their favorites.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bdl-music.git
cd bdl-music
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Getting Started

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Main Features

- 🔍 Album search through iTunes API
- 📑 Category filtering
- ⭐ Favorites system
- 💅 Modern and responsive user interface

## Features Description

### Search System 🔍
The search functionality allows users to find albums based on either the artist name or album title. The search implements a "starts with" logic, meaning it will match results that begin with the entered search term.

### Category Filter 📑
The category system automatically collects all unique categories from the fetched albums and displays them in a user-friendly select dropdown menu. Users can easily switch between categories by simply clicking on their desired choice in the dropdown, instantly filtering the displayed albums.

### Favorites System ⭐
Each album card features a star icon in the top right corner. Users can mark their favorite albums by clicking on the star, which turns yellow to indicate the album has been favorited. The system uses local storage to persistently save the IDs of favorited albums, ensuring that user preferences are maintained between sessions.

## Project Structure

```
bdl-music/
├── src/
│   ├── app/
│   ├── application/
│       ├── use-cases/
│   ├── domain/
│       ├── entities/
│       ├── repositories/
│       ├── services/
│   ├── infrastructure/
│       ├── repositories/
│       ├── services/
│   ├── presentation/
│       ├── components/
│       ├── hooks/
└── public/
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Creates a production build
- `npm start`: Runs the application in production mode
- `npm run lint`: Checks code with ESLint

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT