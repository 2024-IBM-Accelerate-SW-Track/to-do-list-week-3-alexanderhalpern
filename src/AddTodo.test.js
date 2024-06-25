import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("test that App component doesn't render dupicate Task", () => {
  render(<App />);
});

test("test that App component doesn't add a task without task name", () => {
  render(<App />);
});

test("test that App component doesn't add a task without due date", () => {
  render(<App />);
});

test("test that App component can be deleted thru checkbox", () => {
  render(<App />);
});

test("test that App component renders different colors for past due events", () => {
  render(<App />);
});

test("test that App component renders Task", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
});

test("test that App component doesn't render duplicate Task", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const taskName = "History Test";
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  const tasks = screen.getAllByText(new RegExp(taskName, "i"));
  expect(tasks.length).toBe(1);
});

test("test that App component doesn't add a task without due date", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const addButton = screen.getByRole("button", { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.click(addButton);

  expect(screen.queryByText(/History Test/i)).not.toBeInTheDocument();
});

test("test that App component doesn't add a task without task name", () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });

  fireEvent.change(inputDate, { target: { value: "05/30/2023" } });
  fireEvent.click(addButton);

  expect(screen.queryByText(/05\/30\/2023/i)).not.toBeInTheDocument();
});

test("test that past due tasks render in red and future tasks render in default color", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const pastDueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: pastDueDate } });
  fireEvent.click(addButton);

  const futureDueDate = "07/30/2026";
  fireEvent.change(inputTask, { target: { value: "Future Test" } });
  fireEvent.change(inputDate, { target: { value: futureDueDate } });
  fireEvent.click(addButton);

  const historyTestCard = screen.getByTestId("History Test");
  expect(historyTestCard.style.backgroundColor).toBe("red");

  const futureTestCard = screen.getByTestId("Future Test");
  expect(futureTestCard.style.backgroundColor).not.toBe("red");
});

test("test that App component can be deleted thru checkbox", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  const deleteCheckbox = screen.getByRole("checkbox");
  fireEvent.click(deleteCheckbox);

  expect(screen.queryByText(/History Test/i)).not.toBeInTheDocument();
});
