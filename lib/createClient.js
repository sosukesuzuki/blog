import { createClient as original } from "contentful";

export default function createClient() {
  return original({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  });
}
