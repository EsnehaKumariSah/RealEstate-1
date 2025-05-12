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
  Phone,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AgentTable = () => {
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
  const [SelectedAgents, setSelectedAgents] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Agents, setAgents] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    license: "",
    Experience: "",
    Rate: "",
    status: "Available",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiAgents, setApiAgents] = useState([]);

  const navigate = useNavigate();
  const handleAddAgent = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/agent/createAgent",
        addFormData
      );
      if (res.data.success) {
        toast.success("Agent added successfully!");
        handleCloseAddModal();
        getAllAgent();
        //reset form data
        setAddFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          license: "",
          Experience: "",
          Rate: "",
          status: "Available",
        });
      }
    } catch (error) {
      console.error("error adding Agent", error);
      toast.error(error.response?.data?.message || "failed to add Agent");
    }
  };
  const getAllAgent = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/agent/getAllAgent`);
      console.log(res.data);
      setAgents(res.data);
      setApiAgents(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllAgent();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Agent", SelectedAgents);

    try {
      const res = await axios.put(
        `http://localhost:3001/agent/updateAgent/${SelectedAgents._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllAgent();
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
        `http://localhost:3001/agent/deleteAgent/${SelectedAgents._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllAgent();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (agent) => {
    setSelectedAgents(agent);
    setViewModalOpen(true);
  };

  const handleEdit = (agent) => {
    setSelectedAgents(agent);
    setEditFormData(agent);
    setEditModalOpen(true);
  };

  const handleDelete = (agent) => {
    setSelectedAgents(agent);
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
  //   AgentTitle: "AgentTitle",
  //   AgentType: "AgentType",
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
      setAgents(apiAgents); // Reset to full list when search is empty
      return;
    }

    const filtered = apiAgents.filter((agent) => {
      return (
        agent.name.toLowerCase().includes(value) ||
        agent.email.toLowerCase().includes(value) ||
        agent.phone.toString().toLowerCase().includes(value) ||
        agent.address.toLowerCase().includes(value) ||
        agent.license.toString().toLowerCase().includes(value) ||
        agent.Experience.toLowerCase().includes(value) ||
        agent.Rate.toString().toLowerCase().includes(value)
      );
    });

    setAgents(filtered);
  };

  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
  //   const dropdownFields = ["status", "Furnishing", "AgentType"]; // edit model mein drop down ke liye ye easy pdega

  // const dropdownOptions = {
  //   status: ["Available", "Sold", "Rented","Pending"],
  //   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
  //   AgentType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
  // };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // always right align
          flexWrap: "wrap", // wrap on small screens
          gap: 2,
          mt: -1,
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
          Add Agent
        </Button>
      </Box>

      <div className="table">
        <TableContainer
          component={Paper}
          style={{
            marginTop: "0px",
            maxHeight: "400px",
            overflow: "auto",
            maxWidth: 1500,
            whiteSpace: "nowrap",
            zIndex: 5,
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
                zIndex: 5,
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
                  Address
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Phone{" "}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  License
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Experience
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Commision Rate
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
              {Agents.length > 0 &&
                Agents.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((agent, index) => (
                  <TableRow
                    key={agent.id}
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
                      {agent.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                   {agent.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                       {agent.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                       {agent.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {agent.license}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {agent.Experience}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {agent.Rate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {agent.status}
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
                          onClick={() => handleView(agent)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "grey" }}
                          className="edit"
                          onClick={() => handleEdit(agent)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                           className="delete"
                          onClick={() => handleDelete(agent)}
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
                Agent Details
              </Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {SelectedAgents && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(SelectedAgents)
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
              <Typography variant="h6">Edit Agent</Typography>
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
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          label="status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="InActive">InActive</MenuItem>
                        </Select>
                      </FormControl>
                    )
                    : field === "name" ? (
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
                    ) : field === "license" ? (
                      <TextField
                        fullWidth
                        label="license"
                        name="license"
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
                    ) : field === "Experience" ? (
                      <TextField
                        fullWidth
                        label="Experience"
                        name="Experience"
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
                    ) : field === "Rate" ? (
                      <TextField
                        fullWidth
                        label="Rate"
                        name="Rate"
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
                        fullWidth
                        label={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                      />
                    )}
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
              Are you sure you want to delete this Agent?
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
                color="error"
                sx={{backgroundColor:"red"}}
                onClick={handleConfirmDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Add AgentModal  */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Agent
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              <TextField
                      fullWidth
                      label="Name"
                      name="name"
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
                      label="License"
                      name="license"
                      value={addFormData.license}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) > 0) {
                          handleAddInputChange("license")(e);
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Experience"
                      name="Experience"
                      value={addFormData.Experience}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) > 0) {
                          handleAddInputChange("Experience")(e);
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Rate"
                      name="Rate"
                      value={addFormData.Rate}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) > 0) {
                          handleAddInputChange("Rate")(e);
                        }
                      }}
                      required
                    />
                  </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="Status"
                    value={addFormData.Status}
                    onChange={handleAddInputChange("Status")}
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
                    className="save"
                    onClick={handleAddAgent}
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)" }}
                  >
                    Save Agent
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
        count={Agents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AgentTable;
