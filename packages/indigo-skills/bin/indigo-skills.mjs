#!/usr/bin/env node

import { execFileSync } from "node:child_process";

// ANSI helpers
const RESET = "\x1B[0m";
const BOLD = "\x1B[1m";
const DIM = "\x1B[38;5;102m";
const CYAN = "\x1B[36m";

// Indigo purple/blue gradient
const COLORS = [
  "\x1B[38;5;135m",  // light purple
  "\x1B[38;5;134m",
  "\x1B[38;5;98m",
  "\x1B[38;5;97m",
  "\x1B[38;5;61m",
  "\x1B[38;5;60m",   // dark indigo
];

// ASCII art — INDIGO
const LOGO = [
  "██╗███╗   ██╗██████╗ ██╗ ██████╗  ██████╗ ",
  "██║████╗  ██║██╔══██╗██║██╔════╝ ██╔═══██╗",
  "██║██╔██╗ ██║██║  ██║██║██║  ███╗██║   ██║",
  "██║██║╚██╗██║██║  ██║██║██║   ██║██║   ██║",
  "██║██║ ╚████║██████╔╝██║╚██████╔╝╚██████╔╝",
  "╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚═════╝  ╚═════╝ ",
];

// Show banner
console.log();
LOGO.forEach((line, i) => {
  console.log(`${COLORS[i]}${line}${RESET}`);
});
console.log();
console.log(`  ${BOLD}${CYAN}Indigo Protocol${RESET}  ${DIM}— AI skills for DeFi on Cardano${RESET}`);
console.log();

// Delegate to skills CLI
const args = process.argv.slice(2);
const skillsArgs = ["skills", "add", "IndigoProtocol/indigo-ai", ...args];

try {
  execFileSync("npx", skillsArgs, { stdio: "inherit" });
} catch (err) {
  process.exit(err.status ?? 1);
}
