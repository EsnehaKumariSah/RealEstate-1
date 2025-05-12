// import { useEffect, useState } from "react";
// import {
//   Table,
//   Select,
//   MenuItem,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
//   Modal,
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   TableContainer,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   TablePagination,
// } from "@mui/material";
// import {
//   Visibility,
//   Edit,
//   Delete,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import { InputAdorment } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import { toast } from "react-toastify";
// //import {useNavigate} from 'react-router-dom';

// const PropertyTable = () => {
//   const [data, setData] = useState([
//     //   {
//     //     id: 1,
//     //     propertyTitle: "Luxury",
//     //     propertyType: "House",
//     //     address: "Ranchi",
//     //     price: 100000,
//     //     areaSqft: 100,
//     //     furnishing:"Furnished",
//     //     status: "Active",
//     //   },
//     //   {
//     //     id: 2,
//     //     propertyTitle: "2bhk",
//     //     propertyType: "Apartment",
//     //     address: "Kolkata",
//     //     price: 100000,
//     //     areaSqft: 100,
//     //     furnishing: "furnished",
//     //     status: "Active",
//     //   },
//     //   {
//     //     id: 3,
//     //     propertyTitle: "1bhk",
//     //     propertyType: "Apartment",
//     //     address: "MP",
//     //     price: 100000,
//     //     areaSqft: 100,
//     //     furnishing: "furnished",
//     //     status: "InActive",
//     //   },
//   ]);

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "80%",
//     maxWidth: 800,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 1,
//     maxHeight: "70vh",
//     overflow: "auto",
//   };

