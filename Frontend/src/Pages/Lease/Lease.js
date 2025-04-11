import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  Paper,
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
      StartDate: "1st jan",
      EndDate: " 1th april ",
      MonthlyRent: "5000",
      Deposite: "2000",
      status: "Pending",
      Lstatus: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "9876543210",
      address: "Ranchi",
      StartDate: "2nd feb",
      EndDate: " 1th march ",
      MonthlyRent: "9000",
      Deposite: "5000",
      status: "Paid",
      Lstatus: "Terminated",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "8765432109",
      address: "Jamshedpur",
      StartDate: "1st jan",
      EndDate: " 1th april ",
      MonthlyRent: "5500",
      Deposite: "2000",
      status: "OverDue",
      Lstatus: "Expired",
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
  const [selectedlease, setSelectedlease] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [leases, setLeases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiLeases, setApiLeases] = useState([]);
  const [addFormData,setAddFormData] =useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    StartDate: '',
    EndDate:'',
    MonthlyRent:'',
    Deposite:'',
    status:'',
    Lstatus: 'Active',
    })
    const [addModalOpen,setAddModalOpen]=useState(false);
  
    const navigate =useNavigate();
  // const getAllLease = async()=>{
  //   try{
  //     const res = await axios.get(`http://localhost:3001/lease/getAllLease`);
  //     console.log("response",res.data);
  //     setLeases(res.data);
  //   } catch(error){
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //      getAllLease();
  //    }, []);
  const getAllLease = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/lease/getAllLease`);
      console.log("response", res.data);
      setLeases(res.data);
      setApiLeases(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllLease();
  }, []);

  const handleView = (lease) => {
    setSelectedlease(lease);
    setViewModalOpen(true);
  };

  const handleEdit = (lease) => {
    setSelectedlease(lease);
    setEditFormData(lease);
    setEditModalOpen(true);
  };

  const handleDelete = (lease) => {
    setSelectedlease(lease);
    setDeleteModalOpen(true);
  };
  const handleAddNew=()=>{
    setAddModalOpen(true);
  }

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
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
  const handleAddLease = async () => {
    try {
      const response = await axios.post('http://localhost:3001/lease/createLease', addFormData);
      if (response.data.success) {
        toast.success('lease added successfully!');
        handleCloseAddModal();
        getAllLease();
        // Reset form data
        setAddFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          StartDate: '',
          EndDate:'',
          MonthlyRent:'',
          Deposite:'',
          status:'',
          Lstatus: 'Active',
        });
      }
    } catch (error) {
      console.error('Error adding lease:', error);
      toast.error(error.response?.data?.message || 'Failed to add lease');
    }
  };
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(
       ` http://localhost:3001/lease/updateLease/${selectedlease._id}`, editFormData
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


  const handleConfirmDelete =  async() => {
   
    handleCloseDeleteModal();
    try{
      const res=await axios.delete(`http://localhost:3001/lease/deleteLease/${selectedlease._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        getAllLease();
      }
    }catch(error){
     console.log(error);
     toast.error(error.response.data.message)
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const handleLStatusChange = (id, newLStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, Lstatus: newLStatus } : row
      )
    );
  };

  // const handleDelete = (id) => {
  //   setData((prevData) => prevData.filter((row) => row.id !== id));
  // };

  // const handleEdit = (id) => {
  //   alert(`Edit function triggered for ID: ${id}`);
  // };

  // const handleView = (id) => {
  //   alert(`View function triggered for ID: ${id}`);
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
        lease.phone.toString().toLowerCase().includes(value)|| 
        lease.address.toLowerCase().includes(value)||
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
              <InputAdornment  sx={{color:"blue"}} position="start">
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
            marginLeft: "650px",
            color:"blue"
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
           //paddingLeft:"10",
            borderRadius: "5px",
            height: "50px",
            width: "130px",
          }}
        >
          Add Lease
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1070 }}
      >
        <Table className="w-full border border-gray-300">
          {/* stickyHeader aria-label="sticky table" sx={{padding:"2px"}} */}
          <TableHead
            sx={{
              position: "sticky",
              top: "0",
              zindex: "2",
              background: "white",
              fontSize: "15px",
            }}
          >
            <TableRow className="bg-gray-200">
              {[
                "S.No",
                "Name",
                "email",
                "Phone No.",
                "Address",
                "Lease Start Date",
                "Lease End Date",
                "Monthly Rent",
                "Security Deposite",
                "Payment Status",
                "Lease Status",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  className="border p-2"
                  sx={{ fontWeight: "bold", flex: "1", whiteSpace: "nowrap",paddingLeft:"20px" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {leases.length > 0 &&
              leases.map((lease,index) => (
                <TableRow
                  key={lease._id}
                  className="text-center"
                  sx={{ whiteSpace: " nowrap" ,paddingLeft:"20px"}}
                >
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                     
                    }}
                    className="border p-2"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.phone}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.address}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.StartDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.EndDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.MonthlyRent}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {lease.Deposite}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                   {lease.status}
                    
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                  {lease.Lstatus}
                    
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
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
                        onClick={() => handleView(lease)}
                        sx={{ color: "blue" }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(lease)}
                        sx={{ color: "green" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(lease)}
                        sx={{ color: "red" }}
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
              <Typography variant="h6">lease Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedlease && (
              <Grid container spacing={2}>
                {Object.entries(selectedlease)
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
              <Typography variant="h6">Edit lease</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              {Object.keys(editFormData)
              .filter((field) =>  field !== "_id" && field !== "createdAt" && field !== "updatedAt" && field !== "__v")
              .map(
                (field) =>
                  field !== "id" && (
                    <Grid item xs={12} sm={6} key={field}>
                      {field==="status"? (
                        <FormControl fullWidth>
                          <InputLabel>
                          Payment Status
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field]||""}
                          onChange={handleEditInputChange(field)}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="overDue">OverDue</MenuItem>
                          </Select>
                        </FormControl>
                      ): field ==="Lstatus" ?(
                        <FormControl fullWidth>
                          <InputLabel>
                          Lease Status
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field] || ""}
                          onchange={handleEditInputChange(field)}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Terminated">Terminated</MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
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
              Are you sure you want to delete this lease?
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
            {/* add lease model */}
            <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Lesae</Typography>
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
                label="StartDate"
                name="StartDate"
                value={addFormData.StartDate}
                onChange={handleAddInputChange('StartDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="EndDate"
                name="EndDate"
                value={addFormData.EndDate}
                onChange={handleAddInputChange('EndDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="MonthlyRent"
                name="MonthlyRent"
                value={addFormData.MonthlyRent}
                onChange={handleAddInputChange('MonthlyRent')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Deposite"
                name="Deposite"
                value={addFormData.Deposite}
                onChange={handleAddInputChange('Deposite')}
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
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="overDue">OverDue</MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Lstatus-label"> Lease Status</InputLabel>
                <Select
                  labelId="Lstatus-label"
                  name="Lstatus"
                  value={addFormData.Lstatus}
                  onChange={handleAddInputChange('Lstatus')}
                  required
                > 
                <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Terminated">Terminated</MenuItem>
                      <MenuItem value="Expired">Expired</MenuItem>
                 
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
                  onClick={handleAddLease}
                >
                  Save lease
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
