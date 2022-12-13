/** @format */

import React, { useState } from "react";
import NFTTile from "../../NFTTile";
import MarketplaceJSON from "../../Marketplace.json";
import Web3Modal from "web3modal";
import { providerOptions } from "../navbar/providerOptions";

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions, // required
});

const Home = () => {
  const sampleData = [
    {
      name: "Flower",
      description: "Rose flower",
      // website: "http://axieinfinity.io",
      image:
        "https://greenspoon.co.ke/wp-content/uploads/2022/04/Greenspoon-The-Flower-Factory-Hanging-Baskets-Petunia.jpg.webp",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "Lavender Flower",
      description: "Lavender flower",
      // website: "http://axieinfinity.io",
      image:
        "https://greenspoon.co.ke/wp-content/uploads/2022/04/Greenspoon-The-Flower-Factory-Hanging-Baskets-Petunia.jpg.webp",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "Flower 3",
      description: "Flower 3",
      // website: "http://axieinfinity.io",
      image:
        "https://greenspoon.co.ke/wp-content/uploads/2022/04/Greenspoon-The-Flower-Factory-Hanging-Baskets-Petunia.jpg.webp",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];

  const [data, updateData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const signer = library.getSigner();
    //Pull the deployed contract instance

    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        const imageUri = tokenURI.slice(7);
        const data = await fetch(`https://nftstorage.link/ipfs/${imageUri}`);
        const json = await data.json();
        const str = json.image;
        const mylink = str.slice(7);
        const imageX =
          "https://nftstorage.link/ipfs/" + mylink.replace("#", "%23");

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          cacheProvider: true,
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: imageX,
          name: json.name,
          description: json.description,
        };
        return item;
      })
    );
    updateFetched(true);
    updateData(items);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <section id="Home">
      <div className="homepage">
        <div className="content">
          {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
