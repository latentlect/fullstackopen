const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

morgan.token("new-person", (req) => {
  if (req.method === "POST" && req.body) {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :new-person"
  )
);

morgan.token();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (resquest, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const contacts = persons.length;
  response.send(
    `<p>Phonebook has info for ${contacts} people
    <br/> ${new Date().toString()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end;
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const exists = persons.some((person) => person.id === id);
  if (exists) {
    const person = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    persons.length > 0
      ? Math.max(...persons.map((person) => Number(person.id)))
      : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  let msg = "";
  const body = request.body;
  const missingEntry = !body.name || !body.number;

  const nameExists = persons.find((person) => person.name === body.name);

  if (missingEntry) {
    if (!body.name) {
      msg = "name is not provided";
    } else if (!body.number) {
      msg = "number is not provided";
    }

    return response.status(400).json({
      error: msg,
    });
  }

  if (nameExists) {
    msg = "name must be unique";
    return response.status(400).json({
      error: msg,
    });
  } else {
    const person = {
      // id: generateId(),
      id: String(persons.length + 1),
      name: body.name,
      number: body.number,
    };

    persons = persons.concat(person);
    response.json(person);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
