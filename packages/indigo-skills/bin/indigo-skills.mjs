#!/usr/bin/env node

import { createInterface } from "node:readline";
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

// ---------------------------------------------------------------------------
// ANSI helpers
// ---------------------------------------------------------------------------
const RESET = "\x1B[0m";
const BOLD = "\x1B[1m";
const DIM = "\x1B[38;5;102m";
const CYAN = "\x1B[36m";
const GREEN = "\x1B[32m";
const YELLOW = "\x1B[33m";
const RED = "\x1B[31m";

const COLORS = [
  "\x1B[38;5;135m",
  "\x1B[38;5;134m",
  "\x1B[38;5;98m",
  "\x1B[38;5;97m",
  "\x1B[38;5;61m",
  "\x1B[38;5;60m",
  "\x1B[38;5;135m",
  "\x1B[38;5;134m",
  "\x1B[38;5;98m",
  "\x1B[38;5;97m",
  "\x1B[38;5;61m",
  "\x1B[38;5;60m",
];

const LOGO = [
  "\u2588\u2588\u2557\u2588\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
  "\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557",
  "\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551",
  "\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551",
  "\u2588\u2588\u2551\u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
  "\u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D ",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557  \u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2557     \u2588\u2588\u2557     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2551 \u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2551     \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
  "\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D",
];

// ---------------------------------------------------------------------------
// Skill registry
// ---------------------------------------------------------------------------
const SKILLS = [
  { name: "cdp-management", description: "Create, manage, and monitor CDPs", pkg: "@indigoprotocol/indigo-cdp" },
  { name: "stability-pools", description: "Deposit, withdraw, and monitor stability pools", pkg: "@indigoprotocol/indigo-stability" },
  { name: "staking", description: "Stake INDY and manage staking positions", pkg: "@indigoprotocol/indigo-staking" },
  { name: "assets", description: "Query iAsset prices, supplies, and metadata", pkg: "@indigoprotocol/indigo-assets" },
  { name: "analytics", description: "Protocol analytics, TVL, APR, and metrics", pkg: "@indigoprotocol/indigo-analytics" },
  { name: "governance", description: "Temperature checks, polls, and governance", pkg: "@indigoprotocol/indigo-governance" },
  { name: "redemption", description: "Redemption queues and order management", pkg: "@indigoprotocol/indigo-redemption" },
  { name: "dex", description: "DEX swaps, liquidity, and yield data", pkg: "@indigoprotocol/indigo-dex" },
  { name: "oracle", description: "Oracle feeds and interest rate data", pkg: "@indigoprotocol/indigo-oracle" },
  { name: "ipfs", description: "Store and retrieve data on IPFS", pkg: "@indigoprotocol/indigo-ipfs" },
];

// ---------------------------------------------------------------------------
// Agent detection & config paths
// ---------------------------------------------------------------------------
const AGENTS = {
  "claude-code": {
    label: "Claude Code",
    detect: (dir) => existsSync(join(dir, ".claude")),
    configPath: (dir, global) =>
      global
        ? join(process.env.HOME || "~", ".claude", "config.json")
        : join(dir, ".claude", "config.json"),
    write: writeMcpConfig,
  },
  cursor: {
    label: "Cursor",
    detect: (dir) => existsSync(join(dir, ".cursor")),
    configPath: (dir, global) =>
      global
        ? join(process.env.HOME || "~", ".cursor", "mcp.json")
        : join(dir, ".cursor", "mcp.json"),
    write: writeMcpConfig,
  },
  windsurf: {
    label: "Windsurf",
    detect: (dir) => existsSync(join(dir, ".windsurf")),
    configPath: (dir, global) =>
      global
        ? join(process.env.HOME || "~", ".windsurf", "mcp.json")
        : join(dir, ".windsurf", "mcp.json"),
    write: writeMcpConfig,
  },
  openclaw: {
    label: "OpenClaw",
    detect: (dir) => existsSync(join(dir, ".clawdbot")),
    configPath: (dir, global) =>
      global
        ? join(process.env.HOME || "~", ".clawdbot", "skills", "indigo")
        : join(dir, ".clawdbot", "skills", "indigo"),
    write: writeOpenClawConfig,
  },
};

// ---------------------------------------------------------------------------
// Parse CLI flags
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);

function getFlag(name) {
  const idx = argv.indexOf(`--${name}`);
  return idx !== -1;
}