//   const deleteModalStyle = {
//     ...modalStyle,
//     width: 400,
//     textAlign: "center",
//   };
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [addFormData, setAddFormData] = useState({
//     propertyTitle: "",
//     propertyType: "",
//     address: "",
//     price: "",
//     areaSqft: "",
//     furnishing: "",
//     status: "Available",
//   });
//   const [properties, setProperties] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [apiProperties, setApiProperties] = useState([]);

//   //const navigate =useNavigate();

//   const getAllProperty = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3001/property/getAllProperty`
//       );
//       console.log("response", res.data);
//       setProperties(res.data);
//       setApiProperties(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getAllProperty();
//   }, []);

//   const handleView = (property) => {
//     setSelectedProperty(property);
//     setViewModalOpen(true);
//   };

//   const handleEdit = (property) => {
//     setSelectedProperty(property);
//     setEditFormData(property);
//     setEditModalOpen(true);
//   };

//   const handleDelete = (property) => {
//     setSelectedProperty(property);
//     setDeleteModalOpen(true);
//   };
//   const handleAddNew = () => {
//     setAddModalOpen(true);
//   };

//   const handleCloseViewModal = () => setViewModalOpen(false);
//   const handleCloseEditModal = () => setEditModalOpen(false);
//   const handleCloseDeleteModal = () => setDeleteModalOpen(false);
//   const handleCloseAddModal = () => setAddModalOpen(false);

//   const handleEditInputChange = (field) => (event) => {
//     setEditFormData({
//       ...editFormData,
//       [field]: event.target.value,
//     });
//   };

//   const handleAddInputChange = (field) => (event) => {
//     setAddFormData({
//       ...addFormData,
//       [field]: event.target.value,
//     });
//   };
//   const handleAddProperty = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/property/createProperty",
//         addFormData
//       );
//       if (response.data.success) {
//         toast.success("Property added successfully!");
//         handleCloseAddModal();
//         getAllProperty();
//         // Reset form data
//         setAddFormData({
//           propertyTitle: "",
//           propertyType: "",
//           address: "",
//           price: "",
//           areaSqft: "",
//           furnishing: "",
//           status: "Available",
//         });
//       }
//     } catch (error) {
//       console.error("Error adding property:", error);
//       toast.error(error.response?.data?.message || "Failed to add property");
//     }
//   };

//   // const handleUpdate = () => {
//   //   // Here you would typically make an API call to update the property
//   //   handleCloseEditModal();
//   // };
//   const handleUpdate = async () => {
//     handleCloseEditModal();
//     // console.log("selected property ", selectedProperty);

//     try {
//       const res = await axios.put(
//         ` http://localhost:3001/property/updateProperty/${selectedProperty._id}`,
//         editFormData
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         getAllProperty();
//         setEditFormData({});
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   const handleConfirmDelete = async () => {
//     // Here you would typically make an API call to delete the property
//     handleCloseDeleteModal();
//     try {
//       const res = await axios.delete(
//         `http://localhost:3001/property/deleteProperty/${selectedProperty._id}`
//       );
//       if (res.data.success) {
//         toast.success(res.data.message); //tost is a package jo koi v string ko ui pai show karwata hai
//         getAllProperty();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };
//   //const handleStatusChange = (id, newStatus) => {
//   //   setData((prevData) =>
//   //     prevData.map((row) =>
//   //       row.id === id ? { ...row, status: newStatus } : row
//   //     )
//   //   );
//   // };
//   // const handlePStatusChange = (id, newStatus) => {
//   //   setData((prevData) =>
//   //     prevData.map((row) =>
//   //       row.id === id ? { ...row, PStatus: newStatus } : row
//   //     )
//   //   );
//   // };
//   // const handlePTStatusChange = (id, newStatus) => {
//   //   setData((prevData) =>
//   //     prevData.map((row) =>
//   //       row.id === id ? { ...row, PTStatus: newStatus } : row
//   //     )
//   //   );
//   // };
//   // const handleFStatusChange = (id, newStatus) => {
//   //   setData((prevData) =>
//   //     prevData.map((row) =>
//   //       row.id === id ? { ...row, FStatus: newStatus } : row
//   //     )
//   //   );
//   // };
//   const handleSearchChange = (e) => {
//     console.log("target", e.target);

//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     if (value === "") {
//       setProperties(apiProperties); // Reset to full list when search is empty
//       return;
//     }

//     const filtered = apiProperties.filter((property) => {
//       return (
//         property.propertyTitle.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
//         property.address.toLowerCase().includes(value) ||
//         property.propertyType.toLowerCase().includes(value) ||
//         property.price.toString().toLowerCase().includes(value) ||
//         property.areaSqft.toString().toLowerCase().includes(value)
//       );
//     });

//     setProperties(filtered);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page
//   };
//   return (
//     <div className="maintable">
//       <div className="flex">
//         <TextField
//           className="search"
//           label="Search"
//           variant="outlined"
//           //fullWidth
//           size="small"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           //   style={{
//           //     marginBottom: "20px",
//           //     width: "160px",
//           //     display: "flex",
//           //     marginRight: "200px",
//           //     justifyContent: "flex-end",
//           //     marginLeft: "650px",
//           //   }}
//         />

//         <Button
//           className="button"
//           variant="contained"
//           startIcon={<AddIcon />}
//           size="small"
//           // color="primary"
//           onClick={handleAddNew}
//           // style={{
//           //   textAlign: "center",
//           //   marginBottom: "20px",
//           //   display: "flex",
//           //   textWrap: "nowrap",
//           //   marginRight: "50px",
//           //   padding: "10px 10px 10px 10px",
//           //   borderRadius: "5px",
//           //   height: "50px",
//           //   width: "130px",
//           // }}
//         >
//           Add Property
//         </Button>
//       </div>

//       <div className="table">
//         <TableContainer
//           component={Paper}
//           style={
//             {
//               overflow:"auto",
//               maxHeight:"calc(100vh - 90px)",
//               position:"relative",
//               scrollbarWidth:"none"
//             }
//           }
//         >
//           <Table className="w-full border border-gray-300">
//             <TableHead
//               sx={{
//                 top: 0,
//                 background: "white",
//                 zIndex: 2,
//                 position: "sticky",
//                 fontWeight: "bold",
//                 paddingLeft: "20px",
//               }}
//             >
//               <TableRow className="bg-gray-200">
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   S.No
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Property Title
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Property Type
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Address
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Price
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Area(Sqft)
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   {" "}
//                   Furnishing
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Status
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     textWrap: "nowrap",
//                   }}
//                   className="border p-2"
//                 >
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {properties.length > 0 &&
//                 properties.map((property, index) => (
//                   <TableRow
//                     key={property._id}
//                     className="text-center"
//                     sx={{ fontWeight: "bold", paddingLeft: "20px" }}
//                   >
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {index + 1}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.propertyTitle}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.propertyType}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.address}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.price}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.areaSqft}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.furnishing}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         padding: "4px",
//                         fontSize: "12px",
//                         textAlign: "center",
//                       }}
//                       className="border p-2"
//                     >
//                       {property.status}
//                     </TableCell>
//                     <TableCell
//                       sx={{ fontWeight: "bolder" }}
//                       className="border p-2"
//                     >
//                       <TableContainer
//                         style={{
//                           display: "flex",
//                           gap: "5px",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <IconButton
//                           sx={{ color: "blue" }}
//                           className="view"
//                           fontweight="bolder"
//                           onClick={() => handleView(property)}
//                         >
//                           <Visibility />
//                         </IconButton>
//                         <IconButton
//                           className="edit"
//                           sx={{ color: "grey" }}
//                           onClick={() => handleEdit(property)}
//                         >
//                           <Edit />
//                         </IconButton>
//                         <IconButton
//                           className="delete"
//                           sx={{ color: "red" }}
//                           onClick={() => handleDelete(property)}
//                         >
//                           <Delete />
//                         </IconButton>
//                       </TableContainer>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>

