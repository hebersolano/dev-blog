export function createUsernameFromEmail(email: string) {
  return email.slice(0, email.search(/@/) - 1);
}
