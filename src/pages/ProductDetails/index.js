import React, { useEffect, useState } from "react";
import { Breadcrumbs, Chip } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from "@mui/icons-material/Home";

import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import UserAvatarImgComponent from "../../Components/UserAvatarImg";
import Rating from '@mui/material/Rating';
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ProductZoom from "../../Components/ProductZoom";


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


const ProductDetails = () => {

    const [productData, setProductData] = useState([])
    const [reviewsData, setreviewsData] = useState([])

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res)
        })

        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
            setreviewsData(res)
        })
    }, [id])

    const imageBaseUrl = process.env.REACT_APP_BASE_URL
    const imageUrls = productData?.images?.map(image => `${imageBaseUrl}/uploads/${image}`) || [];

    return (
        <>
            <div className="right-content w-100 productDetails">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product View</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Products"
                            component="a"
                            href="#"
                        />
                        <StyledBreadcrumb
                            label="Product View"
                        />
                    </Breadcrumbs>
                </div>
                <div className="card productDetailsSection">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="sliderwrapper pt-3 pb-4 pl-4 pr-4">
                                <h6 className="mb-4">Product Gallery</h6>
                                <ProductZoom images={imageUrls} discount={productData?.discount} />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="pt-3 pb-4 pl-4 pr-4">
                                <h6 className="mb-4">Product Details</h6>

                                <h4>{productData?.name}</h4>

                                <div className="productInfo mt-4">
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><MdBrandingWatermark /></span>
                                            <span className="name">Brand</span>
                                        </div>

                                        <div className="col-sm-9">
                                            : <span>{productData?.brand}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><BiSolidCategoryAlt /></span>
                                            <span className="name">Category</span>
                                        </div>

                                        <div className="col-sm-9">
                                            : <span>{productData?.catName}</span>
                                        </div>
                                    </div>
                                    {
                                        productData?.productRam?.length !== 0 &&
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><BiSolidCategoryAlt /></span>
                                                <span className="name">Ram</span>
                                            </div>

                                            <div className="col-sm-9">
                                                : <span>
                                                    <ul className="list list-inline tags sml">
                                                        {
                                                            productData?.productRam?.map((item, index) => {
                                                                return (
                                                                    <li className="list-inline-item" key={index}>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        productData?.productSize?.length !== 0 &&
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><BiSolidCategoryAlt /></span>
                                                <span className="name">Size</span>
                                            </div>

                                            <div className="col-sm-9">
                                                : <span>
                                                    <ul className="list list-inline tags sml">
                                                        {
                                                            productData?.productSize?.map((item, index) => {
                                                                return (
                                                                    <li className="list-inline-item" key={index}>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        productData?.productWeight?.length !== 0 &&
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><BiSolidCategoryAlt /></span>
                                                <span className="name">Ram</span>
                                            </div>

                                            <div className="col-sm-9">
                                                : <span>
                                                    <ul className="list list-inline tags sml">
                                                        {
                                                            productData?.productWeight?.map((item, index) => {
                                                                return (
                                                                    <li className="list-inline-item" key={index}>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                    }

                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><BiSolidCategoryAlt /></span>
                                            <span className="name">Price</span>
                                        </div>

                                        <div className="col-sm-9">
                                            : <span>{productData?.price}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><BiSolidCategoryAlt /></span>
                                            <span className="name">Review</span>
                                        </div>

                                        <div className="col-sm-9">
                                            : <span>{reviewsData?.length}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon"><BiSolidCategoryAlt /></span>
                                            <span className="name">Published</span>
                                        </div>

                                        <div className="col-sm-9">
                                            : <span>{productData?.dateCreated}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-4">
                        <h6 className="mt-4 mb-3">Product Description</h6>
                        <p>{productData?.description}</p>

                        <br />
                        {
                            reviewsData?.length !== 0 &&
                            <>
                                <h6 className="mt-4 mb-4">Customer Reviews</h6>

                                <div className="reviewsSection">

                                    {
                                        reviewsData?.length !== 0 && reviewsData?.slice(0)?.reverse()?.map((item, index) => {
                                            return (
                                                <div className="reviewsRow">
                                                    <div className="row">
                                                        <div className="col-sm-7 d-flex">
                                                            <div className="d-flex flex-column">
                                                                <div className="userInfo d-flex align-items-center mb-3">
                                                                    <UserAvatarImgComponent img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiIFjCOZ-mMeqxd2ryrneiHedE8G9S0AboA&s" lg={true} />

                                                                    <div className="info pl-3">
                                                                        <h6>{item?.customerName}</h6>
                                                                        <span>{item?.dateCreated}</span>
                                                                    </div>
                                                                </div>
                                                                <Rating name="read-only" value={item?.customerRating} readOnly />
                                                            </div>

                                                        </div>

                                                        <p className="mt-3">{item?.review}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;