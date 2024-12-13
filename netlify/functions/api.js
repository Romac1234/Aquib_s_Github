// Pro local
// const express = require("express");
// const bodyParser = require("body-parser");
// const { v4: uuidv4 } = require("uuid");

import express, { Router } from "express";
import bodyParser from "body-parser";
// import { v4 as uuidv4 } from "uuid";
import serverless from "serverless-http";

const router = Router(); //
const app = express();
app.use(bodyParser.json());

// const PORT = 3001;

let contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "John@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "Jane@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
  },
];

router.get("/contacts", (req, res) => {
  res.json(contacts);
});

router.get("/contacts/:id", (req, res) => {
  const id = req.params.id;
  let contact = contacts.find((contact) => contact.id == id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
});

router.post("/contacts", (req, res) => {
  let { id, name, email, phone, address } = req.body;
  //let id = uuidv4();
  let newContact = {
    id,
    name,
    email,
    phone,
    address,
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

router.put("/contacts/:id", (req, res) => {
  let { name, email, phone, address } = req.body;
  let id = req.params.id;
  let index = contacts.findIndex((contact) => contact.id == id);
  if (index == -1) {
    return res.status(404).json({ message: "Contact not found" });
  }
  contacts[index] = { id, name, email, phone, address };
  res.json(contacts[index]);
});

router.delete("/contacts/:id", (req, res) => {
  let id = req.params.id;
  let index = contacts.findIndex((contact) => contact.id == id);
  if (index == -1) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const deletedContact = contacts.splice(index, 1);
  res.json(deletedContact);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on local:${PORT}`);
// });

app.use("/api/", router);
export const handler = serverless(app);
