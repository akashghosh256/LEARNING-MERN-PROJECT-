import React from 'react'
// import signpic from "../components/images/bluebird.jpg"
const Signup = () => {
  return (
    <>
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number:</label>
              <input type="tel" className="form-control" id="mobile" placeholder="Enter your mobile number" required />
            </div>

            <div className="form-group">
              <label htmlFor="profession">Profession:</label>
              <input type="text" className="form-control" id="profession" placeholder="Enter your profession" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" required />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Signup