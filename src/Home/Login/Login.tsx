import { Button, Col, Form, Input, message, Row } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginServices } from "../../axios/services";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import login from "../../assets/12643932_5031659-removebg-preview.png"; // Your uploaded image
import logo from '../../assets/M-Connect.png'
import classes from './Login.module.css'
export default function Login() {
  interface formValues {
    organisationCode: string;
    username: string;
    password: string;
  }

  const navigate = useNavigate();
  const sha1 = require("sha1");

  const userValidationSchema = Yup.object({
    organisationCode: Yup.string().required("Organisation code is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
    username: Yup.string().required("Username is required"),
  });

  const handleLogin = (values: formValues) => {
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("device_type", "3");
    formData.append("userName", values.username);
    formData.append(
      "authcode",
      sha1("A0322A@B&H@R!!akLLo012VSzXycAA1" + values.username)
    );
    loginServices(formData)
      .then((response) => {
        console.log("success", response.data);
        localStorage.setItem("token", response.data.token);
        if (response.data.status) {
          message.success(response.data.msg);
          navigate("/dashboard");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { handleBlur, handleChange, handleSubmit, touched, errors, values } =
    useFormik({
      initialValues: {
        organisationCode: "",
        username: "",
        password: "",
      },
      validationSchema: userValidationSchema,
      onSubmit: (values: formValues) => {
        handleLogin(values);
      },
    });

  return (
    <div className={`d-flex ${classes.container}`}>
      <Row className="w-100">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className={classes.layout}
        >
          <img
            src={login}
            alt="Login visual"
            className="w-75 h-75 mt-5"
          />
          
        </Col>

        {/* Right Section - Login Form */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="d-flex center mt-5"
        >
          <div
           className="mx-auto"
           
          >
            <div className="row p-2">
              <img src={logo} className={classes.logoimg}></img>
            </div>
            <h5 className="mb-5 fw-bold">
              M-POWER
            </h5>
            <h4 className={`mb-3 ${classes.link}`}>Login</h4>
            <Form
              onFinish={handleSubmit}
              layout="vertical" 
            >
              {/* Organization Code */}
              <Form.Item
                label="Organisation Code"
                required
                validateStatus={
                  touched.organisationCode && errors.organisationCode
                    ? "error"
                    : ""
                }
                help={
                  touched.organisationCode && errors.organisationCode
                    ? errors.organisationCode
                    : ""
                }
              >
                <Input
                  name="organisationCode"
                  placeholder="Organization Code"
                  value={values.organisationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Username */}
              <Form.Item
                label="Username"
                required
                validateStatus={
                  touched.username && errors.username ? "error" : ""
                }
                help={touched.username && errors.username ? errors.username : ""}
              >
                <Input
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Password"
                required
                validateStatus={
                  touched.password && errors.password ? "error" : ""
                }
                help={touched.password && errors.password ? errors.password : ""}
              >
                <Input.Password
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <div>
                <a href="#" className={`${classes.link} float-end`}>
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="primary"
                block
                htmlType="submit"
                className={`${classes.loginbtn} menubtn mt-2`}
              >
                Login
              </Button>
            </Form>

            {/* Signup Link */}
            <div className="mt-3">
              <span>Don't have an account?</span>{" "}
              <a href="#" className={classes.link}>
                Signup
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
