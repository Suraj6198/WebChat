import React from "react";
import MessageList from './MessageList.js'
import UserList from './UserList.js'
import SendMessageForm from './SendMessageForm.js'
import { Redirect } from "react-router-dom";
var QB=window.QB






class Chat extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
    ListOfAllUsers:[],
   CurrentUserId:this.props.location.state.user.id,
    CurrentUserPassword: this.props.location.state.password,
    MessageList:[],
    DialogBoxId: "",
    ReceiverId:null,
    NewChat:false,
    SwitchName:"All Users",
    MessageHeader:"Messages",
    GetLogOut:false
        };
        this.GetReceiver=this.GetReceiver.bind(this);
     }
sendMessage=(Msg)=>{

var message = {
  type: "chat",
  body: Msg,
  extension: {
    save_to_history: 1,
    dialog_id: this.state.DialogBoxId
  },
  markable: 1
};

var opponentId = this.state.ReceiverId;
message.id = QB.chat.send(opponentId, message);
var msglst=[{message:Msg,sender_id:this.state.CurrentUserId} ,...this.state.MessageList];
this.setState({
  MessageList:msglst
});

}
GetChatHistory=()=>{
  // var searchParams = {filter: { field: 'id', param: 'in', value: [this.state.ReceiverId] }};
  //       QB.users.listUsers(searchParams, (error, result)=>{
  //           if(result){
  //               console.log("receivername");
  //            console.log(result);
  //            this.setState({
  //                MessageHeader:result.items[0].user.login
  //            })
  //           }
  //           else{
  //               console.log("error while getting receivername")
  //           console.log(error)
  //           this.setState({
  //               MessageHeader:"Messages"
  //           })
  //           }
  //       });





  var dialogId = this.state.DialogBoxId;  
  var params = {
    chat_dialog_id: dialogId,
    sort_desc: 'date_sent',
    limit: 25,
    skip: 0
  };
  
  QB.chat.message.list(params,(error, messages)=> {
      if(error)
      {
        console.log("Error while Getting Chat History");
        console.log(error);
      }
      else
      {
        console.log("Get Chat history successfully");
        console.log(messages);
      var  msglst=messages.items.map((msg,indx)=>{
          return(
            {
              message:msg.message,
              sender_id:msg.sender_id
            }
          )
        })
        this.setState({
          MessageList:msglst
        })
      }
  });
  QB.chat.onMessageListener=(userId, message)=> {
    console.log("new message");
    console.log(message);
    if(userId==this.state.ReceiverId){
    var msglst=[{message:message.body,sender_id:userId} ,...this.state.MessageList];
this.setState({
  MessageList:msglst
});
}
  }
}



GetReceiver=(receive)=>{
  var paramsgr = {
    type: 3,
    occupants_ids: [receive.id]
  };
  QB.chat.dialog.create(paramsgr, (error, conversation) =>{
    if(error){
    console.log("error while creating dialog");
    console.log(error);
    console.log(receive);
    }
    else{
      console.log("Dialog created");
      console.log(conversation);
      var receiverid=conversation.occupants_ids[0];
      if(receiverid==this.state.CurrentUserId)
      receiverid=conversation.occupants_ids[1];
       this.setState({
      ReceiverId:receiverid,
        DialogBoxId: conversation._id,
        MessageHeader:receive.name
       },
       ()=>{
        this.GetChatHistory();
       }
       );
      

    }
  });
  
}  
    
GetAllUsers=()=>{
  if(this.state.NewChat==false){
  var filters = {};

QB.chat.dialog.list(filters, (error, dialogs)=> {
  console.log("Dialogs chat history");
  console.log(dialogs)


  var lst=dialogs.items.map((arr,i)=>{
    var receiverid=arr.occupants_ids[0];
    if(receiverid==this.state.CurrentUserId)
    receiverid=arr.occupants_ids[1];
    return({
      name:arr.name,
      id:receiverid
    })
  })
  this.setState({
    ListOfAllUsers : [...lst]
 });
});
}
else
{
  QB.users.listUsers( { page: '1', per_page: '15'}, (err, users)=>{
    if (users) {
      console.log("Got all users")
      console.log(users);

      var lst=users.items.map((arr,i)=>{
        return({
          name:arr.user.login,
          id:arr.user.id
        })
      })


      this.setState({
             ListOfAllUsers : [...lst]
          });
  
    } else {
      console.log("Error while  getting all users")
    }
  });
  }
}
GetConnectToChat=()=>{
var userCredentials = {
    userId:this.state.CurrentUserId,
    password: this.state.CurrentUserPassword
  };

  
  QB.chat.connect(userCredentials, function(error, contactList) {
    if(error){
    console.log("error while connecting with chat");
    console.log(error);
    }
    else
    {
      console.log("Connected with chat");
      console.log(contactList);
    }
  });

}
NewClick=()=>{
 var t=this.state.SwitchName;
 if(t=="All Users")
 t="Previous Contacts";
 else
 t="All Users";
  this.setState({
    NewChat:!(this.state.NewChat),
    SwitchName:t
  },()=>{
    console.log("NewChat"+this.state.NewChat)
  this.GetAllUsers();
  });
  
}
GetLogOut=()=>{
  this.setState({
    GetLogOut:true
  })
}

   componentDidMount()
   {
   this.GetConnectToChat();
      this.GetAllUsers();
    
   }


     render()
     {
       if(this.state.GetLogOut==true)
       {
        return (
          <Redirect
            to={{
              pathname: "/Login",
           
            }}
          />
        );
       }
       else{
         return(
              <div className="app">
                  <UserList  listofusers={this.state.ListOfAllUsers } 
                  SubscribeUser={this.GetReceiver}
                   CurrentUserId={this.state.CurrentUserId}  
                   NewChat={this.state.NewChat}     
                            />
                  <MessageList 
                  MessageHeader={this.state.MessageHeader}
                  listofmessages={this.state.MessageList}
                  receiverid={this.state.ReceiverId}
                  />
                  <SendMessageForm 
                  sendMessage={this.sendMessage}
                  disabled={!this.state.ReceiverId}
                  />
                 

              {/* Switching from Previous contacts to all users and vice versa */}
               <div>
                 <button className="NewChat" onClick={this.NewClick}>{this.state.SwitchName}</button>
               </div>
               <div>
                    <button className="LogOut" onClick={this.GetLogOut}>LogOut</button>
                  </div>

              </div>



         )


         }

     }

}
export default Chat;