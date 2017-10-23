// requerimos los modulos
var express = require("express"),
	bodyparser = require("body-parser"),
	mongo = require("mongodb"),
	fileUpload = require("express-fileupload");


//================================================
// Middlewares
var app = express();

app.use(fileUpload());
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
//================================================

var url = 'mongodb://localhost:27017/redsocial';
//var MongoClient = require('mongodb').MongoClient;
var mongoClient = mongo.MongoClient;

var db = null // global variable to hold the database
var usuarios = null; // global variable to hold the collection
var that = this;

mongoClient.connect(url, (err, database) => {
	if (!err) {
		console.log("Database created!");
		db = database;

		db.createCollection("usuarios", function (err, res) {
			if (err) throw err;
			console.log("Collection created!");
		});
		//Limpia la coleccion y agrega unos usuarios iniciales
		/*db.collection("usuarios").deleteMany({}, function (err, obj) {
			if (err) throw err;
			console.log(obj.result.n + " usuarios borrados");
			db.close();
		});

		
		var primerosusuarios = [
			{
				name: "Jose David",
				mail: "josedavidgm1995@gmail.com",
				psw: "palabrasecreta"
	    }, {
				name: "Camilo Montoya",
				mail: "cajomo@gmail.com",
				psw: "palabrasecreta"
		}, {
				name: "Arturo Gomez",
				mail: "gomezardi@gmail.com",
				psw: "palabrasecreta"
		}, {
				name: "Nathalia Barona",
				mail: "nb@gmail.com",
				psw: "palabrasecreta"
		}
	  ];

		db.collection("usuarios").insertMany(primerosusuarios, function (err, res) {
			if (err) throw err;
			console.log("Number of users inserted: " + res.insertedCount);
			db.close();
		});*/



		db.collection("usuarios").find({}).toArray(function (err, result) {
			console.log("================================== retorna todos los usuarios");
			if (err) throw err;
			console.log(result);
		});

	}
});



app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});


app.get("/home", function (req, res) {

	var noIncluir = {
		psw: false
	}

	db.collection("usuarios").find({}, noIncluir).toArray((err, result) => {
		if (err) throw err;
		res.json({
			mensaje: 'ok',
			usuarios: result
		});
	});


});


app.post("/ingreso", (req, res) => {

	var targetUser = {
		mail: req.body.mail,
		psw: req.body.psw
	};

	var noIncluir = {
		psw: false
	}

	db.collection("usuarios").find(targetUser).toArray((err, coincidencias) => {
		if (err) throw err;
		if (coincidencias.length > 0) {

			db.collection("usuarios").find({}, noIncluir).toArray((err, result) => {
				if (err) throw err;
				res.json({
					mensaje: 'in',
					usuario: coincidencias[0],
					contactos: result
				});
			});

		} else {
			res.json({
				mensaje: 'usuario o contraseña incorrecto'
			});
		}
	});

});

app.post("/registro", (req, res) => {
	var targetUser = {
		mail: req.body.mail
	};
	db.collection("usuarios").find(targetUser).toArray((err, coincidencias) => {
		if (!err && coincidencias.length == 0) {
			var usuarioEntrante = {
				name: req.body.name,
				mail: req.body.mail,
				psw: req.body.psw
			};
			db.collection("usuarios").insertOne(usuarioEntrante, (err, result) => {
				if (err) {
					throw err;

					res.json({
						mensaje: 'err'
					});

				} else {
					res.json({
						mensaje: "in"
					});
				}
			});
		} else {
			res.json({
				mensaje: "out"
			});

		}

	});
});

app.use("/public", express.static("public"));
app.use("/js", express.static('public/js'));
app.use("/css", express.static('public/css'));

app.listen(8080);
