# Demonstrate the sample contract in this directory by building, deploying and calling the contract
from algokit_utils import LogicError
from algosdk import encoding, abi 
from beaker import client, sandbox, consts
import crowdsourcing
from build import build


def demo() -> None:
    accounts = sandbox.get_accounts()
    account = accounts.pop()

    # build the app and get back the Path to app spec file
    app_spec_path = build()

    # Get LocalNet algod client
    algod_client = sandbox.get_algod_client()
    # Get default account from LocalNet, this will be used as the signer
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


    min_balance = crowdsourcing.compute_min_balance(1000) * 2
    app_client.fund(min_balance)
    
    is_open = app_client.call(crowdsourcing.is_open, )
    print(f'Is open: {is_open.return_value}')

    # print('we are star')
    call_response = app_client.call(crowdsourcing.start_collection, )
    print(call_response.return_value)

    is_open = app_client.call(crowdsourcing.is_open, )
    print(f'Is open: {is_open.return_value}')

    app_client.call(
        crowdsourcing.submit_data,
        new_data = 'Some data in string form!',
        boxes = [(app_client.app_id, 0)]
    )

    num_collected = app_client.call(crowdsourcing.get_num_data, )
    print(f'we have {num_collected.return_value} data points stored')


    got_data = app_client.call(
        crowdsourcing.get_data,
        index=0,
        boxes = [(app_client.app_id, 0)]
    )

    print(f'we got {got_data.return_value} back!')

    # box_contents = app_client.get_box_contents(0)
    # decoded_box_contents = abi.ABIType.from_string("uint64").decode(box_contents)
    # print(f'box has {decoded_box_contents}')


if __name__ == "__main__":
    demo()
