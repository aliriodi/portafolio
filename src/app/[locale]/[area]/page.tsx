import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {prisma} from '@/lib/prisma';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export default async function PortfolioPage({params}: {params: Promise<{locale: string; area: string}>}) {
  const {locale, area} = await params;
  if (!['web-development', 'electrical-engineering'].includes(area)) notFound();
  const t = await getTranslations('Home');
  const projects = await prisma.project.findMany({where: {portfolio: {slug: area}, published: true}, orderBy: {position: 'asc'}, include: {translations: {where: {locale: {in: [locale, 'en']}}}}});
  return <><Link href="/">← {t('back')}</Link><h1>{t(area === 'web-development' ? 'webTitle' : 'engineeringTitle')}</h1><p className="intro">{t(area === 'web-development' ? 'webDescription' : 'engineeringDescription')}</p><section className="cards">{projects.length === 0 ? <p>{t('empty')}</p> : projects.map(project => {const content = project.translations.find(item => item.locale === locale) ?? project.translations.find(item => item.locale === 'en'); return content ? <article className="card" key={project.id}><h2>{content.title}</h2><p>{content.description}</p></article> : null;})}</section></>;
}
