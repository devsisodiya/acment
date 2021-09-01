import validator from "validator";

export const loginValidator = ({ email, password }) => {
  if (!email || typeof email !== "string") {
    console.log("Email is required");
    alert("Email is required");
    return false;
  }

  if (!validator.isEmail(email)) {
    console.log("Wrong email");
    alert("Wrong email");
    return false;
  }

  if (!password || typeof password !== "string") {
    console.log("Password is required");
    alert("Password is required");
    return false;
  }

  if (password.length < 8) {
    console.log("Password too small. Should be atleast 8 characters");
    alert("Password too small. Should be atleast 8 characters");
    return false;
  }
  return true;
};

export const studentSignup_validator = (
  { username, email, phone, parent_phone, address, password, exam },
  isPasswordRequired = "true"
) => {
  if (!username || typeof username !== "string") {
    console.log("Username is required");
    alert("Username is required");
    return false;
  }

  if (!email || typeof email !== "string") {
    console.log("Email is required");
    alert("Email is required");
    return false;
  }

  if (!validator.isEmail(email)) {
    console.log("Wrong email");
    alert("Wrong email");
    return false;
  }

  if (!phone || typeof phone !== "string") {
    console.log("Phone no. is required");
    alert("Phone no. is required");
    return false;
  }

  if (!parent_phone || typeof phone !== "string") {
    console.log("Parents phone no. is required");
    alert("Parents phone no. is required");
    return false;
  }

  if (!address || typeof address !== "string") {
    console.log("Address is required");
    alert("Address is required");
    return false;
  }

  if (phone.length !== 10) {
    console.log("Wrong phone no.");
    alert("Wrong phone no.");
    return false;
  }

  if (parent_phone.length !== 10) {
    console.log("Wrong parent's phone no.");
    alert("Wrong parent's phone no.");
    return false;
  }

  if (isPasswordRequired && (!password || typeof password !== "string")) {
    console.log("Password is required");
    alert("Password is required");
    return false;
  }

  if (isPasswordRequired && password.length < 7) {
    console.log("Password too small. Should be atleast 8 characters");
    alert("Password too small. Should be atleast 8 characters");
    return false;
  }

  if (!exam || typeof exam !== "string") {
    console.log("Exam is required");
    alert("Exam is required");
    return false;
  }

  return true;
};

export const mentorSignup_validator = (
  { username, email, phone, address, password, exam, subject },
  isPasswordRequired = "true"
) => {
  if (!username || typeof username !== "string") {
    console.log("Username is required");
    alert("Username is required");
    return false;
  }

  if (!email || typeof email !== "string") {
    console.log("Email is required");
    alert("Email is required");
    return false;
  }

  if (!validator.isEmail(email)) {
    console.log("Wrong email");
    alert("Wrong email");
    return false;
  }

  if (!phone || typeof phone !== "string") {
    console.log("Phone no. is required");
    alert("Phone no. is required");
    return false;
  }

  if (!address || typeof address !== "string") {
    console.log("Address is required");
    alert("Address is required");
    return false;
  }

  if (phone.length !== 10) {
    console.log("Wrong phone no.");
    alert("Wrong phone no.");
    return false;
  }

  if (isPasswordRequired && (!password || typeof password !== "string")) {
    console.log("Password is required");
    alert("Password is required");
    return false;
  }

  if (isPasswordRequired && password.length < 7) {
    console.log("Password too small. Should be atleast 8 characters");
    alert("Password too small. Should be atleast 8 characters");
    return false;
  }

  if (!exam || typeof exam !== "string") {
    console.log("Exam is required");
    alert("Exam is required");
    return false;
  }

  if (!subject || typeof subject !== "string") {
    console.log("Subject is required");
    alert("Subject is required");
    return false;
  }

  return true;
};
