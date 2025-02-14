import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assests/images/Logo.png"
import patern from "../../assests/images/pattern.webp"
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdHome } from "react-icons/io";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../../assests/images/g.png"
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import { postData } from "../../utils/api";


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

        try {
            if (formfields.name === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Name can not be blank!"
                })
                return false;
            }
            if (formfields.email === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "email can not be blank!"
                })
                return false;
            }
            if (formfields.phone === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "phone can not be blank!"
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
            if (formfields.confirmPassword === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "confirm password can not be blank!"
                })
                return false;
            }

            if (formfields.confirmPassword !== formfields.password) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "password not match"
                })
                return false;
            }

            setIsLoading(true)

            postData("/api/user/signup", formfields).then((res) => {
                if (res.error !== true) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Register Successfully!" 
                    })


                    setTimeout(() => {
                        setIsLoading(false)
                        history("/login")
                    }, 2000)
                } else {
                    setIsLoading(false)
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                }
            })
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            <img src={patern} className="loginPatern" alt="" />
            <section className="loginSection signUpSection">

                <div className="row">
                    <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
                        <h1>Best ux/ui fashion <span className="text-sky">ECOMMERCE DASHBOARD</span> & admin panel</h1>
                        <p>Elit Iusto dolore libero recusandae dolor dolores explicabo ullam cum facilis aperiam alias odio quam excepturi molestiae omnis inventore. Repudiandae officia placeat amet consectetur dicta dolorem quo</p>

                        <div className="w-100 mt-4">
                            <Link to={'/'}>
                                <Button className="btn-blue btn-lg btn-big"><IoMdHome /> Go To Home</Button>
                            </Link>
                        </div>
                    </div>

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

                                    <FormControlLabel control={<Checkbox />} label="I agree to the all Terms & Condiotions" />

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

                                        <Button variant="outlined" className="w-100 btn-lg loginWithGoogle btn-big">
                                            <img src={googleIcon} width="25px" alt="" /> &nbsp; Sign In With Google
                                        </Button>
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