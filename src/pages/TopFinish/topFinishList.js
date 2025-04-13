import { Breadcrumbs, Button, Chip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

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


const TopFinish = () => {

    const [topfinishData, setTopfinishData] = useState([])

    const context = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)

        context.setProgress(20)

        fetchDataFromApi('/api/topfinish').then(res => {
            setTopfinishData(res)
            context.setProgress(100)
        })
    }, [])


    const deleteTopFinish = (id) => {
        context.setProgress(40)
        deleteData(`/api/topfinish/${id}`).then(() => {
            context.setProgress(100)
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'topfinish Deleted!'
            })
            fetchDataFromApi('/api/topfinish').then(res => {
                setTopfinishData(res);
            });
        }).catch(err => {
            console.error("Error deleting topfinish:", err);
        });
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Top Finish List</h5>
                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Top Finish"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/topFinish/add"><Button className="btn-blue ml-3 pl-3 pr-3">Add Top Finish</Button></Link>
                    </div>
                </div>



                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>TOP FINISH</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    topfinishData?.topFinishes?.length !== 0 && topfinishData?.topFinishes?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Button className="error" color="error" onClick={() => deleteTopFinish(item._id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopFinish;