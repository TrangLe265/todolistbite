import App from "./App";
import { expect, test } from "vitest";
import {fireEvent, render, screen} from "@testing-library/react"; 
import '@testing-library/jest-dom/vitest';

test("renders header", () => {
    render(<App />); 
    const header = screen.getByText(/My Todolist/i); 
    //checking if the header is exactly as stated 
    expect(header).toBeInTheDocument(); 
});

//test if the Add button works after all fields are filled
test("add todo", () =>{
    render(<App />);
    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, {target: {value:"Go to cafe"} }); 

    const date = screen.getByPlaceholderText("Date"); 
    fireEvent.change(date, {target: {value:"29.01.2023"} }); 

    const button = screen.getByText("Add");
    fireEvent.click(button); 

    const table = screen.getByRole("table"); 
    expect(table).toHaveTextContent(/Go to cafe/i); 
}); 

test("clear todo", () => {
    render(<App />); 
    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, {target: {value:"Go to cafe"} }); 

    const date = screen.getByPlaceholderText("Date"); 
    fireEvent.change(date, {target: {value:"29.01.2023"} }); 

    const button = screen.getByText("Add");
    fireEvent.click(button); 

    const table = screen.getByRole("table"); 
    expect(table).toHaveTextContent(/Go to cafe/i); 

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton); 

    const rows = screen.queryAllByRole("row");
    expect(rows).toHaveLength(0);
    
     
})