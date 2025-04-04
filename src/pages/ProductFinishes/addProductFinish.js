import { Breadcrumbs, Button, Chip, MenuItem, Select } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { fetchDataFromApi, postData } from "../../utils/api";
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


const AddProductFinish = () => {


    const [productVal, setProductVal] = useState('');
    const [finishVal, setFinishVal] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [formFields, setFormFields] = useState({
        finishId: '',
        images: [],
        productId: ""
    });

    const [files, setFiles] = useState([])
    const [imgFiles, setimgFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [originalUrls, setOriginalUrls] = useState([])
    const [isSelectedFiles, setIsSelectedFiles] = useState(false)
    const [finishData, setFinishData] = useState([])
    const [productData, setProductData] = useState([])

    const history = useNavigate();

    const context = useContext(MyContext)
    const formData = new FormData();

    useEffect(() => {
        window.scrollTo(0, 0)

        fetchDataFromApi('/api/finish').then(res => {
            setFinishData(res)
        })
        fetchDataFromApi('/api/products').then(res => {
            setProductData(res)
        })
    }, [])


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


    const handleChangeProduct = (event) => {
        setProductVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            productId: event.target.value
        }))
    };
    const handleChangeFinish = (event) => {
        setFinishVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            finishId: event.target.value
        }))
    };

    const onchangeFile = async (e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;

            for (let i = 0; i < files.length; i++) {

                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png')) {
                    setimgFiles(files)

                    const file = files[i]
                    imgArr.push(file)
                    formData.append('images', file)
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid JPG or PNG image file."
                    })
                }

            }
            setFiles(imgArr);
            setIsSelectedFiles(true)
            postData(apiEndPoint, formData).then((res) => {
                setOriginalUrls(res);
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "images uploaded!"
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addProductfinish = (e) => {
        e.preventDefault()

        formData.append('finishId', formFields.finishId)
        formData.append('productId', formFields.productId)


        if (formFields.finishId !== "" && formFields.productId !== "" && isSelectedFiles !== false) {
            setIsLoading(true)

            postData('/api/productfinish/create', formFields).then(res => {
                if (res.error !== true) {
                    context.setAlertBox({
                      open: true,
                      msg: "The productfinish is created!",
                      error: false,
                    });
                    setIsLoading(false);
                    history("/productfinish");
                  } else {
                    setIsLoading(false);
                    context.setAlertBox({
                      open: true,
                      error: true,
                      msg: res.msg,
                    });
                    setIsLoading(false);
                    history("/productfinish");
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
                    <h5 className="mb-4">Add Product Finish</h5>
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
                            label="Product Finish"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Add Product Finish"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addProductfinish}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4 mt-0">
                                <h5 className="mb-4">Basic Information</h5>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT NAME</h6>
                                            <Select
                                                value={productVal}
                                                onChange={handleChangeProduct}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    productData?.products?.length !== 0 && productData?.products?.map((item, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={item._id} key={index}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                } 
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT FINISH NAME</h6>
                                            <Select
                                                value={finishVal}
                                                onChange={handleChangeFinish}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    finishData?.finishes?.length !== 0 && finishData?.finishes?.map((item, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={item._id} key={index} >{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
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
                                    <input type="file" multiple onChange={(e) => onchangeFile(e, '/api/productfinish/upload')} name="images" />
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

export default AddProductFinish;