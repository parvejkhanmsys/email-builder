// pages/email-editor.js
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CustomEmailEditor from "../components/emailEditor";

const EmailEditorPage = () => {
  const router = useRouter();
  console.log(router,'p')
  const { template, edit, clone, editTemplate, cloneTemplate } = router.query;

//   useEffect(() => {
//     // Check if the page has already been reloaded during this session
//     const hasReloaded = sessionStorage.getItem('hasReloaded');
//     setTimeout(()=>{
        
//         if (!hasReloaded) {
//             console.log("loaded")
//             // Set the flag in session storage
//             sessionStorage.setItem('hasReloaded', 'true');
      
//             window.location.reload();
//           }
//     },1000)
    
//   }, []);


  return (
    <div>
      <CustomEmailEditor
        template={JSON.parse(template || "{}")}
        edit={edit === "true"}
        clone={clone === "true"}
        editTemplate={JSON.parse(editTemplate || "[]")}
        cloneTemplate={JSON.parse(cloneTemplate || "[]")}
      />
    </div>
  );
};

export default EmailEditorPage;
