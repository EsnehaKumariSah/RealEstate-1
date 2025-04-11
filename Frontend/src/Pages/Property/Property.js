import { useEffect, useState } from "react";
import {
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
  Paper,
  Grid,
  TextField,
  Button,
  TableContainer,
  InputAdornment,
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
import { InputAdorment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const PropertyTable = () => {
  const [data, setData] = useState([
    //   {
    //     id: 1,
    //     propertyTitle: "Luxury",
    //     propertyType: "House",
    //     address: "Ranchi",
    //     price: 100000,
    //     areaSqft: 100,
    //     furnishing:"Furnished",
    //     status: "Active",
    //   },
    //   {
    //     id: 2,
    //     propertyTitle: "2bhk",
    //     propertyType: "Apartment",
    //     address: "Kolkata",
    //     price: 100000,
    //     areaSqft: 100,
    //     furnishing: "furnished",
    //     status: "Active",
    //   },
    //   {
    //     id: 3,
    //     propertyTitle: "1bhk",
    //     propertyType: "Apartment",
    //     address: "MP",
    //     price: 100000,
    //     areaSqft: 100,
    //     furnishing: "furnished",
    //     status: "InActive",
    //   },
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
    ...modalStyle,
    width: 400,
    textAlign: "center",
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen,setAddModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({
    propertyTitle: '',
    propertyType: '',
    address: '',
    price: '',
    areaSqft: '',
    furnishing: '',
    status: 'Available',
  });
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiProperties, setApiProperties] = useState([]);


  const navigate =useNavigate();

  const getAllProperty = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/property/getAllProperty`
      );
      console.log("response", res.data);
      setProperties(res.data);
      setApiProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProperty();
  }, []);

  const handleView = (property) => {
    setSelectedProperty(property);
    setViewModalOpen(true);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditFormData(property);
    setEditModalOpen(true);
  };

  const handleDelete = (property) => {
    setSelectedProperty(property);
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
  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://localhost:3001/property/createProperty', addFormData);
      if (response.data.success) {
        toast.success('Property added successfully!');
        handleCloseAddModal();
        getAllProperty();
        // Reset form data
        setAddFormData({
          propertyTitle: '',
          propertyType: '',
          address: '',
          price: '',
          areaSqft: '',
          furnishing: '',
          status: 'Available',
        });
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error(error.response?.data?.message || 'Failed to add property');
    }
  };
  
  // const handleUpdate = () => {
  //   // Here you would typically make an API call to update the property
  //   handleCloseEditModal();
  // };
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(
       ` http://localhost:3001/property/updateProperty/${selectedProperty._id}`, editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProperty();
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
    try {
      const res = await axios.delete(
        `http://localhost:3001/property/deleteProperty/${selectedProperty._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message); //tost is a package jo koi v string ko ui pai show karwata hai
        getAllProperty();
      }
    } catch (error) {
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
  const handlePStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, PStatus: newStatus } : row
      )
    );
  };
  const handlePTStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, PTStatus: newStatus } : row
      )
    );
  };
  const handleFStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, FStatus: newStatus } : row
      )
    );
  };
  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setProperties(apiProperties); // Reset to full list when search is empty
      return;
    }

    const filtered = apiProperties.filter((property) => {
      return (
        property.propertyTitle.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        property.address.toLowerCase().includes(value) ||
        property.propertyType.toLowerCase().includes(value) ||
        property.price.toString().toLowerCase().includes(value)
      );
    });

    setProperties(filtered);
  };

  return (
    <>
      <div className="flex">
        <TextField
          //   className='search'

          label="Search"
          variant="outlined"
          //fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "blue" }} />
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
          Add Property
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1070 }}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{
              top: 0,
              background: "white",
              zIndex: 2,
              position: "sticky",
              fontWeight: "bold",
              paddingLeft: "20px",
            }}
          >
            <TableRow className="bg-gray-200">
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                S.No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Property Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Property Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Area(Sqft)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                {" "}
                Furnishing
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
            {properties.length > 0 &&
              properties.map((property, index) => (
                <TableRow
                  key={property._id}
                  className="text-center"
                  sx={{ fontWeight: "bold", paddingLeft: "20px" }}
                >
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
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
                   {property.propertyTitle}
                     
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "ceter",
                    }}
                    className="border p-2"
                  >
                   {property.propertyType}
                     
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {property.address}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {property.price}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                    {property.areaSqft}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                   {property.furnishing}
                    
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    className="border p-2"
                  >
                   {property.status}
                      
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bolder" }}
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
                        fontweight="bolder"
                        onClick={() => handleView(property)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        sx={{ color: "green" }}
                        onClick={() => handleEdit(property)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleDelete(property)}
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
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Property Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedProperty && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedProperty)
               //.filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id")
               .filter(([field]) => field !== "_id" && field !== "__v" && field !== "createdAt"&& field !=="updatedAt")
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
        {/* edit model */}

        <Modal open={editModalOpen} onClose={handleCloseEditModal}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Edit Property</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} mt={2}>
              {Object.keys(editFormData)
              .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id")
              .map((field) => (
                <Grid item xs={6} key={field}>
                  {field === "propertyTitle" ? (
                    <FormControl fullWidth>
                      <InputLabel
                      //  id="demo-simple-select-label"
                      >
                        Property Title
                      </InputLabel>
                      <Select
                        //labelId="demo-simple-select-label"
                        //id="demo-simple-select"
                        variant="standard"
                        //  label="property Title"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                      >
                        <MenuItem value="Luxury">Luxury</MenuItem>
                        <MenuItem value="3BHK">3BHK</MenuItem>
                        <MenuItem value="Apartment">Apartment</MenuItem>
                      </Select>
                    </FormControl>
                  ) : field === "propertyType" ? (
                    <FormControl fullWidth>
                      <InputLabel>Property Type</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        variant="standard"
                        onChange={handleEditInputChange(field)}
                      >
                        <MenuItem value="Apartment">Apartment</MenuItem>
                        <MenuItem value="House">House</MenuItem>
                        <MenuItem value="Commercial">Commercial</MenuItem>
                        <MenuItem value="Land">Land</MenuItem>
                        <MenuItem value="Office">Office</MenuItem>
                        <MenuItem value="Villa">Villa</MenuItem>
                      </Select>
                    </FormControl>
                  ) : field === "furnishing" ? (
                    <FormControl fullWidth>
                      <InputLabel>Furnishing</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        variant="standard"
                        onChange={handleEditInputChange(field)}
                      >
                         <MenuItem value="Furnished">Furnished</MenuItem>
                      <MenuItem value="Semi-furnished">Semi-furnished</MenuItem>
                      <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                      </Select>
                    </FormControl>
                  ) : field === "status" ? (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        variant="standard"
                        onChange={handleEditInputChange(field)}
                      >
                        <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Sold">Sold</MenuItem>
                      <MenuItem value="rented">Rented</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
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
            <Typography variant="h6">Confirm Delete</Typography>
            <Typography my={2}>
              Are you sure you want to delete this property?
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button variant="outlined" onClick={handleCloseDeleteModal}>
                CANCEL
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>
          {/* Add Property Modal */}
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Property</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="property-title-label">Property Title</InputLabel>
                <Select
                  labelId="property-title-label"
                  name="propertyTitle"
                  value={addFormData.propertyTitle}
                  onChange={handleAddInputChange('propertyTitle')}
                  required
                >
                  <MenuItem value="Luxury">Luxury</MenuItem>
                  <MenuItem value="3BHK">3BHK</MenuItem>
                  <MenuItem value="Apartment">Apartment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="property-type-label">Property Type</InputLabel>
                <Select
                  labelId="property-type-label"
                  name="propertyType"
                  value={addFormData.propertyType}
                  onChange={handleAddInputChange('propertyType')}
                  required
                >
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                  <MenuItem value="Land">Land</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                </Select>
              </FormControl>
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
                label="Price"
                name="price"
                type="number"
                value={addFormData.price}
                onChange={handleAddInputChange('price')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area (Sqft)"
                name="areaSqft"
                type="number"
                value={addFormData.areaSqft}
                onChange={handleAddInputChange('areaSqft')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="furnishing-label">Furnishing</InputLabel>
                <Select
                  labelId="furnishing-label"
                  name="furnishing"
                  value={addFormData.furnishing}
                  onChange={handleAddInputChange('furnishing')}
                  required
                >
                  <MenuItem value="Furnished">Furnished</MenuItem>
                      <MenuItem value="Semi-furnished">Semi-furnished</MenuItem>
                      <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                </Select>
              </FormControl>
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
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
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
                  onClick={handleAddProperty}
                >
                  Save Property
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

export default PropertyTable;
