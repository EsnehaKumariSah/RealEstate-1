// import React from "react";
// import {Box, Button, TextField} from "@mui/material"

// const Forgot=()=>
// {
//       return (
//         <>
//           <Box
//             component="form"
//             sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
//             noValidate
//             autoComplete="off" className="register">

//             <Box className="header_title">Register</Box>     

//             <Box className="signIn">  

//            <TextField
//            type="email"
//            required
//            id="email"
//            variant="standard"
//            label="Enter Email Id"
//         />

//          <TextField
//           type="password"
//           required
//            variant="standard"
//           id="password"
//           label="Enter Password"
//         />
            
//          <Box className="forgot_password">
//             <Box className="forgot">Forgot Password</Box>
//          </Box>
          
//           <Button className="primary_button">Register</Button>
            
//          <Box className="account">
//             <Box>Already an account</Box>
//             <Box className="forgot">Login</Box>
//          </Box>

//           </Box> 
        
//         </Box> 
//         </>
//       )
// }

// export default Forgot;
import React from "react";
import {Box, Button, TextField} from "@mui/material"

const Forgot = () => {
      return (
        <>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off" className="register">

            <Box className="header_title">Forgot Password</Box>     

            <Box className="signUp">  

           <TextField
           type="email"
           required
           id="email"
           variant="standard"
           label="Enter Email Id"
           />

           <Button 
           type="submit"
           className="primary_button" 
           sx={{ width: "400px" }}
           >
           Submit
           </Button>
           </Box>
           </Box>
        </>
      );
};

export default Forgot;