import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaClipboardCheck, FaProductHunt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
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
                            <span className="icon"><FaProductHunt /></span>
                            Products
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/products">Product List</Link></li>
                                <li><Link to="/product/details">Product View</Link></li>
                                <li><Link to="/product/upload">Product Upload</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                            <span className="icon"><FaProductHunt /></span>
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
                            <span className="icon"><FaProductHunt /></span>
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
                            <span className="icon"><FaProductHunt /></span>
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
                            <span className="icon"><FaProductHunt /></span>
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
                            <span className="icon"><FaProductHunt /></span>
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
                            <span className="icon"><FaProductHunt /></span>
                            Top
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 7 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/top">Top List</Link></li>
                                <li><Link to="/top/add">Add a Top</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 8 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(8)}>
                            <span className="icon"><FaProductHunt /></span>
                            Edge
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 8 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/edge">Edge List</Link></li>
                                <li><Link to="/edge/add">Add a Edge</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 9 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(9)}>
                            <span className="icon"><FaProductHunt /></span>
                            Finish
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 9 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/finish">Finish List</Link></li>
                                <li><Link to="/finish/add">Add a Finish</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 10 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(10)}>
                            <span className="icon"><FaProductHunt /></span>
                            Product Top
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 10 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/productTop">Product Top List</Link></li>
                                <li><Link to="/productTop/add">Add Product Top</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 11 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(11)}>
                            <span className="icon"><FaProductHunt /></span>
                            Product Edge
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 11 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/productEdge">Product Edge List</Link></li>
                                <li><Link to="/productEdge/add">Add Product Edge</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 12 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(12)}>
                            <span className="icon"><FaProductHunt /></span>
                            Product Finish
                            <span className="arrow"><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 12 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/productFinish">Product Finish List</Link></li>
                                <li><Link to="/productFinish/add">Add Product Finish</Link></li>
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