const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const utils = {
  testEmailRegex: function (email) {
    const res = emailRegex.test(email);
    return res;
  },
  testPasswordRegex: function (password) {
    const res = passwordRegex.test(password);
    return res;
  },
  testUsernameLength: function (username) {
    const res = username.length >= 3 && username.length < 30 ? true : false;
    return res;
  },

  validateUsername: function (e) {
    const res = this.testUsernameLength(e.target.value);
    if (res === true) {
      return { valid: e.target.value };
    } else {
      return {
        error: true,
        message: "Name must be between 3 and 30 characters.",
      };
    }
  },

  validateEmail: function (e) {
    const res = this.testEmailRegex(e.target.value);
    if (res === true) {
      return {
        valid: e.target.value,
      };
    } else {
      return {
        error: true,
        message: "Please enter a valid email address.",
      };
    }
  },

  validatePassword: function (e) {
    const res = this.testPasswordRegex(e.target.value);
    if (res === true) {
      return {
        valid: e.target.value,
      };
    } else {
      return {
        error: true,
        message: `Must contain: 8 characters, one uppercase, one lowercase, one number and one of: @ $ ! % * ? &`,
      };
    }
  },

  validatePasswordRepeat: function (e, password) {
    if (password === e.target.value) {
      return {
        valid: password,
      };
    } else {
      return {
        error: true,
        message: "Passwords do not match",
      };
    }
  },
};
