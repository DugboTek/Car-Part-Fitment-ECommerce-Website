//Allie Moulton
import React, { useState } from "react";
import "../../Styles/GarageStyles/GarageExpandedStyles.css";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import Model from "./ModToggle.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import ThreedTest from "../ThreedTest";

function GarageExpanded() {
  const [partOn, setPartToggle] = useState(false);
  const [partLabel, setPartLabel] = useState("Show on Car");

  const partChangeHandler = () => {
    if (!partOn) {
      setPartToggle(true);
      setWithMirrors(true);
      setPartLabel("Remove from Car");
    } else {
      setPartToggle(false);
      setWithMirrors(false);
      setPartLabel("Show on Car");
    }
  };
  const [withMirrors, setWithMirrors] = useState(false);

  return (
    <div className="expanded-garage-container">
      <div className="garage-title">
        <h1>ON YOUR VEHICLE</h1>
        <p>Add a vehicle to your garage to view parts on it.</p>
      </div>

      <div className="garage-expanded-contents">
        <div className="garage-expanded-left">
          <div className="current-vehicle-container">
            <div className="current-vehicle-header">
              <h2> Your 2014 Jeep Wrangler 4xe</h2>
              <div className="3d-view-toggle">
                {/* <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='email-alerts' mb='0'>
                                        See on 3D model
                                    </FormLabel>
                                    <Switch id='email-alerts' />
                                </FormControl> */}
              </div>
            </div>
            <div className="current-vehicle-row">
              <Model switchLabel="See on 2D Model" partOn={partOn} />
            </div>
          </div>
        </div>

        <div className="garage-add-parts-container">
          <h1> See Parts on Your Vehicle</h1>
          <h2>Featured Parts:</h2>
          <div className="garage-parts-boxes">
            <div className="garage-single-part">
              <div className="garage-single-part-image">
                <img
                  id="part-img"
                  src="https://th.bing.com/th/id/R.f5a4b8c3437b4fc53f484f90598f0e40?rik=WsdsFUAYdKFdfw&riu=http%3a%2f%2fwww.hollandersolutions.com%2fdocuments%2foriginal%2fSideMirror.png&ehk=wz3BBpBVb%2bnY6fVlSW9NCclArwJIhQnKvZ3JXzunCKI%3d&risl=&pid=ImgRaw&r=0"
                  alt="side mirror icon"
                ></img>
              </div>
              <div className="single-part-words">
                <h4>Side Mirror</h4>
                <div className="show-car-btn">
                  <Button onClick={partChangeHandler} colorScheme="facebook">
                    {partLabel}
                  </Button>
                  {/* <h5>Show on Car</h5> */}
                </div>
                <p>Quick View </p>
              </div>
            </div>
            <div className="garage-single-part">
              <div className="garage-single-part-image">
                <img
                  id="part-img"
                  src="https://th.bing.com/th/id/OIP.FssJwA4TZoIZjtyFT0hZiQHaHa?pid=ImgDet&rs=1"
                  alt="front bumper"
                ></img>
              </div>
              <div className="single-part-words">
                <h4>Front Bumper</h4>
                <div className="show-car-btn">
                  <Button colorScheme="facebook">Show on Car</Button>
                  {/* <h5>Show on Car</h5> */}
                </div>
                <p>Quick View </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GarageExpanded;
