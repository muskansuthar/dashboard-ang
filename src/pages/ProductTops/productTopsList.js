import { Breadcrumbs, Button, Chip, Collapse } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

// Breadcrumb style
const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
        backgroundColor: emphasize(theme.palette.grey[100], 0.06),
    },
    "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[100], 0.12),
    },
}));

const ProductTops = () => {
    const [producttopData, setProducttopData] = useState([]);
    const [openDropdown, setOpenDropdown] = useState({}); // Track dropdown state for each product

    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi("/api/producttop").then((res) => {
            setProducttopData(res?.producttops || []);
            context.setProgress(100);
        });
    }, []);

    const toggleDropdown = (productId) => {
        setOpenDropdown((prev) => ({ ...prev, [productId]: !prev[productId] }));
    };

    const deleteTop = (productId, topId) => {
        deleteData(`/api/producttop/${productId}/${topId}`)
            .then(() => {
                context.setAlertBox({ open: true, error: true, msg: "Top Deleted!" });
                fetchDataFromApi("/api/producttop").then((res) =>
                    setProducttopData(res?.producttops || [])
                );
            })
            .catch((err) => console.error("Error deleting Top:", err));
    };

    const deleteProducttop = (productId) => {
        deleteData(`/api/producttop/${productId}`)
            .then(() => {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "ProductTop Deleted!",
                });
                fetchDataFromApi("/api/producttop").then((res) =>
                    setProducttopData(res?.producttops || [])
                );
            })
            .catch((err) => console.error("Error deleting ProductTop:", err));
    };

    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">Product Top List</h5>
                <div className="ml-auto d-flex align-items-center">
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Product Top"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                    <Link to="/productTop/add">
                        <Button className="btn-blue ml-3 pl-3 pr-3">Add Product Top</Button>
                    </Link>
                </div>
            </div>

            <div className="card shadow border-0 p-3 mt-4">
                <div className="table-responsive mt-3">
                    <table className="table table-bordered v-align">
                        <thead className="thead-dark">
                            <tr>
                                <th>PRODUCT</th>
                                <th>TOPS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producttopData.length > 0 ? (
                                producttopData.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <tr>
                                            {/* Product Name */}
                                            <td>{item.productId?.name}</td>

                                            {/* Dropdown for Tops */}
                                            <td>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => toggleDropdown(item._id)}
                                                    style={{ textTransform: "none" }}
                                                >
                                                    {openDropdown[item._id] ? "Hide Tops" : "Show Tops"}
                                                </Button>

                                                <Collapse in={openDropdown[item._id]}>
                                                    <table className="table table-bordered mt-2">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>IMAGE</th>
                                                                <th>TOP NAME</th>
                                                                <th>ACTION</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {item.tops.map((top) => (
                                                                <tr key={top._id}>
                                                                    <td>
                                                                        <img
                                                                            src={`${context.baseUrl}/uploads/${top.images[0]}`}
                                                                            className="w-100"
                                                                            alt="Top Image"
                                                                            style={{ maxWidth: "80px" }}
                                                                        />
                                                                    </td>
                                                                    <td>{top.name?.name}</td>
                                                                    <td>
                                                                        <div className="actions d-flex align-items-center">
                                                                            <Button
                                                                            className="error"
                                                                                color="error"
                                                                                onClick={() =>
                                                                                    deleteTop(
                                                                                        item.productId._id,
                                                                                        top.name._id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <MdDelete />
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </Collapse>
                                            </td>

                                            {/* Delete Product from ProductTop Table */}
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Button
                                                    className="error"
                                                        color="error"
                                                        onClick={() => deleteProducttop(item.productId._id)}
                                                    >
                                                        <MdDelete />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No Product Tops Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductTops;

// import { Breadcrumbs, Button, Chip, Pagination } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import { Link } from "react-router-dom";

// import { emphasize, styled } from '@mui/material/styles';
// import HomeIcon from "@mui/icons-material/Home";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { MyContext } from "../../App";
// import { deleteData, fetchDataFromApi } from "../../utils/api";

// //breadcrump code
// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//     const backgroundColor =
//         theme.palette.mode === 'light'
//             ? theme.palette.grey[100]
//             : theme.palette.grey[800];
//     return {
//         backgroundColor,
//         height: theme.spacing(3),
//         color: theme.palette.text.primary,
//         fontWeight: theme.typography.fontWeightRegular,
//         '&:hover, &:focus': {
//             backgroundColor: emphasize(backgroundColor, 0.06),
//         },
//         '&:active': {
//             boxShadow: theme.shadows[1],
//             backgroundColor: emphasize(backgroundColor, 0.12),
//         },
//     };
// });

// const ProductTops = () => {

//     const [producttopData, setProducttopData] = useState([])

//     const context = useContext(MyContext)

//     useEffect(() => {
//         window.scrollTo(0, 0)

//         context.setProgress(20)

//         fetchDataFromApi('/api/producttop').then(res => {
//             setProducttopData(res)
//             context.setProgress(100)
//         })
//     }, [])

//     const deleteProducttop = (id) => {
//         context.setProgress(40)
//         deleteData(`/api/producttop/${id}`).then(() => {
//             context.setProgress(100)
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: 'Producttop Deleted!'
//             })
//             fetchDataFromApi('/api/producttop').then(res => {
//                 setProducttopData(res);
//             });
//         }).catch(err => {
//             console.error("Error deleting Producttop:", err);
//         });
//     };

//     // const handleChange = (event, value) => {
//     //     context.setProgress(40)
//     //     fetchDataFromApi(`/api/category?page=${value}`).then(res => {
//     //         setCatData(res)
//     //         context.setProgress(100)
//     //     });
//     // }

//     return (
//         <>
//             <div className="right-content w-100">
//                 <div className="card shadow border-0 w-100 flex-row p-4">
//                     <h5 className="mb-0">Product Top List</h5>
//                     <div className="ml-auto d-flex align-items-center">
//                         <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
//                             <StyledBreadcrumb
//                                 component="a"
//                                 href="#"
//                                 label="Dashboard"
//                                 icon={<HomeIcon fontSize="small" />}
//                             />
//                             <StyledBreadcrumb
//                                 label="Product Top"
//                                 deleteIcon={<ExpandMoreIcon />}
//                             />
//                         </Breadcrumbs>

//                         <Link to="/productTop/add"><Button className="btn-blue ml-3 pl-3 pr-3">Add Product Top</Button></Link>
//                     </div>
//                 </div>

//                 <div className="card shadow border-0 p-3 mt-4">
//                     <div className="table-responsive mt-3">
//                         <table className="table table-bordered v-align">
//                             <thead className="thead-dark">
//                                 <tr>
//                                     <th style={{ width: '100px' }}>IMAGE</th>
//                                     <th>PRODUCT</th>
//                                     <th>TOP</th>
//                                     <th>ACTION</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     producttopData?.producttops?.length !== 0 && producttopData?.producttops?.map((item, index) => {
//                                         return (
//                                             <tr key={index}>
//                                                 <td>
//                                                     <div className="d-flex align-items-center productBox">
//                                                         <div className="imgWrapper">
//                                                             <div className="img card shadow m-0">
//                                                                 <img src={`${context.baseUrl}/uploads/${item.images[0]}`} className="w-100" alt="" />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>{item.productId.name}</td>
//                                                 <td>{item.name.name}</td>
//                                                 <td>
//                                                     <div className="actions d-flex align-items-center">
//                                                         <Button className="error" color="error" onClick={() => deleteProducttop(item._id)}><MdDelete /></Button>
//                                                     </div>
//                                                 </td>
//                                             </tr>

//                                         )
//                                     })
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ProductTops;
