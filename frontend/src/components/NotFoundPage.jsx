import React from 'react'
import imageNotFound from '../assets/404-page.svg';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="text-center">
            <img alt={t('notFound.message')} className="img-fluid h-25" src={imageNotFound} />
            <h1 className="h4 text-muted">{t('notFound.message')}</h1>
            <p className="text-muted">{t('notFound.youCan')}<a href="/">{t('notFound.mainPage')}</a></p>
        </div>
    )
}