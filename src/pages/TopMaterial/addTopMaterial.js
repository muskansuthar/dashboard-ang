import { Breadcrumbs, Button, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useState } from "react";
import { postFeilds } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";


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


const AddTopMaterial = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [formFields, setFormFields] = useState({
        name: ''
    });

    const history = useNavigate();

    const context = useContext(MyContext)
    const formData = new FormData();

    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))

    }

    const addTopmaterial = (e) => {
        e.preventDefault()

        formData.append('name', formFields.name)

        if (formFields.name !== "") {
            setIsLoading(true)

            postFeilds('/api/topmaterial/create', formFields).then(res => {
                if (res.error !== true) {
                    context.setAlertBox({
                        open: true,
                        msg: 'The topmaterial is created!',
                        error: false
                    })
                    setIsLoading(false)
                    history('/topmaterial')
                } else {
                    setIsLoading(false)
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                    setIsLoading(false)
                    history('/topmaterial')
                }
            })
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            })
            return false;
        }
    }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 mt-2 res-col">
                    <h5 className="mb-4">Add Top Material</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Top Material"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Add Top Material"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addTopmaterial}>
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="card p-4 mt-0">
                                <div className="form-group">
                                    <h6>Top Material Name</h6>
                                    <input type="text" name="name" value={formFields.name} onChange={changeInput} />
                                </div>

                                <Button type="submit" className="btn-blue btn-lg btn-big w-100">{isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'ADD'}</Button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddTopMaterial;