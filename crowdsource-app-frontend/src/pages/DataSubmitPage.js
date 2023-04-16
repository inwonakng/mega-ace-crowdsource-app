import algosdk from "algosdk";
// import {getApplicationBoxes} from 'algosdk'
import Button from 'react-bootstrap/Button'
import { algodClient } from "../AlgoProvider";
import { useWallet } from "@txnlab/use-wallet";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useState } from "react";
import { numToUint8, parseResultLog, stringToUint8 } from "../helper";
import { applicationId } from "..";

const DataSubmitPage = () => {
  const [state, setState] = useState({inputData: '', isOpen:null})
  const { activeAddress, signTransactions, sendTransactions } = useWallet()


  const isOpen = async () => {
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

    setState({
      ...state,
      isOpen: Number(parseResultLog(result)) !== 0
    })
  }

  const onInputChange = (val) => {
    // console.log(val)
    setState({...state, inputData: val.target.value})
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
    DataSubmitPage
      <Row>
        <Col md={{span: 6, offset: 3}}>
        <Row style={{ marginBottom: '15px' }}>
            <Button onClick={isOpen} variant='light'>
              Check if collection is open
            </Button>
          </Row>
          {
            state.isOpen !== null
              ? <Row>
                {
                  state.isOpen
                    ? `Collection is open :)`
                    : `Collection is stopped :(`
                }
              </Row>
              : <></>
          }
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
    </>
  )
}

export default DataSubmitPage