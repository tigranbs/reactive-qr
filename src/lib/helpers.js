export const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ((ua.indexOf('safari') !== -1) && (ua.indexOf('chrome') === -1));
};
