export const getRoleName = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "Administrator";
    case "DRIVER":
      return "Wózkowy";
    default:
      return "Pracownik";
  }
};