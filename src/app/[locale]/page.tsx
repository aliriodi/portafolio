import {getTranslations} from 'next-intl/server';
import InteractivePortrait from "@/components/InteractivePortrait";
import Image from "next/image";
import {Link} from '@/i18n/navigation';
export default async function Home() {
  const t = await getTranslations('Home');
  return <div>
  <p className="eyebrow">{t('eyebrow')}</p>
  <h1>{t('title')}</h1>
  <p className="intro">{t('intro')}</p>
  
  <div className="retrato-interactivo" tabIndex={0}>
  <InteractivePortrait />
  

 
</div>

  <section className="cards" aria-label={t('areas')}>{(['web-development', 'electrical-engineering'] as const)
  .map((slug, i) => 
  <Link className="card" key={slug} href={`/${slug}`}>
    <span className="number">0{i + 1}</span>
    <h2>{t(i === 0 ? 'webTitle' : 'engineeringTitle')}</h2>
    <p>{t(i === 0 ? 'webDescription' : 'engineeringDescription')}</p>
    <span className="action">{t('explore')} ↗</span>
    </Link>)}</section>
    </div>
}
