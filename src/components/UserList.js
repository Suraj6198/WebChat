import React from "react";
var QB=window.QB


class UserList extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={


        };
     }
     render()
     {
        const userslist = [...this.props.listofusers];
             return(


                <div className="UserList">
                <div>
                  {  (this.props.NewChat==false)?(<h3>Previous Contacts :</h3>):(<h3>All Users</h3>)}
                    <ul>
                        
                        {userslist.map((room, i) => {
    
                            return (
                                <li key={i}>
                                <a style={{ textDecoration:"none",WebkitTextFillColor:"black",fontWeight:"bold"}} href='#' onClick={this.props.SubscribeUser.bind(this,room)}>
                                        {room.name}
                                </a>
                                </li>
                            )      
                        })}
                    </ul>
                </div>     
                 </div>
    
    
             )
                    }
     
}
export default UserList;