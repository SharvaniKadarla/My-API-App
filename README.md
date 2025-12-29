# My API App – Pokémon-Themed Next.js Project

A modern **Next.js (App Router)** web application that demonstrates API-driven content, component-based design, and context-based state management through a Pokémon-themed interface. The application organizes Pokémon content by elemental type (Fire, Water, Grass, and Electric) and presents it using custom styling and media assets.

🔗 **Live Demo:** https://my-api-app-phi.vercel.app/  


---

## ✨ Features

- Pokémon-themed user interface with type-based navigation  
- Dedicated pages for **Fire, Water, Grass, and Electric** Pokémon  
- Global state management using **React Context API**  
- Reusable and modular React components  
- Custom CSS styling for each Pokémon type  
- Responsive design for desktop and mobile devices  
- Centralized static asset management via the `public/` directory  
- Deployed and hosted using **Vercel**

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **React**
- **JavaScript (ES6+)**
- **CSS / CSS Modules**
- **React Context API**
- **Vercel** (Deployment)

---

## 🚀 Getting Started (Local Setup)

1️⃣ Clone the repository
- `git clone https://github.com/SharvaniKadarla/My-API-App.git`
- `cd My-API-App`

2️⃣ Install dependencies
- `npm install`

3️⃣ Run the development server
- `npm run dev`
- Open your browser and navigate to: `http://localhost:3000`

---

## 🌐 Application Pages

- `/` → Home page
- `/fire` → Fire-type Pokémon page
- `/water` → Water-type Pokémon page
- `/grass` → Grass-type Pokémon page
- `/electric` → Electric-type Pokémon page

Each page includes:
- Consistent navigation via the Navbar component
- Custom styles and background assets
- Pokémon-themed visuals and layout

---
## 🧠 State Management

- Uses **React Context API** through `PokemonContext.jsx`
- Enables shared Pokémon-related data across multiple pages and components
- Promotes clean data flow and maintainable state architecture

---
## 🎨 Styling Approach

- **Global styles**: `globals.css`
- **Page-level styles**: Individual CSS files for each Pokémon type
- **Component-level styles**: Scoped CSS for reusable components like the Navbar

---
## 🌍 Deployment

This project is deployed using **Vercel**.

🔗 **Live Project URL**:
https://my-api-app-phi.vercel.app/

To deploy your own version:
- Fork this repository
- Import the project into Vercel
- Vercel will automatically detect and build the Next.js app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
