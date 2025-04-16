import {
  Breadcrumbs,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

//breadcrump code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Products = () => {
  const [categoryVal, setcategoryVal] = useState("All");
  const [productList, setProductList] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(40);
    fetchDataFromApi(`/api/products`).then((res) => {
      setProductList(res);
    });
    context.setProgress(100);
  },[]);


  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(40);
    setProductList(context.productList);
    context.setProgress(100);
  }, [context.productList]);

  const deleteProduct = (id) => {
    context.setProgress(40);
    deleteData(`/api/products/${id}`).then((res) => {
      context.setProgress(100);
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Product Deleted!",
      });
      fetchDataFromApi(`/api/products`).then((res) => {
        setProductList(res);
      });
      context.fetchCategory();
    });
  };

 
  const handleChangeCategory = (event) => {
    context.setProgress(40);
    const selectedValue = event.target.value;
    setcategoryVal(selectedValue); // Update categoryVal for all selections

    if (selectedValue !== "All") {
      fetchDataFromApi(`/api/products/category?category=${selectedValue}`).then(
        (res) => {
          setProductList(res);
          context.setProgress(100);
        }
      );
    } else {
      fetchDataFromApi("/api/products?page=1&perPage=8").then((res) => {
        setProductList(res);
        context.setProgress(100);
      });
    }
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product List</h5>
          <div className="ml-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb
                label="Products"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>

            <Link to="/product/upload">
              <Button className="btn-blue ml-3 pl-3 pr-3">Add Product</Button>
            </Link>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>

          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl className="w-100" size="small">
                <Select
                  value={categoryVal}
                  onChange={handleChangeCategory}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100"
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  {context.catData?.categoryList?.length !== 0 &&
                    context.catData?.categoryList?.map((cat, index) => {
                      return (
                        <MenuItem
                          className="text-capitalize"
                          value={cat._id}
                          key={index}
                        >
                          {cat.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th style={{ width: "300px" }}>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>LEG FINISH</th>
                  <th>LEG MATERIAL</th>
                  <th>TOP FINISH</th>
                  <th>TOP MATERIAL</th>
                  <th>CBM</th>
                  <th>CODE</th>
                  <th>HEIGHT</th>
                  <th>WIDTH</th>
                  <th>LENGTH</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {productList?.products?.length !== 0 &&
                  productList?.products?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img card shadow m-0">
                                <img
                                  src={`${context.baseUrl}/uploads/${item?.images[0]}`}
                                  className="w-100"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="info pl-3">
                              <h6>{item?.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{item?.category?.name}</td>
                        <td>{item?.legfinish?.name}</td>
                        <td>{item?.legmaterial?.name}</td>
                        <td>{item?.topfinish?.name}</td>
                        <td>{item?.topmaterial?.name}</td>
                        <td>{item?.cbm}</td>
                        <td>{item?.code}</td>
                        <td>{item?.height}</td>
                        <td>{item?.width}</td>
                        <td>{item?.length}</td>
                        <td>
                          <div className="actions d-flex align-items-center">
                            <Link to={`/product/edit/${item._id}`}>
                              <Button className="success" color="success">
                                <FaPencilAlt />
                              </Button>
                            </Link>
                            <Button
                              className="error"
                              color="error"
                              onClick={() => deleteProduct(item._id)}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
