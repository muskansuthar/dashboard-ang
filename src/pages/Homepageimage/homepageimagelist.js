import { Breadcrumbs, Button, Chip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


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


const Homepageimage = () => {

    const [homepageimage, setHomepageimage] = useState([])

    const context = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)

        context.setProgress(20)

        fetchDataFromApi('/api/homepageimg').then(res => {
            setHomepageimage(res)
            context.setProgress(100)
        })
    }, [])

      const deleteHomeImg = (id) => {
                context.setProgress(40)
                deleteData(`/api/homepageimg/${id}`).then(() => {
                    context.setProgress(100)
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: 'Home page image Deleted!'
                    })
                    fetchDataFromApi('/api/homepageimg').then(res => {
                        setHomepageimage(res)
                    });
                }).catch(err => {
                    console.error("Error deleting Home page image", err);
                });
            };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Home Page Image</h5>
                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Home Page Image"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/homepageimage/add"><Button className="btn-blue ml-3 pl-3 pr-3">Add Home Page Image</Button></Link>
                    </div>
                </div>



                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>IMAGE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    homepageimage?.data?.length > 0 ? homepageimage?.data?.map((item, index) =>
                                    (
                                        <React.Fragment key={item._id}>
                                            <tr>
                                                <td>
                                                    <img
                                                        src={`${context.baseUrl}/uploads/${item.images[0]}`}
                                                        className="w-100"
                                                        alt="Home Page Image"
                                                        style={{ maxWidth: "80px" }}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to={`/homepageimage/edit/${item._id}`}>
                                                            <Button className="success" color="success">
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Link>
                                                        <div className="actions d-flex align-items-center">
                                                            <Button className="error" color="error" onClick={() => deleteHomeImg(item._id)}><MdDelete /></Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No Home Page Image Found</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepageimage;