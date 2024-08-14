import React, { Fragment, useEffect, useState, useRef } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import CustomEmailEditor from "./emailEditor.js";
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import { useRouter } from "next/router";

const EmailTemplatesGrid = () => {
  const [templatesFromDb, setTemplatesFromDb] = useState([]);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [edit, setEdit] = useState(false);
  const [clone, setClone] = useState(false);
  const templateCollection = collection(db, "templates");
  const [editTemplate, serEditTemplate] = useState([]);
  const [cloneTemplate, setCloneTemplate] = useState([]);
  const [strapiData, setStrapiData] = useState([]);
  const router = useRouter();



  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from Strapi
      const response = await fetch(
        "http://localhost:1337/api/email-template-builders"
      );
      const data = await response.json();
      setStrapiData(data.data);
    };
    fetchData();

  }, []);

  const handleViewTemplate = (template) => {
    router.push({
      pathname: "/email-editor",
      query: {
        template: JSON.stringify(template),
        edit: true,
        editTemplate: JSON.stringify(template),
      }
    });
  };
  // const onCreateNewTemplate = () => {
  //   router.push({
  //     pathname: "/email-editor",
  //     query: {
  //       template: JSON.stringify({}),
  //       edit: false,
  //       clone: false,
  //     },
  //   });
  // };
  const onCloneTemplate = (template) => {
    router.push({
      pathname: "/email-editor",
      query: {
        template: JSON.stringify(template),
        clone: true,
        cloneTemplate: JSON.stringify(template),
      },
    });
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
      console.log("Item deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  // useEffect(() => {
  //   // Check if the page has already been reloaded
  //   const hasReloaded = localStorage.getItem('hasReloaded');

  //   if (!hasReloaded) {
  //     // Set the flag in local storage
  //     localStorage.setItem('hasReloaded', 'true');

  //     // Reload the page
  //     window.location.reload();
  //   }

  //   // Clean up if needed
  //   return () => {
  //     // Optionally, you could clear the flag if you want to allow reloads after some condition
  //     localStorage.removeItem('hasReloaded');
  //   };
  // }, []);
  // useEffect(() => {
  //   // Check if the page has already been reloaded during this session
  //   const hasReloaded = sessionStorage.getItem('hasReloaded');

  //   if (!hasReloaded) {
  //     // Set the flag in session storage
  //     sessionStorage.setItem('hasReloaded', 'true');

  //     // Reload the page
  //     window.location.reload();
  //   }
  // }, []);

  return (
    <div className="homePage">
      <div className="container">
        <Fragment>
          {/* <div className="fixed-nav container">
          <div className="row text-primary">
            <div className="col-md-8 col-12">
              <h3>Email templates</h3>
            </div>
            <div className="col-md-4 col-12">
              <button
                className="btn btn-success text-nowrap"
                onClick={onCreateNewTemplate}
              >
                <i className="fa fa-plus"></i> &nbsp;&nbsp;Create New Template
              </button>
            </div>
          </div>
        </div> */}
          <div className="py-5 mt-5">
            <div className="border row">
              {strapiData.map((item) => {
                return (
                  <div className="col-md-4 my-2" key={item.id}>
                    <h5 className="text-wrap text-center py-2 cardTitle">
                      {item.attributes.name}
                    </h5>
                    <div className="mb-2 cardContainer">
                      <div className="overlay"></div>
                      <div className="imgContainer">
                        {item.attributes.template_Name === "Abhyasi" ? (
                          <img className="magazines" src="/download.jfif" />
                        ) : item.attributes.template_Name === "Heartfulness" ? (
                          <img className="magazines" src="/heartfulness.jpg" />
                        ) : (
                          <img className="magazines" src="/defaultImage.png" />
                        )}
                      </div>
                      <div>
                        <p className="pt-3 ps-3 m-0 createdAt">Created at</p>
                        <p className="ps-3 createdDate">
                          {new Date(
                            item.attributes.createdAt
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="buttonContainer">
                        {item.attributes.editable && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-${item.id}`}>
                                Edit Template
                              </Tooltip>
                            }
                          >
                            <Image
                              className="iconImg"
                              onClick={() => handleViewTemplate(item)}
                              src="/edit.png"
                              alt="edit"
                            />
                          </OverlayTrigger>
                        )}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${item.id}`}>
                              Clone Template
                            </Tooltip>
                          }
                        >
                          <Image
                            className="iconImg"
                            onClick={() => onCloneTemplate(item)}
                            src="/duplicate.png"
                            alt="duplicate"
                          />
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${item.id}`}>
                              Delete Template
                            </Tooltip>
                          }
                        >
                          <Image
                            className="iconImg"
                            onClick={() => deleteItem(item.id)}
                            src="/delete.png"
                            alt="delete"
                          />
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};
export default EmailTemplatesGrid;
