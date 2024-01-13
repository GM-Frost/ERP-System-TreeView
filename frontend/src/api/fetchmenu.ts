export async function fetchMenuData(): Promise<any[]> {
  const response = await fetch("http://localhost:57002/api/bom");
  const data = await response.json();
  return data;
}
