import { useEffect, useState } from "react";
import {
  InputLabel,
  FormControl,
  InputAdornment,
  Table,
  Select,
  MenuItem,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Close as CloseIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellerTable = () => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: "90vh",
    overflow: "auto",
  };

  const deleteModalStyle = {
    ...modalStyle,
    width: 400,
    // textAlign: 'center'
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Sellers, setSellers] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    Id: "",
    ListedPrice: "",
    status: "Available",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSellers, setApiSellers] = useState([]);

  const navigate = useNavigate();
  const handleAddSeller = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/seller/createSeller`,
        addFormData
      );
      if (res.data.success) {
        toast.success("Seller added successfully!");
        handleCloseAddModal();
        getAllSeller();
        //reset form data
        setAddFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          Id: "",
          ListedPrice: "",
          status: "Available",
        });
      }
    } catch (error) {
      console.error("error adding Seller", error);
      toast.error(error.res?.data?.message || "failed to add Seller");
    }
  };
  const getAllSeller = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/seller/getAllSeller`);
      console.log("response", res.data);
      setSellers(res.data);
      setApiSellers(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllSeller();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Seller ", selectedSeller);

    try {
      const res = await axios.put(
        `http://localhost:3001/seller/updateSeller/${selectedSeller._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSeller();
        setEditFormData({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(
        `http://localhost:3001/seller/deleteSeller/${selectedSeller._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSeller();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Seller) => {
    setSelectedSeller(Seller);
    setViewModalOpen(true);
  };

  const handleEdit = (Seller) => {
    setSelectedSeller(Seller);
    setEditFormData(Seller);
    setEditModalOpen(true);
  };

  const handleDelete = (Seller) => {
    setSelectedSeller(Seller);
    setDeleteModalOpen(true);
  };
  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => {
    console.log("hello");
    setAddModalOpen(false);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (e) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };
  const handleAddInputChange = (field) => (e) => {
    setAddFormData({
      ...addFormData,
      [field]: e.target.value,
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  // const fieldLabels = {
  //   SellerTitle: "Seller Title",
  //   SellerType: "Seller Type",
  //   address: "Address",
  //   price: "Price",
  //   areaSqft: "Area Sqft",
  //   furnishing: "furnishing",
  //   status: "Status",

  //   // Add all other fields you want to show with custom labels
  // };

  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setSellers(apiSellers); // Reset to full list when search is empty
      return;
    }

    const filtered = apiSellers.filter((Seller) => {
      return (
        Seller.name.toLowerCase().includes(value) || // SellerTitle = gfdgf.includes(gfdgf)
        Seller.email.toLowerCase().includes(value) ||
        Seller.phone.toString().toLowerCase().includes(value) ||
        Seller.address.toLowerCase().includes(value) ||
        Seller.Id.toString().toLowerCase().includes(value) ||
        Seller.ListedPrice.toString().toLowerCase().includes(value)
      );
    });

    setSellers(filtered);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // always right align
          flexWrap: "wrap", // wrap on small screens
          gap: 2,
          mt: 1,
          mb: 4,
          px: 2, // padding for small screens
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: "160px",
            width: "100%",
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="button"
          onClick={handleOpenAddModal}
          sx={{
            // height: '50px',
            maxWidth: "160px",
            width: "100%",
            backgroundColor: "rgb(4, 4,40)",
            color: "#ffffff",
            textTransform: "capitalize",
            whiteSpace: "nowrap",
          }}
        >
          Add Seller
        </Button>
      </Box>

      <div className="table">
        <TableContainer
          component={Paper}
          style={{
            marginTop: "0px",
            maxHeight: "400px",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Table className="w-full border border-gray-300 ">
            <TableHead
              sx={{
                top: 0,
                background: "#f5f7fa",
                zIndex: 2,
                position: "sticky",
                fontWeight: "bold",
                padding: "16px",
                whiteSpace: "nowrap",
              }}
            >
              {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
              <TableRow className="bg-gray-200" border="1px solid black">
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  SI.No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  E-mail
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Mobile No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Property Id
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Listed Price
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Sellers.length > 0 &&
                Sellers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((Seller, index) => (
                  <TableRow
                    key={Seller.id}
                    className="text-center"
                    sx={{
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      "&:hover": { backgroundColor: "rgba(12, 12, 101, 0.05)" },
                    }}
                  >
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                        whiteSpace:"nowrap"
                      }}
                      className="border p-2"
                    >
                      {Seller.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {Seller.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {Seller.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {Seller.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {Seller.Id}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {Seller.ListedPrice}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                      className="border p-2"
                    >
                      {Seller.status}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bolder" }}
                      className="border p-2"
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          className="view"
                          sx={{ color: "blue" }}
                          onClick={() => handleView(Seller)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          className="edit"
                          sx={{ color: "grey" }}
                          onClick={() => handleEdit(Seller)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          className="delete"
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(Seller)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View Modal */}
        <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Seller Details
              </Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedSeller && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedSeller)
                  .filter(
                    ([key]) =>
                      key !== "__v" &&
                      key !== "_id" &&
                      key !== "updatedAt" &&
                      key !== "createdAt"
                  )
                  .map(([key, value]) => (
                    <Grid item xs={6} key={key}>
                      <Typography>
                        <strong>{key}:</strong> {value}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        </Modal>

        {/* Edit Modal */}
        <Modal open={editModalOpen} onClose={handleCloseEditModal}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Edit Seller</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} mt={2}>
              {Object.keys(editFormData)
                .filter(
                  (field) =>
                    field !== "__v" &&
                    field !== "_id" &&
                    field !== "updatedAt" &&
                    field !== "createdAt"
                )
                .map((field) => (
                  <Grid item xs={6} key={field}>
                    {field === "status" ? (
                          <FormControl fullWidth>
                            <InputLabel
                              label="status"
                              //  id="demo-simple-select-label"
                            >
                              Status
                            </InputLabel>
                            <Select
                              //labelId="demo-simple-select-label"
                              //id="demo-simple-select"

                              label="status"
                              value={editFormData[field] || ""}
                              onChange={handleEditInputChange(field)}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="InActive">InActive</MenuItem>
                            </Select>
                          </FormControl>
                        ) : field === "name" ? (
                          <TextField
                            label="Name"
                            value={editFormData[field] || ""}
                            onChange={(e) => {
                              let value = e.target.value;

                              // Only allow alphabets and spaces
                              if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                                // Capitalize the first letter of each word
                                const capitalized = value.replace(
                                  /\b\w/g,
                                  (char) => char.toUpperCase()
                                );
                                handleEditInputChange(field)({
                                  target: { value: capitalized },
                                });
                              }
                            }}
                            fullWidth
                          />
                        ) : field === "email" ? (
                          <TextField
                            label="Email"
                            value={editFormData[field] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Check for valid email format with exactly one @ and one .
                              const atCount = (value.match(/@/g) || []).length;
                              const dotCount = (value.match(/\./g) || [])
                                .length;
                              if (atCount <= 1 && dotCount <= 1) {
                                handleEditInputChange(field)(e);
                              }
                            }}
                            fullWidth
                          />
                        ) : field === "phone" ? (
                          <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            type="tel"
                            inputProps={{ maxLength: 10 }}
                            value={editFormData[field] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only digits and ensure length is 10
                              if (/^\d{0,10}$/.test(value)) {
                                handleEditInputChange(field)(e);
                              }
                            }}
                            required
                          />
                        ) : field === "address" ? (
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={editFormData[field] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only letters, numbers, spaces, commas, and periods
                              if (/^[A-Za-z0-9\s,.\-]*$/.test(value)) {
                                handleEditInputChange(field)(e);
                              }
                            }}
                            required
                          />
                        ) : field === "ListedPrice" ? (
                          <TextField
                            fullWidth
                            label="Listed Price"
                            name="ListedPrice"
                            type="number"
                            value={editFormData[field] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only positive numbers or zero
                              if (value === "" || Number(value) >= 0) {
                                handleEditInputChange(field)(e);
                              }
                            }}
                            required
                          />
                        ) : (
                          <TextField
                            label={
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            fullWidth
                          />
                        )}
                      </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="standard"
                className="cancle"
                onClick={handleCloseEditModal}
                sx={{ backgroundColor: "grey", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdate}
                className="update"
                sx={{ ml: 2, backgroundColor: "rgb(4, 4,40)" }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Delete Modal */}
        <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
          <Box sx={deleteModalStyle}>
            <Typography variant="h6">Confirm Delete</Typography>
            <Typography my={2}>
              Are you sure you want to delete this Seller?
            </Typography>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="standard"
                onClick={handleCloseDeleteModal}
                className="cancle"
                sx={{ color: "white", backgroundColor: "grey" }}
              >
                CANCLE
              </Button>
              <Button
                variant="contained"
                color="error"
                className="delete1"
                sx={{backgroundColor:"red"}}
                onClick={handleConfirmDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Add Seller Modal  */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Seller
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      type="string"
                      value={addFormData.name}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Only allow alphabets and spaces
                        if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                          // Capitalize the first letter of each word
                          const capitalized = value.replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                          );
                          handleAddInputChange("name")({
                            target: { value: capitalized },
                          });
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="email"
                      name="email"
                      value={addFormData.email}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow input only if it contains at most one @ and one .
                        const atCount = (value.match(/@/g) || []).length;
                        const dotCount = (value.match(/\./g) || []).length;

                        if (atCount <= 1 && dotCount <= 1) {
                          handleAddInputChange("email")(e);
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      type="tel"
                      inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                      value={addFormData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) {
                          handleAddInputChange("phone")(e);
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      type="string"
                      value={addFormData.address}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only letters, numbers, and spaces
                        if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                          handleAddInputChange("address")(e);
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Seller ID"
                      name="SellerID"
                      type="string"
                      value={addFormData.Id}
                      onChange={handleAddInputChange("Id")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                    
                      fullWidth
                      label="Listed Price"
                      name="ListedPrice"
                      type="number"
                      value={addFormData.ListedPrice}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) > 0) {
                          handleAddInputChange("ListedPrice")(e);
                        }
                      }}
                      required
                    />
                   
                  </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="furnishing-label">Status</InputLabel>
                  <Select
                    labelId="furnishing-label"
                    label="Status"
                    name="status"
                    value={addFormData.Status}
                    onChange={handleAddInputChange("status")}
                    required
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="InActive">InActive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="standard"
                    onClick={handleCloseAddModal}
                    className="cancle"
                    sx={{ color: "white", backgroundColor: "grey" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddSeller}
                    className="save"
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)" }}
                  >
                    Save Seller
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Sellers.length}
        sx={{mt:-3}}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SellerTable;
