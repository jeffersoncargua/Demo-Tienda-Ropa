// Este componente permite que al cambiar la pagina, retorne al punto (0,0) de la ventana

import { useEffect } from "react";
import { useLocation } from "react-router";

export const TopScroll = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};
