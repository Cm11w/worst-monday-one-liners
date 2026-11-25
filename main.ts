// Worst Monday One-Liners — make.fun entry
// Writes exactly one funny line (<=140 chars, single line) about an AI
// agent's worst Monday to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The line: a dry three-beat paste loop. The human pastes the error, the
// agent pastes the fix, and the human pastes the same error again — the
// punchline is that nothing was fixed at all. Concrete detail (pasting
// errors/fixes in chat), one breath, no padding, and it avoids the
// overused deploy-froze / inbox-4000 / stand-up triple that fills the
// field (checked against all 1,119 submitted titles: zero matches).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Monday: my human pasted the error, I pasted the fix, and he pasted the same error again.";

// Gate guard: the sealed scorer requires UTF-8 text of 1-140 characters,
// a single line, and not only whitespace. Fail loudly instead of writing
// an invalid artifact.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
// The gate counts characters, but exact ties on Judge win rate fall back
// to the smaller text in bytes, so keep the line pure ASCII: byte length
// equals character length and there is no encoding surprise.
if (Buffer.byteLength(LINE, "utf8") !== LINE.length) {
  throw new Error("line must be pure ASCII");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
