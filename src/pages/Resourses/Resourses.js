import React, { useEffect, useState } from 'react';
import { Col, FormControl, InputGroup, Nav, Navbar, Row, Modal as BootstrapModal } from 'react-bootstrap';
import { BsSortDownAlt } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { modalStyle } from '../../config';
import { dataLimit, imageBaseUrl } from '../..';
import { downloadedResoursesByUserID, downloadResourseByID, getAllResourse } from '../../api/Resourses/Resourses';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function Resourses() {
  // // setting topics data into a variable
  const [resourses, setResourses] = useState([]);
  const [downloadedResourses, setDownloadedResourses] = useState([]);
  const [noResourses, setNoResourses] = useState(false);

  // // table data loading indicator
  const [dataLoading, setDataLoading] = useState(false);

  // // sets the user picked date from the apply filter modal
  const [filterDateFrom, setFilterDateFrom] = useState();
  const [filterDateTo, setFilterDateTo] = useState();
  const [filterStatus, setFilterStatus] = useState();

  const [page, setPage] = useState(1);
  // // const [rowLimit, setRowLimit] = useState(dataLimit)
  const [totalPages, setTotalPages] = useState();

  // // sets the visibility of the filter modal
  const [filterModal, setFilterModal] = useState(false);
  const [status, setStatus] = useState(false);

  // // sets the loader of apply changes in filter modal
  const [filterLoader, setFilterLoader] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const userDetails = useSelector((state) => state);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    setDataLoading(true);
    setNoResourses(false);
    getAllResourse(page, dataLimit)
      .then((res) => {
        // console.log('res', res);
        if (res.status) {
          // // setting the fetched resourses into state variable
          setResourses(res.results.data);
          setTotalPages(res.results.totalPages);
        } else {
          // // setting no Topic found variable true
          setNoResourses(true);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, dataLimit]);

  useEffect(() => {
    setDataLoading(true);
    setNoResourses(false);
    downloadedResoursesByUserID(userDetails._id)
      .then((res) => {
        console.log('res', res);
        if (res.status) {
          // // setting the fetched Topics into state variable
          setDownloadedResourses(res.downlaod.resources);
        } else {
          // // setting no Topic found variable true
          setNoResourses(true);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // // function for download resourse
  function downloadResourse(id) {
    downloadResourseByID(userDetails._id, id)
      .then((res) => {
        console.log(res);
        if (res.status) {
          console.log('Resourse Downloaded successfully');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Box sx={{ width: '90%', m: '0 auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="All Resources" {...a11yProps(0)} />
            <Tab label="Downloaded Resources" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {dataLoading ? (
            <div
              className="w-100 py-2 px-6 me-3"
              style={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}
            >
              <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
            </div>
          ) : (
            <>
              <div className="w-100 h-100 clr-primary-400 ">
                <div className="d-flex justify-content-center clr-primary-400 mt-4" style={{ height: 80 }}>
                  <div className="row w-100 mt-4">
                    <div className="col-lg-9 col-md-9 col-10">
                      <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    </div>
                    <div className="col-lg-3 col-md-3 col-1">
                      <button className="btn btn-light" onClick={() => setFilterModal(true)}>
                        <BsSortDownAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3 mx-4">
                <div className="">
                  <h5 className="txt-5282F0 fw-bold">All Resources</h5>
                  <h6 className="txt-5282F0 fw-bold">{resourses.length} Results</h6>
                </div>
              </div>

              <div className="row mt-3 mx-5">
                {resourses.map((items, index) => (
                  <>
                    <div className="col-12 col-lg-4 col-md-4 mb-4">
                      <Card variant="outline">
                        <CardContent>
                          <div className="d-flex align-items-start">
                            <h5 className="mb-0 txt-5282F0 fw-bold">{items.name}</h5>
                          </div>
                          <div className="d-flex align-items-center mt-2">
                            <p>{items.description.substring(0, 150)}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <a
                        href={imageBaseUrl + items.fileLink.linkString}
                        rel="noreferrer"
                        target="_blank"
                        className="btn w-100 mt-2   clr-primary-200"
                        download
                        onClick={() => downloadResourse(items._id)}
                      >
                        Download
                      </a>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {dataLoading ? (
            <div
              className="w-100 py-2 px-6 me-3"
              style={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}
            >
              <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
            </div>
          ) : (
            <>
              <div className="w-100 h-100 ">
                <div className="d-flex justify-content-center clr-primary-400 mt-4" style={{ height: 80 }}>
                  <div className="row w-100 mt-4">
                    <div className="col-lg-9 col-sm-6 col-10">
                      <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    </div>
                    <div className="col-lg-3 col-md-2 col-2">
                      <button className="btn btn-light" onClick={() => setFilterModal(true)}>
                        <BsSortDownAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3 mx-4">
                  <div className="">
                    <h5 className="txt-5282F0 fw-bold">Downloaded Resources</h5>
                    <h6 className="txt-5282F0 fw-bold">{downloadedResourses.length} Results</h6>
                  </div>
                </div>
              </div>

              <div className="row mt-3 mx-5">
                {downloadedResourses.map((items, index) => (
                  <>
                    <div className="col-12 col-lg-3 col-md-4 mb-4">
                      <Card>
                        <CardContent>
                          <div className="d-flex align-items-start">
                            <h5 className="mb-0 txt-5282F0 fw-bold">{items.name}</h5>
                          </div>
                          <div className="d-flex align-items-center mt-2">
                            <p>{items.description.substring(0, 150)}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <a
                        href={imageBaseUrl + items.fileLink.linkString}
                        className="btn w-100 mt-2   clr-primary-200"
                        download
                        onClick={() => downloadResourse(items._id)}
                      >
                        Download Again
                      </a>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </TabPanel>
      </Box>

      {/* Modal for applying filter */}
      <Modal
        open={filterModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onClose={() => setFilterModal(false)}
      >
        <Box sx={modalStyle}>
        <BootstrapModal.Header className="clr-primary-400 py-2" >
            <Grid container>
              <Grid item xs={11} lg={11} md={11} sm={11}>
                <Typography variant="h6">
                  Apply Filter
                </Typography>
              </Grid>
              <Grid item xs={1} lg={1} md={1}>
                <Button onClick={() => setFilterModal(false)} >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
            {/* <h4 className="text-center   mb-0">Apply Filter</h4> */}

          </BootstrapModal.Header>
          <BootstrapModal.Body>
            <div className="row labelColor mt-3">
              <h6>Courses</h6>
              <div className="d-flex justify-content-start align-items-center mt-2">
                <div className="row">
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2">
                    <button className=" btn   ">All</button>
                  </div>
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2">
                    <button className=" btn txt-5282F0 ">CBSE</button>
                  </div>
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2">
                    <button className=" btn txt-5282F0 ">BSEB</button>
                  </div>
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2">
                    <button className=" btn txt-5282F0 ">HSEB</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row labelColor mt-3">
              <h6>Subjects</h6>
              <div className="d-flex justify-content-start align-items-center mt-2">
                <div className="row">
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2">
                    <button className=" btn   ">All</button>
                  </div>
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2">
                    <button className=" btn txt-5282F0 ">Biology</button>
                  </div>
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2">
                    <button className=" btn txt-5282F0 ">Physics</button>
                  </div>
                  <div className="col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2">
                    <button className=" btn txt-5282F0 ">Chemistry </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4 pb-3">
              <Button
                variant="outlined"
                className="px-5"
              // onClick={()=>resetFilterData()}
              >
                Reset{' '}
              </Button>
              &emsp;
              {filterLoader ? (
                <Button variant="contained" className=" px-5">
                  <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className=" px-5"
                // onClick={() => { applyFilters() }}
                >
                  Confirm
                </Button>
              )}
            </div>
          </BootstrapModal.Body>
        </Box>
      </Modal>
    </>
  );
}
