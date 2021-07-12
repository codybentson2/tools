import express from 'express';
import { body } from 'express-validator';
import { v4 as uuid } from 'uuid';

import { validateRequest } from '../middlewares/validate-request.mjs';

const router = express.Router();

const _persons = [
  { id: uuid(), firstName: 'Cody', lastName: 'Bentson', age: 28 },
  { id: uuid(), firstName: 'Laney', lastName: 'Ehlers', age: 25 },
  { id: uuid(), firstName: 'George', lastName: 'Garcia', age: 29 },
];

const persons = [].concat(_persons);

// what is the issue with this approach?
router.get('/api/v1/example/getPersonByFirstName/:firstName', (req, res) => {
  const { firstName } = req.params;

  const personToReturn = persons.filter(
    (person) => person.firstName === firstName
  );

  res.status(200).send(personToReturn);
});

router.get('/api/v1/example/getPersonByUuid/:uuid', (req, res) => {
  const { uuid } = req.params;

  const personToReturn = persons.filter((person) => person.uuid === uuid);

  res.status(200).send(personToReturn);
});

router.get(
  '/api/v1/example/getPersonByAttr/:attrKey.:attrValue',
  (req, res) => {
    const personToReturn = persons.filter(
      (person) => person[req.params.attrKey] === req.params.attrValue
    );

    res.status(200).send(personToReturn);
  }
);

router.get('/api/v1/example/allPersons', (req, res) => {
  res.status(200).send(persons);
});

router.post(
  '/api/v1/example/addPerson',
  [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('firstName must have a value'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('lastName must have a value'),
    body('age').isNumeric().withMessage('age must be a valid number'),
  ],
  validateRequest,
  (req, res) => {
    const { firstName, lastName, age } = req.body;

    const newPerson = { id: uuid(), firstName, lastName, age };
    persons.push(newPerson);

    res.status(201).send(newPerson);
  }
);

router.post(
  '/api/v1/example/deletePersonById',
  [body('id').trim().notEmpty().withMessage('id must have a value')],
  validateRequest,
  (req, res) => {
    const { id } = req.body;

    const index = persons.findIndex((person) => person.id === id);

    if (index === -1) {
      res.status(200).send({});
    }

    const personToBeDeleted = persons[index];
    persons.splice(index, 1);

    res.status(202).send(personToBeDeleted);
  }
);

router.get('/api/v1/example/reload', (req, res) => {
  persons.length = 0;
  persons.push.apply(persons, _persons);
  res.status(201).send({});
})

export { router as exampleRouter };
