import React from "react";

function StudentSignup({ setStudent, studentData }) {
  const changeHandler = (event) => {
    const data = { ...studentData };
    const field = event.target.name;
    const value = event.target.value;
    data[field] = value;
    setStudent(data);
  };

  return (
    <div className="register__details">
      <label for="">Enter Name</label>
      <input
        type="text"
        minLength="6"
        name="username"
        value={studentData.username}
        placeholder="Full name"
        className="signup__name"
        onChange={changeHandler}
        required
      />
      <label for="">Enter Email</label>
      <input
        type="email"
        minLength="6"
        name="email"
        value={studentData.email}
        placeholder="Email"
        className="signup__email"
        onChange={changeHandler}
        required
      />
      <label for="">Enter Mobile Number</label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        name="phone"
        value={studentData.phone}
        placeholder="Your phone no."
        className="signup__phone"
        onChange={changeHandler}
        required
      />
      <label for="">Enter Parent's Mobile Number</label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        name="parent_phone"
        value={studentData.parent_phone}
        placeholder="Parent's phone no."
        className="signup__phone"
        onChange={changeHandler}
      />
      <label for="">Enter Address</label>
      <input
        type="text"
        minLength="6"
        name="student__address"
        value={studentData.student__address}
        placeholder="Address"
        className="signup__address"
        onChange={changeHandler}
        required
      />
      <br />
      <label for="student__exam">Exam you are preparing </label>
      <select
        name="student__exam"
        id="student__exam"
        placeholder="Exam"
        onChange={changeHandler}
        value={studentData.student__exam}
        required
      >
        <option value="" disabled selected>
          Select exam
        </option>
        <option value="JEE">JEE</option>
        <option value="NEET">NEET</option>
      </select>
      <label for="">Password</label>
      <input
        type="password"
        minLength="6"
        name="password"
        value={studentData.password}
        placeholder="Enter password"
        className="register__password "
        onChange={changeHandler}
        required
      />
    </div>
  );
}

export default StudentSignup;