//           {/* View Modal */}
//           <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
//             <Box sx={modalStyle}>
//               <Box display="flex" justifyContent="space-between">
//                 <Typography variant="h6">Property Details</Typography>
//                 <IconButton onClick={handleCloseViewModal}>
//                   <CloseIcon />
//                 </IconButton>
//               </Box>
//               {selectedProperty && (
//                 <Grid container spacing={2} mt={2}>
//                   {Object.entries(selectedProperty)
//                     //.filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id")
//                     .filter(
//                       ([field]) =>
//                         field !== "_id" &&
//                         field !== "__v" &&
//                         field !== "createdAt" &&
//                         field !== "updatedAt"
//                     )
//                     .map(([key, value]) => (
//                       <Grid item xs={6} key={key}>
//                         <Typography>
//                           <strong>{key}:</strong> {value}
//                         </Typography>
//                       </Grid>
//                     ))}
//                 </Grid>
//               )}
//             </Box>
//           </Modal>
//           {/* edit model */}

//           <Modal open={editModalOpen} onClose={handleCloseEditModal}>
//             <Box sx={modalStyle}>
//               <Box display="flex" justifyContent="space-between">
//                 <Typography variant="h6">Edit Property</Typography>
//                 <IconButton onClick={handleCloseEditModal}>
//                   <CloseIcon />
//                 </IconButton>
//               </Box>
//               <Grid container spacing={2} mt={2}>
//                 {Object.keys(editFormData)
//                   .filter(
//                     (field) =>
//                       field !== "createdAt" &&
//                       field !== "updatedAt" &&
//                       field !== "__v" &&
//                       field !== "_id"
//                   )
//                   .map((field) => (
//                     <Grid item xs={6} key={field}>
//                       {field === "propertyTitle" ? (
//                         <FormControl fullWidth>
//                           <InputLabel
//                             label="propertyTitle"
//                             //  id="demo-simple-select-label"
//                           >
//                             Property Title
//                           </InputLabel>
//                           <Select
//                             //labelId="demo-simple-select-label"
//                             //id="demo-simple-select"