function getFlagValue(name) {
  const idx = argv.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= argv.length) return null;
  return argv[idx + 1];
}

const flagAll = getFlag("all");
const flagList = getFlag("list");
const flagGlobal = getFlag("global");
const flagSkill = getFlagValue("skill");
const flagAgent = getFlagValue("agent");
const flagHelp = getFlag("help") || getFlag("h");

// ---------------------------------------------------------------------------
// Banner
// ---------------------------------------------------------------------------
function showBanner() {
  console.log();
  LOGO.forEach((line, i) => {
    console.log(`${COLORS[i]}${line}${RESET}`);
  });
  console.log();
  console.log(`  ${BOLD}${CYAN}Indigo Protocol${RESET}  ${DIM}\u2014 AI skills for DeFi on Cardano${RESET}`);
  console.log();
}

// ---------------------------------------------------------------------------
// Help
// ---------------------------------------------------------------------------
function showHelp() {
  console.log(`${BOLD}Usage:${RESET} npx @indigoprotocol/indigo-skills [options]`);
  console.log();
  console.log(`${BOLD}Options:${RESET}`);
  console.log(`  --all              Install all available skills`);
  console.log(`  --list             List available skills and exit`);
  console.log(`  --skill <name>     Install a specific skill (e.g. --skill cdp-management)`);
  console.log(`  --agent <name>     Target agent: claude-code, cursor, windsurf, openclaw`);
  console.log(`  --global           Install to user-level config instead of project-level`);
  console.log(`  --help, -h         Show this help message`);
  console.log();
}

// ---------------------------------------------------------------------------
// List skills
// ---------------------------------------------------------------------------
function listSkills() {
  console.log(`${BOLD}Available skills:${RESET}`);
  console.log();
  for (const skill of SKILLS) {
    console.log(`  ${CYAN}${skill.name.padEnd(20)}${RESET} ${DIM}${skill.description}${RESET}`);
  }
  console.log();
}

// ---------------------------------------------------------------------------
// Agent detection
// ---------------------------------------------------------------------------
function detectAgent(cwd) {
  for (const [key, agent] of Object.entries(AGENTS)) {
    if (agent.detect(cwd)) return key;
  }
  return null;
}

function resolveAgent(cwd) {
  if (flagAgent) {
    if (!AGENTS[flagAgent]) {
      console.error(`${RED}Unknown agent: ${flagAgent}${RESET}`);
      console.error(`Valid agents: ${Object.keys(AGENTS).join(", ")}`);
      process.exit(1);
    }
    return flagAgent;
  }
  const detected = detectAgent(cwd);
  if (detected) {
    console.log(`${DIM}Detected agent: ${AGENTS[detected].label}${RESET}`);
    return detected;
  }
  return "claude-code";
}

