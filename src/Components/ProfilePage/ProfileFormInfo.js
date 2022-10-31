import { useState } from 'react';
import { useSelector } from 'react-redux';

import userIcon from 'img/profile-user.png';

const ProfileFormInfo = () => {
  const currentUser = useSelector(state => state.auth.currentUser);

  const [enteredFullName, setEnteredFullName] = useState(currentUser.fullName);
  const [enteredPhone, setEnteredPhone] = useState(currentUser.phone);
  const [enteredEmail, setEnteredEmail] = useState(currentUser.email);
  const [enteredAddress, setEnteredAddress] = useState(currentUser.address);
  // console.log(enteredFullName, enteredPhone, enteredEmail, enteredAddress);

  const fullNameChangeHandler = event => {
    event.preventDefault();
    setEnteredFullName(event.target.value);
  };

  const phoneChangeHandler = event => {
    event.preventDefault();
    setEnteredPhone(event.target.value);
  };

  const emailChangeHandler = event => {
    event.preventDefault();
    setEnteredEmail(event.target.value);
  };

  const addressChangeHandler = event => {
    event.preventDefault();
    setEnteredAddress(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log(enteredFullName, enteredPhone, enteredEmail, enteredAddress);
  };

  return (
    <div className="rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src={userIcon}
              alt="avt"
            />
            <span className="font-weight-bold">Long Phạm</span>
            <span className="text-black-50">{enteredEmail || '@longpt27'}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-9 border-right">
          <form onSubmit={submitHandler} className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label htmlFor="full-name" className="labels">
                  Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  value={enteredFullName}
                  onChange={fullNameChangeHandler}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="labels">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  value={enteredPhone}
                  onChange={phoneChangeHandler}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="email" className="labels">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="labels">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  value={enteredAddress}
                  onChange={addressChangeHandler}
                />
              </div>
            </div>
            {/* <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="currentPassword" className="labels">
                  Enter current Password
                </label>
                <input
                  id="Password"
                  type="text"
                  className="form-control"
                  placeholder="Enter current Password"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="newPassword" className="labels">
                  Enter new Password
                </label>
                <input
                  id="Password"
                  type="text"
                  className="form-control"
                  placeholder="Enter new Password"
                />
              </div>
            </div> */}
            <div className="mt-4 text-center">
              <button className="btn btn-primary profile-button">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormInfo;
