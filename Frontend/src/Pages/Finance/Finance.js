import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton, Modal, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";

const TableWithDropdown = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma",amount:"500000",transactionType:"Income",catogery:"Salary",PaymentMode:"cash",TransactionDate:"21st march",status: "Pending" },
    { id: 2, name: "Neha Verma", amount:"800000", transactionType:"Expence",catogery:"Payment Rent",PaymentMode:"UPI",TransactionDate:"1st feb" ,status: "Completed"},
    { id: 3, name: "Amit Kumar",amount:"45000", transactionType:"Expence",catogery:"Utilities",PaymentMode:"Credit Card", TransactionDate:"6th jan", status: "Cancled" },
  ]);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const deleteModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    textAlign: 'center'
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedfinance, setSelectedfinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedfinance(null);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedfinance(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedfinance(null);
  };
  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };
  const handleUpdate = () => {
    setData(data.map(item => item.id === editFormData.id ? editFormData : item));
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== selectedfinance.id));
    handleCloseDeleteModal();
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };
  const handleLStatusChange = (id, newLStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Lstatus: newLStatus } : row))
    );
  };
  const handleKStatusChange = (id, newKStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Kstatus: newKStatus } : row))
    );
  };
  const handlePStatusChange = (id, newPStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Pstatus: newPStatus } : row))
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

  return (
    <div className="p-4">
      <Table className="w-full border border-gray-300">
        <TableHead  sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            {[
              "S.No",
              "Name",
              "Amount",
              "TransactionType",
              "Catogery",
              " Payment Mode",
              "Transaction Date",
              "Status",
              "Action",
            ].map((header) => (
              <TableCell key={header} className="border p-2" sx={{ fontWeight: "bold"  ,flex:"1"}}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center">
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.name}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.amount}</TableCell>
              <TableCell    className="border p-2">
                <Select
                  value={row.transactionType}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expence">Expence</MenuItem>
            
                </Select>
             </TableCell>
             <TableCell    sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.catogery}
                  onChange={(e) => handleLStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Payment Rent">Payment Rent</MenuItem>
                  <MenuItem value="Utilities">Utilities</MenuItem>
            
                </Select>
             </TableCell>
             <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.PaymentMode}
                  onChange={(e) => handleKStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="cash">cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value=" Debit Card">Debit Card</MenuItem>
                </Select>
             </TableCell>
             <TableCell  sx={{ padding: "4px", fontSize: "12px" }}    className="border p-2">{row.TransactionDate}</TableCell>
             <TableCell   className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handlePStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed </MenuItem>
                  <MenuItem value="Cancled">Cancled</MenuItem>
                </Select>
             </TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">
                <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                  <IconButton color="black" onClick={() => handleView(row)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleDelete(row)}>
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          {/* View Modal */}
          <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">finance Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedfinance && (
            <Grid container spacing={2}>
              {Object.entries(selectedfinance).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle1"><strong>{key}:</strong> {value}</Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Edit finance</Typography>
            <IconButton onClick={handleCloseEditModal}><CloseIcon /></IconButton>
          </Box>
          <Grid container spacing={2}>
            {Object.keys(editFormData).map((field) => (
              field !== 'id' && (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    value={editFormData[field] || ''}
                    onChange={handleEditInputChange(field)}
                  />
                </Grid>
              )
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseEditModal}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate}>Update</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box sx={deleteModalStyle}>
          <Typography variant="h6" gutterBottom>Confirm Delete</Typography>
          <Typography sx={{ mb: 3 }}>Are you sure you want to delete this finance?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TableWithDropdown;
