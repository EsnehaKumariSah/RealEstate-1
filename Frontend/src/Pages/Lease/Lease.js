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

const LeaseTable = () => {
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
  const [selectedLease, setSelectedLease] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Leases, setLeases] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    StartDate: "",
    EndDate: "",
    MonthlyRent: "",
    Deposite: "",
    status: "",
    Lstatus: "Active",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiLeases, setApiLeases] = useState([]);

  const navigate = useNavigate();
  const handleAddLease = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/Lease/createLease`,
        addFormData
      );
      if (res.data.success) {
        toast.success("Lease added successfully!");
        handleCloseAddModal();
        getAllLease();
        //reset form data
        setAddFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          StartDate: "",
          EndDate: "",
          MonthlyRent: "",
          Deposite: "",
          status: "",
          Lstatus: "Active",
        });
      }
    } catch (error) {
      console.error("error adding Lease", error);
      toast.error(error.res?.data?.message || "failed to add Lease");
    }
  };
  const getAllLease = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/Lease/getAllLease`);
      console.log(res.data);
      setLeases(res.data);
      setApiLeases(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllLease();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Lease ", selectedLease);

    try {
      const res = await axios.put(
        `http://localhost:3001/Lease/updateLease/${selectedLease._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllLease();
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
        `http://localhost:3005/Lease/deleteLease/${selectedLease._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllLease();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Lease) => {
    setSelectedLease(Lease);
    setViewModalOpen(true);
  };

  const handleEdit = (Lease) => {
    setSelectedLease(Lease);
    setEditFormData(Lease);
    setEditModalOpen(true);
  };

  const handleDelete = (Lease) => {
    setSelectedLease(Lease);
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

  //   // Add all other fields you want to show with custom labels
  // };

  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setLeases(apiLeases); // Reset to full list when search is empty
      return;
    }

    const filtered = apiLeases.filter((lease) => {
      return (
        lease.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        lease.email.toLowerCase().includes(value) ||
        lease.phone.toString().toLowerCase().includes(value) ||
        lease.address.toLowerCase().includes(value) ||
        lease.StartDate.toLowerCase().includes(value) ||
        lease.EndDate.toLowerCase().includes(value) ||
        lease.MonthlyRent.toString().toLowerCase().includes(value) ||
        lease.Deposite.toString().toLowerCase().includes(value)
      );
    });

    setLeases(filtered);
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
          className="button"
          startIcon={<AddIcon />}
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
          Add Lease
        </Button>
      </Box>

      <div className="table">
        <TableContainer
          component={Paper}
          style={{
            marginTop: "0px",
            maxHeight: "400px",
            overflow: "auto",
            maxWidth: 1300,
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
                  {" "}
                  Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Phone
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
                  {" "}
                  Start Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  End Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  {" "}
                  Monthly Rent
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Deposit
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
                  {" "}
                  Lease Status
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
              {Leases.length > 0 &&
                Leases.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((Lease, index) => (
                  <TableRow
                    key={Lease.id}
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
                      {Lease.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.StartDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.EndDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.MonthlyRent}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.Deposite}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Lease.Lstatus}
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
                          fontweight="bolder"
                          className="view"
                          onClick={() => handleView(Lease)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "grey" }}
                          className="edit"
                          onClick={() => handleEdit(Lease)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          className="delete"
                          onClick={() => handleDelete(Lease)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* View Modal */}
          <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
            <Box sx={modalStyle}>
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Lease Details
                </Typography>
                <IconButton onClick={handleCloseViewModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {selectedLease && (
                <Grid container spacing={2} mt={2}>
                  {Object.entries(selectedLease)
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
                <Typography variant="h6">Edit Lease</Typography>
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
                      {/* Payment Status Dropdown */}
                      {field === "status" ? (
                        <FormControl fullWidth>
                          <InputLabel>Payment Status</InputLabel>
                          <Select
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            label="Payment Status"
                          >
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Unpaid">Unpaid</MenuItem>
                            <MenuItem value="Partial">Partial</MenuItem>
                          </Select>
                        </FormControl>
                      ) : field === "EndDate" ? (
                        <TextField
                          fullWidth
                          //label=" LeaseEndDate"
                          name="EndDate"
                          type="Date"
                          value={editFormData[field] || ""}
                          onChange={(e) => handleEditInputChange(field)(e)}
                          required
                        />
                      ) : field === "StartDate" ? (
                        <TextField
                          fullWidth
                          //label=" LeaseEndDate"
                          name="StartDate"
                          type="Date"
                          value={editFormData[field] || ""}
                          onChange={(e) => handleEditInputChange(field)(e)}
                          required
                        />
                      ) : field === "LStatus" ? (
                        /* Lease Status Dropdown */
                        <FormControl fullWidth>
                          <InputLabel>Lease Status</InputLabel>
                          <Select
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            label="Lease Status"
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
                            <MenuItem value="Terminated">Terminated</MenuItem>
                          </Select>
                        </FormControl>
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
                            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                              handleEditInputChange("email")(e);
                            }
                          }}
                          fullWidth
                          variant="outlined"
                        />
                      ) : field === "phone" ? (
                        <TextField
                          label="phone"
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
                      ) : field === "MonthlyRent" ? (
                        <TextField
                          label="MonthlyRent"
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
                      ) : field === "Deposit" ? (
                        <TextField
                          label="Deposit"
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
                      ) : field === "address" ? (
                        <TextField
                          label="Address"
                          value={editFormData[field] || ""}
                          onChange={(e) => {
                            let value = e.target.value;

                            if (field === "address") {
                              // Allow blank or values starting with A-Za-z1-9
                              if (value === "" || /^[A-Za-z1-9]/.test(value)) {
                                // Auto-capitalize first letter

                                value =
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1);
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
                Are you sure you want to delete this Lease?
              </Typography>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="standard"
                  className="cancle"
                  onClick={handleCloseDeleteModal}
                  sx={{ color: "white", backgroundColor: "grey" }}
                >
                  CANCLE
                </Button>
                <Button
                  variant="contained"
                  className="delete1"
                  color="error"
                  sx={{backgroundColor:"red"}}
                  onClick={handleConfirmDelete}
                >
                  DELETE
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Add Lease Modal  */}
          <Modal open={addModalOpen} onClose={handleCloseAddModal}>
            <Box sx={modalStyle}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Add New Lease
                </Typography>
                <IconButton onClick={handleCloseAddModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    value={addFormData.email}
                    onChange={(e) => {
                      const value = e.target.value;
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mobile No"
                    name="phone"
                    value={addFormData.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        handleAddInputChange("phone")(e);
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
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
                    // label="LeaseStartDate"
                    name="StartDate"
                    type="Date"
                    value={addFormData.StartDate}
                    onChange={handleAddInputChange("StartDate")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    //label=" LeaseEndDate"
                    name="EndDate"
                    type="Date"
                    value={addFormData.EndDate}
                    onChange={handleAddInputChange("EndDate")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label=" MonthlyRent"
                    name="MonthlyRent"
                    type="number"
                    value={addFormData.MonthlyRent}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleAddInputChange("MonthlyRent")(e);
                      }
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label=" Deposit"
                    name="Deposit"
                    // type="number"
                    value={addFormData.Deposit}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleAddInputChange("Deposit")(e);
                      }
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="furnishing-label">
                      Payment Status
                    </InputLabel>
                    <Select
                      name="status"
                      label="Payment Status"
                      value={addFormData.status}
                      onChange={handleAddInputChange("status")}
                      required
                    >
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Unpaid">Unpaid</MenuItem>
                      <MenuItem value="Partial">Partial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="furnishing-label">Lease Status</InputLabel>
                    <Select
                      labelId="furnishing-label"
                      label="Lease Status"
                      name="LStatus"
                      value={addFormData.LStatus}
                      onChange={handleAddInputChange("LStatus")}
                      required
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Expired">Expired</MenuItem>
                      <MenuItem value="Terminated">Terminated</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                      variant="standard"
                      onClick={handleCloseAddModal}
                      className="cancle"
                      sx={{ backgroundColor: "grey", color: "white" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="save"
                      onClick={handleAddLease}
                      sx={{ ml: 2, backgroundColor: "rgb(4, 4,40)" }}
                    >
                      Save Lease
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        sx={{mt:-3}}
        count={Leases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default LeaseTable;
