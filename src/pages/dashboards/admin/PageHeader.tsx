import { useUser } from '@clerk/nextjs';
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const {user} = useUser();
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user?.firstName}
          src={user?.imageUrl}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido, {user?.firstName}!
        </Typography>
        <Typography variant="subtitle2">
          A comenzar el día!!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
