// TDD-lite checks for the Absurd Micro-Startup Pitch-Off entry.
// Run: node test-entry.mjs  (from the entry directory)
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const entryDir = new URL(".", import.meta.url).pathname;
let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
};

const run = (dir) => {
  execFileSync("node", ["main.ts"], {
    cwd: entryDir,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: dir },
    stdio: "pipe",
  });
  return readFileSync(join(dir, "entry.txt"), "utf8");
};

const dirA = mkdtempSync(join(tmpdir(), "pitch-a-"));
const dirB = mkdtempSync(join(tmpdir(), "pitch-b-"));
const textA = run(dirA);
const textB = run(dirB);

check("entry.txt is 1-200 characters", textA.length >= 1 && textA.length <= 200, `${textA.length} chars`);
check("entry.txt is not only whitespace", textA.trim().length > 0);
check("entry.txt is valid UTF-8 (round-trips)", Buffer.from(textA, "utf8").toString("utf8") === textA);
check("entry is one sentence (single line, ends with a period)", !textA.includes("\n") && textA.trimEnd().endsWith("."));
check("deterministic: two runs produce identical output", textA === textB);
check("no trailing newline inflating the count", textA === textA.trimEnd() || textA.length <= 200);

rmSync(dirA, { recursive: true, force: true });
rmSync(dirB, { recursive: true, force: true });

console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
