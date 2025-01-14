import React, { useState, useContext } from "react";
import { Segment, Form, Button, Header, Dropdown } from "semantic-ui-react";
import { config } from "../../common/config/config";
import { UserContext } from "../../common/context/UserProvider";
import TextareaAutosize from "react-textarea-autosize";
import useReactRouter from "use-react-router";
import { Helmet } from "react-helmet";
import "./register.css";
import Axios from "axios";

const path = config();

const Register = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const studentInfo = userInfo.user;
  const { history } = useReactRouter();

  const [studentProfileInfo, setStudentInfo] = useState({
    studentId: studentInfo._id ? studentInfo._id : "",
    name: studentInfo.name ? studentInfo.name : "",
    email: studentInfo.email,
    linkedin: studentInfo.linkedin ? studentInfo.linkedin : "",
    studentNumber: studentInfo.studentNumber ? studentInfo.studentNumber : "",
    skills: studentInfo.skills ? studentInfo.skills : "",
    phoneNumber: studentInfo.phoneNumber ? studentInfo.phoneNumber : "",
    program: studentInfo.program ? studentInfo.program : "",
  });

  // useEffect(() => {

  //   Axios.get(path + "student/profile/" + studentId)
  //     .then((res) => res.data)
  //     .then((data) => setStudentInfo(data));

  // },[null]);

  // const { data_value } = this.props.location;
  // console.log(data_value+".......");

  // handle dropdown category
  const handleProgramChange = (e, data) => {
    setStudentInfo({
      ...studentProfileInfo,
      program: data.value,
    });
  };

  // const categoryOptions = [
  //    text: "Machine Learning", value: "Machine Learning"
  // ];

  const categoryOptions = [
    {
      key: "DTI",
      text: "DTI(UI/UX,Data Science)",
      value: "DTI(UI/UX,Data Science)",
    },
    { key: "SystemSciences", text: "System Science", value: "System Science" },
    {
      key: "AMM",
      text: "AMM and Mechanical Engineering",
      value: "AMM and Mechanical Engineering",
    },
    {
      key: "ELG",
      text: "Electrical and Computer(ELG)",
      value: "Electrical and Computer(ELG)",
    },
    { key: "CS", text: "Computer Science", value: "Computer Science" },
    {
      key: "Engineeringmanagement",
      text: "Engineering Management",
      value: "Engineering Management",
    },
    {
      key: "ECivil",
      text: "Environment and Civil Engineering",
      value: "Environment and Civil Engineering",
    },
    {
      key: "BioChem",
      text: "Bio-Medical and Chemical Engineering",
      value: "Bio-Medical and Chemical Engineering",
    },
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if ((studentInfo.skills = "")) {
      alert("no skills available");
    }

    var studentnumber = document.getElementById("student_number").value;
    var tel = document.getElementById("student_phoneno").value;
    var telformat = /^\d{10}$/;
    var stuNumFormat = /^\d{9}$/;
    var studentskills = document.getElementById("student_skills").value;
    var student_program = document.getElementById("student_program").value;
    if (
      !studentnumber.match(stuNumFormat) ||
      !tel.match(telformat) ||
      studentskills === "" ||
      student_program === ""
    ) {
      if (!studentnumber.match(stuNumFormat)) {
        document.getElementById("student_number").style.border =
          " 1px solid red";
        document.getElementById("student_number_error_msg").style.display =
          "block";
        document.getElementById("student_number_error_msg").style.color = "red";
        event.preventDefault();
      } else if (!tel.match(telformat)) {
        document.getElementById("student_phoneno").style.border =
          " 1px solid red";
        document.getElementById("student_phoneno_error_msg").style.display =
          "block";
        document.getElementById("student_phoneno_error_msg").style.color =
          "red";
        event.preventDefault();
      } else if (student_program === "") {
        document.getElementById("student_program").style.border =
          " 1px solid red";
        document.getElementById("student_program_error_msg").style.display =
          "block";
        document.getElementById("student_program_error_msg").style.color =
          "red";
      } else if (studentskills === "") {
        document.getElementById("student_skills").style.border =
          " 1px solid red";
        document.getElementById("student_skills_error_msg").style.display =
          "block";
        document.getElementById("student_skills_error_msg").style.color = "red";
        event.preventDefault();
      }
    } else {
      document.getElementById("student_number_error_msg").style.display =
        "none";
      document.getElementById("student_number").style.border = "";
      document.getElementById("student_phoneno_error_msg").style.display =
        "none";
      document.getElementById("student_phoneno").style.border = "";
      document.getElementById("student_skills_error_msg").style.display =
        "none";
      document.getElementById("student_skills").style.border = "";
      document.getElementById("student_program_error_msg").style.display =
        "none";
      document.getElementById("student_program").style.border = "";
      Axios.post(path + "student/profile/edit/", studentProfileInfo)
        .then((res) => {
          if (res.data.message === "updated successfully") {
            alert("Your registration is successful.");
            return res.data;
          }
        })
        .then((data) => {
          setUserInfo({
            ...userInfo,
            user: data.user,
          });
        })
        .catch((e) => {
          console.log(e);
        });

      history.push("/");
    }
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setStudentInfo({
      ...studentProfileInfo,
      [name]: value,
    });
  };

  const StudentNumberValidation = ({ target: { name, value } }) => {
    setStudentInfo({
      ...studentProfileInfo,
      [name]: value,
    });
    var studentnumber = document.getElementById("student_number").value;
    var stuNumFormat = /^\d{9}$/;
    if (studentnumber.match(stuNumFormat)) {
      document.getElementById("student_number_error_msg").style.display =
        "none";
      document.getElementById("student_number").style.border = "";
    } else {
      document.getElementById("student_number").style.border = "1px solid red";
      document.getElementById("student_number_error_msg").style.display =
        "block";
      document.getElementById("student_number_error_msg").style.color = "red";
    }
  };

  const StudentPhoneValidation = ({ target: { name, value } }) => {
    setStudentInfo({
      ...studentProfileInfo,
      [name]: value,
    });

    var tel = document.getElementById("student_phoneno").value;
    var telformat = /^\d{10}$/;
    if (tel.match(telformat)) {
      document.getElementById("student_phoneno_error_msg").style.display =
        "none";
      document.getElementById("student_phoneno").style.border = "";
    } else {
      document.getElementById("student_phoneno").style.border =
        " 1px solid red";
      document.getElementById("student_phoneno_error_msg").style.display =
        "block";
      document.getElementById("student_phoneno_error_msg").style.color = "red";
    }
  };

  const StudentSkillsValidation = ({ target: { name, value } }) => {
    setStudentInfo({
      ...studentProfileInfo,
      [name]: value,
    });

    var studentskills = document.getElementById("student_skills").value;
    if (studentskills !== "") {
      document.getElementById("student_skills_error_msg").style.display =
        "none";
      document.getElementById("student_skills").style.border = "";
    } else {
      document.getElementById("student_skills").style.border = " 1px solid red";
      document.getElementById("student_skills_error_msg").style.display =
        "block";
      document.getElementById("student_skills_error_msg").style.color = "red";
    }
  };

  return (
    <Segment>
      <Helmet>
        <title>Register | Professional Development Club</title>
      </Helmet>
      <Header as="h2">
        <Header.Content>Registration Form</Header.Content>
      </Header>
      <Form onSubmit={handleFormSubmit} autoComplete="off">
        <Form.Field required>
          <label>Name</label>
          <input
            name="name"
            id="name"
            placeholder="Name"
            value={studentProfileInfo.name}
            type="text"
            disabled
          />
        </Form.Field>

        <Form.Field required>
          <label>Student Number</label>

          <input
            id="student_number"
            name="studentNumber"
            placeholder="Student Number"
            value={studentProfileInfo.studentNumber}
            onChange={StudentNumberValidation}
          />
          <div id="student_number_error_msg">
            <p>*should be a 9-digit number only</p>
          </div>
        </Form.Field>

        <Form.Field required>
          <label>Email</label>
          <input
            name="email"
            id="email"
            value={studentProfileInfo.email}
            placeholder="Email"
            disabled
          />
        </Form.Field>

        <Form.Field required>
          <label>Phone Number</label>
          <input
            id="student_phoneno"
            name="phoneNumber"
            value={studentProfileInfo.phoneNumber}
            onChange={StudentPhoneValidation}
            placeholder="Phone Number"
            // id="phonenumber"
            required
          />
          <div id="student_phoneno_error_msg">
            <p>*should be a 10-digit number only</p>
          </div>
        </Form.Field>

        <Form.Field>
          <label>LinkedIn URL</label>
          <input
            name="linkedin"
            id="linkedin"
            value={studentProfileInfo.linkedin}
            onChange={handleFormChange}
            placeholder="Linkedin URL"
          />
        </Form.Field>

        <Form.Field required>
          <label>Program</label>

          <Dropdown
            id="student_program"
            name="program"
            placeholder="Program of study"
            fluid
            selection
            onChange={handleProgramChange}
            options={categoryOptions}
            required
          />
          <div id="student_program_error_msg">
            <p>* please select a student program</p>
          </div>
        </Form.Field>

        <Form.Field
          id="student_skills"
          control={TextareaAutosize}
          name="skills"
          label="List your skills"
          placeholder="skills"
          onChange={StudentSkillsValidation}
          value={studentProfileInfo.skills}
          required
        ></Form.Field>
        <Form.Field>
          <div id="student_skills_error_msg">
            <p>* please provide student skills</p>
          </div>
        </Form.Field>

        <Button positive type="submit">
          Submit
        </Button>
      </Form>
    </Segment>
  );
};

export default Register;
