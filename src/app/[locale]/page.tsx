import { getTranslations } from 'next-intl/server';
import InteractivePortrait from "@/components/InteractivePortrait";
import { Link } from '@/i18n/navigation';

export default async function Home() {
  const t = await getTranslations('Home');
  return (
    <div>

      <p className="eyebrow">{t('eyebrow')}</p>

      <div className="retrato-interactivo" tabIndex={0}>
        <section className="hero-presentacion">
          <div className="hero-retrato">
            <InteractivePortrait />
          </div>

          <div className="hero-texto">
            <h1
              className="hero-titulo"
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {t("name")}
            </h1>

            <p className="hero-subtitulo">
              {t('title1')}
            </p>

            <p className="hero-parrafo">
              {t('paragraph1')}
            </p>
          </div>
        </section>
      </div>

      <h1>{t('title')}</h1>
      <p className="intro">{t('intro')}</p>



      <section className="cards" aria-label={t('areas')}>{(['web-development', 'electrical-engineering'] as const)
        .map((slug, i) =>
          <Link className="card" key={slug} href={`/${slug}`}>
            <span className="number">0{i + 1}</span>
            <h2>{t(i === 0 ? 'webTitle' : 'engineeringTitle')}</h2>
            <p>{t(i === 0 ? 'webDescription' : 'engineeringDescription')}</p>
            <span className="action">{t('explore')} ↗</span>
          </Link>)}</section>
    </div>)
}
