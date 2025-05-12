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

const BookingTable = () => {
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
  const [SelectedBookings, setSelectedBookings] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Bookings, setBookings] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    check_in_date: "",
    check_out_date: "",
    TotalAmountUnit: "",
    paymentStatus: "",
    Bookingstatus: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBookings, setApiBookings] = useState([]);

  const navigate = useNavigate();
  const handleAddBooking = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/booking/createBooking`,
        addFormData
      );
      if (res.data.success) {
        toast.success("Booking added successfully!");
        handleCloseAddModal();
        getAllBooking();
        //reset form data
        setAddFormData({});
      }
    } catch (error) {
      console.error("error adding Booking", error);
      toast.error(error.response?.data?.message || "failed to add Booking");
    }
  };
  const getAllBooking = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/booking/getAllBooking`
      );
      console.log(res.data);
      setBookings(res.data);
      setApiBookings(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllBooking();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Booking", SelectedBookings);

    try {
      const res = await axios.put(
        `http://localhost:3001/booking/updateBooking/${SelectedBookings._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBooking();
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
        `http://localhost:3001/booking/deleteBooking/${SelectedBookings._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBooking();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Booking) => {
    setSelectedBookings(Booking);
    setViewModalOpen(true);
  };

  const handleEdit = (Booking) => {
    setSelectedBookings(Booking);
    setEditFormData(Booking);
    setEditModalOpen(true);
  };

  const handleDelete = (Booking) => {
    setSelectedBookings(Booking);
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
  //   BookingTitle: "BookingTitle",
  //   BookingType: "BookingType",
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
      setBookings(apiBookings); // Reset to full list when search is empty
      return;
    }

    const filtered = apiBookings.filter((booking) => {
      return (
        booking.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        booking.address.toLowerCase().includes(value) ||
        booking.email.toLowerCase().includes(value) ||
        booking.mobileNo.toString().toLowerCase().includes(value)
      );
    });

    setBookings(filtered);
  };

  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
  //   const dropdownFields = ["status", "Furnishing", "BookingType"]; // edit model mein drop down ke liye ye easy pdega

  // const dropdownOptions = {
  //   status: ["Available", "Sold", "Rented","Pending"],
  //   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
  //   BookingType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
  // };
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
          value={searchTerm}
          size="small"
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
          Add Booking
        </Button>
      </Box>

      <div className="table">
        <TableContainer
          component={Paper}
          style={{
            marginTop: "0px",
            maxHeight: "400px",
            overflow: "auto",
            maxWidth: 1350,
            whiteSpace: "nowrap",
            scrollbarWidth: "none",
          }}
        >
          <Table className="w-full border border-gray-300 ">
            <TableHead
              sx={{
                background: "white",
                position: "sticky",
                fontWeight: "bold",
                top: 0,
                zIndex: 2,
              }}
            >
              {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
              <TableRow className="bg-gray-200" border="1px solid black">
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  S.No
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
                  Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Mobile
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Address{" "}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  CheckIN
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  CheckOut
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Total Amount
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Payment Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Booking Status
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
              {Bookings.length > 0 &&
                Bookings.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((Booking, index) => (
                  <TableRow
                    key={Booking.id}
                    className="text-center"
                    sx={{
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      "&:hover": { backgroundColor: "rgba(12, 12, 101, 0.05)" },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        textAlign: "center",
                        padding: "4px",
                      }}
                      className="border p-2"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.mobileNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.check_in_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.check_out_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.TotalAmountUnit}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.paymentStatus}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Booking.Bookingstatus}
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
                          sx={{ color: "blue" }}
                          className="view"
                          onClick={() => handleView(Booking)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "grey" }}
                          className="edit"
                          onClick={() => handleEdit(Booking)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          className="delete"
                          onClick={() => handleDelete(Booking)}
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
                BookingDetails
              </Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {SelectedBookings && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(SelectedBookings)
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
              <Typography variant="h6">Edit Booking</Typography>
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
                    {field === "PaymentStatus" ? (
                      <FormControl fullWidth>
                        <InputLabel>Payment Status</InputLabel>
                        <Select
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          label="PaymentStatus"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Failed">Failed</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "Bookingstatus" ? (
                      <FormControl fullWidth>
                        <InputLabel>Booking Status</InputLabel>
                        <Select
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          label="BookingStatus"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Confirmed">Confirmed</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "check_out_date" ? (
                      <TextField
                        fullWidth
                        name="CheckOut"
                        type="Date"
                        value={editFormData[field] || ""}
                        onChange={(e) => handleEditInputChange(field)(e)}
                        required
                      />
                    ) : field === "check_in_date" ? (
                      <TextField
                        fullWidth
                        name="CheckIN"
                        type="Date"
                        value={editFormData[field] || ""}
                        onChange={(e) => handleEditInputChange(field)(e)}
                        required
                      />
                    ) : field === "name" ? (
                      <TextField
                        label="Name"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow only alphabets and spaces (optional)
                          if (/^[a-zA-Z\s]*$/.test(value)) {
                            handleEditInputChange("name")(e);
                          }
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "email" ? (
                      <TextField
                        label="E-mail"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleEditInputChange("email")(e);

                          // Optional: validate separately if needed
                          if (
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                              value
                            )
                          ) {
                            console.log("Valid email");
                            handleEditInputChange("email")(e);
                          } else {
                            console.log("Invalid email");
                          }
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "mobileNo" ? (
                      <TextField
                        label="Phone"
                        type="tel"
                        inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            handleEditInputChange(field)(e);
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;
                          if (value.length !== 10) {
                            alert("Phone number must be exactly 10 digits");
                            // Optionally reset or mark as error
                          }
                        }}
                        fullWidth
                        variant="outlined"
                        required
                      />
                    ) : field === "address" ? (
                      <TextField
                        label="address"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (field === "address") {
                            // Allow blank or values starting with A-Za-z1-9
                            if (value === "" || /^[A-Za-z1-9]/.test(value)) {
                              // Auto-capitalize first letter

                              value =
                                value.charAt(0).toUpperCase() + value.slice(1);
                            } else {
                              return;
                            }
                          }
                          // Use updated value
                          handleEditInputChange(field)({
                            ...e,
                            target: { ...e.target, value },
                          });
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "TotalAmountUnit" ? (
                      <TextField
                        label="Total Amount"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleEditInputChange(field)(e);
                          }
                        }}
                        fullWidth
                        variant="outlined"
                        required
                      />
                    ) : null}
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
                className="update"
                onClick={handleUpdate}
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
              Are you sure you want to delete this Booking?
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
                onClick={handleConfirmDelete}
                className="delete1"
                sx={{backgroundColor:"red"}}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Add BookingModal  */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Booking
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="name"
                  name="name"
                  value={addFormData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabets and spaces (optional)
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleAddInputChange("name")(e);
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  value={addFormData.email}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Always update input value
                    handleAddInputChange("email")(e);

                    // Optional: validate separately if needed
                    if (
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        value
                      )
                    ) {
                      console.log("Valid email");
                      handleAddInputChange("email")(e);
                    } else {
                      console.log("Invalid email");
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile No"
                  name="mobileNo"
                  type="Number"
                  value={addFormData.mobileNo}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleAddInputChange("mobileNo")(e);
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value.length !== 10) {
                      alert("Phone number must be exactly 10 digits");
                      // Optionally reset or mark as error
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="address"
                  name="address"
                  value={addFormData.address}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Allow blank or values starting with A-Za-z1-9
                    if (value === "" || /^[a-zA-Z0-9]*$/.test(value)) {
                      // Auto-capitalize first letter

                      value = value.charAt(0).toUpperCase() + value.slice(1);
                    } else {
                      return;
                    }

                    // Use updated value
                    handleAddInputChange("address")({
                      ...e,
                      target: { ...e.target, value },
                    });
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="check_in_date"
                  type="Date"
                  name="check_in_date"
                  // type="number"
                  value={addFormData.check_in_date}
                  onChange={handleAddInputChange("check_in_date")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="check_out_date"
                  name="check_out_date"
                  type="Date"
                  // type="number"
                  value={addFormData.check_out_date}
                  onChange={handleAddInputChange("check_out_date")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  name="TotalAmountUnit"
                  type="number"
                  value={addFormData.TotalAmountUnit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleAddInputChange("TotalAmountUnit")(e);
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    label="Payment Status"
                    name="PaymentStatus"
                    value={addFormData.PaymentStatus}
                    onChange={handleAddInputChange("PaymentStatus")}
                    required
                  >
                     <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Failed">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Booking Status</InputLabel>
                  <Select
                    label="Booking status"
                    name="Bookingstatus"
                    value={addFormData.Bookingstatus}
                    onChange={handleAddInputChange("Bookingstatus")}
                    required
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                    onClick={handleAddBooking}
                    className="save"
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)" }}
                  >
                    Save Booking
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
        sx={{mt:-3}}
        count={Bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BookingTable;
