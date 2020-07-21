import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { get } from "lodash";
import "./modal.css";
import { downloadPhotoToDevice } from "../../redux/actions";
import Button from "../button";

const Modal = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    reducer: { downloadURL },
  } = useSelector((state) => state, shallowEqual);
  const { url, id } = get(location, "state", [{ url: null, id: null }])[0];
  console.log(downloadURL);
  useEffect(() => {
    if (!url) {
      history.push("/");
    }
  }, [history, url]);

  useEffect(() => {
    dispatch(downloadPhotoToDevice(id));
  }, [id, dispatch]);

  if (url)
    return (
      <div className="modal-wrapper">
        <span
          role="button"
          className="close-button"
          onClick={() => history.push("/")}
        >
          X
        </span>
        <div className="image" style={{ backgroundImage: `url(${url})` }} />
        <div className='footer-modal'>
          <a
            href={downloadURL}
            target="_blank"
            rel="nofollow"
            download
            style={{textDecoration:'none'}}
          >
            <Button text="Download" onClick={() => null} />
          </a>
        </div>
      </div>
    );
  return null;
};

export default Modal;
