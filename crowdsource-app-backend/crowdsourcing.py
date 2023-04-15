import beaker
import pyteal as pt
from beaker.lib import storage

class CrowdSourcedData(pt.abi.NamedTuple):
    # 0 means unapproved, 1 means approved. Can be udpated for more complicated functionality in future
    status: pt.abi.Field[pt.abi.Uint8]
    data: pt.abi.Field[pt.abi.String]

class CrowdSourcingAppState:
    # store the length of the collected data
    data_counter = beaker.GlobalStateValue(
        stack_type = pt.TealType.uint64,
        # default=pt.Int(1_000_000),
        default = pt.Int(0),
        descr = "The price of the event. Default price is 1 Algo",
    )

    # int to bytes (string) mapping to store the data
    collected_data = storage.BoxMapping(pt.abi.Uint64, CrowdSourcedData)

    # only the creator can change this value, whether to close or open the collection
    is_open = beaker.GlobalStateValue(
        stack_type = pt.TealType.uint64,
        default = pt.Int(0),
        descr = "0 means its closed, 1 means its open"
    )

app = beaker.Application("CrowdSourcingApp", state = CrowdSourcingAppState)

@app.create
def create():
    """Deployes the contract and starts the application"""
    # return pt.Seq(
    #     app.initialize_global_state(),
    # )
    return app.initialize_global_state()

# Owner methods
@app.external(authorize=beaker.Authorize.only_creator())
def start_colleciton(*, output: pt.abi.String) -> pt.Expr:
    """Turn on the collection"""
    return pt.Seq(
        app.state.is_open.set(pt.Int(1)),
        output.set("Successfully started collection")
    )

@app.external(authorize=beaker.Authorize.only_creator())
def stop_colleciton(*, output: pt.abi.String) -> pt.Expr:
    """Turn off the collection"""
    return pt.Seq(
        app.state.is_open.set(pt.Int(0)),
        output.set("Successfully stopped collection")
    )

# Write method
@app.external
def submit_data(data: pt.abi.String, *, output: pt.abi.string) -> pt.Expr:
    return pt.Seq(
        (status := pt.abi.Uint8()).set(pt.Int(0)),
        (submitted_data := CrowdSourcedData()).set(status, data),
        app.state.collected_data[app.state.data_counter].set(submitted_data),
        app.state.data_counter.set(app.state.data_counter + pt.Int(1)),
        output.set('Successfully submited data!')
    )

# Read methods
@app.external
def is_open(*, output: pt.abi.Uint64) -> pt.Expr:
    return output.set(app.state.is_open)

@app.external
def get_data(index: pt.abi.Uint64, *, output: CrowdSourcedData) -> pt.Expr:
    return pt.Seq(
        pt.Assert(app.state.data_counter > index.get()),
        app.state.collected_data[index].store_into(output)
    )

@app.external
def get_num_data(*, output: pt.abi.Uint64) -> pt.Expr:
    return output.set(app.state.data_counter)