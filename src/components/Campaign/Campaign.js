import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fecthCampaignList, selectCampaignErrorState, selectCampaignList, selectCampignLoadingState } from '../../store/campaign';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';
import 'moment-timezone';

function Campaign() {
  const dispatch = useDispatch()
  const campaignList = useSelector(selectCampaignList)
  const campaignLoading = useSelector(selectCampignLoadingState)
  // console.log("list : => ", campaignList)

  useEffect(() => {
    dispatch(fecthCampaignList())
  }, [dispatch])

  return (
    <>
      {campaignLoading && <Loader />}
      <div className='d-flex justify-content-between'>
        {
          campaignList && campaignList.map(item => (
            <div key={item.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img width={200} height={200} variant="top" src={`https://www.sahidenbin.com/${item.photoUrl}`} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.text}
                  </Card.Text>
                  <Card.Text>
                    <Moment format="YYYY/MM/DD">{item.createdDate}</Moment>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default Campaign