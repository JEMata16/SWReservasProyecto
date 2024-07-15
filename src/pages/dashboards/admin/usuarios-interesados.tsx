
import { ButtonBase, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingSpinner } from "~/components/Loading";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { EmailAddress } from "@clerk/nextjs/server";

interface UserDetails {
    // Define the type of user details here
    firstName: string;
    lastName: string;
    emailAddresses: EmailAddress[];
    // Add other properties as needed
}


type ReservationData = {
    id: string;
    phone: string;
    dateFrom: Date;
    hotel: {
        id: string;
        name: string;
    };
    userId: string;
};

const formatPhoneNumber = (phoneNumber: string): string => {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
    if (phoneNumberObj) {
        return phoneNumberObj.formatInternational();
    }
    return phoneNumber;
};

/**
 * Renders a table with tour reservations.
 *
 * @param {Array<ReservationData>} data - The data for the table.
 * @return {JSX.Element} The rendered table.
 */
const MyTable: React.FC<{data: Array<ReservationData>;}> = ({ data } : { data: Array<ReservationData>; }): JSX.Element => {
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

        data.forEach((row) => {
            fetchUserDetails(row.userId);
        });
    }, [data]);

    const handleDelete = async (reservationId: string) => {
        try {
            await query.mutateAsync({ reservationId });
        } catch (error) {
            alert("Couldn't delete");
        }
    };

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Numero de telefono</TableCell>
                        <TableCell>Hotel</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {data.length === 0 ? (
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
                                <TableCell>
                                    {userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : "N/A"}
                                </TableCell>
                                <TableCell>{formatPhoneNumber(row.phone)}</TableCell>
                                <TableCell>{row.hotel.name}</TableCell>
                                <TableCell>
                                    {userDetails ? `${userDetails.emailAddresses[0]?.emailAddress} ` : "N/A"}
                                </TableCell>
                                <ButtonBase onClick={() => handleDelete(row.id)}>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ButtonBase>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
};

/**
 * Render a component that displays a table of user-interested users, with their phone numbers and hotel names.
 * @returns JSX.Element
 */
function usuariosInteresados(): JSX.Element {
    const { data: tableData, error } = api.reservation.getAllReservations.useQuery<ReservationData[]>();
    if (error) {
        // Handle error, show an error message, or redirect
        return <div>Error loading data</div> as JSX.Element;
    }

    return (
        <SidebarLayout>
            {tableData ? (
                <MyTable  data={tableData}/>
            ) : (
                <LoadingSpinner/>
            )}
        </SidebarLayout>
    ) as JSX.Element;
}





export default usuariosInteresados;