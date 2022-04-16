const express = require("express");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

let courses = [
	{
		id: "11",
		name: "Learn Reactjs",
		price: 299,
	},
	{
		id: "22",
		name: "Learn Angularjs",
		price: 299,
	},
	{
		id: "33",
		name: "Learn Vuejs",
		price: 299,
	},
];

app.get("/", function (req, res) {
	res.send("Hello from Paras!!!");
});

app.get("/api/v1/course", (req, res) => {
	res.send("Route -> /paras");
});

app.get("/api/v1/courseObject", (req, res) => {
	res.json({
		id: "44",
		name: "Learn Backend",
		price: 499,
	});
});

app.get("/api/v1/courses", (req, res) => {
	res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
	const myCourse = courses.find(
		(course) => course.id === req.params.courseId
	);
	myCourse
		? res.send(myCourse)
		: res.send("Couldn't get the requested course");
});

app.post("/api/v1/addCourses", (req, res) => {
	courses.push(req.body);
	console.log(req.body);
	res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
	let location = req.query.location;
	let device = req.query.device;
	res.send({ location, device });
});

app.listen(PORT, () => {
	console.log(`Server is running successfully at ${PORT}...`);
});
