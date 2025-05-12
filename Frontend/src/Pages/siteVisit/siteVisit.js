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

const SiteTable = () => {
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
  const [SelectedSites, setSelectedSites] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Sites, setSites] = useState([]);
  const [addFormData, setAddFormData] = useState({
    Property_Id: "",
    Visitor_name: "",
    Contact_no: "",
    Agent_Id: "",
    Sheduled_date: "",
    Visit_status: "Sheduled",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSites, setApiSites] = useState([]);

  const navigate = useNavigate();
  const handleAddSite = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/siteVisit/createSiteVisit`,
        addFormData
      );
      if (res.data.success) {
        toast.success("Site added successfully!");
        handleCloseAddModal();
        getAllSiteVisit();
        //reset form data
        setAddFormData({
          Property_Id: "",
          Visitor_name: "",
          Contact_no: "",
          Agent_Id: "",
          Sheduled_date: "",
          Visit_status: "Sheduled",
        });
      }
    } catch (error) {
      console.error("error adding Site", error);
      toast.error(error.response?.data?.message || "failed to add Site");
    }
  };
  const getAllSiteVisit = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/siteVisit/getAllSiteVisit`);
      console.log(res.data);
      setSites(res.data);
      setApiSites(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllSiteVisit();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Site", SelectedSites);

    try {
      const res = await axios.put(
        `http://localhost:3001/siteVisit/updateSiteVisit/${SelectedSites._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSiteVisit();
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
        `http://localhost:3001/siteVisit/deleteSiteVisit/${SelectedSites._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSiteVisit();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Site) => {
    setSelectedSites(Site);
    setViewModalOpen(true);
  };

  const handleEdit = (Site) => {
    setSelectedSites(Site);
    setEditFormData(Site);
    setEditModalOpen(true);
  };

  const handleDelete = (Site) => {
    setSelectedSites(Site);
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
  //   SiteTitle: "SiteTitle",
  //   SiteType: "SiteType",
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
      setSites(apiSites); // Reset to full list when search is empty
      return;
    }

    const filtered = apiSites.filter((Site) => {
      return (
        Site.Property_Id.toLowerCase().includes(value) ||
        Site.visitor_name.toLowerCase().includes(value) || // Name = gfdgf.includes(gfdgf)
        Site.Agent_ID.toLowerCase().includes(value) ||
        Site.Contact_no.toString().toLowerCase().includes(value)
      );
    });

    setSites(filtered);
  };

  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
  //   const dropdownFields = ["status", "Furnishing", "SiteType"]; // edit model mein drop down ke liye ye easy pdega

  // const dropdownOptions = {
  //   status: ["Available", "Sold", "Rented","Pending"],
  //   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
  //   SiteType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
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
          onClick={handleOpenAddModal}
          className="button"
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
          Add Site
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
                  propertyId
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  visitorsName
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  contactNo
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  agentId{" "}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  scheduleDate
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  visitStatus
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
              {Sites.length > 0 &&
                Sites.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((Site, index) => (
                  <TableRow
                    key={Site.id}
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
                      {Site.Property_Id}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Site.Visitor_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Site.Contact_no}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Site.Agent_Id}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Site.Sheduled_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Site.Visit_status}
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
                          onClick={() => handleView(Site)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "grey" }}
                          className="edit"
                          onClick={() => handleEdit(Site)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          className="delete"
                          onClick={() => handleDelete(Site)}
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
                SiteDetails
              </Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {SelectedSites && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(SelectedSites)
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
              <Typography variant="h6">Edit Site</Typography>
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
                    {field === "Visit_status" ? (
                      <FormControl fullWidth>
                        <InputLabel>visitStatus</InputLabel>
                        <Select
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          label="visitStatus"
                        >
                             <MenuItem value="Scheduled">Scheduled</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Cancled">Cancled</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "Contact_no" ? (
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
                    ) : field === "Property_Id" ? (
                      <TextField
                        label="propertyId"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (field === "Property_Id") {
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
                    ) : field === "Agent_Id" ? (
                      <TextField
                        label="agentId"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (field === "Agent_Id") {
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
                    ) : field === "Sheduled_date" ? (
                      <TextField
                        fullWidth
                        name="scheduleDate"
                        type="Date"
                        value={editFormData[field] || ""}
                        onChange={(e) => handleEditInputChange(field)(e)}
                        required
                      />
                    ) : field === "Visitor_name" ? (
                      <TextField
                        label="visitorsName"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow only alphabets and spaces (optional)
                          if (/^[a-zA-Z\s]*$/.test(value)) {
                            handleEditInputChange(field)(e);
                          }
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
                onClick={handleCloseEditModal}
                className="cancle"
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
              Are you sure you want to delete this Site?
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
                className="delete1"
                sx={{backgroundColor:"red"}}
               
                onClick={handleConfirmDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Add SiteModal  */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Site
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="propertyId"
                  name="Property_Id"
                  value={addFormData.Property_Id}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Allow blank or values starting with A-Za-z1-9
                    if (value === "" || /^[a-zA-Z0-9]*$/.test(value)) {
                      // Auto-capitalize first letter

                      value = value.charAt(0).toUpperCase() + value.slice(1);
                    } else {
                      return;
                    }
                    handleAddInputChange("Property_Id")({
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
                  label="visitorsName"
                  name="Visitor_name"
                  value={addFormData.Visitor_name}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabets and spaces (optional)
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleAddInputChange("Visitor_name")(e);
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="contactNo"
                  name="Contact_no"
                  type="Number"
                  value={addFormData.Contact_no}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleAddInputChange("Contact_no")(e);
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
                  label="Agent_Id"
                  name="Agent_Id"
                  value={addFormData.Agent_Id}
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
                    handleAddInputChange("agentId")({
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
                  label="scheduleDate"
                  type="date"
                  name="Sheduled_date"
                  value={addFormData.Sheduled_date}
                  onChange={handleAddInputChange("Sheduled_date")}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Site Status</InputLabel>
                  <Select
                    label="visitStatus"
                    name="Visit_status"
                    value={addFormData.Visit_status}
                    onChange={handleAddInputChange("visitStatus")}
                    required
                  >
                        <MenuItem value="Scheduled">Scheduled</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Cancled">Cancled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="standard"
                    className="cancle"
                    onClick={handleCloseAddModal}
                    sx={{ color: "white", backgroundColor: "grey" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddSite}
                    className="save"
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)" }}
                  >
                    Save Site
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
        count={Sites.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SiteTable;
