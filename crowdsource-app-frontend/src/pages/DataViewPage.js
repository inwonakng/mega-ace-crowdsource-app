import algosdk from "algosdk";
import Button from 'react-bootstrap/Button'
import { algodClient } from "../AlgoProvider";
import { useWallet } from "@txnlab/use-wallet";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from "react";
import { parseResultLog, stringToUint8 } from "../helper";
import { applicationId } from "..";

const DataViewPage = () => {
  const [state, setState] = useState({ isOpen: null, numCollected: null, dataIndex: 0, dataResult: null })
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

    setState({
      ...state,
      numCollected: Number(parseResultLog(result))
    })
  }

  const onIndexChange = (event) => {
    setState({ ...state, dataIndex: event.target.value })
  }

  const getData = async () => {
    
  }

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }} >
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
            <Button onClick={getNumCollected} variant='light'>
              Check how many data points are collected so far
            </Button>
          </Row>
          {state.numCollected !== null
            ? <Row>
              Collected so far: {state.numCollected}
            </Row>
            : <></>}
          <Row style={{ marginBottom: '15px' }}>
            <Col span={2}>
              Data Index:
              <input placeholder="0" onChange={onIndexChange} />
            </Col>
            <Col span={10}>
              <Row>
                <Button onClick={getData}>
                  Get Data
                </Button>
              </Row>
            </Col>
          </Row>
          {
            state.dataResult !== null && (
              <Row style= {{
                backgroundColor: '#d9dadb',
                borderRadius: 5,
                minHeight: 100,
                padding: '5px 10px'
              }}>
                {state.dataResult}
              </Row>
            )
          }
          <Row>

          </Row>
        </Col>
      </Row>
    </>
  )
}

export default DataViewPage