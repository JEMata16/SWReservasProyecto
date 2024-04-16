
import SidebarLayout from "~/layouts/SidebarLayout";
import { ButtonBase, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { api } from "~/utils/api";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { AffiliationTypes, UserAffiliation } from "@prisma/client";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

    return (
        <div className={`${modalClasses} bg-black bg-opacity-50`}>
            <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
                <button className="absolute top-28 right-4 text-gray-400" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

interface AffiliateButtonProps {
    user: User;
    emailAddress: string | undefined;
}
const AffiliateButton: React.FC<AffiliateButtonProps> = ({ user, emailAddress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [affiliationType, setAffiliation] = useState("FREE");
    const mutation = api.affiliation.createUserAffiliation.useMutation();
    const AffiliationTypeArray = [AffiliationTypes.FREE, AffiliationTypes.FAST, AffiliationTypes.ACCELERATE, AffiliationTypes.PREMIUM];
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const affiliate = async () => {
        try {
            await mutation.mutateAsync({
                userId: user.id,
                affiliation: affiliationType,
                affiliated: true,
            });
            window.location.reload();
        } catch (error) {
            alert("No se pudo crear la afiliación");
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAffiliation(event.target.value as string);
      };

    return (
        <>
            <div>
                <ButtonBase onClick={openModal}>
                    <IconButton aria-label="Create afiliation">
                        <CheckIcon />
                    </IconButton>
                </ButtonBase>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div>
                        <Typography variant="h2" id="modal-title" mb={2}>
                            ¿Quiere afiliar a la siguiente persona?
                        </Typography>
                        <Typography variant="h4">{emailAddress}</Typography>
                        <Typography sx={{ mt: 2 }} variant="h4">Select Affiliation type</Typography>

                        <Select sx={{ width: "100%" }} value={affiliationType} onChange={handleChange}>
                            {AffiliationTypeArray.map(affiliationType =>
                                <MenuItem value={affiliationType}>{affiliationType}</MenuItem>
                            )}
                        </Select>


                        <button
                            type="button"
                            onClick={affiliate}
                            className="mt-4 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                        >
                            Crear afiliación para el siguiente usuario
                        </button>
                    </div>
                </Modal >
            </div >

        </>
    );
};

const DeleteAffiliationButton: React.FC<AffiliateButtonProps> = ({ user, emailAddress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mutation = api.affiliation.deleteUserAffiliation.useMutation();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteAffiliate = async () => {
        try {
            await mutation.mutateAsync({
                id: user.id,
            });
            window.location.reload();
        } catch (error) {
            alert("No se pudo borrar afiliación");
        }
    };

    return (
        <>
            <div>
                <ButtonBase onClick={openModal}>
                    <IconButton aria-label="Create afiliation">
                        <CancelIcon />
                    </IconButton>
                </ButtonBase>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div>
                        <Typography variant="h2" id="modal-title" mb={2}>
                            ¿Quiere afiliar a la siguiente persona?
                        </Typography>
                        <Typography variant="h4">{emailAddress}</Typography>


                        <button
                            type="button"
                            onClick={deleteAffiliate}
                            className="mt-4 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                        >
                            Borrar afiliación para este usuario
                        </button>
                    </div>
                </Modal >
            </div >

        </>
    );
};


const usersAdmin = ({ users }: { users: User[] }) => {
    const { data: userAffiliations } = api.affiliation.getAll.useQuery();
    return (
        <>
            <SidebarLayout>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Afiliación</TableCell>
                                <TableCell>Fecha de afiliación</TableCell>
                                <TableCell>Afiliar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            No hay consultas para reservaciones.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {row ? `${row.firstName} ${row.lastName}` : "N/A"}
                                        </TableCell>
                                        <TableCell>{row.emailAddresses.map((email, index) => (
                                            <div key={index}>{email.emailAddress}</div>
                                        ))}
                                        </TableCell>
                                        <TableCell>{userAffiliations?.find((affiliation) => affiliation.userId == row.id)?.affiliation}</TableCell>
                                        <TableCell>{userAffiliations?.find((affiliation) => affiliation.userId == row.id)?.Date.toDateString()}</TableCell>
                                        {userAffiliations?.find((affiliation) => affiliation.userId == row.id) ?
                                            <DeleteAffiliationButton key={row.id} user={row} emailAddress={row.emailAddresses?.[0]?.emailAddress} />
                                            :
                                            <AffiliateButton key={row.id} user={row} emailAddress={row.emailAddresses?.[0]?.emailAddress} />
                                        }

                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </SidebarLayout>

        </>
    )

}

export async function getStaticProps() {
    const users = await clerkClient.users.getUserList({ orderBy: '+created_at', limit: 100 });
    const usersJson = JSON.parse(JSON.stringify(users));

    return {
        props: { users: usersJson },
    };
}


export default usersAdmin;