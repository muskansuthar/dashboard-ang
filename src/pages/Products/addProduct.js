import { Breadcrumbs, Button, Chip, MenuItem, Select, CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";



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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
}

const ProductUpload = () => {

    const [categoryVal, setcategoryVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');
    const [isFeaturedValue, setIsFeaturedValue] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [catData, setCatData] = useState([])
    const [subCatData, setSubCatData] = useState([])
    const [productImagesArr, setproductImagesArr] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [imgFiles, setimgFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [originalUrls, setOriginalUrls] = useState([])
    const [productRAMSData, setProductRAMSData] = useState([])
    const [productWEIGHTData, setProductWEIGHTData] = useState([])
    const [productSIZEData, setProductSIZEData] = useState([])
    const [isSelectedFiles, setIsSelectedFiles] = useState(false)

    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        brand: '',
        price: null,
        oldPrice: null,
        catName: '',
        subCatId: '',
        subCatName: '',
        category: '',
        subCat: '',
        countInStock: null,
        rating: 0,
        isFeatured: null,
        discount: null,
        productRam: [],
        productSize: [],
        productWeight: [],
        location: ''
    });

    const history = useNavigate();

    const productImages = useRef();
    const context = useContext(MyContext)
    const formData = new FormData();


    useEffect(() => {
        window.scrollTo(0, 0)
        setCatData(context.catData)
    }, [])

    useEffect(() => {
        const subCatArr = []

        context.catData?.categoryList?.length !== 0 && context.catData?.categoryList?.map((cat, index) => {
            if (cat?.children?.length !== 0) {
                cat?.children?.map((subCat) => {
                    subCatArr.push(subCat)
                })
            }
        })

        setSubCatData(subCatArr)
    }, [context.catData])

    useEffect(() => {
        window.scrollTo(0, 0)

        fetchDataFromApi("/api/productRAMS").then((res) => {
            setProductRAMSData(res)
        })
        fetchDataFromApi("/api/productWeight").then((res) => {
            setProductWEIGHTData(res)
        })
        fetchDataFromApi("/api/productSize").then((res) => {
            setProductSIZEData(res)
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

    useEffect(() => {
        formFields.location = context.selectedCountry
    }, [context.selectedCountry])

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            category: event.target.value
        }))
    };

    const handleChangeSubCategory = (event) => {
        setSubCatVal(event.target.value);
    };

    const handleChangeisFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value);
        setFormFields(() => ({
            ...formFields,
            isFeatured: event.target.value
        }))
    };
    const handleChangeProductRams = (event) => {
        // setProductRams(event.target.value);
        // setFormFields(() => ({
        //     ...formFields,
        //     productRam: event.target.value
        // }))

        const {
            target: { value },
        } = event;
        setProductRams(
            typeof value === 'string' ? value.split(',') : value,
        )

        formFields.productRam = value
    };
    const handleChangeisProductSize = (event) => {
        // setProductSize(event.target.value);
        // setFormFields(() => ({
        //     ...formFields,
        //     productSize: event.target.value
        // }))

        const {
            target: { value },
        } = event;
        setProductSize(
            typeof value === 'string' ? value.split(',') : value,
        )

        formFields.productSize = value
    };
    const handleChangeisProductWeight = (event) => {
        // setProductWeight(event.target.value);
        // setFormFields(() => ({
        //     ...formFields,
        //     productWeight: event.target.value
        // }))

        const {
            target: { value },
        } = event;
        setProductWeight(
            typeof value === 'string' ? value.split(',') : value,
        )

        formFields.productWeight = value
    };

    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const selectCat = (cat, id) => {
        formFields.catName = cat;
        formFields.catId = id
    }

    const selectSubCat = (subCat, id) => {
        setFormFields(() => ({
            ...formFields,
            subCat: subCat,
            subCatId: id
        }))
    }

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

            setIsSelectedFiles(true)
            setFiles(imgArr);
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

    const removeImg = async (index, imgUrl) => {
        try {
            const originalUrl = originalUrls[index];

            // Call the API to delete the image
            deleteImages(`/api/products/deleteImage?img=${originalUrl}`).then((res) => {
                if (res.success) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Image Deleted!",
                    });

                    const updatedOriginalUrls = originalUrls.filter((_, i) => i !== index);
                    const updatedpreviews = previews.filter((_, i) => i !== index);

                    setOriginalUrls(updatedOriginalUrls);
                    setPreviews(updatedpreviews);
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg || "Failed to delete image",
                    });
                }
            })
        } catch (error) {
            console.error("Error deleting image:", error);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Error deleting image",
            });
        }
    }

    const addProduct = (e) => {
        e.preventDefault();

        formData.append('name', formFields.name)
        formData.append('description', formFields.description)
        formData.append('brand', formFields.brand)
        formData.append('price', formFields.price)
        formData.append('oldPrice', formFields.oldPrice)
        formData.append('catName', formFields.catName)
        formData.append('subCatId', formFields.subCatId)
        formData.append('category', formFields.category)
        formData.append('subCat', formFields.subCat)
        formData.append('countInStock', formFields.countInStock)
        formData.append('rating', formFields.rating)
        formData.append('isFeatured', formFields.isFeatured)
        formData.append('discount', formFields.discount)
        formData.append('productRam', formFields.productRam)
        formData.append('productSize', formFields.productSize)
        formData.append('productWeight', formFields.productWeight)
        formData.append('location', formFields.location)

        if (formFields.name === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product name',
                error: true
            })
            return false;
        }
        if (formFields.description === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product description',
                error: true
            })
            return false;
        }
        if (formFields.brand === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product brand',
                error: true
            })
            return false;
        }
        if (formFields.price === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product price',
                error: true
            })
            return false;
        }
        if (formFields.oldPrice === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product oldPrice',
                error: true
            })
            return false;
        }
        if (formFields.category === "") {
            context.setAlertBox({
                open: true,
                msg: 'please select product category',
                error: true
            })
            return false;
        }
        if (formFields.subCat === "") {
            context.setAlertBox({
                open: true,
                msg: 'please select product sub category',
                error: true
            })
            return false;
        }
        if (formFields.countInStock === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product count in Stock',
                error: true
            })
            return false;
        }
        if (formFields.rating === 0) {
            context.setAlertBox({
                open: true,
                msg: 'please select product rating',
                error: true
            })
            return false;
        }
        if (formFields.isFeatured === null) {
            context.setAlertBox({
                open: true,
                msg: 'please select product is a featured or not',
                error: true
            })
            return false;
        }
        if (formFields.discount === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product discount',
                error: true
            })
            return false;
        }
        if (previews.length === 0) {
            context.setAlertBox({
                open: true,
                msg: 'please select images',
                error: true
            })
            return false;
        }


        setIsLoading(true)

        postData('/api/products/create', formFields).then((res) => {
            context.setAlertBox({
                open: true,
                msg: 'The product is created!',
                error: false
            })

            setIsLoading(false)

            history('/products')
        })

    }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-4">Product Upload</h5>
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
                            label="Product Upload"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addProduct}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-4 mt-0">
                                <h5 className="mb-4">Basic Information</h5>

                                <div className="form-group">
                                    <h6>PRODUCT NAME</h6>
                                    <input type="text" name="name" value={formFields.name} onChange={inputChange} />
                                </div>
                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea rows={5} cols={10} name="description" value={formFields.description} onChange={inputChange} />
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
                                                            <MenuItem className="text-capitalize" value={cat._id} key={index} onClick={() => selectCat(cat.name)}>{cat.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>SUB CATEGORY</h6>
                                            <Select
                                                value={subCatVal}
                                                onChange={handleChangeSubCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    subCatData?.length !== 0 && subCatData?.map((subCat, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={subCat._id} key={index} onClick={() => selectSubCat(subCat.name, subCat._id)}>{subCat.name}</MenuItem>
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
                                            <h6>PRICE</h6>
                                            <input type="text" name="price" value={formFields.price} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>OLD PRICE</h6>
                                            <input type="text" name="oldPrice" value={formFields.oldPrice} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT STOCK</h6>
                                            <input type="text" name="countInStock" value={formFields.countInStock} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
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
                                                <spna className="remove" onClick={() => removeImg(index, img)}><IoCloseSharp /></spna>
                                                <img src={img} className="w-100" />
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

export default ProductUpload;