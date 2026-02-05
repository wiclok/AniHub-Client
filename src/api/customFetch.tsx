type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Headers = Record<string, string>;

export const CustomFetch = async (
  url: string,
  method: Method = 'GET',
  payload?: unknown,
  headers: Headers = {}
) => {
  const defaultHeaders: Headers = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    credentials: 'include',
  };

  if (payload && method !== 'GET' && method !== 'DELETE') {
    options.body =
      payload instanceof FormData ? payload : JSON.stringify(payload);

    if (payload instanceof FormData) delete defaultHeaders['Content-Type'];
  }

  try {
    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type');
    const data =
      contentType && contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      throw new Error(
        typeof data === 'string' ? data : data?.message || `Error ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error('❌ CustomFetch error:', error);
    throw error;
  }
};
