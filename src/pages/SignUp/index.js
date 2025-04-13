import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assests/images/Logo.png"
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import CircularProgress from '@mui/material/CircularProgress';
import { postFeilds } from "../../utils/api";


const SignUp = () => {
    const [inputIndex, setInputIndex] = useState(null)
    const [isShowPassword, setisShowPassword] = useState(false)
    const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [formfields, setFormfields] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        isAdmin: true
    })

    const history = useNavigate()
    const context = useContext(MyContext)

    useEffect(() => {
        context.setisHideSidebarAndHeader(true);

        window.scrollTo(0, 0)
    }, [])

    const focusInput = (index) => {
        setInputIndex(index)
    }

    const onChangeInput = (e) => {
        setFormfields(() => ({
            ...formfields,
            [e.target.name]: e.target.value
        }))
    }
    const signUp = (e) => {
        e.preventDefault();
      
        const { name, email, phone, password, confirmPassword } = formfields;
      
        if (!name || !email || !phone || !password || !confirmPassword) {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please fill in all the fields!"
          });
          return;
        }
      
        if (password !== confirmPassword) {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Passwords do not match!"
          });
          return;
        }
      
        setIsLoading(true);
      
        try {
          postFeilds("/api/user/signup", formfields).then((res) => {
            if (res.error !== true) {
              context.setAlertBox({
                open: true,
                error: false,
                msg: "Registered Successfully!"
              });
              setIsLoading(false);
              history("/login");
            } else {
              setIsLoading(false);
              context.setAlertBox({
                open: true,
                error: true,
                msg: res.msg
              });
              history("/login");
            }
          });
        } catch (error) {
          setIsLoading(false);
          context.setAlertBox({
            open: true,
            error: true,
            msg: "An unexpected error occurred",
          });
          console.log(error);
        }
      };
      

    return (
        <>
            <section className="loginSection signUpSection">
                <div className="row justify-content-center">
                    <div className="col-md-4 pr-0">
                        <div className="loginBox">
                            <div className="logo text-center">
                                <img src={Logo} width="60px" alt="" />
                                <h5 className="font-weight-bold">Register a new account</h5>
                            </div>

                            <div className="wrapper mt-3 card border">
                                <form onSubmit={signUp}>
                                    <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                        <span className="icon"><FaUserCircle /></span>
                                        <input type="text" className="form-control" placeholder="enter your name" onFocus={() => focusInput(0)} onBlur={() => setInputIndex(null)} autoFocus name="name" onChange={onChangeInput} />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                        <span className="icon"><MdMail /></span>
                                        <input type="text" className="form-control" placeholder="enter your email" onFocus={() => focusInput(1)} onBlur={() => setInputIndex(null)} name="email" onChange={onChangeInput} />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 2 && 'focus'}`}>
                                        <span className="icon"><FaPhoneAlt /></span>
                                        <input type="text" className="form-control" placeholder="enter your Phone" onFocus={() => focusInput(2)} onBlur={() => setInputIndex(null)} name="phone" onChange={onChangeInput} />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 3 && 'focus'}`}>
                                        <span className="icon"><RiLockPasswordFill /></span>
                                        <input type={`${isShowPassword === true ? "text" : "password"}`} className="form-control" placeholder="enter your password" onFocus={() => focusInput(3)} onBlur={() => setInputIndex(null)} name="password" onChange={onChangeInput} />

                                        <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)}>
                                            {
                                                isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                            }
                                        </span>
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 4 && 'focus'}`}>
                                        <span className="icon"><IoShieldCheckmarkSharp /></span>
                                        <input type={`${isShowConfirmPassword === true ? "text" : "password"}`} className="form-control" placeholder="confirm your password" onFocus={() => focusInput(4)} onBlur={() => setInputIndex(null)} name="confirmPassword" onChange={onChangeInput} />

                                        <span className="toggleShowPassword" onClick={() => setisShowConfirmPassword(!isShowConfirmPassword)}>
                                            {
                                                isShowConfirmPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                            }
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                                            {
                                                isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Sign Up'
                                            }
                                        </Button>
                                    </div>

                                    <div className="form-group text-center mb-0">
                                        <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                            <span className="line"></span>
                                            <span className="txt">or</span>
                                            <span className="line"></span>
                                        </div>
                                    </div>
                                </form>
                                <span className="text-center d-block mt-2">
                                    already have an account?
                                    <Link to={'/login'} className="link color ml-2">Sign In</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default SignUp;