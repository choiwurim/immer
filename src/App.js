import React,{useRef,useCallback,useState} from "react";
import produce from "immer";

const App=()=>{
  const nextId=useRef(1);
  const [form, Setform]=useState({name:'',username:''});
  const [data,Setdata]=useState({
    array:[],
    uselessValue:null
  });
  const onChange=useCallback(event=>{
    const {name,value}=event.target;
    Setform(
      produce(form,draft=>{
        draft[name]=value;
      })
    );
  },[form]);
  const onSubmit=useCallback(event=>{
    event.preventDefault();
    const info={
      id:nextId.current,
      name:form.name,
      username:form.username,
    };
    Setdata(
      produce(draft=>{
        draft.array.push(info);
      })
    )
    Setform({
      name:'',
      username:'',
    });
    nextId.current += 1;
  },[form.name, form.username]);
  const onRemove=useCallback(
    id=>{
      Setdata(
        produce(data,draft=>{
          draft.array.splice(draft.array.findIndex(info=>info.id===id),1);
        })
      );
    },[data]
  );
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="ID" value={form.username} onChange={onChange}/>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange}/>
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {data.array.map(info=>(
            <li key={info.id} onClick={()=>{onRemove(info.id)}}>
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
