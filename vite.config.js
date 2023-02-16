import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
// https://vitejs.dev/config/
var { api_endpoint } = JSON.parse(fs.readFileSync("./env.json"));
export default defineConfig({
	plugins: [react()],
	define: {
		vite_api_endpoint: JSON.stringify(api_endpoint),
	},
});
