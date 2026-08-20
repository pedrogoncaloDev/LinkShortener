const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function shortenUrl(url) {
  const response = await fetch(`${API_URL}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.detail || 'Não foi possível encurtar o link.')
  }

  return response.json()
}
