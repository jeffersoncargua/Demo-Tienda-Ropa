import TypewriterComponent from "typewriter-effect";

export const Loading = () => {
	return (
		<div className="w-full min-h-screen fixed top-0 left-0 flex flex-items justify-center bg-gray-900/70">
			<div className="flex flex-col items-center justify-center">
				<span className="flex text-5xl md:text-7xl text-white items-center animate-pulse">
					<h1 className="font-rockSalt text-7xl md:text-9xl">X</h1>
					treme &nbsp;
					<TypewriterComponent
						options={{
							strings: ["Elegancia", "Estilo", "Moda"],
							autoStart: true,
							loop: true,
							cursor: "_",
							wrapperClassName: "font-bold text-3xl md:text-5xl",
						}}
					/>
				</span>
			</div>
		</div>
	);
};
