# Demonstrate the sample contract in this directory by building, deploying and calling the contract
from algokit_utils import LogicError
from algosdk import encoding, abi 
from beaker import client, sandbox, consts
import json
import crowdsourcing
from build import build

def demo() -> None:
    accounts = sandbox.get_accounts()
    account = accounts.pop()
    # build the app and get back the Path to app spec file
    app_spec_path = build()
    # Get LocalNet algod client
    algod_client = sandbox.get_algod_client()
    # Using the tesnet client
    
    # Create an Application client
    app_client = client.ApplicationClient(
        algod_client,
        app_spec_path,
        signer=account,
    )
    # Deploy the app on-chain
    app_id, app_address, tx_id = app_client.create()
    print(
        f"""Deployed app in txid {tx_id}
        App ID: {app_id} 
        Address: {app_address} 
    """
    )

    # at least 10 rows!
    min_balance = crowdsourcing.compute_min_balance(10) * 2
    app_client.fund(min_balance)
    
    is_open = app_client.call(crowdsourcing.is_open, )
    print(f'Is open: {is_open.return_value}')

    call_response = app_client.call(crowdsourcing.start_collection, )
    print(call_response.return_value)

    is_open = app_client.call(crowdsourcing.is_open, )
    print(f'Is open: {is_open.return_value}')

    app_client.call(
        crowdsourcing.submit_data,
        new_data = 'Some data in string form!',
        boxes = [(app_client.app_id, 0)]
    )

    print('we wrote to box!')

    num_collected = app_client.call(crowdsourcing.get_num_data, )
    print(f'we have {num_collected.return_value} data points stored')

    got_data = app_client.call(
        crowdsourcing.get_data,
        index=0,
        boxes = [(app_client.app_id, 0)]
    )
    print(f'we got {got_data.return_value} back!')


    app_client.call(
        crowdsourcing.submit_data,
        new_data = 'Another new data in string form',
        boxes = [(app_client.app_id, 1)]
    )
    print('we wrote to box!')

    got_data = app_client.call(
        crowdsourcing.get_data,
        index=1,
        boxes = [(app_client.app_id, 1)]
    )
    print(f'we got {got_data.return_value} back!')



    app_client.call(
        crowdsourcing.submit_data,
        new_data = 'Wow! yet another new data in string form',
        boxes = [(app_client.app_id, 2)]
    )


    print('we wrote to box!')

    got_data = app_client.call(
        crowdsourcing.get_data,
        index=2,
        boxes = [(app_client.app_id, 2)]
    )
    print(f'we got {got_data.return_value} back!')

if __name__ == "__main__":
    demo()
