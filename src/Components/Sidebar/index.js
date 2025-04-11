import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { TbCircleLetterCFilled, TbCircleLetterHFilled, TbCircleLetterLFilled, TbCircleLetterMFilled, TbCircleLetterPFilled, TbCircleLetterTFilled } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";


const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0)
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const isOpenSubmenu = (index) => {
        setActiveTab(index)
        setIsToggleSubmenu(!isToggleSubmenu)
    }

    const history = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token !== null && token !== '' && token !== undefined) {
            setIsLogin(true)
        } else {
            history("/login")
        }
    }, [])

    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <NavLink exact activeClassName="is-active" to="/">
                            <Button className={`w-100 ${activeTab === 0 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)}>
                                <span className="icon"><MdDashboard /></span>
                                Dashboard
                                <span className="arrow"><FaAngleRight /></span>
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                            <span className="icon"><TbCircleLetterPFilled /></span>
                            Products
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/products">Product List</Link></li>
                                <li><Link to="/product/upload">Product Upload</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                            <span className="icon"><TbCircleLetterCFilled /></span>
                            Category
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/category">Category List</Link></li>
                                <li><Link to="/category/add">Add a category</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 3 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(3)}>
                            <span className="icon"><TbCircleLetterTFilled /></span>
                            Top Material
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/topMaterial">Top Material List</Link></li>
                                <li><Link to="/topMaterial/add">Add a Top Material</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 4 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(4)}>
                            <span className="icon"><TbCircleLetterTFilled /></span>
                            Top Finish
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 4 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/topFinish">Top Finish List</Link></li>
                                <li><Link to="/topFinish/add">Add a Top Finish</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 5 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(5)}>
                            <span className="icon"><TbCircleLetterLFilled /></span>
                            Leg Finish
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 5 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/legFinish">Leg Finish List</Link></li>
                                <li><Link to="/legFinish/add">Add a Leg Finish</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 6 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(6)}>
                            <span className="icon"><TbCircleLetterLFilled /></span>
                            Leg Material
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 6 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/legMaterial">Leg Material List</Link></li>
                                <li><Link to="/legMaterial/add">Add a Leg Material</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 7 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(7)}>
                            <span className="icon"><TbCircleLetterHFilled /></span>
                            Home Page Image
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 7 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/homepageimage">Home Page Image</Link></li>
                                <li><Link to="/homepageimage/add">Add Home Page Image</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 8 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(8)}>
                            <span className="icon"><TbCircleLetterMFilled /></span>
                            Mobile Image
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 8 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/mobileimage">Mobile Image</Link></li>
                                <li><Link to="/mobileimage/add">Add Mobile Image</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <br />

                <div className="logoutWrapper">
                    <div className="logoutBox">
                        <Button variant="contained"><IoMdLogOut /> Logout</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar;