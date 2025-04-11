import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TableContainer,
  IconButton,
  Paper,
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
  import {useNavigate} from 'react-router-dom';
  

 
const TableWithDropdown = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "23467889",
      address: "Adityapur",
      license: "2243567",
      Experience: "10 y",
      Rate: "5000",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "9876543210",
      address: "Ranchi",
      license: "567889",
      Experience: "9 y",
      Rate: "3000",
      status: "InActive",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "8765432109",
      address: "Jamshedpur",
      license: "756653",
      Experience: "15 y",
      Rate: "6500",
      status: "Active",
    },
  ]);

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
    maxHeight: "70vh",
    overflow: "auto",
  };

  const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    textAlign: "center",
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [agents, setAgents] = useState([]);
  const[ searchTerm , setSearchTerm] = useState("");
  const [apiAgents , setApiAgents]= useState([]);
  const [addFormData,setAddFormData] =useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    license: '',
    Experience:'',
    Rate:'',
    status: 'Available',
  })
  const [addModalOpen,setAddModalOpen]=useState(false);

  const navigate =useNavigate();

  const getAllAgent = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/agent/getAllAgent`);
      console.log("response", res.data);
      setAgents(res.data);
      setApiAgents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAgent();
  }, []);
  //  const getAllProperty = async () => {
  //    try {
  //      const res = await axios.get(
  //        `http://localhost:3001/property/getAllProperty`
  //      );
  //      console.log("response", res.data);
  //      setProperties(res.data);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };
  //  useEffect(() => {
  //    getAllProperty();
  //  }, []);
  const handleView = (agent) => {
    setSelectedAgent(agent);
    setViewModalOpen(true);
  };

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setEditFormData(agent);
    setEditModalOpen(true);
  };

  const handleDelete = (agent) => {
    setSelectedAgent(agent);
    setDeleteModalOpen(true);
  };
