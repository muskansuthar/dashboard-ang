import { Button, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { MdMenuOpen, MdOutlineLightMode, MdOutlineMailOutline, MdDarkMode } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assests/images/Logo.png'
import SearchBox from "../SearchBox";
import { IoCartOutline, IoMenu, IoShieldHalfSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { Logout, PersonAdd } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import UserAvatarImgComponent from "../UserAvatarImg";


const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false)

    const openMyAcc = Boolean(anchorEl)
    const openNotifications = Boolean(isOpennotificationDrop)

    const history = useNavigate()
    const context = useContext(MyContext)

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null)
    }
    const handleOpennotificationsDrop = () => {
        setisOpennotificationDrop(true)
    }
    const handleClosenotificationsDrop = () => {
        setisOpennotificationDrop(false)
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
                                <span className="ml-2">HOTASH</span>
                            </Link>
                        </div>

                        {
                            context.windowWidth > 992 &&
                            <div className="col-sm-3 d-flex align-items-center part2 res-hide">
                                <Button className="rounded-circle mr-3" onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                    {
                                        context.isToggleSidebar === false ? <MdMenuOpen /> : <MdOutlineMenu />
                                    }
                                </Button>
                                <SearchBox />
                            </div>
                        }


                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                            <Button className="rounded-circle mr-3" onClick={() => context.setThemeMode(!context.themeMode)}><MdOutlineLightMode /></Button>

                            {/* <Button className="rounded-circle mr-3"><IoCartOutline /></Button> */}
                            {/* <Button className="rounded-circle mr-3"><MdOutlineMailOutline /></Button> */}

                            <div className="dropdownWrapper position-relative">
                                <Button className="rounded-circle mr-3" onClick={handleOpennotificationsDrop}><FaRegBell /></Button>
                                <Button className="rounded-circle mr-3" onClick={() => context.openNav()}><IoMenu /></Button>
                                <Menu
                                    isOpennotificationDrop={isOpennotificationDrop}
                                    className="notifications dropdown_list"
                                    id="notifications"
                                    open={openNotifications}
                                    onClose={handleClosenotificationsDrop}
                                    onClick={handleClosenotificationsDrop}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className="head pl-3 pb-0">
                                        <h4>Orders (12) </h4>
                                    </div>
                                    <Divider className="mb-1" />
                                    <div className="scroll">
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className="d-flex">
                                                <div>
                                                    <div className="userImg">
                                                        <span className="rounded-circle">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" alt="" />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dropdownInfo">
                                                    <h4>
                                                        <span>
                                                            <b>Manish </b>
                                                            added to this favorite list
                                                            <b>Leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className="text-sky mb-0">few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className="d-flex">
                                                <div>
                                                    <UserAvatarImgComponent img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" />
                                                </div>

                                                <div className="dropdownInfo">
                                                    <h4>
                                                        <span>
                                                            <b>Manish </b>
                                                            added to this favorite list
                                                            <b>Leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className="text-sky mb-0">few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className="d-flex">
                                                <div>
                                                    <div className="userImg">
                                                        <span className="rounded-circle">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" alt="" />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dropdownInfo">
                                                    <h4>
                                                        <span>
                                                            <b>Manish </b>
                                                            added to this favorite list
                                                            <b>Leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className="text-sky mb-0">few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className="d-flex">
                                                <div>
                                                    <div className="userImg">
                                                        <span className="rounded-circle">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" alt="" />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dropdownInfo">
                                                    <h4>
                                                        <span>
                                                            <b>Manish </b>
                                                            added to this favorite list
                                                            <b>Leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className="text-sky mb-0">few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className="d-flex">
                                                <div>
                                                    <div className="userImg">
                                                        <span className="rounded-circle">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" alt="" />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dropdownInfo">
                                                    <h4>
                                                        <span>
                                                            <b>Manish </b>
                                                            added to this favorite list
                                                            <b>Leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className="text-sky mb-0">few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <div className="d-flex">
                                                <div>
                                                    <div className="userImg">
                                                        <span className="rounded-circle">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" alt="" />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dropdownInfo">
                                                    <h4>
                                                        <span>
                                                            <b>Manish </b>
                                                            added to this favorite list
                                                            <b>Leather belt steve madden</b>
                                                        </span>
                                                    </h4>
                                                    <p className="text-sky mb-0">few seconds ago</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                    </div>

                                    <div className="pl-3 pr-3 w-100 pt-2 pb-1">
                                        <Button className="btn-blue w-100">View all notifications</Button>
                                    </div>
                                </Menu>
                            </div>

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
                                            <MenuItem onClick={handleCloseMyAccDrop}>
                                                <ListItemIcon>
                                                    <PersonAdd fontSize="small" />
                                                </ListItemIcon>
                                                My Account
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseMyAccDrop}>
                                                <ListItemIcon>
                                                    <IoShieldHalfSharp />
                                                </ListItemIcon>
                                                Reset Password
                                            </MenuItem>
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