#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8765/index.html";
const CDP_BASE = process.env.CDP_BASE || "http://127.0.0.1:9222";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPageWebSocketUrl() {
  const responseText = execFileSync("curl", ["-sS", `${CDP_BASE}/json`], {
    encoding: "utf8",
  });
  const targets = JSON.parse(responseText);
  const pageTarget = targets.find(target => target.type === "page");
  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("No page target with a webSocketDebuggerUrl was available.");
  }

  return pageTarget.webSocketDebuggerUrl;
}

class CdpClient {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.loadEventFired = false;
    this.consoleMessages = [];
    this.exceptionMessages = [];
    this.logEntries = [];
    this.socket = new WebSocket(wsUrl);
    this.openPromise = new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });

    this.socket.addEventListener("message", event => {
      const message = JSON.parse(event.data);

      if (message.id) {
        const entry = this.pending.get(message.id);
        if (!entry) return;
        this.pending.delete(message.id);
        if (message.error) {
          entry.reject(new Error(message.error.message));
        } else {
          entry.resolve(message.result);
        }
        return;
      }

      if (message.method === "Page.loadEventFired") {
        this.loadEventFired = true;
        return;
      }

      if (message.method === "Runtime.consoleAPICalled") {
        const text = (message.params?.args || [])
          .map(arg => {
            if (typeof arg.value !== "undefined") return String(arg.value);
            if (arg.description) return arg.description;
            return arg.type || "unknown";
          })
          .join(" ");
        this.consoleMessages.push({ type: message.params?.type || "log", text });
        return;
      }

      if (message.method === "Runtime.exceptionThrown") {
        const details = message.params?.exceptionDetails;
        const text = details?.exception?.description || details?.text || "Unknown exception";
        this.exceptionMessages.push(text);
        return;
      }

      if (message.method === "Log.entryAdded") {
        this.logEntries.push(message.params?.entry || {});
      }
    });
  }

  async open() {
    await this.openPromise;
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = { id, method, params };
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify(payload));
    });
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });

    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
    }

    return result.result?.value;
  }

  async close() {
    this.socket.close();
  }
}

function formatIssues(title, items) {
  if (items.length === 0) return `${title}: none`;
  return `${title}:\n- ${items.join("\n- ")}`;
}

