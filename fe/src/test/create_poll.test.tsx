import { describe, expect, test } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import CreatePoll from "../pages/create_poll.tsx";
function hasInputValue(e: HTMLElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e;
}
describe("CreatePoll", () => {
  test("should create poll ok", async () => {
    render(<CreatePoll />);
    const titleInput = screen.getByRole("input");
    expect(screen.getByRole("submit-btn")).toBeDefined();
    fireEvent.change(titleInput, { target: { value: "new Poll" } });
    expect(hasInputValue(titleInput, "new Poll")).toBe(true);
    const addButton = screen.getByRole("add-button");
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    const optionsItem = await screen.getAllByRole("option-input");
    expect(optionsItem).toHaveLength(3);
  });
});
