export function getApiUrl(path: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:8080/${path}`;
  }

  return `https://api.open-company.com/${path}`;
}