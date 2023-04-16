import algosdk from "algosdk";
// import {getApplicationBoxes} from 'algosdk'
import Button from 'react-bootstrap/Button'
import { algodClient } from "../AlgoProvider";
import { useWallet } from "@txnlab/use-wallet";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useState } from "react";
import { parseResultLog, stringToUint8 } from "../helper";
import { applicationId } from "..";

const DataSubmitPage = () => {
  const [state, setState] = useState({inputData: ''})
  const { activeAddress, signTransactions, sendTransactions } = useWallet()

  const onInputChange = (val) => {
    // console.log(val)
    setState({...state, inputData: val.target.value})
    // alert(val)
  }

  const onSubmitData = async () => {
    // alert(state.inputData)

    // const boxnames = await algodClient.getApplicationBoxes(applicationId).do()
    // console.log(boxnames)
    // return 
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
          // name: new Uint8Array(0)
          name: new Uint8Array([])
          // stringToUint8('0')
        }
      ]

    })
    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 5
    const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    console.log('Transaction sent successfully', id) 

    const result = await algosdk.waitForConfirmation(algodClient, id, waitRoundsToConfirm)

    // console.log(result)

    // setState({
    //   ...state, 
    //   numCollected: Number(parseResultLog(result))
    // })
  }




  return (
    <>
    DataSubmitPage
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <Row style={{ marginBottom: '15px' }}>
            <input placeholder="paste your JSON data here" onChange={onInputChange}>
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