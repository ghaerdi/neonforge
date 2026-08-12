# Task for worker

You are a delegated subagent running from a fork of the parent session. Treat the inherited conversation as reference-only context, not a live thread to continue. Do not continue or answer prior messages as if they are waiting for a reply. Your sole job is to execute the task below and return a focused result for that task using your tools.

Task:
Refactor the CreateShowcase monolith in /home/ghaerdi/Documents/Projects/neonforge.

HOME: /home/ghaerdi/Documents/Projects/neonforge
TARGET: nextjs/src/components/create/CreateShowcase.tsx is a ~1500-line file with ~23 widget components plus shared primitives. Split into logical modules WITHOUT changing rendered output.

ALREADY DONE (do not redo): nextjs/src/components/create/card-ui.tsx exists, exporting ShowcaseCard, Meter, RainChance, Masonry, TXNS, POWER, SYS, VITALS.

JOB:
1. Read the full CreateShowcase.tsx.
2. Rewrite it to import the shared pieces from './card-ui' and widget functions from new group files. Remove the local copies of ShowcaseCard/Meter/RainChance/Masonry/TXNS/POWER/SYS/VITALS from it.
3. Move the ~23 widgets into group files under nextjs/src/components/create/. Suggested grouping (your choice):
   - telemetry.tsx: SystemTelemetry, HealthMonitor, SleepTracker, CyberpsychosisMonitor, DeviantMonitor, NetMonitor
   - atmosphere.tsx: WeatherWidget, SystemControls, ControlPanelWidget, HomeAssistant, DisasterAlerts, VehicleWidget
   - social.tsx: ProfileWidget, DiscordProfile, Messenger, MusicPlayer
   - economy.tsx: BankWidget, NewsWidget, TravelWidget, DeliveryWidget, WorldWidgets
   Each group file imports only what IT needs (lucide icons, recharts, ui components, and from './card-ui').
4. CreateShowcase.tsx imports all widgets + the card-ui pieces, still exports CreateShowcase, and renders <Masonry> with widgets in EXACTLY this order:
   ProfileWidget, DiscordProfile, WeatherWidget, SystemTelemetry, SystemControls, HealthMonitor, SleepTracker, CyberpsychosisMonitor, DeviantMonitor, VehicleWidget, NetMonitor, HomeAssistant, DisasterAlerts, ControlPanelWidget, Messenger, MusicPlayer, BankWidget, NewsWidget, TravelWidget, DeliveryWidget, WorldWidgets, LoginShowcase.
5. SLEEP data stays inlined inside SleepTracker. LoginShowcase is imported from './AuthBlocks'.

HARD RULES:
- NO behavior change. Every widget renders identically.
- Keep 'use client' at the top of each new file with JSX.
- The deno-linter '@/' alias 'not a dependency' warnings are FALSE POSITIVES. Ignore them. The real gate is tsc: cd nextjs && node_modules/.bin/tsc --noEmit  (must pass).
- Use unlink for file deletes, never rm -rf.

VERIFY AFTER THE REFACTOR:
1. cd nextjs && node_modules/.bin/tsc --noEmit  (must pass clean).
2. Boot: (timeout 45 node_modules/.bin/next dev --turbopack --port 4567 > /tmp/ref.log 2>&1 &) ; sleep 18 ; grep -iaE 'ready in|error' /tmp/ref.log | head -3
3. Confirm GET http://localhost:4567/create returns 200 and contains 'Cyberpunk widgets' and 'Sleep tracker'.
4. Kill the server with pkill -f 'port 4567'.

REPORT: final list of files in nextjs/src/components/create/, the tsc result, and the render check result.

## Acceptance Contract
Acceptance level: checked
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope

Required evidence: changed-files, tests-added, commands-run, residual-risks, no-staged-files

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
`criteriaSatisfied[].status` must be exactly one of: satisfied, not-satisfied, not-applicable.
`commandsRun[].result` must be exactly one of: passed, failed, not-run.
`manualNotes` and `notes` are optional strings; an empty string means no note and does not satisfy `manual-notes` evidence.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```