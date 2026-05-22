/**
 * zcash.school — Airdrops sheet receiver
 *
 * One-time setup (~5 minutes):
 *   1. Open the Airdrops Team spreadsheet:
 *      https://docs.google.com/spreadsheets/d/11d378g5feA7PNuEVP6k6dEP4bX2YQBQfTTPnQ1n-8DU
 *   2. Extensions → Apps Script. Replace the placeholder code with this whole file.
 *   3. (Optional) Adjust SHEET_GID below to point at a different tab.
 *   4. In the sheet tab, set row 1 headers (left to right):
 *      Timestamp | Unified Address | Email | Event | Contact | Source | UserAgent
 *   5. Deploy → New deployment → Type: Web app
 *        Description:   zcash.school airdrops receiver
 *        Execute as:    Me (your Google account)
 *        Who has access: Anyone
 *      Authorize when Google prompts. Copy the resulting Web app URL.
 *   6. In Vercel → Settings → Environment Variables, add:
 *        AIRDROPS_WEBHOOK_URL = <the URL from step 5>
 *      Redeploy zcash.school once.
 *
 * That is the entire integration. No Resend, no zcash.school inbox, no
 * secrets in the repo. Every /airdrops submission appends a row to the
 * sheet within ~1s.
 *
 * Re-deploying the script: bump deployment version when you change this
 * file (Deploy → Manage deployments → edit → New version).
 */

var SHEET_ID  = '11d378g5feA7PNuEVP6k6dEP4bX2YQBQfTTPnQ1n-8DU';
var SHEET_GID = 1866878924; // the airdrops tab from the original URL

function doPost(e) {
  try {
    var data = {};
    var ct = (e.postData && e.postData.type) || '';
    if (ct.indexOf('application/json') !== -1) {
      data = JSON.parse(e.postData.contents || '{}');
    } else {
      data = e.parameter || {};
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheets = ss.getSheets();
    var sheet = null;
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === SHEET_GID) { sheet = sheets[i]; break; }
    }
    if (!sheet) sheet = ss.getActiveSheet();

    sheet.appendRow([
      new Date().toISOString(),
      String(data.unifiedAddress || '').trim(),
      String(data.email || '').trim(),
      String(data.event || '').trim(),
      String(data.contact || '').trim(),
      String(data.source || 'zcash.school').trim(),
      String(data.userAgent || '').trim()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('zcash.school airdrops receiver. POST JSON only.')
    .setMimeType(ContentService.MimeType.TEXT);
}
