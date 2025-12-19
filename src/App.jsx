import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
	return (
		<main className={`bg-[url(./assets/Fondo2.png)] bg-repeat`}>
			<div className="bg-black/5 w-full min-h-screen">
				<AllRoutes />
			</div>
		</main>
	);
}

export default App;
