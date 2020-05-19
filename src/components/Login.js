import React from "react";
import { Redirect } from "react-router-dom";
import spinner from "../logo.svg";
const QB=window.QB
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",
      isAuthenticated: false,
      user: null,
      isSubmitting: false,
      errorMessage: ""
    };
  }


  onSubmit = e => {
    if ((this.state.username !== "") && (this.state.password!=="")) {
      e.preventDefault();
      this.login();
    }
  };
  login = () => {
    this.toggleIsSubmitting();
    var params={login:this.state.username, password:this.state.password};
    var param={email:'surajgupta8426838667@gmail.com',password:'quickblox'};
    QB.createSession(param,(errcs,rescs)=>
    {
      if(errcs)
      {
        console.log("Error occured while creating session");
        console.log(errcs);
        this.setState({
          errorMessage:JSON.stringify(errcs.detail),
          isSubmitting:false
        });
      }
      else
      {
        console.log(" User session created ")
        console.log(rescs);
        QB.users.create(params,(errcu,rescu)=>{
          if(errcu)
          {
            QB.login(params,(errlu, reslu) =>{
              if(errlu)
              {
                this.setState({
                  errorMessage:"User name already taken or password is wrong.",
                  isSubmitting:false

                });
              }
              else
              {
                console.log("Loggedin");
                console.log(reslu);
                this.setState({
                  user:reslu,
                  isAuthenticated:true
                });
              }
            });
          }
          else
          {
            console.log("User created");
            console.log(rescu);
            this.setState({
              user:rescu,
              isAuthenticated:true
            });
          }
        })

      }
    })
 
  };
  toggleIsSubmitting = () => {
    this.setState(prevState => ({
      isSubmitting: !prevState.isSubmitting
    }));
  };
  handleInputChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  componentDidMount()
  {

    
     var appId= "82520";
      var authKey= "rR3PTqEcaLATNfP";
      var authSecret= "DRPH7gkSyCP-JLh";
    
    
    var CONFIG = {
     
      streamManagement: {
        enable: true
      }
    };
    QB.init(appId,authKey,authSecret,CONFIG);
  }
 
  render() {
    if (this.state.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/chat",
            state: { user:this.state.user ,password:this.state.password}
          }}
        />
      );
    }
    return (
      <div className="App">
       <div className="LoginForm">
        <form className="form" onSubmit={this.onSubmit}>
        <h1 style={{marginBottom:"50px"}}>ChatWeb</h1>
        
          <div>
          <div> 
         
          <input  style={{backgroundColor:"#D3D3D3",padding:"7px",borderRadius:"7px"}} value={this.username} onChange={this.handleInputChange} type="text" placeholder="Enter Your UserName" />
        </div>
        
        <div>

          <input  style={{backgroundColor:"#D3D3D3",padding:"7px", borderRadius:"7px",margin:"3px"}} value={this.password} onChange={this.handlePasswordChange}     type="text" placeholder="Enter Your Password"></input>
        </div>
          <span style={{WebkitTextFillColor:"red"}}><p>{this.state.errorMessage}</p></span>
          {this.state.isSubmitting ? (
            <p>Loading....</p>
          ) : (
            <input
            style={{backgroundColor:"	#00FF00",width:"75%", padding:"7px",borderRadius:"10px"}}
              type="submit"
              disabled={this.state.username === ""}
              value="LOGIN"
            />
          )}
          </div>
        </form>
        </div>
      </div>
    );
  }
}
export default Login;