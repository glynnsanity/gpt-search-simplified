import OpenAI from "openai";
import { loadEnvConfig } from "@next/env";
loadEnvConfig("");

const apiKey = process.env.OPENAI_API_KEY;
export const openaiClient = new OpenAI({ apiKey});