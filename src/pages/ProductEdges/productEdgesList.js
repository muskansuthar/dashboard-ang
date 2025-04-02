import { Breadcrumbs, Button, Chip, Collapse } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

//breadcrump code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});


const ProductEdges = () => {

    const [productedgeData, setProductedgeData] = useState([])
    const [openDropdown, setOpenDropdown] = useState({});

    const context = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)

        context.setProgress(20)

        fetchDataFromApi('/api/productedge').then(res => {
            setProductedgeData(res?.productEdges || [])
            context.setProgress(100)
        })
    }, [])

    const toggleDropdown = (productId) => {
        setOpenDropdown((prev) => ({ ...prev, [productId]: !prev[productId] }));
    };

    const deleteEdge = (productId, edgeId) => {
        deleteData(`/api/productedge/${productId}/${edgeId}`).then(() => {
            context.setAlertBox({ open: true, error: true, msg: "Edge Deleted!" });
            fetchDataFromApi('/api/productedge').then(res => setProductedgeData(res?.productEdges || []));
        }).catch(err => console.error("Error deleting Edge:", err));
    };

    const deleteProductedge = (productId) => {
        context.setProgress(40)
        deleteData(`/api/productedge/${productId}`).then(() => {
            context.setProgress(100)
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'productedge Deleted!'
            })
            fetchDataFromApi('/api/productedge').then(res => {
                setProductedgeData(res?.productEdges || []);
            });
        }).catch(err => {
            console.error("Error deleting productedge:", err);
        });
    };

    // const handleChange = (event, value) => {
    //     context.setProgress(40)
    //     fetchDataFromApi(`/api/category?page=${value}`).then(res => {
    //         setCatData(res)
    //         context.setProgress(100)
    //     });
    // }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Product Edge List</h5>
                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Product Edge"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/productEdge/add"><Button className="btn-blue ml-3 pl-3 pr-3">Add Product Edge</Button></Link>
                    </div>
                </div>



                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>EDGES</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productedgeData?.length > 0 ? productedgeData.map((item, index) =>
                                    (
                                        <React.Fragment key={item._id}>
                                            <tr>
                                                <td>{item.productId?.name}</td>
                                                <td>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => toggleDropdown(item._id)}
                                                        style={{ textTransform: "none" }}
                                                    >
                                                        {openDropdown[item._id] ? "Hide Edges" : "Show Edges"}
                                                    </Button>

                                                    <Collapse in={openDropdown[item._id]}>
                                                        <table className="table table-bordered mt-2">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th>IMAGE</th>
                                                                    <th>EDGE NAME</th>
                                                                    <th>ACTION</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item.edges.map((edge) => (
                                                                    <tr key={edge._id}>
                                                                        <td>
                                                                            <img
                                                                                src={`${context.baseUrl}/uploads/${edge.images[0]}`}
                                                                                className="w-100"
                                                                                alt="Edge Image"
                                                                                style={{ maxWidth: "80px" }}
                                                                            />
                                                                        </td>
                                                                        <td>{edge.name?.name}</td>
                                                                        <td>
                                                                            <div className="actions d-flex align-items-center">
                                                                                <Button
                                                                                className="error"
                                                                                    color="error"
                                                                                    onClick={() => deleteEdge(item.productId._id, edge.name._id)}
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
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Button className="error" color="error" onClick={() => deleteProductedge(item.productId._id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No Product Edges Found</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        {/* {
                            catData?.totalPages > 1 &&
                            <div className="d-flex tableFooter">
                                <Pagination count={catData?.totalPages} color="primary" className="pagination"
                                    showFirstButton showLastButton onChange={handleChange} />
                            </div>
                        } */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEdges;