import {
  Breadcrumbs,
  Button,
  Chip,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import { fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

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
const ProductUpload = () => {
  const [categoryVal, setcategoryVal] = useState("");
  const [legfinishVal, setLegfinishVal] = useState("");
  const [legmaterialVal, setLegmaterialVal] = useState("");
  const [topmaterialVal, setTopmaterialVal] = useState("");
  const [topfinishVal, setTopfinishVal] = useState("");
  const [isFeaturedValue, setIsFeaturedValue] = useState("");
  const [catData, setCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgFiles, setimgFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [originalUrls, setOriginalUrls] = useState([]);

  const [legfinishData, setLegfinishData] = useState([]);
  const [legmaterialData, setLegmaterialData] = useState([]);
  const [topfinishData, setTopfinishData] = useState([]);
  const [topmaterialData, setTopmaterialData] = useState([]);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    price: null,
    category: "",
    legfinish: "",
    legmaterial: "",
    topfinish: "",
    topmaterial: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    isFeatured: null,
  });

  const history = useNavigate();
  const context = useContext(MyContext);
  const formData = new FormData();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCatData(context.catData);
  }, [context.catData]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi("/api/legfinish").then((res) => {
      setLegfinishData(res);
    });
    fetchDataFromApi("/api/legmaterial").then((res) => {
      setLegmaterialData(res);
    });
    fetchDataFromApi("/api/topfinish").then((res) => {
      setTopfinishData(res);
    });
    fetchDataFromApi("/api/topmaterial").then((res) => {
      setTopmaterialData(res);
    });
  }, []);

  useEffect(() => {
    if (!imgFiles) return;

    let tmp = [];
    for (let i = 0; i < imgFiles.length; i++) {
      tmp.push(URL.createObjectURL(imgFiles[i]));
    }

    const objectUrls = tmp;
    setPreviews(objectUrls);

    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [imgFiles]);

  const handleChangeCategory = (event) => {
    setcategoryVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      category: event.target.value,
    }));
  };
  const handleChangeLegfinish = (event) => {
    setLegfinishVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      legfinish: event.target.value,
    }));
  };
  const handleChangeLegmaterial = (event) => {
    setLegmaterialVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      legmaterial: event.target.value,
    }));
  };
  const handleChangeTopfinish = (event) => {
    setTopfinishVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      topfinish: event.target.value,
    }));
  };
  const handleChangeTopmaterial = (event) => {
    setTopmaterialVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      topmaterial: event.target.value,
    }));
  };

  const handleChangeisFeaturedValue = (event) => {
    setIsFeaturedValue(event.target.value);
    setFormFields(() => ({
      ...formFields,
      isFeatured: event.target.value,
    }));
  };

  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const onchangeFile = async (e, apiEndPoint) => {
    try {
      const imgArr = [];
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png")
        ) {
          setimgFiles(files);

          const file = files[i];
          imgArr.push(file);
          formData.append("images", file);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file.",
          });
        }
      }
      postData(apiEndPoint, formData).then((res) => {
        setOriginalUrls(res);
        context.setAlertBox({
          open: true,
          error: false,
          msg: "images uploaded!",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();

    formData.append("name", formFields.name);
    formData.append("description", formFields.description);
    formData.append("price", formFields.price);
    formData.append("category", formFields.category);
    formData.append("legfinish", formFields.legfinish);
    formData.append("legmaterial", formFields.legmaterial);
    formData.append("topfinish", formFields.topfinish);
    formData.append("topmaterial", formFields.topmaterial);
    formData.append("weight", formFields.weight);
    formData.append("height", formFields.height);
    formData.append("length", formFields.length);
    formData.append("width", formFields.width);
    formData.append("isFeatured", formFields.isFeatured);

    if (formFields.name === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product name",
        error: true,
      });
      return false;
    }
    if (formFields.description === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product description",
        error: true,
      });
      return false;
    }
    if (formFields.price === null) {
      context.setAlertBox({
        open: true,
        msg: "please add product price",
        error: true,
      });
      return false;
    }
    if (formFields.category === "") {
      context.setAlertBox({
        open: true,
        msg: "please select product category",
        error: true,
      });
      return false;
    }
    if (formFields.legfinish === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product legfinish",
        error: true,
      });
      return false;
    }
    if (formFields.legmaterial === "") {
      context.setAlertBox({
        open: true,
        msg: "please add product legmaterial",
        error: true,
      });
      return false;
    }
    if (formFields.isFeatured === null) {
      context.setAlertBox({
        open: true,
        msg: "please select product is a featured or not",
        error: true,
      });
      return false;
    }
    if (previews.length === 0) {
      context.setAlertBox({
        open: true,
        msg: "please select images",
        error: true,
      });
      return false;
    }

    setIsLoading(true);

    postData("/api/products/create", formFields).then((res) => {
      context.setAlertBox({
        open: true,
        msg: "The product is created!",
        error: false,
      });

      setIsLoading(false);

      history("/products");
    });
  };

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
                  <input
                    type="text"
                    name="name"
                    value={formFields.name}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    name="description"
                    value={formFields.description}
                    onChange={inputChange}
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>PRICE</h6>
                      <input
                        type="text"
                        name="price"
                        value={formFields.price}
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>WEIGHT</h6>
                      <input
                        type="text"
                        name="weight"
                        value={formFields.weight}
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>WIDTH</h6>
                      <input
                        type="text"
                        name="width"
                        value={formFields.width}
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>LENGTH</h6>
                      <input
                        type="text"
                        name="length"
                        value={formFields.length}
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>HEIGHT</h6>
                      <input
                        type="text"
                        name="height"
                        value={formFields.height}
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
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em value={null}>None</em>
                        </MenuItem>
                        {catData?.categoryList?.length !== 0 &&
                          catData?.categoryList?.map((cat, index) => {
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
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>TOP FINISH</h6>
                      <Select
                        value={topfinishVal}
                        onChange={handleChangeTopfinish}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em value={null}>None</em>
                        </MenuItem>
                        {topfinishData?.topFinishes?.length !== 0 &&
                          topfinishData?.topFinishes?.map((item, index) => {
                            return (
                              <MenuItem
                                className="text-capitalize"
                                value={item._id}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
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
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em value={null}>None</em>
                        </MenuItem>
                        {topmaterialData?.topMaterials?.length !== 0 &&
                          topmaterialData?.topMaterials?.map((item, index) => {
                            return (
                              <MenuItem
                                className="text-capitalize"
                                value={item._id}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
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
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em value={null}>None</em>
                        </MenuItem>
                        {legfinishData?.legFinishes?.length !== 0 &&
                          legfinishData?.legFinishes?.map((item, index) => {
                            return (
                              <MenuItem
                                className="text-capitalize"
                                value={item._id}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
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
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em value={null}>None</em>
                        </MenuItem>
                        {legmaterialData?.legMaterials?.length !== 0 &&
                          legmaterialData?.legMaterials?.map((item, index) => {
                            return (
                              <MenuItem
                                className="text-capitalize"
                                value={item._id}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
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
                        inputProps={{ "aria-label": "Without label" }}
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
                {previews?.length !== 0 &&
                  previews?.map((img, index) => {
                    return (
                      <div className="uploadBox" key={index}>
                        <img src={img} className="w-100" alt="image" />
                      </div>
                    );
                  })}

                <div className="uploadBox">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => onchangeFile(e, "/api/products/upload")}
                    name="images"
                  />
                  <div className="info">
                    <FaRegImages />
                    <h5>image upload</h5>
                  </div>
                </div>
              </div>

              <br />

              <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                <FaCloudUploadAlt /> &nbsp;
                {isLoading === true ? (
                  <CircularProgress color="inherit" className="loader" />
                ) : (
                  "PUBLISH AND VIEW"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
