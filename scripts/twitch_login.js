const headers = {
    "Authorization": "Basic cHVibGljOkYvLDtgNTM4XzXCo3ZfQ1YuS1N2Nk1RWDwpcDFPQlg1Zw==",
};
//delay = ms => new Promise(res => setTimeout(res, ms));
/* Login Control 
Esto me lo cargo que sale del scope para solo ser utilizado cuando se llamen las 
respetivas funciones 
*/


let user_data;
$(window).on('load', async function ()  {
    $('#login').on('click', ka_login);

    //$('#test').on('click', ka_loadID);

    //Revisamos si ya estamos logeados
   // try {

        //Intentamos hacer login automatico
        user_data =  await ka_loadID();
        console.log(user_data);

        $(".login-bar").show();
        if(user_data.error){ //Si no es posible logear...
            $(".login-succeed").hide();
            /* 
            -- -- -- - - - - - -  -- 
            -- -- -- - - - - - -  -- 
            */

        }else if(user_data.name !== undefined){ //Logeo correcto
            //Data importante de 
           // $(".login-bar")
           $(".login-fail").hide();
           $("#user-name").text(user_data.name);
           let coins_ = (user_data.honor >= 100000)? Math.floor(user_data.honor /1000) +" K": user_data.honor;
           $("#user-coins").text(coins_);
           $("#user-skin").attr("src", user_data.skin.image);

        }


        /*await delay(15000);
        chrome.storage.sync.get(['user_uid'], result => {
            console.log('Elemento cargado:', result.key, result);
        });
        //console.log(chrome.storage.sync.get(["user_uid"]));
        if(user_data.name !== undefined){
            console.log(user_data.name);
        }

   /* } catch (error) {
        console.log(error);
    }*/
 
});

/* Login Functions */
const ka_login = () => {
    $(this).attr('disabled', 'disabled');
        chrome.runtime.sendMessage({ message: 'login' }, function (response) {});
}
const ka_loadID = async () =>{
    return new Promise((resolve) => {
        chrome.storage.sync.get(["user_uid"], (item) => {
            let user_uid = item.user_uid;
            $.ajax({
                url: `https://api.lasercatgames.com/api/kurage/uid/${user_uid}`,
                type: "GET",
                dataType: "json",
                headers: headers,
                success: function (response) {resolve(response)},
                error: function(xhr, status, error) {
                    //setError(true, "Error occurred: " + error);
                    resolve({'error':"Error occurred: " + error});
                }
            });
        });
    });
}

let ka_onloadID = () =>{
    chrome.storage.sync.get(['user_uid'], function(result) {
        console.log('Elemento cargado:', result.key);
    });
}
