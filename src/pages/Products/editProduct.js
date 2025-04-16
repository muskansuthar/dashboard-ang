import { Breadcrumbs, Button, Chip, MenuItem, Select, CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";



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


const EditProduct = () => {

    const [categoryVal, setcategoryVal] = useState('');
    const [legfinishVal, setLegfinishVal] = useState('');
    const [legmaterialVal, setLegmaterialVal] = useState('');
    const [topmaterialVal, setTopmaterialVal] = useState('');
    const [topfinishVal, setTopfinishVal] = useState('');
    const [isFeaturedValue, setIsFeaturedValue] = useState('');
    const [catData, setCatData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [imgFiles, setimgFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [files, setFiles] = useState([])
    const [isSelectedFiles, setIsSelectedFiles] = useState(false)

    const [legfinishData, setLegfinishData] = useState([])
    const [legmaterialData, setLegmaterialData] = useState([])
    const [topfinishData, setTopfinishData] = useState([])
    const [topmaterialData, setTopmaterialData] = useState([])

    const [formFields, setFormFields] = useState({
        name: '',
        category: '',
        legfinish: '',
        legmaterial: '',
        topfinish: '',
        topmaterial: '',
        height: '',
        width: '',
        length: '',
        cbm: "",
        code: "",
        isFeatured: null,
    });


    let { id } = useParams();
    const history = useNavigate();
    const context = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)
        setCatData(context.catData)
    }, [context.catData])

    useEffect(() => {
        window.scrollTo(0, 0)

        fetchDataFromApi('/api/legfinish').then(res => {
            setLegfinishData(res)
        })
        fetchDataFromApi('/api/legmaterial').then(res => {
            setLegmaterialData(res)
        })
        fetchDataFromApi('/api/topfinish').then(res => {
            setTopfinishData(res)
        })
        fetchDataFromApi('/api/topmaterial').then(res => {
            setTopmaterialData(res);
        });
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)

        context.setProgress(20)
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setFormFields({
                name: res.name || '',
                height: res.height || '',
                cbm: res.cbm || '',
                code: res.code || '',
                width: res.width || '',
                length: res.length || '',
                category: res.category?.name || '',
                legfinish: res.legfinish?.name || '',
                legmaterial: res.legmaterial?.name || '',
                topfinish: res.topfinish?.name || '',
                topmaterial: res.topmaterial?.name || '',
                isFeatured: res.isFeatured !== undefined ? res.isFeatured : '',
            })

            setcategoryVal(res.category?._id || '')
            setLegfinishVal(res.legfinish?._id || '')
            setLegmaterialVal(res.legmaterial?._id || '')
            setTopfinishVal(res.topfinish?._id || '')
            setTopmaterialVal(res.topmaterial?._id || '')
            setIsFeaturedValue(res.isFeatured !== undefined ? res.isFeatured : '')
            setPreviews(res.images || [])
            context.setProgress(100)
        })
    }, [])

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

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            category: event.target.value
        }))
    };

    const handleChangeLegfinish = (event) => {
        setLegfinishVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            legfinish: event.target.value
        }))
    };
    const handleChangeLegmaterial = (event) => {
        setLegmaterialVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            legmaterial: event.target.value
        }))
    };
    const handleChangeTopfinish = (event) => {
        setTopfinishVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            topfinish: event.target.value
        }))
    };
    const handleChangeTopmaterial = (event) => {
        setTopmaterialVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            topmaterial: event.target.value
        }))
    };

    const handleChangeisFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value);
        setFormFields(() => ({
            ...formFields,
            isFeatured: event.target.value
        }))
    };

    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

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

            setIsSelectedFiles(true)
            setFiles(imgArr);
        } catch (error) {
            console.log(error);
        }
    };

    const editProduct = (e) => {
        e.preventDefault();

        if (formFields.name === "" || formFields.length === "" || formFields.width === "" || formFields.height === "" || formFields.category === "" || formFields.isFeatured === null || formFields.cbm === "" || formFields.code === "") {
            context.setAlertBox({
                open: true,
                msg: "Please fill all the details and select at least one image",
                error: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", formFields.name);
            formData.append("category", categoryVal);
            formData.append("legfinish", legfinishVal);
            formData.append("legmaterial", legmaterialVal);
            formData.append("topfinish", topfinishVal);
            formData.append("topmaterial", topmaterialVal);
            formData.append("width", formFields.width);
            formData.append("height", formFields.height);
            formData.append("length", formFields.length);
            formData.append("cbm", formFields.cbm);
            formData.append("code", formFields.code);
            formData.append("isFeatured", formFields.isFeatured);

            // Append all image previews
            files.forEach((file) => {
                formData.append('images', file);
            });

            setIsLoading(true)

            editData(`/api/products/${id}`, formData).then((res) => {
                if (res.error !== true) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: 'The product is Updated!'
                    })
                    setIsLoading(false)
                    history("/products")
                } else {
                    setIsLoading(false)
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                    setIsLoading(false)
                    history("/products")
                }
            });

        } catch (error) {
            setIsLoading(false);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "An unexpected error occurred",
            });
        }

    }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-4">Edit Product</h5>
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
                            label="Products"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Edit Product"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={editProduct}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-4 mt-0">
                                <h5 className="mb-4">Basic Information</h5>

                                <div className="form-group">
                                    <h6>PRODUCT NAME</h6>
                                    <input type="text" name="name" value={formFields.name} onChange={inputChange} />
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>WIDTH</h6>
                                            <input type="text" name="width" value={formFields.width} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>LENGTH</h6>
                                            <input type="text" name="length" value={formFields.length} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>HEIGHT</h6>
                                            <input type="text" name="height" value={formFields.height} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>CODE</h6>
                                            <input type="text" name="code" value={formFields.code} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>CBM</h6>
                                            <input
                                                type="text"
                                                name="cbm"
                                                value={formFields.cbm}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>CATEGORY</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    catData?.categoryList?.length !== 0 && catData?.categoryList?.map((cat, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={cat?._id} key={index}>{cat?.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>TOP FINISH</h6>
                                            <Select
                                                value={topfinishVal}
                                                onChange={handleChangeTopfinish}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    topfinishData?.topFinishes?.length !== 0 && topfinishData?.topFinishes?.map((item, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={item?._id} key={index} >{item?.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>TOP MATERIAL</h6>
                                            <Select
                                                value={topmaterialVal}
                                                onChange={handleChangeTopmaterial}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    topmaterialData?.topMaterials?.length !== 0 && topmaterialData?.topMaterials?.map((item, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={item?._id} key={index}>{item?.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>LEG FINISH</h6>
                                            <Select
                                                value={legfinishVal}
                                                onChange={handleChangeLegfinish}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    legfinishData?.legFinishes?.length !== 0 && legfinishData?.legFinishes?.map((item, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={item?._id} key={index}>{item?.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>LEG MATERIAL</h6>
                                            <Select
                                                value={legmaterialVal}
                                                onChange={handleChangeLegmaterial}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    legmaterialData?.legMaterials?.length !== 0 && legmaterialData?.legMaterials?.map((item, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={item?._id} key={index}>{item?.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6 className="text-uppercase">is Featured</h6>
                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeisFeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>
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
                                                {
                                                    isSelectedFiles === true ?
                                                        <img src={`${img}`} className="w-100" alt="" />
                                                        :
                                                        <img src={`${context.baseUrl}/uploads/${img}`} className="w-100" alt="" />
                                                }
                                            </div>
                                        )
                                    })
                                }

                                <div className="uploadBox">
                                    <input type="file" multiple onChange={(e) => onchangeFile(e, '/api/products/upload')} name="images" />
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

export default EditProduct;