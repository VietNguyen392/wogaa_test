import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PollDetail from "../pages/poll_detail/[slug].tsx";

describe("PollDetail", () => {
  render(<PollDetail />);
  expect(screen.getAllByRole("options_vote")).toBeDefined();
});
