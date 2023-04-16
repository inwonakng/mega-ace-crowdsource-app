import algosdk from "algosdk";
import Button from 'react-bootstrap/Button'
import { algodClient } from "../AlgoProvider";
import { useWallet } from "@txnlab/use-wallet";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'


import { parseResultLog, stringToUint8 } from "../helper";
import { applicationAddress, applicationId } from "..";
import { setNumDataCollected, setShowDonationThanksModal } from "../redux/stateSlice";


const DataViewPage = () => {
  const [state, setState] = useState({
    numCollected: null,
    dataIndex: 0,
    showDataViewModal: false,
    dataResult: null,
    donateAmount: 20000,
    showDonateModal: false,
    // showDonationThanksModal: false, 
  })


  const { activeAddress, signTransactions, sendTransactions } = useWallet()
  const [
    showDonationThanksModal,
    numDataCollected
  ] = useSelector((store) => [
    store.state.showDonationThanksModal,
    store.state.numDataCollected
  ])
  const dispatch = useDispatch()



  const getNumCollected = async () => {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makeApplicationCallTxnFromObject({
      appArgs: [stringToUint8('wweygA==')],
      appIndex: applicationId,
      from: activeAddress,
      suggestedParams: suggestedParams,
      onComplete: 0,

    })
    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 5
    const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    console.log('Transaction sent successfully', id)

    const result = await algosdk.waitForConfirmation(algodClient, id, waitRoundsToConfirm)

    console.log(result)

    dispatch(setNumDataCollected(Number(parseResultLog(result))))
  }

  const donateAlgo = async () => {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      amount: state.donateAmount,
      from: activeAddress,
      suggestedParams: suggestedParams,
      to: applicationAddress,
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 5
    const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    console.log('Transaction sent successfully', id)

    await algosdk.waitForConfirmation(algodClient, id, waitRoundsToConfirm).then(() => {
      dispatch(setShowDonationThanksModal(true))
      setTimeout(() => {
        dispatch(setShowDonationThanksModal(false))
      }, 3000)
    })
  }

  const getData = async () => {
    const res = await algodClient.getApplicationBoxByName(applicationId, algosdk.encodeUint64(Number(state.dataIndex))).do()
    let decoded = Buffer.from(res.value).toString('base64').slice(4)
    setState({ ...state, dataResult: decoded, showDataViewModal:false })
  }

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }} >
          <h2 style={{marginBottom:'40px'}}>
            View Collected Data
          </h2>
          <p><b>
            Number of data points collected so far:
          </b></p>
          <p>
            {numDataCollected === -1
              ? `We don't know yet! You should check.`
              : `${numDataCollected} data points.`
            }
          </p>

          <Row style={{ marginBottom: '15px' }}>
            <Button onClick={getNumCollected} variant='light'>
              Update data count
            </Button>
          </Row>

          <Row style={{ marginBottom: '15px' }}>
            <Button onClick={() => setState({ ...state, showDataViewModal: true })}>
              Get Data
            </Button>
          </Row>
          {
            state.dataResult !== null && (
              <Row style={{
                backgroundColor: '#d9dadb',
                borderRadius: 5,
                minHeight: 100,
                padding: '5px 10px'
              }}>
                {state.dataResult}
              </Row>
            )
          }
          <Row style={{ marginBottom: '15px' }}>
            If you are enjoying the project you should consider donating 😉

          </Row>
          <Row style={{ marginBottom: '15px' }}>
            <Button onClick={() => setState({ ...state, showDonateModal: true })} variant='light'>
              Donate Algo
            </Button>
          </Row>
        </Col>
      </Row>


      <Modal
        show={state.showDataViewModal}
        onHide={() => setState({ ...state, showDataViewModal: false })}
      >
        <Modal.Body>
          <Row style={{ marginBottom: '20px' }}>
            <Col md={{ span: 10, offset: 1 }}>
              Choose the index of the row you would like to view
            </Col>
          </Row>
          <Row >
            <Col md={{ span: 6, offset: 3 }}>
              <input
                placeholder={state.dataIndex}
                onChange={event => {
                  setState({ ...state, dataIndex: Number(event.target.value) })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Row>
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    getData()
                    // .then(
                    //   () =>
                    //   setState({ ...state, showDataViewModal: false })
                    // )
                  }}
                >
                  Make Request
                </Button>
              </Row>
            </Col>
          </Row>
        </Modal.Body>

      </Modal>

      <Modal
        show={state.showDonateModal}
        onHide={() => { setState({ ...state, showDonateModal: false }) }}
      >
        <Modal.Body>
          <Row style={{ marginBottom: '20px' }}>
            <Col md={{ span: 10, offset: 1 }}>
              Choose the amount you'd like to donate to the project! (in MicroAlgos)
            </Col>
          </Row>
          <Row >
            <Col md={{ span: 6, offset: 3 }}>
              <input
                placeholder={state.donateAmount}
                onChange={(event) => setState({ ...state, donateAmount: Number(event.target.value) })}
              />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Row>
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    setState({ ...state, showDonateModal: false })
                    donateAlgo()
                  }}
                >
                  Donate to project
                </Button>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDonationThanksModal}
        onHide= {() => dispatch(setShowDonationThanksModal(false))}
      // show= {true}
      >
        <Modal.Body>
          You Rock!
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DataViewPage