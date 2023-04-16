const HomePage = () => {
  return (
    <>
      <h2>Decentralizd Crowdsourcing on Algorand</h2>

      <p>
        Crowdsourcing data plays an important role in advanceing machine learning technologies. Without the power of large datasets, many popular machine learning models would not have been feasible. 

      </p>
      <p>
        This project aims to integrate the idea of crowdsourced data collection with the Algorand blockchain.
        Unlike Ethereum, Algorand's low transaction fees and high processing speed can be leveraged to make a large-scale data collection possible.
      </p>
      <p>
        Crowdsourcing on the blockchain can offer several advantages over traditional crowdsourcing platforms such as Amazon's Mechanical Turk or SurveyMonkey.
      </p>
      <ol>
        <li>
          The source of funding is not limited to a single entity. The dataset can be downloaded by anyone, and if someone else than the creator finds the dataset helpful, they can donate to the contract's account to continue the collection process
        </li>
        <li>
          The users need to pay a small amount of fee to access the data. This amount is kept by the application to pay for the memory cost as the dataset grows.
        </li>
      </ol>

      <p>
       

      </p>

      <p>
        Note: This app is a prototype buit in 2 days. The data accessing funcitonality is not quite flushed out yet, but it can certainly be made more fluid using existing Algorand APIs.
      </p>
    </>
  )
}

export default HomePage