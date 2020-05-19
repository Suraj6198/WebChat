import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
var QB=window.QB
class MessageList extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
        

        };
     }
     componentDidMount() {
        this.scrollToBottom();
      }
    
      componentDidUpdate() {
        this.scrollToBottom();
      }
    
      scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
      }
     render()
     {
        
        const msglst=[...this.props.listofmessages];  
        msglst.reverse();
        if(msglst.length==0){
         return(
             
           <div className="MessageList">
                  <h1 style={{fontWeight:"bold" , color:"red"}}>{this.props.MessageHeader}</h1>
             <div style={{ color: "black",fontWeight:"bold" , textAlign:"center"}}>
                 <p>No Chat History with this user or select a user to chat with</p>
                 </div>
                 <div ref={el => { this.el = el; }} ></div>
                       </div>
         )
        }
        else
        {
            return(

                <div className="MessageList">
                    <h1 style={{fontWeight:"bold" , color:"Green"}}>{this.props.MessageHeader}</h1>
                    
                    { msglst.map((msg,index)=>{
                           return( 
                           <div key={index} >
                             {  (msg.sender_id==this.props.receiverid)?(
                           <div style={{textAlign:"left", padding:"5px", margin:"25px",backgroundColor:"#F5F5DC"}}>
                               <p>{msg.message}</p>
                           </div>
                               ):
                  (
                         <div style={{textAlign:"right", padding:"5px", margin:"25px",backgroundColor:"#F0F8FF"}}>
                         <p>{msg.message}</p>
                     </div>  
                  )}
                           </div>)

                        })}
                        
                        <div ref={el => { this.el = el; }} ></div>

                </div>
               
            )
        }
        

     }

}
export default MessageList;