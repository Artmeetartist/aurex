import { FactRegister, LegalDocument } from "@/components/legal/legal-document";
import { LOCALE_COOKIE } from "@/i18n/config";
import { loadPage, metadataFor } from "@/lib/page";

export const generateMetadata = metadataFor("cookies");

export default async function CookiesPage({ params }: PageProps<"/[locale]/cookies">) {
  const { locale, content } = await loadPage(params);
  const { register } = content.cookies;
  const cols = ["name", "purpose", "duration", "category"] as const;
  const rows = [{ name: LOCALE_COOKIE, ...register.rows.locale }];

  // Stacked registers on phones, a table from `sm` up.
  const table = (
    <>
      <div className="space-y-6 sm:hidden">
        {rows.map((row) => (
          <FactRegister
            key={row.name}
            pending=""
            rows={cols.map((c) => ({
              label: register.columns[c],
              value: c === "name" ? <span className="font-mono text-[0.8125rem]">{row.name}</span> : row[c],
            }))}
          />
        ))}
      </div>
      <table className="hidden w-full border-collapse text-left text-[0.9375rem] sm:table">
        <caption className="sr-only">{register.caption}</caption>
        <thead>
          <tr className="border-y border-ink/10">
            {cols.map((c) => (
              <th key={c} scope="col" className="t-eyebrow py-3 pr-6 font-normal text-stone last:pr-0">
                {register.columns[c]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-ink/10 align-top">
              <th scope="row" className="py-4 pr-6 font-mono text-[0.8125rem] font-normal text-ink">
                {row.name}
              </th>
              <td className="py-4 pr-6 text-ink/80">{row.purpose}</td>
              <td className="py-4 pr-6 whitespace-nowrap text-ink/80">{row.duration}</td>
              <td className="py-4 text-ink/80">{row.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <LegalDocument locale={locale} route="cookies" doc={content.cookies} content={content} slots={{ register: table }} />
  );
}
