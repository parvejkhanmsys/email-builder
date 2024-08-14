import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import { useRouter } from "next/router";


const CustomEmail = ({ edit, editTemplate, clone, cloneTemplate }) => {
  const [exportedHtml, setExportedHtml] = useState("");
  const emailEditorRef = useRef(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  const [showEmailEditor, setShowEmailEditor] = useState(false);

  // const [templateName, setTemplateName] = useState(() => {
  //   const savedName = localStorage.getItem("templateName");
  //   if (savedName) return savedName;
  //   if (edit) {
  //     return editTemplate.attributes.name;
  //   } else if (clone) {
  //     return cloneTemplate.attributes.name;
  //   } else {
  //     return "";
  //   }
  // });
  // const [templateImage, setTemplateImage] = useState(() => {
  //   const savedImage = localStorage.getItem("templateImage");
  //   if (savedImage) return savedImage;
  //   if (edit) {
  //     return editTemplate.attributes.imageUrl;
  //   } else if (clone) {
  //     return cloneTemplate.attributes.imageUrl;
  //   } else {
  //     return "";
  //   }
  // });
  // const [templateCategoryOptions] = useState([
  //   "select template Category",
  //   "Abhyasi",
  //   "Heartfulness",
  // ]);
  // const [templateCategory, setTemplateCategory] = useState(() => {
  //   const savedCategory = localStorage.getItem("templateCategory");
  //   if (savedCategory) return savedCategory;
  //   if (edit) {
  //     return editTemplate.attributes.template_Name;
  //   } else if (clone) {
  //     return cloneTemplate.attributes.template_Name;
  //   } else {
  //     return "";
  //   }
  // });

  const [templateName, setTemplateName] = useState("");
  const [templateImage, setTemplateImage] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");

  const [templateCategoryOptions] = useState([
    "select template Category",
    "Abhyasi",
    "Heartfulness",
  ]);

  useEffect(() => {
    // Initialize state from localStorage if available
    const savedName = localStorage.getItem("templateName");
    const savedImage = localStorage.getItem("templateImage");
    const savedCategory = localStorage.getItem("templateCategory");

    setTemplateName(
      savedName ||
        (edit
          ? editTemplate.attributes.name
          : clone
          ? cloneTemplate?.attributes.name
          : "")
    );
    setTemplateImage(
      savedImage ||
        (edit
          ? editTemplate.attributes.imageUrl
          : clone
          ? cloneTemplate?.attributes.imageUrl
          : "")
    );
    setTemplateCategory(
      savedCategory ||
        (edit
          ? editTemplate.attributes.template_Name
          : clone
          ? cloneTemplate?.attributes.template_Name
          : "")
    );
  }, [edit, editTemplate, clone, cloneTemplate]);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem("templateName", templateName);
    localStorage.setItem("templateImage", templateImage);
    localStorage.setItem("templateCategory", templateCategory);
  }, [templateName, templateImage, templateCategory]);

  const downloadFormat = `${templateCategory}-${templateName}`;
  const kebabCase = downloadFormat
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // console.log("design", design);
      // console.log("exportHtml", html.split(`500px`)
      //     .join(`800px !important`).split(`480px`).join(`800px !important`));
      // console.log(data)
      setExportedHtml(
        html
          .split(`500px`)
          .join(`800px !important`)
          .split(`480px`)
          .join(`800px !important`)
          .split(`!important !important`)
          .join(`!important`).split(`.u-row {
    width: 800px !important;
  }`).join(`.u-row {
    width: 800px !important;
    border: rgb(221 221 221) solid 1px;
    margin: 0px auto;
    border-top: 0;
    border-bottom: 0;
  }`)
      );
      // for downloading the export as html file
      let htmlData = new Blob(
        [
          html
            .split(`500px`)
            .join(`800px !important`)
            .split(`480px`)
            .join(`800px !important`)
            .split(`!important !important`)
            .join(`!important`).split(`.u-row {
    width: 800px !important;
  }`).join(`.u-row {
                    width: 800px !important;
                    border: rgb(221 221 221) solid 1px;
                    margin: 0px auto;
                    border-top: 0;
                    border-bottom: 0;
                  }`),
        ],
        { type: "data:attachment/text" }
      );
      let url = window.URL.createObjectURL(htmlData);
      let templateLink = document.createElement("a");
      templateLink.href = url;
      templateLink.setAttribute("download", `${kebabCase}.html`);
      templateLink.click();
    });
  };

  const onInputHandleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setTemplateName(value);
      // localStorage.setItem("templateName", value);
    } else if (name === "image") {
      setTemplateImage(value);
      // localStorage.setItem("templateImage", value);
    } else if (name === "templateCategory") {
      setTemplateCategory(value);
      // localStorage.setItem("templateCategory", value);
    }
  };

  const updateDesign = async (editTemplate) => {
    emailEditorRef.current.editor.saveDesign(async (design) => {
      try {
        // const json = JSON.stringify(design, null, 4);
        const editable = true;
        const titleCaseStr = templateName
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        const body = JSON.stringify({
          data: {
            json: design,
            editable,
            name: titleCaseStr,
            // imageUrl: templateImage,
            template_Name: templateCategory,
          },
        });
        const updateTemplate = await fetch(
          `http://localhost:1337/api/email-template-builders/${editTemplate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: body,
          }
        );
        if (!updateTemplate.ok) {
          throw new Error("Failed to update template");
        }
        // console.log(`Template ${templateId} updated successfully`);
        setShowSuccessMessage(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        setExportedHtml(JSON.stringify(design, null, 4));
      } catch (err) {
        console.log(err);
      }
    });
  };

  const createDesign = async () => {
    emailEditorRef.current.editor.saveDesign(async (design) => {
      // here iam getting the JSON of saved design
      try {
        // const json = JSON.stringify(design, null, 4);
        const editable = true;
        const titleCaseStr = templateName
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        // await addDoc(templateCollectionRef, )
        const body = JSON.stringify({
          data: {
            json: design,
            editable,
            name: titleCaseStr,
            // imageUrl: templateImage,
            template_Name: templateCategory,
          },
        });
        const addTemplate = await fetch(
          "http://localhost:1337/api/email-template-builders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: body,
          }
        );
        if (!addTemplate.ok) {
          throw new Error("Failed to add template");
        }
        setShowSuccessMessage(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        setExportedHtml(JSON.stringify(design, null, 4));
      } catch (err) {
        console.log(err);
      }
      // alert("Design JSON has been logged in your developer console.");
    });
  };

  const onDesignLoad = (data) => {
    console.log("onDesignLoad", data);
  };
  // const isEditorLoaded = useRef(false);
  // const onLoad = () => {
  //   if (!isEditorLoaded.current && emailEditorRef.current) {
  //     const editor = emailEditorRef.current.editor;

  //     editor.addEventListener("design:loaded", onDesignLoad);

  //     if (editTemplate?.attributes?.json) {
  //       editor.loadDesign(editTemplate.attributes.json);
  //     } else if (cloneTemplate?.attributes?.json) {
  //       editor.loadDesign(cloneTemplate.attributes.json);
  //     }

  //     isEditorLoaded.current = true;
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (emailEditorRef.current) {
  //       onLoad();
  //     }
  //   }, 1000);
  //   setShowEmailEditor(true);
  //   return () => {
  //     clearTimeout(timer);
  //     // Clean up the event listener when the component unmounts
  //     if (emailEditorRef.current) {
  //       emailEditorRef.current.editor.removeEventListener(
  //         "design:loaded",
  //         onDesignLoad
  //       );
  //     }
  //   };
  // }, [edit, clone, editTemplate, cloneTemplate]);

  // const onLoad = () => {
  //   setTimeout(()=>{
  //     if (emailEditorRef.current) {
  //       emailEditorRef.current?.editor.addEventListener(
  //         "design:loaded",
  //         onDesignLoad
  //       );

  //       // Load the design if the ref is valid
  //       if (editTemplate?.attributes?.json) {
  //         emailEditorRef.current?.editor?.loadDesign(
  //           editTemplate.attributes.json
  //         );
  //       }
  //       if (cloneTemplate?.attributes?.json) {
  //         emailEditorRef.current?.editor?.loadDesign(
  //           cloneTemplate.attributes.json
  //         );
  //       }
  //     }else{
  //       console.log("Email editor function is not initialised")
  //     }
  //   },5000)
  // };
  // const isEditorLoaded = useRef(false);
  // const onLoad = () => {
  //   emailEditorRef.current?.editor.addEventListener(
  //     "design:loaded",
  //     onDesignLoad
  //   );
  //   const timer = setTimeout(() => {
  //     if (emailEditorRef.current && (editTemplate || cloneTemplate)) {
  //       const editor = emailEditorRef.current.editor;

  //       if (!isEditorLoaded.current) {
  //         editor.addEventListener("design:loaded", onDesignLoad);

  //         if (editTemplate?.attributes?.json) {
  //           editor.loadDesign(editTemplate.attributes.json);
  //         } else if (cloneTemplate?.attributes?.json) {
  //           editor.loadDesign(cloneTemplate.attributes.json);
  //         }

  //         isEditorLoaded.current = true;
  //       }
  //     }
  //   }, 1000);
  //   setShowEmailEditor(true);
  //   console.log("bharat");
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // };

  

  const onReady = () => {
    console.log("onReady");
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/email-template-builders/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Error: ${response.status} - ${response.statusText}`,
          errorText
        );
        return;
      }
      setTimeout(() => {
        router.push("/");
      }, 1000);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const isEditorLoaded = useRef(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailEditorRef.current && (editTemplate || cloneTemplate)) {
        const editor = emailEditorRef.current.editor;

        if (!isEditorLoaded.current) {
          editor.addEventListener("design:loaded", onDesignLoad);

          if (editTemplate?.attributes?.json) {
            editor.loadDesign(editTemplate.attributes.json);
          } else if (cloneTemplate?.attributes?.json) {
            editor.loadDesign(cloneTemplate.attributes.json);
          }

          isEditorLoaded.current = true;
          
        }
      }
    }, 1000);
      setShowEmailEditor(true);
    return () => {
      alert("alert")
      clearTimeout(timer);
      setShowEmailEditor(false);
    };

  }, [editTemplate,cloneTemplate,emailEditorRef]);

  return (
    <div>
      {/* <div className="row border fixed-top text-nowrap headerContainer">
        <div className="col-md-4 text-center text-primary mt-3 mb-1 ">
          {edit ? <h3>Update a Template</h3> : <h3>Create a new Template</h3>}
        </div>
        <div className="my-3 col-md-8 d-flex justify-content-end pe-5">
          {edit ? (
            <button
              className="btn btn-warning mx-2"
              onClick={() => updateDesign(editTemplate)}
            >
              Update Design
            </button>
          ) : (
            <button className="btn btn-warning mx-2" onClick={createDesign}>
              Create Design
            </button>
          )}
          <button className="btn btn-primary mx-2" onClick={exportHtml}>
            Export HTML
          </button>
          <button className="btn btn-danger mx-2" onClick={()=>deleteItem(editTemplate.id)}>
            Delete Template
          </button>
          <button
            className="btn btn-success"
            onClick={() => window.open("/upload", "_blank")}
          >
            Upload Images
          </button>
        </div>
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top headerContainer">
        <div className="container py-2">
          <h2 className="navbar-brand editorTitle">
            <img src="/hfnlogo.png" alt="logo" />
          </h2>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div className="d-flex">
              {edit ? (
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => updateDesign(editTemplate)}
                >
                  Update Design
                </button>
              ) : (
                <button className="btn btn-warning mx-2" onClick={createDesign}>
                  Create Design
                </button>
              )}
              <button className="btn btn-primary mx-2" onClick={exportHtml}>
                Export HTML
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteItem(editTemplate.id)}
              >
                Delete Template
              </button>
              <button
                className="btn btn-success"
                onClick={() => window.open("/upload", "_blank")}
              >
                Upload Images
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="editorContainer">
        <div className="container mt-5 pt-5">
          {showSuccessMessage && (
            <div className="row">
              <div className="col-md-12">
                <div className="text-success text-center">
                  Template created/updated Successfully
                </div>
              </div>
            </div>
          )}
          <div className="row my-3 border py-2">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Template Name</label>
                <input
                  name="name"
                  onChange={onInputHandleChange}
                  value={templateName}
                  type="text"
                  className="form-control"
                  placeholder="Enter template name here"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Display Image Url</label>
                <input
                  disabled={templateCategory === "Abhyasi" ? true : false}
                  name="image"
                  onChange={onInputHandleChange}
                  value={templateImage}
                  type="text"
                  className="form-control"
                  placeholder="Enter image url here"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="templateCategory">
                  Select the Template Category
                </label>
                <select
                  disabled={edit === true ? true : false}
                  name="templateCategory"
                  id="templateCategory"
                  className="form-control"
                  onChange={onInputHandleChange}
                  value={templateCategory}
                >
                  {templateCategoryOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {showEmailEditor && (
            <div className="border mb-5">
              <EmailEditor
                ref={emailEditorRef}
                minHeight="85vh"
                // onReady={onReady}
                // onLoad={onLoad}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomEmail;
