export function getApiUrl(path: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:8080/${path}`;
  }

  return `https://api.open-company.com/${path}`;
}
export function getAppUrl(path: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000/${path}`;
  }

  return `https://app.open-company.com/${path}`;
}
