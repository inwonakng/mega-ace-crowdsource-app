import { useState } from "react";
import algosdk from "algosdk";
import Button from 'react-bootstrap/Button'
import { algodClient } from "../AlgoProvider";
import { useWallet } from "@txnlab/use-wallet";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { creatorAddress, applicationId } from "..";
import { stringToUint8 } from "../helper";

const CreatorPage = () => { 
  const { state, setState } = useState();

  const { activeAddress, signTransactions, sendTransactions } = useWallet();

  const startCollection = async () => {
    // console.log(stringToUint8('4Wu55g=='))

    if (activeAddress !== creatorAddress){
      alert('only the creator of the contract can do this operation!')
      return 
    }
    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makeApplicationNoOpTxnFromObject({
      appArgs: [stringToUint8('4Wu55g==')],
      appIndex: applicationId,
      from: activeAddress,
      suggestedParams: suggestedParams
    })
    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 5
    const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    console.log('Transaction sent successfully', id)
    const result = await algosdk.waitForConfirmation(algodClient, id, waitRoundsToConfirm)
    console.log(result)
  }

  const stopCollection = async () => {
    if (activeAddress !== creatorAddress){
      alert('only the creator of the contract can do this operation!')
      return 
    }
    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makeApplicationNoOpTxnFromObject({
      appArgs: [stringToUint8('FUZ9Fw==')],
      appIndex: applicationId,
      from: activeAddress,
      suggestedParams: suggestedParams
    })
    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 5
    const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    console.log('Transaction sent successfully', id)
    const result = await algosdk.waitForConfirmation(algodClient, id, waitRoundsToConfirm)
    console.log(result)
    console.log(algosdk.decodeObj(result))
  }

  return (
    <>
      <Row>
        <h2>CreatorPage</h2>
      </Row>
      <Row style={{ marginBottom: '15px' }}> 
        <Col md={{span: 6, offset: 3}}>
          <Row>
        <Button onClick={startCollection}>
          Start Collection
        </Button>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginBottom: '15px' }}>
        <Col md={{span: 6, offset: 3}}>
          <Row>
          <Button onClick={stopCollection} variant="danger">
            Stop Collection
          </Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default CreatorPage