import { Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assests/images/Logo.png'
import SearchBox from "../SearchBox";
import { Logout } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { MyContext } from "../../App";


const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null)

    const openMyAcc = Boolean(anchorEl)

    const history = useNavigate()
    const context = useContext(MyContext)

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null)
    }

    const logout = () => {
        localStorage.clear();

        setAnchorEl(null)

        context.setAlertBox({
            open:true,
            error:false,
            msg:"User logout Successfully!"
        })

        setTimeout(() => {
            history('/Login')
        }, 2000)
    }

    return (
        <>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">
                        {/* Logo Wrapper */}
                        <div className="col-sm-2 part1">
                            <Link to={'/'} className="d-flex align-items-center logo">
                                <img src={logo} alt="" />
                                <span className="ml-2">ANGIRA</span>
                            </Link>
                        </div>

                        {
                            context.windowWidth > 992 &&
                            <div className="col-sm-6 d-flex align-items-center part2 res-hide">
                                <Button className="rounded-circle mr-3" onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                    {
                                        context.isToggleSidebar === false ? <MdMenuOpen /> : <MdOutlineMenu />
                                    }
                                </Button>
                                <SearchBox />
                            </div>
                        }


                        <div className="col-sm-4 d-flex align-items-center justify-content-end part3">
                            {
                                context.isLogin !== true ?
                                    <Link to={'/login'}>
                                        <Button className="btn-blue btn-lg btn-round">Sign In</Button>
                                    </Link>
                                    :
                                    <div className="myAccWrapper">
                                        <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAccDrop}>
                                            <div className="userImg">
                                                <span className="rounded-circle">
                                                    {context.user?.name?.charAt(0)}
                                                </span>
                                            </div>

                                            <div className="userInfo res-hide">
                                                <h4>{context.user?.name}</h4>
                                                <p className="mb-0">{context.user?.email}</p>
                                            </div>
                                        </Button>

                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={openMyAcc}
                                            onClose={handleCloseMyAccDrop}
                                            onClick={handleCloseMyAccDrop}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={logout} >
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;