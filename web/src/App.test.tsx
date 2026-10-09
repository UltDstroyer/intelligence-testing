import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(cleanup);

describe("M0 welcome and consent", () => {
  it("keeps the lab locked without acknowledgement", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Enter the lab" });
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(screen.queryByText("Lab preview unlocked.")).toBeNull();
  });

  it("unlocks after consent and allows leaving the preview", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("checkbox"));
    const button = screen.getByRole("button", { name: "Enter the lab" });
    expect(button.hasAttribute("disabled")).toBe(false);
    fireEvent.click(button);
    expect(screen.getByText("Lab preview unlocked.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Leave preview" }));
    expect(screen.queryByText("Lab preview unlocked.")).toBeNull();
  });

  it("revokes entry when acknowledgement is withdrawn", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByRole("button", { name: "Enter the lab" }));
    fireEvent.click(checkbox);
    expect(screen.queryByText("Lab preview unlocked.")).toBeNull();
    expect(screen.getByRole("button", { name: "Enter the lab" }).hasAttribute("disabled")).toBe(
      true,
    );
  });
});
