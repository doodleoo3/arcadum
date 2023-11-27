const tg = (window as any).Telegram.WebApp;

export function useTelegram() {
   return {
       tg,
       user: tg.initDataUnsafe?.user
   }
}