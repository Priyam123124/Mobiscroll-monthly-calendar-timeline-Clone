import { React, useContext } from 'react';
import WebContext from '../context/WebContext';

const Alert = () => {
  // Use the WebContext to access the showAlert state
  const context = useContext(WebContext);
  const { showAlert } = context;
  
  return (
    <>
      {/* Render the alert only if showAlert is true */}
      {showAlert && (
        <div style={{ display: "flex", alignItems: "center", position: "sticky", zIndex: "5", backgroundColor: "#D4EDDA", height: "34px", borderRadius: "11px" }}>
          <p style={{ marginLeft: "14px" }}>Delete: Event Deleted Successfully</p>
        </div>
      )}
    </>
  );
}

export default Alert;
