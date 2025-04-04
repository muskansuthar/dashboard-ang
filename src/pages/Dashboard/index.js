import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const Dashboard = () => {
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
    context.setisHideSidebarAndHeader(false);

    window.scrollTo(0, 0);
    context.setProgress(40);

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
      fetchDataFromApi("/api/products").then((res) => {
        setProductList(res);
      });
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
                  <th>WEIGHT</th>
                  <th>HEIGHT</th>
                  <th>WIDTH</th>
                  <th>LENGTH</th>
                  <th>PRICE</th>
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
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>{item?.category?.name}</td>
                        <td>{item?.legfinish?.name}</td>
                        <td>{item?.legmaterial?.name}</td>
                        <td>{item?.topfinish?.name}</td>
                        <td>{item?.topmaterial?.name}</td>
                        <td>{item?.weight}</td>
                        <td>{item?.height}</td>
                        <td>{item?.width}</td>
                        <td>{item?.length}</td>
                        <td>
                          <div style={{ width: "70px" }}>
                            {/* <del className="old">Rs {item?.oldPrice}</del> */}
                            <span className="new text-danger">
                              Rs {item?.price}
                            </span>
                          </div>
                        </td>
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

export default Dashboard;
