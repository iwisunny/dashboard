import Apps from '../mock/apps.json';
import App from '../mock/app.json';
import InstalledApps from '../mock/installed-apps.json';

export async function getApps(ctx) {
  const apps = await Promise.resolve(Apps);

  ctx.body = {
    total_items: 2,
    total_pages: 1,
    page_size: 10,
    current_page: 1,
    items: apps,
  };
}

export async function getApp(ctx) {
  const app = await Promise.resolve(App);
  ctx.body = app;
}

export async function getInstalledApps(ctx) {
  const apps = await Promise.resolve(InstalledApps);

  ctx.body = {
    total_items: 2,
    total_pages: 1,
    page_size: 10,
    current_page: 1,
    items: apps,
  };
}
