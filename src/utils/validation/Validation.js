const message = {
	required: {
		nombre: "El nombre y apellido son requeridos",
		identificacion: "La identificacion es requerida",
		telefono: "El telefono es requerido",
		email: "El email es requerido",
		direccion: "La direccion es requerida",
	},

	error: {
		nombre: "Solo debe ingresar letras",
		identificacion:
			"La identificacion debe contener 10 o 13 digitos segun lo requiera el cliente",
		telefono: "El numero debe tener 10 digitos",
		direccion: "Debe ingresar una direccion válida",
		email: "Debe ingresar correo electrónico válido",
	},
};

const patterns = {
	patternLetter: /^([a-zA-ZñÑáéíóúüÁÉÍÓÚÜ\s]{2,20})$/,
	patternAlfanumber: /^[a-zA-Z0-9\W_]{1,20}$/,
	patternEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	patternNumber: /^\d{10,13}$/,
	patternPhone: /^\d{10}$/,
};

export { message, patterns };
