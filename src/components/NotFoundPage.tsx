import { Link } from 'react-router-dom';
import { localeHref, useLanguage } from '../i18n';
import { useSeo } from '../lib';

function NotFoundPage() {
  const { locale, t } = useLanguage();
  // A soft 404 that search engines index is worse than none at all.
  useSeo({ title: t.notFound.title, description: t.notFound.body, path: '/404', noIndex: true });

  return (
    <div className="article-page">
      <div className="glass-panel status-card" role="alert">
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.body}</p>
        <Link className="button button-primary" to={localeHref(locale)}>{t.notFound.action}</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
