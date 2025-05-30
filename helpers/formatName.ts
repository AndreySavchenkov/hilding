export const formatName = (firstName: string, lastName: string) => {
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const formattedLastName = lastName.charAt(0).toUpperCase();

  return `${formattedFirstName} ${formattedLastName}.`;
};