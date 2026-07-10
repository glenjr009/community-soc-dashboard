const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')
const defaultApiUrls = ['http://localhost:8080', 'http://localhost:8000']

const apiUrls = configuredApiUrl
  ? [configuredApiUrl, ...defaultApiUrls.filter((url) => url !== configuredApiUrl)]
  : defaultApiUrls

export async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  let lastError: Error | undefined

  for (const baseUrl of apiUrls) {
    try {
      const response = await fetch(`${baseUrl}${path}`, options)
      if (response.ok) {
        return (await response.json()) as T
      }

      lastError = new Error(`Request to ${path} failed with status ${response.status}`)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unable to reach the backend API')
    }
  }

  throw lastError ?? new Error('Unable to reach the backend API')
}
