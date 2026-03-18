import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "./SearchForm";

test("submit triggers onSearch with input value", async () => {
  const user = userEvent.setup();
  const onSearch = jest.fn();

  render(<SearchForm onSearch={onSearch} isLoading={false} />);

  await user.type(screen.getByLabelText("search-input"), "nextjs");
  await user.click(screen.getByRole("button", { name: "検索" }));

  expect(onSearch).toHaveBeenCalledWith("nextjs");
});