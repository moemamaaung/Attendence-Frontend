import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "../login/Login.module.css";

import { getUser, logout } from "../login/authSlice";
import { updatePassword } from "../teacher/teacherSlice";

const UserProfileInfo = () => {
  

  const loginUser = useSelector(getUser);
  console.log("Log in user: " + loginUser);
  const userId = loginUser?.id;
  console.log("In the user profile Form id is :" + userId);

  const user = loginUser;
  console.log(user)


  const [id] = useState(user.id);
  const [ fullname] = useState(user.fullname)
  const [ password,setPassword ] = useState(user.password)
  const [ phno] = useState(user.phno)
  const [ username] = useState(user.username)
  const [ position ] = useState(user.position)
  const [ nrc ] = useState(user.nrc)
  const [gender] = useState(user.gender)
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [passwordError, setPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [updateRequestStatus, setUpdatRequestStatus] = useState("idle");

  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const canUpdate =
    [
      id,
      password
    ].every(Boolean) && updateRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPasswordSubmit = (event) => {
    event.preventDefault();

    if (canUpdate) {
      try {
        console.log("If can update,...");
        setUpdatRequestStatus("pending");
        if (confirmPassword !== password) {
          setPasswordError({
            confirmPassword:
              "new password and confirm password must be same!",
          });
          return;
        }

        if (!password) {
          setPasswordError({
            password: "Password should not be empty",
          });
        }
        dispatch(
          updatePassword({
            user: {
              id,
              fullname,
              password,
              phno,
              username,
              position,
              nrc,
              gender
            }
          })
        ).unwrap();
        dispatch(logout());
       
        setPassword("")

        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setUpdatRequestStatus("idle");
      }
    }
    console.log(canUpdate);
  };

  return (
    <div className={classes.m1}>
    <div className={classes.all}>
      <div className={classes.wrapper}>
        <div className="row">
          <div className="col-md-6">
            <div className="profile-head">
              <h1 className="text-center mb-5 mt-3">Profile</h1>

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-black">{fullname}</p>
                  </div>
                  
                </div>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>Username</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-black">{username}</p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>Ph No</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-black">{phno}</p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>Position</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-black">{position}</p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>NRC</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-black">{nrc}</p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>Gender</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-black">{gender}</p>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                <form onSubmit={onPasswordSubmit}>
                
                    <div className="row mt-5">
                      <div class="col-md-6">
                        <label class="form-label">New password</label>
                      </div>
                      <div class="col-md-6">
                        <input
                          type="password"
                          class="form-control w-70"
                          onChange={onPasswordChange}
                        />
                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col-md-6">
                        <label class="form-label">Confirm Password</label>
                      </div>
                      <div class="col-md-6">
                        <input
                          type="password"
                          class="form-control w-70"
                          value={confirmPassword}
                          onChange={onConfirmPasswordChange}
                        />
                      </div>
                    </div>
                    <span value={passwordError} className="text-danger">
                      {passwordError.confirmPassword}
                    </span>

                    <div class="text-center mt-5 w-60">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={onPasswordSubmit}
                        disabled={!canUpdate}
                        style={{ backgroundColor: "#29bfc2" }}
                      >
                        Save changes
                      </button>
                      &nbsp;
                      <Link to="/student">
                        <button type="button" class="btn btn-default btn-danger">
                          Cancel
                        </button>
                      </Link>
                    </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfileInfo;
