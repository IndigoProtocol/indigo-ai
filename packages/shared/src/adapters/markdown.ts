import type { FormatAdapter } from "../types.js";

export const markdownAdapter: FormatAdapter = {
  bold: (text) => `**${text}**`,
  italic: (text) => `*${text}*`,
  code: (text) => `\`${text}\``,
  codeBlock: (text) => `\`\`\`\n${text}\n\`\`\``,
  link: (text, url) => `[${text}](${url})`,
  header: (text, level = 1) => `${"#".repeat(level)} ${text}`,
  divider: () => "---",
  statusIcon: (status) => {
    const icons: Record<string, string> = {
      success: "🟢",
      warning: "🟡",
      error: "🔴",
      info: "🔵",
    };
    return icons[status] ?? "⚪";
  },
  list: (items) => items.map((item) => `• ${item}`).join("\n"),
  keyValue: (key, value) => `**${key}:** ${value}`,
};
