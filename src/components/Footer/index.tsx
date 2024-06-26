import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        padding: ${theme.spacing(4)} 0;
        width: 100%;
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="left"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
        position={'absolute'}
        bottom={0}
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2023 - MkConnectioncr
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
