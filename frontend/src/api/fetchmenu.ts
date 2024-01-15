export async function fetchMenuData(): Promise<any[]> {
  const response = await fetch(`${import.meta.env.VITE_COREAPI_URL}/api/bom`);
  const data = await response.json();
  return data;
}
