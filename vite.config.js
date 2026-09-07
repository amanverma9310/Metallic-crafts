import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Default is root ("/") so `npm run dev` and `npm run preview` work immediately.
//
// If you deploy this to GitHub Pages under a repo subpath, change this to
// "/<your-repo-name>/". Example: if your repo is
// https://github.com/you/clockstore-react, set base to "/clockstore-react/".
// main.jsx reads this value automatically (via import.meta.env.BASE_URL) and
// passes it to <BrowserRouter basename>, so routing keeps working either way.
export default defineConfig({
  plugins: [react()],
  base: '/Metallic-crafts/'
});
