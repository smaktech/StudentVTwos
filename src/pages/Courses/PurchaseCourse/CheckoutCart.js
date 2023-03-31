import { useEffect, useState } from 'react';
import { sum } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// import { getCourseById } from 'src/api/Courses/Courses';
// @mui

import { FormControl, Modal as BootstrapModal } from 'react-bootstrap';
import { Grid, Card,Box, CardContent ,Button, Modal,CardHeader, Typography } from '@mui/material';
import { getCourseById } from '../../../api/Courses/Courses';
import { getCartCourse, paymentGetway, removeCartItem } from '../../../api/Subscription/subscription';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
 
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../redux/slices/product';

import {
  deleteCart,
  setCartItems
 
} from '../../../redux/slices/cart';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import {  AnnualPlanperSubject, AnnualPlanwithUnlimitedAccess, modalStyle, MonthlyPlanperSubject } from '../../../config';
import Loader from 'react-loader-spinner';
// ----------------------------------------------------------------------

import CloseIcon from '@mui/icons-material/Close';

export default function CheckoutCart() {

  // const courseIdArray = JSON.parse(localStorage.getItem('carts'))
  // console.log(courseIdArray)
  const [coursesId, setCoursesId] = useState([])
  const [courses, setCourses] = useState([])

  const userDetails = useSelector((state) => state.user.info);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [update, setUpdate] = useState(false)
  const userId = userDetails?._id
  const [loading,setLoading] = useState(false)
  const [planMsg,setPlanMsg] = useState("")
  const [pricingModal, setPricingModal] = useState(false);
  const [subscription, setSubscription] = useState(null)
  const [price, setPrice] = useState(0)
  const [planPrice,setPlanPrice] = useState(0)
  const [selectedPlan,setSelectedPlan] = useState('')
  const [payButtonLoader,setPayButtonLoader] = useState(false)
  useEffect(() => {
    let price = 0;
    if (subscription === '1') {
        price = cartItems?.length * 40;
        setPlanMsg('Annual Plan per Subject')
        setPlanPrice(40);
    } else if (subscription === '2') {
        price = cartItems?.length * 60;
        setPlanPrice(60)
        setPlanMsg('Monthly Plan per Subject')
    } else {
        price = cartItems?.length * 120;
        setPlanPrice(120)
        setPlanMsg('Annual Plan with Unlimited Access')
        
    }
    setPrice(price);
}, [subscription,cartItems]);

  // coursesId.forEach(courseId => {
  //   console.log(courseId)
  //   useEffect(() => {
  //     getCourseById(courseId)
  //       .then(data => {
  //         console.log(data)
  //       })
  //   }, [coursesId])
  // })
  let courseCart = []
  useEffect(() => {

    if(cartItems?.length)
    {
      setLoading(true);
      cartItems?.forEach((courseId,index) => { 
        console.log(index," index")
        getCourseById(courseId)
          .then(data => {
            courseCart = [...courseCart, data.course]
            setCourses(courseCart)
          
            if(index == cartItems?.length - 1)
            {
              setLoading(false)
            }
            // console.log(data.course)
            // setCourses(data?.course)
            // courseArr.push(data.course)
            // setCourses(courseArr)
            // const courseArr = [...courses, data?.course]
  
          })
      })
    }else
    {
      setLoading(false)
      setCourses([])

    }
   
  }, [cartItems])

 



  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart, total, discount, subtotal } = checkout;

  const isEmptyCart = courses.length === 0;

  const handleDeleteCart = (productId) => {
    // dispatch(deleteCart(productId));
    console.log(userId, productId)
    removeCartItem(userId, productId)
      .then(data => {
        console.log(data)
        if(data.status)
        {
          dispatch(setCartItems(data.cart.courses))
         
        }
         if (update === false) {
            setUpdate(true)
          }
          else {
            setUpdate(false)
          }

      })

  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    },
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));

     // // function to handle checkOut
  const paymentGetwayHandler = (e) => {
      e.preventDefault();
      setPayButtonLoader(true);
      let selectedPlan = '';
      if (subscription === '1') {
          selectedPlan = AnnualPlanperSubject;
      } else if (subscription === '2') {
          selectedPlan = MonthlyPlanperSubject;
      } else {
          selectedPlan = AnnualPlanwithUnlimitedAccess;
      }
      setSelectedPlan(selectedPlan);
      paymentGetway(selectedPlan, cartItems?.length, cartItems, userDetails._id,planPrice)
          .then((res) => { 
              if (res.status) {
                  window.location.assign(res.url); 
              }
              setPayButtonLoader(false);
          })
          .catch((err) => {
              // console.error(err);
          });
  };



  return (
    <>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={paymentGetwayHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <div className="row">
                    <div className="col-8">
                      <Typography variant="h6">
                        Card
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                          &nbsp;({courses.length} item)
                        </Typography>
                        
                      </Typography> 
                    </div>
                    {courses.length?(
                        <>
                          <div className="col-3"> 
                            <Button sx={{ ml: '2px' }} variant='contained' type="button" onClick={() => setPricingModal(true)}>
                                {/* {' Choose Plan '} */}
                                {planMsg ? 'Change Plan' : 'Choose Plan'}
                            </Button>
                          </div>
                          <Typography component="span" sx={{ color: 'text.secondary' }}>
                            {planMsg}
                          </Typography>
                      </>
                    ):(null)}
                    
                 
                  </div>
                }
                sx={{ mb: 3 }}
              />
              {loading?(

                <Box sx={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                </Box>


              ):(
 
                    !isEmptyCart ? (
                      <Scrollbar>
                        <CheckoutProductList
                          products={courses}
                          onDelete={handleDeleteCart}
                          onIncreaseQuantity={handleIncreaseQuantity}
                          onDecreaseQuantity={handleDecreaseQuantity}
                        />
                      </Scrollbar>
                    ) : (
                      <EmptyContent
                        title="Cart is empty"
                        description="Look like you have no items in your shopping cart."
                        img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_cart.svg"
                      />
                    )
              )}
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to={'/dashboard/courses/allcourses'}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
            >
              Explore Courses
            </Button>
          </Grid>
            {courses?.length?(
              <Grid item xs={12} md={4}>
                          <CheckoutSummary
                            total={price} 
                            discount={discount}
                            subtotal={planPrice}
                            onApplyDiscount={handleApplyDiscount}
                            totalcourses={cartItems?.length}
                          />
                  {payButtonLoader ? (
                                    
                      <Button fullWidth size="large" variant="outlined" >
                          <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                      </Button>
                        
                    ) : (
                      <Button fullWidth size="large" type="submit" variant="contained" disabled={cartItems?.length === 0}>
                        Check Out
                      </Button>
                  )}
              </Grid>
            ):(null)}
          

           
           
        </Grid>
      </Form>
    </FormikProvider>
      <Modal
                  open={pricingModal}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  onClose={() => setPricingModal(false)}
              >
                  <Box sx={modalStyle}>
                      <BootstrapModal.Header className="clr-primary-400 py-2" >
                          {/* <Modal.Title id="contained-modal-title-vcenter" className="text-center"> */}
                          <Grid container>
                              <Grid item xs={11} lg={11} md={11} sm={11}>
                                  <Typography variant="h6">
                                      Pricing
                                  </Typography>
                              </Grid>
                              <Grid item xs={1} lg={1} md={1}>
                                  <Button  onClick={() => setPricingModal(false)}  >
                                      <CloseIcon />
                                  </Button>
                              </Grid>
                          </Grid>
                          {/* </Modal.Title> */}
                      </BootstrapModal.Header>
                      <BootstrapModal.Body>


                          <Grid container spacing={1}>
                              <Grid item xs={12} lg={4} md={4}>
                                  {/* <div className="col-12 col-lg-4 col-md-4 mb-4 "> */}
                                  <Box sx={{ borderColor: "#b29603;", borderWidth: 1, borderStyle: 'solid' }}>
                                      <Card  >
                                          <CardContent>
                                              <div className=' text-center mb-4'>
                                                  <h5 className=''>Annual Plan per Subject</h5>
                                              </div>
                                              <div className='text-center mb-2'>
                                                  <h5 className=''>$40 <small>/year</small></h5>
                                              </div>
                                              <div className='text-center mb-4'>
                                                  <h5 className=''>$3 <small>/month</small></h5>
                                              </div>
                                              <div className='text-center '>
                                                  <Button variant="outlined" className='  px-5' onClick={() => { setSubscription('1'); setPricingModal(false); setPlanMsg('Annual Plan per Subject') }}>Select Plan</Button>
                                              </div>
                                          </CardContent>
                                      </Card>
                                  </Box>
                              </Grid>
                              {/* </div> */}
                              {/* <div className="col-12 col-lg-4 col-md-4 mb-4 "> */}
                              <Grid item xs={12} lg={4} md={4}>
                                  <Box sx={{ borderColor: "#b29603;", borderWidth: 1, borderStyle: 'solid' }}>
                                      <Card  >
                                          <CardContent>
                                              <div className=' text-center mb-4'>
                                                  <h5 className=''>Monthly Plan per Subject</h5>
                                              </div>
                                              <div className='text-center mb-2'>
                                                  <h5 className=''>$60 <small>/year</small></h5>
                                              </div>
                                              <div className='text-center mb-4'>
                                                  <h5 className=''>$5 <small>/month</small></h5>
                                              </div>
                                              <div className='text-center '>
                                                  <Button variant="outlined" className='  px-5' onClick={() => { setSubscription('2'); setPricingModal(false); setPlanMsg('Monthly Plan per Subject') }}>Select Plan</Button>
                                              </div>
                                          </CardContent>
                                      </Card>
                                  </Box>
                              </Grid>
                              {/* </div> */}
                              {/* <div className="col-12 col-lg-4 col-md-4 mb-4 "> */}
                              <Grid item xs={12} lg={4} md={4}>
                                  <Box sx={{ borderColor: "#b29603;", borderWidth: 1, borderStyle: 'solid' }}>
                                      <Card >
                                          <CardContent>
                                              <div className=' text-center mb-3'>
                                                  <h6 className=''>Annual Plan with Unlimited Access</h6>
                                              </div>
                                              <div className='text-center mb-2'>
                                                  <h5 className=''>$120 <small>/year</small></h5>
                                              </div>
                                              <div className='text-center mb-4'>
                                                  <h5 className=''>$10 <small>/month</small></h5>
                                              </div>
                                              <div className='text-center '>
                                                  <Button variant="outlined" className='  px-5' onClick={() => { setSubscription('3'); setPricingModal(false); setPlanMsg('Annual Plan with Unlimited Access') }}>Select Plan</Button>
                                              </div>
                                          </CardContent>
                                      </Card>
                                  </Box>
                                  {/* </div> */}
                              </Grid>
                          </Grid>

                      </BootstrapModal.Body>
                  </Box>
      </Modal>
    </>
  );
}