async function main() {
  const wsUrl = await getPageWebSocketUrl();
  const client = new CdpClient(wsUrl);
  await client.open();

  await client.send("Runtime.enable");
  await client.send("Page.enable");
  await client.send("Log.enable");
  await client.send("Page.setLifecycleEventsEnabled", { enabled: true });
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });

  client.loadEventFired = false;
  await client.send("Page.navigate", { url: `${BASE_URL}?smoke=${Date.now()}` });
  for (let i = 0; i < 50 && !client.loadEventFired; i += 1) {
    await sleep(100);
  }
  await sleep(250);

  const results = await client.evaluate(`
    (async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      const assert = (condition, message, extra = null) => {
        if (!condition) {
          throw new Error(extra ? message + " :: " + extra : message);
        }
      };
      const minTouchTarget = selector => {
        const element = document.querySelector(selector);
        assert(element, "Missing mobile target", selector);
        const rect = element.getBoundingClientRect();
        assert(rect.width >= 44 || rect.height >= 44, "Tap target is too small", selector + " :: " + rect.width.toFixed(1) + "x" + rect.height.toFixed(1));
        return { selector, width: rect.width, height: rect.height };
      };

      localStorage.clear();
      if (typeof renderSchedule === "function") renderSchedule();
      if (typeof activateTab === "function") activateTab("schedule");
      await sleep(120);

      const sessionItems = document.querySelectorAll(".session-item");
      assert(sessionItems.length === 23, "Expected 23 schedule items", String(sessionItems.length));
      assert(document.documentElement.scrollWidth <= window.innerWidth + 2, "Detected horizontal overflow on mobile viewport", document.documentElement.scrollWidth + " > " + window.innerWidth);
      const touchTargets = [
        minTouchTarget(".header-link"),
        minTouchTarget(".learn-callout-link.primary"),
        minTouchTarget('.tab-btn[data-tab="notes"]')
      ];

      const firstTrigger = document.querySelector('.session-trigger[data-id="thu-04"]');
      assert(firstTrigger, "Could not find the welcome session trigger");
      firstTrigger.click();
      await sleep(80);
      assert(firstTrigger.getAttribute("aria-expanded") === "true", "Session did not expand");

      const summaryToggle = document.querySelector('.summary-toggle[data-id="thu-04"]');
      assert(summaryToggle, "Missing student summary toggle");
      summaryToggle.click();
      await sleep(80);
      assert(summaryToggle.getAttribute("aria-expanded") === "true", "Student summary did not open");

      const researchSessionTrigger = document.querySelector('.session-trigger[data-id="thu-09"]');
      assert(researchSessionTrigger, "Could not find a researched talk session trigger");
      researchSessionTrigger.click();
      await sleep(80);
      assert(researchSessionTrigger.getAttribute("aria-expanded") === "true", "Researched talk session did not expand");

      const researchToggle = document.querySelector('.research-toggle[data-id="thu-09"]');
      assert(researchToggle, "Missing research toggle for a talk session");
      researchToggle.click();
      await sleep(80);
      assert(researchToggle.getAttribute("aria-expanded") === "true", "Research notes did not open");

      const vcTrigger = document.querySelector('.session-trigger[data-id="thu-14"]');
      assert(vcTrigger, "Could not find the VC meetings trigger");
      vcTrigger.click();
      await sleep(80);
      const subItemsToggle = document.querySelector('.sub-items-toggle[data-id="thu-14"]');
      assert(subItemsToggle, "Missing sub-items toggle on VC session");
      subItemsToggle.click();
      await sleep(80);
      assert(subItemsToggle.getAttribute("aria-expanded") === "true", "VC participant list did not open");

      const sessionNoteToggle = document.querySelector('.note-toggle[data-note-type="session"][data-note-id="thu-04"]');
      assert(sessionNoteToggle, "Missing session note toggle");
      sessionNoteToggle.click();
      await sleep(260);
      const sessionTextarea = document.querySelector('.note-textarea[data-note-type="session"][data-note-id="thu-04"]');
      assert(sessionTextarea, "Missing session note textarea");
      sessionTextarea.value = "Test note from smoke script";
      document.querySelector('.note-save-btn[data-note-type="session"][data-note-id="thu-04"]').click();
      await sleep(120);

      const notesAfterSessionSave = JSON.parse(localStorage.getItem("emw2026_notes") || "{}");
      assert(notesAfterSessionSave["session:thu-04"]?.text === "Test note from smoke script", "Session note did not persist");
      assert(document.getElementById("noteCount").textContent.trim() === "1", "Header note count did not update after session save", document.getElementById("noteCount").textContent);

      document.querySelector('.tab-btn[data-tab="speakers"]').click();
      await sleep(180);
      const speakerSearch = document.getElementById("speakerSearch");
      assert(speakerSearch, "Missing speaker search input");
      speakerSearch.value = "Tim Draper";
      speakerSearch.dispatchEvent(new Event("input", { bubbles: true }));
      await sleep(120);
      assert(document.getElementById("speakersCount").textContent.includes("1 speaker"), "Speaker filtering did not reduce to one result", document.getElementById("speakersCount").textContent);

      const speakerTrigger = document.querySelector(".speaker-trigger");
      assert(speakerTrigger, "Missing speaker card after filtering");
      speakerTrigger.click();
      await sleep(80);
      assert(speakerTrigger.getAttribute("aria-expanded") === "true", "Speaker card did not expand");

      const speakerChip = document.querySelector(".speaker-session-chip");
      assert(speakerChip, "Missing speaker session chip");
      assert(speakerChip.tagName === "BUTTON", "Speaker session chip should be a real button", speakerChip.tagName);
      touchTargets.push(minTouchTarget(".speaker-session-chip"));
      speakerChip.click();
      await sleep(220);
      const activeScheduleTab = document.querySelector('.tab-btn[data-tab="schedule"]');
      const linkedTrigger = document.querySelector('.session-trigger[data-id="thu-09"]');
      assert(activeScheduleTab?.getAttribute("aria-selected") === "true", "Session chip did not switch back to schedule tab");
      assert(linkedTrigger?.getAttribute("aria-expanded") === "true", "Session chip did not open the matching schedule card");

      document.querySelector('.tab-btn[data-tab="notes"]').click();
      await sleep(180);
      touchTargets.push(minTouchTarget("#clearNotesBtn"));
      const quickCompose = document.getElementById("quickNoteCompose");
      assert(quickCompose, "Missing quick note composer");
      quickCompose.value = "Quick note from smoke script";
      document.getElementById("addQuickNote").click();
      await sleep(160);
      assert(document.getElementById("noteCount").textContent.trim() === "2", "Header note count did not include quick note", document.getElementById("noteCount").textContent);

      const quickNoteKeys = Object.keys(JSON.parse(localStorage.getItem("emw2026_notes") || "{}"));
      assert(!quickNoteKeys.some(key => key.startsWith("undefined:")), "Quick note composer created malformed notes", quickNoteKeys.join(", "));

      const quickSticky = [...document.querySelectorAll('#notesComposer .note-textarea[data-note-type="general"]')]
        .find(el => el.value.includes("Quick note from smoke script"));
      assert(quickSticky, "New quick sticky note did not render after save");

      const noteCards = [...document.querySelectorAll("#notesList .note-card-session")].map(el => el.textContent.trim());
      assert(noteCards.includes("Welcome to East Meets West"), "Linked session note did not appear in notes tab", noteCards.join(", "));

      document.getElementById("exportBtn").click();
      await sleep(80);
      touchTargets.push(minTouchTarget(".modal-close"));
      touchTargets.push(minTouchTarget("#shareBtn"));
      touchTargets.push(minTouchTarget("#copyBtn"));
      assert(document.getElementById("shareBtn"), "Missing share-to-notes button");
      assert(document.getElementById("copyBtn"), "Missing copy button");
      const exportText = document.getElementById("exportTextarea").value;
      assert(exportText.includes("Test note from smoke script"), "Export text missing session note");
      assert(exportText.includes("Quick note from smoke script"), "Export text missing quick note");
      assert(!document.getElementById("exportModal").classList.contains("hidden"), "Export modal did not open");
      document.getElementById("closeModal").click();
      await sleep(80);
      assert(document.getElementById("exportModal").classList.contains("hidden"), "Export modal did not close");

      document.getElementById("clearNotesBtn").click();
      await sleep(80);
      assert(!document.getElementById("clearNotesModal").classList.contains("hidden"), "Clear notes modal did not open");

      const clearInput = document.getElementById("clearNotesInput");
      const confirmClearBtn = document.getElementById("confirmClearNotesBtn");
      assert(confirmClearBtn.disabled, "Delete-all confirm should start disabled");

      clearInput.value = "Delete All";
      clearInput.dispatchEvent(new Event("input", { bubbles: true }));
      await sleep(40);
      assert(confirmClearBtn.disabled, "Delete-all confirm should stay disabled for the wrong phrase");

      clearInput.value = "delete all";
      clearInput.dispatchEvent(new Event("input", { bubbles: true }));
      await sleep(40);
      assert(!confirmClearBtn.disabled, "Delete-all confirm did not enable for the exact phrase");

      confirmClearBtn.click();
      await sleep(160);
      const notesAfterClear = JSON.parse(localStorage.getItem("emw2026_notes") || "{}");
      assert(Object.keys(notesAfterClear).length === 0, "Delete all notes did not clear localStorage");
      assert(document.getElementById("noteCount").textContent.trim() === "", "Header note count did not clear", document.getElementById("noteCount").textContent);
      assert(document.getElementById("clearNotesBtn").disabled, "Clear-all button should disable once notes are cleared");
      assert(document.getElementById("clearNotesModal").classList.contains("hidden"), "Clear notes modal did not close");

      return {
        sessionCount: sessionItems.length,
        noteCountAfterSave: "2",
        noteCountAfterClear: document.getElementById("noteCount").textContent.trim(),
        speakersCount: document.getElementById("speakersCount").textContent.trim(),
        noteCards,
        touchTargets,
        exportPreview: exportText.split("\\n").slice(0, 8),
      };
    })();
  `);

  await sleep(150);
  const consoleIssues = client.consoleMessages
    .filter(entry => ["error", "warning", "assert"].includes(entry.type))
    .map(entry => `${entry.type}: ${entry.text}`);
  const runtimeIssues = client.exceptionMessages.slice();
  const logIssues = client.logEntries
    .filter(entry => ["error", "warning"].includes(entry.level))
    .map(entry => `${entry.level}: ${entry.text || entry.source || "unknown log entry"}`);

  console.log(JSON.stringify({
    ok: true,
    baseUrl: BASE_URL,
    results,
    issues: {
      console: consoleIssues,
      runtime: runtimeIssues,
      log: logIssues,
    },
  }, null, 2));

  await client.close();
}

main().catch(async error => {
  console.error(error.stack || String(error));
  process.exitCode = 1;
});
