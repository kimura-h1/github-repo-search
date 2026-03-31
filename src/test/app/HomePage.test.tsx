import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../../app/Home";

describe("HomePage", () => {
  test("初期表示でタイトルが表示される", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "GitHub Repository Search" })
    ).toBeInTheDocument();
  });

  test("空文字で検索するとエラーメッセージが表示される", () => {
    render(<HomePage />);

    const button = screen.getByRole("button", { name: /search|検索/i });
    fireEvent.click(button);

    expect(
      screen.getByText("キーワードを入力してください")
    ).toBeInTheDocument();
  });

  test("検索成功時にリポジトリ一覧が表示される", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        total_count: 1,
        items: [
          {
            id: 1,
            full_name: "facebook/react",
            html_url: "https://github.com/facebook/react",
            description: "A JavaScript library for building user interfaces",
            stargazers_count: 123,
            owner: {
              login: "facebook",
              avatar_url: "https://example.com/avatar.png",
            },
          },
        ],
      }),
    } as Response);

    render(<HomePage />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /search|検索/i });

    fireEvent.change(input, { target: { value: "react" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("facebook/react")).toBeInTheDocument();
    });

    fetchMock.mockRestore();
  });
});