export async function load({ fetch }) {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
  
    if (!response.ok) {
      throw new Error('Failed to fetch dog breeds');
    }
  
    const data = await response.json();

    const breeds = data.message;

    return { breeds };
  }