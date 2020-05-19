import React from "react";
var QB=window.QB
class SendMessageForm extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
            message: ''

        };

     }

         
    handleChange=(e)=> {
        this.setState({
            message: e.target.value
        });
    }
    
    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }
     render()
     {
         return(
        <div className="SendMessageForm">
                   <form style={{display:"flex",height:"100%",margin:"0",borderBlockEndStyle:"insert"}} onSubmit={this.handleSubmit}>
                <input style={{width:"100%", height:"100%", margin:"0",border:"none", textAlign:"center"}}
                    placeholder="Type message and hit ENTER"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.message}
                    disabled={this.props.disabled} />
            </form>
         </div>


         )




     }

}
export default SendMessageForm;