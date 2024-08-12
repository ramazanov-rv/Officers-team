const tg = Telegram.WebApp;

export function useTelegram() {
  const user = tg.initDataUnsafe.user;
  return {
    tg,
    user,
  };
}
