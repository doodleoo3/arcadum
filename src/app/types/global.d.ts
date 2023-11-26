declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare module 'chessboardjs' {
    const Chessboard: any;
    export default Chessboard;
}

// interface TelegramWebApp {
//     initData: string;
//     ready: Function;
//     expand: Function;
//     username: string;
//     photo_url: string;
// }

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}
