// Este componente permite bloquear las acciones con el back-end mientras se cargan los recursos

// import TypewriterComponent from "typewriter-effect";
import { RotatingText } from "./RotatingText ";

export const Loading = () => {
	return (
		<div className="w-full min-h-screen fixed top-0 left-0 flex flex-items justify-center bg-gray-900/70">
			<div className="flex flex-row items-center justify-center">
				<span translate="no" className="flex items-center font-semibold text-5xl md:text-7xl text-white animate-pulse">
					<h1 className="font-rockSalt text-7xl md:text-9xl">X</h1>
					treme &nbsp;
					{/* <TypewriterComponent
						options={{
							strings: ["Elegancia", "Estilo", "Moda"],
							autoStart: true,
							loop: true,
							cursor: "_",
							wrapperClassName: "font-bold text-3xl md:text-5xl",
						}}
					/> */}
				</span>
				<RotatingText
					texts={["Elegancia.", "Estilo.", "Moda."]}
					mainClassName="px-2 sm:px-3 md:px-5 bg-amber-600/80 border-2 border-slate-50 shadow-sm shadow-slate-50 inset-shadow-sm inset-shadow-slate-50 text-shadow-lg text-shadow-black/80 text-white/95 flex text-3xl md:text-5xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg mt-5"
					staggerFrom={"last"}
					initial={{ y: "100%" }}
					animate={{ y: 0 }}
					exit={{ y: "-130%" }}
					staggerDuration={0.025}
					splitLevelClassName="overflow-hidden pb-2 sm:pb-2.5 md:pb-3"
					transition={{ type: "spring", damping: 30, stiffness: 500 }}
					rotationInterval={1500}
				/>
			</div>
		</div>
	);
};
