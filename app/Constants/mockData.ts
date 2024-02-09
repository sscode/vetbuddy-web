import { Template } from "../store";

type Animal = "Dog" | "Cat" | "Monkey" | "Fish" | "Rabbit" | "Lizard" | "Chameleon" | "Turtle"

export const MOCK_HISTORY: {
  date: Date;
  name: string;
  animal?: Animal;
  audio: unknown;
  consult: unknown;
}[] = [
  {
    name: "Joe",
    animal: "Cat",
    date: new Date("2024-02-01T15:00:33.179Z"),
    audio: "link",
    consult: "link",
  },
  {
    name: "Jerry",
    animal: "Monkey",
    date: new Date("2024-02-03T19:00:33.179Z"),
    audio: "link",
    consult: "link",
  },
  {
    name: "John",
    animal: "Dog",
    date: new Date("2024-02-06T11:00:33.179Z"),
    audio: "link",
    consult: "link",
  },
  {
    name: "Jake",
    animal: "Fish",
    date: new Date(),
    audio: "link",
    consult: "link",
  },
];

export const MOCK_TEMPLATES: Template[] = [
  {
    name: "Consult 1",
    modified: new Date("1-2-2024"),
  },
  {
    name: "Example",
    modified: new Date("1-3-2024"),
  },
  {
    name: "Example 2",
    modified: new Date("1-4-2024"),
  },
];