//                             label="propertyTitle"
//                             value={editFormData[field] || ""}
//                             onChange={handleEditInputChange(field)}
//                           >
//                             <MenuItem value="Luxury">Luxury</MenuItem>
//                             <MenuItem value="3BHK">3BHK</MenuItem>
//                             <MenuItem value="Apartment">Apartment</MenuItem>
//                           </Select>
//                         </FormControl>
//                       ) : field === "propertyType" ? (
//                         <FormControl fullWidth>
//                           <InputLabel label="propertytype">
//                             Property Type
//                           </InputLabel>
//                           <Select
//                             value={editFormData[field] || ""}
//                             label="propertytype"
//                             onChange={handleEditInputChange(field)}
//                           >
//                             <MenuItem value="Apartment">Apartment</MenuItem>
//                             <MenuItem value="House">House</MenuItem>
//                             <MenuItem value="Commercial">Commercial</MenuItem>
//                             <MenuItem value="Land">Land</MenuItem>
//                             <MenuItem value="Office">Office</MenuItem>
//                             <MenuItem value="Villa">Villa</MenuItem>
//                           </Select>
//                         </FormControl>
//                       ) : field === "furnishing" ? (
//                         <FormControl fullWidth>
//                           <InputLabel label="furnishing">Furnishing</InputLabel>
//                           <Select
//                             value={editFormData[field] || ""}
//                             label="furnishing"
//                             onChange={handleEditInputChange(field)}
//                           >
//                             <MenuItem value="Furnished">Furnished</MenuItem>
//                             <MenuItem value="Semi-furnished">
//                               Semi-furnished
//                             </MenuItem>
//                             <MenuItem value="Unfurnished">Unfurnished</MenuItem>
//                           </Select>
//                         </FormControl>
//                       ) : field === "status" ? (
//                         <FormControl fullWidth>
//                           <InputLabel label="status">Status</InputLabel>
//                           <Select
//                             value={editFormData[field] || ""}
//                             label="status"
//                             onChange={handleEditInputChange(field)}
//                           >
//                             <MenuItem value="Available">Available</MenuItem>
//                             <MenuItem value="Sold">Sold</MenuItem>
//                             <MenuItem value="rented">Rented</MenuItem>
//                             <MenuItem value="Pending">Pending</MenuItem>
//                           </Select>
//                         </FormControl>
//                       ) : field === "price" || field === "areaSqft" ? (
//                         <TextField
//                           type="number"
//                           label={field.charAt(0).toUpperCase() + field.slice(1)}
//                           value={editFormData[field] || ""}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value === "" || Number(value) >= 0) {
//                               handleEditInputChange(field)(e);
//                             }
//                           }}
//                           fullWidth
//                         />
//                       ) : (
//                         <TextField
//                           label={field.charAt(0).toUpperCase() + field.slice(1)}
//                           value={editFormData[field] || ""}
//                           onChange={handleEditInputChange(field)}
//                           fullWidth
//                         />
//                       )}
//                     </Grid>
//                   ))}
//               </Grid>
//               <Box display="flex" justifyContent="flex-end" mt={3}>
//                 <Button
//                   variant="contained"
//                   sx={{ backgroundColor: "grey" }}
//                   onClick={handleCloseEditModal}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={handleUpdate}
//                   sx={{ ml: 2 }}
//                 >
//                   Update
//                 </Button>
//               </Box>
//             </Box>
//           </Modal>

//           {/* Delete Modal */}
//           <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
//             <Box sx={deleteModalStyle}>
//               <Typography className="confirm_delete" variant="h6">
//                 Confirm Delete
//               </Typography>
//               <Typography my={2}>
//                 Are you sure you want to delete this property?
//               </Typography>
//               <Box display="flex" justifyContent="center" gap={2}>
//                 <Button
//                   sx={{ backgroundColor: "gray", color: "white" }}
//                   variant="outlined"
//                   onClick={handleCloseDeleteModal}
//                 >
//                   CANCEL
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={handleConfirmDelete}
//                 >
//                   DELETE
//                 </Button>
//               </Box>
//             </Box>
//           </Modal>
//           {/* Add Property Modal */}
//           <Modal open={addModalOpen} onClose={handleCloseAddModal}>
//             <Box sx={modalStyle}>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={2}
//               >
//                 <Typography variant="h6" fontWeight="bold">
//                   Add New Property
//                 </Typography>
//                 <IconButton onClick={handleCloseAddModal}>
//                   <CloseIcon />
//                 </IconButton>
//               </Box>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel label="property-title-label">
//                       Property Title
//                     </InputLabel>
//                     <Select
//                       label="property-title-label"
//                       name="propertyTitle"
//                       value={addFormData.propertyTitle}
//                       onChange={handleAddInputChange("propertyTitle")}
//                       required
//                     >
//                       <MenuItem value="Luxury">Luxury</MenuItem>
//                       <MenuItem value="3BHK">3BHK</MenuItem>
//                       <MenuItem value="Apartment">Apartment</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel label="property-type-label">
//                       Property Type
//                     </InputLabel>
//                     <Select
//                       label="property-type-label"
//                       name="propertyType"
//                       value={addFormData.propertyType}
//                       onChange={handleAddInputChange("propertyType")}
//                       required
//                     >
//                       <MenuItem value="Apartment">Apartment</MenuItem>
//                       <MenuItem value="House">House</MenuItem>
//                       <MenuItem value="Commercial">Commercial</MenuItem>
//                       <MenuItem value="Land">Land</MenuItem>
//                       <MenuItem value="Office">Office</MenuItem>
//                       <MenuItem value="Villa">Villa</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     name="address"
//                     value={addFormData.address}
//                     onChange={(e) => {
//                       const value = e.target.value;

