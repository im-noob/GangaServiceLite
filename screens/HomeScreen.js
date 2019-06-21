import React, { Component } from "react";
import {
    WebView ,
    View,
    Dimensions,
    Modal,
    StatusBar,
} from "react-native";

import { 
    Spinner,
} from 'native-base';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: true,
        }
    }
   
    componentDidMount = async() => {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }
    _onNavigationStateChange(e,THIS){
        
        // console.log(e);
        // let url = e.url;
        let loading_status = e.loading;
        // console.log("url on state change:",url,loading_status);
        this.setState({
            LodingModal:loading_status
        })
        
    }
  // _onShouldStartLoadWithRequest(e) {
    //     let url = e.url;
    //     console.log("url on request:",url);
    //     // if(e.url == Global.WEB_URL+'PaymentStatus'){
    //     //     console.log("goBack")
    //     // }
    //     // return true;
    // }
  
    render() {
        const {renderCoponentFlag} = this.state;
        const StatusBarHeight = StatusBar.currentHeight;
        StatusBar.setBackgroundColor = "blue";
        if(renderCoponentFlag){
            return(
                <View style={{flex:1,marginTop:StatusBarHeight}}>
                    <WebView 
                        source={{uri: 'https://gangaservices.com'}}

                        // showing html in webview
                        // source={{html: this.state.html}}

                        // on error relading
                        ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
                        onError={()=>{
                            // console.log("error.. reloading.. ");
                            WebViewRef && WebViewRef.reload();
                        }}

                        // on loading indicator  
                        renderLoading={this.ActivityIndicatorLoadingView}
                        startInLoadingState={true}
                        // upper level loader 
                        onLoad={() => {
                            // console.log("loaded");
                            this.setState({
                                LodingModal:false
                            })
                        }}

                        // url detector
                        // onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                        onNavigationStateChange = {(e)=>this._onNavigationStateChange(e,this)} 

                        // onMessage={(event)=>{
                        //     let message  = event.nativeEvent.data;
                        //     console.log("postMessage:",message);
                        //     /* event.nativeEvent.data must be string, i.e. window.postMessage
                        //     should send only string.
                        //     * */
                        // }}
                        
                        
                        


                    />
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.LodingModal}
                        onRequestClose={() => {
                            // this.setState({
                            // LodingModal:false
                        // })
                        }}>
                            <AdvLoder/>
                    </Modal>
                </View>
            );
        }else{
            return (
            <AdvLoder/>
            );
        }
    }
}


class AdvLoder extends Component{
    render(){
        const {width,height} = Dimensions.get('window');
        return(
            <View style={{ flex: 1, width:width, justifyContent: 'center', alignItems: 'center',backgroundColor:'#09090999'}}> 
                <Spinner color='#079bff' size='large' style={{height:40}} />
            </View>
        )
    }
}
