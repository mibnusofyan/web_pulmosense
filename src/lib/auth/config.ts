export const AUTH_COOKIE_NAME = "paruscan_session";
export const AUTH_SESSION_SECONDS = 8 * 60 * 60;

export const USER_ROLES = ["superadmin", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && USER_ROLES.includes(value as UserRole);
}
