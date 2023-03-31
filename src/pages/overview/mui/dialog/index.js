// @mui
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import FormDialogs from './FormDialogs';
import AlertDialog from './AlertDialog';
import ScrollDialog from './ScrollDialog';
import SimpleDialogs from './SimpleDialogs';
import MaxWidthDialog from './MaxWidthDialog';
import FullScreenDialogs from './FullScreenDialogs';
import TransitionsDialogs from './TransitionsDialogs';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

export default function DialogComponent() {
  return (
    <Page title="Components: Dialog">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Dialog"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Dialog' }]}
              moreLink="https://mui.com/components/dialogs"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
            <Block title="Simple" sx={style}>
              <SimpleDialogs />
            </Block>

            <Block title="Alerts" sx={style}>
              <AlertDialog />
            </Block>

            <Block title="Transitions" sx={style}>
              <TransitionsDialogs />
            </Block>

            <Block title="Form" sx={style}>
              <FormDialogs />
            </Block>

            <Block title="Full Screen" sx={style}>
              <FullScreenDialogs />
            </Block>

            <Block title="Max Width Dialog" sx={style}>
              <MaxWidthDialog />
            </Block>

            <Block title="Scrolling Content Dialogs" sx={style}>
              <ScrollDialog />
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
