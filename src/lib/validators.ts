import { z } from "zod";

export const SearchQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "キーワードを入力してください")
    .max(100, "キーワードが長すぎます"),
});

export const RepoParamsSchema = z.object({
  owner: z.string().trim().min(1).max(200),
  repo: z.string().trim().min(1).max(200),
});