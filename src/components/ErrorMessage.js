import React from 'react'

export default function ErrorMessage(props) {
    return (
        <div style={{width:'100%'}}>
            <h6 style={{color:'red'}}>{props.error}</h6>
        </div>
    )
}
