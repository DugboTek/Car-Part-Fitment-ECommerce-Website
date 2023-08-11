import React from "react";
import "../../Styles/ProductPage/ProductImage.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import resetIcon from "../../Images/reset.png";

function ProductImage({ imgSrc }) {
  // return (
  //     <div className='img-container'>
  //       <div style={{ width: "100%", height: "500px" }}>
  //         <PinchZoomPan
  //           maxScale='5'
  //           position='center'
  //           zoomButtons='true'
  //           doubleTapBehavior='zoom'
  //           >
  //           <img alt="Part" src={imgSrc} />
  //         </PinchZoomPan>
  //       </div>
  //     </div>
  //   );
  //   }
  //       const imageLoc  = {imgSrc};
  //       const zoomConfig = {
  //         width: 400,
  //         height: 400,
  //         zoomWidth: 800,
  //         img: imgSrc,
  //         offset: { vertical: 0, horizontal: 10 },
  //         zoomStyle: 'z-index: 9999;',
  //       };
  //       return (
  //         <div>
  //           <ImageZoom {...zoomConfig} />
  //         </div>

  // );

  return (
    <div className="product-img-container">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => zoomIn()}>+</button>
              <button id="reset-imgbtn" onClick={() => resetTransform()}>
                <img src={resetIcon}></img>
              </button>
              {/* change this last button to a refresh icon */}
            </div>
            <TransformComponent>
              <img src={imgSrc} alt="test" />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
}

export default ProductImage;
