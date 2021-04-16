import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { onClickState } from '../../redux/subMenuSlice.js';
import { useDispatch } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
  image: {
    position: "relative",
    height: 80,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.13,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTittle": {
        border: "3px solid currentColor",
        borderRadius: "2vh",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
    transition: theme.transitions.create("opacity"),
  },
  imageTittle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -3,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

// ----------------------------------------------
const SubMenu = (props) => {
  const [img, setImg] = useState([]);
  const [errorBoolean, setErrorBoolean] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  

  useEffect(() => {
    const url =
      `https://raw.githubusercontent.com/braucalderon/jsonFiles/main/ohioTranspImg/img.json`;
    async function fetchData() {
      try {
        const request = await axios.get(url);
        setImg(request.data);
        // console.log(request);
        setErrorBoolean(true);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // console.log(img);
 
  return (
    <div className={classes.root}>
      {img.map((image) => (
        <ButtonBase
          focusRipple
          key={image.tittle}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => dispatch(onClickState(image.tittle))}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.img})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTittle}
            >
              {image.tittle}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
};
export default SubMenu;
