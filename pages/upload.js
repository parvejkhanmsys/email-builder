/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import AWS from 'aws-sdk'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Upload() {

    const [images, setImages] = useState('');
    const [imageToUpload, setImageToUpload] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const imageInput = useRef(null);

    AWS.config.update({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3();

    const getObjects = async () => {
        console.log('Ganesh')
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
        };

        try {
            const data = await s3.listObjects(params).promise();
            console.log(data,'data')
            setImages(data.Contents.map((item, index) => ({
                id: index + 1,
                url: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${item.Key}`
            })));
        } catch (error) {
            console.log(`Error getting objects: ${error}`);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const file = imageToUpload;
        const fileName = file?.name;
        const fileType = file?.type;
        setIsUploading(true)

        const s3Params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file,
            ContentType: fileType,
            // ACL: 'public-read'
        };
        console.log(s3Params,'s3Params')

        const imageUrl = `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${fileName}`;

        try {
            await s3.upload(s3Params).promise();
            console.log(`File uploaded successfully. ${imageUrl}`);
            toast("Image Uploaded Successfully.");
            navigator.clipboard.writeText(imageUrl);
            setTimeout(() => {
                toast("Url copied to clipboard.");
            }, 500)
            setIsUploading(false)
            imageInput.current.value = ""
            getObjects();
        } catch (error) {
            console.log(`Error uploading file: ${error}`);
        }
    }

    const handleFile = async (event) => {
        setImageToUpload(event.target.files[0]);
        setIsUploading(false)
    }

    useEffect(() => {
        getObjects();
    }, []);

    return (
        <div className='container'>
            <div className='upload'>
                <form className='form-group' autoComplete="off"
                    onSubmit={handleSubmit}>
                    <label><h5>Select Image</h5></label>
                    <br></br>
                    <input type='file' className='form-control mt-2 mb-2'
                        onChange={handleFile} accept=".png, .jpg, .jpeg, video/mp4"
                        ref={imageInput}
                        required ></input>

                    {isUploading ? <img
                        src="https://hfn-strapi-bucket.s3.ap-south-1.amazonaws.com/Loader_8f2103cd5d.gif?updated_at=2023-01-24T09:17:09.467Z"
                        alt="loader-icon"
                        width="25px" /> :
                        <button type='submit' className='btn btn-success mt-2'>Upload</button>
                    }


                </form>
            </div>
            <div className='image-gallery'>
                {images && images.map(item => (
                    <img src={item.url} alt="" key={item.id} className="image" onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        toast("Url copied to clipboard");
                    }} title="click to copy the url" />
                ))}

            </div>
            <ToastContainer
                toastStyle={{ backgroundColor: "white", borderColor: "green" }}
                autoClose={1000}
            />
        </div>
    )
}

