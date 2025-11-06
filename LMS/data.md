## diagram
- https://miro.com/app/live-embed/uXjVJvZQz2k=/?embedMode=view_only_without_ui&moveToViewport=-3075%2C-1575%2C6183%2C2865&embedId=5184255272




backend => filename: name.name.js
fronend => filename: 
- name-name.jsx (components, pages, hooks, services, utils)  
- Global state: (context) AuthContext.jsx

Pure helper functions (no API, no side effects)
services/ API calls, backend communication, network logic

frontend
src/
├─ assets/ images, icons(home.svg), fonts
├─ components/
├─ pages/
├─ layouts/ repeat hone wale structure (navbar, sidebar, footer, main content).
├─ hooks/ reusable logic (state, API, effects, etc.).
├─ context/ Global state management using React Context API (like Auth, Theme, Language).
├─ services/ API communication layer (Axios instance + all backend requests).
├─ slices/ (optional if using Redux )
├─ utils/ Helper functions (no API or React state). Pure logic that can be reused anywhere.
├─ router/ React Router configuration — defines routes, protected routes, layouts, etc.
├─ styles/
├─ constants/ Store all constants, routes, roles, config variables.
├─ App.jsx / Global layout (theme, navbar, footer, providers) handle karna
└─ main.jsx




return <RouterProvider router={router} />;  router = createBrowserRouter(routes);

<!-- return "<Navigate to="/login" replace state={{ from: location }} />"; ye corrent route ko store karke rakhta hai taki login karne pe isi page pe aa sake  login me "navigate(location.state?.from?.pathname || "/", { replace: true })";-->



<!-- backend -->
server/
├─ src/
│  ├─ app.js Express app init + middlewares mount + routes attach.
│  ├─ server.js  Server bootstrap + DB connect + graceful shutdown.
│  ├─ config/ db.js
│  ├─ models/
│  ├─ migrations/
│  ├─ seeders/
│  ├─ routes/
│  ├─ controllers/  Req/Res layer only, service ko call karta hai.
│  ├─ services/  Business logic + DB ops + transactions + third-party calls.
│  ├─ middlewares/  Common middlewares: auth, validator, rateLimiter, errorHandler.
│  ├─ validators/  Request schemas (Zod/Yup) — clean validation.
│  ├─ utils/ Generic helpers (no framework coupling).
│  ├─ webhooks/
│  ├─ jobs/
│  ├─ emails/ Email templates + mailer (nodemailer/resend).
│  └─ tests/ Unit + integration (jest/vitest + supertest).
├─ .env
├─ .env.example
├─ package.json



Naming conventions (quick)
    files: kebab-case → auth.controller.js, auth.service.js
    models: PascalCase class names → User, files kebab or Pascal ok
    routes: feature.routes.js
    schemas: feature.schema.js





| Code    | Name                  | Meaning                       |
| ------- | --------------------- | ----------------------------- |
| **200** | OK                    | Request successful            |
| **201** | Created               | Resource created successfully |
| **400** | Bad Request           | Client sent invalid data      |
| **401** | Unauthorized          | Authentication required       |
| **403** | Forbidden             | No permission                 |
| **404** | Not Found             | Resource doesn’t exist        |
| **409** | Conflict              | Duplicate / version conflict  |
| **500** | Internal Server Error | Something broke on server     |
