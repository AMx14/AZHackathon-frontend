import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import FormMCQ from './FormMCQ'; // Import the FormMCQ component

const CreateMCQ = () => {
    const { id } = useParams();
    const [questionCount, setQuestionCount] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        fetchQuestionCount();
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        } else {
            console.error('No access token found. Please log in.');
        }
    }, []);

    const fetchQuestionCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/mcqs/count/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setQuestionCount(response.data.count);
        } catch (error) {
            console.error('Error fetching question count:', error.response ? error.response.data : error.message);
        }
    };

    const handleFormOpen = () => {
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        // Optionally, you can refresh the question count after form submission
        fetchQuestionCount();
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Questions in Lobby {id}
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        Total Questions: {questionCount}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Current Lobby ID: {id}
                    </Typography>
                    <Grid container justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleFormOpen} style={{ marginBottom: 20 }}>
                            Create MCQ
                        </Button>
                    </Grid>
                    {showForm && <FormMCQ lid={id} handleClose={handleFormClose} />} {/* Pass lid as props to FormMCQ */}
                    <Grid container justifyContent="flex-end">
                        <Button component={Link} to={`/home/${id}`} variant="outlined" color="secondary">
                            Go Back
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CreateMCQ;
