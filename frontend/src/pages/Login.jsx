import { Link } from 'react-router-dom';
import '../css/login.css';

const Login = ({ show1, handleClose1, input, handleInput, userhandleSubmit }) => {
  if (!show1) return null; 

  return (
    <div className="login-modal" onHide={handleClose1}>
      <div className="modal-content" >
        <div className="login-container">
        <button className="close-btn" onClick={handleClose1}>Close</button>

          <div className="form-image">
            <img
              src="https://thumbs.dreamstime.com/b/glass-lemonade-half-lemon-kitchen-table-comic-style-fruit-drink-glass-lemonade-half-lemon-kitchen-300748691.jpg"
              alt="Login"
              className="login-image"
            />
          </div>
          <div className="form-side">
            <h1 className="login-head" align="center">Login</h1>
            <form className="login-form" onSubmit={userhandleSubmit}>
              <input
                type="email"
                name="email"
                value={input.email || ''}
                onChange={handleInput}
                placeholder="Enter Email"
                required
              />
              <input
                type="password"
                name="password"
                value={input.password || ''}
                onChange={handleInput}
                placeholder="Enter Password"
                required
              />
              <button type="submit">Submit</button>
            </form>
            <h4 className='register'>Don't have an account? <Link to="/registration" onClick={() => handleClose1()}>Register Here</Link></h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
