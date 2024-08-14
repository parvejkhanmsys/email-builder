import React, { useState } from 'react';
import './mail.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TagsInput from './tags-input';
const Email = () => {
    const [value, setValue] = useState('');
    const [tags, setTags] = useState({
        toEmails: [],
        ccEmails: [],
        bccEmail: [],
        from: []
    });
    const [selectedEvent, setSelectedEvent] = useState({})
    const events = [
        { name: 'Event 1', description: "This is an event for peaceful day", date: "01/09/2022" },
        { name: 'Event 2', description: "This is an event for peaceful day", date: "06/09/2022" },
        { name: 'Event 3', description: "This is an event for peaceful day", date: "09/10/2022" },
        { name: 'Event 4', description: "This is an event for peaceful day", date: "15/09/2022" },
    ]
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    const selectedTags = (inputs, type) => {
        console.log(inputs, type);
        console.log(tags);
        tags[type] = inputs;
        setTags(tags);
    };
    const handleSelectedEvent = (event) => {
        console.log(event);
        setSelectedEvent(event);
    }
    return (
        <div className='container'>
            <div className="row ">
                <div className='col-md-3'>
                    <h3 className='mt-3 text-primary'>Events</h3>
                </div>
                <div className='col-md-9'>
                    <h3 className='mt-3 text-primary'>Send Email to {selectedEvent.name}</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-3 events'>
                    {events.map(value => {
                        return (
                            <div class="event-card" onClick={() => handleSelectedEvent(value)} key={value.id}>
                                <h6 class="card-header">{value.name}</h6>
                                <p className='text-muted mt-2 mb-1 description'>{value.description}</p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p>{value.date}</p>
                                    </div>
                                    <div className='col-md-6 text-end'>
                                        <button className='btn btn-primary btn-sm'>View</button>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className='col-md-9 events'>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <label for="exampleFormControlInput1" className="form-label"></label>
                            <TagsInput placeholder="To" selectedTags={(inputs) => selectedTags(inputs, 'toEmails')} tags={tags.toEmails} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 ">
                            <label for="exampleFormControlInput1" className="form-label"></label>
                            <TagsInput placeholder="CC" selectedTags={(inputs) => selectedTags(inputs, 'ccEmails')} tags={tags.ccEmails} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 ">
                            <label for="exampleFormControlInput1" className="form-label"></label>
                            <TagsInput placeholder="BCC" selectedTags={(inputs) => selectedTags(inputs, 'bccEmail')} tags={tags.bccEmail} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 mb-3">
                            <label for="exampleFormControlInput1" className="form-label"></label>
                            <TagsInput placeholder="From" selectedTags={(inputs) => selectedTags(inputs, 'from')} tags={tags.from} />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-12'>
                            <ReactQuill theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                                formats={formats} />;
                        </div>

                    </div>
                </div>
            </div>


            <div className='row mt-3 mb-3'>
                <div className='col-md-12 text-center'>
                    <button className='btn btn-primary'>Send Email</button>
                </div>
            </div>


        </div>
    )
}

export default Email;