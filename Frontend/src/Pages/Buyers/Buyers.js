import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableCell,
  Select,
  MenuItem,
  IconButton,
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  TableContainer,
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
      Room: "Normal",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "9876543210",
      address: "Ranchi",
      Room: "Delux",
      status: "InActive",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "8765432109",
      address: "Jamshedpur",
      Room: "luxury",
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
  const [selectedbuyers, setSelectedbuyers] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [buyers, setBuyers] = useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const[apiBuyers,setApiBuyers]=useState([]);
  const [addFormData,setAddFormData] =useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    Room: '',
    status:'Active',
    })
    const [addModalOpen,setAddModalOpen]=useState(false);
  
    const navigate =useNavigate();

  const getAllBuyers = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/buyers/getAllBuyers`);
      console.log("response", res.data);
      setBuyers(res.data);
      setApiBuyers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBuyers();
  }, []);
  const handleView = (buyers) => {
    setSelectedbuyers(buyers);
    setViewModalOpen(true);
  };

  const handleEdit = (buyers) => {
    setSelectedbuyers(buyers);
    setEditFormData(buyers);
    setEditModalOpen(true);
  };

  const handleDelete = (buyers) => {
    setSelectedbuyers(buyers);
    setDeleteModalOpen(true);
  };
  const handleAddNew=()=>{
    setAddModalOpen(true);
  }
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedbuyers(null);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedbuyers(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedbuyers(null);
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
  const handleAddBuyers = async () => {
    try {
      const response = await axios.post('http://localhost:3001/buyers/createBuyers', addFormData);
      if (response.data.success) {
        toast.success('buyers added successfully!');
        handleCloseAddModal();
        getAllBuyers();
        // Reset form data
        setAddFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          Room: '',
          status:'Active',
          
        });
      }
    } catch (error) {
      console.error('Error adding buyers:', error);
      toast.error(error.response?.data?.message || 'Failed to add buyers');
    }
  };
  // input
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(
       ` http://localhost:3001/buyers/updateBuyers/${selectedbuyers._id}`, editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBuyers();
        setEditFormData({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  const handleConfirmDelete = async () => {
    // Here you would typically make an API call to delete the property
    handleCloseDeleteModal();
    try{
      const res=await axios.delete(`http://localhost:3001/buyers/deleteBuyers/${selectedbuyers._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        getAllBuyers();
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
  const handleSearchChange = (e) => {
    console.log("target", e.target);
    
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
        setBuyers(apiBuyers); // Reset to full list when search is empty
        return;
    }

    const filtered = apiBuyers.filter((buyer) => {
      return (
        buyer.name.toLowerCase().includes(value) ||   // propertyTitle = gfdgf.includes(gfdgf)
        buyer.address.toLowerCase().includes(value) ||
        buyer.email.toLowerCase().includes(value) ||
        buyer.Room.toLowerCase().includes(value) ||
        buyer.phone.toString().toLowerCase().includes(value)
      );
    });

    setBuyers(filtered);
};
  return (
    <>
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
              <InputAdornment position="start">
                <SearchIcon  sx={{color:"blue"}}/>
              </InputAdornment>
            ),
          }}
          style={{
            marginBottom: "20px",
            width: "160px",
            display: "flex",
            marginRight: "200px",
            justifyContent: "flex-end",
            marginLeft: "650px",
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
           // padding: "10px 10px 10px 10px",
            borderRadius: "5px",
            height: "50px",
            width: "130px",
          }}
        >
          Add Buyers
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1070 }}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}
          >
            <TableRow className="bg-gray-200">
              {[
                "S.No",
                "Name",
                "email",
                "Phone No.",
                "Address",
                "Room No.",
                "Status",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  className="border p-2"
                  sx={{ fontWeight: "bold" ,paddingLeft:"20px"}}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {buyers.map((buyer,index) => (
              <TableRow key={buyer._id} className="text-center">
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center", }}
                  className="border p-2"
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {buyer.name}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {buyer.email}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {buyer.phone}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {buyer.address}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {buyer.Room}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  
                    {buyer.status}
                  
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  <TableContainer
                    style={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      sx={{ color: "blue" }}
                      onClick={() => handleView(buyer)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "green" }}
                      onClick={() => handleEdit(buyer)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(buyer)}
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
              <Typography variant="h6">buyers Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedbuyers && (
              <Grid container spacing={2}>
                {Object.entries(selectedbuyers)
              .filter(([field]) => field !== "_id" && field !== "_id" && field !== "__v" && field !== "createdAt"&& field !=="updatedAt")          
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
              <Typography variant="h6">Edit buyers</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              {Object.keys(editFormData)
              .filter((field) => field !== "_id" && field !== "createdAt" && field !== "updatedAt" && field !== "__v")
              .map(
                (field) =>
                  field !== "id" && (
                    <Grid item xs={12} sm={6} key={field}>
                      { field==="status"?(
                        <FormControl fullWidth >
                          <InputLabel>
                          Status
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field]|| ""}
                          onChange={handleEditInputChange(field)}
                          >
                             <MenuItem value="Active">Active</MenuItem>
                             <MenuItem value="InActive">InActive</MenuItem>
                          </Select>
                        </FormControl>
                      ):(
                      <TextField
                        fullWidth
                        label={field}
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
              Are you sure you want to delete this Buyers?
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
           {/* add buyers model */}
           <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Buyers</Typography>
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
                label="Room"
                name="room"
                value={addFormData.Room}
                onChange={handleAddInputChange('Room')}
                required
              />
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
                  onClick={handleAddBuyers}
                >
                  Save Buyers
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
