
import { ButtonBase, Chip, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";
import axios from 'axios';
import { createClerkClient } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";
import { env } from "~/env";
import DeleteIcon from '@mui/icons-material/Delete';

interface UserDetails {
    // Define the type of user details here
    firstName: string;
    lastName: string;
    // Add other properties as needed
}


const MyTable: React.FC<{ data: { id: string; userId: string; phone: string; tour: { name: string } }[] }> = ({ data }) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const query = api.reservation.deleteReservation.useMutation();
    useEffect(() => {
        const fetchUserDetails = async (userId: string) => {
            try {
                const response = await fetch(`/api/userById/${userId}`);

                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data.user);
                } else {
                    console.error('Failed to fetch user details:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        // Assuming data is an array of users and each user has a userId
        data.forEach((row) => {
            fetchUserDetails(row.userId);
        });
    }, [data]);

    const handleDelete = async (reservationId: string) => {
        try {
            await query.mutateAsync({reservationId: reservationId});
        } catch (error) {
            alert("No se borro")
        }
    };

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Numero de telefono</TableCell>
                        <TableCell>Tour</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0?
                     (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    No hay consultas para reservaciones.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                    data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : "N/A"}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.tour.name}</TableCell>
                            <ButtonBase onClick={() => handleDelete(row.id)}>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ButtonBase>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </Paper>
    );
};

function toursInteresados() {
    const { data: tableData, error } = api.reservation.getAllToursReservations.useQuery();
    if (error) {
        // Handle error, show an error message, or redirect
        return <div>Error loading data</div>;
    }

    return (
        <SidebarLayout>
            {tableData ? <MyTable data={tableData} /> : <div>Loading...</div>}
        </SidebarLayout>
    );
}

export default toursInteresados;