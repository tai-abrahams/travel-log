import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { createEntry } from './API/LogEntries'

function LogEntryForm({locationData, onClose}) {

    const { register, handleSubmit, watch, errors } = useForm();
    const { error, setError } = useState('');
    const { loading, setLoading } = useState(false);


    const onSubmit = async (data) => { 
        data.latitude = locationData.latitude;
        data.longitude = locationData.longitude;
        try{
            setLoading(true);
            await createEntry(data);
            onClose();
        } catch(error){
            setError(error.message);
            setLoading(false);
        }
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="logEntry">
            <div className="logEntry__container">
                {error ? <h3 className='error'> {error}</h3> : null}
                <div className='logEntry__container__div'>
                    <label htmlFor='title' >Title:</label>
                    <input name='title' ref={register} />
                </div>
                <div className='logEntry__container__div'>
                    <label htmlFor='image'>Image Url:</label>
                    <input name='image' ref={register} />
                </div>
                <div className='logEntry__container__div'>
                    <label htmlFor='rating'>Rating:</label>
                    <input name="rating" ref={register} />
                </div>
                <div className='logEntry__container__div'>
                    <label htmlFor='visitDate'>Date Visited:</label>
                    <input name='visitDate' type='date' ref={register} />
                </div>
                <div className='logEntry__container__div'>
                    <label htmlFor='Comment'>Comment:</label>
                    <textarea name='Comment' rows={3} ref={register} />
                </div>
                <div className='logEntry__container__div'>
                    <label htmlFor='Description'>Description:</label>
                    <textarea name='Description' rows={3} ref={register} />
                </div>
                <div className='logEntry__container__div'>
                    <button disabled={loading}>{loading ? 'Loading' : 'Create Log Entry'}</button>
                </div>
            </div>             
        </form>
    )
}

export default LogEntryForm;
