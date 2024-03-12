import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider
  } from '@mui/material';
  import CardActions from '@mui/material/CardActions';
  import { styled } from '@mui/material/styles';
  
  import Button from '@mui/material/Button';
  import Box from '@mui/material/Box';
  import CardMedia from '@mui/material/CardMedia';
  import Collapse from '@mui/material/Collapse';
  import Avatar from '@mui/material/Avatar';
  import IconButton, { IconButtonProps } from '@mui/material/IconButton';
  import Typography from '@mui/material/Typography';
  import { red } from '@mui/material/colors';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import ShareIcon from '@mui/icons-material/Share';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import MoreVertIcon from '@mui/icons-material/MoreVert';

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

function Cards() {

    return(
        <Grid item xs={12}>
            <Card>
              <CardHeader title="Media" />
              <Divider />
              <CardContent>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/placeholders/covers/6.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </CardContent>
            </Card>
          </Grid>

    );
}

export default Cards;