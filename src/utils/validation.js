export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password.length >= 6;

export const validateName = (name) => name.trim().length >= 2;

export const validateWeight = (value) => Number(value) > 0;

export const validateHeight = (value) => Number(value) > 0;
