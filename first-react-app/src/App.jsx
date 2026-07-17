import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    adult: true,
    gender: "male",
    course: "MCA",
  });

  function changeHandler(event) {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function submit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div className="container">
      <form className="form-card" onSubmit={submit}>
        <h1>Student Registration</h1>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={changeHandler}
          >
            <option value="MCA">MCA</option>
            <option value="MSc">MSc</option>
            <option value="MBA">MBA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            name="adult"
            checked={formData.adult}
            onChange={changeHandler}
          />
          <label>18+ Years Old</label>
        </div>

        <div className="radio-group">
          <label>Gender</label>

          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={changeHandler}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={changeHandler}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="others"
                checked={formData.gender === "others"}
                onChange={changeHandler}
              />
              Others
            </label>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;