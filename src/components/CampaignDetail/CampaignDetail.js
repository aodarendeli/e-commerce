import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { fecthCampaignSelectedList, selectCampaignSelectedList, selectCampaignErrorState, selectCampignLoadingState } from '../../store/campaign';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Moment from 'react-moment';
import Loader from '../Loader/Loader';

function CampaignDetail() {
    let params = useParams();
    // console.log(params.id)
    const dispatch = useDispatch()
    const campaignSelectedList = useSelector(selectCampaignSelectedList)
    const campaignLoading = useSelector(selectCampignLoadingState)
    console.log("list : => ", campaignSelectedList)
    const { t } = useTranslation();


    useEffect(() => {
        dispatch(fecthCampaignSelectedList(params.id))
    }, [dispatch])

    return (
        <Container>
            <Row>
                <Col>
                    <h2>{t('Campaign')}</h2>
                    {campaignLoading && <Loader />}
                    <div className='d-flex justify-content-between flex-wrap'>
                        {
                            campaignSelectedList &&
                            <Card style={{ width: '18rem' }}>
                                <Card.Img width={200} height={200} variant="top" src={campaignSelectedList.photoUrl} />
                                <Card.Body>
                                    <Card.Title>{campaignSelectedList.title}</Card.Title>
                                    <Card.Text>
                                        {campaignSelectedList.text}
                                    </Card.Text>
                                    <Card.Text>
                                        <Moment format="YYYY/MM/DD">{campaignSelectedList.createdDate}</Moment>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CampaignDetail