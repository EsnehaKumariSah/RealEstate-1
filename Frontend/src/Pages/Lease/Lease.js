import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton, Modal, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";

const TableWithDropdown = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "23467889", address: "Adityapur", StartDate: "1st jan", EndDate:" 1th april ", MonthlyRent:"5000", Deposite:"2000", status: "Pending",Lstatus:"Active" },
    { id: 2, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543210", address: "Ranchi", StartDate: "2nd feb", EndDate:" 1th march ", MonthlyRent:"9000", Deposite:"5000", status: "Paid",Lstatus:"Terminated" },
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "8765432109", address: "Jamshedpur", StartDate: "1st jan", EndDate:" 1th april ", MonthlyRent:"5500", Deposite:"2000", status: "OverDue",Lstatus:"Expired"  },
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
  const [selectedlease, setSelectedlease] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleView = (lease) => {
    setSelectedlease(lease);
    setViewModalOpen(true);
  };
  
  const handleEdit = (agent) => {
    setSelectedlease(agent);
    setEditFormData(agent);
    setEditModalOpen(true);
  };

  const handleDelete = (agent) => {
    setSelectedlease(agent);
    setDeleteModalOpen(true);
  };
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedlease(null);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedlease(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedlease(null);
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
    setData(data.filter(item => item.id !== selectedlease.id));
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
    <div className="p-4" style={{ overflowY: "auto", maxHeight: "400px"  }}>
      <Table className="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            {[
              "S.No",
              "Name",
              "Email",
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
              <TableCell key={header} className="border p-2" sx={{ fontWeight: "bold", flex: "1" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody >
          {data.map((row) => (
            <TableRow key={row.id} className="text-center" >
              <TableCell   sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell  sx={{ padding: "2px", fontSize: "12px" }}  className="border p-2">{row.name}</TableCell>
              <TableCell   sx={{ padding: "2px", fontSize: "12px" }}className="border p-2">{row.email}</TableCell>
              <TableCell  sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">{row.phone}</TableCell>
              <TableCell sx={{ padding: "2px", fontSize: "12px" }}  className="border p-2">{row.address}</TableCell>
              <TableCell   sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">{row.StartDate}</TableCell>
              <TableCell  sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">{row.EndDate}</TableCell>
              <TableCell  sx={{ padding: "2px", fontSize: "12px" }}className="border p-2">{row.MonthlyRent}</TableCell>
              <TableCell sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">{row.Deposite}</TableCell>
              <TableCell  sx={{ padding: "2px", fontSize: "12px" }}className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="OverDue">OverDue</MenuItem>
                </Select>
              </TableCell>
              <TableCell sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.Lstatus}
                  onChange={(e) => handleLStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                </Select>
              </TableCell>
              <TableCell  sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">
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
                     <Typography variant="h6">lease Details</Typography>
                     <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
                   </Box>
                   {selectedlease && (
                     <Grid container spacing={2}>
                       {Object.entries(selectedlease).map(([key, value]) => (
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
                  <Typography variant="h6">Edit lease</Typography>
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
                      <Typography sx={{ mb: 3 }}>Are you sure you want to delete this agent?</Typography>
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
