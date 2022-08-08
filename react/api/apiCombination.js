
import React, { Component } from 'react'
import axios from 'axios'

import {teste} from './../interfaces/teste'

export default class javascriptMap extends Component {
    constructor(props){
        super(props)
        this.state = {
          userName: ''
        }
      }

      getData(){
        axios.get('https://zpgwunqvzc.execute-api.us-east-1.amazonaws.com/getAllCombination')
        .then(res => {
            console.log(res.data)
          var data = res.data.items
          var loopData = ''
          var i ;
          for(i=0; i < data.length; i++){
              loopData += `<li>${data[i].name}</li>`
          }
          this.setState({userName: loopData})
        })
      }
      componentDidMount(){
        this.getData()
      }
    render() {
     const {userName} = this.state
     console.log()
        return (
            <>

             <ul dangerouslySetInnerHTML={{__html: userName}}></ul>

            </>
        )
    }
}
