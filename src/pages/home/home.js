import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useLocation } from 'react-router-dom'
import "./home.css";
import { getRandomPhoto, searchImage, getImageList } from "../../redux/actions";
import { get } from "lodash";
import {Button, Card} from '../../component'

const Home = () => {
  const location = useLocation()
  console.log(location.pathname)
  const isModal = location.pathname.includes('modal')
  console.log(isModal)
  const dispatch = useDispatch();
  const {
    reducer: { randomPhoto, photos },
  } = useSelector((state) => state, shallowEqual);

  const [search, setSearch] = useState("");
  const [initial, setInitial] = useState(1);

  useEffect(() => {
    dispatch(getRandomPhoto());
    dispatch(getImageList());
  }, [dispatch]);

  const onChange = (e) => {
    setSearch(e.target.value);
    e.preventDefault();
    e.stopPropagation();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setInitial(1);
      dispatch(searchImage(search));
    }
  };
  const onPaginationClick = (value) => {
    setInitial(value);
    if (search && value < totalPages) dispatch(searchImage(search, value, true));
    else  {
      dispatch(getImageList(value, true));
    }
  };
  console.log(photos)
  const photoResult = get(photos, "results", []);
  const totalPages = get(photos, "total_pages", null);
  console.log(photoResult);
  return (
    <div className={`container ${isModal && 'block'}`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${randomPhoto})`,
        }}
      >
        <div>
          <h1>Searchit</h1>
        </div>
        <div className="search-block">
          <p>Free stock photos for everything</p>
          <p className="sub-text">
            We offer best free stock photo's all in one place
          </p>
          <p>
            <span className="search-tag">Search by Tags</span>
            <span className="tag-values">
              Dog Cat Space Nature office Coffee World
            </span>
          </p>
          <input
            type="search"
            className='input-text'
            onChange={onChange}
            value={search}
            onKeyDown={onKeyDown}
            placeholder="Search for images here"
          />
        </div>
      </div>
      <div className="image-container">
        {photoResult.map((photo, index) => (
          <Card key={photo.id+index} url={photo.urls} id={photo.id} />
        ))}
      </div>
      <Button initial={initial} onClick={onPaginationClick} text="Load More" />
    </div>
  );
};

export default Home;