//                       // Agar value empty hai, ya alphabet ya valid character se start hoti hai to allow
//                       if (value === "" || /^[A-Za-z]/.test(value)) {
//                         handleAddInputChange("address")(e);
//                       }
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Price"
//                     name="price"
//                     type="number"
//                     value={addFormData.price}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "" || Number(value) > 0) {
//                         handleAddInputChange("price")(e);
//                       }
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Area (Sqft)"
//                     name="areaSqft"
//                     type="number"
//                     value={addFormData.areaSqft}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "" || Number(value) > 0) {
//                         handleAddInputChange("areaSqft")(e);
//                       }
//                     }}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel label="furnishing-label">Furnishing</InputLabel>
//                     <Select
//                       label="furnishing-label"
//                       name="furnishing"
//                       value={addFormData.furnishing}
//                       onChange={handleAddInputChange("furnishing")}
//                       required
//                     >
//                       <MenuItem value="Furnished">Furnished</MenuItem>
//                       <MenuItem value="Semi-furnished">Semi-furnished</MenuItem>
//                       <MenuItem value="Unfurnished">Unfurnished</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel label="status-label">Status</InputLabel>
//                     <Select
//                       label="status-label"
//                       name="status"
//                       value={addFormData.status}
//                       onChange={handleAddInputChange("status")}
//                       required
//                     >
//                       <MenuItem value="Available">Available</MenuItem>
//                       <MenuItem value="Sold">Sold</MenuItem>
//                       <MenuItem value="Rented">Rented</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box display="flex" justifyContent="flex-end" gap={2}>
//                     <Button
//                       variant="contained"
//                       sx={{ backgroundColor: "grey" }}
//                       onClick={handleCloseAddModal}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       variant="contained"
//                       // color="primary"
//                       onClick={handleAddProperty}
//                     >
//                       Save Property
//                     </Button>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Modal>
//         </TableContainer>

//         <div>
//             <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={properties.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </div>
//       </div>

//     </div>
//   );
// };

// export default PropertyTable;

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

