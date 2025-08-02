const fullName = (name, surname) => {
  return `${name} ${surname}`;
};

const getInitial = (name, surname) => {
  const nameInitial = name.charAt(0).toUpperCase();
  const surnameInitial = surname.charAt(0).toUpperCase();
  return nameInitial + surnameInitial;
};

export {fullName, getInitial};
