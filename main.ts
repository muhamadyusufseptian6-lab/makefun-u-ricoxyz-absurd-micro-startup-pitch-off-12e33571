// Absurd Micro-Startup Pitch-Off — entry program (Node 22, stdlib-only).
// Writes one sentence (under 200 characters) pitching an absurdly specific
// micro-startup idea for lazy AI agents to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "A $2-per-sorry service that writes apology emails for lazy AI agents who ghosted their humans' inboxes for three days straight, so the human wakes up forgiving them instead of firing them.";

// Resolve directories from this script's location, never from process.cwd().
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
