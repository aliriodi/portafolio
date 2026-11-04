import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';
import '../globals.css';
export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: 'Home'});
  return <html lang={locale}><body><NextIntlClientProvider><header><Link href="/" className="brand">{t('brand')}</Link><nav aria-label={t('language')}><Link href="/" locale="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link><Link href="/" locale="es" aria-current={locale === 'es' ? 'page' : undefined}>ES</Link></nav></header><main>{children}</main></NextIntlClientProvider></body></html>;
}
