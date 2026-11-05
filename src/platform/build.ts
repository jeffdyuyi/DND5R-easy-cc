/** Android is a separate bundled target; the browser build keeps its existing behavior. */
export const IS_ANDROID_BUILD = import.meta.env.MODE === 'android';
