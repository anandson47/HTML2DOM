import logo from './logo.svg';
import './App.css';
import {useState} from "react"

function App() {

  const [tags,setTags]=useState({})

  const validate=()=>{
    let val= document.getElementById("html")
    
    if(val.value===""){
      alert("Enter an HTMl Value")
      return false
    }
    return true
  }

  const parseHTML=(parent,child)=>{
  
    let domString=""
    for(let i=0;i<child.length;i++){
      let varName=getClassName(child[i].tagName)
      domString+=`let ${varName.toLowerCase()}=document.createElement("${child[i].tagName.toLowerCase()}") \n`
      for (let j = 0; j<child[i].attributes.length; j++){
        domString+=`${varName.toLowerCase()}.setAttribute("${child[i].attributes[j].name}","${child[i].attributes[j].value}")\n` 
      }
      
      if(child[i].childNodes[0] && child[i].childNodes[0].nodeValue!==null  && child[i].childNodes[0].nodeValue.trim()!==""){
        domString+=`${varName.toLowerCase()}.innerText="${child[i].childNodes[0].nodeValue.trim()}"\n`
      }
      
      domString+=`${parent.toLowerCase()}.appendChild(${varName.toLowerCase()})\n`
      domString+="\n"
      if(child[i].children.length>0){
        domString+=parseHTML(varName , child[i].children)
      }
      
    }
    return domString
  }

  const getClassName=(tagname)=>{

    if(tags[tagname]!==undefined){
      tags[tagname]+=1 
      return `${tagname+tags[tagname]}`
    }
    else{
      tags[tagname]=0
      return tagname
    }
  }



  const onGenerateClick=(e)=>{
    if(validate()){
      let parentDiv=document.createElement("div")
      let domString=""
      
      parentDiv.innerHTML=document.getElementById("html").value
      
      let child=parentDiv.children
      for(let i=0;i<child.length;i++){
        let varName=getClassName(child[i].tagName)
        domString+=`let ${varName.toLowerCase()}=document.createElement("${child[i].tagName.toLowerCase()}") \n`
        for (let j = 0; j<child[i].attributes.length; j++){
          domString+=`${varName.toLowerCase()}.setAttribute("${child[i].attributes[j].name}","${child[i].attributes[j].value}")\n`
        }
        if(child[i].childNodes[0] && child[i].childNodes[0].nodeValue!==null && child[i].childNodes[0].nodeValue.trim()!==""){
          domString+=`${varName.toLowerCase()}.innerText="${child[i].childNodes[0].nodeValue.trim()}"\n`
        }

        domString+="\n"
        console.log(child[i].children.length)
        if(child[i].children.length>0){
          domString+=parseHTML(varName , child[i].children)
        }
      }
      document.getElementById("dom").value=domString
      setTags({})
    }
    else{}
  }
  
  return (
    <div className="App">
     <div className="navbar">
        <p className="navElement">HTML-2-DOM</p>
        <p className="navElement">By Anand!</p>
     </div>
     <div className="converter">
      <div className="textArea">
        <p>HTML</p>
        <textarea id="html"></textarea></div>
      <div className="textArea">
        <p>DOM</p>
        <textarea id="dom"></textarea></div>
     </div>
     <div className="buttonArea">
      <button onClick={onGenerateClick}>Generate DOM Text</button>
     </div>
     <div className="footer">
      <p className="footerText">Powered By React</p>
     </div>
    </div>
  );
}

export default App;
