import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./App";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const { from } = (location.state as any) || { from: { pathname: "/" } };
  const login = () => {
    auth.signIn(() => {
      history.replace(from);
    });
  };

  const handleSubmit = () => {
    login();
  };

  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                id="username"
                name="username"
                placeholder="Please enter username"
              />
              {touched.username && errors.username && (
                <div>{errors.username}</div>
              )}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="xxxx@xxxx.xxxx"
                type="email"
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>

            <button type="submit" className="btn btn__primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
