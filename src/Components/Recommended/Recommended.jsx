import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY, value_converter } from "../../Data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [recommendedData, setRecommendedData] = useState([]);

  const fetchRecommendedData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url)
      .then((res) => res.json())
      .then((data) => setRecommendedData(data.items));
  };
  useEffect(() => {
    fetchRecommendedData();
  }, []);
  return (
    <div className="recommended">
      {recommendedData.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item ? item.snippet.channelTitle : "Vishal_Tech_World"}</p>
              <p>
                {item ? value_converter(item.statistics.viewCount) : "19K"}{" "}
                Views
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
