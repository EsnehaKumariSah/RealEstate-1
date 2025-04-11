import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  TableContainer,
  MenuItem,
  IconButton,
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
      amount: "500000",
      transactionType: "Income",
      catogery: "Salary",
      PaymentMode: "cash",
      TransactionDate: "21st march",
      status: "Pending",
    },
    {
      id: 2,
      name: "Neha Verma",
      amount: "800000",
      transactionType: "Expence",
      catogery: "Payment Rent",
      PaymentMode: "UPI",
      TransactionDate: "1st feb",
      status: "Completed",
    },
    {
      id: 3,
      name: "Amit Kumar",
      amount: "45000",
      transactionType: "Expence",
      catogery: "Utilities",
      PaymentMode: "Credit Card",
      TransactionDate: "6th jan",
      status: "Cancled",
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
  const [selectedfinance, setSelectedfinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [finances, setFinances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiFinances, setApiFinances] = useState([]);
  const [addFormData,setAddFormData] =useState({
    name: '',
    amount: '',
    transactionType: '',
    catogery: '',
    PaymentMode: '',
    TransactionDate:'',
    status:'Pending',
    })
    const [addModalOpen,setAddModalOpen]=useState(false);
  
    const navigate =useNavigate();

  const getAllFinance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/finance/getAllFinance`
      );
      console.log("response", res.data);
      setFinances(res.data);
      setApiFinances(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllFinance();
  }, []);

  // const getAllProperty = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3001/property/getAllProperty`
  //     );
  //     console.log("response", res.data);
  //     setProperties(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllProperty();
  // }, []);
  const handleView = (finance) => {
    setSelectedfinance(finance);
    setViewModalOpen(true);
  };

  const handleEdit = (finance) => {
    setSelectedfinance(finance);
    setEditFormData(finance);
    setEditModalOpen(true);
  };

  const handleDelete = (finance) => {
    setSelectedfinance(finance);
    setDeleteModalOpen(true);
  };
  const handleAddNew=()=>{
    setAddModalOpen(true);
  }
  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
  const handleCloseAddModal =()=> setAddModalOpen(false);

  const handleAddInputChange =(field) => (event) =>{
    setAddFormData({
      ...addFormData,
      [field]:event.target.value,
    });
  };
  const handleAddFinance = async () => {
    try {
      const response = await axios.post('http://localhost:3001/finance/createFinance', addFormData);
      if (response.data.success) {
        toast.success('finance added successfully!');
        handleCloseAddModal();
        getAllFinance();
        // Reset form data
        setAddFormData({
          name: '',
          amount: '',
          transactionType: '',
          catogery: '',
          PaymentMode: '',
          TransactionDate:'',
          status:'Pending',
         
        });
      }
    } catch (error) {
      console.error('Error adding finance:', error);
      toast.error(error.response?.data?.message || 'Failed to add finance');
    }
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
  };
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(
       ` http://localhost:3001/finance/updateFinance/${selectedfinance._id}`, editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllFinance();
        setEditFormData({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  const handleConfirmDelete = async() => {
   
    // Here you would typically make an API call to delete the property
    handleCloseDeleteModal();
    try{
       const res=await axios.delete(`http://localhost:3001/finance/deleteFinance/${selectedfinance._id}`);
       if(res.data.success){
        toast.success(res.data.message);
        getAllFinance();
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
  const handleLStatusChange = (id, newLStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, Lstatus: newLStatus } : row
      )
    );
  };
  const handlePStatusChange = (id, newPStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, Pstatus: newPStatus } : row
      )
    );
  };
  const handleKStatusChange = (id, newKStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, Kstatus: newKStatus } : row
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
      setFinances(finances); // Reset to full list when search is empty
      return;
    }

    const filtered = apiFinances.filter((finance) => {
      return (
        finance.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        finance.TransactionDate.toLowerCase().includes(value) ||
        finance.amount.toString().toLowerCase().includes(value)
      );
    });

    setFinances(filtered);
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
          //onClick={handleAddNew}

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
          Add Finance
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: "1070px" }}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{
              height: "20px",
              position: "sticky",
              background: "white",
              zIndex: 2,
              top: "0",
              whiteSpace: "nowrap",
              fontSize: "15px",
            }}
          >
            <TableRow className="bg-gray-200">
              {[
                "S.No",
                "Name",
                "Amount",
                "TransactionType",
                "Category",
                " Payment Mode",
                "Transaction Date",
                "Status",
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
            {finances.map((finance,index) => (
              <TableRow
                key={finance._id}
                className="text-center "
                sx={{ whiteSpace: "nowrap" }}
              >
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center",paddingLeft:"20px" }}
                  className="border p-2"
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {finance.name}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {finance.amount}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                 
                    {finance.transactionType}
                   
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                 {finance.catogery}
                    
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                 {finance.PaymentMode}
                    
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {finance.TransactionDate}
                </TableCell>
                <TableCell
                  sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                  className="border p-2"
                >
                  {finance.status}
                   
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
                      fontWeight: "12px",
                    }}
                  >
                    <IconButton
                      sx={{ color: "blue" }}
                      onClick={() => handleView(finance)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "green" }}
                      onClick={() => handleEdit(finance)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(finance)}
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
              <Typography variant="h6">finance Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedfinance && (
              <Grid container spacing={2}>
                {Object.entries(selectedfinance)
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
              <Typography variant="h6">Edit finance</Typography>
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
                      { field==="transactionType"? (
                        <FormControl fullWidth>
                          <InputLabel>
                          Transaction Type
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field]|| ""}
                          onChange={handleEditInputChange(field)}
                          >
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expence">Expence</MenuItem>
                          </Select>
                        </FormControl>
                      ): field==="catogery"?(
                        <FormControl fullWidth>
                          <InputLabel>
                          Catogery
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field]|| ""}
                          onChange={handleEditInputChange(field)}
                          >
                            <MenuItem value="Salary">Salary</MenuItem>
                            <MenuItem value="Payment Rent">Payment Rent</MenuItem>
                            <MenuItem value="Utilities">Utilities</MenuItem>
                          </Select>
                        </FormControl>
                      ): field==="PaymentMode"?(
                        <FormControl fullWidth>
                          <InputLabel>
                          Payment Mode
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field]|| ""}
                          onChange={handleEditInputChange(field)}
                          >
                     <MenuItem value="cash">cash</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value=" Debit Card">Debit Card</MenuItem>
                          </Select>
                        </FormControl>
                      ): field==="status"?(
                        <FormControl fullWidth>
                          <InputLabel>
                          Status
                          </InputLabel>
                          <Select
                          variant="standard"
                          value={editFormData[field]|| ""}
                          onChange={handleEditInputChange(field)}
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed </MenuItem>
                    <MenuItem value="Cancled">Cancled</MenuItem>
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
              Are you sure you want to delete this finance?
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
           {/* add Finance model */}
           <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Finance</Typography>
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
                label="amount"
                name="amonut"
                value={addFormData.amount}
                onChange={handleAddInputChange('amount')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="TransactionType-label"> Transaction Type</InputLabel>
                <Select
                  labelId="TransactionType-label"
                  name="TransactionType"
                  value={addFormData.transactionType}
                  onChange={handleAddInputChange('transactionType')}
                  required
                > 
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expence">Expence</MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="catogery-label"> catogery</InputLabel>
                <Select
                  labelId="catogery-label"
                  name="catogery"
                  value={addFormData.catogery}
                  onChange={handleAddInputChange('catogery')}
                  required
                > 
               <MenuItem value="Salary">Salary</MenuItem>
                    <MenuItem value="Payment Rent">Payment Rent</MenuItem>
                    <MenuItem value="Utilities">Utilities</MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="PaymentMode-label"> Payment Mode</InputLabel>
                <Select
                  labelId="PaymentMode-label"
                  name="PaymentMode"
                  value={addFormData.PaymentMode}
                  onChange={handleAddInputChange('PaymentMode')}
                  required
                > 
                                  <MenuItem value="cash">cash</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value=" Debit Card">Debit Card</MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="TransactionDate"
                name="TransactionDate"
                value={addFormData.TransactionDate}
                onChange={handleAddInputChange('TransactionDate')}
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
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed </MenuItem>
                    <MenuItem value="Cancled">Cancled</MenuItem>
                 
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
                  onClick={handleAddFinance}
                >
                  Save Finance
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
