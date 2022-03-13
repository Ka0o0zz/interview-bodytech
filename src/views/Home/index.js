import { useState } from "react";
import { useRecoilState } from "recoil";
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
import { spotifyResult } from "../../recoil/songs/atoms";
import { spotifySearchCall } from "../../utils";
import { filterType as filterTypeSelector } from "../../recoil/songs/selectors";
import "./style.css";
import Track from "../../components/Track";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [searchResponse, setSearchResponse] = useRecoilState(spotifyResult);
  const [filterType] = useRecoilState(filterTypeSelector);

  const handleSubmit = async (event) => {
    event.preventDefault()
    let type = filterType ?? "track";
    const paramsArray = [{
      q: searchText
    }, {
      type,
    }, {
      offset: 50,
    }];

    const response = await spotifySearchCall(paramsArray, tokenResponse.access_token);
    setSearchResponse(response);
  };


  return (
    <div className="home">
      <h2 className="home-title">Search your favorite song</h2>
      <div className="home-searchbox">
        <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="home-searchbox-input" 
          value={searchText}
          placeholder='Search here' 
          onChange={({ target: { value }}) => setSearchText(value)} />
        <button className="home-searchbox-button">Search</button>
        </form>
      </div>

      

      {searchResponse?.tracks?.items && (
        <div className="home-tracks-container">
          <p className="home-tracks-title">{`Tracks of ${searchText}`}</p>
          <div className="home-tracks-container-items">
            {searchResponse?.tracks?.items?.map((item, index) => <Track key={index} {...item} />)}
          </div>
        </div>
      )}

    </div>
  );
}