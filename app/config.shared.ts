export const APP_NAME = 'Paul Terhaar SWAPI';

export function title(pageTitle?: string) {
  if (!pageTitle) return APP_NAME;

  return `${pageTitle} | ${APP_NAME}`;
}
