import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
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
      checkIN: "2nd March",
      checkOut: "10th March",
      status: "pending",
      Bstatus: "confirmed",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "9876543210",
      address: "Ranchi",
      checkIN: "5th March",
      checkOut: "12th March",
      status: "paid",
      Bstatus: "cancled",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "8765432109",
      address: "Jamshedpur",
      checkIN: "7th March",
      checkOut: "15th March",
      status: "overview",
      Bstatus: "complete",
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
  const [selectedbooking, setSelectedbooking] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBooking, setApiBooking] = useState([]);
  const [addFormData,setAddFormData] =useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    checkIN: '',
    checkOut:'',
    status:'pending',
    Bstatus: '',
    })
    const [addModalOpen,setAddModalOpen]=useState(false);
  
    const navigate =useNavigate();

  const getAllBooking = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/booking/getAllBooking`
      );
      console.log("response", res.data);
      setBookings(res.data);
      setApiBooking(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBooking();
  }, []);
  // const getAllbooking = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3001/booking/getAllbooking`
  //     );
  //     console.log("response", res.data);
  //     setProperties(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllbooking();
  // }, []);
  const handleView = (booking) => {
    setSelectedbooking(booking);
    setViewModalOpen(true);
  };

  const handleEdit = (booking) => {
    setSelectedbooking(booking);
    setEditFormData(booking);
    setEditModalOpen(true);
  };

  const handleDelete = (booking) => {
    setSelectedbooking(booking);
    setDeleteModalOpen(true);
  };
  const handleAddNew=()=>{
    setAddModalOpen(true);
  }
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedbooking(null);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedbooking(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedbooking(null);
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
  const handleAddBooking= async () => {
    try {
      const response = await axios.post('http://localhost:3001/booking/createBooking', addFormData);
      if (response.data.success) {
        toast.success(' added booking successfully!');
        handleCloseAddModal();
        getAllBooking();
        // Reset form data
        setAddFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          checkIN: '',
          checkOut:'',
          status:'pending',
          Bstatus: '',
        });
      }
    } catch (error) {
      console.error('Error adding booking:', error);
      toast.error(error.response?.data?.message || 'Failed to add booking');
    }
  };
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(
       ` http://localhost:3001/booking/updateBooking/${selectedbooking._id}`, editFormData
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
  
    // Here you would typically make an API call to delete the booking
    handleCloseDeleteModal();
    try{
     const res=await axios.delete(`http://localhost:3001/booking/deleteBooking/${selectedbooking._id}`);
     if(res.data.success){
      toast.success(res.data.message);
      getAllBooking();
     }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // const handleStatusChange = (id, newStatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
  //   );
  // };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  // const handleBStatusChange = (id, newBStatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, Bstatus: newBStatus } : row))
  //   );
  // };
  const handleBStatusChange = (id, newBStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, Bstatus: newBStatus } : row
      )
    );
  };

  //   const handleDelete = (row) => {
  //     setData((prevData) => prevData.filter((row) => row.id !== row));
  //  };

  //  const handleEdit = (row) => {
  //   alert(`Edit function triggered for ID: ${row}`);
  // };

  //  const handleView = (row) => {
  //  alert(`View function triggered for ID: ${row}`);
  //  };
  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setBookings(apiBooking); // Reset to full list when search is empty
      return;
    }

    const filtered = apiBooking.filter((booking) => {
      return (
        booking.name.toLowerCase().includes(value) || // bookingTitle = gfdgf.includes(gfdgf)
        booking.address.toLowerCase().includes(value) ||
        booking.email.toLowerCase().includes(value) ||
        booking.phone.toString().toLowerCase().includes(value)||
        booking.checkOut.toLowerCase().includes(value)||
        booking. checkIN.toLowerCase().includes(value)
      );
    });

    setBookings(filtered);
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
            padding: "10px 10px 10px 10px",
            borderRadius: "5px",
            height: "50px",
            width: "130px",
          }}
        >
          Add Booking
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1070 }}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{
              position: "sticky",
              background: "white",
              zIndex: 2,
              top: "0",
              whiteSpace: "nowrap",
            }}
          >
            <TableRow className="bg-gray-200">
              {[
                "S.No" ,
                "Name",
                "email",
                "Phone No.",
                "Address",
                "Check-IN Date",
                "Check-Out Date",
                "Payment Status",
                "Booking Status",
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
            {bookings.map((booking,index) => (
              <TableRow
                key={booking._id}
                className="text-center"
                sx={{ fonrweight: " bold", whiteSpace: "nowrap" ,}}
              >
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" ,padding:"20px"}}
                  className="border p-2"
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {booking.name}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {booking.email}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {booking.phone}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {booking.address}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {booking.checkIN}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {booking.checkOut}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                
                    {booking.status}
                    
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                 
                    {booking.Bstatus}
                    
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
                      onClick={() => handleView(booking)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "green" }}
                      onClick={() => handleEdit(booking)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(booking)}
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
              <Typography variant="h6">BOOKING Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedbooking && (
              <Grid container spacing={2}>
                {Object.entries(selectedbooking)
                .filter(([field]) => field !== "_id" && field !== "__v" && field !== "createdAt"&& field !=="updatedAt").map(([key, value]) => (
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
              <Typography variant="h6">Edit Booking</Typography>
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
                        value={editFormData[field]|| ""}
                        onChange={handleEditInputChange(field)}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="paid">Paid</MenuItem>
                          <MenuItem value="overview">Overview</MenuItem>
                        </Select>
                       </FormControl>
                      ): field==="Bstatus"?(
                        <FormControl fullWidth>
                        <InputLabel>
                        Booking Status
                        </InputLabel>
                        <Select
                        variant="standard"
                        value={editFormData[field]|| ""}
                        onChange={handleEditInputChange(field)}
                        >
                          <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="canceled">Canceled</MenuItem>
                          <MenuItem value="complete">Complete</MenuItem>
                        </Select>
                        </FormControl>
                      ):(
                      <TextField
                        fullWidth
                        label={field}
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                      />
                   ) }
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
              Are you sure you want to delete this booking?
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
        {/* add booking model */}
            <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Booking</Typography>
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
                label="CheckIn"
                name="CheckIn"
                value={addFormData.checkIN}
                onChange={handleAddInputChange('checkIN')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CheckOut"
                name="CheckOut"
                value={addFormData.checkOut}
                onChange={handleAddInputChange('checkOut')}
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
                <InputLabel id="Bstatus-label"> Booking Status</InputLabel>
                <Select
                  labelId="Bstatus-label"
                  name="Bstatus"
                  value={addFormData.Bstatus}
                  onChange={handleAddInputChange('Bstatus')}
                  required
                > 
               <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="canceled">Canceled</MenuItem>
                          <MenuItem value="complete">Complete</MenuItem>
                 
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
                  onClick={handleAddBooking}
                >
                  Save Booking
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
