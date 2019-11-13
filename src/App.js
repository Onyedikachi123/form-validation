import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
 
const formValid =  ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach( val => { 
    val.length > 0 && (valid = false)
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    
    if (formValid(this.state)) {
      alert(`
         --SUBMITTING--
         First Name: ${this.state.firstName}
         Last Name: ${this.state.lastName}
         email: ${this.state.email}
         password: ${this.state.password}
      `);
    } else {
      alert("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }; 

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
         value.length < 3  
         ? "mininum 3 characters required"
        : "";
        break;

        case "lastName":
            formErrors.lastName =
             value.length < 3  
             ?"mininum 3 characters required"
            : "";
        break;
        
        case "email":
            formErrors.email =
            emailRegex.test(value)  
            ?""
            : "invalid email address"
        break;

        case "password":
           formErrors.password =
           value.length < 6  
            ?"mininum 3 characters required"
           : "";
        break;
        default:
          break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  


  render() { 
   const { formErrors } = this.state;

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
           <form onSubmit={this.handleSubmit} noValidate>
               <div className="firstName">
                 <label htmlFor="firstName">First Name</label>
                 <input 
                 type="text" 
                 className={formErrors.firstName.length > 0 ? "error" : null}
                 placeholder="First Name" 
                 name="firstName" 
                 noValidate
                 onChange={this.handleChange}
                 />
                 {formErrors.firstName.length > 0 && (
                   <span className="errorMessage">{formErrors.firstName}</span>
                 )}
               </div>
               <div className="lastName">
                 <label htmlFor="lastName">Last Name</label>
                 <input 
                 type="text" 
                 className={formErrors.lastName.length > 0 ? "error" : null} 
                 placeholder="Last Name" 
                 name="lastName" 
                 noValidate
                 onChange={this.handleChange}
                 />
                {formErrors.lastName.length > 0 && (
                   <span className="errorMessage">{formErrors.lastName}</span>
                 )}
               </div>
               <div className="email">
                 <label htmlFor="email">Email</label>
                 <input 
                 type="email" 
                 className={formErrors.email.length > 0 ? "error" : null}
                 placeholder="Email" 
                 name="email" 
                 noValidate
                 onChange={this.handleChange}
                 />
                {formErrors.email.length > 0 && (
                   <span className="errorMessage">{formErrors.email}</span>
                 )}
               </div>
               <div className="password">
                 <label htmlFor="password">Password</label>
                 <input 
                 type="password" 
                 className={formErrors.password.length > 0 ? "error" : null} 
                 placeholder="Password" 
                 name="password" 
                 noValidate
                 onChange={this.handleChange}
                 />
                 {formErrors.password.length > 0 && (
                   <span className="errorMessage">{formErrors.password}</span>
                 )}
               </div>
               <div className="createAccount">
                 <button type="submit">Create Account</button>
                 <small>Aleady Have an Account?</small>
               </div>
           </form>
      </div>
    </div>
  );
 }
}

export default App;
