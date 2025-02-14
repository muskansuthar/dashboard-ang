import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assests/images/Logo.png"
import patern from "../../assests/images/pattern.webp"
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import googleIcon from "../../assests/images/g.png"
import { postData } from "../../utils/api";


const Login = () => {
    const [inputIndex, setInputIndex] = useState(null)
    const [isShowPassword, setisShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [formfields, setFormfields] = useState({
        email: "",
        password: "",
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
    const signIn = (e) => {
        e.preventDefault();

        if (formfields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "email can not be blank!"
            })
            return false;
        }
        if (formfields.password === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "password can not be blank!"
            })
            return false;
        }

        setIsLoading(true)
        postData("/api/user/signin", formfields).then((res) => {
            console.log("Response received:", res);
            try {

                if (res.error !== true) {
                    localStorage.setItem("token", res.token);

                    const user = {
                        userId: res.user?._id,
                        name: res.user?.name,
                        email: res.user?.email
                    }

                    localStorage.setItem("user", JSON.stringify(user));

                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "User login Successfully!"
                    })

                    setTimeout(() => {
                        setIsLoading(false)
                        // history("/")
                        window.location.href = "/"
                    }, 2000)
                } else {
                    setIsLoading(false)
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                }

            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        })
    }

    return (
        <>
            <img src={patern} className="loginPatern" alt="" />
            <section className="loginSection">
                <div className="loginBox">
                    <div className="logo text-center">
                        <img src={Logo} width="60px" alt="" />
                        <h5 className="font-weight-bold">Login to Hotash</h5>
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
                                <Link to={'/forgot-password'} className="link">FORGOT PASSWORD</Link>

                                <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                    <span className="line"></span>
                                    <span className="txt">or</span>
                                    <span className="line"></span>
                                </div>

                                <Button variant="outlined" className="w-100 btn-lg loginWithGoogle btn-big">
                                    <img src={googleIcon} width="25px" alt="" /> &nbsp; Sign In With Google
                                </Button>
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