import pyteal as pt
import beaker
from beaker import consts
from beaker.lib.storage import BoxMapping

class CrowdSourcedData(pt.abi.NamedTuple):
    # 0 means unapproved, 1 means approved. Can be udpated for more complicated functionality in future
    status: pt.abi.Field[pt.abi.Uint8]
    # data: pt.abi.Field[pt.abi.String]
    data: pt.abi.Field[pt.abi.String]

class CrowdSourcingAppState:
    # store the length of the collected data
    data_counter = beaker.GlobalStateValue(
        stack_type = pt.TealType.uint64,
        # default=pt.Int(1_000_000),
        default = pt.Int(0),
        descr = "The price of the event. Default price is 1 Algo",
    )

    # int to bytes (string) mapping to store the data really using it as an infinite array. 
    collected_data = BoxMapping(
        # pt.abi.String, 
        pt.abi.Uint64,
        CrowdSourcedData,
    )

    # only the creator can change this value, whether to close or open the collection
    is_open = beaker.GlobalStateValue(
        stack_type = pt.TealType.uint64,
        default = pt.Int(0),
        descr = "0 means its closed, 1 means its open"
    )

app = beaker.Application(
    "CrowdSourcingApp", 
    state = CrowdSourcingAppState, 
    descr = "App to crowdsource data collection using Algorand!"
)

@app.create
def create():
    """Deployes the contract and starts the application"""
    return pt.Seq(
        app.initialize_global_state(),
        # app.state.collected_data.create(),
    )

# Owner methods
@app.external(authorize=beaker.Authorize.only_creator())
def start_collection(*, output: pt.abi.String) -> pt.Expr:
    """Turn on the collection"""
    return pt.Seq(
        app.state.is_open.set(pt.Int(1)),
        output.set("Successfully started collection")
    )

@app.external(authorize=beaker.Authorize.only_creator())
def stop_collection(*, output: pt.abi.String) -> pt.Expr:
    """Turn off the collection"""
    return pt.Seq(
        app.state.is_open.set(pt.Int(0)),
        output.set("Successfully stopped collection")
    )

# Write method
@app.external
def submit_data(new_data: pt.abi.String, *, output: pt.abi.String) -> pt.Expr:
    return pt.Seq(
        # only accept if the flag is set to true
        pt.Assert(app.state.is_open == pt.Int(1)),
        (status := pt.abi.Uint8()).set(pt.Int(0)),
        (submitted_data := CrowdSourcedData()).set(status, new_data),
        # (new_data_idx := pt.abi.Uint64()).set(app.state.data_counter),
        app.state.collected_data[pt.Itob(app.state.data_counter)].set(submitted_data),
        app.state.data_counter.set(app.state.data_counter + pt.Int(1)),
        output.set('Successfully submited data!')
    )


# Read methods
@app.external(read_only = True)
def is_open(*, output: pt.abi.Uint64) -> pt.Expr:
    return output.set(app.state.is_open)

@app.external(read_only = True)
def get_data(index: pt.abi.Uint64, *, output: CrowdSourcedData) -> pt.Expr:
    return pt.Seq(
        pt.Assert(app.state.data_counter > index.get()),
        app.state.collected_data[index].store_into(output)
    )

@app.external(read_only = True)
def get_num_data(*, output: pt.abi.Uint64) -> pt.Expr:
    return output.set(app.state.data_counter)

def compute_min_balance(num_data:int): 
    """Compute the minimum balance required for the app to hold `num_data` rows.
    """
    return (
        consts.ASSET_MIN_BALANCE
        + (
            consts.BOX_FLAT_MIN_BALANCE
            + (
                # pt.abi.size_of(pt.abi.String) 
                # + 
                pt.abi.size_of(pt.abi.Uint64)
            ) * consts.BOX_BYTE_MIN_BALANCE
        ) 
        * num_data
    )