export function getApiUrl(path: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:8080/${path}`;
  }

  return `https://api-thingcast.vercel.app/${path}`; // replace with your API URL
}
export function getAppUrl(path: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000/${path}`;
  }

  return `https://thingcast.vercel.app/${path}`; //NOTE: leave this as is
}
