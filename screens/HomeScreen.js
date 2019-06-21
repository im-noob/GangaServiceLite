import React, { Component } from "react";
import {
    WebView ,
    View,
    Dimensions,
    Modal,
    BackHandler,
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
            backPress: 0,
        }
    }
    webView = {
      canGoBack: false,
      ref: null,
    }
  
    componentDidMount = async() => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

      handleBackButton = () => {
        if (this.webView.canGoBack && this.webView.ref) {
          this.webView.ref.goBack();
          return true;
        }
        return false;
      
        } 
        backHandler = () => {
          if(this.state.backButtonEnabled) {
              this.refs[WEBVIEW_REF].goBack();
              return true;
          }
        }
    _onNavigationStateChange(e,THIS){
        
        // console.log(e);
        // let url = e.url;
        let loading_status = e.loading;
        // console.log("url on state change:",url,loading_status);
        this.setState({
            LodingModal:loading_status
        })
        this.webView.canGoBack = e.canGoBack;
        
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <View style={{flex:1,}}>
                    <WebView 
                        source={{uri: 'https://gangaservices.com'}}

                        // showing html in webview
                        // source={{html: this.state.html}}

                        // on error relading
                        ref={(webView) => { this.webView.ref = webView; }}
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

                    />
                    <Modal
                        animationType='fade'
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
