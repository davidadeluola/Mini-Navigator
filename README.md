# Mini Navigator (Next.js & Convex App)

Mini Navigator is a high-performance full-stack web application built using **Next.js**, **Convex** for real-time backend/database functionality, and **Tailwind CSS** for modern and responsive styling. It acts as a sleek blog platform equipped with advanced user experience and optimization features.

## 🚀 Key Features Built & Achieved

### 1. Robust Real-Time Backend (Convex)
- **Live Database Syncing**: Entirely powered by Convex to handle instant reads and writes for Posts, Comments, and Learings.
- **File Storage**: Implemented secure, fast image uploads natively using Convex `_storage` for blog post hero images.
- **Multiplayer Presence (Facepile)**: Built a live presence system. Users viewing the same blog post can see a "Facepile" of avatars representing other concurrent readers in real-time.

### 2. Next-Generation Authentication
- **BetterAuth Integration**: Implemented a highly secure, modern authentication flow using `BetterAuth`.
- **Database Identity Mapping**: Tightly integrated auth sessions with the Convex database to accurately map user IDs to their blog posts and comments.

### 3. Global Typeahead Search
- Implemented a **global search bar** accessible via both the desktop navigation bar and the mobile slide-out drawer.
- **Keyboard Shortcut Integration**: Users can instantly focus the search bar from anywhere on the site by hitting `Ctrl + K` (or `Cmd + K` on Mac).
- **Debouncing Optimization**: Integrated intelligent debouncing (`500ms`) on user input. This dramatically improves performance by preventing multiple rapid API queries on every keystroke, thus saving bandwidth and eliminating lag.
- **Real-time Dropdown**: Seamless auto-complete dropdown that queries the Convex backend search indexes for blog titles and content, displaying instant clickable results.

### 4. Search Engine Optimization (SEO) Built-In
- **Server-Side Rendering (SSR)**: Leveraging Next.js App Router to dynamically server-render pages, ensuring search engine bots can perfectly index our rich blog content.
- **Dynamic Metadata & Open Graph Tags**: Each blog post automatically injects context-specific SEO tags (Titles, Descriptions, Authors) based on the database contents to improve click-through rates on search engines and social media.
- **Semantic HTML & High Accessibility**: Following strict semantic guidelines (proper use of `h1`, `header`, `nav`, `aside`) which provides a strong signal to Google's crawlers about the page's structure.

### 5. Advanced Content Platforms
- **Dynamic Blogging Engine**: Full CRUD capabilities for writing, reading, and commenting on blog posts.
- **"Learnings" Journal**: A dedicated timeline for tracking daily and weekly technical learnings, securely stored in a dedicated Convex table.

### 6. Modern Layout & UX
- Fully responsive sidebar and drawer for mobile viewports, implemented without messy external UI libraries.
- Beautiful, highly accessible component design using **Shadcn UI** and **Tailwind CSS**.
- Dark mode/Light mode toggling natively supported via `next-themes`.

## 🔐 Environment Variables

To run this project locally, you will need to create a `.env.local` file at the root of your project and populate it with the following variables:

```env
# Required by Convex Next.js client
NEXT_PUBLIC_CONVEX_URL="your-convex-project-url"

# Required by Convex BetterAuth for URL redirection and sessions
NEXT_PUBLIC_CONVEX_SITE_URL="http://localhost:3000"

# Used internally by Convex to connect your local app to your development deployment
CONVEX_DEPLOYMENT="your-convex-deployment-name"
```
*(Note: If you run `npx convex dev`, the `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` variables will usually be automatically configured for you).*

## 📖 Documentation & Guides

### Vercel Analytics
Vercel Analytics is integrated directly into the project to measure traffic, page views, and user behavior without compromising privacy.

**Installation & Usage Process:**
1. **Install Package**: We installed the official package via `npm install @vercel/analytics`.
2. **Inject Component**: The `<Analytics />` component is imported from `@vercel/analytics/react` and placed directly into the root `app/layout.tsx` file right before the closing `</body>` tag.
3. **Automatic Tracking**: Next.js and Vercel automatically handle the rest. Every time a user visits a page, the metrics will securely stream into your Vercel Dashboard under the "Analytics" tab.

### BetterAuth Authentication
We utilize **BetterAuth** tightly coupled with **Convex** to handle sessions seamlessly.

**Installation & Usage Process:**
1. **Setup**: The core logic is installed via the `@convex-dev/better-auth` integration.
2. **Configuration**: Configured inside `convex/auth.config.ts` and `lib/auth-server.ts`. This connects the BetterAuth providers directly to Convex's real-time identity system.
3. **Usage (Client-Side)**: We use the `useConvexAuth()` hook in our React components (like the Navbar) to determine if a user is `isAuthenticated` or `isLoading`.
4. **Usage (Server-Side/Mutations)**: Within our backend functions (e.g. `convex/posts.ts`), we invoke `authComponent.safeGetAuthUser(ctx)` to securely extract the user's ID and ensure they have authorization before modifying the database.

## 🛠️ Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
