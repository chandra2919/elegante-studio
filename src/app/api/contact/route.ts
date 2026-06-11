import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// ── Gmail notification ─────────────────────────────────────────
const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD ?? "";

async function sendEmailNotification(submission: Submission) {
  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("[contact API] Gmail credentials not set — email skipped");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });

  await transporter.sendMail({
    from: `"Eleganté Studio" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    subject: `✨ New Enquiry — ${submission.firstName} ${submission.lastName}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#faf9f7;border:1px solid #e8d5a3;">
        <!-- Header -->
        <div style="background:#1a1a1a;padding:32px 40px;text-align:center;">
          <p style="color:#c8a86b;letter-spacing:4px;font-size:11px;margin:0 0 8px;">ELEGANTÉ INTERIORS & EVENTS</p>
          <h1 style="color:#ffffff;font-weight:300;font-size:26px;margin:0;">New Enquiry Received</h1>
        </div>

        <!-- Gold bar -->
        <div style="height:3px;background:linear-gradient(to right,#c8a86b,#e8d5a3,#c8a86b);"></div>

        <!-- Body -->
        <div style="padding:40px;">
          <p style="color:#666;font-size:13px;margin:0 0 28px;">
            Submitted on <strong>${submission.submittedAt}</strong>
          </p>

          <!-- Details table -->
          <table style="width:100%;border-collapse:collapse;">
            ${[
              ["First Name",  submission.firstName],
              ["Last Name",   submission.lastName],
              ["Email",       submission.email],
              ["Phone",       submission.phone || "Not provided"],
              ["Service",     submission.service || "Not specified"],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:12px 16px;background:#f5f0e8;border-bottom:1px solid #e8d5a3;
                           font-size:10px;letter-spacing:2px;color:#c8a86b;width:140px;font-family:Arial,sans-serif;">
                  ${label.toUpperCase()}
                </td>
                <td style="padding:12px 16px;background:#ffffff;border-bottom:1px solid #f0ebe0;
                           font-size:14px;color:#1a1a1a;">
                  ${value}
                </td>
              </tr>
            `).join("")}
          </table>

          <!-- Vision block -->
          <div style="margin-top:24px;padding:20px 24px;background:#ffffff;border-left:3px solid #c8a86b;">
            <p style="font-size:10px;letter-spacing:2px;color:#c8a86b;margin:0 0 10px;font-family:Arial,sans-serif;">
              VISION / MESSAGE
            </p>
            <p style="font-size:14px;color:#333;line-height:1.7;margin:0;">
              ${submission.vision || "Not provided"}
            </p>
          </div>

          <!-- CTA -->
          <div style="margin-top:32px;text-align:center;">
            <a href="https://docs.google.com/spreadsheets/d/1xhtPwh3MZxuFuJENAXdct0odcHtpjQO8Y6nH4e0HGus/edit"
               style="display:inline-block;padding:14px 32px;background:#1a1a1a;color:#c8a86b;
                      text-decoration:none;font-size:11px;letter-spacing:3px;font-family:Arial,sans-serif;">
              VIEW ALL ENQUIRIES →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding:20px 40px;background:#f5f0e8;border-top:1px solid #e8d5a3;text-align:center;">
          <p style="color:#999;font-size:11px;margin:0;">
            Eleganté Interiors & Events · 1046 S Telegraph Rd, Pontiac, MI
          </p>
        </div>
      </div>
    `,
  });
}

// ── Google Sheet config ────────────────────────────────────────
const SPREADSHEET_ID = "1xhtPwh3MZxuFuJENAXdct0odcHtpjQO8Y6nH4e0HGus";
const SHEET_NAME     = "Sheet1";

// ── Local JSON backup ──────────────────────────────────────────
const DATA_DIR  = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "submissions.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readSubmissions(): Submission[] {
  try {
    if (!fs.existsSync(JSON_FILE)) return [];
    return JSON.parse(fs.readFileSync(JSON_FILE, "utf-8"));
  } catch {
    return [];
  }
}

// ── Google Auth ────────────────────────────────────────────────
function getGoogleAuth() {
  const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    return new google.auth.GoogleAuth({ credentials, scopes });
  }
  const keyFile = path.join(process.cwd(), "service-account.json");
  return new google.auth.GoogleAuth({ keyFile, scopes });
}

// ── Append row to Google Sheet ─────────────────────────────────
async function appendToSheet(submission: Submission) {
  const auth   = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const meta = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:H1`,
  });

  if (!meta.data.values || meta.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [["Submission ID","Submitted At","First Name","Last Name","Email","Phone","Service","Vision / Message"]],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:H`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        submission.id,
        submission.submittedAt,
        submission.firstName,
        submission.lastName,
        submission.email,
        submission.phone,
        submission.service,
        submission.vision,
      ]],
    },
  });
}

// ── Types ──────────────────────────────────────────────────────
export interface Submission {
  id:          string;
  submittedAt: string;
  firstName:   string;
  lastName:    string;
  email:       string;
  phone:       string;
  service:     string;
  vision:      string;
}

// ── POST ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const submission: Submission = {
      id:          crypto.randomUUID(),
      submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      firstName:   (body.firstName  || "").trim(),
      lastName:    (body.lastName   || "").trim(),
      email:       (body.email      || "").trim(),
      phone:       (body.phone      || "").trim(),
      service:     (body.service    || "").trim(),
      vision:      (body.vision     || "").trim(),
    };

    // 1. Local JSON backup
    ensureDir();
    const all = readSubmissions();
    all.push(submission);
    fs.writeFileSync(JSON_FILE, JSON.stringify(all, null, 2), "utf-8");

    // 2. Gmail notification (fire-and-forget)
    sendEmailNotification(submission).catch((e) =>
      console.warn("[contact API] Email send failed:", e)
    );

    // 3. Google Sheets (skip if credentials missing)
    const keyFile = path.join(process.cwd(), "service-account.json");
    const hasCredentials = fs.existsSync(keyFile) || !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (hasCredentials) {
      try {
        await appendToSheet(submission);
      } catch (sheetsErr) {
        console.warn("[contact API] Google Sheets error:", sheetsErr);
      }
    }

    return NextResponse.json({ success: true, id: submission.id });

  } catch (err) {
    console.error("[contact API]", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
