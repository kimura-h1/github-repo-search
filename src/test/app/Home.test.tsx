import { render, screen } from "@testing-library/react";
import Page from "../../app/page";

test("トップページが表示される", () => {
  render(<Page />);
  expect(screen.getByText("GitHub Repository Search")).toBeInTheDocument();
});