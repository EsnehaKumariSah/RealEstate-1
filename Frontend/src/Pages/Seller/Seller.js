import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Paper,
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
import {  InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const SellerTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "23467889",
      address: "Adityapur",
      Id: "P-12345	 ",
      ListedPrice: " ₹1,20,00,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "9876543210",
      address: "Ranchi",
      Id: "P-6787",
      ListedPrice: " ₹75,00,000	",
      status: "InActive",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "8765432109",
      address: "Jamshedpur",
       Id: "p-4567",
      ListedPrice: "₹67000",
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
    boxShadow: 50,
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
  const [selectedseller, setSelectedseller] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [sellers, setSellers] = useState([]);
  const [searchTerm , setSearchTerm]= useState("");
  const[ apiSellers, setApiSellers]=useState([]);
   const [addModalOpen,setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    Id: '',
    ListedPrice: '',
    status: 'Available',
  });
   const navigate =useNavigate();

  const getAllSeller = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/seller/getAllSeller`);
      console.log("response", res.data);
      setSellers(res.data);
      setApiSellers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSeller();
  }, []);

  const handleView = (seller) => {
    setSelectedseller(seller);
    setViewModalOpen(true);
  };

  const handleEdit = (seller) => {
    setSelectedseller(seller);
    setEditFormData(seller);
    setEditModalOpen(true);
  };

  const handleDelete = (seller) => {
    setSelectedseller(seller);
    setDeleteModalOpen(true);
  };
  const handleAddNew = () => {
    setAddModalOpen(true);
  };
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
    const handleAddSeller= async () => {
      try {
        const response = await axios.post('http://localhost:3001/seller/createSeller', addFormData);
        if (response.data.success) {
          toast.success('seller added successfully!');
          handleCloseAddModal();
          getAllSeller();
          // Reset form data
          setAddFormData({
            name: '',
            email: '',
            address: '',
            phone: '',
            Id: '',
            ListedPrice:'',
            status: 'Available',
          });
        }
      } catch (error) {
        console.error('Error adding seller:', error);
        toast.error(error.response?.data?.message || 'Failed to add seller');
      }
    };

    const handleUpdate = async () => {
      handleCloseEditModal();
      // console.log("selected property ", selectedProperty);
      
      try {
        const res = await axios.put(
         ` http://localhost:3001/seller/updateSeller/${selectedseller._id}`, editFormData
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
  

  const handleConfirmDelete =  async () => {
    // Here you would typically make an API call to delete the Seller
    handleCloseDeleteModal();
    try{
             const res = await axios.delete(`http://localhost:3001/seller/deleteSeller/${selectedseller._id}`);
               if(res.data.success){
                      toast.success(res.data.message);//tost is a package jo koi v string ko ui pai show karwata hai
                       getAllSeller();
               }
    }catch(error){
        console.log(error)
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
        row.id === id ? { ...row, Bstatus: newStatus } : row
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
        setSellers(apiSellers); // Reset to full list when search is empty
        return;
    }

    const filtered = apiSellers.filter((Seller) => {
      return (
        Seller.name.toLowerCase().includes(value) ||   // SellerTitle = gfdgf.includes(gfdgf)
        Seller.email.toLowerCase().includes(value) ||
        Seller.phone.toString().toLowerCase().includes(value) ||
        Seller.address.toLowerCase().includes(value)||
        Seller.Id.toString().toLowerCase().includes(value) || 
        Seller.ListedPrice.toString().toLowerCase().includes(value)    
      );
    });

    setSellers(filtered);
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
                <SearchIcon sx={{color:"blue"}} />
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
          Add Seller
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
            <TableRow className="bg-gray-200" sx={{ whiteSpace: "nowrap" ,paddingLeft:"20px"}}>
              {/* {[
              "S.No",
              "Name",
              "Email",
              "Phone No.",
              "Address",
              "SellerId",
              "ListedPrice",
              "Status",
              "Action",
            ].map((header) => (
              <TableCell key={header} className="border p-2" sx={{ fontWeight: "bold" }}>
                {header}
              </TableCell>
            ))} */}
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                S.No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Phone Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                SellerId
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                ListedPrice
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.length > 0 &&
              sellers.map((seller,index) => (
                <TableRow key={seller._id} className="text-center">
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      paddingLeft:"20px"
                    }}
                    className="border p-2"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {seller.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {seller.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {seller.phone}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {seller.address}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {seller.Id}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {seller.ListedPrice}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                   {seller.status}
                     
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    <TableContainer
                      style={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <IconButton
                        sx={{ color: "blue" }}
                        onClick={() => handleView(seller)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        sx={{ color: "green" }}
                        onClick={() => handleEdit(seller)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleDelete(seller)}
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
              <Typography variant="h6">seller Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedseller && (
              <Grid container spacing={2}>
                {Object.entries(selectedseller)
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
    {/* edit model */}
           
                <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Edit Seller</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2} mt={2} >
            {Object.keys(editFormData)
            .filter((field) =>  field !== "_id" && field !== "createdAt" && field !== "updatedAt" && field !== "__v")
            .map(
              (field) => (
              <Grid item xs={6} key={field}>
                {field === "status" ? (
                  <FormControl fullWidth>
                    <InputLabel
                  //  id="demo-simple-select-label"
                    >Status</InputLabel>
                    <Select
                     //labelId="demo-simple-select-label"
                     //id="demo-simple-select"
                     variant="standard"
                    //  label="sellerTitle"  
                      value={editFormData[field] || ""}
                      onChange={handleEditInputChange(field)}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="InActive">InActive</MenuItem>
                    
                    </Select>
                  </FormControl>
                ) 
                : (
                  <TextField 
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editFormData[field] || ""}
                    onChange={handleEditInputChange(field)}
                    fullWidth
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 }}>
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
              Are you sure you want to delete this seller?
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
                  {/* Add seller Modal */}
              <Modal open={addModalOpen} onClose={handleCloseAddModal}>
                <Box sx={modalStyle}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">Add New Seller</Typography>
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
                        type="string"
                        value={addFormData.name}
                        onChange={handleAddInputChange('name')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                        type="number"
                        value={addFormData.phone}
                        onChange={handleAddInputChange('phone')}
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
                        onChange={handleAddInputChange('address')}
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
                        onChange={handleAddInputChange('Id')}
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
                        onChange={handleAddInputChange('ListedPrice')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status-label">status</InputLabel>
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
                          onClick={handleAddSeller}
                        >
                          Save Seller
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

export default SellerTable;