const handleAddNew=()=>{
  setAddModalOpen(true);
}
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedAgent(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedAgent(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedAgent(null);
  };
  const handleCloseAddModal =()=> setAddModalOpen(false);

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
  };
  const handleAddInputChange =(field) => (event) =>{
    setAddFormData({
      ...addFormData,
      [field]:event.target.value,
    });
  };
  const handleAddAgent = async () => {
    try {
      const response = await axios.post('http://localhost:3001/agent/createAgent', addFormData);
      if (response.data.success) {
        toast.success('Agent added successfully!');
        handleCloseAddModal();
        getAllAgent();
        // Reset form data
        setAddFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          license: '',
          Experience:'',
          Rate:'',
          status: 'Available',
        });
      }
    } catch (error) {
      console.error('Error adding Agent:', error);
      toast.error(error.response?.data?.message || 'Failed to add agent');
    }
  };
 const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(
       ` http://localhost:3001/agent/updateAgent/${selectedAgent._id}`, editFormData
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
    try{
    const res=await axios.delete(`http://localhost:3001/agent/deleteAgent/${selectedAgent._id} `);
    if(res.data.success){
      toast.success(res.data.message);
      getAllAgent();
    }
    }catch(error){
       console.log(error);
        toast.error(error.response.data.message);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };
 const handleSearchChange =(e) =>{
  console.log("target",e.target);

  const value = e.target.value.toLowerCase();
  setSearchTerm(value);
  
  if(value ===""){
    setAgents(apiAgents);
    return;
  }
  const filtered = apiAgents.filter((agent) =>{
    return(
      agent.name.toLowerCase().includes(value)||
      agent.email.toLowerCase().includes(value)||
      agent.phone.toString().toLowerCase().includes(value)||
      agent.address.toLowerCase().includes(value)||
      agent.license.toString().toLowerCase().includes(value)||
      agent.Experience.toLowerCase().includes(value)||
      agent.Rate.toString().toLowerCase().includes(value)
    );
  });
  setAgents(filtered);
 };
  return (
   
    <>
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      paddingTop:"-100",
      marginTop:"0"
    }}
  >
    <Typography variant="h6">AgentTable</Typography>
      <div className="flex">
     
        <TextField
          //   className='search'
          
          label="Search"
          variant="outlined"
          // fullWidth
          value={searchTerm}
           onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{color:"blue"}} position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            marginBottom: "20px",
            width: "160px",
            display: "flex",
            marginRight: "200px",
            justifyContent: "flex-end",
            marginLeft: "600px",
          }}
        />
       
       
        

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          // color="primary"
        onClick={handleAddNew}

          style={{
            textAlign: "center",
            marginBottom: "20px",
            display: "flex",
            textWrap: "nowrap",
            marginRight: "50px",
            //padding: "10px 10px 10px 10px",
            borderRadius: "5px",
            height: "50px",
            width: "130px",
          }}
        >
          Add Agent
        </Button>
      </div>
       </div>
      
  {/* <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      paddingTop:"0"
    }}
  >
    <Typography variant="h6">AgentTable</Typography>

    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ color: "blue" }} position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ width: "60px", marginRight:"20px",marginleft:"150px" }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        // color="primary"
        onClick={handleAddNew}
        style={{
          borderRadius: "5px",
          height: "50px",
          width: "130px",
          whiteSpace: "nowrap",
          marginRight:"20px",
          width:"200px",
            Color:"blue"
        }}
      >
        Add Agent
      </Button>
    </div>
  </div>
</> */}

      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1070 }}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{
              background: "white",
              zIndex: 2,
              top: "0",
              position: "sticky",
              whiteSpace: "nowrap",
            }}
          >
            <TableRow className="bg-gray-200">
              {[
                "S.No",
                "Name",
                "email",
                "Phone No.",
                "Address",
                "License no.",
                "Experience",
                "Commission Rate",
                "Status",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  className="border p-2"
                  sx={{ fontWeight: "bold", flex: "1", whiteSpace: "nowrap" ,paddingLeft:"20px"}}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.map((agent,index) => (
              <TableRow
                key={agent._id}
                className="text-center"
                sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {index +1}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.name}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.email}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.phone}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.address}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.license}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.Experience}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {agent.Rate}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                    {agent.status}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
                  <TableContainer
                    style={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      sx={{ color: "blue" }}
                      fontweight="bolder"
                      onClick={() => handleView(agent)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "green" }}
                      onClick={() => handleEdit(agent)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(agent)}
                    >
                      <Delete />
                    </IconButton>
                  </TableContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* View Modal */}
        <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
          <Box sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Agent Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedAgent && (
              <Grid container spacing={2}>
                {Object.entries(selectedAgent)
                 .filter(([field]) => field !== "_id" && field !== "__v" && field !== "createdAt"&& field !=="updatedAt")
                .map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="subtitle1">
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Edit Agent</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} >
              {Object.keys(editFormData)
              .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id" )
              .map( (field) =>(
                //   field !== "id" && (
                    <Grid item xs={6}  key={field}>
                     {field==="status"? (
                      <FormControl fullWidth variant="outlined" >
                        <InputLabel>
                        Status
                        </InputLabel>
                        <Select
                        value={editFormData[field]|| ""}
                        variant="outlined"
                        onChange={handleEditInputChange(field)}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="InActive"> InActive</MenuItem>
                        </Select>
                      </FormControl>
                     ):(
                      <TextField
                        fullWidth
                        label={field.charAt(0).toUpperCase()+ field.slice(1)}
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                      />
                     )}
                    </Grid>
                  )
              )}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button variant="outlined" onClick={handleCloseEditModal}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Delete Modal */}
        <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
          <Box sx={deleteModalStyle}>
            <Typography variant="h6" gutterBottom>
              Confirm Delete
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Are you sure you want to delete this agent?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* add agent model */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Agent</Typography>
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
                onChange={handleAddInputChange('name')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="email"
                name="email"
                value={addFormData.email}
                onChange={handleAddInputChange('email')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={addFormData.phone}
                onChange={handleAddInputChange('phone')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={addFormData.address}
                onChange={handleAddInputChange('address')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="License"
                name="license"
                value={addFormData.license}
                onChange={handleAddInputChange('license')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience"
                name="Experience"
                value={addFormData.Experience}
                onChange={handleAddInputChange('Experience')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rate"
                name="Rate"
                value={addFormData.Rate}
                onChange={handleAddInputChange('Rate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={addFormData.status}
                  onChange={handleAddInputChange('status')}
                  
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
                  variant="outlined" 
                  onClick={handleCloseAddModal}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleAddAgent}
                >
                  Save Agent
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      </TableContainer>
    </>
    
  );
};

export default TableWithDropdown;
