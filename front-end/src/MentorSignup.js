import React from "react";

function MentorSignup({ setMentor, mentorData }) {
  const changeHandler = (event) => {
    const data = { ...mentorData };
    const field = event.target.name;
    const value = event.target.value;
    data[field] = value;
    setMentor(data);
  };

  return (
    <div className="register__details">
      <label for="">Enter Name</label>
      <input
        type="text"
        minLength="6"
        name="username"
        value={mentorData.username}
        placeholder="Enter your full name"
        className="signup__name"
        onChange={changeHandler}
        required
      />
      <label for="">Enter Email</label>
      <input
        type="email"
        minLength="6"
        name="email"
        value={mentorData.email}
        placeholder="Enter your email"
        className="signup__email"
        onChange={changeHandler}
        required
      />
      <label for="">Enter Mobile Number</label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        name="mentor__phone"
        value={mentorData.mentor_phone}
        placeholder="Phone no."
        className="signup__phone"
        onChange={changeHandler}
        required
      />
      <label for="">Enter Address</label>
      <input
        type="text"
        minLength="6"
        name="mentor__address"
        value={mentorData.mentor__address}
        placeholder="Address"
        className="signup__address"
        onChange={changeHandler}
        required
      />
      <br />
      <label for="student__exam">Exam you are mentoring</label>
      <select
        name="mentor__exam"
        value={mentorData.mentor__exam}
        id="mentor__exam"
        placeholder="Exam"
        onChange={changeHandler}
        required
      >
        <option value="" disabled selected required>
          Select exam
        </option>
        <option value="JEE">JEE</option>
        <option value="NEET">NEET</option>
      </select>
      <label for="student__exam">Subject you are mentoring</label>
      <select
        name="mentor__subject"
        value={mentorData.mentor__subject}
        id="mentor__subject"
        placeholder="subject"
        onChange={changeHandler}
        required
      >
        <option value="" disabled selected>
          Select subject
        </option>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
        {mentorData["mentor__exam"] === "JEE" ? (
          <option value="maths">Maths</option>
        ) : (
          <option value="biology">Biology</option>
        )}
      </select>
      <label for="">Password</label>
      <input
        type="password"
        minLength="6"
        name="password"
        value={mentorData.password}
        placeholder="Enter password"
        className="register__password"
        onChange={changeHandler}
        required
      />
    </div>
  );
}

export default MentorSignup;
