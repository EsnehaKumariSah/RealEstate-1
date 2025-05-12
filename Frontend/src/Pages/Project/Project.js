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

const ProjectTable = () => {
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Projects, setProjects] = useState([]);
  const [addFormData, setAddFormData] = useState({
    ProjectName: "",
    Location: "",
    StartDate: "",
    EndDate: "",
    TotalUnits: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiProjects, setApiProjects] = useState([]);

  const navigate = useNavigate();
  const handleAddProject = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/project/createproject`,
        addFormData
      );
      if (res.data.success) {
        toast.success("Project added successfully!");
        handleCloseAddModal();
        getAllProjects();
        //reset form data
        setAddFormData({
          ProjectName: "",
          Location: "",
          StartDate: "",
          EndDate: "",
          TotalUnits: "",
          status: "",
        });
      }
    } catch (error) {
      console.error("error adding Project", error);
      toast.error(error.res?.data?.message || "failed to add Project");
    }
  };
  const getAllProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/project/getAllProjects`
      );
      console.log(res.data);
      setProjects(res.data);
      setApiProjects(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Project ", selectedProject);

    try {
      const res = await axios.put(
        `http://localhost:3001/project/updateProject/${selectedProject._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProjects();
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
        `http://localhost:3001/project/deleteProject/${selectedProject._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProjects();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Project) => {
    setSelectedProject(Project);
    setViewModalOpen(true);
  };

  const handleEdit = (Project) => {
    setSelectedProject(Project);
    setEditFormData(Project);
    setEditModalOpen(true);
  };

  const handleDelete = (Project) => {
    setSelectedProject(Project);
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
  //   ProjectTitle: "Project Title",
  //   ProjectType: "Project Type",
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
      setProjects(apiProjects); // Reset to full list when search is empty
      return;
    }

    const filtered = apiProjects.filter((Project) => {
      return (
        Project.ProjectName.toLowerCase().includes(value) || // projectTitle = gfdgf.includes(gfdgf)
        Project.Location.toLowerCase().includes(value)
      );
    });

    setProjects(filtered);
  };

  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
  //   const dropdownFields = ["status", "Furnishing", "ProjectType"]; // edit model mein drop down ke liye ye easy pdega

  // const dropdownOptions = {
  //   status: ["Available", "Sold", "Rented","Pending"],
  //   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
  //   ProjectType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
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
          Add Project
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
                background: "white",
                position: "sticky",
                fontWeight: "bold",
                top: 0,
                zIndex: 2,
              }}
            >
              {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
              <TableRow className="bg-gray-200" border="1px solid black">
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  S.No
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  projectName
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  location
                </TableCell>
               
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  {" "}
                  startDate
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  endDate
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  totalUnits
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Projects.length > 0 &&
                Projects.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((Project, index) => (
                  <TableRow
                    key={Project.id}
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
                        padding: "16px",
                      }}
                      className="border p-2"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Project.ProjectName}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Project.Location}
                    </TableCell>
                   
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Project.StartDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Project.EndDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Project.TotalUnits}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                      className="border p-2"
                    >
                      {Project.status}
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
                          onClick={() => handleView(Project)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "grey" }}
                          className="edit"
                          onClick={() => handleEdit(Project)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          className="delete"
                          onClick={() => handleDelete(Project)}
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
                Project Details
              </Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedProject && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedProject)
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
              <Typography variant="h6">Edit Project</Typography>
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
                        <InputLabel>status</InputLabel>
                        <Select
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          label="Status"
                        >
                             <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Sold">Sold</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "StartDate" ? (
                      <TextField
                        fullWidth
                        name="StartDate"
                        type="Date"
                        value={editFormData[field] || ""}
                        onChange={(e) => handleEditInputChange(field)(e)}
                        required
                      />
                    ) : field === "EndDate" ? (
                      <TextField
                        fullWidth
                        name="EndDate"
                        type="Date"
                        value={editFormData[field] || ""}
                        onChange={(e) => handleEditInputChange(field)(e)}
                        required
                      />
                    ) : field === "ProjectName" ? (
                      <TextField
                        label="ProjectName"
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
                    )  : field === "Location" ? (
                      <TextField
                        label="location"
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (field === "Location") {
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
                    ) : field === "TotalUnits" ? (
                      <TextField
                        label="TotalUnits"
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
              Are you sure you want to delete this Project?
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

        {/* Add Project Modal  */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Project
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="projectName"
                  name="ProjectName"
                  value={addFormData.ProjectName}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabets and spaces (optional)
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleAddInputChange("ProjectName")(e);
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="location"
                  name="Location"
                  value={addFormData.Location}
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
                    handleAddInputChange("Location")({
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
                  label="startDate"
                  name="StartDate"
                  type="date"
                  value={addFormData.StartDate}
                  onChange={handleAddInputChange("StartDate")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="endDate"
                  name="EndDate"
                  type="date"
                  value={addFormData.EndDate}
                  onChange={handleAddInputChange("EndDate")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="TotalUnits"
                  name="TotalUnits"
                  value={addFormData.totalUnits}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleAddInputChange("TotalUnits")(e);
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
                    name="status"
                    value={addFormData.status}
                    onChange={handleAddInputChange("status")}
                    required
                  >
                    <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Sold">Sold</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="standard"
                    onClick={handleCloseAddModal}
                    sx={{ color: "white", backgroundColor: "grey" }}
                    className="cancle"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className="save"
                    onClick={handleAddProject}
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)" }}
                  >
                    Save Project
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
        count={Projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ProjectTable;