const PropertyTable = () => {
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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [properties, setProperties] = useState([]);
  const [addFormData, setAddFormData] = useState({
    propertyTitle: "",
    propertyType: "",
    address: "",
    price: "",
    areaSqft: "",
    furnishing: "",
    status: "Available",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiProperties, setApiProperties] = useState([]);

  const navigate = useNavigate();
  const handleAddProperty = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/Property/createProperty",addFormData
      );
      if (res.data.success) {
        toast.success("property added successfully!");
        handleCloseAddModal();
        getAllProperty();
        //reset form data
        setAddFormData({
          propertyTitle: "",
          propertyType: "",
          address: "",
          price: "",
          areaSqft: "",
          furnishing: "",
          status: "Available",
        });
      }
    } catch (error) {
      console.error("error adding property", error);
      toast.error(error.res?.data?.message || "failed to add property");
    }
  };
  const getAllProperty = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/Property/getAllProperty`
      );
      console.log(res.data);
      setProperties(res.data);
      setApiProperties(res.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllProperty();
  }, []);
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);

    try {
      const res = await axios.put(
        `http://localhost:3001/Property/updateProperty/${selectedProperty._id}`,
        editFormData
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
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(
        `http://localhost:3001/Property/deleteProperty/${selectedProperty._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProperty();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
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
  //   propertyTitle: "Property Title",
  //   propertyType: "Property Type",
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
      setProperties(apiProperties); // Reset to full list when search is empty
      return;
    }

    const filtered = apiProperties.filter((property) => {
      return (
        property.propertyTitle.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        property.address.toLowerCase().includes(value) ||
        property.propertyType.toLowerCase().includes(value) ||
        property.price.toString().toLowerCase().includes(value) ||
        property.areaSqft.toString().toLowerCase().includes(value)
      );
    });

    setProperties(filtered);
  };

  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
  //   const dropdownFields = ["status", "Furnishing", "PropertyType"]; // edit model mein drop down ke liye ye easy pdega

  // const dropdownOptions = {
  //   status: ["Available", "Sold", "Rented","Pending"],
  //   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
  //   PropertyType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
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
          Add Property
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
            scrollbarWidth:"none"
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
                  Property Title
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Property Type
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
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Area(Sqft)
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  {" "}
                  Furnishing
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
              {properties.length > 0 &&
                properties
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((property, index) => (
                    <TableRow
                      key={property.id}
                      className="text-center"
                      sx={{
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(12, 12, 101, 0.05)",
                        },
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
                        {property.propertyTitle}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                        className="border p-2"
                      >
                        {property.propertyType}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                        className="border p-2"
                      >
                        {property.address}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                        className="border p-2"
                      >
                        {property.price}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                        className="border p-2"
                      >
                        {property.areaSqft}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                        className="border p-2"
                      >
                        {property.furnishing}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                        className="border p-2"
                      >
                        {property.status}
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
                            onClick={() => handleView(property)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            sx={{ color: "grey" }}
                            className="edit"
                            onClick={() => handleEdit(property)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            sx={{ color: "red" }}
                            className="delete"
                            onClick={() => handleDelete(property)}
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
                Property Details
              </Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedProperty && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedProperty)
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
              <Typography variant="h6">Edit Property</Typography>
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
                    {field === "propertyTitle" ? (
                      <FormControl fullWidth>
                        <InputLabel>Property Title</InputLabel>
                        <Select
                          label="Property Title"
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
                          label="Property Type"
                          value={editFormData[field] || ""}
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
                          label="Furnishing"
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                        >
                          <MenuItem value="Furnished">Furnished</MenuItem>
                          <MenuItem value="Semi-furnished">
                            Semi-furnished
                          </MenuItem>
                          <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                          <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "status" ? (
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          label="Status"
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                        >
                             <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Sold">Sold</MenuItem>
                            <MenuItem value="rented">Rented</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                      </FormControl>
                    ): field === "price" || field === "areaSqft" ? (
                      <TextField
                        type="number"
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || Number(value) >= 0) {
                            handleEditInputChange(field)(e);
                          }
                        }}
                        fullWidth
                      />
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
              Are you sure you want to delete this property?
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

        {/* Add property Modal  */}
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Property
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="propertyTitle">Property Title</InputLabel>
                  <Select
                    label="Property Title"
                    name="propertyTitle"
                    value={addFormData.propertyTitle}
                    onChange={handleAddInputChange("propertyTitle")}
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
                  <InputLabel id="propertyType">Property Type</InputLabel>
                  <Select
                    label="Property Type"
                    name="propertyType"
                    value={addFormData.propertyType}
                    onChange={handleAddInputChange("propertyType")}
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
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  fullWidth
                  label="address"
                  name="address"
                  value={addFormData.address}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z1-9]/.test(value)) {
                      handleAddInputChange("address")(e);
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={addFormData.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleAddInputChange("price")(e);
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  fullWidth
                  label="Area (Sqft)"
                  name="areaSqft"
                  type="number"
                  value={addFormData.areaSqft}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleAddInputChange("areaSqft")(e);
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="Furnishing">Furnishing</InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    label="Furnishing"
                    name="furnishing"
                    value={addFormData.furnishing}
                    onChange={handleAddInputChange("furnishing")}
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
                  <InputLabel id="status">Status</InputLabel>
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
                    className="cancle"
                    size="small"
                    onClick={handleCloseAddModal}
                  sx={{ color: "white", backgroundColor: "grey",transform: "scale(1.1)" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className="save"
                    onClick={handleAddProperty}
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)",transform: "scale(1.1)" }}
                  >
                    Save Property
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <TablePagination
      sx={{mt:-3}}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={properties.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PropertyTable;
