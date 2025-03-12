'use strict';

(function(){
    let method='GET';
    let urifield;
    let jsonarea;
    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        urifield=document.getElementById('urifield');
        jsonarea=document.getElementById('jsonarea');
        resultarea=document.getElementById('resultarea');

        document.getElementById('submit')
            .addEventListener('click',send);

        document.getElementById('methods')
            .addEventListener('change',choose);

        clearSelections();
        urifield.value='http://localhost:3000/api/';
    }

    function clearSelections(){
        resultarea.textContent='';
        method='GET';
        document.getElementById('get').checked=true;
    }

    function choose(e){
        resultarea.textContent='';
        method=e.target.value;
    }

    function showResult(data){
        resultarea.textContent=JSON.stringify(data,null,4);
    }

    async function send(){
        const options={
            method:method,
            mode:'cors' 
        }

        if(method==='PUT' || method==='POST'){
            options.body=jsonarea.value;
            options.headers={'Content-Type':'application/json'};
        }

        // console.log('options',options);

        try{
            const result = await fetch(urifield.value, options);
            const data=await result.json();
            showResult(data);
        }
        catch(err){
            showResult({type:'error',message:err.message});
        }
    }

})();