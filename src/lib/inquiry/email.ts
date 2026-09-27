import "server-only";
import type { SiteContent } from "@/content/types";
import { localeMeta } from "@/i18n/config";
import type { InquiryRecord } from "./schema";

/** Escapes text for safe interpolation into HTML (element content and attributes). */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapses whitespace, including line breaks, for single-line contexts such as a subject. */
function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

type Row = { label: string; value: string; href?: string };

function rows(inquiry: InquiryRecord, content: SiteContent): Row[] {
  const { fields, types } = content.inquiry;
  const list: Row[] = [
    { label: fields.type, value: types[inquiry.type].label },
    { label: fields.name, value: inquiry.name },
    { label: fields.organisation, value: inquiry.organisation },
  ];
  if (inquiry.role) list.push({ label: fields.role, value: inquiry.role });
  list.push(
    { label: fields.email, value: inquiry.email, href: `mailto:${inquiry.email}` },
    { label: fields.country, value: inquiry.country },
    { label: content.nav.language, value: localeMeta[inquiry.locale].label },
  );
  return list;
}

function stamp(date: Date) {
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

/**
 * Internal notification email. Labels come from the site content (the team's
 * working language) so no copy is hard-coded; every user value is escaped.
 */
export function renderInquiryEmail(inquiry: InquiryRecord, content: SiteContent, meta: { id: string; receivedAt: Date }) {
  const { siteName } = content.meta;
  const typeLabel = content.inquiry.types[inquiry.type].label;
  const subject = oneLine(`${siteName} · ${content.inquiry.title} · ${typeLabel} — ${inquiry.organisation}`).slice(0, 200);
  const list = rows(inquiry, content);

  const sans = "'Helvetica Neue',Helvetica,Arial,sans-serif";
  const mono = "'SFMono-Regular',Menlo,Consolas,monospace";

  const rowHtml = list
    .map((r) => {
      const value = r.href
        ? `<a href="${escapeHtml(r.href)}" style="color:#7D5F1A;text-decoration:underline;">${escapeHtml(r.value)}</a>`
        : escapeHtml(r.value);
      return `<tr>
  <td valign="top" style="padding:12px 0;border-top:1px solid #EFEBE1;width:34%;font:500 11px/1.6 ${mono};letter-spacing:.14em;text-transform:uppercase;color:#5E5A52;">${escapeHtml(r.label)}</td>
  <td valign="top" style="padding:12px 0;border-top:1px solid #EFEBE1;font:400 15px/1.5 ${sans};color:#111111;">${value}</td>
</tr>`;
    })
    .join("\n");

  const messageHtml = escapeHtml(inquiry.message).replace(/\r?\n/g, "<br>");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F8F6F0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F6F0;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E4DFD2;border-radius:16px;">
    <tr><td style="padding:32px 32px 8px;">
      <div style="font:500 11px/1 ${mono};letter-spacing:.2em;text-transform:uppercase;color:#7D5F1A;">${escapeHtml(siteName)} &nbsp;·&nbsp; ${escapeHtml(content.inquiry.title)}</div>
      <div style="margin-top:16px;font:300 26px/1.2 ${sans};letter-spacing:-.02em;color:#111111;">${escapeHtml(typeLabel)} — ${escapeHtml(inquiry.organisation)}</div>
    </td></tr>
    <tr><td style="padding:16px 32px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rowHtml}
      </table>
    </td></tr>
    <tr><td style="padding:8px 32px 32px;">
      <div style="padding-top:20px;border-top:1px solid #EFEBE1;font:500 11px/1 ${mono};letter-spacing:.14em;text-transform:uppercase;color:#5E5A52;">${escapeHtml(content.inquiry.fields.message)}</div>
      <div style="margin-top:14px;font:400 15px/1.7 ${sans};color:#111111;">${messageHtml}</div>
    </td></tr>
    <tr><td style="padding:16px 32px;border-top:1px solid #EFEBE1;font:400 12px/1.5 ${mono};color:#8F8B82;">${escapeHtml(stamp(meta.receivedAt))} &nbsp;·&nbsp; ${escapeHtml(meta.id)}</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${siteName} · ${content.inquiry.title}`,
    "",
    ...list.map((r) => `${r.label}: ${oneLine(r.value)}`),
    "",
    `${content.inquiry.fields.message}:`,
    inquiry.message,
    "",
    `${stamp(meta.receivedAt)} · ${meta.id}`,
  ].join("\n");

  return { subject, html, text };
}
