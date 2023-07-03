export const userFieldsValidator = (body) => {
  const { username, age, hobbies } = JSON.parse(body);

  if (typeof username !== 'string' || !username ) {
    return false;
  }

  if (typeof age !== 'number' || !age) {
    return false;
  }

  if (!Array.isArray(hobbies)) {
    return false;
  }

  if (Array.isArray(hobbies)) {
    if (
      hobbies.length > 0 &&
      hobbies.some((hobby) => typeof hobby !== 'string')
    ) {
      return false;
    }
  }

  return true;
};
