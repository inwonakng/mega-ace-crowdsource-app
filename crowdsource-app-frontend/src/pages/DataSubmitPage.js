import algosdk from "algosdk";
// import {getApplicationBoxes} from 'algosdk'
import Button from 'react-bootstrap/Button'
import { algodClient } from "../AlgoProvider";
import { useWallet } from "@txnlab/use-wallet";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { numToUint8, parseResultLog, stringToUint8 } from "../helper";
import { applicationId } from "..";
import { setIsCollectionOpen } from "../redux/stateSlice";


const DataSubmitPage = () => {
  const [state, setState] = useState({ inputData: '', showIsOpenModal: false })

  const [
    isCollectionOpen
  ] = useSelector((store) => [
    store.state.isCollectionOpen
  ])

  const dispatch = useDispatch()

  const { activeAddress, signTransactions, sendTransactions } = useWallet()


  const checkCollectionIsOpen = async () => {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makeApplicationCallTxnFromObject({
      appArgs: [stringToUint8('uZmQHw==')],
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
    const isOpen = Number(parseResultLog(result)) !== 0
    dispatch(setIsCollectionOpen(isOpen))

    setState({ ...state, showIsOpenModal: true })
    setTimeout(() => setState({ ...state, showIsOpenModal: false }), 3000)
  }

  const onInputChange = (val) => {
    // console.log(val)
    setState({ ...state, inputData: val.target.value })
    // alert(val)
  }

  const onSubmitData = async () => {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makeApplicationCallTxnFromObject({
      appArgs: [stringToUint8('JautJA=='), stringToUint8(state.inputData)],
      appIndex: applicationId,
      from: activeAddress,
      suggestedParams: suggestedParams,
      onComplete: 0,
      boxes: [
        {
          appIndex: applicationId,
          name: algosdk.encodeUint64(2)
        }
      ]

    })
    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 5
    const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    console.log('Transaction sent successfully', id)
    const result = await algosdk.waitForConfirmation(algodClient, id, waitRoundsToConfirm)
    console.log(result)
  }




  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 style={{marginBottom:'40px'}}>
            Submit New Data
          </h2>
          <p>
            Copy and paste the raw JSON data you'd like to upload to the contract.
          </p>
          <p>
            Remember that anything you upload is visible to everyone, so be careful what you share!
          </p>
          <Row style={{ marginBottom: '15px' }}>
            <Button onClick={checkCollectionIsOpen} variant='light'>
              Check if collection is open
            </Button>
          </Row>
          <Row style={{ marginBottom: '15px' }}>
            <input placeholder="paste your raw JSON data here" onChange={onInputChange}>
            </input>

          </Row>
          <Row >
            <Button onClick={onSubmitData}>
              Submit Data
            </Button>

          </Row>
        </Col>
      </Row>
      <Modal 
        show={state.showIsOpenModal}
        onHide={()=>setState({...state, showIsOpenModal:false})}
      >
        <Modal.Body>
          {isCollectionOpen
            ? `Collection is open! 👐`
            : `Collection is closed 😥 Check again in the future!`}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DataSubmitPage