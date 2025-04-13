import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assests/images/Logo.png"
import patern from "../../assests/images/pattern.webp"
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { postFeilds } from "../../utils/api";


const Login = () => {
    const [inputIndex, setInputIndex] = useState(null)
    const [isShowPassword, setisShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [formfields, setFormfields] = useState({
        email: "",
        password: "",
        isAdmin: true
    })

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
    const signIn = (e) => {
        e.preventDefault();
      
        const { email, password } = formfields;
      
        if (!email || !password) {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please enter both email and password!"
          });
          return;
        }
      
        setIsLoading(true);
      
        try {
          postFeilds("/api/user/signin", formfields).then((res) => {
            console.log("Response received:", res);
      
            if (res.error !== true) {
              localStorage.setItem("token", res.token);
      
              const user = {
                userId: res.user?._id,
                name: res.user?.name,
                email: res.user?.email
              };
      
              localStorage.setItem("user", JSON.stringify(user));
      
              context.setAlertBox({
                open: true,
                error: false,
                msg: "User logged in successfully!"
              });
      
              setTimeout(() => {
                setIsLoading(false);
                window.location.href = "/";
              }, 2000);
            } else {
              setIsLoading(false);
              context.setAlertBox({
                open: true,
                error: true,
                msg: res.msg
              });
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
            <img src={patern} className="loginPatern" alt="" />
            <section className="loginSection">
                <div className="loginBox">
                    <div className="logo text-center">
                        <img src={Logo} width="60px" alt="" />
                        <h5 className="font-weight-bold">Login to Dashboard</h5>
                    </div>

                    <div className="wrapper mt-3 card border">
                        <form onSubmit={signIn}>
                            <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                <span className="icon"><MdMail /></span>
                                <input type="text" className="form-control" placeholder="enter your email" onFocus={() => focusInput(0)} onBlur={() => setInputIndex(null)} autoFocus name="email" onChange={onChangeInput} />
                            </div>
                            <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                <span className="icon"><RiLockPasswordFill /></span>
                                <input type={`${isShowPassword === true ? "text" : "password"}`} className="form-control" placeholder="enter your password" onFocus={() => focusInput(1)} onBlur={() => setInputIndex(null)} name="password" onChange={onChangeInput} />

                                <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)}>
                                    {
                                        isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                    }
                                </span>
                            </div>

                            <div className="form-group">
                                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                                    {
                                        isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Sign In'
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
                    </div>
                    <div className="wrapper mt-3 card border footer p-3">
                        <span className="text-center">
                            Don't have an account?
                            <Link to={'/signUp'} className="link color ml-2">Register</Link>
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;