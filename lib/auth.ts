export const ADMIN_COOKIE = "satriz_admin";

export function isAuthed(token?: string | null): boolean {
  const expected = process.env.ADMIN_TOKEN;
  return Boolean(expected && token && token === expected);
}