// ---------------------------------------------------------------------------
// Config writers
// ---------------------------------------------------------------------------
function writeMcpConfig(configPath, selectedSkills) {
  let config = {};
  if (existsSync(configPath)) {
    try {
      config = JSON.parse(readFileSync(configPath, "utf-8"));
    } catch {
      config = {};
    }
  }

  if (!config.mcpServers) config.mcpServers = {};

  config.mcpServers.indigo = {
    command: "npx",
    args: [
      "-y",
      "@indigoprotocol/indigo-mcp@latest",
      ...selectedSkills.map((s) => `--skill=${s.name}`),
    ],
  };

  const dir = join(configPath, "..");
  mkdirSync(dir, { recursive: true });
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

function writeOpenClawConfig(skillDir, selectedSkills) {
  mkdirSync(skillDir, { recursive: true });

  const manifest = {
    name: "indigo",
    description: "Indigo Protocol DeFi skills for Cardano",
    skills: selectedSkills.map((s) => ({
      name: s.name,
      description: s.description,
      package: s.pkg,
    })),
  };

  writeFileSync(
    join(skillDir, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf-8",
  );
}

// ---------------------------------------------------------------------------
// Interactive checkbox selector (no dependencies)
// ---------------------------------------------------------------------------
async function interactiveSelect() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const selected = new Array(SKILLS.length).fill(true);
  let cursor = 0;

  function render() {
    // Move cursor up to overwrite previous render (except first call)
    process.stdout.write(`\x1B[${SKILLS.length + 2}A`);
    console.log(`${BOLD}Select skills to install:${RESET} ${DIM}(Space=toggle, A=all, N=none, Enter=confirm)${RESET}`);
    for (let i = 0; i < SKILLS.length; i++) {
      const check = selected[i] ? `${GREEN}\u2713${RESET}` : " ";
      const pointer = i === cursor ? `${CYAN}\u276F${RESET}` : " ";
      const name = i === cursor ? `${BOLD}${SKILLS[i].name}${RESET}` : SKILLS[i].name;
      console.log(` ${pointer} [${check}] ${name.padEnd(i === cursor ? SKILLS[i].name.length + 8 : 20)} ${DIM}${SKILLS[i].description}${RESET}`);
    }
    console.log();
  }

  // Initial draw placeholder lines
  console.log(`${BOLD}Select skills to install:${RESET} ${DIM}(Space=toggle, A=all, N=none, Enter=confirm)${RESET}`);
  for (let i = 0; i < SKILLS.length; i++) {
    const check = selected[i] ? `${GREEN}\u2713${RESET}` : " ";
    const pointer = i === cursor ? `${CYAN}\u276F${RESET}` : " ";
    const name = i === cursor ? `${BOLD}${SKILLS[i].name}${RESET}` : SKILLS[i].name;
    console.log(` ${pointer} [${check}] ${name.padEnd(i === cursor ? SKILLS[i].name.length + 8 : 20)} ${DIM}${SKILLS[i].description}${RESET}`);
  }
  console.log();

  return new Promise((resolvePromise) => {
    if (!process.stdin.isTTY) {
      rl.close();
      return resolvePromise(SKILLS.slice());
    }

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf-8");

    process.stdin.on("data", (key) => {
      if (key === "\x03") {
        // Ctrl+C
        process.stdin.setRawMode(false);
        rl.close();
        console.log();
        process.exit(0);
      }

      if (key === "\r" || key === "\n") {
        process.stdin.setRawMode(false);
        rl.close();
        const result = SKILLS.filter((_, i) => selected[i]);
        return resolvePromise(result);
      }

      if (key === " ") {
        selected[cursor] = !selected[cursor];
      } else if (key === "a" || key === "A") {
        selected.fill(true);
      } else if (key === "n" || key === "N") {
        selected.fill(false);
      } else if (key === "\x1B[A" || key === "k") {
        // Up
        cursor = (cursor - 1 + SKILLS.length) % SKILLS.length;
      } else if (key === "\x1B[B" || key === "j") {
        // Down
        cursor = (cursor + 1) % SKILLS.length;
      }

      render();
    });
  });
}

// ---------------------------------------------------------------------------
// Install flow
// ---------------------------------------------------------------------------
function install(agentKey, selectedSkills, cwd) {
  if (selectedSkills.length === 0) {
    console.log(`${YELLOW}No skills selected. Nothing to install.${RESET}`);
    process.exit(0);
  }

  const agent = AGENTS[agentKey];
  const configTarget = agent.configPath(cwd, flagGlobal);

  console.log(`${BOLD}Installing ${selectedSkills.length} skill(s) for ${agent.label}...${RESET}`);
  console.log();

  for (const skill of selectedSkills) {
    console.log(`  ${GREEN}\u2713${RESET} ${skill.name}`);
  }
  console.log();

  agent.write(configTarget, selectedSkills);

  const location = flagGlobal ? "user-level" : "project-level";
  console.log(`${GREEN}${BOLD}Done!${RESET} Config written to ${DIM}${configTarget}${RESET} (${location})`);
  console.log();
  console.log(`${DIM}Restart your agent to activate the Indigo skills.${RESET}`);
  console.log();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const cwd = resolve(process.cwd());

  showBanner();

  if (flagHelp) {
    showHelp();
    process.exit(0);
  }

  if (flagList) {
    listSkills();
    process.exit(0);
  }

  const agentKey = resolveAgent(cwd);

  // Determine which skills to install
  let selectedSkills;

  if (flagAll) {
    selectedSkills = SKILLS.slice();
  } else if (flagSkill) {
    const skill = SKILLS.find((s) => s.name === flagSkill);
    if (!skill) {
      console.error(`${RED}Unknown skill: ${flagSkill}${RESET}`);
      console.error(`Run with --list to see available skills.`);
      process.exit(1);
    }
    selectedSkills = [skill];
  } else {
    selectedSkills = await interactiveSelect();
  }

  install(agentKey, selectedSkills, cwd);
}

main().catch((err) => {
  console.error(`${RED}${err.message}${RESET}`);
  process.exit(1);
});
