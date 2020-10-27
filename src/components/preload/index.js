import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";


function Preload(props){
  const style = { 
    textAlign: 'center'
  }

    return(

      <React.Fragment>
      <div className="sweet-loading" style = {{style}}>
          <BeatLoader
            css = {style}
            size={20}
            loading={props.loading}
            color = {'#243f60 !important'}
          />
      </div>
</React.Fragment>
    )
    
}
export default Preload;
    