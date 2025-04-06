import { createClient } from "next-sanity";

export const client = createClient({
  projectId: 'kdgqg3rt',
  dataset: "production",
  apiVersion: "2025-04-05",
  useCdn: false,
});