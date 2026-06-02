/**
 * zcash.school — Shared sheet receiver (Airdrops + Feedback)
 *
 * One Apps Script Web App, one webhook URL, two destination tabs in
 * the same spreadsheet. The script branches on the incoming `type`
 * field:
 *
 *   type: 'airdrop'  (or absent)  -> tab named "Airdrops"
 *                                    (falls back to SHEET_GID, then
 *                                     to the active sheet)
 *   type: 'feedback'              -> tab named "Feedback"
 *                                    (falls back to active sheet)
 *
 * One-time setup (~5 minutes, do once):
 *   1. Open the Airdrops Team spreadsheet:
 *      https://docs.google.com/spreadsheets/d/11d378g5feA7PNuEVP6k6dEP4bX2YQBQfTTPnQ1n-8DU
 *   2. Make sure two tabs exist: "Airdrops" and "Feedback".
 *      Header rows (row 1):
 *        Airdrops:  Timestamp | Unified Address | Email | Event | Contact | Source | UserAgent
 *        Feedback:  Timestamp | Name | Email | Rating | Context | Feedback | Source | UserAgent
 *      (You can rename the tabs later; the script will pick them up by
 *       name. If the tab does not exist, rows fall back to the active
 *       sheet so nothing is lost.)
 *   3. Extensions -> Apps Script. Replace the script with this file.
 *   4. Deploy -> New deployment (or Manage deployments -> New version):
 *        Type:           Web app
 *        Execute as:     Me (your Google account)
 *        Who has access: Anyone
 *      Authorize when prompted. Copy the Web app URL.
 *   5. In Vercel -> Settings -> Environment Variables, set:
 *        AIRDROPS_WEBHOOK_URL = <Web app URL from step 4>
 *      Redeploy zcash.school once.
 *
 * Updating later: edit this file -> Manage deployments -> New version
 * (keep the same Web app URL; no env-var change needed).
 */

var SHEET_ID  = '11d378g5feA7PNuEVP6k6dEP4bX2YQBQfTTPnQ1n-8DU';
var SHEET_GID = 1866878924; // original airdrops tab gid from the URL
var TAB_AIRDROPS = 'Airdrops';
var TAB_FEEDBACK = 'Feedback';

function doPost(e) {
  try {
    var data = parseBody(e);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var type = String(data.type || 'airdrop').toLowerCase();
    var ts = new Date().toISOString();

    if (type === 'feedback') {
      var fb = pickSheet(ss, TAB_FEEDBACK);
      fb.appendRow([
        ts,
        str(data.name),
        str(data.email),
        str(data.rating),
        str(data.context),
        str(data.feedback),
        str(data.source) || 'zcash.school /feedback',
        str(data.userAgent)
      ]);
    } else {
      var ad = pickSheet(ss, TAB_AIRDROPS, SHEET_GID);
      ad.appendRow([
        ts,
        str(data.unifiedAddress),
        str(data.email),
        str(data.event),
        str(data.contact),
        str(data.source) || 'zcash.school',
        str(data.userAgent)
      ]);
    }

    return ok();
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('zcash.school sheet receiver. POST JSON only.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ---- helpers ----

function parseBody(e) {
  var ct = (e && e.postData && e.postData.type) || '';
  if (ct.indexOf('application/json') !== -1) {
    return JSON.parse((e.postData && e.postData.contents) || '{}');
  }
  return (e && e.parameter) || {};
}

function pickSheet(ss, name, gidFallback) {
  var byName = ss.getSheetByName(name);
  if (byName) return byName;
  if (typeof gidFallback === 'number') {
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === gidFallback) return sheets[i];
    }
  }
  return ss.getActiveSheet();
}

function str(v) {
  return (v === null || v === undefined) ? '' : String(v).trim();
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
