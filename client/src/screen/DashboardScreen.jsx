import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  FETCH_FAIL,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '../features/Fetch_product/Fetch_Product';
import { CircularProgress } from '@mui/material';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet-async';

export default function DashboardScreen() {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.Product.value
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch(FETCH_REQUEST());
      try {
        const { data } = await axios.get('/api/orders/summary');
        dispatch(FETCH_SUCCESS(data));
        // console.log(data);
      } catch (err) {
        dispatch(FETCH_FAIL());
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        { error }
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{product.allUser.length}</Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{product.allOrder.length}</Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {/* $
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0} */}
                    &#8377;
                    {product.allOrder
                      .reduce((a, c) => a + c.totalPrice, 0)
                      .toFixed(2)}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            {product.allOrder.length === 0 ? (
              <Alert variant="danger">No Sale</Alert>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...product.allOrder.map((x) => [
                    x.createdAt.slice(0, 10),
                    x.totalPrice,
                  ]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {product.allProduct.length === 0 ? (
              <Alert variant="danger">No Category</Alert>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...product.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
