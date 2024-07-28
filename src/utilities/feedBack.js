import toast from 'react-simple-toasts'

export const alertError =(message)=> {
    toast(message, {className: 'toast-error '})
};

export const alertSuccess = (message)=> {
    toast(message, {className: 'toast-success'})
}

export const extractErrorMessage = (err)=>{
    let errMessage = err.message || 'Failed Request';
    const errorWithData = err?.response?.data?.error

    if(typeof errorWithData==='string'){
        errMessage=errorWithData;
    }

    if(errorWithData.details && Array.isArray(errorWithData.details)){
        errMessage= errorWithData.details[0].message;
    }
    return errMessage;
};