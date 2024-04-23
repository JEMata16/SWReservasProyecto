import {
    Button,
    Card,
    Box,
    Grid,
    Typography,
    styled,
    Avatar,
    Divider,
    alpha,
    ListItem,
    ListItemText,
    List,
    ListItemAvatar,
    NoSsr,
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import type { ApexOptions } from 'apexcharts';
import { PureLightTheme } from '~/styles/schemes/PureLightTheme';
import dynamic from 'next/dynamic';
import { useAuth } from '@clerk/nextjs';
import { api } from '~/utils/api';
import { saveAs } from 'file-saver';

const theme = PureLightTheme;

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
    ({ theme }) => `
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    background: ${theme.palette.mode === 'dark'
            ? theme.colors.alpha.trueWhite[30]
            : alpha(theme.colors.alpha.black[100], 0.07)
        };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
  `
);
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

function Graphics() {
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
    // Data for charts
    const {userId} = useAuth();
    const {data: reservations} = api.affiliation.getReservations.useQuery<ReservationData[]>({userid: userId!});
    const reservationLables = reservations?.map((reservation) => reservation.hotel.name) ?? ["No reservations"];
    const hotelNameCount = reservations?.reduce((acc, reservation) => {
        acc[reservation.hotel.name] = (acc[reservation.hotel.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>) ?? {};
    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '60%'
                }
            }
        },
        colors: ['#ff9900', '#4F804D', '#1c81c2', '#333', '#5c6ac0', '#F779DE', '#f6b26b'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            style: {
                colors: [theme.colors.alpha.trueWhite[100]]
            },
            background: {
                enabled: true,
                foreColor: theme.colors.alpha.trueWhite[100],
                padding: 8,
                borderRadius: 4,
                borderWidth: 0,
                opacity: 0.3,
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: theme.colors.alpha.black[70],
                    opacity: 0.5
                }
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: theme.colors.alpha.black[50],
                opacity: 0.5
            }
        },
        fill: {
            opacity: 1
        },
        labels: reservationLables,
        legend: {
            labels: {
                colors: theme.colors.alpha.trueWhite[100]
            },
            show: false
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        }
    };

    const chartSeries = Object.values(hotelNameCount);
    const downloadExcel = async () => {
        if (reservations) {
            const XLSX = await import('xlsx'); // Dynamic import
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(reservations);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Chart Data');
            const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'chart_data.xlsx');
        }
    };
    

    return (
        <NoSsr>
            <Card>
                <Grid spacing={0} container>
                    <Grid item xs={12} md={6}>
                        <Box p={4}>
                            <Typography
                                sx={{
                                    pb: 3
                                }}
                                variant="h4"
                            >
                                Reservations
                            </Typography>
                            <Box>
                                <Typography variant="h1" gutterBottom>
                                    {reservations?.length} to attend
                                </Typography>
                                <Box
                                    display="flex"
                                    sx={{
                                        py: 4
                                    }}
                                    alignItems="center"
                                >
                                    <AvatarSuccess
                                        sx={{
                                            mr: 2
                                        }}
                                        variant="rounded"
                                    >
                                        <TrendingUp fontSize="large" />
                                    </AvatarSuccess>
                                    <Box>
                                        <Typography variant="h4">+ {reservations?.length}</Typography>
                                        <Typography variant="subtitle2" noWrap>
                                            this month
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid sm item>
                                    <Button onClick={downloadExcel} fullWidth variant="outlined">
                                        Download list
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{
                            position: 'relative'
                        }}
                        display="flex"
                        alignItems="center"
                        item
                        xs={12}
                        md={6}
                    >
                        <Box
                            component="span"
                            sx={{
                                display: { xs: 'none', md: 'inline-block' }
                            }}
                        >
                            <Divider absolute orientation="vertical" />
                        </Box>
                        <Box py={4} pr={4} flex={1}>
                            <Grid container spacing={0}>
                                <Grid
                                    xs={12}
                                    sm={5}
                                    item
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Chart
                                        height={250}
                                        options={chartOptions}
                                        series={chartSeries}
                                        type="donut"
                                    />

                                </Grid>
                                <Grid xs={12} sm={7} item display="flex" alignItems="center">
                                    <List
                                        disablePadding
                                        sx={{
                                            width: '100%'
                                        }}
                                    >
                                        {reservationLables && reservationLables.map((reservation, index) => (
                                            <ListItem disableGutters>
                                            <ListItemText
                                                primary={reservation}
                                                primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                                                secondaryTypographyProps={{
                                                    variant: 'subtitle2',
                                                    noWrap: true
                                                }}
                                            />
                                            <Box>
                                            </Box>
                                        </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </NoSsr>
    );
}

export default Graphics;
