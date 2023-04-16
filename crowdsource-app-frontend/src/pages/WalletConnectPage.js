import React, { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const WalletConnectPage = () => {
  const { providers, activeAccount } = useWallet()
  // const { state, setState } = useState()

  // Map through the providers.
  // Render account information and "connect", "set active", and "disconnect" Buttons.
  // Finally, map through the `accounts` property to render a dropdown for each connected account.
  return (
    <Row >
      <Col md={{ span: 6, offset: 3 }}>
        <Row className='justify-content-md-center'>
          <h2 style={{marginBottom:'40px'}}>Connect your wallet!</h2>
          {providers?.map((provider) => (
            <Row
              style={{
                // border: "1px grey solid",
                borderRadius: "5px",
                marginBottom: '10px',
                paddingTop: '10px',
                border: (
                  provider.isActive
                    ? '2px grey solid'
                    : ''
                ),
                backgroundColor: (
                  provider.isActive
                    ? '#72add4'
                    : '#d9dadb'
                )
              }}
            >
              <Row style={{ marginBottom: '10px' }}>
                <h4>
                  <img
                    width={30}
                    height={30}
                    alt=""
                    src={provider.metadata.icon}
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  {provider.metadata.name}
                </h4>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Col span={4}>
                  <Button
                    onClick={provider.connect}
                    disabled={provider.isConnected}
                    style={{ marginRight: '10px', width: '100%' }}
                  >
                    Connect
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    onClick={provider.disconnect}
                    disabled={!provider.isConnected}
                    style={{ marginRight: '10px', width: '100%' }}
                    variant='danger'
                  >
                    Disconnect
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    onClick={provider.setActiveProvider}
                    disabled={!provider.isConnected || provider.isActive}
                    style={{ width: '100%' }}
                    variant='light'
                  >
                    Set Active
                  </Button>
                </Col>
              </Row>
              <Row>
                {provider.isActive && provider.accounts.length && (
                  <Form.Select
                    value={activeAccount?.address}
                    onChange={(e) => provider.setActiveAccount(e.target.value)}
                  // style={{width: '100%'}}
                  >
                    {provider.accounts.map((account) => (
                      <option key={account.address} value={account.address}>
                        {account.address}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Row>
            </Row>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default WalletConnectPage