import { Breadcrumbs, Button, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { postData } from "../../utils/api";
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


const AddHomepageimage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [imgFiles, setimgFiles] = useState([])
    const [previews, setPreviews] = useState([])

    const history = useNavigate();

    const context = useContext(MyContext)

    // for upload imges in local folder with multer
    useEffect(() => {
        if (!imgFiles) return;

        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]))
        }

        const objectUrls = tmp;
        setPreviews(objectUrls)

        for (let i = 0; i < objectUrls.length; i++) {
            return () => {
                URL.revokeObjectURL(objectUrls[i])
            }
        }
    }, [imgFiles])

    const onchangeFile = async (e) => {
        try {
            const imgArr = [];
            const files = e.target.files;

            for (let i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png')) {
                    setimgFiles(files)
                    imgArr.push(files[i]);
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid JPG or PNG image file."
                    });
                    return;
                }
            }
            setFiles(imgArr);
        } catch (error) {
            console.log(error);
        }
    };

    const addHomepageimage = async (e) => {
        e.preventDefault();

        if (!files.length) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details and select at least one image'
            });
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            // Append all images
            files.forEach((file) => {
                formData.append('images', file);
            });
            postData("/api/homepageimg/create", formData).then((res) => {
                if (res.error !== true) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "The Home Page Image is created!"
                    })
                    setIsLoading(false)
                    history("/homepageimage")
                } else {
                    setIsLoading(false)
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                    setIsLoading(false)
                    history("/homepageimage")
                }
            })
        } catch (error) {
            setIsLoading(false);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "An unexpected error occurred",
            });
        }
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 mt-2 res-col">
                    <h5 className="mb-4">Add Home Page Image</h5>
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
                            label="Home Page Image"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Add Home Page Image"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addHomepageimage}>
                    <div className="card p-4 mt-0">
                        <div className="imagesUploadSec">
                            <h5 className="mb-4">Media And Pubblished</h5>

                            <div className="imgUploadBox d-flex align-items-center">

                                {
                                    previews?.length !== 0 && previews?.map((img, index) => {
                                        return (
                                            <div className="uploadBox" key={index}>
                                                <img src={img} className="w-100" alt="" />
                                            </div>
                                        )
                                    })
                                }

                                <div className="uploadBox">
                                    <input type="file" multiple onChange={(e) => onchangeFile(e)} name="images" />
                                    <div className="info">
                                        <FaRegImages />
                                        <h5>image upload</h5>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <Button type="submit" className="btn-blue btn-lg btn-big w-100"><FaCloudUploadAlt /> &nbsp;{isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}</Button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AddHomepageimage;