# 🎮 Pokémon Search App

A modern, accessible Pokémon search application built with Next.js 16.1.6, featuring search pokemons and showing detailed Pokémon information.

## 🚀 Getting Started

### Prerequisites

- Minimum Node.js version: 20.9 
- [NextJS Installation Guide](https://nextjs.org/docs/app/getting-started/installation)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd search-pokemon-fm-tech
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your GraphQL endpoint:
```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://graphql-pokemon2.vercel.app/
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page with Pokémon grid
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── PokemonGrid.tsx   # Grid of Pokémon cards
│   ├── PokemonDetail.tsx # Detailed Pokémon modal
│   ├── SearchBar.tsx     # Search input component
│   └── ModalClose.tsx    # Mobile modal overlay
├── lib/
│   ├── data.ts           # GraphQL data fetching
│   ├── action.ts         # Server actions (cache revalidation)
│   └── config.ts         # App configuration
└── types/
    └── pokemon.ts        # TypeScript interfaces
```

## 🙏 Acknowledgments

- Pokémon data provided by [GraphQL Pokémon API](https://wayfair.github.io/dociql/)
- Built as a Frontend technical assessment
