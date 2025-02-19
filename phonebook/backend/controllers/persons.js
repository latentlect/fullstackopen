const personRouter = require("express").Router();

const Person = require("../models/person");

personRouter.get("/", (resquest, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

personRouter.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const contacts = persons.length;
      response.send(
        `<p>Phonebook has info for ${contacts} people
        <br/> ${new Date().toString()}</p>`
      );
    })
    .catch((error) => next(error));
});

personRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

personRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

personRouter.post("/", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  if (body.name === undefined) {
    response.status(400).json({
      error: "name is missing",
    });
  }

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

personRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personRouter;
