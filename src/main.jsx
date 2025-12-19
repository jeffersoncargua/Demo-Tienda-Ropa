import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Header, Footer, TopScroll } from "./components";
import { BrowserRouter as Router } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer as Toaster, Zoom } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Toaster
			position="bottom-right"
			autoClose={2000}
			hideProgressBar={true}
			theme="dark"
			transition={Zoom}
		/>
		<Provider store={store}>
			<Router>
				<Header />
				<TopScroll />
				<App />
				<Footer />
			</Router>
		</Provider>
	</StrictMode>,
);
