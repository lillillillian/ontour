import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";

import Navigation from "../Navigation";
import Footer from "../components/Footer";
import ResetPassword from '../components/ResetPassword';


function ProfilePage() {
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [officialProfileName, setOfficialProfileName] = useState("");


    useEffect(() => {
<<<<<<< Updated upstream
        if (isAuthenticated && user && user.email) {
                setUserEmail(user.email);
                if (user['https://tourscout.comuser_metadata'] && user['https://tourscout.comuser_metadata'].username) {
                    setUsername(user['https://tourscout.comuser_metadata'].username);
                    setOfficialProfileName(user['https://tourscout.comuser_metadata'].username);
                }
        }
        console.log(user);
=======
      if (isAuthenticated && user && user.email) {
            setUserEmail(user.email);
            if (user['https://tourscout.comapp_metadata'] && user['https://tourscout.comapp_metadata'].username) { // Adjust the namespace to what you set in the action
                setUsername(user['https://tourscout.comapp_metadata'].username);
                setOfficialProfileName(user['https://tourscout.comapp_metadata'].username);
            }
            console.log(user['https://tourscout.comapp_metadata'].user_id);
            console.log(user);
            console.log(user.email);
            //console.log(user['https://tourscout.com'].username);
            console.log(officialProfileName);
            console.log("officialname");
      }
>>>>>>> Stashed changes
    }, [user, isAuthenticated]);

    return (
        <>
            <Helmet></Helmet>
            <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={4} direction="column" sx={{ padding: '10px' }}>
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Email"
                                variant="outlined" 
                                value={userEmail}
                                onChange={(e) => { 
                                    setUserEmail(e.target.value); 
                                }}
                                />
                            </Grid>
                        </Grid>
    
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item xs={6}>
                                <TextField 
                                fullWidth
                                label="Password" 
                                type="password" 
                                variant="outlined" 
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ResetPassword></ResetPassword>
                            </Grid>
                        </Grid>
    
                        <Grid item xs={12} container ="center" justifyContent="center">
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Official Profile Name" 
                                variant="outlined" 
                                value={officialProfileName}
                                onChange={(e) => { 
                                    setOfficialProfileName(e.target.value); 
                                }}
                                />
                            </Grid>
                            {/* <Grid item xs={3}>
                                <Button variant="text">Request Edit Access</Button>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12}>
                    <hr id="artist-footer"></hr>
                    <Footer />
                </Grid>
            </Grid >
        </>
    );
    

}
export default ProfilePage;