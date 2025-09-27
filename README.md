# Waggle

**Waggle** is a smart, on-demand platform designed to simplify pet care for busy dog owners. Users can effortlessly request a dog walk, and the system automatically matches them with an available walker in their area. The app is built with **Next.js**, **Prisma ORM** with **PostgreSQL**, and integrates **PayFast** for seamless payments, prioritizing speed, ease of use, and convenience.

---

## Features

- **On-Demand Dog Walking:** Request a walk instantly and get matched with an available walker nearby.
- **Real-Time Availability:** Walkers’ schedules are dynamically managed to ensure optimal matching.
- **Secure Payments:** Integrated with **PayFast**, allowing users to make secure and seamless payments.
- **User Profiles:** Owners and walkers can create and manage profiles, including personal details and preferences.
- **Walk History & Tracking:** View past walks, track ongoing walks, and receive updates in real-time.
- **Responsive Design:** Fully optimized for both desktop and mobile devices for a smooth user experience.
- **Scalable Architecture:** Built with performance and growth in mind, supporting future feature expansion and high user traffic.

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript  
- **Backend:** Node.js, Next.js API routes  
- **Database:** PostgreSQL, Prisma ORM  
- **Payments:** PayFast integration for secure transactions  
- **Other:** MDX for content management, server-side rendering (SSR) for SEO and fast page loads  

---

## Architecture & Design

- **Full-Stack React/Next.js Application:** Uses API routes for backend logic and Prisma ORM for database management.  
- **Dynamic Matching System:** Walk requests are automatically matched with available walkers in the area using real-time scheduling logic.  
- **Secure Transactions:** Payment workflows are securely handled via PayFast sandbox in development and live environment in production.  
- **Scalable & Maintainable:** Modular codebase allowing easy addition of features, optimized for performance and maintainability.  

---

## Future Enhancements

- Push notifications for walk updates  
- Ratings and reviews for walkers  
- Multi-pet support for owners  
- Route optimization for walkers using mapping APIs  
- Admin dashboard for managing users, walks, and payments  

---

## Demo

Check out the live demo here: [Waggle Demo](https://wagglev1.vercel.app/)

---

## License

*(Include license info if applicable, e.g., MIT License)*
