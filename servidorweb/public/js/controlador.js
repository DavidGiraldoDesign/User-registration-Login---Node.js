function controlador(vista) {

	vista.onIngreso = (mail, psw) => {
		console.log(mail + " " + psw);
		var params = new URLSearchParams();
		params.set('mail', mail);
		params.set('psw', psw);

		fetch(`${location.origin}/ingreso`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje == "in") {
					console.log(res);
					vista.setUsuario(res.usuario);
					vista.setUsuarios(res.contactos);
					vista.renderHome();
				}

			});

		vista.renderIngreso();

	};

	vista.onIrRegistro = () => {
		vista.renderRegistro();
	};

	vista.onIrIngreso = () => {
		vista.renderIngreso();
	};

	vista.onRegistro = (name, mail, psw) => {
		//console.log(name + " " + mail + " " + psw);

		var params = new URLSearchParams();
		params.set('name', name);
		params.set('mail', mail);
		params.set('psw', psw);

		fetch(`${location.origin}/registro`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje == "in") {
					console.log(res);
					vista.setUsuario(res.usuario);
					vista.renderHome();
				}

			});

		vista.renderRegistro();

	};

	/*vista.onReFresh = function onReFresh() {
		console.log("estoy en ReFresh");
		fetch(`${location.origin}/home`, {
				method: 'GET'
			})
			.then((res) => res.json())
			.then((res) => {
				if (res.mensaje == "ok") {
					console.log(res);
					vista.setUsuarios(res.usuarios);
				}
			});
	}*/

	vista.renderRegistro();

}


controlador(vista);
