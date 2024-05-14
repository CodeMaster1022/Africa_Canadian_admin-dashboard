import React from 'react';

import Canada from '@svg-maps/canada';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

const CanadaState = () => {
  return (
    <>
      <SVGMap map={Canada} />
    </>
  );
};
export default CanadaState;
