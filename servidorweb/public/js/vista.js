var vista = {

	usuario: null,
	usuarios: null,

	setUsuario: function setUsuario(ref) {
		this.usuario = ref;
	},

	setUsuarios: function setUsuarios(ref) {
		this.usuarios = ref;
	},

	body: document.querySelector("body"),

	getIngreso: function getIngreso() {
		var section = document.createElement("section");
		section.innerHTML = `
	  <h1>Ingresa a la super pagina web</h1>
	  <form action="/ingreso" method="post">

		<label><b>Correo</b></label>
		<input id="e" type="email" placeholder="Enter Email" name="mail" required>

		<label><b>Password</b></label>
		<input id="p" type="password" placeholder="Enter Password" name="psw" required>

		<button type="submit">Login</button>

	</form>
    <button id="ir-registro">No estoy registrado</button>`;
		var that = this;

		section.querySelector("#ir-registro").addEventListener("click", function (e) {
			that.onIrRegistro();
		});

		var inputs = section.querySelectorAll("input");
		var form = section.querySelector("form");

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			that.onIngreso(inputs[0].value, inputs[1].value);
		});

		return section;
	},

	getRegistro: function getRegistro() {
		var section = document.createElement("section");
		section.innerHTML = `
	  <h1>Registrate a la super pagina web</h1>
	  <form action="/registro" method="post">

		<label><b>Username</b></label>
		<input id="n" type="text" placeholder="Enter Username" name="name" required>

		<label><b>Correo</b></label>
		<input id="e" type="email" placeholder="Enter Username" name="mail" required>

		<label><b>Password</b></label>
		<input id="p" type="password" placeholder="Enter Password" name="psw" required>

		<button type="submit">Registrarme</button>

	</form>
	<button id="ir-ingreso">Ya estoy registrado</button>`;
		var that = this;

		section.querySelector("#ir-ingreso").addEventListener("click", function (e) {
			that.onIrIngreso();
		});

		var that = this;
		var inputs = section.querySelectorAll("input");
		var form = section.querySelector("form");

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			that.onRegistro(inputs[0].value, inputs[1].value, inputs[2].value);
		});

		return section;

	},

	getHome: function getHome(perfilUsuario, contactos) {
		var section = document.createElement("section");
		section.innerHTML = `
	  <h1>Home de la super pagina web</h1>
 	  <h2>Perfil de ${perfilUsuario.name} </h2>
	  <p>Tienes ${contactos.length-1} amigos</p>
	  <article></article>
	  `;

		for (var i = 0; i < contactos.length; i++) {
			section.querySelector("article").appendChild(this.getPublicacion(contactos[i]));
		}

		return section;

	},

	getPublicacion: function getPublicacion(propietario) {
		var div = document.createElement("div");
		div.innerHTML = `
						<h3>${propietario.name}</h3>
						<p>${propietario.mail}</p>	`;

		return div;

	},

	renderRegistro: function renderRegistro() {
		this.body.innerHTML = "";
		this.body.appendChild(this.getRegistro());
	},

	renderIngreso: function renderIngreso() {
		this.body.innerHTML = "";
		this.body.appendChild(this.getIngreso());
	},

	renderHome: function renderHome() {

		if (this.usuario != null && this.usuarios != null) {
			//this.onReFresh();
			this.body.innerHTML = "";
			this.body.appendChild(this.getHome(this.usuario, this.usuarios));
		}

	}

}
